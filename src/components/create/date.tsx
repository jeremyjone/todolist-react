import React, { useEffect } from 'react';
import { createStyles, makeStyles, useTheme, Theme } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import ListItemText from '@material-ui/core/ListItemText';
import ListItem from '@material-ui/core/ListItem';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import CloseIcon from '@material-ui/icons/Close';
import Slide from '@material-ui/core/Slide';
import { TransitionProps } from '@material-ui/core/transitions';
import CheckIcon from '@material-ui/icons/Check';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Box from '@material-ui/core/Box';
import SwipeableViews from 'react-swipeable-views';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import AccessAlarmIcon from '@material-ui/icons/AccessAlarm';
import AutorenewIcon from '@material-ui/icons/Autorenew';
import AccessTimeIcon from '@material-ui/icons/AccessTime';
import TimerOffIcon from '@material-ui/icons/TimerOff';

import { JDatePicker, JTimePicker } from "../pickers";
import GridList from '@material-ui/core/GridList';
import { ITodoDate, cyclicEnumShow } from '../../types/ITodoItem';
import { CyclicEnum } from "../../types/Enum";
import Toast from "../toast";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    appBar: {
      position: 'relative',
    },
    title: {
      marginLeft: theme.spacing(2),
      flex: 1,
    },
    listText: {
      flex: "0 0 auto",
      flexWrap: "nowrap"
    }
  }),
);

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & { children?: React.ReactElement },
  ref: React.Ref<unknown>,
) {
  return <Slide direction="left" ref={ref} {...props} />;
});


interface IProps {
  open: boolean;
  todo?: ITodoDate;
  onClose: Function;
  onSave: (todo: ITodoDate) => void;
}


enum StopMenuEnum {
  NONE = "NONE",
  DATE = "DATE"
}


interface IStopMenuItem {
  text: string;
  stop: StopMenuEnum;
}


const StopMenuItem: IStopMenuItem[] = [
  {
    text: "永不结束",
    stop: StopMenuEnum.NONE
  },
  {
    text: "按日期结束",
    stop: StopMenuEnum.DATE
  }
]


interface ICyclicMenuItem {
  text: string;
  cyclic: CyclicEnum;
}

const CyclicMenuItem: ICyclicMenuItem[] = [
  {
    text: cyclicEnumShow(CyclicEnum.NONE),
    cyclic: CyclicEnum.NONE
  },
  {
    text: cyclicEnumShow(CyclicEnum.ONEDAY),
    cyclic: CyclicEnum.ONEDAY
  },
  {
    text: cyclicEnumShow(CyclicEnum.ONEWEEK),
    cyclic: CyclicEnum.ONEWEEK
  },
  {
    text: cyclicEnumShow(CyclicEnum.ONEMONTH),
    cyclic: CyclicEnum.ONEMONTH
  },
  {
    text: cyclicEnumShow(CyclicEnum.ONEQUARTER),
    cyclic: CyclicEnum.ONEQUARTER
  },
  {
    text: cyclicEnumShow(CyclicEnum.ONEYEAR),
    cyclic: CyclicEnum.ONEYEAR
  }
]


