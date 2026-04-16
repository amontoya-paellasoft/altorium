import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { MOCK_TAREAS } from '../mock/mock-data';
import { TareaInterface } from '../models/tarea-interface';

@Injectable({
  providedIn: 'root',
})
export class TareaService {
  private readonly http: HttpClient = inject(HttpClient);
  private readonly baseUrl = '';

  getAllTareas(): Observable<TareaInterface[]> {
    return of(MOCK_TAREAS);
    // return this.http.get<TareaInterface[]>(this.baseUrl + '/tareas');
  }

  getTareasByAgente(agentId: string): Observable<TareaInterface[]> {
    const filtradas = MOCK_TAREAS.filter(t => t.asignadaA === agentId);
    return of(filtradas);
    // return this.http.get<TareaInterface[]>(`${this.baseUrl}/tareas?agente=${agentId}`);
  }

  getTareasByEstado(estado: TareaInterface['estado']): Observable<TareaInterface[]> {
    const filtradas = MOCK_TAREAS.filter(t => t.estado === estado);
    return of(filtradas);
    // return this.http.get<TareaInterface[]>(`${this.baseUrl}/tareas?estado=${estado}`);
  }
}
