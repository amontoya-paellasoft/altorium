import { Component, inject, Input, Output, EventEmitter, Signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Proyecto, ProyectoStatus } from '../../../models/proyecto.interface';
import { ProyectoService } from '../../../services/proyecto.service';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faTimes, faExternalLinkAlt, faPause, faPlay, faChevronDown, faCopy, faCheck, faMinus } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-proyecto-details',
  standalone: true,
  imports: [CommonModule, FontAwesomeModule],
  templateUrl: './proyecto-details.html',
  styleUrls: ['./proyecto-details.css']
})
export class ProyectoDetails {
  @Input({ required: true }) p!: Proyecto | any; // Any is a workaround if signal input is passed as regular input due to how it's called
  @Output() close = new EventEmitter<void>();
  @Output() edit = new EventEmitter<void>();
  @Output() delete = new EventEmitter<void>();

  svc = inject(ProyectoService);

  // Icons
  faTimes = faTimes;
  faExternalLinkAlt = faExternalLinkAlt;
  faPause = faPause;
  faPlay = faPlay;
  faChevronDown = faChevronDown;
  faCopy = faCopy;
  faCheck = faCheck;
  faMinus = faMinus;

  menuOpen = false;

  allStatuses: ProyectoStatus[] = ['CREATED', 'INGESTING', 'ANALYZED', 'AUDITED', 'READY', 'PAUSED', 'BLOCKED', 'ARCHIVED'];

  // Support for Signal input or regular input
  get project(): Proyecto {
    return typeof this.p === 'function' ? this.p() : this.p;
  }

  toggleMenu() {
    this.menuOpen = !this.menuOpen;
  }

  checkAction(status: ProyectoStatus, action: string): boolean {
    return this.svc.canPerformAction(status, action as any);
  }

  canPause(): boolean { return this.checkAction(this.project.projectStatus, 'PAUSE'); }
  canResume(): boolean { return this.checkAction(this.project.projectStatus, 'RESUME'); }
  canDelete(): boolean { return this.checkAction(this.project.projectStatus, 'DELETE'); }

  pauseProject() {
    // Logic to pause
  }

  resumeProject() {
    // Logic to resume
  }

  deleteProject() {
    this.menuOpen = false;
    this.delete.emit();
  }

  copy() { 
    navigator.clipboard.writeText(this.project.repositoryConfig.cloneUrl); 
  }
}

