import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { variables } from '../variables';
import { Templates } from '../interfaces/templates';
import { Template} from '../interfaces/template';
import { TemplateData } from '../interfaces/template-data';

@Injectable({
  providedIn: 'root'
})
export class TemplateService {

  constructor(private http: HttpClient) { }

  serverUrl = variables.serverURL;

  getTemplates() {
    return this.http.get<Templates>(this.serverUrl + '/templates');
  }

  getTemplate(templateId: string) {
    return this.http.get<Template>(this.serverUrl + '/template/' + templateId);
  }

  createTemplate(
    fieldData: TemplateData
  ) {
    return this.http.post<Template>(this.serverUrl + '/template/new', fieldData);
  }

  editTemplate(
    templateId: string, 
    fieldData: TemplateData
  ) {
    return this.http.post<Template>(this.serverUrl + '/template/edit/' + templateId, fieldData);
  }

  deleteTemplate(templateId: string) {
    return this.http.post<Template>(this.serverUrl + '/template/delete/' + templateId, null);
  }
}
