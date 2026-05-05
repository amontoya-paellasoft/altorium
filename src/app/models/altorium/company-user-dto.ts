export interface CompanyUser {
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

export interface RoleAssignment {
  roleAssignmentId: number;
  userId: number;
  role: 'ADMIN' | 'DEVELOPER';
  active: boolean;
  createdAt: string;
}
