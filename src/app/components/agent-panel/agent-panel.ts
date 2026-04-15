import { Component, computed, inject, input } from '@angular/core';
import { WorkspaceService } from '../../services/workspace-service';
import { ChatService } from '../../services/chat-service';
import { MOCK_AGENTS } from '../../mock/mock-data';
import { UpperCasePipe } from '@angular/common';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { Chat } from '../chat/chat';

@Component({
  selector: 'app-agent-panel',
  imports: [UpperCasePipe, DragDropModule, Chat],
  templateUrl: './agent-panel.html',
  styleUrl: './agent-panel.css',
})
export class AgentPanel {
  agentId = input.required<string>();

  private chatServ: ChatService = inject(ChatService);
  ws: WorkspaceService = inject(WorkspaceService);

  agente = computed(() => MOCK_AGENTS.find((a) => a.id === this.agentId()));

  agentesRelacionados = computed(() => this.chatServ.getAgentesRelacionados(this.agentId()));

  cerrar(): void {
    this.ws.cerrarPanel();
  }
}
