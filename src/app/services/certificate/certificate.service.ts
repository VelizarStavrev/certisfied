import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { variables } from 'src/app/variables';
import { Certificates } from 'src/app/interfaces/certificates';
import { Certificate } from 'src/app/interfaces/certificate';

@Injectable({
  providedIn: 'root'
})
export class CertificateService {

  constructor(private http: HttpClient) { }

  serverUrl = variables.serverURL;

  getCertificates() {
    return this.http.get<Certificates>(this.serverUrl + '/certificates');
  }

  getCertificate(certificateId: string) {
    return this.http.get<Certificate>(this.serverUrl + '/certificate/' + certificateId);
  }

  createCertificate(data: {}) {
    return this.http.post<Certificate>(this.serverUrl + '/certificate/new', data);
  }

  editCertificate(certificateId: string, data: {}) {
    return this.http.post<Certificate>(this.serverUrl + '/certificate/edit/' + certificateId, data);
  }

  deleteCertificate(certificateId: string) {
    return this.http.post<Certificate>(this.serverUrl + '/certificate/delete/' + certificateId, null);
  }

  getCertificateFile(certificateId: string) {
    return this.http.get<Certificate>(this.serverUrl + '/certificate/file/' + certificateId);
  }

  verifyCertificate(certificateId: string) {
    return this.http.get<Certificate>(this.serverUrl + '/verify/' + certificateId);
  }

}
