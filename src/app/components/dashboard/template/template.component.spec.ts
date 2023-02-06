import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { ButtonLinkComponent } from '../../shared/button-link/button-link.component';
import { ButtonComponent } from '../../shared/button/button.component';
import { CertificateDisplayComponent } from '../shared/certificate-display/certificate-display.component';
import { FieldAddComponent } from '../shared/field-add/field-add.component';
import { FieldListComponent } from '../shared/field-list/field-list.component';
import { FieldSettingsComponent } from '../shared/field-settings/field-settings.component';

import { TemplateComponent } from './template.component';

describe('TemplateComponent', () => {
  let component: TemplateComponent;
  let fixture: ComponentFixture<TemplateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ 
        TemplateComponent, 
        CertificateDisplayComponent,
        ButtonComponent,
        ButtonLinkComponent,
        FieldListComponent,
        FieldSettingsComponent,
        FieldAddComponent
      ],
      imports: [ 
        RouterTestingModule, 
        HttpClientModule, 
        FormsModule
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TemplateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
