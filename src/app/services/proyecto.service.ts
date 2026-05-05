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

  // Filtros y Ordenamiento
  searchTerm = signal('');
  companyFilter = signal('');
  typeFilter = signal('');
  statusFilter = signal('');
  inactiveFilter = signal<'all' | 'active' | 'inactive'>('all');
  sortField = signal<keyof Proyecto | null>('createdAt');
  sortDirection = signal<'asc' | 'desc'>('desc');

  filteredProyectos = computed(() => {
    let list = [...this._proyectos()];

    // Filtrado
    const term = this.searchTerm().toLowerCase();
    const company = this.companyFilter();
    const type = this.typeFilter();
    const status = this.statusFilter();
    const inactiveMode = this.inactiveFilter();

    list = list.filter(p => {
      const matchTerm = !term || p.domainName.toLowerCase().includes(term) || (p.alias?.toLowerCase().includes(term) ?? false);
      const matchCompany = !company || p.companyId === company;
      const matchType = !type || p.projectType === type;
      const matchStatus = !status || p.projectStatus === status;
      let matchInactive = true;
      if (inactiveMode === 'active') matchInactive = p.inactiveFlag === false;
      else if (inactiveMode === 'inactive') matchInactive = p.inactiveFlag === true;
      return matchTerm && matchCompany && matchType && matchStatus && matchInactive;
    });

    // Ordenamiento
    const field = this.sortField();
    if (field) {
      list.sort((a, b) => {
        const valA = a[field] ?? '';
        const valB = b[field] ?? '';
        const direction = this.sortDirection() === 'asc' ? 1 : -1;
        return valA > valB ? direction : valA < valB ? -direction : 0;
      });
    }
    
    return list;
  });

  createProyecto(data: Partial<Proyecto>) {
    const nuevo: Proyecto = {
      id: crypto.randomUUID(),
      domainName: data.domainName || 'Nuevo Proyecto',
      companyId: data.companyId || '',
      domainUrl: data.domainUrl || '',
      projectType: data.projectType || 'SPRING_BOOT',
      projectStatus: 'READY',
      activeVersionId: 1,
      inactiveFlag: false,
      createdAt: new Date().toISOString(),
      alias: data.alias || 'proyecto-nuevo',
      repositoryConfig: { provider: 'GITHUB', cloneUrl: '' }
    };
    this._proyectos.update(list => [...list, nuevo]);
  }

  updateProyecto(id: string, data: Partial<Proyecto>) {
    this._proyectos.update(list => list.map(p => p.id === id ? { ...p, ...data } : p));
  }

  deleteProyecto(id: string) {
    this._proyectos.update(list => list.filter(p => p.id !== id));
  }

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