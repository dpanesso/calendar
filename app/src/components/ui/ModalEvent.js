// @flow
import React from 'react';
import TextField from 'material-ui/TextField';
import DatePicker from 'material-ui/DatePicker';
import TimePicker from 'material-ui/TimePicker';
import RaisedButton from 'material-ui/RaisedButton';

type Props = {
  userBuffer: Object,
  onUpdateFieldEvent: Function,
  onSubmit: Function,
  onRemove: Function,
  handleClose: Function,
  type: string,
};

const ModalEvent = (props: Props) => {
  const {
    userBuffer,
    onUpdateFieldEvent,
    onSubmit,
    handleClose,
    onRemove,
    type,
  } = props;
  const {
    title,
    start,
    end,
  } = userBuffer;
  const displayRemove = type === 'update meeting' ?
    { display: 'inline-block' } :
    { display: 'none' };

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
      <RaisedButton
        label="Remove"
        primary={true}
        onClick={onRemove}
        style={displayRemove}
      />
      <RaisedButton
        label="Cancel"
        primary={true}
        style={{ margin: '10px 10px', textAlign: 'center' }}
        onClick={handleClose}
      />
      <RaisedButton
        label="Submit"
        primary={true}
        onClick={() => onSubmit(type)}
      />
    </div>
  );
};

export default ModalEvent;
