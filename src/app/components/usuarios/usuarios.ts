import { Component } from '@angular/core';
import { CommonModule, Location } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { InviteDTO, CompanyDTO } from '../../models/altorium/invite-dto';
import { TaskDTO } from '../../models/altorium/task-dto';
import { TaskEstimateDTO } from '../../models/altorium/estimate-dto';
import { TaskApprovalDTO } from '../../models/altorium/approval-dto';
import { TimelineEventDTO, CommentDTO } from '../../models/altorium/activity-dto';

/* INTERFACES PARA LOS MOCK */
interface CompanyUser {
  userId: number;
  name: string;
  surname: string;
  email: string;
  userExtId: string;
  authProjectId: string;
  companyIds: number[];
  createdAt: string;
  roleInCompany: 'ADMIN' | 'DEVELOPER';
}

interface RoleAssignment {
  roleAssignmentId: number;
  userId: number;
  role: 'ADMIN' | 'DEVELOPER';
  active: boolean;
  createdAt: string;
}

const MOCK_COMPANY_USERS: CompanyUser[] = [
  {
    userId: 7,
    name: 'Daniel',
    surname: 'Morais',
    email: 'daniel.morais@altorium.eu',
    userExtId: 'auth-user-123',
    authProjectId: 'altorium-main',
    companyIds: [31],
    createdAt: '2026-01-18T10:24:00+01:00',
    roleInCompany: 'ADMIN',
  },
  {
    userId: 14,
    name: 'Olivia',
    surname: 'Wilson',
    email: 'olivia.wilson@cliente.example',
    userExtId: 'auth-user-456',
    authProjectId: 'cliente-main',
    companyIds: [31],
    createdAt: '2026-01-18T10:40:00+01:00',
    roleInCompany: 'DEVELOPER',
  },
];

const MOCK_INVITES: InviteDTO[] = [
  {
    id: 701,
    createdAt: '2026-01-18T11:14:30+01:00',
    email: 'dev.pending@cliente.example',
    role: 'DEVELOPER',
    status: 'SENT',
    errorDesc: null,
    lastSentAt: '2026-01-18T11:15:00+01:00',
    retries: 1,
    user: null,
    userId: 7,
    companyId: 31,
    company: {
      id: 31,
      createdAt: '2026-01-18T10:00:00+01:00',
      companyName: 'Cliente Existente SL',
      nif: 'B12345678',
      alias: 'cliente001',
      founderUserId: 7,
      planType: 'GROWTH',
      mailBill: true,
      pendingPayment: false,
      dateIsPendingPayment: null,
      validatePaidTo: '2026-12-31T23:59:59+01:00',
      files: [],
    },
  },
  {
    id: 702,
    createdAt: '2026-01-18T11:21:45+01:00',
    email: 'admin.error@cliente.example',
    role: 'ADMIN',
    status: 'ERROR',
    errorDesc: 'OAuth provider rejected invite',
    lastSentAt: '2026-01-18T11:22:00+01:00',
    retries: 3,
    user: null,
    userId: 7,
    companyId: 31,
    company: {
      id: 31,
      createdAt: '2026-01-18T10:00:00+01:00',
      companyName: 'Cliente Existente SL',
      nif: 'B12345678',
      alias: 'cliente001',
      founderUserId: 7,
      planType: 'GROWTH',
      mailBill: true,
      pendingPayment: false,
      dateIsPendingPayment: null,
      validatePaidTo: '2026-12-31T23:59:59+01:00',
      files: [],
    },
  },
];

