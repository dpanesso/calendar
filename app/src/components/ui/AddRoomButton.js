// @flow
import React from 'react';
import TextField from 'material-ui/TextField';
import FlatButton from 'material-ui/FlatButton';
import { roomNames } from '../../constants';
import '../../styles/addRoom.css';

type Props = {
  userBuffer: Object,
  onUpdateFieldEvent: Function,
}

const getRoomName = () => {
  const { length } = roomNames;
  const index = Math.floor(Math.random() * length);
  console.log(index);
  return roomNames[index];
};

const AddRoomButton = (props: Props) => {
  const { userBuffer, onUpdateFieldEvent } = props;
  return (
    <div className="addRoom">
      <TextField
        disabled={true}
        hintText={userBuffer.room || 'Click to add a room.'}
        style={{ width: '50%' }}
      /><br />
      <FlatButton
        id="addRoomButton"
        style={{ marginTop: '10px' }}
        label="Add"
        primary={true}
        onClick={() => onUpdateFieldEvent('room', getRoomName())}
      />
    </div>
  );
};

export default AddRoomButton;
