import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-button-link',
  templateUrl: './button-link.component.html',
  styleUrls: ['./button-link.component.scss']
})
export class ButtonLinkComponent implements OnInit {
  @Input() buttonText = 'Click'; // decorate the property with @Input()
  @Input() buttonType = 'Primary'; // decorate the property with @Input()
  @Input() buttonLink = ''; // decorate the property with @Input()
  @Input() buttonMarginTop = ''; // decorate the property with @Input()
  @Input() buttonMarginBottom = ''; // decorate the property with @Input()
  @Input() buttonMarginLeft = ''; // decorate the property with @Input()
  @Input() buttonMarginRight = ''; // decorate the property with @Input()
  @Input() buttonFunc = () => { }; // decorate the property with @Input()
  buttonClasses = '';

  constructor() { }

  ngOnInit(): void {
    switch (this.buttonType) {
      case 'Primary':
        this.buttonClasses = 'link-button link-button-primary';
        break;

      case 'Secondary':
        this.buttonClasses = 'link-button link-button-secondary';
        break;

      case 'Link':
        this.buttonClasses = 'link-plain';
        break;

      default:
        this.buttonClasses = 'link-plain';
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