export default function SetDateDlg(props: IProps) {
  const classes = useStyles();
  const [todo, setTodo] = React.useState<ITodoDate>(props.todo || {});
  const [selectStop, setSelectStop] = React.useState<StopMenuEnum>(StopMenuEnum.NONE);

  const [anchorBarMenuEl, setAnchorBarMenuEl] = React.useState<null | HTMLElement>(null);
  const [anchorCyclicMenuEl, setAnchorCyclicMenuEl] = React.useState<null | HTMLElement>(null);
  const [anchorStopMenuEl, setAnchorStopMenuEl] = React.useState<null | HTMLElement>(null);

  useEffect(() => {
    if (props.todo) {
      setTodo(props.todo);
    }
  }, [props.todo]);

  const selectColor = (f: boolean) => {
    return {"color": f ? "orange" : ""}
  }

  const handleOpenStopMenu = (e: any) => {
    e.stopPropagation();
    setAnchorStopMenuEl(e.currentTarget);
  }

  const handleCloseStopMenu = (e: any) => {
    e.stopPropagation();
    setAnchorStopMenuEl(null);
  }

  const handleClickStopMenu = (e: any, type: StopMenuEnum) => {
    e.stopPropagation();
    setAnchorStopMenuEl(null);

    setSelectStop(type);
  }

  const handleOpenCyclicMenu = (e: any) => {
    e.stopPropagation();
    setAnchorCyclicMenuEl(e.currentTarget);
  }

  const handleCloseCyclicMenu = (e: any) => {
    e.stopPropagation();
    setAnchorCyclicMenuEl(null);
  }

  const handleClickCyclicMenu = (e: any, type: CyclicEnum) => {
    e.stopPropagation();
    setAnchorCyclicMenuEl(null);

    let t = { ...todo };
    t.cyclic = type;
    switch (type) {
      case CyclicEnum.NONE:
        t.stop = void 0;
        t.hasCyclic = false;
        break;
      default:
        t.hasCyclic = true;
    }

    setTodo(t);
  }

  const handleOpenBarMenu = (e: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorBarMenuEl(e.currentTarget);
  }

  const handleCloseBarMenu = () => {
    setAnchorBarMenuEl(null);
  }

  const handleClickBarMenu = (type: string) => {
    console.log("handleClickMenu", type);
    handleCloseBarMenu();
  }

  const handleClose = () => {
    props.onClose();
  };

  const handleSave = () => {
    props.onSave(todo);
  }

  const handleClickAlarm = (date?: Date) => {
    setTodo({ ...todo, alarm: date, hasAlarm: date ? true : false });
  }

  const handleChangeDate = (type: ChangeDateType, date?: Date) => {
    let t = { ...todo };

    if (type === "onlystart") {
      t.end = void 0;
      t.date = date;
    } else {
      if (type === "start") {
        t.date = date;
        if (!t.end) t.end = t.date;
        if ((t.end as Date) < (t.date as Date)) {
          t.end = t.date;
        }
      } else if (type === "end") {
        if (!t.date) t.date = new Date();
        t.end = date;
        if (t.end && t.end < t.date) {
          Toast.warning("截止日期应该在起始日期之后。", 2000, () => { }, () => setTodo({ ...todo, end: t.date }));
        }
      }
    }

    setTodo(t);
  }

  const handleSaveStopDate = (date?: Date) => {
    setTodo({ ...todo, stop: date });
    setAnchorStopMenuEl(null);
  }

  return (
    <Dialog fullScreen open={props.open} onClose={handleClose} TransitionComponent={Transition}>
      <AppBar className={classes.appBar}>
        <Toolbar>
          <IconButton edge="start" color="inherit" onClick={handleClose} aria-label="close">
            <CloseIcon />
          </IconButton>
          <Typography variant="h6" className={classes.title}>
            设置时间
          </Typography>

          <IconButton autoFocus color="inherit" onClick={handleSave}>
            <CheckIcon />
          </IconButton>

          <IconButton color="inherit" onClick={handleOpenBarMenu}>
            <MoreVertIcon />
          </IconButton>
          <Menu
            id="create-date-menu"
            anchorEl={anchorBarMenuEl}
            keepMounted
            open={Boolean(anchorBarMenuEl)}
            onClose={handleCloseBarMenu}
          >
            <MenuItem dense onClick={() => handleClickBarMenu("clear")}>清除日期</MenuItem>
          </Menu>
        </Toolbar>
      </AppBar>

      <FullWidthTabs onChangeDate={handleChangeDate} todoDate={todo} />

      <Divider />

      <List>
        <ListItem button>
          <ListItemIcon><AccessTimeIcon style={{...selectColor(Boolean(todo.time))}} /></ListItemIcon>
          <ListItemText className={classes.listText} primary="设置时间" />
          <JTimePicker
            date={todo.time}
            disableToolbar
            textCenter
            fullWidth
            format="HH:mm"
            onSave={(date?: Date) => { setTodo({ ...todo, time: date }) }}
          />
        </ListItem>

        <Divider />

        <ListItem button>
          <ListItemIcon><AccessAlarmIcon style={{...selectColor(Boolean(todo.hasAlarm))}} /></ListItemIcon>
          <ListItemText className={classes.listText} primary="设置提醒" />
          <JTimePicker
            date={todo.alarm}
            autoOk={false}
            ampm
            textCenter
            fullWidth
            format="HH:mm"
            onSave={handleClickAlarm}
            clearable
          />
        </ListItem>

        <Divider />

        <ListItem button onClick={handleOpenCyclicMenu}>
          <ListItemIcon><AutorenewIcon /></ListItemIcon>
          <ListItemText className={classes.listText} primary="设置重复" />
          {
            <div style={{
              margin: "0 0 4px 15px",
              textAlign: "center",
              height: "100%"
            }}>{cyclicEnumShow(todo.cyclic as CyclicEnum)}</div>
          }
          <Menu
            id="create-date-cyclic-menu"
            anchorEl={anchorCyclicMenuEl}
            keepMounted
            open={Boolean(anchorCyclicMenuEl)}
            onClose={handleCloseCyclicMenu}
          >
            {CyclicMenuItem.map(item => (
              <MenuItem key={item.text} onClick={(e) => handleClickCyclicMenu(e, item.cyclic)}>{item.text}</MenuItem>
            ))}
          </Menu>
        </ListItem>

        <Divider />

        <ListItem button onClick={handleOpenStopMenu}>
          <ListItemIcon><TimerOffIcon /></ListItemIcon>
          <ListItemText className={classes.listText} primary="设置结束" />
          <Menu
            id="create-date-stop-menu"
            anchorEl={anchorStopMenuEl}
            keepMounted
            open={Boolean(anchorStopMenuEl)}
            onClose={handleCloseStopMenu}
          >
            {StopMenuItem.map(item => (
              <MenuItem key={item.text} onClick={(e) => handleClickStopMenu(e, item.stop)}>{item.text}</MenuItem>
            ))}
          </Menu>
          {
            selectStop === StopMenuEnum.DATE
              ?
              <JDatePicker
                date={todo.stop}
                disableToolbar
                textCenter
                fullWidth
                disablePast
                onSave={handleSaveStopDate}
              />
              : <div style={{
                margin: "0 0 4px 15px",
                textAlign: "center",
                height: "100%"
              }}>从不</div>
          }
        </ListItem>
      </List>
    </Dialog>
  );
}


