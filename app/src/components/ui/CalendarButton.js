// @flow
import React from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import MaterialLoader from './MaterialLoader';
import '../../styles/loaders.css';

type Props = {
  calendarLoading: boolean,
  type: string,
  onSubmit: Function,
  handleClose: Function,
  onRemove: Function,
}

const CalendarButton = (props: Props) => {
  const {
    type,
    calendarLoading,
    onSubmit,
    onRemove,
    handleClose,
  } = props;
  const displayRemove = type === 'update meeting' ?
    { display: 'inline-block' } :
    { display: 'none' };

  return calendarLoading === true ?
    <div className="calendarLoader">
      <MaterialLoader size={10} />
    </div> :
    <div>
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
    </div>;
};

export default CalendarButton;
