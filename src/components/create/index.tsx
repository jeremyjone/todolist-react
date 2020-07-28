import React, { useEffect } from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import Divider from '@material-ui/core/Divider';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import CloseIcon from '@material-ui/icons/Close';
import Slide from '@material-ui/core/Slide';
import { TransitionProps } from '@material-ui/core/transitions';
import Box from "@material-ui/core/Box";
import Card from '@material-ui/core/Card';
import Checkbox from "@material-ui/core/Checkbox";
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import InputAdornment from '@material-ui/core/InputAdornment';
import FormControl from '@material-ui/core/FormControl';
import InputBase from '@material-ui/core/InputBase';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import DescriptionIcon from '@material-ui/icons/Description';
import LabelIcon from '@material-ui/icons/Label';
import GridList from '@material-ui/core/GridList';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import { connect } from "react-redux";
import { Dispatch } from 'redux';

import Label from "../label";
import CustomIcon from "../icons";
import Toast from "../toast";
import { ITodoItem, TodoItem, ITodoDate } from "../../types/ITodoItem";
import { getLevelColor, formatDate, getLevelColorByLevel } from "../../utils";
import * as actions from "../../store/actions";
import { LevelEnum, CyclicEnum } from '../../types/Enum';

import SetDateDlg from "./date";


const Transition = React.forwardRef(function Transition(
  props: TransitionProps & { children?: React.ReactElement },
  ref: React.Ref<unknown>,
) {
  return <Slide direction="up" ref={ref} {...props} />;
});


const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: 'flex',
      flexWrap: 'wrap',
      justifyContent: 'flex-start',
      overflow: 'hidden',
      backgroundColor: theme.palette.background.paper
    },

    appBar: {
      position: 'relative',
    },

    barTitle: {
      marginLeft: theme.spacing(2),
      flex: 1,
    },

    hidden: {
      display: 'flex',
      flexWrap: 'nowrap',
      justifyContent: 'flex-start',
      overflow: 'hidden',
    },

    fullWidth: {
      width: "100%"
    },

    levelButton: {
      width: "30px",
      height: "30px",
      display: "inline-block",
      float: "right",
      fontSize: "20px",
      textAlign: "center",
      lineHeight: "30px",
      margin: "10px 10px 0 0"
    },

    date: {
      padding: theme.spacing(1),
      fontWeight: "bold",
      verticalAlign: "middle"
    },

    title: {
      '& p': {
        fontSize: "20px",
        fontWeight: "bold",
        marginLeft: "20px"
      }
    },

    marginRight: {
      marginRight: "10px"
    },

    margin: {
      margin: theme.spacing(1)
    }
  }),
);


interface IProps {
  open: boolean;
  onClose: Function;
  item?: ITodoItem;
  date?: Date;
}


interface IDispatcherProps {
  addTodo: (todo: ITodoItem) => void;
  editTodo: (todo: ITodoItem) => void;
  deleteTodo: (todo: ITodoItem) => void;
}

// 将 reducer 中的状态插入到组件的 props 中
const mapStateToProps = (state: any, ownProps: IProps): IProps => ({
  open: ownProps.open,
  onClose: ownProps.onClose
})

// 将对应的 action 插入到组件的 props 中
const mapDispatherToProps = (dispatch: Dispatch, ownProps: IProps): IDispatcherProps => ({
  addTodo: (todo: ITodoItem) => dispatch(actions.addTodo(todo)),
  editTodo: (todo: ITodoItem) => dispatch(actions.editTodo(todo)),
  deleteTodo: (todo: ITodoItem) => dispatch(actions.delteTodo(todo.id))
})


type ReduxType = ReturnType<typeof mapStateToProps> & ReturnType<typeof mapDispatherToProps>;


