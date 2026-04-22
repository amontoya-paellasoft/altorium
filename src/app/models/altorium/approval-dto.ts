export interface TaskApprovalDTO {
  approvalId: number
  taskId: number
  estimateId: number
  approvedBy: number
  approvedAt: string
  status: string
  promoHoursApplied: number
}
