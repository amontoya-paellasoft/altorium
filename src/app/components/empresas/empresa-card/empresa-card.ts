import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Empresa } from '../../../models/empresa.interface';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-empresa-card',
  standalone: true,
  imports: [CommonModule, TranslateModule],
  templateUrl: './empresa-card.html',
  styleUrl: './empresa-card.css'
})
export class EmpresaCard {
  @Input() empresa!: Empresa;
  @Output() view = new EventEmitter<void>();
  @Output() edit = new EventEmitter<void>();
  @Output() delete = new EventEmitter<void>();

  menuOpen = false;

  toggleMenu(event: Event) {
    event.stopPropagation();
    this.menuOpen = !this.menuOpen;
  }
}
