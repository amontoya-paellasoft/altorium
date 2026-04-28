import { TaskActivityDTO } from './activity-dto'
import { TaskApprovalDTO } from './approval-dto'
import { BuildRunDTO, BuildRunLogDTO } from './build-dto'
import { TaskEstimateDTO } from './estimate-dto'
import { TaskDTO, ResolvedUsersDTO } from './task-dto'

export interface TaskDetailDTO {
  task: TaskDTO
  resolvedUsers: ResolvedUsersDTO
  currentEstimate: TaskEstimateDTO
  currentApproval: TaskApprovalDTO
  activity: TaskActivityDTO
  latestBuild: BuildRunDTO
  latestBuildLog: BuildRunLogDTO
}
