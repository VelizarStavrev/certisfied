import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FieldDataCurrent } from 'src/app/interfaces/field-data-current';

@Component({
  selector: 'app-field-settings',
  templateUrl: './field-settings.component.html',
  styleUrls: ['./field-settings.component.scss']
})
export class FieldSettingsComponent implements OnInit {
  buttonText: string = 'Done';
  buttonType: string = 'Primary';
  buttonHTMLType: string = 'button';
  arrowIcon: string = '../../../../assets/icons/arrow.svg';
  @Input() visibility: boolean = false;
  @Input() currentFieldData: FieldDataCurrent | null = null;
  @Output() buttonDoneClick = new EventEmitter<{}>();
  @Output() editField = new EventEmitter<{ fieldId: number, fieldPropertyName: string, fieldValue: string, fieldIndex: number }>();
  @Output() editFieldUnit = new EventEmitter<{ fieldId: number, fieldPropertyName: string, fieldUnit: string, fieldIndex: number }>();

  hideFieldSettingsMenu() {
    this.buttonDoneClick.emit();
  }

  updateField(fieldPropertyName: string, event: any, fieldPropertyValue: string = '', fieldIndex: number): void {
    let fieldValue: string = fieldPropertyValue;

    let fieldData: { fieldId: number, fieldPropertyName: string, fieldValue: string, fieldIndex: number } = {
      fieldId: this.currentFieldData!.id,
      fieldPropertyName,
      fieldValue,
      fieldIndex
    };

    if (this.currentFieldData?.type === 'Image' && fieldPropertyName === 'url') {
      let files: FileList = event.target.files;
      let fileReader = new FileReader();
      fileReader.readAsDataURL(files[0]);

      fileReader.onload = (event: any) => {
        let imageData = event.target.result;
        fieldValue = imageData;

        fieldData.fieldValue = fieldValue;

        this.editField.emit(fieldData);
      }
    } else {
      if (!fieldPropertyValue) {
        fieldValue = event.target.value;
      }

      fieldData.fieldValue = fieldValue;

      this.editField.emit(fieldData);
    }
  }

  updateFieldUnit(fieldPropertyName: string, fieldUnit: string, fieldIndex: number): void {
    const fieldData: { fieldId: number, fieldPropertyName: string, fieldUnit: string, fieldIndex: number } = {
      fieldId: this.currentFieldData!.id,
      fieldPropertyName,
      fieldUnit,
      fieldIndex
    };
    
    fieldData.fieldId = this.currentFieldData!.id;

    this.editFieldUnit.emit(fieldData);
  }

  constructor() { }

  ngOnInit(): void {
  }

}
