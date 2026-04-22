import { Injectable, signal, computed } from '@angular/core';
import { Column, Task } from '../models/to-do-interface';
import { TareaInterface } from '../models/tarea-interface';
import { MOCK_AGENTS } from '../mock/mock-data';

@Injectable({
  providedIn: 'root'
})
export class TodoService {
  private _searchTerm = signal<string>('');
  public searchTerm = this._searchTerm.asReadonly();

  private _priorityFilter = signal<string>('All');
  public priorityFilter = this._priorityFilter.asReadonly();

  private _usuarioIdFilter = signal<string | null>(null);
  public usuarioIdFilter = this._usuarioIdFilter.asReadonly();

  public currentUser = signal<string>('pm');

  private _columns = signal<Column[]>([
    { id: 'mise-en-place', name: 'Mise en Place', tasks: [] },
    { id: 'backlog',       name: 'Backlog',       tasks: [] },
    { id: 'todo',          name: 'To Do',         tasks: [] },
    { id: 'doing',         name: 'Do',            tasks: [] },
    { id: 'test',          name: 'Test',          tasks: [] },
    { id: 'done',          name: 'Done',          tasks: [] },
  ]);

  public actualizarColumnas(columns: Column[]) {
    this._columns.set([...columns]);
  }

  public filteredColumns = computed(() => {
    const term = this._searchTerm().toLowerCase();
    const priority = this._priorityFilter();
    const agentFilter = this._usuarioIdFilter();

    return this._columns().map(col => ({
      ...col,
      tasks: [...col.tasks].sort((a, b) => (a.orderIndex ?? 0) - (b.orderIndex ?? 0)).filter(task => {
        const agente = MOCK_AGENTS.find(a => a.id === task.asignadaA);
        const fullName = (agente?.name ?? task.asignadaA).toLowerCase();

        const matchesSearch = !term ||
          task.texto.toLowerCase().includes(term) ||
          fullName.includes(term);

        const matchesPriority = priority === 'All' || task.priority === priority;
        const matchesUser = agentFilter === null || task.asignadaA === agentFilter;

        return matchesSearch && matchesPriority && matchesUser;
      })
    }));
  });

  public setSearchTerm(term: string) {
    this._searchTerm.set(term);
  }

  public setPriorityFilter(priority: string) {
    this._priorityFilter.set(priority);
  }

  public setUsuarioIdFilter(id: string | null) {
    this._usuarioIdFilter.set(id);
    if (id !== null) {
      this.currentUser.set(id);
    }
  }

  public addTask(task: Task) {
    const currentCols = this._columns();
    currentCols[0].tasks.push(task);
    this._columns.set([...currentCols]);
  }

  public moveTask(taskId: number, direction: 'prev' | 'next') {
    const currentCols = this._columns();
    let sourceColumnIndex = -1;
    let taskIndex = -1;

    for (let i = 0; i < currentCols.length; i++) {
      taskIndex = currentCols[i].tasks.findIndex((t: Task) => t.id === taskId);
      if (taskIndex !== -1) {
        sourceColumnIndex = i;
        break;
      }
    }

    if (sourceColumnIndex === -1) return;

    const targetColumnIndex = direction === 'next' ? sourceColumnIndex + 1 : sourceColumnIndex - 1;

    if (targetColumnIndex >= 0 && targetColumnIndex < currentCols.length) {
      const [task] = currentCols[sourceColumnIndex].tasks.splice(taskIndex, 1);
      task.estado = currentCols[targetColumnIndex].id === 'done' ? 'completada' : 'pendiente';
      currentCols[targetColumnIndex].tasks.push(task);
      this._columns.set([...currentCols]);
    }
  }

  public getColumns() {
    return this._columns();
  }

  public cargarTareasMock(tareas: TareaInterface[]): void {
    const currentCols = this._columns();

    tareas.forEach(tarea => {
      const numericId = parseInt(tarea.id.replace('tarea', ''), 10) || Math.floor(Math.random() * 10000);
      const yaExiste = currentCols.some(col => col.tasks.some(t => t.id === numericId));
      if (yaExiste) return;

      const task: Task = {
        id: numericId,
        texto: tarea.titulo,
        estado: tarea.estado === 'acabada' ? 'completada' : 'pendiente',
        asignadaA: tarea.asignadaA,
        priority: this.mapPrioridad(tarea.prioridad),
        createdAt: tarea.creadaEn,
      };

      const targetCol = currentCols.find(c => c.id === this.mapEstadoAColumna(tarea.estado));
      targetCol?.tasks.push(task);
    });

    this._columns.set([...currentCols]);
  }

  private mapPrioridad(p: TareaInterface['prioridad']): Task['priority'] {
    if (p === 'alta') return 'High';
    if (p === 'media') return 'Medium';
    return 'Low';
  }

  private mapEstadoAColumna(e: TareaInterface['estado']): string {
    if (e === 'pendiente') return 'todo';
    if (e === 'en_progreso') return 'doing';
    if (e === 'acabada') return 'done';
    return 'backlog';
  }
}
