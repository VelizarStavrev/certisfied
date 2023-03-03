import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Message } from 'src/app/interfaces/message';
import { MessageService } from 'src/app/services/message/message.service';

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.scss']
})
export class MessageComponent implements OnInit {
  _subscription: Subscription = Subscription.EMPTY;
  currentMessages: Message[] = [];

  constructor(private messageService: MessageService) { }

  ngOnInit(): void {
    this._subscription = this.messageService.messagesObservable.subscribe((value) => {
      this.currentMessages = value;
    });
  }

  ngOnDestroy(): void {
    this._subscription.unsubscribe();
  }

  removeMessage(index: number): void {
    this.currentMessages.splice(index, 1);
  }

}
