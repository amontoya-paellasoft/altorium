export interface Task {
  id: number;
  texto: string;
  estado: 'pendiente' | 'completada';
  asignadaA: string;
  priority: 'Low' | 'Medium' | 'High';
  createdAt: Date;
  orderIndex?: number;
}

export interface Column {
  id: string;
  name: string;
  tasks: Task[];
}
