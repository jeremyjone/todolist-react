import React from 'react';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import { deepOrange } from '@material-ui/core/colors';


function getSize(classes: Record<any, string>, size: string) {
    switch (size) {
        case "large":
            return classes.large;
        default:
            return classes.small;
    }
}


interface Props {
    size?: string
    onClick?: Function
    style?: Object
    text?: string
}


const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            '& > *': {
                margin: theme.spacing(1),
            },
        },
        orange: {
            color: theme.palette.getContrastText(deepOrange[500]),
            backgroundColor: deepOrange[500],
        },
        small: {
            width: theme.spacing(3),
            height: theme.spacing(3),
        },
        large: {
            width: theme.spacing(7),
            height: theme.spacing(7),
        },
        text: {
            display: "block",
            fontSize: "18px",
            fontWeight: "bold",
            marginLeft: "15px"
        }
    }),
);


export default function CustomAvatar(props: Props) {
    const classes = useStyles();

    const handleClick = () => {
        if (props.onClick) props.onClick();
    }

    return (
        <div className={classes.root} onClick={handleClick} style={props.style}>
            <Avatar alt="Jeremy Jone" src="https://jeremyjone.github.io/toolbox/test/images/pic2(640x640).jpg" className={getSize(classes, props.size || "")} />
            <div className={classes.text}>{props.text}</div>
        </div>
    );
}
