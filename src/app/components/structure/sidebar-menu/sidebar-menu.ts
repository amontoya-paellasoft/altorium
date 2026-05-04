import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { WorkspaceService } from '../../../services/workspace-service';
import { TranslateService } from '@ngx-translate/core';

interface NavItem {
  label: string;
  icon: string;
  ruta: string;
  exact: boolean;
}

interface Proyecto {
  id: string;
  nombre: string;
  color: string;
  expandido: boolean;
}

@Component({
  selector: 'app-sidebar-menu',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, CommonModule],
  templateUrl: './sidebar-menu.html',
  styleUrl: './sidebar-menu.css',
})
export class SidebarMenu {
  ws = inject(WorkspaceService);
  private router = inject(Router);
  private translate = inject(TranslateService);

  idiomaActual = this.translate.currentLang || 'es';

  navItems: NavItem[] = this.router.config
    .filter(ruta => ruta.data?.['nav'] === true)
    .map(ruta => ({
      label: ruta.data!['title'] as string,
      icon:  ruta.data!['icon']  as string ?? '•',
      ruta:  '/' + ruta.path,
      exact: ruta.data!['exact'] as boolean ?? false,
    }));

  proyectos = signal<Proyecto[]>([
    { id: 'prueba1', nombre: 'Proyecto DaaS', color: '#2563eb', expandido: true  },
    { id: 'altorium', nombre: 'Altorium', color: '#10b981', expandido: false },
  ]);

  toggleProyecto(id: string): void {
    this.proyectos.update(ps =>
      ps.map(p => p.id === id ? { ...p, expandido: !p.expandido } : p)
    );
  }

  selectLanguage(lang: string): void {
    this.translate.use(lang);
    localStorage.setItem('idioma_preferido', lang);
    this.idiomaActual = lang;
  }
}
