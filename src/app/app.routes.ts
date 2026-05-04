import { Routes } from '@angular/router';
import { AgentMap } from './components/agent-map/agent-map';
import { TodoComponent } from './components/to-do/to-do';
import { EmpresasComponent } from './components/empresas/empresas';
import { Configuracion } from './components/configuracion/configuracion';
import { Usuarios } from './components/usuarios/usuarios';

export const routes: Routes = [
  { path: '', component: AgentMap, data: { title: 'Inicio', nav: true, icon: '◈', exact: true } },
  {
    path: 'empresas',
    component: EmpresasComponent,
    data: { title: 'Empresas', nav: true, icon: '⊙', exact: false },
  },
  {
    path: 'to-do',
    component: TodoComponent,
    data: { title: 'Tareas', nav: true, icon: '⊞', exact: false },
  },
  {
    path: 'configuracion',
    component: Configuracion,
    data: { title: 'Configuración', nav: true, icon: '⚙', exact: false },
  },
  {
    path: 'usuarios',
    component: Usuarios,
    data: { title: 'Usuarios', nav: true, icon: '🗣', exact: false },
  },

  // nav: false → no aparecen en el sidebar
  { path: 'to-do/:userId/:userName', component: TodoComponent },
  { path: 'to-do/:userId', component: TodoComponent },
  { path: 'to-do/:id/:agentId', component: TodoComponent },
  { path: 'empresas', component: EmpresasComponent, data: { title: 'Gestión de Empresas' } },
  { path: 'configuracion', component: Configuracion, data: { title: 'Configuración' } }
];
