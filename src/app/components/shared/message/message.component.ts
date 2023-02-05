import { Component, OnInit } from '@angular/core';
import { MessageService } from 'src/app/services/message/message.service';

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.scss']
})
export class MessageComponent implements OnInit {
  currentMessages: {type: string, message: string}[] = [];
  _subscription = this.messageService.messages.subscribe((value) => {
    this.currentMessages = value;
  });

  removeMessage(index: number): void {
    this.currentMessages.splice(index, 1);
  }

  constructor(public messageService: MessageService) { }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
    this._subscription.unsubscribe();
  }
  
}
