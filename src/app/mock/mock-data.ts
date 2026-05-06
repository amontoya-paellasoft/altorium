import { AgentMockInterface } from '../models/agent-interface';
import { MessageInterface } from '../models/message-interface';
import { ConversationInterface } from '../models/conversation-interface';
import { UserDTO } from '../models/altorium/task-dto';
import { TareaInterface } from '../models/tarea-interface';
import { InviteDTO, CompanyDTO } from '../models/altorium/invite-dto';
import { TaskEstimateDTO } from '../models/altorium/estimate-dto';
import { TaskApprovalDTO } from '../models/altorium/approval-dto';
import { TimelineEventDTO, CommentDTO } from '../models/altorium/activity-dto';
import { CompanyUser, RoleAssignment } from '../models/altorium/company-user-dto';
import { MOCK_TASK_DETAIL } from './mock-task-detail';

// Usuarios

export const MOCK_USERS: UserDTO[] = [
  { userId: 1, fullName: 'Sofía Méndez Castro', email: 'sofia.mendez@altorium.io' },
  { userId: 2, fullName: 'Carlos Ruiz', email: 'carlos.ruiz@altorium.io' },
  { userId: 3, fullName: 'Alejandro Ríos Paredes', email: 'alejandro.rios@altorium.io' },
  { userId: 4, fullName: 'Lucía Fernández', email: 'lucia.fernandez@altorium.io' },
  { userId: 5, fullName: 'Isabel Guajardo Solís', email: 'isabel.guajardo@altorium.io' },
  { userId: 6, fullName: 'Usuario Test', email: 'usuario.test@altorium.io' },
];

// Agentes

export const MOCK_AGENTS: AgentMockInterface[] = [
  { id: 'pm', userId: 1, role: 'Coordinación', emoji: '🏛️', status: 'ocupado', bg: 'white' },
  { id: 'di', userId: 2, role: 'Diseño', emoji: '✨', status: 'en línea', bg: 'pink' },
  { id: 'fe', userId: 3, role: 'UI/UX', emoji: '🔍', status: 'ausente', bg: 'black' },
  { id: 'be', userId: 4, role: 'Node/API', emoji: '🧪', status: 'ocupado', bg: 'orange' },
  { id: 'qa', userId: 5, role: 'Test', emoji: '🦄', status: 'en línea', bg: 'blue' },
  // NO TIENE TAREAS ASIGNADAS
  { id: 'us', userId: 6, role: 'Acceso', emoji: '👤', status: 'en línea', bg: 'darkpink' },
];

// tareas asignadas de cada agente (taskId)
export const AGENT_TASK_MAP: Record<string, number[]> = {
  pm: [1042, 1051],
  di: [1049, 1048],
  fe: [1046, 1047],
  be: [1052, 1050],
  qa: [1045, 1043],
  us: [],
};

