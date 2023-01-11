import { Component, OnInit } from '@angular/core';
import { Certificate } from 'src/app/interfaces/certificate';
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
  buttonNewLink: string = '/dashboard/certificates/new';
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
  certificates: Certificate[] = [];
  remainingCertificates: Certificate[] = [];
  certificateLimit: number = 15;

  constructor(public certificateService: CertificateService, public loaderService: LoaderService, public messageService: MessageService) { }

  ngOnInit(): void {
    // Show the loader
    this.loaderService.showLoader(true);

    // Get all certificates
    this.certificateService.getCertificates()
      .subscribe((data: Certificates) => {
        if (data.status) {
          const certificatesToShow: Certificate[] = [];
          const dataArray: Certificate[] = structuredClone(data.data);

          const loopLimit: number = dataArray.length > this.certificateLimit ? this.certificateLimit : dataArray.length;
          
          for (let i = 0; i < loopLimit; i++) {
            const currentCertificate: Certificate | undefined = dataArray?.shift();
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
    const certificatesToShow: Certificate[] = [...this.certificates];
    const certificatesToRemain: Certificate[] = [...this.remainingCertificates];

    const loopLimit: number = certificatesToRemain.length > this.certificateLimit ? this.certificateLimit : certificatesToRemain.length;

    for (let i = 0; i < loopLimit; i++) {
      const currentCertificate = certificatesToRemain.shift();
      currentCertificate ? certificatesToShow.push(currentCertificate) : '';
    }

    this.certificates = certificatesToShow;
    this.remainingCertificates = certificatesToRemain;

    this.messageService.setMessage({type: 'message-success', message: 'More certificates loaded successfully!'});
  }

  deleteCertificate(i: number): void {
    // TO DO
    console.log('Delete certificate ' + i);
    // Get a new list
    // Show a loader
    // Hide a loader
    // Show a message
    // Realod the list
  }

}
