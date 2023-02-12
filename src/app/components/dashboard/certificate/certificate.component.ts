import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LoaderService } from 'src/app/services/loader/loader.service';
import { MessageService } from 'src/app/services/message/message.service';
import { TemplateService } from 'src/app/services/template/template.service';
import { CertificateService } from 'src/app/services/certificate/certificate.service';
import { CertificateHelperService } from 'src/app/services/certificate-helper/certificate-helper.service';
import { Certificate } from 'src/app/interfaces/certificate';
import { Field } from 'src/app/interfaces/field';
import { Templates } from 'src/app/interfaces/templates';
import { Template } from 'src/app/interfaces/template';
import { Property } from 'src/app/interfaces/property';
import { TemplateInTemplates } from 'src/app/interfaces/template-in-templates';
import { FieldList } from 'src/app/interfaces/field-list';
import { FieldDataCurrent } from 'src/app/interfaces/field-data-current';
import { FieldsInCertificate } from 'src/app/interfaces/fields-in-certificate';

@Component({
  selector: 'app-certificate',
  templateUrl: './certificate.component.html',
  styleUrls: ['./certificate.component.scss']
})
export class CertificateComponent implements OnInit {
  certificateId: string = '';
  routeSub = this.route.params.subscribe(params => {
    this.certificateId = params['id'];
  });
  isEditCertificate: boolean = !!this.certificateId;

  certificateName: string = '';
  certificateCreatedDate: number = 0;
  certificateEditedDate: number = 0;
  certificateNotes: string = '';
  orientation: string = 'vertical';
  templateValue: string = '';
  templates: TemplateInTemplates[] = [];

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
  buttonCancelLink: string = '/dashboard/certificates';
  buttonCancelMarginLeft: boolean = true;

