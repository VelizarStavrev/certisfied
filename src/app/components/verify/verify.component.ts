import { Component, OnInit } from '@angular/core';
import { Certificate } from 'src/app/interfaces/certificate';
import { CertificateService } from 'src/app/services/certificate/certificate.service';
import { LoaderService } from 'src/app/services/loader/loader.service';
import { MessageService } from 'src/app/services/message/message.service';

@Component({
  selector: 'app-verify',
  templateUrl: './verify.component.html',
  styleUrls: ['./verify.component.scss']
})
export class VerifyComponent implements OnInit {
  buttonText: string = 'Search';
  buttonType: string = 'Primary';
  buttonHTMlType: string = 'button';
  buttonMarginLeft: boolean = true;
  buttonLinkText: string = 'THIS LINK';
  buttonLinkType: string = 'Link';
  buttonLinkLink: string = '';
  messageType: string = '';
  certificateId: string = '';
  successIcon: string = '../../../assets/icons/success.svg';
  errorIcon: string = '../../../assets/icons/error.svg';
  
  verifyCertificate(): void {
    // Unset the current data
    this.messageType = '';
    this.buttonLinkLink = '';

    // Show the loader
    this.loaderService.showLoader(true);

    this.certificateService.verifyCertificate(this.certificateId)
      .subscribe((data: Certificate) => {
        if (data.status) {
          this.messageType = 'success';
          this.buttonLinkLink = `/certificate/${this.certificateId}`;

          // Hide the loader
          this.loaderService.showLoader(false);
          return;
        }

        this.messageType = 'error';
        
        // Hide the loader
        this.loaderService.showLoader(false);
      });
  }

  constructor(
    public certificateService: CertificateService, 
    public loaderService: LoaderService, 
    public messageService: MessageService
  ) { }

  ngOnInit(): void {
  }

}
