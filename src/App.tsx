import React from 'react';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import DoneIcon from '@material-ui/icons/Done';
import DateRangeIcon from '@material-ui/icons/DateRange';
import SettingsIcon from '@material-ui/icons/Settings';
import { BrowserRouter as Router, Switch, Link } from "react-router-dom";

import Footer from "./layouts/footer";

import routes from "./router";
import { RouteWithSubRoutes } from "./assets/common";
import { IRoute } from "./types/IRoute";


const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: "100%",
      height: "100%",
      backgroundColor: theme.palette.info.dark
    }
  })
);


export default function App(props: any) {
  const classes = useStyles();
  const [route, setRoute] = React.useState("todos");

  const handleChangeRoute = (event: React.ChangeEvent<{}>, newValue: string) => {
    let name;
    switch (newValue) {
      case "calendar":
        name = "calendar";
        break;
      case "settings":
        name = "settings";
        break;
      default:
        name = "todos";
        break;
    }

    setRoute(name);
  };

  return (
    <Router>
      <Switch>
        {routes.map((route: IRoute, i: number) => {
          return RouteWithSubRoutes(route, i);
        })}
      </Switch>
      <Footer>
        <BottomNavigation value={route} onChange={handleChangeRoute} className={classes.root}>
          <BottomNavigationAction component={Link} to="/todos" style={{ color: "white", maxHeight: "60px" }} label="清单" value="todos" icon={<DoneIcon />} />
          <BottomNavigationAction component={Link} to="/calendar" style={{ color: "white", maxHeight: "60px" }} label="日历" value="calendar" icon={<DateRangeIcon />} />
          <BottomNavigationAction component={Link} to="/settings" style={{ color: "white", maxHeight: "60px" }} label="设置" value="settings" icon={<SettingsIcon />} />
        </BottomNavigation>
      </Footer>
    </Router>
  )
}
