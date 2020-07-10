import React from 'react';
import Box from "@material-ui/core/Box";

import TaskItem from "./components/taskItem";
import { ITaskItem } from './models/TaskModel';


const tasks = [
  {
    id: 1,
    title: "任务1",
    labels: [{id: 1, content: "资金"}, {id: 2, content: "每月固定任务"}],
    level: "highest",
    date: (new Date()).toString(),
    isFinish: false,
    hasAlarm: true,
    hasCyclic: false,
  },
  {
    id: 2,
    title: "任务2",
    labels: [{id: 1, content: "资金"}, {id: 2, content: "每月固定任务"}],
    level: "important",
    date: (new Date()).toISOString(),
    isFinish: false,
    hasAlarm: true,
    hasCyclic: false
  },
  {
    id: 3,
    title: "任务3",
    labels: [{id: 1, content: "资金"}, {id: 2, content: "每月固定任务"}],
    level: "advanced",
    date: (new Date()).toISOString(),
    isFinish: true,
    hasAlarm: true,
    hasCyclic: true
  }
]


class App extends React.Component {
  /**
   *
   */
  constructor(props: any) {
    super(props);

    this.state = { tasks: tasks }
  }

  handleChecked = (f: boolean, item: ITaskItem) => {
    const id = item.id;
    for (let i = 0; i < tasks.length; i++) {
      const element = tasks[i];
      if (element.id === id) {
        element.isFinish = true;
        break;
      }
    }

    this.setState({tasks: tasks})
  }

  handleClick = () => {
    console.log("点击");
  }

  render() {
    return (
      <Box m={1}>
        { tasks.map(item => (
          <TaskItem key={item.id} item={item} onChecked={this.handleChecked} onClick={this.handleClick}></TaskItem>
        ))}
      </Box>
    )
  }
}

export default App;
