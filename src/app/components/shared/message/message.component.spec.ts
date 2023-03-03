import { DebugElement } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { MessageService } from 'src/app/services/message/message.service';

import { MessageComponent } from './message.component';

describe('MessageComponent', () => {
  let component: MessageComponent;
  let fixture: ComponentFixture<MessageComponent>;
  let de: DebugElement;
  let messageService: MessageService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ 
        MessageComponent 
      ],
      providers: [
        MessageService 
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MessageComponent);
    component = fixture.componentInstance;
    de = fixture.debugElement;
    fixture.detectChanges();
  });

  beforeEach(() => {
    messageService = TestBed.inject(MessageService);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should not have any messages by default', () => {
    expect(component.currentMessages).toEqual([]);
  });

  it('should update when the loader service is triggered or a message is removed', () => {
    const successMessageSelector = '.message-container .message-success';
    const successMessageText = 'Example success message!';
    const errorMessageSelector = '.message-container .message-error';
    const errorMessageText = 'Example error message!';

    expect(component.currentMessages).toEqual([]);
    expect(de.query(By.css('.message-container'))).toBeTruthy();
    expect(de.query(By.css(successMessageSelector))).toBeNull();
    expect(de.query(By.css(errorMessageSelector))).toBeNull();

    messageService.setMessage({ type: 'message-success', message: successMessageText });
    fixture.detectChanges();
    expect(de.query(By.css(successMessageSelector))).toBeTruthy();
    expect(de.query(By.css(successMessageSelector)).nativeNode.innerText).toEqual(successMessageText);

    component.removeMessage(0);
    fixture.detectChanges();
    expect(de.query(By.css(successMessageSelector))).toBeNull();

    messageService.setMessage({ type: 'message-error', message: errorMessageText });
    fixture.detectChanges();
    expect(de.query(By.css(errorMessageSelector))).toBeTruthy();
    expect(de.query(By.css(errorMessageSelector)).nativeNode.innerText).toEqual(errorMessageText);

    component.removeMessage(0);
    fixture.detectChanges();
    expect(de.query(By.css(errorMessageSelector))).toBeNull();
  });
});
