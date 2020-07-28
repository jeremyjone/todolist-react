import React from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import AssignmentIcon from '@material-ui/icons/Assignment';
import TodayIcon from '@material-ui/icons/Today';
import WbSunnyIcon from '@material-ui/icons/WbSunny';
import LabelIcon from '@material-ui/icons/Label';
import LibraryAddIcon from '@material-ui/icons/LibraryAdd';
import SettingsIcon from '@material-ui/icons/Settings';
import Hidden from '@material-ui/core/Hidden';
import { BrowserRouter as Router, Switch, Link } from "react-router-dom";

import CustomAvatar from "../components/avatar";
import IconButton from '@material-ui/core/IconButton';
import { DrawChangeType } from "../types/Drawer";
import Drawer from '@material-ui/core/Drawer';


interface Props {
  open: boolean;
  onClose: (v: boolean) => void;
  onChange: (t: DrawChangeType) => void;
}


const useStyles = makeStyles({
  list: {
    width: 250,
  },
  fullList: {
    width: 'auto',
  },
});

export default function SwipeableTemporaryDrawer(props: Props) {
  const classes = useStyles();

  const toggleDrawer = (open: boolean) => (
    event: React.KeyboardEvent | React.MouseEvent,
  ) => {
    if (
      event &&
      event.type === 'keydown' &&
      ((event as React.KeyboardEvent).key === 'Tab' ||
        (event as React.KeyboardEvent).key === 'Shift')
    ) {
      return;
    }
    props.onClose(open);
  };

  const handlePersonal = () => {
    console.log("handlePersonal");
  }

  const handleSettings = () => {
    console.log("handleSettings");
  }

  const handleAddList = () => {
    console.log("handleAddList");
  }

  const handleManageList = () => {
    console.log("handleManageList");
  }

  const handleSwitch = (type: DrawChangeType) => {
    props.onChange(type);
  }

  const getTaskCount = (type: DrawChangeType) => {
    switch (type) {
      case "collect":
        return 10 + "";
      case "today":
        return 5 + "";
      case "tomorrow":
        return 6 + ""
      default:
        return "0";
    }
  }

  const list = () => (
    <div
      className={clsx(classes.list)}
      role="presentation"
      onClick={toggleDrawer(false)}
      onKeyDown={toggleDrawer(false)}
    >
      <div style={{ display: "flex", margin: "10px 10px 0 10px" }}>
        <CustomAvatar size="large" onClick={handlePersonal} text={"小鹰"} style={{ flexGrow: 1 }} />
        <IconButton component={Link} to="/settings" style={{ marginRight: "10px" }} color="inherit" aria-label="menu" onClick={handleSettings}>
          <SettingsIcon />
        </IconButton>
      </div>
      <List>
        {[
          { text: "收集箱", icon: <AssignmentIcon />, rightLabel: getTaskCount("collect"), action: () => handleSwitch("collect") },
          { text: "今天", icon: <TodayIcon />, rightLabel: getTaskCount("today"), action: () => handleSwitch("today") },
          { text: "明天", icon: <WbSunnyIcon />, rightLabel: getTaskCount("tomorrow"), action: () => handleSwitch("tomorrow") },
          { text: "标签", icon: <LabelIcon />, rightLabel: "", action: () => handleSwitch("label") },
          // 这里可以动态添加具体标签类别
        ].map(item => (
          <ListItem button key={item.text} onClick={item.action}>
            <ListItemIcon>{item.icon}</ListItemIcon>
            <ListItemText primary={item.text} />
            <ListItemText secondary={item.rightLabel} style={{ textAlign: "right" }} />
          </ListItem>
        ))}
      </List>
      <Divider />
      <List>
        {[
          { text: "添加清单", icon: <LibraryAddIcon />, action: handleAddList },
          { text: "管理清单和标签", icon: <SettingsIcon />, action: handleManageList }
        ].map(item => (
          <ListItem button key={item.text} onClick={item.action}>
            <ListItemIcon>{item.icon}</ListItemIcon>
            <ListItemText primary={item.text} />
          </ListItem>
        ))}
      </List>
    </div>
  );

  return (
    <div>
      <React.Fragment key="homeDrawer">
        <Hidden smUp implementation="css">
          <SwipeableDrawer
            anchor="left"
            open={props.open}
            onClose={toggleDrawer(false)}
            onOpen={toggleDrawer(true)}
          >
            {list()}
          </SwipeableDrawer>
        </Hidden>
        <Hidden xsDown implementation="css">
          <Drawer variant="permanent" open>
            {list()}
          </Drawer>
        </Hidden>
      </React.Fragment>
    </div>
  );
}
