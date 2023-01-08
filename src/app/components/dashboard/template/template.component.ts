import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TemplateService } from 'src/app/services/template.service';
import { LoaderService } from 'src/app/services/loader.service';
import { MessageService } from 'src/app/services/message.service';
import { Template } from 'src/app/interfaces/template';
import { Router } from '@angular/router';
import { Field } from 'src/app/interfaces/field';
import { Properties } from 'src/app/interfaces/properties';

@Component({
  selector: 'app-template',
  templateUrl: './template.component.html',
  styleUrls: ['./template.component.scss']
})
export class TemplateComponent implements OnInit {
  templateId: string = '';
  routeSub = this.route.params.subscribe(params => {
    this.templateId = params['id'];
  });
  isEditTemplate: boolean = !!this.templateId;

  templateName: string = '';
  templateCreatedDate: number = 0;
  templateEditedDate: number = 0;
  templateNotes: string = '';
  orientation: string = 'vertical';

  // Certificate buttons
  buttonSaveText: string = 'Save';
  buttonSaveType: string = 'Primary';
  buttonSaveHTMLType: string = 'button';
  buttonSaveMarginLeft: boolean = true;

  buttonResetText: string = 'Reset';
  buttonResetType: string = 'Secondary';
  buttonResetHTMLType: string = 'button';
  buttonResetMarginLeft: boolean = true;

  buttonDeleteText: string = 'Delete';
  buttonDeleteType: string = 'Error';
  buttonDeleteHTMLType: string = 'button';
  buttonDeleteMarginLeft: boolean = true;
  
  buttonCancelText: string = 'Cancel';
  buttonCancelType: string = 'Secondary';
  buttonCancelLink: string = '/dashboard/templates';
  buttonCancelMarginLeft: boolean = true;

