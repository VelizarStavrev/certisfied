import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss']
})
export class ButtonComponent implements OnInit {
  @Input() buttonText: string = 'Click'; // decorate the property with @Input()
  @Input() buttonType: string = 'Primary'; // decorate the property with @Input()
  @Input() buttonHTMLType: string = 'button'; // decorate the property with @Input()
  @Input() buttonMarginTop: string = ''; // decorate the property with @Input()
  @Input() buttonMarginBottom: string = ''; // decorate the property with @Input()
  @Input() buttonMarginLeft: string = ''; // decorate the property with @Input()
  @Input() buttonMarginRight: string = ''; // decorate the property with @Input()
  @Input() buttonDisabled: boolean = false; // decorate the property with @Input()
  @Input() buttonFunc = () => {}; // decorate the property with @Input()
  buttonClasses: string[] = ['button-base'];

  constructor() { }

  ngOnInit(): void {
    switch (this.buttonType) {
        case 'Primary':
            this.buttonClasses.push('button-primary');
            break;

        case 'Secondary':
            this.buttonClasses.push('button-secondary');
            break;

        case 'Error':
            this.buttonClasses.push('button-error');
            break;

        default:
            this.buttonClasses.push('button-primary');
    }

    if (this.buttonMarginTop) {
        this.buttonClasses.push('button-margin-top');
    }

    if (this.buttonMarginBottom) {
        this.buttonClasses.push('button-margin-bottom');
    }

    if (this.buttonMarginLeft) {
        this.buttonClasses.push('button-margin-left');
    }

    if (this.buttonMarginRight) {
        this.buttonClasses.push('button-margin-right');
    }
  }
}
