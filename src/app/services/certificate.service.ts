import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { variables } from '../variables';
import { UserService } from './user.service';
import { Certificates } from '../interfaces/certificates';

@Injectable({
  providedIn: 'root'
})
export class CertificateService {

  constructor(private http: HttpClient, private userService: UserService) { }

  serverUrl = variables.serverURL;
  userToken = this.userService.getUserToken();

  getCertificates() {
    return this.http.get<Certificates>(this.serverUrl + '/certificates', 
      { headers: {
        'Authorization': 'Bearer ' + this.userToken
      }});
  }

}
