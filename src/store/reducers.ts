import { TodoAction } from "./actions";
import {
  ADD_TODO,
  TOGGLE_TODO,
  EDIT_TODO,
  DELETE_TODO,
  FILTER_TODO
} from "./const";
import { ITodoItem } from "../types/ITodoItem";

import { createUuid } from "../utils";
import { LevelEnum } from "../types/Enum";

const TASKS: ITodoItem[] = [
  {
    id: createUuid(),
    title: "任务1",
    labels: [
      { id: 1, content: "资金" },
      { id: 2, content: "每月固定任务" }
    ],
    level: LevelEnum.HIGHEST,
    date: new Date(),
    isFinish: false,
    hasAlarm: true,
    hasCyclic: false
  },
  {
    id: createUuid(),
    title: "任务2",
    labels: [
      { id: 1, content: "资金" },
      { id: 2, content: "每月固定任务" }
    ],
    level: LevelEnum.IMPORTANT,
    date: new Date(),
    isFinish: false,
    hasAlarm: true,
    hasCyclic: false
  },
  {
    id: createUuid(),
    title: "任务3",
    labels: [
      { id: 1, content: "资金" },
      { id: 2, content: "每月固定任务" }
    ],
    level: LevelEnum.ADVANCED,
    date: new Date(),
    isFinish: false,
    hasAlarm: true,
    hasCyclic: true
  },
  {
    id: createUuid(),
    title: "任务4",
    labels: [
      { id: 1, content: "资金" },
      { id: 2, content: "每月固定任务" }
    ],
    level: LevelEnum.ADVANCED,
    date: new Date(),
    isFinish: false,
    hasAlarm: true,
    hasCyclic: true
  },
  {
    id: createUuid(),
    title: "任务5",
    labels: [{ id: 1, content: "资金" }],
    level: LevelEnum.HIGHEST,
    date: new Date(),
    isFinish: false,
    hasAlarm: true,
    hasCyclic: true
  }
];


export const todoList = (state = TASKS, action: TodoAction): ITodoItem[] => {
  switch (action.type) {
    case ADD_TODO:
      return [...state, action.todo];
    case TOGGLE_TODO:
      return state.map(item =>
        item.id === action.id ? { ...item, isFinish: !item.isFinish } : item
      );
    case EDIT_TODO:
      return state.map(item =>
        item.id === action.todo.id ? { ...item, ...action.todo } : item
      );
    case DELETE_TODO:
      state.forEach((item, index, arr) => {
        if (item.id === action.id) {
          arr.splice(index, 1);
        }
      });
      return state;
    default:
      return state;
  }
};
