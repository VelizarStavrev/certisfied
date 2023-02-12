import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Field } from 'src/app/interfaces/field';

@Component({
  selector: 'app-field-add',
  templateUrl: './field-add.component.html',
  styleUrls: ['./field-add.component.scss']
})
export class FieldAddComponent implements OnInit {
  buttonAddFieldText: string = 'Add';
  buttonAddFieldType: string = 'Primary';
  buttonAddFieldHTMLType: string = 'button';
  @Input() visibility: boolean = false;
  fieldTypeToAdd: string = '';
  @Output() buttonAddClick = new EventEmitter<Field>();

  constructor() { }

  ngOnInit(): void {
  }

  setFieldTypeToAdd(type: string): void {
    this.fieldTypeToAdd = type;
  }

  sendNewFieldData() {
    const timestamp = Date.now();

    const currentField: Field = {
      id: timestamp,
      type: this.fieldTypeToAdd,
      properties: {},
      template_id: ''
    };

    let currentProperties: {} = {};
    let orderNum: number = 0;

    switch (this.fieldTypeToAdd) {
      case 'Text':
        currentProperties = {
          'zIndex': {
            label: 'Layer position',
            value: 0,
            type: 'text',
            name: 'zIndex',
            orderNum: orderNum++
          },
          'content': {
            label: 'Text content',
            value: 'Example text',
            type: 'text',
            name: 'content',
            orderNum: orderNum++
          },
          'fontSize': {
            label: 'Font size',
            value: '16',
            type: 'text',
            unit: 'px',
            name: 'fontSize',
            orderNum: orderNum++
          },
          'textAlign': {
            label: 'Text alignment',
            value: 'Left',
            type: 'select',
            options: ['Left', 'Center', 'Right'],
            name: 'textAlign',
            orderNum: orderNum++
          },
          'transform': {
            label: 'Rotation',
            value: '0',
            type: 'text',
            unit: 'deg',
            name: 'transform',
            orderNum: orderNum++
          },
          'color': {
            label: 'Text color',
            value: '#000000',
            type: 'color',
            name: 'color',
            orderNum: orderNum++
          },
          'fontWeight': {
            label: 'Font weight',
            value: 'Normal',
            type: 'select',
            options: ['Normal', 'Bold'],
            name: 'fontWeight',
            orderNum: orderNum++
          },
          'fontStyle': {
            label: 'Font style',
            value: 'Normal',
            type: 'select',
            options: ['Normal', 'Italic'],
            name: 'fontStyle',
            orderNum: orderNum++
          },
          'textDecoration': {
            label: 'Text decoration',
            value: 'None',
            type: 'select',
            options: ['None', 'Underline', 'Line-through'],
            name: 'textDecoration',
            orderNum: orderNum++
          },
          'maxWidth': {
            label: 'Max width',
            value: '250',
            type: 'text',
            unit: 'px',
            name: 'maxWidth',
            orderNum: orderNum++
          },
          'left': {
            label: 'Position X',
            value: '50',
            type: 'text',
            unit: '%',
            name: 'left',
            orderNum: orderNum++
          },
          'top': {
            label: 'Position Y',
            value: '50',
            type: 'text',
            unit: '%',
            name: 'top',
            orderNum: orderNum++
          },
          'editable': {
            label: 'Editable',
            value: '0',
            type: 'boolean',
            name: 'editable',
            orderNum: orderNum++
          }
        }
        break;

      case 'Image':
        currentProperties = {
          'zIndex': {
            label: 'Layer position',
            value: 0,
            type: 'text',
            name: 'zIndex',
            orderNum: orderNum++
          },
          'url': {
            label: 'Image upload',
            value: '',
            type: 'upload',
            name: 'url',
            orderNum: orderNum++
          },
          'height': {
            label: 'Image height',
            value: '250',
            type: 'text',
            unit: 'px',
            units: ['px', '%'],
            name: 'height',
            orderNum: orderNum++
          },
          'width': {
            label: 'Image width',
            value: '500',
            type: 'text',
            unit: 'px',
            units: ['px', '%'],
            name: 'width',
            orderNum: orderNum++
          },
          'transform': {
            label: 'Rotation',
            value: '0',
            type: 'text',
            unit: 'deg',
            name: 'transform',
            orderNum: orderNum++
          },
          'left': {
            label: 'Position X',
            value: '50',
            type: 'text',
            unit: '%',
            name: 'left',
            orderNum: orderNum++
          },
          'top': {
            label: 'Position Y',
            value: '50',
            type: 'text',
            unit: '%',
            name: 'top',
            orderNum: orderNum++
          },
          'editable': {
            label: 'Editable',
            value: '0',
            type: 'boolean',
            name: 'editable',
            orderNum: orderNum++
          }
        };
        break;

      case 'Link':
        currentProperties = {
          'zIndex': {
            label: 'Layer position',
            value: 0,
            type: 'text',
            name: 'zIndex',
            orderNum: orderNum++
          },
          'content': {
            label: 'Text content',
            value: 'Example text',
            type: 'text',
            name: 'content',
            orderNum: orderNum++
          },
          'url': {
            label: 'Link',
            value: '/url',
            type: 'text',
            name: 'url',
            orderNum: orderNum++
          },
          'fontSize': {
            label: 'Font size',
            value: '16',
            type: 'text',
            unit: 'px',
            name: 'fontSize',
            orderNum: orderNum++
          },
          'textAlign': {
            label: 'Text alignment',
            value: 'Left',
            type: 'select',
            options: ['Left', 'Center', 'Right'],
            name: 'textAlign',
            orderNum: orderNum++
          },
          'transform': {
            label: 'Rotation',
            value: '0',
            type: 'text',
            unit: 'deg',
            name: 'transform',
            orderNum: orderNum++
          },
          'color': {
            label: 'Text color',
            value: '#4287f5',
            type: 'color',
            name: 'color',
            orderNum: orderNum++
          },
          'fontWeight': {
            label: 'Font weight',
            value: 'Normal',
            type: 'select',
            options: ['Normal', 'Bold'],
            name: 'fontWeight',
            orderNum: orderNum++
          },
          'fontStyle': {
            label: 'Font style',
            value: 'Italic',
            type: 'select',
            options: ['Normal', 'Italic'],
            name: 'fontStyle',
            orderNum: orderNum++
          },
          'textDecoration': {
            label: 'Text decoration',
            value: 'Underline',
            type: 'select',
            options: ['None', 'Underline', 'Line-through'],
            name: 'textDecoration',
            orderNum: orderNum++
          },
          'left': {
            label: 'Position X',
            value: '50',
            type: 'text',
            unit: '%',
            name: 'left',
            orderNum: orderNum++
          },
          'top': {
            label: 'Position Y',
            value: '50',
            type: 'text',
            unit: '%',
            name: 'top',
            orderNum: orderNum++
          },
          'editable': {
            label: 'Editable',
            value: '0',
            type: 'boolean',
            name: 'editable',
            orderNum: orderNum++
          },
          'autoGenerated': {
            label: 'Auto generated',
            value: '0',
            type: 'boolean',
            name: 'autoGenerated',
            orderNum: orderNum++
          }
        };
        break;

      default:
        currentProperties = {};
    }

    // Set the properties
    currentField.properties = currentProperties;

    // Remove the active field status
    this.fieldTypeToAdd = '';

    // Send the data to the parent
    this.buttonAddClick.emit(currentField);
  }

}
