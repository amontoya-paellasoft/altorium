import { Component, inject } from '@angular/core';
import { CommonModule, Location } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { InviteDTO, CompanyDTO } from '../../models/altorium/invite-dto';
import { TaskDTO } from '../../models/altorium/task-dto';
import { TaskEstimateDTO } from '../../models/altorium/estimate-dto';
import { TaskApprovalDTO } from '../../models/altorium/approval-dto';
import { TimelineEventDTO, CommentDTO } from '../../models/altorium/activity-dto';
import { CompanyUser, RoleAssignment } from '../../models/altorium/company-user-dto';
import {
  MOCK_COMPANY_USERS,
  MOCK_INVITES,
  MOCK_ESTIMATES,
  MOCK_APPROVALS,
  MOCK_EVENTS,
  MOCK_COMMENTS,
  MOCK_ROLE_ASSIGNMENTS,
} from '../../mock/mock-data';
import { MOCK_TASK_DATA } from '../../mock/task-data';

@Component({
  selector: 'app-usuarios',
  standalone: true,
  imports: [CommonModule, FormsModule, TranslateModule],
  templateUrl: './usuarios.html',
  styleUrl: './usuarios.css',
})
export class Usuarios {
  private location = inject(Location);
  private translate = inject(TranslateService);

  constructor() {}

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
    return (MOCK_TASK_DATA as TaskDTO[]).filter(t => t.assignedUserId === this.actividadUserId);
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
    return MOCK_APPROVALS.filter(a => a.approvedBy === this.actividadUserId);
  }

  eventosDelUsuario(): TimelineEventDTO[] {
    return MOCK_EVENTS.filter(e => e.actorUserId === this.actividadUserId);
  }

  comentariosDelUsuario(): CommentDTO[] {
    return MOCK_COMMENTS.filter(c => c.authorUserId === this.actividadUserId);
  }

  estadoKey(state: string): string {
    const keys: Record<string, string> = {
      BACKLOG: 'USERS.VALUES.STATE_BACKLOG',
      TODO:    'USERS.VALUES.STATE_TODO',
      DOING:   'USERS.VALUES.STATE_DOING',
      TEST:    'USERS.VALUES.STATE_TEST',
      DONE:    'USERS.VALUES.STATE_DONE',
    };
    return keys[state] ?? state;
  }

  aprobacionKey(status: string): string {
    const keys: Record<string, string> = {
      APPROVED: 'USERS.VALUES.APPROVAL_APPROVED',
      REJECTED: 'USERS.VALUES.APPROVAL_REJECTED',
      PENDING:  'USERS.VALUES.APPROVAL_PENDING',
    };
    return keys[status] ?? status;
  }

  // Tab Roles

  selectedUserId = MOCK_COMPANY_USERS[0].userId;
  rolSelecAsignr = '';
  rolesAsignados: RoleAssignment[] = [...MOCK_ROLE_ASSIGNMENTS];

  usuarioSeleccionado(): CompanyUser | undefined {
    return MOCK_COMPANY_USERS.find(u => u.userId === this.selectedUserId);
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
    this.mostrarToast(this.translate.instant('USERS.TOAST.QUITAR', { nombre: `${u.name} ${u.surname}` }));
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
    this.mostrarToast(this.translate.instant('USERS.TOAST.ELIMINAR', { email: inv.email }));
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
      this.errorEmail = this.translate.instant('USERS.MODAL.EMAIL_ERROR');
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
      companyId: 81,
      company: this.invitaciones[0].company,
    };
    this.invitaciones = [...this.invitaciones, nueva];
    this.cerrarModalInvitar();
    this.cambiarTab('invitaciones');
  }
}
