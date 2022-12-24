import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MessageService {
  messages: Subject<{type: string, message: string}[]> = new Subject();
  currentMessages: {type: string, message: string}[] = [];

  constructor() { }

  setMessage(messageData: {type: string, message: string}): object {
    this.currentMessages.push(messageData);
    this.messages.next(this.currentMessages);
    return this.currentMessages;
  }
}