const MOCK_TASKS: TaskDTO[] = [
  {
    taskId: 101,
    companyId: 31,
    projectId: 5,
    originType: 'MANUAL',
    title: 'Crear módulo de login',
    functionalSummary: 'Implementar pantalla de login con OAuth',
    assignedUserId: 7,
    state: 'DOING',
    createdBy: 7,
    currentIteration: 2,
    validationMode: 'MANUAL',
    relatedTaskId: null,
    automationActive: false,
    automationBranchName: null,
    createdAt: '2026-02-10T09:00:00+01:00',
    updatedAt: '2026-04-01T14:00:00+01:00',
  },
  {
    taskId: 102,
    companyId: 31,
    projectId: 5,
    originType: 'MANUAL',
    title: 'Dashboard de métricas',
    functionalSummary: 'Mostrar gráficas de rendimiento',
    assignedUserId: 14,
    state: 'TODO',
    createdBy: 7,
    currentIteration: 1,
    validationMode: 'AUTO',
    relatedTaskId: null,
    automationActive: true,
    automationBranchName: 'feature/dashboard',
    createdAt: '2026-03-05T10:30:00+01:00',
    updatedAt: '2026-03-05T10:30:00+01:00',
  },
  {
    taskId: 103,
    companyId: 31,
    projectId: 5,
    originType: 'AUTO',
    title: 'Tests de integración API',
    functionalSummary: 'Cobertura del 80% en endpoints REST',
    assignedUserId: 7,
    state: 'DONE',
    createdBy: 14,
    currentIteration: 3,
    validationMode: 'AUTO',
    relatedTaskId: 101,
    automationActive: true,
    automationBranchName: 'feature/tests',
    createdAt: '2026-01-20T08:00:00+01:00',
    updatedAt: '2026-04-15T16:00:00+01:00',
  },
];

const MOCK_ESTIMATES: TaskEstimateDTO[] = [
  {
    estimateId: 201,
    taskId: 101,
    baseMinutes: 120,
    finalMinutes: 150,
    estimatedPrice: 75.0,
    estimatedSavings: 12.5,
    approvalRequired: true,
    createdAt: '2026-02-10T09:05:00+01:00',
  },
  {
    estimateId: 202,
    taskId: 103,
    baseMinutes: 90,
    finalMinutes: 90,
    estimatedPrice: 45.0,
    estimatedSavings: 0,
    approvalRequired: false,
    createdAt: '2026-01-20T08:05:00+01:00',
  },
];

const MOCK_APPROVALS: TaskApprovalDTO[] = [
  {
    approvalId: 301,
    taskId: 103,
    estimateId: 202,
    approvedBy: 7,
    approvedAt: '2026-04-15T15:00:00+01:00',
    status: 'APPROVED',
    promoHoursApplied: 0,
  },
];

const MOCK_EVENTS: TimelineEventDTO[] = [
  {
    timelineEventId: 401,
    taskId: 101,
    projectId: 5,
    eventType: 'STATE_CHANGE',
    title: 'Tarea movida a DOING',
    summary: 'La tarea pasó de TODO a DOING',
    fromState: 'TODO',
    toState: 'DOING',
    actorUserId: 7,
    referenceType: 'TASK',
    referenceId: '101',
    createdAt: '2026-04-01T14:00:00+01:00',
  },
  {
    timelineEventId: 402,
    taskId: 103,
    projectId: 5,
    eventType: 'APPROVAL',
    title: 'Tarea aprobada',
    summary: 'La tarea fue aprobada y marcada como DONE',
    fromState: 'TEST',
    toState: 'DONE',
    actorUserId: 7,
    referenceType: 'TASK',
    referenceId: '103',
    createdAt: '2026-04-15T15:00:00+01:00',
  },
];

const MOCK_COMMENTS: CommentDTO[] = [
  {
    commentId: 501,
    taskId: 101,
    projectId: 5,
    authorUserId: 7,
    authorName: 'Daniel Morais',
    body: 'He terminado la parte de autenticación, falta el diseño.',
    createdAt: '2026-03-20T11:00:00+01:00',
  },
  {
    commentId: 502,
    taskId: 103,
    projectId: 5,
    authorUserId: 7,
    authorName: 'Daniel Morais',
    body: 'Tests pasando al 82%, superamos el objetivo.',
    createdAt: '2026-04-14T09:30:00+01:00',
  },
];

const MOCK_ROLE_ASSIGNMENTS: RoleAssignment[] = [
  {
    roleAssignmentId: 901,
    userId: 7,
    role: 'ADMIN',
    active: true,
    createdAt: '2026-01-18T10:25:00+01:00',
  },
];

@Component({
  selector: 'app-usuarios',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './usuarios.html',
  styleUrl: './usuarios.css',
})
export class Usuarios {
  constructor(private location: Location) {}

  companyUsers = [...MOCK_COMPANY_USERS];
  invitaciones = [...MOCK_INVITES];
  activeTab = 'usuarios';

