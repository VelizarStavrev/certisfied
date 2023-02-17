import { TestBed } from '@angular/core/testing';
import { Message } from 'src/app/interfaces/message';

import { MessageService } from './message.service';

describe('MessageService', () => {
  let service: MessageService;
  let firstMessage: Message;
  let secondMessage: Message;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MessageService);
    firstMessage = { type: 'success', message: 'Example message!' };
    secondMessage = { type: 'error', message: 'Example message 2!' };
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('#setMessage should set the currentMessages value', () => {
    expect(service.currentMessages).toEqual([]);

    service.setMessage(firstMessage);
    expect(service.currentMessages).toEqual([firstMessage]);

    service.setMessage(secondMessage);
    expect(service.currentMessages).toEqual([firstMessage, secondMessage]);
  });

  it('#showLoaderObservable should be triggered on value change', () => {
    let expectedMessagesObservable = [firstMessage];

    service.messagesObservable.subscribe((value) => {
      expect(value).toEqual(expectedMessagesObservable);
    });

    expectedMessagesObservable = [firstMessage];
    service.setMessage(firstMessage);

    expectedMessagesObservable = [firstMessage, secondMessage];
    service.setMessage(secondMessage);
  });
});
