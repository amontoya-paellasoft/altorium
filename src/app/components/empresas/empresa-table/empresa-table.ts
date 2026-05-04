import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Empresa } from '../../../models/empresa.interface';
import { TranslateModule } from '@ngx-translate/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faSort, faChevronUp, faChevronDown, faEye, faEdit, faTrashAlt } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-empresa-table',
  standalone: true,
  imports: [CommonModule, TranslateModule, FontAwesomeModule],
  templateUrl: './empresa-table.html',
  styleUrl: './empresa-table.css'
})
export class EmpresaTable {
  @Input() empresas: Empresa[] = [];
  @Output() view = new EventEmitter<Empresa>();
  @Output() edit = new EventEmitter<Empresa>();
  @Output() delete = new EventEmitter<Empresa>();

  // Iconos
  faSort = faSort;
  faChevronUp = faChevronUp;
  faChevronDown = faChevronDown;
  faEye = faEye;
  faEdit = faEdit;
  faTrash = faTrashAlt;

  sortColumn: 'nombre' | 'nif' | 'plan' | 'facturaEmail' | 'pagoEstado' | 'validoHasta' | 'creadoEn' | null = null;
  sortDirection: 'asc' | 'desc' = 'desc';

  toggleSort(column: 'nombre' | 'nif' | 'plan' | 'facturaEmail' | 'pagoEstado' | 'validoHasta' | 'creadoEn') {
    if (this.sortColumn === column) {
      this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc';
    } else {
      this.sortColumn = column;
      this.sortDirection = 'desc';
    }
    
    this.empresas.sort((a: any, b: any) => {
      let valA = a[column];
      let valB = b[column];

      // Handle dates
      if (column === 'validoHasta' || column === 'creadoEn') {
        valA = new Date(valA || 0).getTime();
        valB = new Date(valB || 0).getTime();
      } 
      // Handle booleans
      else if (typeof valA === 'boolean') {
        valA = valA ? 1 : 0;
        valB = valB ? 1 : 0;
      }
      // Handle strings
      else {
        valA = (valA || '').toString().toLowerCase();
        valB = (valB || '').toString().toLowerCase();
      }

      if (valA < valB) return this.sortDirection === 'asc' ? -1 : 1;
      if (valA > valB) return this.sortDirection === 'asc' ? 1 : -1;
      return 0;
    });
  }

  getSortIcon(column: string) {
    if (this.sortColumn !== column) return this.faSort;
    return this.sortDirection === 'asc' ? this.faChevronUp : this.faChevronDown;
  }

  resetSort() {
    this.sortColumn = null;
    this.sortDirection = 'desc';
  }

  getPlanClass(plan: string): string {
    switch(plan) {
      case 'PREMIUM': return 'badge-premium';
      case 'GROWTH': return 'badge-growth';
      case 'BASIC': return 'badge-basic';
      default: return 'badge-default';
    }
  }

  getPagoClass(estado: string): string {
    return estado === 'Al día' ? 'badge-success' : 'badge-warning';
  }
}
