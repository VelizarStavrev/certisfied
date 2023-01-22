import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { variables } from '../variables';
import { UserService } from './user.service';
import { Certificates } from '../interfaces/certificates';
import { Certificate } from '../interfaces/certificate';

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

  getCertificate(certificateId: string) {
    return this.http.get<Certificate>(this.serverUrl + '/certificate/' + certificateId, 
      { headers: {
        'Authorization': 'Bearer ' + this.userToken
      }});
  }

  createCertificate(data: {}) {
    return this.http.post<Certificate>(this.serverUrl + '/certificate/new', 
      data,
      { headers: {
        'Authorization': 'Bearer ' + this.userToken
      }});
  }

  editCertificate(certificateId: string, data: {}) {
    return this.http.post<Certificate>(this.serverUrl + '/certificate/edit/' + certificateId, 
      data,
      { headers: {
        'Authorization': 'Bearer ' + this.userToken
      }});
  }

  deleteCertificate(certificateId: string) {
    return this.http.post<Certificate>(this.serverUrl + '/certificate/delete/' + certificateId, 
      null,
      { headers: {
        'Authorization': 'Bearer ' + this.userToken
      }});
  }

  getCertificateFile(certificateId: string) {
    return this.http.get<Certificate>(this.serverUrl + '/certificate/file/' + certificateId, 
      { headers: {
        'Authorization': 'Bearer ' + this.userToken
      }});
  }

}
