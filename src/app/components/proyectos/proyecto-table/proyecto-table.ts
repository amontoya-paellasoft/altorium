import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Proyecto } from '../../../models/proyecto.interface';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faSort, faSortUp, faSortDown, faEye, faEdit, faTrash, faExternalLinkAlt, faEllipsisH } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-proyecto-table',
  standalone: true,
  imports: [CommonModule, FontAwesomeModule],
  templateUrl: './proyecto-table.html',
  styleUrls: ['./proyecto-table.css']
})
export class ProyectoTable {
  @Input({ required: true }) proyectos: Proyecto[] = [];
  @Output() view = new EventEmitter<Proyecto>();
  @Output() edit = new EventEmitter<Proyecto>();
  @Output() delete = new EventEmitter<Proyecto>();

  // Icons
  faSort = faSort;
  faSortUp = faSortUp;
  faSortDown = faSortDown;
  faEye = faEye;
  faEdit = faEdit;
  faTrash = faTrash;
  faExternalLinkAlt = faExternalLinkAlt;
  faEllipsisH = faEllipsisH;

  // Sorting state
  sortColumn: string = 'createdAt';
  sortDirection: 'asc' | 'desc' = 'desc';

  toggleSort(column: string) {
    if (this.sortColumn === column) {
      this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc';
    } else {
      this.sortColumn = column;
      this.sortDirection = 'asc';
    }
    // Note: To implement actual sorting, we'd need to emit an event to the parent 
    // or sort the `proyectos` array here locally.
  }

  getSortIcon(column: string) {
    if (this.sortColumn !== column) return this.faSort;
    return this.sortDirection === 'asc' ? faSortUp : faSortDown;
  }

  resetSort() {
    this.sortColumn = 'createdAt';
    this.sortDirection = 'desc';
  }
}