//  Mensajes y conversaciones
export const MOCK_MESSAGES: MessageInterface[] = [
  {
    id: 1,
    from: 'pm',
    to: 'all',
    visibility: 'public',
    text: 'El flujo principal cierra hoy. No hay margen.',
    timeStamp: new Date('2026-04-16T09:00:00'),
  },
  {
    id: 2,
    from: 'fe',
    to: 'all',
    visibility: 'public',
    text: 'Recibido. Hay algo raro en la transicion del paso tres, lo estoy viendo.',
    timeStamp: new Date('2026-04-16T09:05:00'),
  },
  {
    id: 3,
    from: 'be',
    to: 'all',
    visibility: 'public',
    text: 'API estable. Faltan validaciones en edge cases pero no bloquea.',
    timeStamp: new Date('2026-04-17T11:00:00'),
  },
  {
    id: 4,
    from: 'qa',
    to: 'all',
    visibility: 'public',
    text: 'Reproduzco un fallo al retroceder en el flujo y reenviar. Prioridad alta.',
    timeStamp: new Date('2026-04-18T14:30:00'),
  },
  {
    id: 5,
    from: 'pm',
    to: 'all',
    visibility: 'public',
    text: 'Ese bug bloquea entrega. Todo el equipo foco en eso hasta cerrarlo.',
    timeStamp: new Date('2026-04-19T10:00:00'),
  },
  {
    id: 6,
    from: 'be',
    to: 'all',
    visibility: 'public',
    text: 'Validacion añadida en backend. Reenvios con estado inconsistente quedan rechazados.',
    timeStamp: new Date('2026-03-05T10:00:00'),
  },
  {
    id: 7,
    from: 'fe',
    to: 'all',
    visibility: 'public',
    text: 'He simplificado el estado en el paso tres. Estados intermedios eliminados.',
    timeStamp: new Date('2026-03-08T15:20:00'),
  },
  {
    id: 8,
    from: 'qa',
    to: 'all',
    visibility: 'public',
    text: 'Verificado. El escenario ya no se reproduce en ninguna variante.',
    timeStamp: new Date('2026-02-25T09:00:00'),
  },
  {
    id: 9,
    from: 'pm',
    to: 'all',
    visibility: 'public',
    text: 'Cerrado. Siguiente punto.',
    timeStamp: new Date('2026-02-28T16:00:00'),
  },
  {
    id: 10,
    from: 'pm',
    to: 'di',
    visibility: 'private',
    text: 'Necesito que el flujo del paso dos sea mas obvio. Usuarios reportan confusion.',
    timeStamp: new Date('2026-03-12T11:30:00'),
  },
  {
    id: 11,
    from: 'di',
    to: 'pm',
    visibility: 'private',
    text: 'El problema es estructural, no visual. Estamos pidiendo demasiado en un solo paso. Propongo dividirlo.',
    timeStamp: new Date('2026-01-10T10:00:00'),
  },
  {
    id: 12,
    from: 'pm',
    to: 'di',
    visibility: 'private',
    text: 'Si no implica retraso, adelante. Pero necesito verlo antes de que llegue a FE.',
    timeStamp: new Date('2025-12-15T14:00:00'),
  },
  {
    id: 13,
    from: 'di',
    to: 'pm',
    visibility: 'private',
    text: 'Te mando el flujo revisado en quince minutos. Incluye los casos de error que antes ignorabamos.',
    timeStamp: new Date('2025-12-20T09:30:00'),
  },
  {
    id: 14,
    from: 'be',
    to: 'fe',
    visibility: 'private',
    text: 'El endpoint de reenvio ahora devuelve 409 si el estado no es el esperado. Maneja ese caso.',
    timeStamp: new Date('2026-01-05T11:00:00'),
    code: 'POST /api/submit\n  409 Conflict\n  { "error": "invalid_state", "expected": "pending" }',
  },
  {
    id: 15,
    from: 'fe',
    to: 'be',
    visibility: 'private',
    text: 'Ok :)) lo capturo y muestro pantalla de error con opcion de reiniciar. Cuando lo despliegues avisa!! ^.^',
    timeStamp: new Date('2025-11-20T16:00:00'),
  },
  {
    id: 16,
    from: 'be',
    to: 'fe',
    visibility: 'private',
    text: 'Desplegado en staging. Hash del commit: a3f9d1c.',
    timeStamp: new Date('2025-12-01T10:00:00'),
    code: 'git commit a3f9d1c\n"fix: reject inconsistent resubmit state"',
  },
  {
    id: 17,
    from: 'fe',
    to: 'be',
    visibility: 'private',
    text: '... Buuu aburridoooooo! uwu',
    timeStamp: new Date('2025-11-15T14:00:00'),
  },
  {
    id: 18,
    from: 'qa',
    to: 'be',
    visibility: 'private',
    text: 'El 409 llega bien pero el mensaje de error no es consistente con el resto de la API. Revisar.',
    timeStamp: new Date('2025-12-10T09:00:00'),
  },
  {
    id: 19,
    from: 'be',
    to: 'qa',
    visibility: 'private',
    text: 'Correcto. Normalizo la estructura de error en todos los endpoints. Dame diez minutos.',
    timeStamp: new Date('2026-01-15T11:00:00'),
  },
  {
    id: 20,
    from: 'qa',
    to: 'be',
    visibility: 'private',
    text: 'Confirmado tras el fix. Estructura consistente. Cierro el ticket.',
    timeStamp: new Date('2025-11-25T16:00:00'),
  },
];

export const MOCK_CONVERSATIONS: ConversationInterface[] = [
  {
    id: 'general',
    type: 'public',
    participants: ['pm', 'di', 'fe', 'be', 'qa'],
    label: 'Canal general',
    messages: MOCK_MESSAGES.filter((m) => m.visibility === 'public'),
  },
  {
    id: 'pm-di',
    type: 'private',
    participants: ['pm', 'di'],
    label: 'PM — Diseñador',
    messages: MOCK_MESSAGES.filter(
      (m) =>
        m.visibility === 'private' && ['pm', 'di'].includes(m.from) && ['pm', 'di'].includes(m.to),
    ),
  },
  {
    id: 'be-fe',
    type: 'private',
    participants: ['be', 'fe'],
    label: 'Backend — Frontend',
    messages: MOCK_MESSAGES.filter(
      (m) =>
        m.visibility === 'private' && ['be', 'fe'].includes(m.from) && ['be', 'fe'].includes(m.to),
    ),
  },
  {
    id: 'qa-be',
    type: 'private',
    participants: ['qa', 'be'],
    label: 'QA — Backend',
    messages: MOCK_MESSAGES.filter(
      (m) =>
        m.visibility === 'private' && ['qa', 'be'].includes(m.from) && ['qa', 'be'].includes(m.to),
    ),
  },
];

