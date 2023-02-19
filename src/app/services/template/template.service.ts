import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { variables } from 'src/app/variables';
import { Templates } from 'src/app/interfaces/templates';
import { Template } from 'src/app/interfaces/template';
import { TemplateData } from 'src/app/interfaces/template-data';

@Injectable({
  providedIn: 'root'
})
export class TemplateService {
  serverUrl = variables.serverURL;

  constructor(private http: HttpClient) { }

  getTemplates() {
    return this.http.get<Templates>(this.serverUrl + '/templates');
  }

  getTemplate(templateId: string) {
    return this.http.get<Template>(this.serverUrl + '/template/' + templateId);
  }

  createTemplate(fieldData: TemplateData) {
    return this.http.post<Template>(this.serverUrl + '/template/new', fieldData);
  }

  editTemplate(templateId: string, fieldData: TemplateData) {
    return this.http.post<Template>(this.serverUrl + '/template/edit/' + templateId, fieldData);
  }

  deleteTemplate(templateId: string) {
    return this.http.post<Template>(this.serverUrl + '/template/delete/' + templateId, null);
  }
}
