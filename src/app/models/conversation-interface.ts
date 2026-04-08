import { MessageInterface } from "./message-interface"

export interface ConversationInterface {
id: string
participants: string[]
messages: MessageInterface[]
type: 'public' | 'private'
label?: string
}

export interface NodePosition {
  id: string;
  label: string;
  x: number;
  y: number;
  data: { role: string; emoji: string; status: string };
  w?: number;
  h?: number;
}