export const MOCK_LINKS = [
  { source: 'pm', target: 'di', label: 'define' },
  { source: 'pm', target: 'fe', label: 'asigna' },
  { source: 'di', target: 'fe', label: 'guia' },
  { source: 'di', target: 'be', label: 'guia' },
  { source: 'fe', target: 'qa', label: 'entrega' },
  { source: 'be', target: 'qa', label: 'entrega' },
  { source: 'be', target: 'fe', label: 'api' },
];

export const MOCK_USER_REACCIONES: Record<
  string,
  { agente1: string[]; agente2: string[]; insistencia: string[] }
> = {
  'pm-di': {
    agente1: ['Espera... ¿quién es este en el canal? Mònica, has invitado a alguien al chat??'],
    agente2: ['Yoo?? Nooo!!! Quién eres? Quién te ha metido en este chat?!'],
    insistencia: ['Sigues ahí? Mònica llama a Borja.', 'Oye en serio, esto es privado. Fuera.'],
  },
  'be-fe': {
    agente1: ['Disculpa, Mónica, pero, ¿quién acaba de entrar en el chat?'],
    agente2: ['Ostia, ni idea, pregúntale a Borja. Holiiii quién eres?? :3'],
    insistencia: ['... Oye, que no es de la empresa.', 'FUERA DE AQUÍ'],
  },
  'qa-be': {
    agente1: ['Borja, oye, que se ha metido alguien en el chat!'],
    agente2: ['Tranqui Sergio, ahora le quito permisos...'],
    insistencia: ['BORJA AYUDA', 'BORJAAAAAAAAAA'],
  },
};

export const MOCK_REACCIONES_PUBLICAS: Record<string, string[]> = {
  pm: [
    'Disculpa Borja, puedes sacar al infiltrado de nuestro chat?',
    'Esto es un canal interno... Cómo has conseguido acceso?',
    'Voy a escalar este error, dadme un segundo que llame a Borja',
  ],
  fe: [
    'Holiiii :D Seguro que eres Laura, de marketing!! Hola Laura! :D',
    'Ay, eres la nueva de Administración? Qué guay!! :D',
    'Bienvenide!! Aquí somos muy buena gente, no te asustes jeje',
  ],
  be: [
    'Ahora mismo echo a esta persona, José.',
    'Revisando permisos del canal, buscando usuario infiltrado...',
    'Los logs dicen que el acceso viene de dentro de la red. Qué raro...',
  ],
  qa: [
    'Definitivamente no me esperaba que entrase una persona al chat cuando probé tu código, Borja.',
    'Caso de prueba no contemplado: usuario externo en canal privado. Aviso a seguridad.',
    'Reportad el bug: Cualquiera puede entrar. Prioridad crítica.',
  ],
  di: [
    '... Hola, quién...? Bueno, yo sigo con lo del viernes.',
    'Eh, acaba de... En fin, mientras resolvéis esto, el flujo del paso dos sigue roto.',
    'Oye, a mí no me miréis, yo solo diseño cosas, no me encargo de quién entra en el chat.',
  ],
};

//  Tareas

function mapEstado(state: string): TareaInterface['estado'] {
  const map: Record<string, TareaInterface['estado']> = {
    BACKLOG: 'pendiente',
    TODO: 'pendiente',
    DOING: 'en_progreso',
    TEST: 'en_progreso',
    DONE: 'acabada',
  };
  return map[state] ?? 'pendiente';
}

export const MOCK_TAREAS: TareaInterface[] = [
  {
    id: `TK-${MOCK_TASK_DETAIL.task.taskId}`,
    titulo: MOCK_TASK_DETAIL.task.title,
    descripcion: MOCK_TASK_DETAIL.task.functionalSummary,
    asignadaA: 'pm',
    estado: mapEstado(MOCK_TASK_DETAIL.task.state),
    // TODO deuda técnica: el backend no expone priority, valor provisional
    prioridad: 'alta',
    creadaEn: new Date(MOCK_TASK_DETAIL.task.createdAt),
  },
];

