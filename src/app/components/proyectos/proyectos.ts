import { Component, inject, signal, computed, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ProyectoService } from '../../services/proyecto.service';
import { ProjectOverlayService } from '../../services/project-overlay.service';
import { Proyecto } from '../../models/proyecto.interface';
import { ProyectoDrawer } from './proyecto-drawer/proyecto-drawer';
import { ProyectoCard } from './proyecto-card/proyecto-card';
import { ProyectoTable } from './proyecto-table/proyecto-table';
import { ProyectoDeleteModal } from './proyecto-delete-modal/proyecto-delete-modal';
import { ProyectoDetails } from './proyecto-details/proyecto-details';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faSearch, faFolderOpen, faExclamationTriangle, faPlus, faFilter, faArrowLeft, faSortAmountDown } from '@fortawesome/free-solid-svg-icons';

import { TranslateModule, TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-proyectos',
  standalone: true,
  imports: [
    CommonModule, 
    FormsModule, 
    ProyectoDrawer, 
    ProyectoTable, 
    ProyectoDeleteModal, 
    ProyectoDetails,
    FontAwesomeModule,
    ProyectoCard,
    TranslateModule
  ],
  templateUrl: './proyectos.html',
  styleUrls: ['./proyectos.css']
})
export class ProyectosComponent {
  svc = inject(ProyectoService);
  overlay = inject(ProjectOverlayService);
  translate = inject(TranslateService);

  
  @ViewChild(ProyectoTable) table!: ProyectoTable;

  // Icons
  faSearch = faSearch;
  faPlus = faPlus;
  faArrowLeft = faArrowLeft;
  faFilter = faFilter;
  faSortAmountDown = faSortAmountDown;
  faExclamationTriangle = faExclamationTriangle;
  faFolderOpen = faFolderOpen;

  // UI State
  isMobile = signal(window.innerWidth < 768);
  detailsOpen = signal(false);
  drawerOpen = this.overlay.drawerOpen;
  deleteModalOpen = this.overlay.modalDeleteOpen;
  
  selectedProyecto = signal<Proyecto | null>(null);
  
  // Binding a la señal del servicio
  inactiveFilter = this.svc.inactiveFilter;

  // Service exposure
  isLoading = this.svc.loading;
  error = this.svc.error;

  isEmpty = computed(() => !this.isLoading() && !this.error() && this.svc.proyectos().length === 0);
  isFilteredEmpty = computed(() => !this.isLoading() && !this.error() && !this.isEmpty() && this.svc.filteredProyectos().length === 0);

  constructor() {
    window.addEventListener('resize', () => this.isMobile.set(window.innerWidth < 768));
  }

  goBack() { window.history.back(); }
  
  openNewDrawer() { this.overlay.openDrawer(false); }
  openEditDrawer(p: Proyecto) { this.overlay.openDrawer(true, p); }
  openDetails(p: Proyecto) { this.selectedProyecto.set(p); this.detailsOpen.set(true); }
  openDeleteModal(p: Proyecto) { this.selectedProyecto.set(p); this.overlay.openDeleteModal(); }

  handleSave(data: Partial<Proyecto>) {
    if (this.overlay.isEditing() && this.overlay.editingProject()) {
      this.svc.updateProyecto(this.overlay.editingProject()!.id, data);
    } else {
      this.svc.createProyecto(data);
    }
    this.overlay.drawerOpen.set(false);
  }

  handleDelete() {
    if (this.selectedProyecto()) {
      this.svc.deleteProyecto(this.selectedProyecto()!.id);
      this.overlay.modalDeleteOpen.set(false);
    }
  }
  clearFilters() {
    this.svc.searchTerm.set('');
    this.svc.companyFilter.set('');
    this.svc.typeFilter.set('');
    this.svc.statusFilter.set('');
    this.inactiveFilter.set('all');
  }
  retryLoad() { this.svc.error.set(null); }
}
