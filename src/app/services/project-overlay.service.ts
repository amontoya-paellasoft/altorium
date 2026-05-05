import { Injectable, signal } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class ProjectOverlayService {
  drawerOpen = signal(false);
  modalDeleteOpen = signal(false);
  
  openDrawer(editMode = false) { this.drawerOpen.set(true); }
  openDeleteModal() { this.modalDeleteOpen.set(true); }
}
