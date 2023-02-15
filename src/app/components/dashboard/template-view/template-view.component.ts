import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Field } from 'src/app/interfaces/field';
import { TemplateService } from 'src/app/services/template/template.service';
import { LoaderService } from 'src/app/services/loader/loader.service';
import { MessageService } from 'src/app/services/message/message.service';
import { Template } from 'src/app/interfaces/template';
import { CertificateHelperService } from 'src/app/services/certificate-helper/certificate-helper.service';
import { FieldList } from 'src/app/interfaces/field-list';
import { Property } from 'src/app/interfaces/property';

@Component({
  selector: 'app-template-view',
  templateUrl: './template-view.component.html',
  styleUrls: ['./template-view.component.scss']
})
export class TemplateViewComponent implements OnInit {
  templateId: string = '';
  routeSub = this.route.params.subscribe(params => {
    this.templateId = params['id'];
  });
  isEditTemplate: boolean = !!this.templateId;

  templateName: string = '';
  templateCreatedDate: number = 0;
  templateEditedDate: number = 0;
  templateNotes: string = '';
  orientation: string = 'vertical';

  // Certificate buttons and display
  @ViewChild('certificateMainContainer') certificateMainContainer: ElementRef | undefined;
  @ViewChild('certificateFEContainer') certificateFEContainer: ElementRef | undefined;
  certificateWidthDifferencePercent: number = 1;
  certificateHeight: string = '297mm';

  // Shared field list
  currentFieldList: FieldList = {};
  currentFieldListSorted: Field[] = [];
  currentFieldListStyling: {}[] = [];

  buttonCancelText: string = 'Return';
  buttonCancelType: string = 'Secondary';
  buttonCancelLink: string = '/dashboard/templates';
  buttonCancelMarginLeft: boolean = true;

  getTemplate(): void {
    // If the route is edit, not new
    if (this.isEditTemplate) {
      // Show the loader
      this.loaderService.showLoader(true);

      this.templateService.getTemplate(this.templateId)
        .subscribe((data: Template) => {
          if (data.status) {
            const receivedData = data.data;
            const updatedData = this.certificateHelperService.updateTemplateDataProperties(receivedData);

            // Set the data
            this.currentFieldList = updatedData.fields;
            this.templateName = updatedData.name;
            this.templateCreatedDate = updatedData.created || 0;
            this.templateEditedDate = updatedData.edited || 0;
            this.templateNotes = updatedData.notes;
            this.setOrientation(updatedData.orientation);

            // Update the field sorted array
            this.currentFieldListSorted = this.certificateHelperService.updateFieldSortedArray(this.currentFieldList);

            // Update the field list styling
            this.currentFieldListStyling = this.certificateHelperService.updateFieldListStyling(this.currentFieldListSorted);

            // Add a success message
            this.messageService.setMessage({ type: 'message-success', message: data.message });

            // Hide the loader
            this.loaderService.showLoader(false);
            return;
          }

          // Add a success message
          this.messageService.setMessage({ type: 'message-error', message: data.message });

          // Redirect to the templates list
          this.router.navigate(['/dashboard/templates/']);

          // Hide the loader
          this.loaderService.showLoader(false);
        });
    }
  }

  setOrientation(type: string): void {
    // Set the type
    this.orientation = type;
  }

  constructor(private route: ActivatedRoute,
    public templateService: TemplateService,
    public loaderService: LoaderService,
    public messageService: MessageService,
    public router: Router,
    public certificateHelperService: CertificateHelperService
  ) { }

  ngOnInit(): void {
    this.getTemplate();
  }

}
