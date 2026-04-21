import { Component, DestroyRef, inject, Input, OnInit, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DragDropModule, CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { TranslateService, TranslatePipe } from '@ngx-translate/core';
import { Column, Task } from '../../models/to-do-interface';
import { TodoService } from '../../services/todo-service';
import { TareaService } from '../../services/tarea-service';
import { MOCK_AGENTS } from '../../mock/mock-data';
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
// ... (rest of class properties)

  onDrop(event: CdkDragDrop<any[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
      // Actualizar los orderIndex en la columna
      event.container.data.forEach((item, index) => {
        item.orderIndex = index;
      });
      // Forzar la actualización del estado en el servicio
      this.todoService.actualizarColumnas(this.todoService.getColumns());
    }
  }
// ...

  private translate = inject(TranslateService);
  public todoService = inject(TodoService);
  private tareaService = inject(TareaService);
  private destroyRef = inject(DestroyRef);

  selectedTaskId: number | null = null;
  selectedTaskDetail: any | null = null;
  taskForm: FormGroup;
  showForm = false;
  taskIdCounter = 5000;
  userName = signal<string>('');

  get columns() {
    return this.todoService.filteredColumns();
  }

  viewTaskDetails(task: any) {
    this.selectedTaskDetail = task;
  }

  closeTaskDetails() {
    this.selectedTaskDetail = null;
  }

  constructor(private fb: FormBuilder, private router: Router) {
    this.taskForm = this.fb.group({
      texto: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(100)]],
      priority: ['Medium', Validators.required]
    });
  }

  ngOnInit(): void {
    // Se asegura que no haya filtros activos al iniciar
    this.todoService.setUsuarioIdFilter(null);
    this.userName.set('');

    this.tareaService.getUsuariosConTareas()
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(usuarios => {
        usuarios.forEach((usuario: any) => {
          this.todoService.cargarTareasDeApi(usuario.tareas);
        });
      });
  }

  getNombreUsuario(userId: number): string {
    const usuario = this.tareaService._usuariosCache().find(u => u.id === userId);
    return usuario ? `${usuario.firstName} ${usuario.lastName}` : `Usuario ${userId}`;
  }

  getTranslatedPriority(priority: string): string {
    return this.translate.instant('TODO.PRIORITIES.' + priority);
  }

  getTranslatedColumn(id: string): string {
    const key = `TODO.COLUMNS.${id.toLowerCase()}`;
    const translation = this.translate.instant(key);
    return translation === key ? id : translation;
  }

  selectTask(id: number) {
    this.selectedTaskId = this.selectedTaskId === id ? null : id;
  }

  addTask() {
    if (this.taskForm.valid) {
      const formValue = this.taskForm.value;
      const newTask: Task = {
        taskId: this.taskIdCounter,
        id: this.taskIdCounter,
        title: formValue.texto,
        texto: formValue.texto,
        state: 'TODO',
        estado: 'pendiente',
        assignedUserId: this.todoService.currentUser(),
        asignadaA: this.todoService.currentUser(),
        priority: formValue.priority,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        companyId: 0,
        projectId: 0,
        originType: 'MANUAL',
        functionalSummary: '',
        createdBy: 0,
        currentIteration: 1,
        validationMode: 'NONE',
        relatedTaskId: null,
        automationActive: false,
        automationBranchName: null
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
