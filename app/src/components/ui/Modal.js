// @flow
import React from 'react';
import ModalEvent from './ModalEvent';


type Props = {
  open: Object,
  buffer: Object,
  onUpdateKeyEvent: Function,
  handleClose: Function,
  onSubmit: Function,
};

const Modal = (props: Props) => {
  const {
    open,
    buffer,
    onUpdateKeyEvent,
    handleClose,
    onSubmit,
  } = props;
  return (
    open.newMeetingModal === true ?
      <ModalEvent
        buffer={buffer}
        onUpdateKeyEvent={onUpdateKeyEvent}
        handleClose={handleClose}
        onSubmit={onSubmit}
        type="new meeting"
      /> :
      <ModalEvent
        buffer={buffer}
        onUpdateKeyEvent={onUpdateKeyEvent}
        handleClose={handleClose}
        onSubmit={onSubmit}
        type="update meeting"
      />
  );
};

export default Modal;
