export interface BuildRunDTO {
  buildRunId: number
  taskId: number
  status: string
  startedAt: string
  finishedAt: string | null
  mavenGoal: string
  artifactObjectId: string
  exitCode: number | null
  timedOut: boolean
  createdAt: string
}

export interface BuildRunLogDTO {
  buildRunId: number
  taskId: number
  exitCode: number | null
  timedOut: boolean
  stdoutExcerpt: string
  stderrExcerpt: string
}
