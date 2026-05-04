export interface InviteUserNestedDTO {
  id: number;
  name: string;
  surname: string;
  email: string;
  userExtId: string;
  authProjectId: string;
  companyIds: number[] | null;
  createdAt: string;
}

export interface CompanyDTO {
  id: number;
  createdAt: string;
  companyName: string;
  nif: string;
  alias: string;
  founderUserId: number;
  planType: string;
  mailBill: boolean;
  pendingPayment: boolean;
  dateIsPendingPayment: string | null;
  validatePaidTo: string;
  files: unknown[];
}

// Respuesta de GET /invite/search
export interface InviteDTO {
  id: number;
  createdAt: string;
  email: string;
  role: 'ADMIN' | 'DEVELOPER';
  status: 'SENT' | 'ERROR' | 'DRAFT';
  errorDesc: string | null;
  lastSentAt: string;
  retries: number;
  user: InviteUserNestedDTO | null;
  company: CompanyDTO;
  userId: number;
  companyId: number;
}

// Respuesta de GET /invite/:companyId  (OAuth)
export interface OAuthInviteDTO {
  id: number;
  alias: string;
  email: string;
  role: string;
  status: string;
  createdOn: string;
}
