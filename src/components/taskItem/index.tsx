import React, { useEffect } from 'react';
import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";
import Box from "@material-ui/core/Box";
import Card from '@material-ui/core/Card';
import Checkbox from "@material-ui/core/Checkbox";
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import GridList from '@material-ui/core/GridList';
import { connect } from "react-redux";
import { Dispatch } from 'redux';

import Label from "../label";
import CustomIcon from "../icons";
import { ITodoItem } from "../../types/ITodoItem";
import { getLevelColor, formatDate } from "../../utils";
import * as actions from "../../store/actions";


interface IProps {
  item: ITodoItem
  onClick?: (item: ITodoItem) => void;
  showDetails?: boolean;
}

interface IState {
  item: ITodoItem
}

interface IDispatcherProps {
  toggleTodo: () => void;
  deleteTodo: () => void;
}

const mapStateToProps = (state: IState, ownProps: IProps): IProps => ({
  item: ownProps.item,
  onClick: ownProps.onClick,
  showDetails: ownProps.showDetails
})

// 将对应的 action 插入到组件的 props 中
const mapDispatherToProps = (dispatch: Dispatch, ownProps: IProps): IDispatcherProps => ({
  deleteTodo: () => dispatch(actions.delteTodo(ownProps.item.id)),
  toggleTodo: () => dispatch(actions.toggleTodo(ownProps.item.id))
})


export type ReduxType = ReturnType<typeof mapStateToProps> & ReturnType<typeof mapDispatherToProps>;


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

    marginRight: {
      marginRight: "10px"
    }
  }),
);


export default connect(mapStateToProps, mapDispatherToProps)(function TaskItem(props: ReduxType) {
  const classes = useStyles();
  const labels = props.item.labels || [];
  const checked = props.item.isFinish ? true : false;
  const [showDetails, setShowDetails] = React.useState(props.showDetails === void 0 ? true : props.showDetails);

  useEffect(() => {
    setShowDetails(props.showDetails === void 0 ? true : props.showDetails);
  }, [props.showDetails])

  const handleClick = (event: any) => {
    event.stopPropagation();
    if (!props.item.isFinish) {
      if (props.onClick) {
        props.onClick(props.item);
      }
    }
  }

  const handleChangeCheckbox = (e: any) => {
    e.stopPropagation();
    if (!props.item.isFinish) {
      props.toggleTodo();
    }
  }

  return (
    <Box my={0.5}>
      <Card>
        <CardActionArea onClick={handleClick}>
          <CardContent className={classes.root}>
            <div className={classes.fullWidth}>

              {/* 给CheckBox套上一层span，防止事件冒泡 */}
              <span onClick={e => { e.stopPropagation(); }}>
                <Checkbox className={getLevelColor(props.item)} color="default" checked={checked} onChange={(e) => handleChangeCheckbox(e)} />
              </span>
              <span className={classes.title}>
                {props.item.title}
              </span>
            </div>

            {
              showDetails
                ? <GridList className={`${classes.hidden} ${classes.fullWidth}`} style={{ margin: "0 0 5px 20px" }}>
                  {labels.map(item => (
                    <Label key={item.id} className={classes.marginRight} name={item.content} />
                  ))}
                </GridList>
                : null
            }
            {
              showDetails
                ? <div className={`${classes.hidden} ${classes.fullWidth}`} style={{ marginLeft: "20px" }}>
                  <Box mr={2} style={{ minWidth: "60px" }}>
                    <Typography variant="body2" color="textSecondary" component="p" noWrap={true}>
                      {formatDate(props.item.date)}
                    </Typography>
                  </Box>
                  <span style={{ alignSelf: "flex-end" }} className={`${classes.hidden}`}>
                    {props.item.hasAlarm ? <CustomIcon name="alarm" size={16} className={classes.marginRight} /> : null}
                    {props.item.hasCyclic ? <CustomIcon name="cyclic" size={16} className={classes.marginRight} /> : null}
                  </span>
                </div>
                : null
            }
          </CardContent>
        </CardActionArea>
      </Card>
    </Box>
  );
})