  getTemplate(): void {
    // If the route is edit, not new
    if (this.isEditTemplate) {
      // Show the loader
      this.loaderService.showLoader(true);

      this.templateService.getTemplate(this.templateId)
        .subscribe((data: Template) => {
          if (data.status) {
            const receivedData = data.data;

            for (let field in receivedData.fields) {
                let properties: { 
                  field_id: string, 
                  label: string, 
                  name: string, 
                  orderNum: string, 
                  type: string, 
                  value: string, 
                  unit?: string, 
                  units?: string | [],
                  options?: string | [] 
                }[] = receivedData.fields[field].properties;
                
                for (let property in properties) {
                  let currentProperty: any = properties[property];

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
                    currentProperty.units = currentProperty.units.split(', ');
                  }

                  if (currentProperty.options) {
                    currentProperty.options = currentProperty.options.split(', ');
                  }
                }
            }

            // Set the data
            this.currentFieldList = receivedData.fields;
            this.templateName = receivedData.name;
            this.templateCreatedDate = receivedData.created;
            this.templateEditedDate = receivedData.edited;
            this.templateNotes = receivedData.notes;
            this.setOrientation(receivedData.orientation);

            // Update the field sorted array
            this.updateFieldSortedArray();

            // Update the field list styling
            this.updateFieldListStyling();

            // Add a success message
            this.messageService.setMessage({type: 'message-success', message: data.message});

            // Hide the loader
            this.loaderService.showLoader(false);
            return;
          }
  
          // Add a success message
          this.messageService.setMessage({type: 'message-error', message: data.message});
  
          // Redirect to the templates list
          this.router.navigate(['/dashboard/templates/']);

          // Hide the loader
          this.loaderService.showLoader(false);
        });
    }
  }

  saveTemplate(): void {
    let data: {
      name: string,
      notes: string,
      orientation: string,
      fields: []
    } = {
      name: this.templateName,
      notes: this.templateNotes,
      orientation: this.orientation,
      fields: this.currentFieldList
    }

    // Show the loader
    this.loaderService.showLoader(true);

    if (this.isEditTemplate) {
      this.templateService.editTemplate(this.templateId, data)
        .subscribe((data: Template) => {
          if (data.status) {
            // Set a new message
            this.messageService.setMessage({type: 'message-success', message: data.message});
  
            // Redirect the user
            this.router.navigate(['/dashboard/templates/']);
            
            // Hide the loader
            this.loaderService.showLoader(false);
            return;
          }
  
          // Add a success message
          this.messageService.setMessage({type: 'message-error', message: data.message});

          // Hide the loader
          this.loaderService.showLoader(false);
        });
    } else {
      this.templateService.createTemplate(data)
        .subscribe((data: Template) => {
          if (data.status) {
            // Set a new message
            this.messageService.setMessage({type: 'message-success', message: data.message});
  
            // Redirect the user
            this.router.navigate(['/dashboard/templates/']);
            
            // Hide the loader
            this.loaderService.showLoader(false);
            return;
          }
  
          // Add a success message
          this.messageService.setMessage({type: 'message-error', message: data.message});

          // Hide the loader
          this.loaderService.showLoader(false);
        });
    }
  }

  deleteTemplate(): void {
    // Show the loader
    this.loaderService.showLoader(true);
    
    this.templateService.deleteTemplate(this.templateId)
      .subscribe((data: Template) => {
        if (data.status) {
          // Set a new message
          this.messageService.setMessage({type: 'message-success', message: data.message});

          // Redirect the user
          this.router.navigate(['/dashboard/templates/']);
          
          // Hide the loader
          this.loaderService.showLoader(false);
          return;
        }

        // Add a success message
        this.messageService.setMessage({type: 'message-error', message: data.message});

        // Hide the loader
        this.loaderService.showLoader(false);
      });
  }

  // Shared field list
  currentFieldList: any = {};
  currentFieldListSorted: Field[] = [];
  currentFieldListStyling: any[] = [];

  // Add field menu
  currentFieldListActive: number | null = null;
  isFieldAddMenuHidden: boolean = true;

  hideFieldAddMenu(specificAction: boolean | null = null): void {
    // Provides an option to have a specific action set (true / false)
    // Otherwise works as a toggle
    this.isFieldAddMenuHidden = specificAction !== null ? specificAction : !this.isFieldAddMenuHidden;

    // If the menu is shown
    // Hide the settings menu
    if (!this.isFieldAddMenuHidden) {
      this.hideFieldSettingsMenu();
    }
  }

  getCurrentMaxZIndex() {
    const fieldList = structuredClone(this.currentFieldList);
    const zIndexArray: number[] = [];

    // If there are no fields, set a z-index of 1
    if (Object.keys(fieldList).length <= 0) {
        return 0;
    }

    for (const field in fieldList) {
        const currentField = fieldList[field];
        const currentFieldZIndex = currentField.properties.zIndex.value;
        zIndexArray.push(currentFieldZIndex);
    }

    let maxZIndex = Math.max(...zIndexArray);
    return maxZIndex + 1;
  }

  createField(fieldData: any): void {
    // Get current max z-index of all fields
    const zIndex = this.getCurrentMaxZIndex();

    // Push the field to the current field list
    let fieldList = structuredClone(this.currentFieldList);
    fieldData.properties.zIndex.value = zIndex;
    fieldList[fieldData.id] = fieldData;
    this.currentFieldList = fieldList;

    // Update the field sorted array
    this.updateFieldSortedArray();

    // Update the field list styling
    this.updateFieldListStyling();

    // Hide the new field menu
    this.hideFieldAddMenu(true);

    // Hide the menu
    this.hideFieldAddMenu(true);
  }

  deleteField(fieldId: number): void {
    // Remove the field from the current field list
    let fieldList = structuredClone(this.currentFieldList);
    delete fieldList[fieldId];

    // Set the new field list structure
    this.currentFieldList = fieldList;

    // Update the field sorted array
    this.updateFieldSortedArray();

    // Update the field list styling
    this.updateFieldListStyling();
  }

  updateField(fieldData: any) {
    // Set the field data
    let fieldList = structuredClone(this.currentFieldList);
    fieldList[fieldData.fieldId].properties[fieldData.fieldPropertyName].value = fieldData.fieldValue;
    this.currentFieldList = fieldList;

    // Update the field sorted array
    this.updateFieldSortedArray();

    // Update the field list styling
    this.updateFieldListStyling();

    // Update the field data array
    this.currentFieldData ? this.currentFieldData.properties[fieldData.fieldIndex].value = fieldData.fieldValue : null;
  }

  updateFieldUnit(fieldData: { fieldId: number, fieldPropertyName: string, fieldUnit: string, fieldIndex: number }) {
    // Set the field data
    let fieldList: any = structuredClone(this.currentFieldList);
    fieldList[fieldData.fieldId].properties[fieldData.fieldPropertyName].unit = fieldData.fieldUnit;
    this.currentFieldList = fieldList;

    // Update the field sorted array
    this.updateFieldSortedArray();

    // Update the field list styling
    this.updateFieldListStyling();

    // Update the field data array
    this.currentFieldData ? this.currentFieldData.properties[fieldData.fieldIndex].unit = fieldData.fieldUnit : null;
  }

  // Edit field menu
  isFieldSettingsMenuHidden: boolean = true;
  currentFieldData: Field | null = null;

  hideFieldSettingsMenu() {
    // Hide the menu
    this.isFieldSettingsMenuHidden = true;

    // Unset the active field
    this.setFieldId(null);
  }

  showFieldEditMenu(id: number): void {
    // Hide the add menu
    this.hideFieldAddMenu(true);

    // Set the clicked index to the field to be shown
    this.setFieldId(id);

    // Get and set the field data
    // Convert the properties to an array
    let currentFieldDataObject = this.currentFieldList[id];
    let currentFieldDataPropertiesObject = currentFieldDataObject.properties;
    let currentFieldDataPropertiesArray: any[] = [];

    // TO DO
    // Sort the fields by order
    // Won't work until a new certificate is created

    Object.entries(currentFieldDataPropertiesObject).map(([key, value]) => {
      currentFieldDataPropertiesArray.push(value);
    });

    let finalFieldData: any = structuredClone(currentFieldDataObject);
    finalFieldData.properties = currentFieldDataPropertiesArray;

    this.currentFieldData = finalFieldData;

    // Show the edit menu
    this.isFieldSettingsMenuHidden = false;
  }

  sortFieldList(currentFieldListArray: any) {
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

  updateFieldSortedArray() {
    // Convert to array and sort field list
    let currentFieldListArray = Object.entries(this.currentFieldList);
    let currentFieldListSortedObject = this.sortFieldList(currentFieldListArray);
    this.currentFieldListSorted = currentFieldListSortedObject;

    let currentFieldListSortedArray: any[] = [];
    Object.entries(currentFieldListSortedObject).map(([key, value]) => {
      currentFieldListSortedArray.push(value);
    });

    this.currentFieldListSorted = currentFieldListSortedArray;
  }

  setFieldId(id: number | null) { 
    this.currentFieldListActive = id;
  }

  getFieldStyles(properties: Properties[]) {
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

  updateFieldListStyling() {
    // Set the field styles to an array
    let fieldListStyling: any = [];

    this.currentFieldListSorted.forEach((element: any) => {
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

    this.currentFieldListStyling = fieldListStyling;
  }

  // Drag functionality
  @ViewChild('certificateContainer') certificateContainer: ElementRef | undefined;
  currentDragFieldDifferenceX: number = 0;
  currentDragFieldDifferenceY: number = 0;

  setInitialFieldPosition(event: any) {
    this.currentDragFieldDifferenceX = event.pageX - event.target.offsetLeft;
    this.currentDragFieldDifferenceY = event.pageY - event.target.offsetTop;
  }

  updateFieldPosition(event: any, fieldId: number) {
    const fieldEndX = event.pageX;
    const fieldEndY = event.pageY;
    const containerHeight = this.certificateContainer?.nativeElement.clientHeight;
    const containerHeightOffset = this.certificateContainer?.nativeElement.offsetTop;
    const containerWidth = this.certificateContainer?.nativeElement.clientWidth;
    const containerWidthOffset = this.certificateContainer?.nativeElement.offsetLeft;
    const pageHeaderHeight = 70; // Due to the position of the main component, the offsetTop excludes the header
    const fieldDragOffsetX = this.currentDragFieldDifferenceX - containerWidthOffset;
    const fieldDragOffsetY = this.currentDragFieldDifferenceY - pageHeaderHeight - containerHeightOffset;
    const fieldX = ((((fieldEndX - fieldDragOffsetX) - containerWidthOffset) / containerWidth) * 100).toFixed(2);
    const fieldY = (((fieldEndY - fieldDragOffsetY - (containerHeightOffset + pageHeaderHeight)) / containerHeight) * 100).toFixed(2);

    // Set the field data
    let fieldList = structuredClone(this.currentFieldList);
    fieldList[fieldId].properties.left.value = fieldX;
    fieldList[fieldId].properties.top.value = fieldY;
    this.currentFieldList = fieldList;

    // Update the field sorted array
    this.updateFieldSortedArray();

    // Update the field list styling
    this.updateFieldListStyling();
  }

  // Certificate buttons and display
  @ViewChild('certificateMainContainer') certificateMainContainer: ElementRef | undefined;
  @ViewChild('certificateFEContainer') certificateFEContainer: ElementRef | undefined;
  certificateWidthDifferencePercent: number = 1;
  certificateHeight: string = '297mm';

  setOrientation(type: string): void {
    // Set the type
    this.orientation = type;

    // TO DO - impelement a better solution
    // Due to quick updates the properties are not yet updated
    // When the function runs
    setTimeout(() => {
      // Set the dimensions of the certificate
      this.setDimensions();
    }, 1);
  }

  setDimensions(): void {
    const certificateMainContainerWidth: number = this.certificateMainContainer?.nativeElement.clientWidth;
    const certificateFEContainerWidth: number = this.certificateFEContainer?.nativeElement.clientWidth;
    const certificateWidthDifferencePercentResult = certificateMainContainerWidth / certificateFEContainerWidth;
    this.certificateWidthDifferencePercent = certificateWidthDifferencePercentResult;
    this.certificateHeight = (this.certificateFEContainer?.nativeElement.clientHeight * certificateWidthDifferencePercentResult) + 'px';
  }

  constructor(private route: ActivatedRoute, 
    public templateService: TemplateService, 
    public loaderService: LoaderService, 
    public messageService: MessageService,
    public router: Router
  ) { }

  // TO DO - error on view init
  ngAfterViewInit(): void {
    // Set the dimensions of the certificate
    this.setDimensions();
  }

  ngOnInit(): void {
    this.getTemplate();
  }

  ngOnDestroy() {
    this.routeSub.unsubscribe();
  }

}
