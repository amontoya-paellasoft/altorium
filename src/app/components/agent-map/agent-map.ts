import { Component, computed, inject } from '@angular/core';
import { NgxGraphModule } from '@swimlane/ngx-graph';
import { MOCK_AGENTS, MOCK_LINKS } from '../../mock/mock-data';
import { UpperCasePipe, LowerCasePipe } from '@angular/common';
import { WorkspaceService } from '../../services/workspace-service';
import { ChatService } from '../../services/chat-service';

@Component({
  selector: 'app-agent-map',
  standalone: true,
  imports: [NgxGraphModule, UpperCasePipe, LowerCasePipe],
  templateUrl: './agent-map.html',
  styleUrl: './agent-map.css',
})
export class AgentMap {
  ws = inject(WorkspaceService);
  chatServ = inject(ChatService);

  nodes = MOCK_AGENTS.map((agent) => ({
    id: agent.id,
    label: agent.name,
    data: { role: agent.role, emoji: agent.emoji, status: agent.status },
    dimension: { width: 200, height: 50 }
  }));
  links = MOCK_LINKS;

  agenteActivo = computed(() => this.chatServ.agenteActId());

  public layoutSettings = {
    orientation: 'TB',
    nodePadding: 80, //horizontal entre nodos
    rankPadding: 80, //vertical
    marginx: 20,
    marginy: 10,
  };

  isNodeActive(nodeId: string): boolean {
    return this.agenteActivo() === nodeId;
  }

  isLinkActive(link: any): boolean {
    const activo = this.agenteActivo();
    if (!activo) return false;
    return link.source === activo || link.target === activo;
  }

  onNodeClick(node: any): void {
    this.ws.abrir({ agentId: node.id });
  }
}
