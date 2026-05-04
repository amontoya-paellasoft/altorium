import { Routes } from '@angular/router';
import { AgentMap } from './components/agent-map/agent-map';
import { TodoComponent } from './components/to-do/to-do';
import { EmpresasComponent } from './components/empresas/empresas';
import { Configuracion } from './components/configuracion/configuracion';


export const routes: Routes = [
  { path: '', component: AgentMap },
  { path: 'to-do', component: TodoComponent },
  { path: 'to-do/:userId/:userName', component: TodoComponent },
  { path: 'to-do/:userId', component: TodoComponent },
  { path: 'to-do/:id/:agentId', component: TodoComponent },
  { path: 'empresas', component: EmpresasComponent, data: { title: 'Gestión de Empresas' } },
  { path: 'configuracion', component: Configuracion, data: { title: 'Configuración' } }
];

