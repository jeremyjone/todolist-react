import React, { useEffect, useCallback } from 'react';
import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Box from '@material-ui/core/Box';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import TodayIcon from '@material-ui/icons/Today';
import DateRangeIcon from '@material-ui/icons/DateRange';
import { connect } from "react-redux";
import { Dispatch } from "redux";

import JHeader from "../layouts/header";
import JDivider from "../components/divider";
import JAddButton from "../components/buttons/addButton";
import CreateDlg from "../components/create";
import TaskItem from "../components/taskItem";
import { JDatePicker } from "../components/pickers";
import { formatDate, sameDate } from '../utils';
import { ITodoItem } from '../types/ITodoItem';

import { IStoreState } from '../types/IStore';


const useStyle = makeStyles((theme: Theme) => {
  return createStyles({
    picker: {
      position: "sticky",
      top: 0,
      zIndex: 99,
      backgroundColor: theme.palette.background.paper
    }
  })
})


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


export default connect(mapStateToProps, mapDispatherToProps)(function CalendarPage(props: ReduxType) {
  const classes = useStyle();

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [selectDay, setSelectDay] = React.useState<Date>(new Date());
  const [eventList, setEventList] = React.useState<Array<Number>>([]);
  const [todoList, setTodoList] = React.useState(props.todoList);

  const [openCreateDlg, setOpenCreateDlg] = React.useState(false);
  const [createDlgItem, setCreateDlgItem] = React.useState<ITodoItem | undefined>(void 0);

  const changeEventList = useCallback((year: Number, month: Number) => {
    const el: Number[] = [];
    props.todoList.forEach(item => {
      if (item.date) {
        if (item.date.getMonth() === month && item.date.getFullYear() === year) {
          el.push(item.date.getDate());
        }
      }
    })

    setEventList(el);
  }, [props.todoList])

  useEffect(() => {
    changeEventList(selectDay.getFullYear(), selectDay.getMonth());
    setTodoList(props.todoList);
  }, [changeEventList, props.todoList, selectDay])

  const handleCloseCreateDlg = () => {
    setCreateDlgItem(void 0);
    setOpenCreateDlg(false);
  }

  const handleAddTask = () => {
    setOpenCreateDlg(true);
  }

  const handleClickItem = (item: ITodoItem) => {
    setCreateDlgItem(item);
    setOpenCreateDlg(true);
  }

  const handleOpenMenu = (e: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(e.currentTarget);
  }

  const handleCloseMenu = () => {
    setAnchorEl(null);
  }

  const handleClickMenu = (type: string) => {
    console.log("handleClickMenu", type);
    handleCloseMenu();
  }

  const handleGoToday = () => {
    setSelectDay(new Date());
  }

  const handleToggleView = () => {
    console.log("handleToggleView");
  }

  const handleChangeDate = (date?: Date) => {
    if (!date) date = new Date();
    setSelectDay(date);
  }

  const handleMonthChange = (date: Date) => {
    const month = date.getMonth();
    const year = date.getFullYear();
    changeEventList(year, month);
  }

  const renderTask = (condition: boolean) => {
    return todoList.filter(item => (
      item.isFinish === condition
    )).map(item => (
      item.date && sameDate(item.date, selectDay)
        ? <TaskItem key={item.id} item={item} onClick={handleClickItem} />
        : null
    ))
  }

  return (
    <div>
      <JHeader>
        <Toolbar>
          <Typography variant="h6" style={{ flexGrow: 1 }}>
            {formatDate(selectDay, "M月")}
          </Typography>

          <IconButton color="inherit" onClick={handleGoToday}>
            <TodayIcon />
          </IconButton>

          {/* <IconButton color="inherit" onClick={handleToggleView}>
            <DateRangeIcon />
          </IconButton> */}

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
            <MenuItem dense onClick={() => handleClickMenu("settings")}>显示设置</MenuItem>
            <MenuItem dense onClick={() => handleClickMenu("task")}>安排任务</MenuItem>
            <MenuItem dense onClick={() => handleClickMenu("calendar")}>订阅日历</MenuItem>
            <MenuItem dense onClick={() => handleClickMenu("share")}>分享</MenuItem>
          </Menu>
        </Toolbar>
      </JHeader>

      <Box m={0} style={{ height: "calc(100vh - 120px)", overflow: "hidden auto" }}>
        <div className={classes.picker}>
          <JDatePicker
            date={selectDay}
            style={{ margin: "auto" }}
            disableToolbar
            variant="static"
            onSave={handleChangeDate}
            eventList={eventList}
            onMonthChange={handleMonthChange}
          />

          <JDivider text={formatDate(selectDay, "MM月dd日")} />
        </div>

        {/* 只显示选择日期的任务。先展示未完成，再展示已完成 */}
        {
          renderTask(false)
        }
        {
          renderTask(true)
        }
      </Box>

      <JAddButton onClick={handleAddTask} />

      <CreateDlg open={openCreateDlg} onClose={handleCloseCreateDlg} item={createDlgItem} date={selectDay} />
    </div>
  )
})
