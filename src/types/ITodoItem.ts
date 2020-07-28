import { ILabelItem } from "./ILabelItem";
import { createUuid } from "../utils";
import { LevelEnum, CyclicEnum } from "./Enum";

export interface ITodoDate {
  date?: Date;
  time?: Date;
  end?: Date;
  stop?: Date;
  hasAlarm?: boolean;
  hasCyclic?: boolean;
  alarm?: Date;
  cyclic?: CyclicEnum;
}

export interface ITodoItem extends ITodoDate {
  id: number | string;
  title: string;
  level: LevelEnum;
  description?: string;
  labels?: Array<ILabelItem>;
  isFinish?: boolean;
}


export function cyclicEnumShow(cyclic: CyclicEnum) {
  switch (cyclic) {
    case CyclicEnum.ONEDAY:
      return "每天";
    case CyclicEnum.ONEWEEK:
      return "每周";
    case CyclicEnum.ONEMONTH:
      return "每月";
    case CyclicEnum.ONEQUARTER:
      return "每季度";
    case CyclicEnum.ONEYEAR:
      return "每年";
    default:
      return "从不";
  }
}


export class TodoItem implements ITodoItem {
  id: number | string;
  title: string;
  level: LevelEnum;
  description: string;
  labels: Array<ILabelItem>;
  date?: Date;
  end?: Date;
  time?: Date;
  stop?: Date;
  isFinish: boolean;
  hasAlarm: boolean;
  hasCyclic: boolean;
  alarm?: Date;
  cyclic: CyclicEnum;

  constructor(
    title: string,
    level: LevelEnum,
    date: Date,
    hasAlarm?: boolean,
    hasCyclic?: boolean
  ) {
    this.id = createUuid();
    this.title = title;
    this.level = level;

    this.labels = [
      // { id: 1, content: "资金" },
      // { id: 2, content: "每月固定任务" }
    ];
    this.description = "";
    this.hasAlarm = hasAlarm || false;
    this.hasCyclic = hasCyclic || false;
    this.date = date;
    this.isFinish = false;
    this.cyclic = CyclicEnum.NONE;
    this.end = void 0;
    this.time = void 0;
    this.stop = void 0;
    this.alarm = void 0;
  }

  clear(): void {
    this.id = createUuid();
    this.title = "";
    this.level = LevelEnum.NORMAL;
    this.description = "";
    this.isFinish = false;
    this.hasAlarm = false;
    this.labels = [];
    this.cyclic = CyclicEnum.NONE;
    this.date = new Date();
    this.end = void 0;
    this.time = void 0;
    this.stop = void 0;
    this.alarm = void 0;
  }
}
