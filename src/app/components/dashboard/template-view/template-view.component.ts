import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Field } from 'src/app/interfaces/field';
import { TemplateService } from 'src/app/services/template.service';
import { LoaderService } from 'src/app/services/loader.service';
import { MessageService } from 'src/app/services/message.service';
import { Template } from 'src/app/interfaces/template';
import { Properties } from 'src/app/interfaces/properties';

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
  currentFieldList: any = {};
  currentFieldListSorted: Field[] = [];
  currentFieldListStyling: any[] = [];

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

            for (let field in receivedData.fields) {
              let properties: { 
                field_id: string, 
                label: string, 
                name: string, 
                orderNum: string, 
                type: string, 
                value: string, 
                unit?: string, 
                units?: string | [],
                options?: string | [] 
              }[] = receivedData.fields[field].properties;
              
              for (let property in properties) {
                let currentProperty: any = properties[property];

                if (currentProperty.unit === 'NULL') {
                  delete currentProperty.unit;
                }

                if (currentProperty.units === 'NULL') {
                  delete currentProperty.units;
                }

                if (currentProperty.options === 'NULL') {
                  delete currentProperty.options;
                }

                if (currentProperty.units) {
                  currentProperty.units = currentProperty.units.split(', ');
                }

                if (currentProperty.options) {
                  currentProperty.options = currentProperty.options.split(', ');
                }
              }
            }

            // Set the data
            this.currentFieldList = receivedData.fields;
            this.templateName = receivedData.name;
            this.templateCreatedDate = receivedData.created;
            this.templateEditedDate = receivedData.edited;
            this.templateNotes = receivedData.notes;
            this.setOrientation(receivedData.orientation);

            // Update the field sorted array
            this.updateFieldSortedArray();

            // Update the field list styling
            this.updateFieldListStyling();

            // Add a success message
            this.messageService.setMessage({type: 'message-success', message: data.message});

            // Hide the loader
            this.loaderService.showLoader(false);
            return;
          }
  
          // Add a success message
          this.messageService.setMessage({type: 'message-error', message: data.message});
  
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

    // TO DO - impelement a better solution
    // Due to quick updates the properties are not yet updated
    // When the function runs
    setTimeout(() => {
      // Set the dimensions of the certificate
      this.setDimensions();
    }, 1);
  }

  setDimensions(): void {
    const certificateMainContainerWidth: number = this.certificateMainContainer?.nativeElement.clientWidth;
    const certificateFEContainerWidth: number = this.certificateFEContainer?.nativeElement.clientWidth;
    const certificateWidthDifferencePercentResult = certificateMainContainerWidth / certificateFEContainerWidth;
    this.certificateWidthDifferencePercent = certificateWidthDifferencePercentResult;
    this.certificateHeight = (this.certificateFEContainer?.nativeElement.clientHeight * certificateWidthDifferencePercentResult) + 'px';
  }

  getFieldStyles(properties: Properties[]) {
    let currentProperties = structuredClone(properties);

    for (let property in currentProperties) {
      if (['content', 'url', 'editable', 'autoGenerated', 'unit', 'units'].includes(property)) {
        continue;
      }

      if (property === 'transform') {
        currentProperties[property].value = 'rotate(' + currentProperties[property].value + 'deg)';
      }

      if (['left', 'top', 'maxWidth', 'fontSize', 'height', 'width'].includes(property)) {
        currentProperties[property].value = currentProperties[property].value + currentProperties[property].unit;
      }
    }

    let finalCSSObject: any = {};

    for (let property in currentProperties) {
      let currentCSSProperty = property;
      let currentCSSValue = currentProperties[property].value;
      finalCSSObject[currentCSSProperty] = currentCSSValue;
    }

    finalCSSObject['position'] = 'absolute';
    return finalCSSObject;
  }

  updateFieldListStyling() {
    // Set the field styles to an array
    let fieldListStyling: any = [];

    this.currentFieldListSorted.forEach((element: any) => {
      let currentStyles: any = this.getFieldStyles(element.properties);
      let currentFieldData: any = {
        id: element.id,
        template_id: element.template_id,
        type: element.type,
        styles: currentStyles
      };

      // Field specific data and styles
      switch(element.type) {
        case 'Text':
          currentFieldData.content = element.properties.content.value;
          currentFieldData.styles.width = '100%';
          break;

        case 'Image':
          currentFieldData.url = element.properties.url.value;
          break;

        case 'Link':
          currentFieldData.content = element.properties.content.value;
          currentFieldData.url = element.properties.url.value;
          break;
      }

      fieldListStyling.push(currentFieldData);
    });

    this.currentFieldListStyling = fieldListStyling;
  }

  updateFieldSortedArray() {
    // Convert to array and sort field list
    let currentFieldListArray = Object.entries(this.currentFieldList);
    let currentFieldListSortedObject = this.sortFieldList(currentFieldListArray);
    this.currentFieldListSorted = currentFieldListSortedObject;

    let currentFieldListSortedArray: any[] = [];
    Object.entries(currentFieldListSortedObject).map(([key, value]) => {
      currentFieldListSortedArray.push(value);
    });

    this.currentFieldListSorted = currentFieldListSortedArray;
  }

  sortFieldList(currentFieldListArray: any) {
    currentFieldListArray.sort((a: any, b: any) => {
      let firstValue = a[1]['properties']['zIndex'].value;
      let secondValue = b[1]['properties']['zIndex'].value;

      return secondValue - firstValue;
    });

    let currentFieldListSortedObject: any = {};

    for (let fieldPair of currentFieldListArray) {
      let currentKey = fieldPair[0];
      let currentValue = fieldPair[1];

      currentFieldListSortedObject[currentKey] = currentValue;
    }

    return currentFieldListSortedObject;
  }

  constructor(private route: ActivatedRoute,
    public templateService: TemplateService, 
    public loaderService: LoaderService, 
    public messageService: MessageService,
    public router: Router
  ) { }

  ngOnInit(): void {
    this.getTemplate();
  }

}