  getCertificate() {
    // If the route is edit, not new
    if (this.isEditCertificate) {
      // Show the loader
      this.loaderService.showLoader(true);

      this.certificateService.getCertificate(this.certificateId)
        .subscribe((data: Certificate) => {
          if (data.status) {
            const receivedData = data.template_data;
            const certificateData = data.data;

            for (let field in receivedData.fields) {
              let properties = receivedData.fields[field].properties;

              for (let property in properties) {
                let currentProperty: Property = properties[property];

                if (currentProperty.unit === 'NULL') {
                  delete currentProperty.unit;
                }

                if (currentProperty.units === 'NULL') {
                  delete currentProperty.units;
                }

                if (currentProperty.options === 'NULL') {
                  delete currentProperty.options;
                }

                if (typeof currentProperty.units === 'string') {
                  currentProperty.unitsArray = currentProperty.units.split(', ');
                }

                if (typeof currentProperty.options === 'string') {
                  currentProperty.optionsArray = currentProperty.options.split(', ');
                }
              }
            }

            const editableFields: string[] = [];

            for (let field in certificateData.fields) {
              let currentField = certificateData.fields[field];
              let currentFieldInTemplate = receivedData.fields[field];
              currentFieldInTemplate.properties[currentField.name].value = currentField.value;
              editableFields.push(field);
            }

            this.editableFields = editableFields;

            // Set the data
            this.currentFieldList = receivedData.fields;
            this.certificateName = certificateData.name;
            this.certificateCreatedDate = certificateData.created;
            this.certificateEditedDate = certificateData.edited;
            this.certificateNotes = certificateData.notes;
            this.orientation = receivedData.orientation;
            this.templateValue = receivedData.id;

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
          this.router.navigate(['/dashboard/certificates/']);

          // Hide the loader
          this.loaderService.showLoader(false);
        });
    }
  }

  saveCertificate() {
    let fieldList = structuredClone(this.currentFieldList);
    let fieldListFinal: FieldsInCertificate = {};

    for (const field in fieldList) {
      let currentField = fieldList[field];

      switch (currentField.type) {
        case 'Text':
        case 'Link':
          if (currentField.properties['editable'].value == '1') {
            const contentField = currentField.properties['content'];
            fieldListFinal[contentField.field_id] = {
              id: contentField.field_id,
              type: contentField.type,
              name: contentField.name,
              value: contentField.value
            };
          }

          break;

        case 'Image':
          // TO DO
          break;
      }
    }

    let data = {
      name: this.certificateName,
      notes: this.certificateNotes,
      template_id: this.templateValue,
      fields: fieldListFinal
    };

    // Show the loader
    this.loaderService.showLoader(true);

    if (this.isEditCertificate) {
      this.certificateService.editCertificate(this.certificateId, data)
        .subscribe((data: Certificate) => {
          this.handleResponse(data);
        });
    } else {
      this.certificateService.createCertificate(data)
        .subscribe((data: Certificate) => {
          this.handleResponse(data);
        });
    }
  }

  deleteCertificate() {
    // Show the loader
    this.loaderService.showLoader(true);

    this.certificateService.deleteCertificate(this.certificateId)
      .subscribe((data: Certificate) => {
        this.handleResponse(data);
      });
  }

  private handleResponse(responseData: Certificate): void {
    if (responseData.status) {
      // Add a success message
      this.messageService.setMessage({ type: 'message-success', message: responseData.message });

      // Redirect to the templates list
      this.router.navigate(['/dashboard/certificates/']);
    } else {
      // Add an error message
      this.messageService.setMessage({ type: 'message-error', message: responseData.message });
    }

    // Hide the loader
    this.loaderService.showLoader(false);
  }

  getTemplates() {
    this.templateService.getTemplates()
      .subscribe((data: Templates) => {
        if (data.status) {
          this.templates = data.data;
        }
      })
  }

  getTemplateById() {
    // Hide the edit menu
    this.hideFieldSettingsMenu();

    this.templateService.getTemplate(this.templateValue)
      .subscribe((data: Template) => {
        if (data.status) {
          const receivedData = data.data;

          for (let field in receivedData.fields) {
            let properties = receivedData.fields[field].properties;

            for (let property in properties) {
              let currentProperty: Property = properties[property];

              if (currentProperty.unit === 'NULL') {
                delete currentProperty.unit;
              }

              if (currentProperty.units === 'NULL') {
                delete currentProperty.units;
              }

              if (currentProperty.options === 'NULL') {
                delete currentProperty.options;
              }

              if (typeof currentProperty.units === 'string') {
                currentProperty.unitsArray = currentProperty.units.split(', ');
              }

              if (typeof currentProperty.options === 'string') {
                currentProperty.optionsArray = currentProperty.options.split(', ');
              }
            }
          }

          const editableFields = [];

          for (let field in receivedData.fields) {
            const currentField = receivedData.fields[field].properties;

            if (currentField['editable'].value == '1') {
              editableFields.push(field);
            }
          }

          this.editableFields = editableFields;

          // Set the data
          this.currentFieldList = receivedData.fields;
          this.orientation = receivedData.orientation;
          this.templateValue = receivedData.id || '';

          // Update field structure and styling
          this.updateFieldStructureAndStyling();

          // Add a success message
          this.messageService.setMessage({ type: 'message-success', message: data.message });

          // Hide the loader
          this.loaderService.showLoader(false);
          return;
        }

        // Add an error message
        this.messageService.setMessage({ type: 'message-error', message: data.message });

        // Hide the loader
        this.loaderService.showLoader(false);
      })
  }

  // Shared field list
  currentFieldList: FieldList = {};
  currentFieldListSorted: Field[] = [];
  currentFieldListStyling: {}[] = [];
  currentFieldListActive: number | null = null;
  editableFields: string[] = [];

  updateFieldStructureAndStyling() {
    // Update the field sorted array
    this.currentFieldListSorted = this.certificateHelperService.updateFieldSortedArray(this.currentFieldList);

    // Update the field list styling
    this.currentFieldListStyling = this.certificateHelperService.updateFieldListStyling(this.currentFieldListSorted);
  }

  setFieldId(id: number | null) {
    this.currentFieldListActive = id;
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
    // Set the clicked index to the field to be shown
    this.setFieldId(id);

    // Get and set the field data
    // Convert the properties to an array
    let currentFieldDataObject = this.currentFieldList[id];
    let currentFieldDataPropertiesObject = currentFieldDataObject.properties;
    let currentFieldDataPropertiesArray: Property[] = [];

    // Display only editable fields for the certificate component edit menu
    if (currentFieldDataPropertiesObject['editable'].value) {
      currentFieldDataPropertiesArray.push(currentFieldDataPropertiesObject['content']);
    }

    // Sort the fields by order number
    currentFieldDataPropertiesArray.sort((a, b) => {
      return Number(a.orderNum) - Number(b.orderNum);
    });

    let finalFieldData: FieldDataCurrent = {
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

  updateField(fieldData: { fieldId: number, fieldPropertyName: string, fieldValue: string, fieldIndex: number }) {
    // Set the field data
    let fieldList = structuredClone(this.currentFieldList);
    fieldList[fieldData.fieldId].properties[fieldData.fieldPropertyName].value = fieldData.fieldValue;
    this.currentFieldList = fieldList;

    // Update field structure and styling
    this.updateFieldStructureAndStyling();

    // Update the field data array
    this.currentFieldData ? this.currentFieldData.properties[fieldData.fieldIndex].value = fieldData.fieldValue : null;
  }

  constructor(private route: ActivatedRoute,
    public certificateService: CertificateService,
    public templateService: TemplateService,
    public loaderService: LoaderService,
    public messageService: MessageService,
    public router: Router,
    public certificateHelperService: CertificateHelperService
  ) { }

  ngOnInit(): void {
    this.getTemplates();
    this.getCertificate();
  }

  ngOnDestroy() {
    this.routeSub.unsubscribe();
  }

}
