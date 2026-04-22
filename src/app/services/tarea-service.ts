import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { MOCK_AGENTS, MOCK_TAREAS } from '../mock/mock-data';
import { TareaInterface } from '../models/tarea-interface';

@Injectable({
  providedIn: 'root',
})
export class TareaService {
  getNombrePorMockId(mockId: string): string {
    return MOCK_AGENTS.find(a => a.id === mockId)?.name ?? mockId.toUpperCase();
  }

  getAllTareas(): Observable<TareaInterface[]> {
    return of(MOCK_TAREAS);
  }

  getTareasByAgenteMock(agentId: string): Observable<TareaInterface[]> {
    return of(MOCK_TAREAS.filter(t => t.asignadaA === agentId));
  }

  getTareasByEstadoMock(estado: TareaInterface['estado']): Observable<TareaInterface[]> {
    return of(MOCK_TAREAS.filter(t => t.estado === estado));
  }
}
