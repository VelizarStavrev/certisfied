import { Component, OnInit } from '@angular/core';
import { Certificate } from 'src/app/interfaces/certificate';
import { CertificateInCertificates } from 'src/app/interfaces/certificate-in-certificates';
import { Certificates } from 'src/app/interfaces/certificates';
import { CertificateService } from 'src/app/services/certificate.service';
import { LoaderService } from 'src/app/services/loader.service';
import { MessageService } from 'src/app/services/message.service';

@Component({
  selector: 'app-certificates',
  templateUrl: './certificates.component.html',
  styleUrls: ['./certificates.component.scss']
})
export class CertificatesComponent implements OnInit {
  buttonNewLink: string = '/dashboard/certificate/new';
  buttonNewTypeLink: string = 'Primary';
  buttonNewTextLink: string = 'ADD NEW';
  buttonNewMarginLeft: boolean = true;
  buttonOtherLink: string = '/dashboard/templates';
  buttonOtherTypeLink: string = 'Primary';
  buttonOtherTextLink: string = 'VIEW TEMPLATES';
  buttonOtherMarginLeft: boolean = true;
  buttonText: string = 'Load more';
  buttonType: string = 'Primary';
  buttonHTMLType: string = 'button';
  buttonMarginBottom: boolean = true;
  viewIcon: string = '../../../../assets/icons/view.svg';
  editIcon: string = '../../../../assets/icons/edit.svg';
  deleteIcon: string = '../../../../assets/icons/delete.svg';
  certificates: CertificateInCertificates[] = [];
  remainingCertificates: CertificateInCertificates[] = [];
  certificateLimit: number = 15;

  constructor(public certificateService: CertificateService, public loaderService: LoaderService, public messageService: MessageService) { }

  ngOnInit(): void {
    // Show the loader
    this.loaderService.showLoader(true);

    // Get all certificates
    this.certificateService.getCertificates()
      .subscribe((data: Certificates) => {
        if (data.status) {
          const certificatesToShow: CertificateInCertificates[] = [];
          const dataArray: CertificateInCertificates[] = structuredClone(data.data);

          const loopLimit: number = dataArray.length > this.certificateLimit ? this.certificateLimit : dataArray.length;
          
          for (let i = 0; i < loopLimit; i++) {
            const currentCertificate: CertificateInCertificates | undefined = dataArray?.shift();
            currentCertificate ? certificatesToShow.push(currentCertificate) : '';
          }

          this.certificates = certificatesToShow;
          this.remainingCertificates = dataArray;

          // Add a success message
          this.messageService.setMessage({type: 'message-success', message: data.message});

          // Hide the loader
          this.loaderService.showLoader(false);
          return;
        }

        // Add a success message
        this.messageService.setMessage({type: 'message-error', message: data.message});

        // Hide the loader
        this.loaderService.showLoader(false);
      });
  }

  loadMoreCertificates(): void {
    const certificatesToShow: CertificateInCertificates[] = [...this.certificates];
    const certificatesToRemain: CertificateInCertificates[] = [...this.remainingCertificates];

    const loopLimit: number = certificatesToRemain.length > this.certificateLimit ? this.certificateLimit : certificatesToRemain.length;

    for (let i = 0; i < loopLimit; i++) {
      const currentCertificate = certificatesToRemain.shift();
      currentCertificate ? certificatesToShow.push(currentCertificate) : '';
    }

    this.certificates = certificatesToShow;
    this.remainingCertificates = certificatesToRemain;

    this.messageService.setMessage({type: 'message-success', message: 'More certificates loaded successfully!'});
  }

  deleteCertificate(certificateId: string, certificateIndex: number): void {
    // Show the loader
    this.loaderService.showLoader(true);
    
    this.certificateService.deleteCertificate(certificateId)
      .subscribe((data: Certificate) => {
        if (data.status) {
          // Remove the index from the array
          this.certificates.splice(certificateIndex, 1);
          
          // Set a new message
          this.messageService.setMessage({type: 'message-success', message: data.message});

          // Hide the loader
          this.loaderService.showLoader(false);
          return;
        }

        // Add an error message
        this.messageService.setMessage({type: 'message-error', message: data.message});

        // Hide the loader
        this.loaderService.showLoader(false);
      });
  }

}
