import { Component } from '@angular/core';
import { NgxGraphModule } from '@swimlane/ngx-graph';
import { MOCK_AGENTS, MOCK_LINKS } from '../../mock/mock-data';
import { UpperCasePipe } from '@angular/common';

@Component({
  selector: 'app-agent-map',
  standalone: true,
  imports: [NgxGraphModule, UpperCasePipe],
  templateUrl: './agent-map.html',
  styleUrl: './agent-map.css',
})
export class AgentMap {
  nodes = MOCK_AGENTS.map((agent) => ({
    id: agent.id,
    label: agent.name,
    data: { role: agent.role, emoji: agent.emoji, status: agent.status },
  }));
  links = MOCK_LINKS;

public layoutSettings = {
  orientation: 'TB',
  nodePadding: 40,
  rankPadding: 80,
  marginx: 40,
  marginy: 40,
};
}
