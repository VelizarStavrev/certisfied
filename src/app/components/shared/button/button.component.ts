import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss']
})
export class ButtonComponent implements OnInit {
  @Input() buttonText: string = 'Click';
  @Input() buttonType: string = 'Primary';
  @Input() buttonHTMLType: string = 'button';
  @Input() buttonMarginTop: boolean = false;
  @Input() buttonMarginBottom: boolean = false;
  @Input() buttonMarginLeft: boolean = false;
  @Input() buttonMarginRight: boolean = false;
  @Input() buttonDisabled: boolean = false;
  @Input() buttonWidth80: boolean = false;
  @Input() buttonFunc = () => {};
  buttonClasses: string[] = ['button-base'];

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

    if (this.buttonWidth80) {
        this.buttonClasses.push('button-width-80');
    }
  }
}
