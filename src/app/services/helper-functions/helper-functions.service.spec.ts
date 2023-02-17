import { TestBed } from '@angular/core/testing';
import { Field } from 'src/app/interfaces/field';
import { FieldList } from 'src/app/interfaces/field-list';
import { TemplateData } from 'src/app/interfaces/template-data';
import { fieldList, fieldListSortedArray, expectedFieldListStyling } from 'src/app/utils/field-related-data';
import { HelperFunctionsService } from './helper-functions.service';

describe('HelperFunctionsService', () => {
  let service: HelperFunctionsService;
  
  const templateData: TemplateData = {
    fields: {
      123456: {
        id: 123456,
        template_id: '123',
        type: 'text',
        properties: {
          fontSize: {
            unit: {
              field_id: '1',
              label: 'Test',
              name: 'Test',
              orderNum: '0',
              type: 'text',
              value: 'Test'
            },
          }
        } as any
      } as Field,
      456789: {
        id: 456789,
        template_id: '456',
        type: 'text',
        properties: {
          width: {
            unit: 'NULL',
            units: 'NULL',
            options: 'NULL',
          }
        } as any
      } as Field,
      987654: {
        id: 987654,
        template_id: '789',
        type: 'text',
        properties: {
          width: {
            unit: {
              field_id: '1',
              label: 'Test',
              name: 'Test',
              orderNum: '0',
              type: 'text',
              value: 'Test'
            },
            units: 'unit1, unit2',
            options: 'opt1, opt2'
          }
        } as any
      } as Field,
    } as FieldList,
  } as TemplateData;

  const expectedTemplateData: TemplateData = {
    fields: {
      123456: {
        id: 123456,
        template_id: '123',
        type: 'text',
        properties: {
          fontSize: {
            unit: {
              field_id: '1',
              label: 'Test',
              name: 'Test',
              orderNum: '0',
              type: 'text',
              value: 'Test'
            },
          }
        } as any
      } as Field,
      456789: {
        id: 456789,
        template_id: '456',
        type: 'text',
        properties: { width: {} } as any
      } as Field,
      987654: {
        id: 987654,
        template_id: '789',
        type: 'text',
        properties: {
          width: {
            unit: {
              field_id: '1',
              label: 'Test',
              name: 'Test',
              orderNum: '0',
              type: 'text',
              value: 'Test'
            },
            units: 'unit1, unit2',
            unitsArray: ['unit1', 'unit2'],
            options: 'opt1, opt2',
            optionsArray: ['opt1', 'opt2']
          }
        } as any
      } as Field,
    } as FieldList,
  } as TemplateData;
  
  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HelperFunctionsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('#updateFieldListStyling', () => {
    const fieldListStylingResult = service.updateFieldListStyling(fieldListSortedArray);
    expect(fieldListStylingResult).toEqual(expectedFieldListStyling);
  });

  it('#updateFieldSortedArray should accept a fieldList object and return the sorted by zIndex field list array', () => {
    const fieldListSortedArrayResult = service.updateFieldSortedArray(fieldList);
    expect(fieldListSortedArrayResult).toEqual(fieldListSortedArray);
  });

  it('#updateTemplateDataProperties should accept received TemplateData and return the same data with updated or removed properties', () => {
    const updateTemplateDataPropertiesResult = service.updateTemplateDataProperties(templateData);

    expect(updateTemplateDataPropertiesResult).toEqual(expectedTemplateData);
  });

  it('#getMaxZIndex should accept a fieldList object and return the maximum number of all zIndexes', () => {
    const getMaxZIndexResult = service.getMaxZIndex(fieldList);

    expect(getMaxZIndexResult).toEqual(7);
  });
});
