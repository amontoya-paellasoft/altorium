import { Injectable, signal } from '@angular/core';
import { Observable, of } from 'rxjs';
import { MOCK_AGENTS, MOCK_USERS, AGENT_TASK_MAP } from '../mock/mock-data';
import { MOCK_TASK_DATA } from '../mock/task-data';
import { TareaInterface } from '../models/tarea-interface';
import { UserDTO } from '../models/altorium/task-dto';

@Injectable({
  providedIn: 'root',
})
export class TareaService {
  public readonly _usuariosCache = signal<UserDTO[]>(MOCK_USERS);

  getNombrePorMockId(mockId: string): string {
    const agente = MOCK_AGENTS.find(a => a.id === mockId);
    if (!agente) return mockId.toUpperCase();
    const usuario = MOCK_USERS.find(u => u.userId === agente.userId);
    return usuario?.fullName ?? mockId.toUpperCase();
  }

  getTareasByAgenteMock(agentId: string): Observable<TareaInterface[]> {
    const taskIds = AGENT_TASK_MAP[agentId] ?? [];
    const tareas: TareaInterface[] = MOCK_TASK_DATA
      .filter(t => taskIds.includes(t.taskId))
      .map(t => ({
        id: String(t.taskId),
        titulo: t.title,
        descripcion: t.functionalSummary,
        asignadaA: String(t.assignedUserId),
        estado: this.mapEstado(t.state),
        // TODO deuda técnica: el backend no expone priority, valor provisional
        prioridad: this.mapPrioridad(t.validationMode),
        creadaEn: new Date(t.createdAt),
      }));
    return of(tareas);
  }

  private mapEstado(state: string): TareaInterface['estado'] {
    if (state === 'DOING' || state === 'TEST') return 'en_progreso';
    if (state === 'DONE') return 'acabada';
    return 'pendiente';
  }

  private mapPrioridad(validationMode: string): TareaInterface['prioridad'] {
    if (validationMode === 'FULL_SANDBOX')    return 'alta';
    if (validationMode === 'PARTIAL_SANDBOX') return 'media';
    return 'baja';
  }
}
