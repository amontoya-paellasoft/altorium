// DEUDA TÉCNICA: el backend no expone priority en TaskDTO ni en TaskEstimateDTO.
// Tampoco hay un campo estado normalizado (hay state: string con valores BACKLOG/TODO/DOING…).
export interface TaskDTO {
  taskId: number
  companyId: number
  projectId: number
  originType: string
  title: string
  functionalSummary: string
  assignedUserId: number
  state: string
  createdBy: number
  currentIteration: number
  validationMode: string
  relatedTaskId: number | null
  automationActive: boolean
  automationBranchName: string | null
  createdAt: string
  updatedAt: string
}

export interface UserDTO {
  userId: number
  fullName: string
  email: string
}

export interface ResolvedUsersDTO {
  assignedUser: UserDTO
  createdByUser: UserDTO
  approvedByUser: UserDTO
}
