import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { TimestampToDatePipe } from 'src/app/pipes/timestamp-to-date.pipe';
import { ButtonLinkComponent } from '../../shared/button-link/button-link.component';
import { CertificateDisplayComponent } from '../shared/certificate-display/certificate-display.component';

import { TemplateViewComponent } from './template-view.component';

describe('TemplateViewComponent', () => {
  let component: TemplateViewComponent;
  let fixture: ComponentFixture<TemplateViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ 
        TemplateViewComponent, 
        TimestampToDatePipe, 
        CertificateDisplayComponent,
        ButtonLinkComponent
      ],
      imports: [ RouterTestingModule, HttpClientModule ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TemplateViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
