import React from 'react';
import { useState } from 'react';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import ToggleButton from 'react-bootstrap/ToggleButton';

function FilterBar({ handleFilterByUnit, handleFilterByPerson }) {
    const [checked, setChecked] = useState(false);
    const [radioValue, setRadioValue] = useState('1');
  
    const radios = [
      { name: 'Per Person', value: '1' },
      { name: 'Per Unit', value: '2' },
    //   { name: 'Radio', value: '3' },
    ];
  return (
    // <div>
    //   <Button onClick={handleFilterByUnit}>Filter by Unit</Button>
    //   <Button onClick={handleFilterByPerson}>Filter by Person</Button>
    // </div>
    <>
      <ButtonGroup style={{padding: "0 12px"}} className='mt-3'>
        {radios.map((radio, idx) => (
          <ToggleButton
            key={idx}
            id={`radio-${idx}`}
            type="radio"
            variant={idx % 2 ? 'outline-success' : 'outline-danger'}
            name="radio"
            value={radio.value}
            checked={radioValue === radio.value}
            onChange={(e) => setRadioValue(e.currentTarget.value)}
          >
            {radio.name}
          </ToggleButton>
        ))}
      </ButtonGroup>
    </>
  );
}

export default FilterBar;