import {
  ADD_TODO,
  TOGGLE_TODO,
  EDIT_TODO,
  DELETE_TODO,
  FILTER_TODO
} from "./const";
import { FiltersEnum } from "../types/Enum";
import { ITodoItem } from "../types/ITodoItem";


export interface IAddTodoAction {
    todo: ITodoItem;
    type: ADD_TODO
}

export interface IToggleTodoAction {
    id: number | string;
    type: TOGGLE_TODO
}

export interface IEditTodoAction {
    todo: ITodoItem;
    type: EDIT_TODO
}

export interface IDeleteTodoAction {
    id: number | string;
    type: DELETE_TODO
}

export interface IFilterTodoAction {
    filter: FiltersEnum;
    type: FILTER_TODO
}

export type TodoAction = IAddTodoAction | IToggleTodoAction | IEditTodoAction | IDeleteTodoAction | IFilterTodoAction;


export const addTodo = (todo: ITodoItem): IAddTodoAction => ({
    todo, type: ADD_TODO
});

export const toggleTodo = (id: number | string): IToggleTodoAction => ({
    id, type: TOGGLE_TODO
});

export const editTodo = (todo: ITodoItem): IEditTodoAction => ({
    todo, type: EDIT_TODO
});

export const delteTodo = (id: number | string): IDeleteTodoAction => ({
    id, type: DELETE_TODO
});

export const filterTodo = (filter: FiltersEnum): IFilterTodoAction => ({
    filter, type: FILTER_TODO
});
