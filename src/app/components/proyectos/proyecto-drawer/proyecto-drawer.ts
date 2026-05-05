import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Proyecto } from '../../../models/proyecto.interface';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-proyecto-drawer',
  standalone: true,
  imports: [CommonModule, FormsModule, FontAwesomeModule],
  templateUrl: './proyecto-drawer.html',
  styleUrls: ['./proyecto-drawer.css']
})
export class ProyectoDrawer implements OnInit {
  @Input() data: Proyecto | null = null;
  @Input() isEditing: boolean = false;
  @Output() close = new EventEmitter<void>();
  @Output() saveAction = new EventEmitter<Partial<Proyecto>>();

  faTimes = faTimes;

  model: Partial<Proyecto> = {
    companyId: '31', // Default
    projectType: 'SPRING_BOOT',
    inactiveFlag: false
  };

  charCount: number = 0;

  ngOnInit() {
    if (this.data && this.isEditing) {
      this.model = { ...this.data };
      this.updateCharCount();
    }
  }

  updateCharCount() {
    this.charCount = this.model.altImage ? this.model.altImage.length : 0;
  }

  save() {
    this.saveAction.emit(this.model);
  }
}
