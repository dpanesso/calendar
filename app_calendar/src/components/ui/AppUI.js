// @flow
import React, { Component } from 'react';
import BigCalendar from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import events from '../../calendar/events';
import Navbar from './Navbar';

// Setup the localizer by providing the moment (or globalize) Object
// to the correct localizer.
BigCalendar.momentLocalizer(moment); // or globalizeLocalizer

class AppUI extends Component {
  render() {
    return (
      <div className="App">
        <Navbar />
        <BigCalendar
          selectable
          events={events}
          defaultView="week"
          scrollToTime={new Date(1970, 1, 1, 6)}
          defaultDate={new Date(2015, 3, 12)}
          onSelectEvent={event => alert(event.title)}
          onSelectSlot={slotInfo => alert(`selected slot: \n\nstart ${slotInfo.start.toLocaleString()} ` +
                                          `\nend: ${slotInfo.end.toLocaleString()}` +
                                          `\naction: ${slotInfo.action}`)
          }
        />
      </div>
    );
  }
}

export default AppUI;