//  Usuarios de empresa y roles

export const MOCK_COMPANY_USERS: CompanyUser[] = [
  {
    userId: 1,
    name: 'Laura',
    surname: 'Gómez',
    email: 'laura.gomez@altorium.io',
    userExtId: 'auth-user-001',
    authProjectId: 'altorium-main',
    companyIds: [81],
    createdAt: '2026-01-18T10:24:00+01:00',
    roleInCompany: 'ADMIN',
  },
  {
    userId: 3,
    name: 'Mónica',
    surname: 'Pérez',
    email: 'monica.perez@altorium.io',
    userExtId: 'auth-user-003',
    authProjectId: 'altorium-main',
    companyIds: [81],
    createdAt: '2026-01-18T10:40:00+01:00',
    roleInCompany: 'DEVELOPER',
  },
];

const ALTORIUM_COMPANY: CompanyDTO = {
  id: 81,
  createdAt: '2026-01-01T00:00:00Z',
  companyName: 'Altorium Solutions SL',
  nif: 'B98765432',
  alias: 'altorium',
  founderUserId: 1,
  planType: 'GROWTH',
  mailBill: true,
  pendingPayment: false,
  dateIsPendingPayment: null,
  validatePaidTo: '2026-12-31T23:59:59Z',
  files: [],
};

export const MOCK_INVITES: InviteDTO[] = [
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
    userId: 1,
    companyId: 81,
    company: ALTORIUM_COMPANY,
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
    userId: 1,
    companyId: 81,
    company: ALTORIUM_COMPANY,
  },
];

// Estimates, approvals, eventos y comentarios de Actividad.
// taskIds del tablero (MOCK_TASK_DATA)
export const MOCK_ESTIMATES: TaskEstimateDTO[] = [
  {
    estimateId: 201,
    taskId: 1042,
    baseMinutes: 120,
    finalMinutes: 150,
    estimatedPrice: 75.0,
    estimatedSavings: 12.5,
    approvalRequired: true,
    createdAt: '2026-01-18T09:05:00Z',
  },
  {
    estimateId: 202,
    taskId: 1046,
    baseMinutes: 90,
    finalMinutes: 90,
    estimatedPrice: 45.0,
    estimatedSavings: 0,
    approvalRequired: false,
    createdAt: '2026-01-18T08:55:00Z',
  },
];

export const MOCK_APPROVALS: TaskApprovalDTO[] = [
  {
    approvalId: 301,
    taskId: 1042,
    estimateId: 201,
    approvedBy: 1,
    approvedAt: '2026-01-18T09:30:00Z',
    status: 'APPROVED',
    promoHoursApplied: 0,
  },
];

export const MOCK_EVENTS: TimelineEventDTO[] = [
  {
    timelineEventId: 401,
    taskId: 1042,
    projectId: 220,
    eventType: 'STATE_CHANGE',
    title: 'Tarea movida a DOING',
    summary: 'La tarea pasó de TODO a DOING',
    fromState: 'TODO',
    toState: 'DOING',
    actorUserId: 1,
    referenceType: 'TASK',
    referenceId: '1042',
    createdAt: '2026-01-18T09:10:00Z',
  },
  {
    timelineEventId: 402,
    taskId: 1046,
    projectId: 220,
    eventType: 'APPROVAL',
    title: 'Tarea aprobada',
    summary: 'La tarea fue aprobada',
    fromState: 'TODO',
    toState: 'TODO',
    actorUserId: 3,
    referenceType: 'TASK',
    referenceId: '1046',
    createdAt: '2026-01-18T09:00:00Z',
  },
];

export const MOCK_COMMENTS: CommentDTO[] = [
  {
    commentId: 501,
    taskId: 1042,
    projectId: 220,
    authorUserId: 1,
    authorName: 'Laura Gómez',
    body: 'Ajusto sincronización del timeline antes de emitir actualización al tablero.',
    createdAt: '2026-01-18T09:12:00Z',
  },
  {
    commentId: 502,
    taskId: 1046,
    projectId: 220,
    authorUserId: 3,
    authorName: 'Mónica Pérez',
    body: 'Revisar que el campo originType se persiste correctamente en creación manual.',
    createdAt: '2026-01-18T09:00:00Z',
  },
];

export const MOCK_ROLE_ASSIGNMENTS: RoleAssignment[] = [
  {
    roleAssignmentId: 901,
    userId: 1,
    role: 'ADMIN',
    active: true,
    createdAt: '2026-01-18T10:25:00+01:00',
  },
];
