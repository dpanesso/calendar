// @flow
import React from 'react';
import Dialog from 'material-ui/Dialog';
import BigCalendar from 'react-big-calendar';
import moment from 'moment';
import Modal from './Modal';


// Setup the localizer by providing the moment (or globalize) Object
// to the correct localizer.
BigCalendar.momentLocalizer(moment); // or globalizeLocalizer

type Props = {
  events: Function,
  handleOpen: Function,
  handleClose: Function,
  onSubmit: Function,
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
  } = props;
  return (
    <div>
      <BigCalendar
        selectable
        events={events}
        defaultView="week"
        scrollToTime={new Date(1970, 1, 1, 6)}
        defaultDate={new Date(2015, 3, 12)}
        onSelectEvent={handleOpen}
        onSelectSlot={handleOpen}
      />
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
        />
      </Dialog>
    </div>
  );
};

export default Calendar;
