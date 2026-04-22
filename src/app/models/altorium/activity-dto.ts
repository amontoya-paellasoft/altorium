import { BuildRunDTO } from "./build-dto"

export interface TaskActivityDTO {
  events: TimelineEventDTO[]
  comments: CommentDTO[]
  diagnostics: DiagnosticDTO[]
  builds: BuildRunDTO[]
  items: ActivityItemDTO[]
}

export interface TimelineEventDTO {
  timelineEventId: number
  taskId: number
  projectId: number
  eventType: string
  title: string
  summary: string
  fromState?: string | null
  toState: string
  actorUserId: number
  referenceType: string
  referenceId: string
  createdAt: string
}

export interface CommentDTO {
  commentId: number
  taskId: number
  projectId: number
  authorUserId: number
  authorName: string
  body: string
  createdAt: string
}

export interface DiagnosticDTO {
  diagnosticId: number
  taskId: number
  projectId: number
  eventType: string
  recordMode: string
  errorCode: string
  errorMessage: string
  contextSummary: string
  createdAt: string
}

export interface ActivityItemDTO {
  itemType: string
  itemId: number
  taskId: number
  projectId: number
  title: string
  summary: string
  referenceType: string
  referenceId: string
  createdAt: string
}
