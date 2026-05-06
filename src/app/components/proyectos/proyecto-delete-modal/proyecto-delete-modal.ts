import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Proyecto } from '../../../models/proyecto.interface';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faTimes, faExclamationTriangle } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-proyecto-delete-modal',
  standalone: true,
  imports: [CommonModule, FormsModule, FontAwesomeModule],
  templateUrl: './proyecto-delete-modal.html',
  styleUrls: ['./proyecto-delete-modal.css']
})
export class ProyectoDeleteModal {
  @Input({ required: true }) proyecto!: Proyecto | any;
  @Output() close = new EventEmitter<void>();
  @Output() confirm = new EventEmitter<void>();
  
  confirmInput = '';
  
  faTimes = faTimes;
  faExclamationTriangle = faExclamationTriangle;

  get target(): Proyecto {
    return typeof this.proyecto === 'function' ? this.proyecto() : this.proyecto;
  }

  get expectedMatch(): string {
    return this.target.alias || this.target.domainName;
  }

  isValid(): boolean {
    return this.confirmInput === this.target.alias || this.confirmInput === this.target.domainName;
  }
}

