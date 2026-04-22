export interface TaskEstimateDTO {
  estimateId: number
  taskId: number
  baseMinutes: number
  finalMinutes: number
  estimatedPrice: number
  estimatedSavings: number
  approvalRequired: boolean
  createdAt: string
}
