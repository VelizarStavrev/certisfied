import { ChangeDetectorRef, Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';

@Component({
  selector: 'app-certificate-display',
  templateUrl: './certificate-display.component.html',
  styleUrls: ['./certificate-display.component.scss']
})
export class CertificateDisplayComponent implements OnInit {
  // Size control
  @ViewChild('certificateMainContainer') certificateMainContainer: ElementRef | undefined;
  @ViewChild('certificateFEContainer') certificateFEContainer: ElementRef | undefined;
  @ViewChild('certificateContainer') certificateContainer: ElementRef | undefined;
  currentDragFieldDifferenceX: number = 0;
  currentDragFieldDifferenceY: number = 0;
  certificateWidthDifferencePercent: number = 1;
  certificateHeight: string = '297mm';
  @Input() parentType: string = 'certificate';
  @Input() orientation: string = 'vertical';
  @Input() currentFieldListStyling: any[] = [];
  @Input() currentFieldListActive: number | null = null;
  @Output() buttonFieldClickFunc = new EventEmitter<number>();
  @Output() updateFieldFunc = new EventEmitter<Object>();

  setDimensions(): void {
    const certificateMainContainerWidth: number = this.certificateMainContainer?.nativeElement.clientWidth;
    const certificateFEContainerWidth: number = this.certificateFEContainer?.nativeElement.clientWidth;
    const certificateWidthDifferencePercentResult = certificateMainContainerWidth / certificateFEContainerWidth;
    this.certificateWidthDifferencePercent = certificateWidthDifferencePercentResult;
    this.certificateHeight = (this.certificateFEContainer?.nativeElement.clientHeight * certificateWidthDifferencePercentResult) + 'px';
  }

  showFieldEditMenu(i: number): void {
    this.buttonFieldClickFunc.emit(i);
  }

  setInitialFieldPosition(event: any) {
    this.currentDragFieldDifferenceX = event.pageX - event.target.offsetLeft;
    this.currentDragFieldDifferenceY = event.pageY - event.target.offsetTop;
  }

  updateFieldPosition(event: any, fieldId: number) {
    const fieldEndX = event.pageX;
    const fieldEndY = event.pageY;
    const containerHeight = this.certificateContainer?.nativeElement.clientHeight;
    const containerHeightOffset = this.certificateContainer?.nativeElement.offsetTop;
    const containerWidth = this.certificateContainer?.nativeElement.clientWidth;
    const containerWidthOffset = this.certificateContainer?.nativeElement.offsetLeft;
    const pageHeaderHeight = 70; // Due to the position of the main component, the offsetTop excludes the header
    const fieldDragOffsetX = this.currentDragFieldDifferenceX - containerWidthOffset;
    const fieldDragOffsetY = this.currentDragFieldDifferenceY - pageHeaderHeight - containerHeightOffset;
    const fieldX = ((((fieldEndX - fieldDragOffsetX) - containerWidthOffset) / containerWidth) * 100).toFixed(2);
    const fieldY = (((fieldEndY - fieldDragOffsetY - (containerHeightOffset + pageHeaderHeight)) / containerHeight) * 100).toFixed(2);

    // Emit
    this.updateFieldFunc.emit({ fieldId, fieldX, fieldY });
  }

  constructor(private cd: ChangeDetectorRef) { }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    // Set the dimensions of the certificate
    this.setDimensions();
    
    // Run change detection to not get an error due to changes
    this.cd.detectChanges();
  }

  ngOnChanges(): void {
    // Due to quick updates the properties are not yet updated
    // When the function runs
    setTimeout(() => {
      this.setDimensions();
    }, 1);
  }
}
