// @flow
import React from 'react';


const SlotModal = (slotInfo: Object) => {
  return (
    <div>
      <p>start: {slotInfo.slot.start.toLocaleString()}</p>
      <p>end: {slotInfo.slot.end.toLocaleString()}</p>
    </div>
  );
};

export default SlotModal;
