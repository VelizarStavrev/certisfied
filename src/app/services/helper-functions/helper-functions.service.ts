import { Injectable } from '@angular/core';
import { Property } from 'src/app/interfaces/property';
import { Field } from 'src/app/interfaces/field';
import { FieldList } from 'src/app/interfaces/field-list';
import { TemplateData } from 'src/app/interfaces/template-data';

@Injectable({
  providedIn: 'root'
})
export class HelperFunctionsService {
  private getFieldStyles(properties: { [key: string]: Property }): { [key: string]: {} } {
    let currentProperties = structuredClone(properties);

    for (let property in currentProperties) {
      if (['content', 'url', 'editable', 'autoGenerated', 'unit', 'units'].includes(property)) {
        continue;
      }

      if (property === 'transform') {
        currentProperties[property].value = 'rotate(' + currentProperties[property].value + 'deg)';
      }

      if (['left', 'top', 'maxWidth', 'fontSize', 'height', 'width'].includes(property)) {
        currentProperties[property].value = currentProperties[property].value + currentProperties[property].unit;
      }
    }

    let finalCSSObject: { [key: string]: {} } = {};

    for (let property in currentProperties) {
      let currentCSSProperty = property;
      let currentCSSValue = currentProperties[property].value;
      finalCSSObject[currentCSSProperty] = currentCSSValue;
    }

    finalCSSObject['position'] = 'absolute';
    return finalCSSObject;
  }

  updateFieldListStyling(fieldList: Field[]): {}[] {
    // Set the field styles to an array
    let fieldListStyling: {}[] = [];

    fieldList.forEach((element) => {
      let currentStyles = this.getFieldStyles(element.properties);
      let currentFieldData: {
        id: number,
        template_id: string,
        type: string,
        styles: { [key: string]: {} },
        content?: string,
        url?: string
      } = {
        id: element.id,
        template_id: element.template_id,
        type: element.type,
        styles: currentStyles
      };

      // Field specific data and styles
      switch(element.type) {
        case 'Text':
          currentFieldData.content = element.properties['content'].value;
          currentFieldData.styles['width'] = '100%';
          break;

        case 'Image':
          currentFieldData.url = element.properties['url'].value;
          break;

        case 'Link':
          currentFieldData.content = element.properties['content'].value;
          currentFieldData.url = element.properties['url'].value;
          break;
      }

      fieldListStyling.push(currentFieldData);
    });

    return fieldListStyling;
  }

  private sortFieldList(fieldListArray: [string, Field][]): {
    [key: string]: Field
  } {
    fieldListArray.sort((a: [string, Field], b: [string, Field]) => {
      let firstValue = a[1]['properties']['zIndex'].value;
      let secondValue = b[1]['properties']['zIndex'].value;

      return Number(secondValue) - Number(firstValue);
    });

    let fieldListSortedObject: {
      [key: string]: Field
    } = {};

    for (let fieldPair of fieldListArray) {
      let currentKey = fieldPair[0];
      let currentValue = fieldPair[1];

      fieldListSortedObject[currentKey] = currentValue;
    }

    return fieldListSortedObject;
  }

  updateFieldSortedArray(fieldList: FieldList): Field[] {
    // Convert to array and sort field list
    let fieldListArray = Object.entries(fieldList);
    let fieldListSortedObject = this.sortFieldList(fieldListArray);

    let fieldListSortedArray: Field[] = [];
    Object.entries(fieldListSortedObject).map(([key, value]) => {
      fieldListSortedArray.push(value);
    });

    return fieldListSortedArray;
  }

  updateTemplateDataProperties(data: TemplateData): TemplateData {
    for (const field in data.fields) {
      const properties = data.fields[field].properties;

      for (const property in properties) {
        const currentProperty: Property = properties[property];

        if (currentProperty.unit === 'NULL') {
          delete currentProperty.unit;
        }

        if (currentProperty.units === 'NULL') {
          delete currentProperty.units;
        }

        if (currentProperty.options === 'NULL') {
          delete currentProperty.options;
        }

        if (currentProperty.units) {
          currentProperty.unitsArray = currentProperty.units.split(', ');
        }

        if (currentProperty.options) {
          currentProperty.optionsArray = currentProperty.options.split(', ');
        }
      }
    }

    return data;
  }

  getMaxZIndex(fieldList: FieldList): number {
    const zIndexArray: number[] = [];

    // If there are no fields, set a z-index of 0
    if (Object.keys(fieldList).length <= 0) {
      return 0;
    }

    for (const field in fieldList) {
      const currentField = fieldList[field];
      const currentFieldZIndex = currentField.properties['zIndex'].value;
      zIndexArray.push(Number(currentFieldZIndex));
    }

    const maxZIndex = Math.max(...zIndexArray);
    
    return maxZIndex + 1;
  }
}
