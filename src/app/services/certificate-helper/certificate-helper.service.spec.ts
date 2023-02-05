import { TestBed } from '@angular/core/testing';

import { CertificateHelperService } from './certificate-helper.service';

describe('CertificateHelperService', () => {
  let service: CertificateHelperService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CertificateHelperService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
