import React from 'react';
import AppBar from '@material-ui/core/AppBar';


export default function HeaderLayout(props: any) {
  return (
    <AppBar position="static" style={{height: "60px"}}>
      {props.children}
    </AppBar>
  )
}
