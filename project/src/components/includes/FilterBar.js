import React from 'react';
import { useState, useEffect } from 'react';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import ToggleButton from 'react-bootstrap/ToggleButton';
import { Container, Row,Col, Card } from "react-bootstrap";
import axios from 'axios';
import ProjectCard from './PerUnit';
import PersonCard from './PerPerson';

function FilterBar() {
    const [radioValue, setRadioValue] = useState('person');
    const [searchData, setSearchData] = useState([]);
  
    const radios = [
      { name: 'Per Person', value: 'person' },
      { name: 'Per Unit', value: 'unit' }
    ];

  return (
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
      <Container fluid>
            <Row>
              {radioValue ==="person" ?               
              <>
              <PersonCard/>
              </>
              : <ProjectCard />
              }

            </Row>
           </Container>
    </>
  );
}

export default FilterBar;