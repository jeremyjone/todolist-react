import React, { useEffect } from "react";
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import 'date-fns';
import DateFnsUtils from '@date-io/date-fns';
import zhLocale from "date-fns/locale/zh-CN";
import { WrapperVariant } from "@material-ui/pickers/wrappers/Wrapper";
import {
  MuiPickersUtilsProvider,
  TimePicker,
  DatePicker,
} from '@material-ui/pickers';
import { MaterialUiPickersDate } from "@material-ui/pickers/typings/date";
import { createUuid } from "../../utils";
import Badge from "@material-ui/core/Badge";
import dayjs, { Dayjs } from 'dayjs';
import moment, { Moment } from 'moment';
import { DateTime } from 'luxon';


const useStyles = makeStyles((theme: Theme) => {
  return createStyles({
    alignCenter: {
      "& input": {
        textAlign: "center"
      }
    },

    badgeDot: {
      "& > span": {
        left: "19px",
        bottom: "5px"
      }
    }
  })
})


export function makeJSDateObject(date: Date | Moment | DateTime | Dayjs) {
  if (date instanceof dayjs) {
    return (date as Dayjs).clone().toDate();
  }

  if (moment.isMoment(date)) {
    return (date as Moment).clone().toDate();
  }

  if (date instanceof DateTime) {
    return date.toJSDate();
  }

  if (date instanceof Date) {
    return new Date(date.getTime());
  }

  return new Date(date as any); // handle case with invalid input
}


interface IProps {
  date?: Date;
  onSave?: (date?: Date) => void;
  variant?: WrapperVariant;
  disableToolbar?: boolean;
  format?: string;
  textCenter?: boolean;
  labelFunc?: (date: MaterialUiPickersDate, invalidLabel: string) => string;
  autoOk?: boolean;
  fullWidth?: boolean;
  clearable?: boolean;
  style?: React.CSSProperties | undefined;
}


interface IDateProps extends IProps {
  disablePast?: boolean;
  eventList?: Number[];
  onMonthChange?: (date: Date) => void;
}


interface ITimeProps extends IProps {
  ampm?: boolean;
}


export function JDatePicker(props: IDateProps) {
  // The first commit of Material-UI
  const classes = useStyles();

  const [selectedDate, setSelectedDate] = React.useState<Date | undefined>(
    props.date,
  );
  const [eventList, setEventList] = React.useState<Array<Number>>(props.eventList || []);

  useEffect(() => {
    setSelectedDate(props.date);
  }, [props.date]);

  useEffect(() => {
    setEventList(props.eventList || []);
  }, [props.eventList])

  const handleDateChange = (date: Date | null | undefined) => {
    setSelectedDate(date as (Date | undefined));
    props.onSave ? props.onSave(date as Date | undefined) : void 0;
  };

  const handleMonthChange = (date: MaterialUiPickersDate) => {
    const d = makeJSDateObject(date as any);
    if (props.onMonthChange) props.onMonthChange(d);
  }

  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils} locale={zhLocale}>
      <DatePicker
        disableToolbar={props.disableToolbar}
        autoOk={props.autoOk === void 0 ? true : props.autoOk}
        disablePast={props.disablePast}
        showTodayButton
        variant={props.variant}
        format={props.format || "yyyy-MM-dd"}
        id={"date-picker-" + createUuid(5)}
        cancelLabel="取消"
        okLabel="确定"
        todayLabel="转到今天"
        clearLabel="清除"
        invalidLabel="无效"
        clearable={props.clearable}
        labelFunc={props.labelFunc}
        fullWidth={props.fullWidth}
        value={selectedDate}
        onChange={handleDateChange}
        className={props.textCenter ? classes.alignCenter : ""}
        style={props.style}
        onMonthChange={handleMonthChange}
        renderDay={(day, selectedDate, isInCurrentMonth, dayComponent) => {
          const date = makeJSDateObject(day as any);
          const hasEvent = isInCurrentMonth && eventList.includes(date.getDate());
          if (hasEvent) return <Badge color="secondary" variant="dot" anchorOrigin={{ horizontal: "left", vertical: "bottom" }} className={classes.badgeDot}>{dayComponent}</Badge>
          else return dayComponent
        }}
      />
    </MuiPickersUtilsProvider>
  );
}

export function JTimePicker(props: ITimeProps) {
  // The first commit of Material-UI
  const classes = useStyles();

  const [selectedDate, setSelectedDate] = React.useState<Date | undefined>(
    props.date || new Date(),
  );

  useEffect(() => {
    setSelectedDate(props.date);
  }, [props.date]);

  const handleDateChange = (date: Date | null | undefined) => {
    setSelectedDate(date as (Date | undefined));
    props.onSave ? props.onSave(date as Date | undefined) : void 0;
  };

  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils} locale={zhLocale}>
      <TimePicker
        disableToolbar={props.disableToolbar}
        autoOk={props.autoOk === void 0 ? true : props.autoOk}
        ampm={Boolean(props.ampm)}
        variant={props.variant}
        format={props.format || "HH:mm:ss"}
        id={"time-picker-" + createUuid(5)}
        cancelLabel="取消"
        okLabel="确定"
        todayLabel="转到今天"
        clearLabel="清除"
        invalidLabel="无效"
        clearable={props.clearable}
        labelFunc={props.labelFunc}
        fullWidth={props.fullWidth}
        value={selectedDate}
        onChange={handleDateChange}
        className={`${props.textCenter ? classes.alignCenter : ""}`}
        style={props.style}
      />
    </MuiPickersUtilsProvider>
  );
}
