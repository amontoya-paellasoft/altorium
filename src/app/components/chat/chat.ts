import { Component, inject } from '@angular/core';
import { MOCK_AGENTS, MOCK_MESSAGES } from '../../mock/mock-data';
import { DatePipe, UpperCasePipe } from '@angular/common';
import { ChatService } from '../../services/chat-service';


@Component({
  selector: 'app-chat',
  standalone: true,
  templateUrl: './chat.html',
  imports: [DatePipe, UpperCasePipe],
  styleUrl: './chat.css'
})
export class Chat {
  private chatServ : ChatService = inject(ChatService);

  messages: any[] = [];

  ngOnInit() {
    this.chatServ.messages$.subscribe(m => {
      this.messages = m;
    })
    this.chatServ.startSimulation();
  }


}
