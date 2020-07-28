/*
 * @Author: JeremyJone
 * @Date: 2020-07-23 09:58:29
 * @LastEditors: JeremyJone
 * @LastEditTime: 2020-07-24 14:45:25
 * @Description: 使用 Snackbar 封装的 Toast ，外部直接使用函数
 * @Example: Toast.info("message", 2000?, callback?);
 */
import React from "react";
import ReactDOM from "react-dom";
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import Snackbar, { SnackbarOrigin } from '@material-ui/core/Snackbar';

function createNotification(type: string, content: string, duration: number, onClose: Function, onEntered: Function) {
  const div = document.createElement("div");
  document.body.appendChild(div);
  ReactDOM.render(<Toast open={true} message={content} type={type} duration={duration} onClose={onClose} onEntered={onEntered} />, div);
}


export default {
  info(content: string, duration: number = 2000, onClose: Function = () => { }, onEntered: Function = () => { }) {
    return createNotification("info", content, duration, onClose, onEntered);
  },

  success(content: string, duration: number = 2000, onClose: Function = () => { }, onEntered: Function = () => { }) {
    return createNotification("success", content, duration, onClose, onEntered);
  },

  warning(content: string, duration: number = 2000, onClose: Function = () => { }, onEntered: Function = () => { }) {
    return createNotification("warning", content, duration, onClose, onEntered);
  },

  error(content: string, duration: number = 2000, onClose: Function = () => { }, onEntered: Function = () => { }) {
    return createNotification("error", content, duration, onClose, onEntered);
  }
}


const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    info: {
      "& > div": {
        backgroundColor: "grey"
      }
    },

    success: {
      "& > div": {
        backgroundColor: "green"
      }
    },

    warning: {
      "& > div": {
        backgroundColor: "orange"
      }
    },

    error: {
      "& > div": {
        backgroundColor: "red"
      }
    }
  })
)


interface State extends SnackbarOrigin {
  open: boolean;
}


interface IProps {
  open: boolean;
  message: string;
  type: string;
  duration: number;
  onClose: Function;
  onEntered: Function;
}


function getClass(classes: any, type: string) {
  switch (type) {
    case "success":
      return classes.success;
    case "warning":
      return classes.warning;
    case "error":
      return classes.error;
    default:
      return classes.info
  }
}


function Toast(props: IProps) {
  const classes = useStyles();

  const [state, setState] = React.useState<State>({
    open: props.open,
    vertical: 'top',
    horizontal: 'center',
  });
  const { vertical, horizontal, open } = state;

  const handleClose = () => {
    setState({ ...state, open: false });
    props.onClose();
  };

  return (
    <div>
      <Snackbar
        anchorOrigin={{ vertical, horizontal }}
        open={open}
        autoHideDuration={props.duration}
        onEntered={() => props.onEntered()}
        onClose={handleClose}
        message={props.message}
        key={vertical + horizontal}
        className={getClass(classes, props.type)}
      />
    </div>
  );
}
