export interface Task {
  taskId: number;
  companyId: number;
  projectId: number;
  originType: string;
  title: string;
  functionalSummary: string;
  assignedUserId: number;
  state: 'BACKLOG' | 'TODO' | 'DOING' | 'TEST' | 'DONE';
  createdBy: number;
  currentIteration: number;
  validationMode: string;
  relatedTaskId: number | null;
  automationActive: boolean;
  automationBranchName: string | null;
  createdAt: string;
  updatedAt: string;
  orderIndex?: number;
  
  // Compatibilidad con código antiguo
  id: number;
  texto: string;
  estado: 'completada' | 'pendiente';
  asignadaA: number;
  priority: 'Low' | 'Medium' | 'High';
}

export interface MiseEnPlaceItem {
  itemId: string;
  projectId: number;
  companyId: number;
  itemType: string;
  title: string;
  summary: string;
  status: string;
  createdAt: string;
  updatedAt: string;
  [key: string]: any;
  
  // Compatibilidad con código antiguo (simulada para que no falle el compilador)
  id: number;
  texto: string;
}

export interface Column {
  id: string;
  name: string;
  tasks: (Task | MiseEnPlaceItem)[];
  isMiseEnPlace?: boolean;
}
