import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Proyecto } from '../../../models/proyecto.interface';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faEllipsisH } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-proyecto-card',
  standalone: true,
  imports: [CommonModule, FontAwesomeModule],
  templateUrl: './proyecto-card.html',
  styleUrls: ['./proyecto-card.css']
})
export class ProyectoCard {
  @Input({ required: true }) proyecto!: Proyecto;
  @Output() view = new EventEmitter<void>();
  @Output() edit = new EventEmitter<void>();
  @Output() delete = new EventEmitter<void>();

  faEllipsisH = faEllipsisH;
  menuOpen = false;

  toggleMenu(event: Event) {
    event.stopPropagation();
    this.menuOpen = !this.menuOpen;
  }

  onView(event: Event) {
    event.stopPropagation();
    this.view.emit();
    this.menuOpen = false;
  }

  onEdit(event: Event) {
    event.stopPropagation();
    this.edit.emit();
    this.menuOpen = false;
  }

  onDelete(event: Event) {
    event.stopPropagation();
    this.delete.emit();
    this.menuOpen = false;
  }
}