  volver() {
    this.location.back();
  }

  cambiarTab(tab: string) {
    this.activeTab = tab;
  }

  // Tab Usuarios
  userSearch = '';
  userRoleFilter = 'Todos';

  usuariosFiltrados(): CompanyUser[] {
    let resultado: CompanyUser[] = [];
    for (let u of this.companyUsers) {
      let passSearch = true;
      let passRole = true;

      if (this.userSearch.trim() !== '') {
        const texto = (u.name + ' ' + u.surname + ' ' + u.email).toLowerCase();
        if (!texto.includes(this.userSearch.toLowerCase())) {
          passSearch = false;
        }
      }

      if (this.userRoleFilter !== 'Todos') {
        if (u.roleInCompany !== this.userRoleFilter) {
          passRole = false;
        }
      }

      if (passSearch && passRole) {
        resultado.push(u);
      }
    }
    return resultado;
  }

  alternarRolUsuario(role: string) {
    if (this.userRoleFilter === role) {
      this.userRoleFilter = 'Todos';
    } else {
      this.userRoleFilter = role;
    }
  }

  limpiarFiltrosUsuarios() {
    this.userSearch = '';
    this.userRoleFilter = 'Todos';
  }

  iniciales(name: string, surname: string): string {
    return name[0] + surname[0];
  }

  verUsuario(user: CompanyUser) {
    this.actividadUserId = user.userId;
    this.cambiarTab('actividad');
  }

  // Tab Invitaciones

  inviteSearch = '';
  inviteStatusFilter = 'Todas';
  inviteRoleFilter = 'Todos';

  invitacionesFiltradas(): InviteDTO[] {
    let resultado: InviteDTO[] = [];
    for (let inv of this.invitaciones) {
      let passSearch = true;
      let passStatus = true;
      let passRole = true;

      if (this.inviteSearch.trim() !== '') {
        if (!inv.email.toLowerCase().includes(this.inviteSearch.toLowerCase())) {
          passSearch = false;
        }
      }

      if (this.inviteStatusFilter !== 'Todas') {
        if (inv.status !== this.inviteStatusFilter) {
          passStatus = false;
        }
      }

      if (this.inviteRoleFilter !== 'Todos') {
        if (inv.role !== this.inviteRoleFilter) {
          passRole = false;
        }
      }

      if (passSearch && passStatus && passRole) {
        resultado.push(inv);
      }
    }
    return resultado;
  }

  alternarEstadoInvitacion(status: string) {
    if (this.inviteStatusFilter === status) {
      this.inviteStatusFilter = 'Todas';
    } else {
      this.inviteStatusFilter = status;
    }
  }

  alternarRolInvitacion(role: string) {
    if (this.inviteRoleFilter === role) {
      this.inviteRoleFilter = 'Todos';
    } else {
      this.inviteRoleFilter = role;
    }
  }

  limpiarFiltrosInvitaciones() {
    this.inviteSearch = '';
    this.inviteStatusFilter = 'Todas';
    this.inviteRoleFilter = 'Todos';
  }

  nombreEmpresa(company: CompanyDTO): string {
    return company.companyName + ' (' + company.alias + ')';
  }

  // Tab Actividad

  actividadUserId = MOCK_COMPANY_USERS[0].userId;

  tareasDelUsuario(): TaskDTO[] {
    let resultado: TaskDTO[] = [];
    for (let t of MOCK_TASKS) {
      if (t.assignedUserId === this.actividadUserId) {
        resultado.push(t);
      }
    }
    return resultado;
  }

  estimacionTarea(taskId: number): TaskEstimateDTO | null {
    for (let e of MOCK_ESTIMATES) {
      if (e.taskId === taskId) {
        return e;
      }
    }
    return null;
  }

  aprobacionesDelUsuario(): TaskApprovalDTO[] {
    let resultado: TaskApprovalDTO[] = [];
    for (let a of MOCK_APPROVALS) {
      if (a.approvedBy === this.actividadUserId) {
        resultado.push(a);
      }
    }
    return resultado;
  }

  eventosDelUsuario(): TimelineEventDTO[] {
    let resultado: TimelineEventDTO[] = [];
    for (let e of MOCK_EVENTS) {
      if (e.actorUserId === this.actividadUserId) {
        resultado.push(e);
      }
    }
    return resultado;
  }

