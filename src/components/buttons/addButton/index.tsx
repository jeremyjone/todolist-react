import React from 'react';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';


const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    addBtn: {
      padding: theme.spacing(2),
      position: "absolute",
      right: "20px",
      bottom: "80px",
      borderRadius: "50%",
      width: "70px",
      height: "70px"
    }
  })
)


interface IProps {
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
}


export default function AddButton(props: IProps) {
  const classes = useStyles();

  return (
    <Button
      variant="contained"
      color="primary"
      size="large"
      className={classes.addBtn}
      onClick={props.onClick}
    >
      <AddIcon />
    </Button>
  )
}
