export interface MessageInterface {
  id: number
  from: string
  to: string
  visibility: 'public' | 'private'
  text: string
  code?: string
  timeStamp: Date
}
