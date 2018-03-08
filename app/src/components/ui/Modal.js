// @flow
import React from 'react';
import ModalEvent from './ModalEvent';


type Props = {
  userOpenNew: boolean,
  userBuffer: Object,
  onUpdateFieldEvent: Function,
  handleClose: Function,
  onSubmit: Function,
  onRemove: Function,
};

const Modal = (props: Props) => {
  const {
    userOpenNew,
    userBuffer,
    onUpdateFieldEvent,
    handleClose,
    onSubmit,
    onRemove,
  } = props;
  const type = userOpenNew ? 'new meeting' : 'update meeting';
  return (
    <ModalEvent
      userBuffer={userBuffer}
      onUpdateFieldEvent={onUpdateFieldEvent}
      handleClose={handleClose}
      onSubmit={onSubmit}
      onRemove={onRemove}
      type={type}
    />
  );
};

export default Modal;
