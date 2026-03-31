import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { MOCK_MESSAGES } from '../mock/mock-data';
import { MessageInterface } from '../models/message-interface';
@Injectable({
  providedIn: 'root'
})
export class ChatService {

  private messagesSubject = new BehaviorSubject<MessageInterface[]>([]);
  messages$ = this.messagesSubject.asObservable();

  private currentIndex = 0;

  startSimulation() {
    this.pushNextMessage();
  }

 private pushNextMessage() {
  if (this.currentIndex >= MOCK_MESSAGES.length) return;

  const original = MOCK_MESSAGES[this.currentIndex];

  // 👇 mensaje vacío inicial
  const message: MessageInterface = {
    ...original,
    text: '',
  };

  const currentMessages = this.messagesSubject.value;

  this.messagesSubject.next([
    ...currentMessages,
    message
  ]);

  this.currentIndex++;

  this.typeMessage(message, original.text, () => {
    const delay = this.getDelayForAgent(original.agentId);
    setTimeout(() => this.pushNextMessage(), delay);
  });
}

private typeMessage(
  message: MessageInterface,
  fullText: string,
  callback: () => void
) {
  let i = 0;

  const interval = setInterval(() => {
    message.text += fullText[i];
    i++;

    // 🔄 forzar actualización
    this.messagesSubject.next([...this.messagesSubject.value]);

    if (i >= fullText.length) {
      clearInterval(interval);
      callback();
    }
  }, 20); // velocidad escritura
}

  private getDelayForAgent(agentId: string) {
    switch(agentId) {
      case 'pm': return 1200;
      case 'fe': return 700;
      case 'be': return 900;
      case 'qa': return 600;
      default: return 1000;
    }
  }
}
