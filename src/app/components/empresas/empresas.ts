import { Component, inject, signal, computed, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { EmpresaService } from '../../services/empresa.service';
import { Empresa } from '../../models/empresa.interface';
import { EmpresaDrawer } from './empresa-drawer/empresa-drawer';
import { EmpresaTable } from './empresa-table/empresa-table';
import { EmpresaCard } from './empresa-card/empresa-card';
import { EmpresaDeleteModal } from './empresa-delete-modal/empresa-delete-modal';
import { EmpresaDetails } from './empresa-details/empresa-details';
import { TranslateModule } from '@ngx-translate/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { 
  faSearch, 
  faInbox, 
  faExclamationTriangle, 
  faPlus, 
  faUndo, 
  faSync, 
  faArrowLeft,
  faSearchMinus,
  faBuilding,
  faSortAmountDown
} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-empresas',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    EmpresaDrawer,
    EmpresaTable,
    EmpresaCard,
    EmpresaDeleteModal,
    EmpresaDetails,
    TranslateModule,
    FontAwesomeModule
  ],
  templateUrl: './empresas.html',
  styleUrl: './empresas.css'
})
export class EmpresasComponent {
  private empresaService = inject(EmpresaService);
  
  @ViewChild(EmpresaTable) table!: EmpresaTable;

  // Icons
  faSearch = faSearch;
  faInbox = faInbox;
  faExclamationTriangle = faExclamationTriangle;
  faPlus = faPlus;
  faUndo = faUndo;
  faSync = faSync;
  faArrowLeft = faArrowLeft;
  faSearchMinus = faSearchMinus;
  faBuilding = faBuilding;
  faSortAmountDown = faSortAmountDown;

  // Search and Filter State
  searchTerm = signal('');
  planFilter = signal('');
  
  // View State
  isMobile = signal(window.innerWidth < 768);
  drawerOpen = signal(false);
  detailsOpen = signal(false);
  deleteModalOpen = signal(false);
  
  // Selection State
  selectedEmpresa = signal<Empresa | null>(null);
  isEditing = signal(false);

  // Service exposure
  isLoading = this.empresaService.loading;
  error = this.empresaService.error;

  // Computed data
  allEmpresas = this.empresaService.empresas;
  
  filteredEmpresas = computed(() => {
    let list = this.allEmpresas();
    
    if (this.searchTerm()) {
      const term = this.searchTerm().toLowerCase();
      list = list.filter(e => 
        e.nombre.toLowerCase().includes(term) || 
        e.alias.toLowerCase().includes(term) ||
        (e.nif && e.nif.toLowerCase().includes(term))
      );
    }
    
    if (this.planFilter()) {
      list = list.filter(e => e.plan === this.planFilter());
    }
    
    return list;
  });

  isEmpty = computed(() => !this.isLoading() && !this.error() && this.allEmpresas().length === 0);
  isFilteredEmpty = computed(() => !this.isLoading() && !this.error() && !this.isEmpty() && this.filteredEmpresas().length === 0);

  empresaCount = computed(() => this.filteredEmpresas().length);

  constructor() {
    window.addEventListener('resize', () => {
      this.isMobile.set(window.innerWidth < 768);
    });
  }

  retryLoad() {
    // Simulated retry logic if there was a real API
    console.log('Retrying to load companies...');
    // For now just clear error to simulate fix
    this.empresaService.error.set(null);
  }

  clearFilters() {
    this.searchTerm.set('');
    this.planFilter.set('');
    if (this.table) {
        this.table.resetSort();
    }
  }

  goBack() {
    window.history.back();
  }

  openNewDrawer() {
    this.selectedEmpresa.set(null);
    this.isEditing.set(false);
    this.drawerOpen.set(true);
  }

  openDetails(empresa: Empresa) {
    this.selectedEmpresa.set(empresa);
    this.detailsOpen.set(true);
  }

  openEditDrawer(empresa: Empresa) {
    this.selectedEmpresa.set(empresa);
    this.isEditing.set(true);
    this.drawerOpen.set(true);
  }

  openDeleteModal(empresa: Empresa) {
    this.selectedEmpresa.set(empresa);
    this.deleteModalOpen.set(true);
  }

  handleSave(data: Partial<Empresa>) {
    if (this.isEditing() && this.selectedEmpresa()) {
      this.empresaService.updateEmpresa(this.selectedEmpresa()!.id, data);
    } else {
      this.empresaService.createEmpresa(data);
    }
    this.drawerOpen.set(false);
  }

  handleDelete(id: string) {
    this.empresaService.deleteEmpresa(id);
    this.deleteModalOpen.set(false);
  }
}
