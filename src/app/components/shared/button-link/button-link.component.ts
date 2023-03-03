import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-button-link',
  templateUrl: './button-link.component.html',
  styleUrls: ['./button-link.component.scss']
})
export class ButtonLinkComponent implements OnInit {
  @Input() buttonText: string = 'Click';
  @Input() buttonType: string = 'Primary';
  @Input() buttonLink: string = '';
  @Input() buttonMarginTop: boolean = false;
  @Input() buttonMarginBottom: boolean = false;
  @Input() buttonMarginLeft: boolean = false;
  @Input() buttonMarginRight: boolean = false;
  @Input() buttonWidth80: boolean = false;
  @Input() buttonFunc = () => { };
  buttonClasses: string[] = [];

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

    if (this.buttonWidth80) {
      this.buttonClasses.push('button-width-80');
    }
  }
}
