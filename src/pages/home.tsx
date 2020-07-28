import React, { useEffect } from 'react';
import Box from "@material-ui/core/Box";
import MenuIcon from '@material-ui/icons/Menu';
import IconButton from '@material-ui/core/IconButton';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { Menu, MenuItem } from '@material-ui/core';
import { connect } from "react-redux";
import { Dispatch } from "redux";

import JHeader from "../layouts/header";
import JDrawer from "./drawer";
import JDivider from "../components/divider";
import CreateDlg from "../components/create";
import JAddButton from "../components/buttons/addButton";

import TaskItem from "../components/taskItem";
import { ITodoItem } from '../types/ITodoItem';

import { IStoreState } from '../types/IStore';
import { DrawChangeType } from "../types/Drawer";
import * as actions from "../store/actions";
import { sameDate } from '../utils';


function getTitle(type:DrawChangeType) {
  switch (type) {
    case "today":
      return "今天";
    case "tomorrow":
      return '明天';
    case "label":
      return "标签";
    default:
      return "收集箱";
  }
}



interface IProps {
  todoList: ITodoItem[];
}


interface IDispatcherProps {

}

// 将 reducer 中的状态插入到组件的 props 中
const mapStateToProps = (state: IStoreState, ownProps: IProps): IProps => ({
  todoList: state.todoList,
})

// 将对应的 action 插入到组件的 props 中
const mapDispatherToProps = (dispatch: Dispatch, ownProps: IProps): IDispatcherProps => ({

})


type ReduxType = ReturnType<typeof mapStateToProps> & ReturnType<typeof mapDispatherToProps>;

export default connect(mapStateToProps, mapDispatherToProps)(function HomePage(props: ReduxType) {
  const [openDrawer, setOpenDrawer] = React.useState(false);
  const [openCreateDlg, setOpenCreateDlg] = React.useState(false);
  const [createDlgItem, setCreateDlgItem] = React.useState<ITodoItem | undefined>(void 0);
  const [showDetails, setShowDetails] = React.useState(true);
  const [showComplete, setShowComplete] = React.useState(true);
  const [todoList, setTodoList] = React.useState(props.todoList);
  const [title, setTitle] = React.useState<string>(getTitle("collect"));

  useEffect(() => {
    setTodoList(props.todoList);
  }, [props.todoList])

  const handleOpenDrawer = () => {
    setOpenDrawer(!openDrawer);
  }

  const handleCloseCreateDlg = () => {
    setCreateDlgItem(void 0);
    setOpenCreateDlg(false);
  }

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  const handleOpenMenu = (e: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(e.currentTarget);
  }

  const handleCloseMenu = () => {
    setAnchorEl(null);
  }

  const handleClickMenu = (type: string) => {
    console.log("handleClickMenu", type);
    handleCloseMenu();

    switch (type) {
      case "details":
        setShowDetails(!showDetails);
        break;
      case "complete":
        setShowComplete(!showComplete);
        break;
      default:
        break;
    }
  }

  const handleAddTask = () => {
    setOpenCreateDlg(true);
  }

  const handleClickItem = (item: ITodoItem) => {
    setCreateDlgItem(item);
    setOpenCreateDlg(true);
  }

  const handleChangeView = (type: DrawChangeType) => {
    const arr: ITodoItem[] = [];

    switch (type) {
      case "today":
        props.todoList.forEach(item => {
          if (item.date && sameDate(item.date, new Date()))
           arr.push(item);
        })

        setTodoList(arr);
        break;
      case "tomorrow":
        props.todoList.forEach(item => {
          if (item.date && sameDate(item.date, new Date(new Date().getTime() + 86400000)))
           arr.push(item);
        })

        setTodoList(arr);
        break;
      case "label":
        console.log("label");
        break;
      default:
        setTodoList(props.todoList);
        break;
    }

    setTitle(getTitle(type));
  }

  return (
    <div>
      <JHeader>
        <Toolbar>
          <IconButton edge="start" style={{ marginRight: "10px" }} color="inherit" aria-label="menu" onClick={handleOpenDrawer}>
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" style={{ flexGrow: 1 }}>
            {title}
            </Typography>
          <IconButton color="inherit" onClick={handleOpenMenu}>
            <MoreVertIcon />
          </IconButton>
          <Menu
            id="home-menu"
            anchorEl={anchorEl}
            keepMounted
            open={Boolean(anchorEl)}
            onClose={handleCloseMenu}
          >
            <MenuItem dense onClick={() => handleClickMenu("label")}>编辑标签</MenuItem>
            <MenuItem dense onClick={() => handleClickMenu("details")}>{`${showDetails ? "隐藏" : "显示"}详细`}</MenuItem>
            <MenuItem dense onClick={() => handleClickMenu("complete")}>{`${showComplete ? "隐藏" : "显示"}已完成`}</MenuItem>
            <MenuItem dense onClick={() => handleClickMenu("sort")}>排序</MenuItem>
            <MenuItem dense onClick={() => handleClickMenu("share")}>分享</MenuItem>
          </Menu>
        </Toolbar>
      </JHeader>

      <Box m={0} style={{ height: "calc(100vh - 120px)", overflow: "hidden auto" }}>
        {/* 待完成 */}
        <Box mx={1}>
          {
            todoList.map(item => (
              !item.isFinish ? <TaskItem key={item.id} item={item} onClick={handleClickItem} showDetails={showDetails} /> : null
            ))
          }
        </Box>

        {
          showComplete
            ? <JDivider text="已完成" />
            : null
        }

        {
          showComplete
            ? <Box mx={1}>
              {
                todoList.map(item => (
                  item.isFinish ? <TaskItem key={item.id} item={item} showDetails={showDetails} /> : null
                ))
              }
            </Box>
            : null
        }
      </Box>

      <JAddButton onClick={handleAddTask} />

      <JDrawer open={openDrawer} onClose={handleOpenDrawer} onChange={handleChangeView} />
      <CreateDlg open={openCreateDlg} onClose={handleCloseCreateDlg} item={createDlgItem} />

    </div>
  )
});
