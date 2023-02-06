import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { ButtonLinkComponent } from '../../shared/button-link/button-link.component';
import { ButtonComponent } from '../../shared/button/button.component';
import { CertificateDisplayComponent } from '../shared/certificate-display/certificate-display.component';
import { FieldListComponent } from '../shared/field-list/field-list.component';
import { FieldSettingsComponent } from '../shared/field-settings/field-settings.component';

import { CertificateComponent } from './certificate.component';

describe('CertificateComponent', () => {
  let component: CertificateComponent;
  let fixture: ComponentFixture<CertificateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ 
        CertificateComponent, 
        CertificateDisplayComponent,
        ButtonComponent,
        ButtonLinkComponent,
        FieldListComponent,
        FieldSettingsComponent
      ],
      imports: [ 
        RouterTestingModule, 
        HttpClientModule, 
        FormsModule
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CertificateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
