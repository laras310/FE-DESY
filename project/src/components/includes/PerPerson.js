import React from 'react';
import { Card, Col, Container, Form, Row, InputGroup, FormControl } from 'react-bootstrap';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import styled from 'styled-components';

const StyledCard = styled(Card)`
  // cursor: pointer; 
  transition: transform 0.2s;

  &:hover {
    transform: scale(1.05);
  }
`;

const StyledContainer = styled(Container)`
  cursor: pointer; 
  transition: transform 0.2s;

  &:hover {
    // transform: scale(1.05);
    color: #007BFF;
  }
`;


const PersonCard = () => {
    const [data, setData]=useState([])
    const [searchTerm, setSearchTerm] =useState('')
    const history=useHistory()
    
    const [filteredData, setFilteredData] = useState([]);
    const handleSearch = (e) => {
        const searchTerm = e.target.value;
        setSearchTerm(searchTerm);
        // Lakukan sesuatu dengan nilai pencarian, misalnya filter data
        const filteredData = data.filter((item) =>
        item.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredData(filteredData);
      };
    useEffect(() => {
        axios({
          method: "GET",
          url:"https://jobcard-api.pins.co.id/api/task/each-user",
          headers: {
            Authorization: 'Bearer ' + localStorage.getItem('access_token')
          },
          'Access-Control-Allow-Origin':'*'
        })
          .then((response) => {
            const res = response.data.data;
            setData(res);
            setFilteredData(res)
          })
          .catch((error) => {
            if (error.response) {
              console.log(error.response.data);
              console.log(error.response.status);
              console.log(error.response.headers);
            } else if (error.request) {
              console.log(error.request);
            } else {
              console.log(error.message);
            }
          });
      }, []);

  const calculateProjectCounts = (tasks) => {
    let idleCount = 0;
    let onProgressCount = 0;
    let finishedCount = 0;

    tasks.forEach((task) => {
      switch (task.status) {
        case 'Idle':
          idleCount++;
          break;
        case 'On progress':
          onProgressCount++;
          break;
        case 'Finished':
          finishedCount++;
          break;
        default:
          // Do nothing for other statuses
          break;
      }
    });

    return { idleCount, onProgressCount, finishedCount };
  };

  return (
    <>
    <Container fluid className="mt-3">
        <Row>
          <Col >
            <Form className="d-flex">
              <InputGroup>
                <InputGroup.Text className="bg-white" >
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-search" viewBox="0 0 16 16">
                    <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z"/>
                </svg>
                </InputGroup.Text>
                <FormControl type="search" placeholder="Search" onChange={handleSearch} value={searchTerm}/>
              </InputGroup> 
            </Form>
          </Col>
        </Row>
      </Container>
      {filteredData.map((item) => {
        const { idleCount, onProgressCount, finishedCount } = calculateProjectCounts(item.tasks);

        return (
          <Col md={4} key={item.id}>
            <StyledCard className='my-3 shadow' style={{ minHeight: '30vh' }}>
              <Card.Body className='text-center'>
                <Card.Title className='text-truncate'>{item.name}</Card.Title>
                <Card.Subtitle className='text-truncate'>{item.role[0].position.name}</Card.Subtitle>
                <hr></hr>

                <Card.Text className='d-flex justify-content-center flex-row'>
                  <StyledContainer className='d-flex justify-content-center flex-column'
                  onClick={()=>history.push("/list-pekerjaan", {status:'idle', user_id:item.id})}>
                    <h5>Idle</h5>
                    <p className='fs-1'>{idleCount}</p>
                  </StyledContainer>
                  <StyledContainer className='d-flex justify-content-center flex-column'
                  onClick={()=>history.push("/list-pekerjaan", {status:'On progress', user_id:item.id})}>
                    <h5>Berjalan</h5>
                    <p className='fs-1'>{onProgressCount}</p>
                  </StyledContainer>
                  <StyledContainer className='d-flex justify-content-center flex-column'
                  onClick={()=>history.push("/list-pekerjaan", {status:'finished', user_id:item.id})}>
                    <h5>Selesai</h5>
                    <p className='fs-1'>{finishedCount}</p>
                  </StyledContainer>
                </Card.Text>
              </Card.Body>
            </StyledCard>
          </Col>
        );
      })}
    </>
  );
};

export default PersonCard;
