import { Component, inject, input, Input } from '@angular/core';
import { Chat } from '../chat/chat';
import { WorkspaceService } from '../../services/workspace-service';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-floating-window',
  imports: [Chat, DragDropModule, TranslatePipe],
  standalone: true,
  templateUrl: './floating-window.html',
  styleUrl: './floating-window.css',
  host: {
    '[class.general]': 'esGeneral',
    '[class.privada]': '!esGeneral',
  },
})
export class FloatingWindow {
  agentId = input.required<string>();
  ws: WorkspaceService = inject(WorkspaceService);

  get esGeneral(): boolean {
    return this.agentId() === '';
  }
}