  comentariosDelUsuario(): CommentDTO[] {
    let resultado: CommentDTO[] = [];
    for (let c of MOCK_COMMENTS) {
      if (c.authorUserId === this.actividadUserId) {
        resultado.push(c);
      }
    }
    return resultado;
  }

  etiquetaEstado(state: string): string {
    switch (state) {
      case 'BACKLOG':
        return 'Backlog';
      case 'TODO':
        return 'Por hacer';
      case 'DOING':
        return 'En progreso';
      case 'TEST':
        return 'En pruebas';
      case 'DONE':
        return 'Hecho';
      default:
        return state;
    }
  }

  etiquetaAprobacion(status: string): string {
    switch (status) {
      case 'APPROVED':
        return 'Aprobado';
      case 'REJECTED':
        return 'Rechazado';
      case 'PENDING':
        return 'Pendiente';
      default:
        return status;
    }
  }

  // Tab Roles

  selectedUserId = MOCK_COMPANY_USERS[0].userId;
  rolSelecAsignr = '';
  rolesAsignados: RoleAssignment[] = [...MOCK_ROLE_ASSIGNMENTS];

  usuarioSeleccionado(): CompanyUser | undefined {
    for (let u of MOCK_COMPANY_USERS) {
      if (u.userId === this.selectedUserId) {
        return u;
      }
    }
    return undefined;
  }

  asignarRol() {
    if (this.rolSelecAsignr === '') {
      return;
    }
    const nuevaAsignacion: RoleAssignment = {
      roleAssignmentId: Date.now(),
      userId: this.selectedUserId,
      role: this.rolSelecAsignr as 'ADMIN' | 'DEVELOPER',
      active: true,
      createdAt: new Date().toISOString(),
    };
    this.rolesAsignados.push(nuevaAsignacion);
    this.rolSelecAsignr = '';
  }

  // Toast
  toast = '';
  private toastTimer: ReturnType<typeof setTimeout> | null = null;

  mostrarToast(msg: string) {
    this.toast = msg;
    if (this.toastTimer) clearTimeout(this.toastTimer);
    this.toastTimer = setTimeout(() => (this.toast = ''), 3000);
  }

  // Acciones Tab Usuarios
  gestionarRoles(u: CompanyUser) {
    this.selectedUserId = u.userId;
    this.cambiarTab('roles');
  }

  quitarUsuario(u: CompanyUser) {
    this.mostrarToast(`Has intentado quitar a ${u.name} ${u.surname}`);
  }

  // Acciones Tab Invitaciones
  reenviarInvitacion(inv: InviteDTO) {
    this.invitaciones = this.invitaciones.map((i) =>
      i.id === inv.id
        ? { ...i, status: 'SENT' as const, lastSentAt: new Date().toISOString(), retries: i.retries + 1, errorDesc: null }
        : i
    );
  }

  eliminarInvitacion(inv: InviteDTO) {
    this.mostrarToast(`Has intentado eliminar la invitación de ${inv.email}`);
  }

  // Modal Invitar usuario
  modalInvitarAbierto = false;
  nuevoEmail = '';
  nuevoRol: 'ADMIN' | 'DEVELOPER' = 'DEVELOPER';
  errorEmail = '';

  abrirModalInvitar() {
    this.nuevoEmail = '';
    this.nuevoRol = 'DEVELOPER';
    this.errorEmail = '';
    this.modalInvitarAbierto = true;
  }

  cerrarModalInvitar() {
    this.modalInvitarAbierto = false;
  }

  enviarInvitacion() {
    if (!this.nuevoEmail.includes('@')) {
      this.errorEmail = 'Introduce un email válido.';
      return;
    }
    const nueva: InviteDTO = {
      id: Date.now(),
      email: this.nuevoEmail,
      role: this.nuevoRol,
      status: 'SENT',
      createdAt: new Date().toISOString(),
      lastSentAt: new Date().toISOString(),
      retries: 0,
      errorDesc: null,
      user: null,
      userId: 0,
      companyId: 31,
      company: this.invitaciones[0].company,
    };
    this.invitaciones = [...this.invitaciones, nueva];
    this.cerrarModalInvitar();
    this.cambiarTab('invitaciones');
  }
}
