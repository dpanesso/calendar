// @flow
import React from 'react';
import EventModal from './EventModal';
import SlotModal from './SlotModal';


type Props = {
  open: Object,
  event: Object,
  slotInfo: Object,
}

const Modal = (props: Props) => {
  const { open, event, slotInfo } = props;
  return (
    open.eventModal === true ?
      <EventModal event={event} /> :
      <SlotModal slot={slotInfo} />
  );
};

export default Modal;
