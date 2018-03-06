// @flow
import React from 'react';
import ModalEvent from './ModalEvent';


type Props = {
  userOpenNew: boolean,
  userBuffer: Object,
  onUpdateFieldEvent: Function,
  handleClose: Function,
  onSubmit: Function,
};

const Modal = (props: Props) => {
  const {
    userOpenNew,
    userBuffer,
    onUpdateFieldEvent,
    handleClose,
    onSubmit,
  } = props;
  const type = userOpenNew ? 'new meeting' : 'update meeting';
  return (
    userOpenNew === true ?
      <ModalEvent
        userBuffer={userBuffer}
        onUpdateFieldEvent={onUpdateFieldEvent}
        handleClose={handleClose}
        onSubmit={onSubmit}
        type={type}
      /> :
      <ModalEvent
        userBuffer={userBuffer}
        onUpdateFieldEvent={onUpdateFieldEvent}
        handleClose={handleClose}
        onSubmit={onSubmit}
        type={type}
      />
  );
};

export default Modal;
