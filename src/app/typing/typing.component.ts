import { Component, OnInit } from '@angular/core';
// import { Message } from '../message-interface';
import { MessageManagerService } from '../services/message-manager-service.service';

@Component({
  selector: 'app-typing',
  templateUrl: './typing.component.html',
  styleUrls: ['./typing.component.scss']
})
export class TypingComponent implements OnInit {
  message: string;
  constructor(private msgService: MessageManagerService) { }

  ngOnInit(): void {
    this.msgService.setupSocketConnection();
  }

  sendMessage(): void{
    this.msgService.emitMessage(this.message);
    this.message = '';
  }

  clearInput(): void{
    this.message = '';
  }
}
