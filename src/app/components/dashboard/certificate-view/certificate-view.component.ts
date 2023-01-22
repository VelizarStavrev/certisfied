import { Component, OnInit } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { Certificate } from 'src/app/interfaces/certificate';
import { CertificateService } from 'src/app/services/certificate.service';
import { LoaderService } from 'src/app/services/loader.service';
import { MessageService } from 'src/app/services/message.service';

@Component({
  selector: 'app-certificate-view',
  templateUrl: './certificate-view.component.html',
  styleUrls: ['./certificate-view.component.scss']
})
export class CertificateViewComponent implements OnInit {
  certificateURL: string | SafeResourceUrl = '';
  certificateId: string = '';
  routeSub = this.route.params.subscribe((params: any) => {
    this.certificateId = params['id'];
  });
  isEditCertificate: boolean = !!this.certificateId;

  constructor(
    private route: ActivatedRoute,
    private certificateService: CertificateService,
    public loaderService: LoaderService,
    public messageService: MessageService,
    public router: Router,
    private sanitizer: DomSanitizer
  ) { }

  ngOnInit(): void {
    // Show the loader
    this.loaderService.showLoader(true);

    this.certificateService.getCertificateFile(this.certificateId)
      .subscribe((data: Certificate) => {
        if (data.status) {
          this.certificateURL = this.sanitizer.bypassSecurityTrustResourceUrl(data.url + '#zoom=page-fit');

          // Add a success message
          this.messageService.setMessage({ type: 'message-success', message: data.message });

          // Hide the loader
          this.loaderService.showLoader(false);
          return;
        }

        // Add a success message
        this.messageService.setMessage({ type: 'message-error', message: data.message });

        // Redirect to the templates list
        this.router.navigate(['/']);

        // Hide the loader
        this.loaderService.showLoader(false);
      });
  }

}
