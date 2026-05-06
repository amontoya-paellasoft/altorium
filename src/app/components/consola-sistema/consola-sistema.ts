import { Component, inject } from '@angular/core';
import { Chat } from '../chat/chat';
import { WorkspaceService } from '../../services/workspace-service';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-consola-sistema',
  standalone: true,
  imports: [Chat, TranslateModule],
  templateUrl: './consola-sistema.html',
  styleUrl: './consola-sistema.css',
})
export class ConsolaSistema {
  ws = inject(WorkspaceService);
}
