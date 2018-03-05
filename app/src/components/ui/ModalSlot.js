// @flow
import React from 'react';


const ModalSlot = ({ slot }: Object) => {
  const { start, end } = slot;
  return (
    <div>
      <p>start: {start.toLocaleString()}</p>
      <p>end: {end.toLocaleString()}</p>
    </div>
  );
};

export default ModalSlot;
