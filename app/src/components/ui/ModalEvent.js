// @flow
import React from 'react';
import TextField from 'material-ui/TextField';
import DatePicker from 'material-ui/DatePicker';
import TimePicker from 'material-ui/TimePicker';
import RaisedButton from 'material-ui/RaisedButton';
import { defaultTitle } from '../../constants';

type Props = {
  buffer: {
    title: string,
    start: Date,
    end: Date
  },
  updateKeyEvent: Function,
  onSubmit: Function,
  handleClose: Function,
  type: string,
};

const ModalEvent = (props: Props) => {
  const {
    buffer,
    updateKeyEvent,
    onSubmit,
    handleClose,
    type,
  } = props;
  const {
    title,
    start,
    end,
  } = buffer;

  return (
    <div>
      <TextField
        name="title"
        hintText="title"
        floatingLabelText="title"
        defaultValue={title || defaultTitle}
        onChange={(evt, value) => updateKeyEvent('title', value)}
      />
      <DatePicker
        name="start date"
        hintText="start date"
        floatingLabelText="start date"
        defaultDate={start}
        onChange={(evt, value) => updateKeyEvent('start date', value)}
      />
      <TimePicker
        name="start time"
        hintText="start time"
        floatingLabelText="start time"
        minutesStep={30}
        format="24hr"
        defaultTime={new Date(start)}
        onChange={(evt, value) => updateKeyEvent('start time', value)}
      />
      <DatePicker
        name="end date"
        hintText="end sate"
        floatingLabelText="end date"
        defaultDate={end}
        onChange={(evt, value) => updateKeyEvent('end date', value)}
      />
      <TimePicker
        name="end time"
        hintText="end time"
        floatingLabelText="end time"
        minutesStep={30}
        format="24hr"
        defaultTime={new Date(end)}
        onChange={(evt, value) => updateKeyEvent('end time', value)}
      />
      <RaisedButton
        label="Cancel"
        primary={true}
        style={{ marginRight: '20px' }}
        onClick={handleClose}
      />,
      <RaisedButton
        label="Submit"
        primary={true}
        onClick={() => onSubmit(type)}
      />
    </div>
  );
};

export default ModalEvent;