export default connect(mapStateToProps, mapDispatherToProps)(function CreateTaskPage(props: ReduxType) {
  const classes = useStyles();
  const [isEdit, setIsEdit] = React.useState(props.item ? true : false);
  const [todo, setTodo] = React.useState(props.item || new TodoItem("", LevelEnum.NORMAL, props.date || new Date()));
  const [anchorLevelMenuEl, setAnchorLevelMenuEl] = React.useState<null | HTMLElement>(null);
  const [openSetDateDlg, setSetDateCreateDlg] = React.useState(false);
  const [anchorBarMenuEl, setAnchorBarMenuEl] = React.useState<null | HTMLElement>(null);

  useEffect(() => {
    if (props.item) {
      setTodo(props.item);
    }

    setIsEdit(props.item ? true : false);
  }, [props.item])

  useEffect(() => {
    setTodo({ ...todo, date: props.date });
  }, [props.date])

  const handleOpenBarMenu = (e: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorBarMenuEl(e.currentTarget);
  }

  const handleCloseBarMenu = () => {
    setAnchorBarMenuEl(null);
  }

  const handleClickMenu = (type: string) => {
    console.log("handleClickMenu", type);
    handleCloseBarMenu();

    switch (type) {
      case "delete":
        if (props.item) {
          props.deleteTodo(props.item);
          props.onClose();
        }
        break;

      default:
        break;
    }
  }

  const handleOpenSetDateDlg = () => {
    setSetDateCreateDlg(false);
  }

  const handleOpenLevelMenu = (e: any) => {
    e.stopPropagation();
    setAnchorLevelMenuEl(e.currentTarget);
  }

  const handleCloseLevelMenu = (e: any) => {
    e.stopPropagation();
    setAnchorLevelMenuEl(null);
  }

  const handleOpenDateDlg = (e: any) => {
    console.log("handleOpenDateDlg", e);
    setSetDateCreateDlg(true);
  }

  const handleClose = () => {
    props.onClose();
    setTodo({ ...todo, ...new TodoItem("", LevelEnum.NORMAL, new Date()) });
  };

  const handleSave = () => {
    if (todo.title === "") {
      Toast.warning("请填写标题。");
      return;
    }

    if (isEdit) {
      props.editTodo(todo);
    } else {
      props.addTodo(todo);
    }
    handleClose();
  }

  const handleChangeText = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, prop: string) => {
    setTodo({ ...todo, [prop]: e.target.value });
  }

  const handleChangeLevel = (e: any, level: LevelEnum) => {
    e.stopPropagation();
    setTodo({ ...todo, level: level });
    setAnchorLevelMenuEl(null);
  }

  const handleSetDate = (value: ITodoDate) => {
    console.log(value);
    handleOpenSetDateDlg();
    setTodo({ ...todo, ...value });
  }

  const handleCyclicShowText = (todo: ITodoItem) => {
    switch (todo.cyclic) {
      case CyclicEnum.ONEDAY:
        return "每天";
      case CyclicEnum.ONEWEEK:
        return formatDate(todo.date, "每周的D");
      case CyclicEnum.ONEMONTH:
        return formatDate(todo.date, "每月的dd号");
      case CyclicEnum.ONEQUARTER:
        return "每季度";
      case CyclicEnum.ONEYEAR:
        return formatDate(todo.date, "每年的MM月dd日");
      default:
        return "";
    }
  }

  return (
    <Dialog fullScreen open={props.open} onClose={handleClose} TransitionComponent={Transition}>
      <AppBar className={classes.appBar}>
        <Toolbar>
          <IconButton edge="start" color="inherit" onClick={handleClose} aria-label="close">
            <CloseIcon />
          </IconButton>
          <Typography variant="h6" className={classes.barTitle}>
            {isEdit ? `修改 ${todo.title}` : "创建新任务"}
          </Typography>
          <Button autoFocus color="inherit" onClick={handleSave}>
            保存
          </Button>
          <IconButton color="inherit" onClick={handleOpenBarMenu}>
            <MoreVertIcon />
          </IconButton>
          <Menu
            id="home-menu"
            anchorEl={anchorBarMenuEl}
            keepMounted
            open={Boolean(anchorBarMenuEl)}
            onClose={handleCloseBarMenu}
          >
            <MenuItem dense onClick={() => handleClickMenu("delete")}>删除</MenuItem>
          </Menu>
        </Toolbar>
      </AppBar>

      <Card>
        <CardActionArea onClick={handleOpenDateDlg}>
          <CardContent className={classes.root}>
            <div className={classes.fullWidth}>
              <Checkbox className={getLevelColor(todo)} color="default" checked={false} />
              <Typography className={classes.date} variant="body1" color="primary" component="span" noWrap={true}>
                {formatDate(todo.date, "yyyy年MM月dd日")}
              </Typography>
              <div className={`${classes.levelButton} ${getLevelColor(todo)}`} onClick={handleOpenLevelMenu}>
                !!!
              </div>
              <Menu
                id="home-menu"
                anchorEl={anchorLevelMenuEl}
                keepMounted
                open={Boolean(anchorLevelMenuEl)}
                onClose={handleCloseLevelMenu}
              >
                <MenuItem dense className={getLevelColorByLevel(LevelEnum.HIGHEST)} onClick={(e) => handleChangeLevel(e, LevelEnum.HIGHEST)}>紧急</MenuItem>
                <MenuItem dense className={getLevelColorByLevel(LevelEnum.IMPORTANT)} onClick={(e) => handleChangeLevel(e, LevelEnum.IMPORTANT)}>重要</MenuItem>
                <MenuItem dense className={getLevelColorByLevel(LevelEnum.ADVANCED)} onClick={(e) => handleChangeLevel(e, LevelEnum.ADVANCED)}>高级</MenuItem>
                <MenuItem dense className={getLevelColorByLevel(LevelEnum.NORMAL)} onClick={(e) => handleChangeLevel(e, LevelEnum.NORMAL)}>普通</MenuItem>
              </Menu>
            </div>

            <div className={`${classes.hidden} ${classes.fullWidth}`} style={{ marginLeft: "60px" }}>
              {todo.hasAlarm ? <CustomIcon name="alarm" size={16} className={classes.marginRight} /> : null}
              <Box mr={2} style={{ minWidth: "60px" }}>
                <Typography variant="body2" color="textSecondary" component="p" noWrap={true}>
                  {todo.hasAlarm ? formatDate(todo.alarm, "每天的HH:mm提醒") : null}
                </Typography>
              </Box>
              {todo.hasCyclic ? <CustomIcon name="cyclic" size={16} className={classes.marginRight} /> : null}
              <Box mr={2} style={{ minWidth: "60px" }}>
                <Typography variant="body2" color="textSecondary" component="p" noWrap={true}>
                  {
                    todo.hasCyclic
                      ? `${handleCyclicShowText(todo)}`
                      : null
                  }
                </Typography>
              </Box>
            </div>
          </CardContent>
        </CardActionArea>
        <Divider />

        <FormControl fullWidth className={classes.margin}>
          <InputBase
            id="todo-title"
            value={todo.title}
            onChange={(e) => handleChangeText(e, 'title')}
            startAdornment={<InputAdornment position="start" className={classes.title}>标题</InputAdornment>}
          />
        </FormControl>

        <Divider />

        <List>
          <ListItem button key="label">
            <ListItemIcon><LabelIcon /></ListItemIcon>
            <GridList className={`${classes.hidden} ${classes.fullWidth}`} style={{ margin: "auto 0 auto 20px" }}>
              {todo.labels ? todo.labels.map(item => (
                <Label key={item.id} className={classes.marginRight} name={item.content} />
              )) : null}
            </GridList>
          </ListItem>

          <ListItem button key="description">
            <ListItemIcon><DescriptionIcon /></ListItemIcon>
            <FormControl fullWidth className={classes.margin}>
              <InputBase
                id="todo-description"
                multiline
                value={todo.description}
                placeholder="描述"
                onChange={(e) => handleChangeText(e, 'description')}
              />
            </FormControl>
          </ListItem>
        </List>
      </Card>

      <SetDateDlg open={openSetDateDlg} onClose={handleOpenSetDateDlg} onSave={handleSetDate} todo={todo as ITodoDate} />
    </Dialog>
  );
})
