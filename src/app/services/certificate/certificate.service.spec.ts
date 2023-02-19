import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { CertificateData } from 'src/app/interfaces/certificate-data';

import { CertificateService } from './certificate.service';

describe('CertificateService', () => {
  let service: CertificateService;
  let http: HttpTestingController;
  const serverURL = 'server/templates';
  const certificateId = '123456';
  const certificateData: CertificateData = {
    name: 'Certificate Name',
    notes: 'Certificate notes',
    template_id: '456',
    fields: {
      123: {
        id: '123',
        type: 'text',
        name: 'content',
        value: 'Example text'
      }
    }
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule
      ]
    });
    service = TestBed.inject(CertificateService);
    http = TestBed.inject(HttpTestingController);
    service.serverUrl = serverURL;
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('#getCertificates should send a request to the server', () => {
    service.getCertificates().subscribe(getData => {
      const getDataReturned: any = getData;
      expect(getDataReturned).toEqual('getCertificates response');
    });

    const req = http.expectOne(`${serverURL}/certificates`);
    expect(req.request.method).toBe('GET');
    req.flush('getCertificates response');
  });

  it('#getCertificate should send a request to the server', () => {
    service.getCertificate(certificateId).subscribe(getData => {
      const getDataReturned: any = getData;
      expect(getDataReturned).toEqual(certificateId);
    });

    const req = http.expectOne(`${serverURL}/certificate/${certificateId}`);
    expect(req.request.method).toBe('GET');
    req.flush(certificateId);
  });

  it('#createCertificate should send a request to the server', () => {
    service.createCertificate(certificateData).subscribe(postData => {
      const postDataReturned: any = postData;
      expect(postDataReturned).toEqual(certificateData);
    });

    const req = http.expectOne(`${serverURL}/certificate/new`);
    expect(req.request.method).toBe('POST');
    req.flush(certificateData);
  });

  it('#editCertificate should send a request to the server', () => {
    service.editCertificate(certificateId, certificateData).subscribe(postData => {
      const postDataReturned: any = postData;
      expect(postDataReturned).toEqual(certificateData);
    });

    const req = http.expectOne(`${serverURL}/certificate/edit/${certificateId}`);
    expect(req.request.method).toBe('POST');
    req.flush(certificateData);
  });

  it('#deleteCertificate should send a request to the server', () => {
    service.deleteCertificate(certificateId).subscribe(postData => {
      const postDataReturned: any = postData;
      expect(postDataReturned).toEqual(certificateData);
    });

    const req = http.expectOne(`${serverURL}/certificate/delete/${certificateId}`);
    expect(req.request.method).toBe('POST');
    req.flush(certificateData);
  });


  it('#getCertificateFile should send a request to the server', () => {
    service.getCertificateFile(certificateId).subscribe(getData => {
      const getDataReturned: any = getData;
      expect(getDataReturned).toEqual('getCertificateFile response');
    });

    const req = http.expectOne(`${serverURL}/certificate/file/${certificateId}`);
    expect(req.request.method).toBe('GET');
    req.flush('getCertificateFile response');
  });

  it('#verifyCertificate should send a request to the server', () => {
    service.verifyCertificate(certificateId).subscribe(getData => {
      const getDataReturned: any = getData;
      expect(getDataReturned).toEqual('verifyCertificate response');
    });

    const req = http.expectOne(`${serverURL}/verify/${certificateId}`);
    expect(req.request.method).toBe('GET');
    req.flush('verifyCertificate response');
  });
});
