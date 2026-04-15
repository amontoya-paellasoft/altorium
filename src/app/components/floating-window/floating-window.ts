import { Component, inject, Input } from '@angular/core';
import { Chat } from '../chat/chat';
import { WorkspaceService } from '../../services/workspace-service';
import { DragDropModule } from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-floating-window',
  imports: [Chat, DragDropModule],
  standalone: true,
  templateUrl: './floating-window.html',
  styleUrl: './floating-window.css',
  host: {
    '[class.general]': 'esGeneral',
    '[class.privada]': '!esGeneral',
  },
})
export class FloatingWindow {
  @Input() agentId!: string;
  ws: WorkspaceService = inject(WorkspaceService);

  get esGeneral(): boolean {
    return this.agentId === '';
  }
}
