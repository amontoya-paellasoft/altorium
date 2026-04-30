import { Component, signal, computed, inject } from '@angular/core';
import { CommonModule, Location } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { InviteDTO } from '../../models/altorium/invite-dto';

type Tab = 'usuarios' | 'invitaciones' | 'roles';
type RoleFilter = 'Todos' | 'ADMIN' | 'DEVELOPER';
type StatusFilter = 'Todas' | 'SENT' | 'ERROR' | 'DRAFT';

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
  role: 'ADMIN' | 'DEVELOPER';
  active: boolean;
  createdAt: string;
}

const MOCK_COMPANY_USERS: CompanyUser[] = [
  {
    userId: 7, name: 'Daniel', surname: 'Morais',
    email: 'daniel.morais@altorium.eu',
    userExtId: 'auth-user-123', authProjectId: 'altorium-main',
    companyIds: [31], createdAt: '2026-01-18T10:24:00+01:00',
    roleInCompany: 'ADMIN'
  },
  {
    userId: 14, name: 'Olivia', surname: 'Wilson',
    email: 'olivia.wilson@cliente.example',
    userExtId: 'auth-user-456', authProjectId: 'cliente-main',
    companyIds: [31], createdAt: '2026-01-18T10:40:00+01:00',
    roleInCompany: 'DEVELOPER'
  }
];

const MOCK_INVITES: InviteDTO[] = [
  {
    id: 701, createdAt: '2026-01-18T11:14:30+01:00',
    email: 'dev.pending@cliente.example', role: 'DEVELOPER', status: 'SENT',
    errorDesc: null, lastSentAt: '2026-01-18T11:15:00+01:00', retries: 1,
    user: null, userId: 7, companyId: 31,
    company: {
      id: 31, createdAt: '2026-01-18T10:00:00+01:00', companyName: 'Cliente Existente SL',
      nif: 'B12345678', alias: 'cliente001', founderUserId: 7, planType: 'GROWTH',
      mailBill: true, pendingPayment: false, dateIsPendingPayment: null,
      validatePaidTo: '2026-12-31T23:59:59+01:00', files: []
    }
  },
  {
    id: 702, createdAt: '2026-01-18T11:21:45+01:00',
    email: 'admin.error@cliente.example', role: 'ADMIN', status: 'ERROR',
    errorDesc: 'OAuth provider rejected invite', lastSentAt: '2026-01-18T11:22:00+01:00', retries: 3,
    user: null, userId: 7, companyId: 31,
    company: {
      id: 31, createdAt: '2026-01-18T10:00:00+01:00', companyName: 'Cliente Existente SL',
      nif: 'B12345678', alias: 'cliente001', founderUserId: 7, planType: 'GROWTH',
      mailBill: true, pendingPayment: false, dateIsPendingPayment: null,
      validatePaidTo: '2026-12-31T23:59:59+01:00', files: []
    }
  }
];

const MOCK_ROLE_ASSIGNMENTS: RoleAssignment[] = [
  { roleAssignmentId: 901, role: 'ADMIN', active: true, createdAt: '2026-01-18T10:25:00+01:00' }
];

@Component({
  selector: 'app-usuarios',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './usuarios.html',
  styleUrl: './usuarios.css'
})
export class Usuarios {
  private location = inject(Location);

  readonly companyUsers = MOCK_COMPANY_USERS;

  activeTab = signal<Tab>('usuarios');
  setTab(tab: Tab) { this.activeTab.set(tab); }
  goBack() { this.location.back(); }

  // --- Tab Usuarios ---
  userSearch = signal('');
  userRoleFilter = signal<RoleFilter>('Todos');

  filteredUsers = computed(() => {
    const search = this.userSearch().toLowerCase();
    const role = this.userRoleFilter();
    return MOCK_COMPANY_USERS.filter(u => {
      const matchesSearch = !search ||
        `${u.name} ${u.surname}`.toLowerCase().includes(search) ||
        u.email.toLowerCase().includes(search);
      const matchesRole = role === 'Todos' || u.roleInCompany === role;
      return matchesSearch && matchesRole;
    });
  });

  toggleUserRole(role: 'ADMIN' | 'DEVELOPER') {
    this.userRoleFilter.set(this.userRoleFilter() === role ? 'Todos' : role);
  }
  clearUserFilters() {
    this.userSearch.set('');
    this.userRoleFilter.set('Todos');
  }

  // --- Tab Invitaciones ---
  inviteSearch = signal('');
  inviteStatusFilter = signal<StatusFilter>('Todas');
  inviteRoleFilter = signal<RoleFilter>('Todos');

  filteredInvites = computed(() => {
    const search = this.inviteSearch().toLowerCase();
    const status = this.inviteStatusFilter();
    const role = this.inviteRoleFilter();
    return MOCK_INVITES.filter(inv => {
      const matchesSearch = !search || inv.email.toLowerCase().includes(search);
      const matchesStatus = status === 'Todas' || inv.status === status;
      const matchesRole = role === 'Todos' || inv.role === role;
      return matchesSearch && matchesStatus && matchesRole;
    });
  });

  toggleInviteStatus(s: 'SENT' | 'ERROR' | 'DRAFT') {
    this.inviteStatusFilter.set(this.inviteStatusFilter() === s ? 'Todas' : s);
  }
  toggleInviteRole(role: 'ADMIN' | 'DEVELOPER') {
    this.inviteRoleFilter.set(this.inviteRoleFilter() === role ? 'Todos' : role);
  }
  clearInviteFilters() {
    this.inviteSearch.set('');
    this.inviteStatusFilter.set('Todas');
    this.inviteRoleFilter.set('Todos');
  }

  // --- Tab Roles ---
  selectedUserId = signal(MOCK_COMPANY_USERS[0].userId);
  selectedUser = computed(() =>
    MOCK_COMPANY_USERS.find(u => u.userId === this.selectedUserId()) ?? MOCK_COMPANY_USERS[0]
  );
  selectedRoleToAssign = signal('');
  roleAssignments = signal<RoleAssignment[]>(MOCK_ROLE_ASSIGNMENTS);

  getInitials(user: CompanyUser): string {
    return `${user.name[0]}${user.surname[0]}`;
  }

  assignRole() {
    const role = this.selectedRoleToAssign();
    if (!role) return;
    const newAssignment: RoleAssignment = {
      roleAssignmentId: Date.now(),
      role: role as 'ADMIN' | 'DEVELOPER',
      active: true,
      createdAt: new Date().toISOString()
    };
    this.roleAssignments.update(list => [...list, newAssignment]);
    this.selectedRoleToAssign.set('');
  }
}
