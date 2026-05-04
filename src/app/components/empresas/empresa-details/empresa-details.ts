import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Empresa } from '../../../models/empresa.interface';
import { TranslateModule } from '@ngx-translate/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faArrowUp, faArrowDown, faEye, faEyeSlash, faTrashAlt, faTimes, faPen, faCopy, faUpload } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-empresa-details',
  standalone: true,
  imports: [CommonModule, TranslateModule, FontAwesomeModule],
  templateUrl: './empresa-details.html',
  styleUrl: './empresa-details.css'
})
export class EmpresaDetails {
  @Input() empresa!: Empresa;
  @Output() close = new EventEmitter<void>();
  @Output() edit = new EventEmitter<void>();
  @Output() delete = new EventEmitter<void>();

  faArrowUp = faArrowUp;
  faArrowDown = faArrowDown;
  faEye = faEye;
  faEyeSlash = faEyeSlash;
  faTrash = faTrashAlt;
  faTimes = faTimes;
  faPen = faPen;
  faCopy = faCopy;
  faUpload = faUpload;

  files = [
    { name: 'contrato_technova_2024.pdf', size: '245 KB', type: 'PDF', visibility: 'Privado' },
    { name: 'factura_2025_03.pdf', size: '132 KB', type: 'PDF', visibility: 'Privado' },
    { name: 'anexo_servicios.pdf', size: '98 KB', type: 'PDF', visibility: 'Público' }
  ];

  moveFile(index: number, direction: 'up' | 'down') {
    const newIndex = direction === 'up' ? index - 1 : index + 1;
    if (newIndex >= 0 && newIndex < this.files.length) {
      const temp = this.files[index];
      this.files[index] = this.files[newIndex];
      this.files[newIndex] = temp;
    }
  }

  toggleVisibility(file: any) {
    file.visibility = file.visibility === 'Privado' ? 'Público' : 'Privado';
  }

  deleteFile(index: number) {
    this.files.splice(index, 1);
  }
}
