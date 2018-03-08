// @flow
import React from 'react';
import TextField from 'material-ui/TextField';
import DatePicker from 'material-ui/DatePicker';
import TimePicker from 'material-ui/TimePicker';
import CalendarButton from './CalendarButton';

type Props = {
  userBuffer: Object,
  calendarLoading: boolean,
  type: string,
  onUpdateFieldEvent: Function,
  onSubmit: Function,
  onRemove: Function,
  handleClose: Function,
};

const ModalEvent = (props: Props) => {
  const {
    userBuffer,
    onUpdateFieldEvent,
    onSubmit,
    handleClose,
    onRemove,
    type,
    calendarLoading,
  } = props;
  const {
    title,
    start,
    end,
  } = userBuffer;

  return (
    <div>
      <TextField
        name="title"
        hintText="title"
        floatingLabelText="title"
        defaultValue={title}
        onChange={(evt, value) => onUpdateFieldEvent('title', value)}
      />
      <DatePicker
        name="start date"
        hintText="start date"
        floatingLabelText="start date"
        defaultDate={new Date(start)}
        onChange={(evt, value) => onUpdateFieldEvent('start date', value)}
      />
      <TimePicker
        name="start time"
        hintText="start time"
        floatingLabelText="start time"
        minutesStep={30}
        format="24hr"
        defaultTime={new Date(start)}
        onChange={(evt, value) => onUpdateFieldEvent('start time', value)}
      />
      <DatePicker
        name="end date"
        hintText="end sate"
        floatingLabelText="end date"
        defaultDate={new Date(end)}
        onChange={(evt, value) => onUpdateFieldEvent('end date', value)}
      />
      <TimePicker
        name="end time"
        hintText="end time"
        floatingLabelText="end time"
        minutesStep={30}
        format="24hr"
        defaultTime={new Date(end)}
        onChange={(evt, value) => onUpdateFieldEvent('end time', value)}
      />
      <CalendarButton
        type={type}
        calendarLoading={calendarLoading}
        onSubmit={onSubmit}
        handleClose={handleClose}
        onRemove={onRemove}
      />
    </div>
  );
};

export default ModalEvent;
