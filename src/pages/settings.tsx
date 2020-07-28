import React from 'react';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import Box from '@material-ui/core/Box';
import JHeader from "../layouts/header";
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';
import AppsIcon from '@material-ui/icons/Apps';
import ColorLensIcon from '@material-ui/icons/ColorLens';
import DateRangeIcon from '@material-ui/icons/DateRange';
import NotificationsActiveIcon from '@material-ui/icons/NotificationsActive';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import HelpIcon from '@material-ui/icons/Help';
import FeedbackIcon from '@material-ui/icons/Feedback';
import InfoIcon from '@material-ui/icons/Info';


export default function SettingsPage() {
  const handleClickList = (type: string) => {
    console.log("handleClickMenu", type);
  }

  return (
    <div>
      <JHeader>
        <Toolbar>
          <Typography variant="h6" style={{ flexGrow: 1 }}>
            设置
          </Typography>
        </Toolbar>
      </JHeader>

      <Box m={0} style={{ height: "calc(100vh - 120px)", overflow: "hidden auto" }}>
        <ListItem button key="功能模块" onClick={() => handleClickList("function")}>
          <ListItemIcon><AppsIcon /></ListItemIcon>
          <ListItemText primary="功能模块" />
        </ListItem>

        <Divider />

        <List>
          {[
            { text: "外观", icon: <ColorLensIcon />, action: () => handleClickList("facade") },
            { text: "日期与时间", icon: <DateRangeIcon />, action: () => handleClickList("date") },
            { text: "声音、提醒与通知", icon: <NotificationsActiveIcon />, action: () => handleClickList("sound") },
            { text: "更多设置", icon: <MoreHorizIcon />, action: () => handleClickList("more") },
          ].map(item => (
            <ListItem button key={item.text} onClick={item.action}>
              <ListItemIcon>{item.icon}</ListItemIcon>
              <ListItemText primary={item.text} />
            </ListItem>
          ))}
        </List>

        <Divider />

        <List>
          {[
            { text: "帮助中心", icon: <HelpIcon />, action: () => handleClickList("help") },
            { text: "反馈与建议", icon: <FeedbackIcon />, action: () => handleClickList("feedback") },
            { text: "关于", icon: <InfoIcon />, action: () => handleClickList("about") }
          ].map(item => (
            <ListItem button key={item.text} onClick={item.action}>
              <ListItemIcon>{item.icon}</ListItemIcon>
              <ListItemText primary={item.text} />
            </ListItem>
          ))}
        </List>
      </Box>
    </div>
  )
}
