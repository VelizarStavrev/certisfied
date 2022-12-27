import { Component, OnInit } from '@angular/core';
import { TemplateService } from 'src/app/services/template.service';
import { LoaderService } from 'src/app/services/loader.service';
import { MessageService } from 'src/app/services/message.service';
import { Templates } from 'src/app/interfaces/templates';
import { TemplateInTemplates } from 'src/app/interfaces/templateInTemplates';

@Component({
  selector: 'app-templates',
  templateUrl: './templates.component.html',
  styleUrls: ['./templates.component.scss']
})
export class TemplatesComponent implements OnInit {
  buttonNewLink: string = '/dashboard/template/new';
  buttonNewTypeLink: string = 'Primary';
  buttonNewTextLink: string = 'ADD NEW';
  buttonNewMarginLeft: boolean = true;
  buttonOtherLink: string = '/dashboard/certificates';
  buttonOtherTypeLink: string = 'Primary';
  buttonOtherTextLink: string = 'VIEW CERTIFICATES';
  buttonOtherMarginLeft: boolean = true;
  buttonText: string = 'Load more';
  buttonType: string = 'Primary';
  buttonHTMLType: string = 'button';
  buttonMarginBottom: boolean = true;
  viewIcon: string = '../../../../assets/icons/view.svg';
  editIcon: string = '../../../../assets/icons/edit.svg';
  deleteIcon: string = '../../../../assets/icons/delete.svg';
  templates: TemplateInTemplates[] = [];
  remainingTemplates: TemplateInTemplates[] = [];
  templateLimit: number = 15;

  constructor(public templateService: TemplateService, public loaderService: LoaderService, public messageService: MessageService) { }

  ngOnInit(): void {
    // Show the loader
    this.loaderService.showLoader(true);

    // Get all templates
    this.templateService.getTemplates()
      .subscribe((data: Templates) => {
        if (data.status) {
          const templatesToShow: TemplateInTemplates[] = [];
          const dataArray: TemplateInTemplates[] = structuredClone(data.data);

          const loopLimit: number = dataArray.length > this.templateLimit ? this.templateLimit : dataArray.length;
          
          for (let i = 0; i < loopLimit; i++) {
            const currentTemplate: TemplateInTemplates | undefined = dataArray?.shift();
            currentTemplate ? templatesToShow.push(currentTemplate) : '';
          }

          this.templates = templatesToShow;
          this.remainingTemplates = dataArray;

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

  loadMoreTemplates(): void {
    const templatesToShow: TemplateInTemplates[] = [...this.templates];
    const templatesToRemain: TemplateInTemplates[] = [...this.remainingTemplates];

    const loopLimit: number = templatesToRemain.length > this.templateLimit ? this.templateLimit : templatesToRemain.length;

    for (let i = 0; i < loopLimit; i++) {
      const currentTemplate = templatesToRemain.shift();
      currentTemplate ? templatesToShow.push(currentTemplate) : '';
    }

    this.templates = templatesToShow;
    this.remainingTemplates = templatesToRemain;

    this.messageService.setMessage({type: 'message-success', message: 'More templates loaded successfully!'});
  }

  deleteTemplate(i: number): void {
    // TO DO
    console.log('Delete certificate ' + i);
    // Get a new list
    // Show a loader
    // Hide a loader
    // Show a message
    // Realod the list
  }

}
