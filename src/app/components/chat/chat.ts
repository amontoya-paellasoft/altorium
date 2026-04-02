import {
  Component,
  ElementRef,
  inject,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
  ViewChild,
  ChangeDetectorRef,
} from '@angular/core';
import { DatePipe, UpperCasePipe } from '@angular/common';
import { ChatService } from '../../services/chat-service';
import { MessageInterface } from '../../models/message-interface';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-chat',
  standalone: true,
  templateUrl: './chat.html',
  imports: [DatePipe, UpperCasePipe, FormsModule],
  styleUrl: './chat.css',
})
export class Chat implements OnInit, OnChanges {
  @Input() agentId: string = '';
  @ViewChild('scrollContainer') private scrollContainer!: ElementRef;
  @ViewChild('inputRef') private inputRef!: ElementRef;

  private chatSvc = inject(ChatService);
  private cdr = inject(ChangeDetectorRef);

  messages: MessageInterface[] = [];
  userInput: string = '';

  ngOnInit(): void {
    this.chatSvc.conversaciones$.subscribe(() => {
      this.filtrarMensajes();
      this.cdr.detectChanges();
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['agentId']) this.filtrarMensajes();
  }

  sendUserMessage(): void {
    const text = this.userInput.trim();

    if (!text) return;

    this.userInput = '';
    this.chatSvc.enviarMensajeUsuario(text, this.agentId || 'general');
    this.inputRef.nativeElement.focus();
  }

  private filtrarMensajes(): void {
    if (!this.agentId) {
      // Consola general
      this.messages = this.chatSvc.getMensajesPublicos();
    } else {
      // Ventana privada
      this.messages = this.chatSvc
        .getMensajesPrivados(this.agentId)
        .sort((a, b) => a.timeStamp.getTime() - b.timeStamp.getTime());
    }

    this.scrollToBottom();
  }

  private scrollToBottom(): void {
    setTimeout(() => {
      try {
        const el = this.scrollContainer.nativeElement;
        el.scrollTop = el.scrollHeight;
      } catch {}
    }, 10);
  }
}
