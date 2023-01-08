import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { variables } from '../variables';
import { UserService } from './user.service';
import { Templates } from '../interfaces/templates';
import { Template} from '../interfaces/template';

@Injectable({
  providedIn: 'root'
})
export class TemplateService {

  constructor(private http: HttpClient, private userService: UserService) { }

  serverUrl = variables.serverURL;
  userToken = this.userService.getUserToken();

  getTemplates() {
    return this.http.get<Templates>(this.serverUrl + '/templates', 
      { headers: {
        'Authorization': 'Bearer ' + this.userToken
      }});
  }

  getTemplate(templateId: string) {
    return this.http.get<Template>(this.serverUrl + '/template/' + templateId, 
      { headers: {
        'Authorization': 'Bearer ' + this.userToken
      }});
  }

  createTemplate(
    fieldData: {
      name: string,
      notes: string,
      orientation: string,
      fields: []
    }
  ) {
    return this.http.post<Template>(this.serverUrl + '/template/new', 
      fieldData, // Body
      { headers: {
        'Authorization': 'Bearer ' + this.userToken
      }});
  }

  editTemplate(
    templateId: string, 
    fieldData: {
      name: string,
      notes: string,
      orientation: string,
      fields: []
    }
  ) {
    return this.http.post<Template>(this.serverUrl + '/template/edit/' + templateId, 
      fieldData, // Body
      { headers: {
        'Authorization': 'Bearer ' + this.userToken
      }});
  }

  deleteTemplate(templateId: string) {
    return this.http.post<Template>(this.serverUrl + '/template/delete/' + templateId, 
      null,
      { headers: {
        'Authorization': 'Bearer ' + this.userToken
      }});
  }
}
