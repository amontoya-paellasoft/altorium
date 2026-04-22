import { Component, inject, Input, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DragDropModule, CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { TranslateService, TranslatePipe } from '@ngx-translate/core';
import { Column, Task } from '../../models/to-do-interface';
import { TodoService } from '../../services/todo-service';
import { MOCK_AGENTS, MOCK_TAREAS } from '../../mock/mock-data';
import { Busqueda } from '../busqueda/busqueda';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-todo',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, TranslatePipe, Busqueda, RouterLink, DragDropModule],
  templateUrl: './to-do.html',
  styleUrls: ['./to-do.css']
})
export class TodoComponent implements OnInit {
  onDrop(event: CdkDragDrop<Task[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
      event.container.data.forEach((task, index) => {
        task.orderIndex = index;
      });
      this.todoService.actualizarColumnas(this.todoService.getColumns());
    }
  }

  @Input('id') tareaId!: string;

  private _agentId!: string;
  @Input('agentId') set agentId(value: string) {
    this._agentId = value;
    this.updateFilter();
  }
  get agentId() { return this._agentId; }

  private _userId!: string;
  @Input('userId') set userId(value: string) {
    this._userId = value;
    this.updateFilter();
  }
  get userId() { return this._userId; }

  private _userNameInput!: string;
  @Input('userName') set userNameInput(value: string) {
    this._userNameInput = value;
    if (value) this.userName.set(value.replace(/-/g, ' '));
  }
  get userNameInput() { return this._userNameInput; }

  private translate = inject(TranslateService);
  public todoService = inject(TodoService);

  selectedTaskId: number | null = null;
  taskForm: FormGroup;
  showForm = false;
  taskIdCounter = 5000;
  userName = signal<string>('');

  get columns() {
    return this.todoService.filteredColumns();
  }

  constructor(private fb: FormBuilder, private router: Router) {
    this.taskForm = this.fb.group({
      texto: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(100)]],
      priority: ['Medium', Validators.required]
    });
  }

  private updateFilter(): void {
    const id = this.agentId || this.userId;
    if (id) {
      const agente = MOCK_AGENTS.find(a => a.id === id);
      if (agente) {
        this.todoService.setUsuarioIdFilter(agente.id);
        this.userName.set(agente.name);
      }
    } else {
      this.todoService.setUsuarioIdFilter(null);
      this.userName.set('');
    }
  }

  ngOnInit(): void {
    this.updateFilter();
    this.todoService.cargarTareasMock(MOCK_TAREAS);
  }

  getNombreUsuario(agentId: string): string {
    return MOCK_AGENTS.find(a => a.id === agentId)?.name ?? agentId;
  }

  getTranslatedPriority(priority: string): string {
    return this.translate.instant('TODO.PRIORITIES.' + priority);
  }

  getTranslatedColumn(name: string): string {
    return this.translate.instant('TODO.COLUMNS.' + name);
  }

  selectTask(id: number) {
    this.selectedTaskId = this.selectedTaskId === id ? null : id;
  }

  addTask() {
    if (this.taskForm.valid) {
      const formValue = this.taskForm.value;
      const newTask: Task = {
        id: this.taskIdCounter,
        texto: formValue.texto,
        estado: 'pendiente',
        asignadaA: this.todoService.currentUser(),
        priority: formValue.priority,
        createdAt: new Date()
      };
      this.taskIdCounter++;
      this.todoService.addTask(newTask);
      this.taskForm.reset({ priority: 'Medium' });
      this.showForm = false;
    }
  }

  moveTask(taskId: number, direction: 'prev' | 'next') {
    this.todoService.moveTask(taskId, direction);
    this.selectedTaskId = taskId;
  }
}
