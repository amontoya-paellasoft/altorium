import { Injectable, signal } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class ProjectOverlayService {
  drawerOpen = signal(false);
  modalDeleteOpen = signal(false);
  isEditing = signal(false);
  editingProject = signal<any>(null);
  
  openDrawer(editMode = false, project: any = null) { 
    this.isEditing.set(editMode);
    this.editingProject.set(project);
    this.drawerOpen.set(true); 
  }
  openDeleteModal() { this.modalDeleteOpen.set(true); }
}
