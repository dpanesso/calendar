// @flow
import React from 'react';
import ModalEvent from './ModalEvent';


type Props = {
  open: Object,
  buffer: Object,
  updateKeyEvent: Function,
  handleClose: Function,
  onSubmit: Function,
};

const Modal = (props: Props) => {
  const {
    open,
    buffer,
    updateKeyEvent,
    handleClose,
    onSubmit,
  } = props;
  return (
    open.newMeetingModal === true ?
      <ModalEvent
        buffer={buffer}
        updateKeyEvent={updateKeyEvent}
        handleClose={handleClose}
        onSubmit={onSubmit}
        type="new meeting"
      /> :
      <ModalEvent
        buffer={buffer}
        updateKeyEvent={updateKeyEvent}
        handleClose={handleClose}
        onSubmit={onSubmit}
        type="update meeting"
      />
  );
};

export default Modal;
