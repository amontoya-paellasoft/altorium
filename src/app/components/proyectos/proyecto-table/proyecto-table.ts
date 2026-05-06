import { Component, Input, Output, EventEmitter, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Proyecto } from '../../../models/proyecto.interface';
import { ProyectoService } from '../../../services/proyecto.service';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faSort, faSortUp, faSortDown, faEye, faEdit, faTrash, faExternalLinkAlt, faEllipsisH } from '@fortawesome/free-solid-svg-icons';
import { TranslateModule, TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-proyecto-table',
  standalone: true,
  imports: [CommonModule, FontAwesomeModule, TranslateModule],
  templateUrl: './proyecto-table.html',
  styleUrls: ['./proyecto-table.css']
})
export class ProyectoTable {
  svc = inject(ProyectoService);
  translate = inject(TranslateService);
  @Input({ required: true }) proyectos: Proyecto[] = [];
  @Output() view = new EventEmitter<Proyecto>();
  @Output() edit = new EventEmitter<Proyecto>();
  @Output() delete = new EventEmitter<Proyecto>();

  faEye = faEye;
  faEdit = faEdit;
  faTrash = faTrash;
  faSort = faSort;
  faSortUp = faSortUp;
  faSortDown = faSortDown;
  faExternalLinkAlt = faExternalLinkAlt;

  toggleSort(field: keyof Proyecto) {
    const current = this.svc.sortField();
    if (current === field) {
      this.svc.sortDirection.set(this.svc.sortDirection() === 'asc' ? 'desc' : 'asc');
    } else {
      this.svc.sortField.set(field);
      this.svc.sortDirection.set('asc');
    }
  }

  getSortIcon(field: string) {
    if (this.svc.sortField() !== field) return this.faSort;
    return this.svc.sortDirection() === 'asc' ? faSortUp : faSortDown;
  }
}

