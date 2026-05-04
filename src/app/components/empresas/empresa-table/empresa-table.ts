import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Empresa } from '../../../models/empresa.interface';

@Component({
  selector: 'app-empresa-table',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './empresa-table.html',
  styleUrl: './empresa-table.css'
})
export class EmpresaTable {
  @Input() empresas: Empresa[] = [];
  @Output() view = new EventEmitter<Empresa>();
  @Output() edit = new EventEmitter<Empresa>();
  @Output() delete = new EventEmitter<Empresa>();

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
