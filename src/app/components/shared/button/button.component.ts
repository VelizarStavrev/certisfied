import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss']
})
export class ButtonComponent implements OnInit {
  @Input() buttonText = 'Click'; // decorate the property with @Input()
  @Input() buttonType = 'Primary'; // decorate the property with @Input()
  @Input() buttonHTMLType = 'button'; // decorate the property with @Input()
  @Input() buttonMarginTop = ''; // decorate the property with @Input()
  @Input() buttonMarginBottom = ''; // decorate the property with @Input()
  @Input() buttonMarginLeft = ''; // decorate the property with @Input()
  @Input() buttonMarginRight = ''; // decorate the property with @Input()
  @Input() buttonDisabled = false; // decorate the property with @Input()
  @Input() buttonFunc = () => {}; // decorate the property with @Input()
  buttonClasses = '';

  constructor() { }

  ngOnInit(): void {
    switch (this.buttonType) {
        case 'Primary':
            this.buttonClasses = 'button-base button-primary';
            break;

        case 'Secondary':
            this.buttonClasses = 'button-base button-secondary';
            break;

        case 'Error':
            this.buttonClasses = 'button-base button-error';
            break;

        default:
            this.buttonClasses = 'button-base button-primary';
    }

    if (this.buttonMarginTop) {
        this.buttonClasses += ' button-margin-top';
    }

    if (this.buttonMarginBottom) {
        this.buttonClasses += ' button-margin-bottom';
    }

    if (this.buttonMarginLeft) {
        this.buttonClasses += ' button-margin-left';
    }

    if (this.buttonMarginRight) {
        this.buttonClasses += ' button-margin-right';
    }
  }
}
