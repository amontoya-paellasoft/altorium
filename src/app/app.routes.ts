import { Routes } from '@angular/router';
import { AgentMap } from './pages/agent-map/agent-map';
import { Configuracion } from './pages/configuracion/configuracion';
import { Usuarios } from './components/usuarios/usuarios';
import { TodoComponent } from './pages/to-do/to-do';

export const routes: Routes = [
  { path: '', component: AgentMap, data: { title: 'Inicio' } },
  { path: 'to-do', component: TodoComponent, data: { title: 'Tablero' } },
  { path: 'to-do/:userId/:userName', component: TodoComponent, data: { title: 'Tablero' } },
  { path: 'to-do/:userId', component: TodoComponent, data: { title: 'Tablero' } },
  { path: 'to-do/:id/:agentId', component: TodoComponent, data: { title: 'Tablero' } },
  { path: 'configuracion', component: Configuracion, data: { title: 'Configuración' } },
  { path: 'usuarios/:companyId', component: Usuarios, data: { title: 'Usuarios' } },
  { path: 'usuarios', component: Usuarios, data: { title: 'Usuarios' } },
];
