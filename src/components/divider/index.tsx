import React from 'react';
import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";


const useStyles = makeStyles((theme: Theme) => (
  createStyles({
    root: {
      width: "100%",
      height: "20px",
      lineHeight: "20px",
      fontSize: "12px",
      backgroundColor: "lightgrey",
      paddingLeft: "10px",
      boxShadow: "0px 2px 3px 1px grey",
    }
  })
))


interface IProps {
  text?: string
}


export default function JDivider(props: IProps) {
  const classes = useStyles();

  return (
    <div className={classes.root}>{props.text}</div>
  )
}
