// @flow
import React from 'react';
import ModalEvent from './ModalEvent';
import ModalSlot from './ModalSlot';


type Props = {
  open: Object,
  event: Object,
  slotInfo: Object,
  updateKeyEvent: Function,
};

const Modal = (props: Props) => {
  const {
    open,
    event,
    slotInfo,
    updateKeyEvent,
  } = props;
  return (
    open.eventModal === true ?
      <ModalEvent event={event} updateKeyEvent={updateKeyEvent} /> :
      <ModalSlot slot={slotInfo} updateKeyEvent={updateKeyEvent} />
  );
};

export default Modal;
