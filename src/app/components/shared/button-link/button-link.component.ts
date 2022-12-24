import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-button-link',
  templateUrl: './button-link.component.html',
  styleUrls: ['./button-link.component.scss']
})
export class ButtonLinkComponent implements OnInit {
  @Input() buttonText: string = 'Click'; // decorate the property with @Input()
  @Input() buttonType: string = 'Primary'; // decorate the property with @Input()
  @Input() buttonLink: string = ''; // decorate the property with @Input()
  @Input() buttonMarginTop: string = ''; // decorate the property with @Input()
  @Input() buttonMarginBottom: string = ''; // decorate the property with @Input()
  @Input() buttonMarginLeft: string = ''; // decorate the property with @Input()
  @Input() buttonMarginRight: string = ''; // decorate the property with @Input()
  @Input() buttonFunc = () => { }; // decorate the property with @Input()
  buttonClasses: string[] = [];

  constructor() { }

  ngOnInit(): void {
    switch (this.buttonType) {
      case 'Primary':
        this.buttonClasses.push('link-button', 'link-button-primary');
        break;

      case 'Secondary':
        this.buttonClasses.push('link-button', 'link-button-secondary');
        break;

      case 'Link':
        this.buttonClasses.push('link-plain');
        break;

      default:
        this.buttonClasses.push('link-plain');
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
