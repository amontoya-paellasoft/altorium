import { Component, inject, signal, computed, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ProyectoService } from '../../services/proyecto.service';
import { Proyecto } from '../../models/proyecto.interface';
import { ProyectoDrawer } from './proyecto-drawer/proyecto-drawer';
import { ProyectoCard } from './proyecto-card/proyecto-card';
import { ProyectoTable } from './proyecto-table/proyecto-table';
import { ProyectoDeleteModal } from './proyecto-delete-modal/proyecto-delete-modal';
import { ProyectoDetails } from './proyecto-details/proyecto-details';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { 
  faSearch, 
  faFolderOpen, 
  faExclamationTriangle, 
  faPlus, 
  faFilter, 
  faArrowLeft,
  faSortAmountDown
} from '@fortawesome/free-solid-svg-icons';

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
    ProyectoCard
  ],
  templateUrl: './proyectos.html',
  styleUrls: ['./proyectos.css', './proyectos-mobile.css']
})
export class ProyectosComponent {
  svc = inject(ProyectoService);
  
  @ViewChild(ProyectoTable) table!: ProyectoTable;

  // Icons
  faSearch = faSearch;
  faFolderOpen = faFolderOpen;
  faExclamationTriangle = faExclamationTriangle;
  faPlus = faPlus;
  faFilter = faFilter;
  faArrowLeft = faArrowLeft;
  faSortAmountDown = faSortAmountDown;

  // View State
  isMobile = signal(window.innerWidth < 768);
  drawerOpen = signal(false);
  detailsOpen = signal(false);
  deleteModalOpen = signal(false);
  
  // Selection State
  selectedProyecto = signal<Proyecto | null>(null);
  isEditing = signal(false);

  // Additional Filter State
  inactiveFilter = signal<'all' | 'active' | 'inactive'>('all');

  // Service exposure
  isLoading = this.svc.loading;
  error = this.svc.error;

  isEmpty = computed(() => !this.isLoading() && !this.error() && this.svc.proyectos().length === 0);
  isFilteredEmpty = computed(() => !this.isLoading() && !this.error() && !this.isEmpty() && this.svc.filteredProyectos().length === 0);

  constructor() {
    window.addEventListener('resize', () => {
      this.isMobile.set(window.innerWidth < 768);
    });
    
  }

  // Override filteredProyectos to support 3-state inactive filter if service only has 2
  filteredProyectos = computed(() => {
    let list = this.svc.filteredProyectos();
    if (this.inactiveFilter() === 'active') {
      list = list.filter(p => !p.inactiveFlag);
    } else if (this.inactiveFilter() === 'inactive') {
      list = list.filter(p => p.inactiveFlag);
    }
    return list;
  });

  retryLoad() {
    this.svc.error.set(null);
  }

  clearFilters() {
    this.svc.searchTerm.set('');
    this.svc.companyFilter.set('');
    this.svc.typeFilter.set('');
    this.svc.statusFilter.set('');
    this.inactiveFilter.set('all');
  }

  goBack() {
    window.history.back();
  }

  openNewDrawer() {
    this.selectedProyecto.set(null);
    this.isEditing.set(false);
    this.drawerOpen.set(true);
  }

  openDetails(p: Proyecto) {
    this.selectedProyecto.set(p);
    this.detailsOpen.set(true);
  }

  openEditDrawer(p: Proyecto) {
    this.selectedProyecto.set(p);
    this.isEditing.set(true);
    this.drawerOpen.set(true);
  }

  openDeleteModal(p: Proyecto) {
    this.selectedProyecto.set(p);
    this.deleteModalOpen.set(true);
  }

  handleSave(data: Partial<Proyecto>) {
    // Save logic
    this.drawerOpen.set(false);
  }

  handleDelete() {
    // Delete logic
    this.deleteModalOpen.set(false);
  }
}

