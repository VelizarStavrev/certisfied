import { Injectable } from '@angular/core';
import { Properties } from '../interfaces/properties';
import { Field } from '../interfaces/field';

@Injectable({
  providedIn: 'root'
})
export class CertificateHelperService {

  constructor() { }

  private getFieldStyles(properties: Properties[]): [] {
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

    let finalCSSObject: any = {};

    for (let property in currentProperties) {
      let currentCSSProperty = property;
      let currentCSSValue = currentProperties[property].value;
      finalCSSObject[currentCSSProperty] = currentCSSValue;
    }

    finalCSSObject['position'] = 'absolute';
    return finalCSSObject;
  }

  updateFieldListStyling(fieldList: any): [] {
    // Set the field styles to an array
    let fieldListStyling: any = [];

    fieldList.forEach((element: any) => {
      let currentStyles: any = this.getFieldStyles(element.properties);
      let currentFieldData: any = {
        id: element.id,
        template_id: element.template_id,
        type: element.type,
        styles: currentStyles
      };

      // Field specific data and styles
      switch(element.type) {
        case 'Text':
          currentFieldData.content = element.properties.content.value;
          currentFieldData.styles.width = '100%';
          break;

        case 'Image':
          currentFieldData.url = element.properties.url.value;
          break;

        case 'Link':
          currentFieldData.content = element.properties.content.value;
          currentFieldData.url = element.properties.url.value;
          break;
      }

      fieldListStyling.push(currentFieldData);
    });

    return fieldListStyling;
  }

  updateFieldSortedArray(fieldList: any): Field[] {
    // Convert to array and sort field list
    let currentFieldListArray = Object.entries(fieldList);
    let currentFieldListSortedObject = this.sortFieldList(currentFieldListArray);

    let currentFieldListSortedArray: any[] = [];
    Object.entries(currentFieldListSortedObject).map(([key, value]) => {
      currentFieldListSortedArray.push(value);
    });

    return currentFieldListSortedArray;
  }

  private sortFieldList(currentFieldListArray: any): [] {
    currentFieldListArray.sort((a: any, b: any) => {
      let firstValue = a[1]['properties']['zIndex'].value;
      let secondValue = b[1]['properties']['zIndex'].value;

      return secondValue - firstValue;
    });

    let currentFieldListSortedObject: any = {};

    for (let fieldPair of currentFieldListArray) {
      let currentKey = fieldPair[0];
      let currentValue = fieldPair[1];

      currentFieldListSortedObject[currentKey] = currentValue;
    }

    return currentFieldListSortedObject;
  }
}