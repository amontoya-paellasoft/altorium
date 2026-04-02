import { MessageInterface } from "./message-interface"

export interface ConversationInterface {
id: string
participants: string[]
messages: MessageInterface[]
type: 'public' | 'private'
label?: string
}
