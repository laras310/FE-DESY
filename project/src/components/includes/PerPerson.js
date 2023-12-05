import React from 'react';
import { Card, Col, Container, Form, Row, InputGroup, FormControl } from 'react-bootstrap';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import styled from 'styled-components';
import { Pagination } from 'rsuite';

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
    const [page, setPage] = useState(1)
    const [loading, setLoading] = useState(false);
    
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
    const fetchData = async () => {
      setLoading(true)
      try{
        const response = await axios.get(`${process.env.REACT_APP_API_JOBCARD}/task/each-user`, {
          headers:{
            Authorization: 'Bearer' + sessionStorage.getItem('access_token'),
          },
          params:{
            page,
          },
          'Access-Control-Allow-Origin':'*',
        });
        const newData=response.data.data;
        setData(newData);
        setFilteredData(newData);
      } catch(error){
        console.error('error fetching data:', error);
      }finally{
        setLoading(false);
      }
    };
    fetchData()
  }, [page]);
  const dataPaginated = filteredData.slice((page - 1) * 9, page * 9);
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
      {dataPaginated.map((item) => 
          <Col md={4} key={item.id}>
            <StyledCard className='my-3 shadow' style={{ minHeight: '30vh' }}>
              <Card.Body className='text-center'>
                <Card.Title className='text-truncate'>{item.name}</Card.Title>
                <Card.Subtitle className='text-truncate'>{item.role[0].position.name}</Card.Subtitle>
                <hr></hr>

                <Card.Text className='d-flex justify-content-center flex-row'>
                  <StyledContainer className='d-flex justify-content-center flex-column'
                  onClick={()=>history.push("/list-pekerjaan", {status:'idle', data:item.tasks.idle})}>
                    <h5>Idle</h5>
                    <p className='fs-1'>
                      {item.tasks.idle.length}
                      </p>
                  </StyledContainer>
                  <StyledContainer className='d-flex justify-content-center flex-column'
                  onClick={()=>history.push("/list-pekerjaan", {status:'progress', data:item.tasks.progress})}>
                    <h5>Berjalan</h5>
                    <p className='fs-1'>{item.tasks.progress.length}</p>
                  </StyledContainer>
                  <StyledContainer className='d-flex justify-content-center flex-column'
                  onClick={()=>history.push("/list-pekerjaan", {status:'done', data:item.tasks.done})}>
                    <h5>Selesai</h5>
                    <p className='fs-1'>{item.tasks.done.length}</p>
                  </StyledContainer>
                </Card.Text>
              </Card.Body>
            </StyledCard>
          </Col>
      )}
      <div style={{padding:20}}>
      <Pagination 
      prev
      next
      last
      first
      maxButtons={5}
      size='xs'
      layout={['total', '-',  '|', 'pager']}
      total={filteredData.length} 
      limit={9} 
      activePage={page} 
      onChangePage={setPage} />
      </div>
    </>
  );
};

export default PersonCard;
