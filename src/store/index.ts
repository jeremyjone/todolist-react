import { createStore, combineReducers } from "redux";
import { todoList } from "./reducers";

export default createStore(
  combineReducers({
    todoList
  })
);
