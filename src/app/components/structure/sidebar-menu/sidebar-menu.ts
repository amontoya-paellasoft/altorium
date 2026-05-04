import { Component, inject, signal } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { CommonModule, UpperCasePipe } from '@angular/common';
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
  private translate = inject(TranslateService);

  idiomaActual = localStorage.getItem('idioma_preferido') || 'es';

  navItems: NavItem[] = [
    { label: 'Mapa de Agentes', icon: '◈', ruta: '/',             exact: true  },
    { label: 'Tablero',         icon: '⊞', ruta: '/to-do',        exact: false },
    { label: 'Empresas',        icon: '🏢', ruta: '/empresas',     exact: false },
    { label: 'Configuración',   icon: '⚙', ruta: '/configuracion', exact: false },
  ];

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
