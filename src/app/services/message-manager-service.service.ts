import { Injectable } from '@angular/core';
import * as  io from 'socket.io-client';
import { Message} from '../message-interface';

const SOCKET_ENDPOINT = '127.0.01:3000';


@Injectable({
  providedIn: 'root'
})
export class MessageManagerService {

  constructor() { }
  socket: any;
  private messages: [Message] = [{
    sender: Math.random() * 10 > 5 ? 'Me' : 'Antonio',
    timestamp: new Date(Date.now()),
    text: 'Hello Newbie', image: undefined
  }];

  getMessages(): [Message]{
    return this.messages;
  }

  createMessage( text: string, user = 'Me' ): void{
    const newMessage: Message = {
      sender: user,
      timestamp: new Date(Date.now()),
      text,
      image: undefined
    };
    this.messages.push(newMessage);
  }

  setupSocketConnection(): void{
    this.socket = io(SOCKET_ENDPOINT);
    this.socket.on('message-broadcast', (data: string) => {
      this.createMessage(data);
    });
  }

  emitMessage(message: string): void {
    this.socket.emit('message',message);
    this.createMessage(message);
  }

}