interface TabPanelProps {
  children?: React.ReactNode;
  dir?: string;
  index: any;
  value: any;
}


declare type ChangeDateType = 'onlystart' | 'start' | 'end';


function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
      {...other}
    >
      {value === index && (<Box p={3}>{children}</Box>)}
    </div>
  );
}

function a11yProps(index: any) {
  return {
    id: `full-width-tab-${index}`,
    'aria-controls': `full-width-tabpanel-${index}`,
  };
}

const useTabStyles = makeStyles((theme: Theme) => ({
  root: {
    backgroundColor: theme.palette.background.paper,
    width: "100%",
  }
}));


interface TabsProps {
  todoDate: ITodoDate;
  onChangeDate: (type: ChangeDateType, date?: Date) => void;
}


function FullWidthTabs(props: TabsProps) {
  const classes = useTabStyles();
  const theme = useTheme();
  const [tabValue, setTabValue] = React.useState(props.todoDate.end ? 1 : 0);

  const [startDate, setStartDate] = React.useState(props.todoDate.date);
  const [endDate, setEndDate] = React.useState(props.todoDate.end);

  useEffect(() => {
    setStartDate(props.todoDate.date);
  }, [props.todoDate.date]);

  useEffect(() => {
    setEndDate(props.todoDate.end);
  }, [props.todoDate.end]);

  const handleChangeTab = (event: React.ChangeEvent<{}>, newValue: number) => {
    setTabValue(newValue);
    // 切换时重置日期
    if (newValue === 0) {
      props.onChangeDate("end", void 0);
    } else {
      props.onChangeDate("end", props.todoDate.date);
    }
  };

  const handleChangeTabIndex = (index: number) => {
    setTabValue(index);
  };

  return (
    <div className={classes.root}>
      <AppBar position="static" color="default">
        <Tabs
          value={tabValue}
          onChange={handleChangeTab}
          indicatorColor="primary"
          textColor="primary"
          variant="fullWidth"
          aria-label="date picker tabs"
        >
          <Tab label="日期" {...a11yProps(0)} />
          <Tab label="时间段" {...a11yProps(1)} />
        </Tabs>
      </AppBar>
      <SwipeableViews
        axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
        index={tabValue}
        onChangeIndex={handleChangeTabIndex}
      >
        <TabPanel
          value={tabValue}
          index={0}
          dir={theme.direction}
          children={
            <JDatePicker
              disableToolbar
              date={startDate}
              onSave={(date?: Date) => { props.onChangeDate("onlystart", date) }}
              variant="static"
            />
          }
        />

        <TabPanel
          value={tabValue}
          index={1}
          dir={theme.direction}
          children={
            <GridList style={{ width: "100%", flexWrap: "nowrap" }}>
              <JDatePicker
                date={startDate}
                disableToolbar
                textCenter
                onSave={(date?: Date) => { props.onChangeDate("start", date) }}
              />
              <div style={{ width: "30px", height: "20px", textAlign: "center" }}>-</div>
              <JDatePicker
                date={endDate}
                disableToolbar
                textCenter
                onSave={(date?: Date) => { props.onChangeDate("end", date) }}
              />
            </GridList>
          }
        />
      </SwipeableViews>
    </div>
  );
}
