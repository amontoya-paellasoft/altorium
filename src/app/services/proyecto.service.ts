import { Injectable, signal, computed } from '@angular/core';
import { Proyecto, ProyectoStatus } from '../models/proyecto.interface';

@Injectable({
  providedIn: 'root'
})
export class ProyectoService {
  private _proyectos = signal<Proyecto[]>([
    {
      id: "91",
      domainName: "Portal Cliente",
      companyId: "31",
      domainUrl: "https://cliente.example",
      projectType: "SPRING_BOOT",
      projectStatus: "READY",
      activeVersionId: 12,
      inactiveFlag: false,
      createdAt: "2026-04-30T09:30:00+02:00",
      alias: "portal001",
      repositoryConfig: {
        provider: "BITBUCKET",
        cloneUrl: "git@bitbucket.org:altorium/portal-cliente.git"
      }
    },
    {
      id: "92",
      domainName: "App Ventas Odoo",
      companyId: "31",
      domainUrl: "https://ventas.example",
      projectType: "ODOO",
      projectStatus: "PAUSED",
      activeVersionId: 5,
      inactiveFlag: true,
      createdAt: "2026-04-25T10:00:00+02:00",
      alias: "ventas001",
      repositoryConfig: {
        provider: "GITHUB",
        cloneUrl: "git@github.com:altorium/ventas.git"
      }
    }
  ]);
  
  proyectos = this._proyectos.asReadonly();
  loading = signal(false);
  error = signal<string | null>(null);

  // Filtros reactivos
  searchTerm = signal('');
  companyFilter = signal('');
  typeFilter = signal('');
  statusFilter = signal('');
  inactiveOnly = signal(false);

  filteredProyectos = computed(() => {
    let list = this._proyectos();

    if (this.searchTerm()) {
      const term = this.searchTerm().toLowerCase();
      list = list.filter(p => p.domainName.toLowerCase().includes(term));
    }
    if (this.companyFilter()) {
      list = list.filter(p => p.companyId === this.companyFilter());
    }
    if (this.typeFilter()) {
      list = list.filter(p => p.projectType === this.typeFilter());
    }
    if (this.statusFilter()) {
      list = list.filter(p => p.projectStatus === this.statusFilter());
    }
    if (this.inactiveOnly()) {
      list = list.filter(p => p.inactiveFlag);
    }
    
    return list;
  });

  // Lógica de Estado (Acciones Permitidas)
  canPerformAction(status: ProyectoStatus, action: 'PAUSE' | 'BLOCK' | 'RESUME' | 'ARCHIVE' | 'DELETE'): boolean {
    const matrix: Record<ProyectoStatus, Record<string, boolean>> = {
      CREATED:  { PAUSE: true,  BLOCK: true,  RESUME: false, ARCHIVE: true, DELETE: true },
      INGESTING:{ PAUSE: true,  BLOCK: true,  RESUME: false, ARCHIVE: true, DELETE: true },
      ANALYZED: { PAUSE: true,  BLOCK: true,  RESUME: false, ARCHIVE: true, DELETE: true },
      AUDITED:  { PAUSE: true,  BLOCK: true,  RESUME: false, ARCHIVE: true, DELETE: true },
      READY:    { PAUSE: true,  BLOCK: true,  RESUME: false, ARCHIVE: true, DELETE: true },
      PAUSED:   { PAUSE: false, BLOCK: false, RESUME: true,  ARCHIVE: true, DELETE: true },
      BLOCKED:  { PAUSE: false, BLOCK: false, RESUME: true,  ARCHIVE: true, DELETE: true },
      ARCHIVED: { PAUSE: false, BLOCK: false, RESUME: false, ARCHIVE: false, DELETE: true },
    };
    return matrix[status]?.[action] ?? false;
  }
}
