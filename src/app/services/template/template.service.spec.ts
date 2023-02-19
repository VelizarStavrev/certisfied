import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { TemplateData } from 'src/app/interfaces/template-data';

import { TemplateService } from './template.service';

describe('TemplateService', () => {
  let service: TemplateService;
  let http: HttpTestingController;
  const serverURL = 'server/templates';
  const templateId = '123456';
  const templateData: TemplateData = {
    id: '123',
    name: 'Template #1',
    notes: 'Example notes',
    orientation: 'horizontal',
    fields: {
      123: {
        id: 123,
        template_id: '',
        type: '',
        properties: {
          width: {
            field_id: '123',
            label: 'Width',
            name: 'width',
            orderNum: '1',
            type: 'text',
            value: 'value'
          }
        }
      }
    },
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule
      ]
    });
    service = TestBed.inject(TemplateService);
    http = TestBed.inject(HttpTestingController);
    service.serverUrl = serverURL;
  });

  afterEach(() => {
    http.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('#getTemplates should send a request to the server', () => {
    service.getTemplates().subscribe(getData => {
      const getDataReturned: any = getData;
      expect(getDataReturned).toEqual('getTemplates response');
    });

    const req = http.expectOne(`${serverURL}/templates`);
    expect(req.request.method).toBe('GET');
    req.flush('getTemplates response');
  });

  it('#getTemplate should send a request to the server', () => {
    service.getTemplate(templateId).subscribe(getData => {
      const getDataReturned: any = getData;
      expect(getDataReturned).toEqual(templateId);
    });

    const req = http.expectOne(`${serverURL}/template/${templateId}`);
    expect(req.request.method).toBe('GET');
    req.flush(templateId);
  });

  it('#createTemplate should send a request to the server', () => {
    service.createTemplate(templateData).subscribe(postData => {
      const postDataReturned: any = postData;
      expect(postDataReturned).toEqual(templateData);
    });

    const req = http.expectOne(`${serverURL}/template/new`);
    expect(req.request.method).toBe('POST');
    req.flush(templateData);
  });

  it('#editTemplate should send a request to the server', () => {
    service.editTemplate(templateId, templateData).subscribe(postData => {
      const postDataReturned: any = postData;
      expect(postDataReturned).toEqual(templateData);
    });

    const req = http.expectOne(`${serverURL}/template/edit/${templateId}`);
    expect(req.request.method).toBe('POST');
    req.flush(templateData);
  });
  
  it('#deleteTemplate should send a request to the server', () => {
    service.deleteTemplate(templateId).subscribe(postData => {
      const postDataReturned: any = postData;
      expect(postDataReturned).toEqual(templateData);
    });

    const req = http.expectOne(`${serverURL}/template/delete/${templateId}`);
    expect(req.request.method).toBe('POST');
    req.flush(templateData);
  });
});
