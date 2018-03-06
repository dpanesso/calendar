const parseDates = events => (
  events.map((event) => {
    const localEvent = Object.assign({}, event);
    localEvent.start = new Date(event.start);
    localEvent.end = new Date(event.end);
    return localEvent;
  })
);

export default parseDates;
