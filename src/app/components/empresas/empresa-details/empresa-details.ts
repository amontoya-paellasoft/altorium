import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Empresa } from '../../../models/empresa.interface';

@Component({
  selector: 'app-empresa-details',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './empresa-details.html',
  styleUrl: './empresa-details.css'
})
export class EmpresaDetails {
  @Input() empresa!: Empresa;
  @Output() close = new EventEmitter<void>();
  @Output() edit = new EventEmitter<void>();
  @Output() delete = new EventEmitter<void>();

  files = [
    { name: 'contrato_technova_2024.pdf', size: '245 KB', type: 'PDF', visibility: 'Privado' },
    { name: 'factura_2025_03.pdf', size: '132 KB', type: 'PDF', visibility: 'Privado' },
    { name: 'anexo_servicios.pdf', size: '98 KB', type: 'PDF', visibility: 'Público' }
  ];
}
