import { AgentInterface } from '../models/agent-interface';
import { MessageInterface } from '../models/message-interface';

export const MOCK_AGENTS: AgentInterface[] = [
  {
    id: 'pm',
    name: 'Product Manager',
    role: 'Coordinación',
    emoji: '🏛️',
    status: 'ocupado',
    bg: 'white',
  },
  { id: 'di', name: 'Diseñador', role: 'Diseño', emoji: '✨', status: 'en línea', bg: 'pink' },
  { id: 'fe', name: 'FrontEnd Dev', role: 'UI/UI', emoji: '🔍', status: 'ausente', bg: 'black' },
  { id: 'be', name: 'BackEnd Dev', role: 'Node/API', emoji: '🧪', status: 'ocupado', bg: 'orange' },
  { id: 'qa', name: 'QA', role: 'Test', emoji: '🦄', status: 'en línea', bg: 'blue' },
];

export const MOCK_MESSAGES: MessageInterface[] = [
  {
    id: 1,
    agentId: 'pm',
    text: 'Equipo, necesitamos cerrar el flujo principal hoy. Sin excepciones.',
    isUser: false,
    timeStamp: new Date(),
  },
  {
    id: 2,
    agentId: 'fe',
    text: 'Voy con ello :D Hay un par de detalles raros en la interfaz, lo estoy mirando.',
    isUser: false,
    timeStamp: new Date(),
  },
  {
    id: 3,
    agentId: 'be',
    text: 'La API está estable en condiciones normales, pero faltan validaciones en casos límite.',
    isUser: false,
    timeStamp: new Date(),
  },
  {
    id: 4,
    agentId: 'pm',
    text: 'Prioridad: funcionalidad. Lo visual puede esperar.',
    isUser: false,
    timeStamp: new Date(),
  },
  {
    id: 5,
    agentId: 'qa',
    text: 'Detecto un fallo al enviar datos tras volver atrás en el flujo.',
    isUser: false,
    timeStamp: new Date(),
  },
  {
    id: 6,
    agentId: 'be',
    text: 'Necesito confirmar si el estado se persiste incorrectamente o si es un problema de sesión.',
    isUser: false,
    timeStamp: new Date(),
  },
  {
    id: 7,
    agentId: 'qa',
    text: 'Se reproduce cuando el usuario reintenta después de retroceder.',
    isUser: false,
    timeStamp: new Date(),
  },
  {
    id: 8,
    agentId: 'fe',
    text: 'Ah, vale, eso suena a estado mal reseteado :O Lo reviso ahora.',
    isUser: false,
    timeStamp: new Date(),
  },
  {
    id: 9,
    agentId: 'pm',
    text: 'Centraos en ese bug. No avancéis con nada más hasta resolverlo.',
    isUser: false,
    timeStamp: new Date(),
  },
  {
    id: 10,
    agentId: 'be',
    text: 'He añadido validación en backend para evitar datos inconsistentes en reenvíos.',
    isUser: false,
    timeStamp: new Date(),
  },
  {
    id: 11,
    agentId: 'qa',
    text: 'Reinicio pruebas con ese escenario.',
    isUser: false,
    timeStamp: new Date(),
  },
  {
    id: 12,
    agentId: 'fe',
    text: 'También he simplificado el flujo para evitar estados intermedios raros.',
    isUser: false,
    timeStamp: new Date(),
  },
  {
    id: 13,
    agentId: 'qa',
    text: 'Confirmado, el error ya no se reproduce.',
    isUser: false,
    timeStamp: new Date(),
  },
  {
    id: 14,
    agentId: 'pm',
    text: 'Bien. Dejamos esto estable y pasamos al siguiente punto.',
    isUser: false,
    timeStamp: new Date(),
  },
  {
    id: 15,
    agentId: 'fe',
    text: 'Genial, sigo con los últimos retoques :)',
    isUser: false,
    timeStamp: new Date(),
  },
];

export const MOCK_LINKS = [
  { source: 'pm', target: 'di', label: 'define' },
  { source: 'pm', target: 'fe', label: 'asigna' },
  { source: 'di', target: 'fe', label: 'guía' },
  { source: 'di', target: 'be', label: 'guía' },
  { source: 'fe', target: 'qa', label: 'entrega' },
  { source: 'be', target: 'qa', label: 'entrega' },
];
