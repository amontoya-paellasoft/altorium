import { Component, Input, Output, EventEmitter, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Empresa } from '../../../models/empresa.interface';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-empresa-delete-modal',
  standalone: true,
  imports: [CommonModule, FormsModule, TranslateModule],
  templateUrl: './empresa-delete-modal.html',
  styleUrl: './empresa-delete-modal.css'
})
export class EmpresaDeleteModal {
  @Input() empresa!: Empresa;
  @Output() close = new EventEmitter<void>();
  @Output() confirm = new EventEmitter<string>();

  confirmInput = signal('');

  get isConfirmed(): boolean {
    return this.confirmInput() === this.empresa.alias;
  }

  onConfirm() {
    if (this.isConfirmed) {
      this.confirm.emit(this.empresa.id);
    }
  }
}
