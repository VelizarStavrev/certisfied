import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TemplateService } from 'src/app/services/template/template.service';
import { LoaderService } from 'src/app/services/loader/loader.service';
import { MessageService } from 'src/app/services/message/message.service';
import { Template } from 'src/app/interfaces/template';
import { Router } from '@angular/router';
import { Field } from 'src/app/interfaces/field';
import { HelperFunctionsService } from 'src/app/services/helper-functions/helper-functions.service';
import { TemplateData } from 'src/app/interfaces/template-data';
import { FieldDataCurrent } from 'src/app/interfaces/field-data-current';
import { FieldList } from 'src/app/interfaces/field-list';
import { Property } from 'src/app/interfaces/property';

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
            const updatedData = this.helperFunctionsService.updateTemplateDataProperties(receivedData);

            // Set the data
            this.currentFieldList = updatedData.fields;
            this.templateName = updatedData.name;
            this.templateCreatedDate = updatedData.created || 0;
            this.templateEditedDate = updatedData.edited || 0;
            this.templateNotes = updatedData.notes;
            this.setOrientation(updatedData.orientation);

            // Update field structure and styling
            this.updateFieldStructureAndStyling();

            // Add a success message
            this.messageService.setMessage({ type: 'message-success', message: data.message });

            // Hide the loader
            this.loaderService.showLoader(false);
            return;
          }

          // Add a success message
          this.messageService.setMessage({ type: 'message-error', message: data.message });

          // Redirect to the templates list
          this.router.navigate(['/dashboard/templates/']);

          // Hide the loader
          this.loaderService.showLoader(false);
        });
    }
  }

  saveTemplate(): void {
    const data: TemplateData = {
      id: '',
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
          this.handleResponse(data);
        });
    } else {
      this.templateService.createTemplate(data)
        .subscribe((data: Template) => {
          this.handleResponse(data);
        });
    }
  }

  deleteTemplate(): void {
    // Show the loader
    this.loaderService.showLoader(true);

    this.templateService.deleteTemplate(this.templateId)
      .subscribe((data: Template) => {
        this.handleResponse(data);
      });
  }

  private handleResponse(responseData: Template): void {
    if (responseData.status) {
      // Set a new message
      this.messageService.setMessage({ type: 'message-success', message: responseData.message });

      // Redirect the user
      this.router.navigate(['/dashboard/templates/']);
    } else {
      // Add an error message
      this.messageService.setMessage({ type: 'message-error', message: responseData.message });
    }

    // Hide the loader
    this.loaderService.showLoader(false);
  }

  // Shared field list
  currentFieldList: FieldList = {};
  currentFieldListSorted: Field[] = [];
  currentFieldListStyling: {}[] = [];

  updateFieldStructureAndStyling() {
    // Update the field sorted array
    this.currentFieldListSorted = this.helperFunctionsService.updateFieldSortedArray(this.currentFieldList);

    // Update the field list styling
    this.currentFieldListStyling = this.helperFunctionsService.updateFieldListStyling(this.currentFieldListSorted);
  }

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

  createField(fieldData: Field): void {
    // Get current max z-index of all fields
    const zIndex = this.helperFunctionsService.getMaxZIndex(this.currentFieldList);

    // Push the field to the current field list
    const fieldList = structuredClone(this.currentFieldList);
    fieldData.properties['zIndex'].value = zIndex.toString();
    fieldList[fieldData.id] = fieldData;
    this.currentFieldList = fieldList;

    // Update field structure and styling
    this.updateFieldStructureAndStyling();

    // Hide the new field menu
    this.hideFieldAddMenu(true);
  }

  deleteField(fieldId: number): void {
    // Remove the field from the current field list
    const fieldList = structuredClone(this.currentFieldList);
    delete fieldList[fieldId];

    // Set the new field list structure
    this.currentFieldList = fieldList;

    // Update field structure and styling
    this.updateFieldStructureAndStyling();
  }

  updateField(fieldData: { fieldId: number, fieldPropertyName: string, fieldValue: string, fieldIndex: number }) {
    // Set the field data
    const fieldList = structuredClone(this.currentFieldList);
    fieldList[fieldData.fieldId].properties[fieldData.fieldPropertyName].value = fieldData.fieldValue;
    this.currentFieldList = fieldList;

    // Update field structure and styling
    this.updateFieldStructureAndStyling();

    // Update the field data array
    this.currentFieldData ? this.currentFieldData.properties[fieldData.fieldIndex].value = fieldData.fieldValue : null;
  }

  updateFieldUnit(fieldData: { fieldId: number, fieldPropertyName: string, fieldUnit: string, fieldIndex: number }) {
    // Set the field data
    const fieldList = structuredClone(this.currentFieldList);
    fieldList[fieldData.fieldId].properties[fieldData.fieldPropertyName].unit = fieldData.fieldUnit;
    this.currentFieldList = fieldList;

    // Update field structure and styling
    this.updateFieldStructureAndStyling();

    // Update the field data array
    this.currentFieldData ? this.currentFieldData.properties[fieldData.fieldIndex].unit = fieldData.fieldUnit : null;
  }

  // Edit field menu
  isFieldSettingsMenuHidden: boolean = true;
  currentFieldData: FieldDataCurrent | null = null;

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
    const currentFieldDataObject = this.currentFieldList[id];
    const currentFieldDataPropertiesObject = currentFieldDataObject.properties;
    const currentFieldDataPropertiesArray: Property[] = [];

    Object.entries(currentFieldDataPropertiesObject).map(([key, value]) => {
      currentFieldDataPropertiesArray.push(value);
    });

    // Sort the fields by order number
    currentFieldDataPropertiesArray.sort((a, b) => {
      return Number(a.orderNum) - Number(b.orderNum);
    });

    const finalFieldData: FieldDataCurrent = {
      id: currentFieldDataObject.id,
      template_id: currentFieldDataObject.template_id,
      type: currentFieldDataObject.type,
      properties: []
    };
    finalFieldData.properties = currentFieldDataPropertiesArray;

    this.currentFieldData = finalFieldData;

    // Show the edit menu
    this.isFieldSettingsMenuHidden = false;
  }

  setFieldId(id: number | null) {
    this.currentFieldListActive = id;
  }

  updateFieldPosition(fieldData: { fieldId: number, fieldX: string, fieldY: string }) {
    // Set the field data
    const fieldList = structuredClone(this.currentFieldList);
    fieldList[fieldData.fieldId].properties['left'].value = fieldData.fieldX;
    fieldList[fieldData.fieldId].properties['top'].value = fieldData.fieldY;
    this.currentFieldList = fieldList;

    // Update field structure and styling
    this.updateFieldStructureAndStyling();

    // Set the fieldId again to refresh the menu
    this.showFieldEditMenu(fieldData.fieldId);
  }

  setOrientation(type: string): void {
    // Set the type
    this.orientation = type;
  }

  constructor(
    private route: ActivatedRoute,
    private templateService: TemplateService,
    private loaderService: LoaderService,
    private messageService: MessageService,
    private router: Router,
    private helperFunctionsService: HelperFunctionsService
  ) { }

  ngOnInit(): void {
    this.getTemplate();
  }

  ngOnDestroy() {
    this.routeSub.unsubscribe();
  }

}
