import { Component, inject, input, output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Proyecto } from '../../../models/proyecto.interface';
import { ProyectoService } from '../../../services/proyecto.service';
import { ProjectOverlayService } from '../../../services/project-overlay.service';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faExternalLinkAlt, faCopy, faEdit, faPause, faEllipsisV, faFileCode, faPaperclip, faCheck, faMinus } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-proyecto-details',
  standalone: true,
  imports: [CommonModule, FontAwesomeModule],
  templateUrl: './proyecto-details.html',
  styleUrls: ['./proyecto-details.css']
})
export class ProyectoDetails {
  p = input.required<Proyecto>();
  close = output<void>();
  svc = inject(ProyectoService);
  overlay = inject(ProjectOverlayService);

  // Icons
  faExternalLinkAlt = faExternalLinkAlt;
  faCopy = faCopy;
  faEdit = faEdit;
  faPause = faPause;
  faEllipsisV = faEllipsisV;
  faFileCode = faFileCode;
  faPaperclip = faPaperclip;
  faCheck = faCheck;
  faMinus = faMinus;

  actions = ['PAUSE', 'BLOCK', 'ARCHIVE', 'RESUME', 'DELETE'] as const;

  copy(url: string) { navigator.clipboard.writeText(url); }
  
  openEdit() {
    this.overlay.openDrawer(true, this.p());
    this.close.emit();
  }

  checkAction(action: string): boolean {
    const validActions = ['PAUSE', 'BLOCK', 'RESUME', 'ARCHIVE', 'DELETE'];
    if (!validActions.includes(action)) return false;
    return this.svc.canPerformAction(this.p().projectStatus, action as any);
  }
}
