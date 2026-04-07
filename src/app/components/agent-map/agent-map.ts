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
  ws: WorkspaceService = inject(WorkspaceService);
  chatServ: ChatService = inject(ChatService);

  agenteActivo = computed(() => this.chatServ.agenteActId());
  mensajeActivo = computed(() => this.chatServ.mensajeActivo());
  hayMensajeActivo = computed(() => this.mensajeActivo() !== null);
  enviarMsgsAll = computed(() => {
    const msg = this.mensajeActivo();
    if (!msg || msg.to !== 'all') return [];
    // Todos los nodos excepto el emisor
    return this.nodes.filter((n) => n.id !== msg.from).map((n) => n.id);
  });

  nodePositions: Record<string, { x: number; y: number }> = {};

  nodes = MOCK_AGENTS.map((agent) => ({
    id: agent.id,
    label: agent.name,
    data: { role: agent.role, emoji: agent.emoji, status: agent.status },
    dimension: { width: 200, height: 50 },
  }));

  links = MOCK_LINKS.map((link) => ({
    source: link.source,
    target: link.target,
    label: link.label,
  }));

  public layoutSettings = {
    orientation: 'TB',
    nodePadding: 80, //horizontal entre nodos
    rankPadding: 80, //vertical
    marginx: 20,
    marginy: 10,
  };

  // Interacción entre nodos
  isNodeSpeaking(nodeId: string): boolean {
    return this.mensajeActivo()?.from === nodeId;
  }

  isNodeListening(nodeId: string): boolean {
    const msg = this.mensajeActivo();

    if (!msg || msg.to === 'all') return false; // msg públicos para todos
    return msg.to === nodeId;
  }

  isNodeActive(nodeId: string): boolean {
    return this.agenteActivo() === nodeId;
  }

  isLinkActive(link: any): boolean {
    const msg = this.mensajeActivo();
    if (!msg) return false;

    if (msg.to === 'all') {
      return link.source === msg.from;
    }

    return false;
  }

  onNodeClick(node: any): void {
    this.ws.abrir({ agentId: node.id });
  }

  onGraphChange(graph: any): void {
    graph.nodes?.forEach((n: any) => {
      if (n.position) {
        this.nodePositions[n.id] = {
          x: n.position.x + 100, // centro del nodo (width/2)
          y: n.position.y + 25, // centro del nodo (height/2)
        };
      }
    });
  }
}
