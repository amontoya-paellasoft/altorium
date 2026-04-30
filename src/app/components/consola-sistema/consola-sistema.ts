import { Component, inject } from '@angular/core';
import { Chat } from '../chat/chat';
import { WorkspaceService } from '../../services/workspace-service';

@Component({
  selector: 'app-consola-sistema',
  standalone: true,
  imports: [Chat],
  templateUrl: './consola-sistema.html',
  styleUrl: './consola-sistema.css',
})
export class ConsolaSistema {
  ws = inject(WorkspaceService);
}
