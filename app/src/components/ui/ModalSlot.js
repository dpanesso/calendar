// @flow
import React from 'react';
import TextField from 'material-ui/TextField';
import DatePicker from 'material-ui/DatePicker';
import TimePicker from 'material-ui/TimePicker';

type Props = {
  slotInfo: {
    start: Date,
    end: Date
  },
  updateKeyEvent: Function,
};

const ModalSlot = (props: Props) => {
  const {
    slotInfo,
    updateKeyEvent,
  } = props;
  const {
    start,
    end,
  } = slotInfo;

  return (
    <div>
      <TextField
        name="title"
        hintText="title"
        floatingLabelText="title"
        defaultValue="Bunga-Bunga"
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
        hintText="start time"
        floatingLabelText="start time"
        minutesStep={30}
        format="24hr"
        defaultTime={new Date(end)}
        onChange={(evt, value) => updateKeyEvent('end time', value)}
      />
    </div>
  );
};

export default ModalSlot;
