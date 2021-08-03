import React, { useState } from 'react';

function RangeSlider({ minVal, maxVal, filterResults, step }) {
  const [rangeval, setRangeval] = useState(null);

  const changeRangeValues = function (event) {
    setRangeval(event.target.value);
    if (event.target.value) {
      document.getElementById('range').value = event.target.value;
    }

    filterResults(event.target.value);
  };

  return (
    <div className='range'>
      <input
        id='range'
        type='range'
        step={step}
        className='range-slider'
        min={minVal}
        max={maxVal}
        onChange={changeRangeValues}
      />
      <input
        className='range-text'
        type='number'
        max={maxVal}
        onChange={changeRangeValues}
        value={rangeval}
      ></input>
    </div>
  );
}

export default RangeSlider;
