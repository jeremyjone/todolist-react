import React from 'react';
import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";
import { orange, red, amber } from "@material-ui/core/colors";
import Box from "@material-ui/core/Box";
import Card from '@material-ui/core/Card';
import Checkbox from "@material-ui/core/Checkbox";
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import GridList from '@material-ui/core/GridList';

import Label from "../label";
import CustomIcon from "../icons";
import { ITaskItem } from "../../models/TaskModel";


interface Props {
  item: ITaskItem

  onClick?: Function
  onChecked?: Function
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: 'flex',
      flexWrap: 'wrap',
      justifyContent: 'flex-start',
      overflow: 'hidden',
      backgroundColor: theme.palette.background.paper
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

    title: {
      ...theme.typography.button,
      padding: theme.spacing(1),
      fontWeight: "bold",
      verticalAlign: "middle"
    },

    orange: {
      color: orange[500]
    },

    red: {
      color: red[500]
    },

    amber: {
      color: amber[500]
    },

    marginRight: {
      marginRight: "10px"
    }
  }),
);

export default function TaskItem(props: Props) {
  const classes = useStyles();
  const item = props.item;
  const labels = item.labels || [];
  const checked = item.isFinish ? true : false;

  // checkbox的颜色
  let color;
  if (item.isFinish) {
    color = void 0;
  } else {
    switch (item.level) {
      case "highest":
        color = classes.red;
        break;
      case "important":
        color = classes.orange;
        break;
      case "advanced":
        color = classes.amber;
        break;
      default:
        color = void 0;
        break;
    }
  }

  const handleClick = (event: any) => {
    event.stopPropagation();
    props.onClick && !props.item.isFinish ? props.onClick(item) : void 0;
  }

  const handleChangeCheckbox = item.isFinish ? void 0 : (event: React.ChangeEvent<HTMLInputElement>) => {
    event.stopPropagation();
    props.onChecked ? props.onChecked(event.target.checked, item) : void 0
  }

  return (
    <Box mb={0.5}>
      <Card>
        <CardActionArea onClick={handleClick}>
          <CardContent className={classes.root}>
            <div className={classes.fullWidth}>
              <Checkbox className={color} color="default" checked={checked} onChange={handleChangeCheckbox} />
              <span className={classes.title}>
                {item.title}
              </span>
            </div>

            <GridList className={`${classes.hidden} ${classes.fullWidth}`} style={{ margin: "0 0 5px 20px" }}>
              {labels.map(item => (
                <Label key={item.id} className={classes.marginRight} name={item.content} />
              ))}
            </GridList>
            <div className={`${classes.hidden} ${classes.fullWidth}`} style={{ marginLeft: "20px" }}>
              <Box mr={2} style={{ minWidth: "60px" }}>
                <Typography variant="body2" color="textSecondary" component="p" noWrap={true}>
                  {item.date}
                </Typography>
              </Box>
              <span style={{ alignSelf: "flex-end" }} className={`${classes.hidden}`}>
                {item.hasAlarm ? <CustomIcon name="alarm" size={16} className={classes.marginRight} /> : null}
                {item.hasCyclic ? <CustomIcon name="cyclic" size={16} className={classes.marginRight} /> : null}
              </span>
            </div>
          </CardContent>
        </CardActionArea>
      </Card>
    </Box>
  );
}
