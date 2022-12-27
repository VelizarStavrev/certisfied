import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { variables } from '../variables';
import { UserService } from './user.service';
import { Templates } from '../interfaces/templates';

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
}
