import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Message } from 'src/app/interfaces/message';

@Injectable({
  providedIn: 'root'
})
export class MessageService {
  messagesObservable: Subject<Message[]> = new Subject();
  currentMessages: Message[] = [];

  setMessage(messageData: Message): Message[] {
    this.currentMessages.push(messageData);
    this.messagesObservable.next(this.currentMessages);
    return this.currentMessages;
  }
}
