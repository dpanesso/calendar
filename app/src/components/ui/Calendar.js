// @flow
import React from 'react';
import Dialog from 'material-ui/Dialog';
import BigCalendar from 'react-big-calendar';
import moment from 'moment';
import Modal from './Modal';
import Dapp from './Dapp';
// Setup the localizer by providing the moment (or globalize) Object
// to the correct localizer.
BigCalendar.momentLocalizer(moment); // or globalizeLocalizer

type Props = {
  events: Function,
  handleOpen: Function,
  handleClose: Function,
  onSubmit: Function,
  onRemove: Function,
  onUpdateFieldEvent: Function,
  open: boolean,
  userOpenNew: boolean,
  userBuffer: Object,
}


const Calendar = (props: Props) => {
  const {
    events,
    handleOpen,
    handleClose,
    onSubmit,
    onUpdateFieldEvent,
    open,
    userOpenNew,
    userBuffer,
    onRemove,
    toggleDapp,
  } = props;
  return (
    <div>
      <h1>My calendar</h1>
      <BigCalendar
        selectable
        events={events}
        defaultView="week"
        scrollToTime={new Date(1970, 1, 1, 6)}
        defaultDate={new Date(2015, 3, 12)}
        onSelectEvent={handleOpen}
        onSelectSlot={handleOpen}
      />
      {(toggleDapp)?<Dapp/>:<div></div>}
      <Dialog
        modal={false}
        open={open}
        onRequestClose={handleClose}
        autoScrollBodyContent={true}
        contentStyle={{ width: '350px' }}
      >
        <Modal
          userOpenNew={userOpenNew}
          userBuffer={userBuffer}
          onUpdateFieldEvent={onUpdateFieldEvent}
          handleClose={handleClose}
          onSubmit={onSubmit}
          onRemove={onRemove}
        />
      </Dialog>
    </div>
  );
};

export default Calendar;
