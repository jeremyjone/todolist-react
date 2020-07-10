import { ILabelItem } from "./LabelModel";

export interface ITaskItem {
  id: number
  title: string
  level?: string
  labels?: Array<ILabelItem>
  date?: string
  isFinish?: boolean
  hasAlarm?: boolean
  hasCyclic?: boolean
}
