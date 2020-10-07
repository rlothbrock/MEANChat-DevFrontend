import { Component, OnInit } from '@angular/core';
import { MessageManagerService } from '../../services/msg.manager.service';
import { Message } from '../../message-interface';
@Component({
  selector: 'app-room',
  templateUrl: './room.component.html',
  styleUrls: ['./room.component.scss']
})
export class RoomComponent implements OnInit {
  socket: any;
  
  constructor(private msgService: MessageManagerService) { }
  messages: [Message];

  ngOnInit(): void {
    this.messages = this.msgService.getMessages();

  }


}
