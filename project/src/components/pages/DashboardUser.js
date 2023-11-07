import Header from '../includes/Header';
import MyBurgerMenu from '../includes/MyBurgerMenu';
import Card from 'react-bootstrap/Card';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';
import { useState } from 'react';

const StyledCard = styled(Card)`
  transition: transform 0.2s;

  &:hover {
    transform: scale(1.05);
  }
`;

function DashboardUser() {
  const history = useHistory()

  function handleClick() {
    history.push("/list-pekerjaan");
  }
  const [profil, setProfil]=useState()

  return (
    <div>
      
      <MyBurgerMenu/>
      <Header></Header>
      <Container className='justify-content-center d-flex align-items-start flex-column p-3 pt-5'>
          <h1 className='m-0 light pt-5'>Selamat Pagi,</h1>
          <h1 >John Doe</h1>
          
          {/* <div style={{margin:"12px"}} className='border border-success pt-3'> */}
            
          {/* </div> */}
          <Container fluid>
            <Row >
              <Col md={4}>
                <StyledCard className='my-3 shadow' style={{height:'30vh'}} 
                onClick={handleClick}>
                  <Card.Body>
                    <Card.Title>Pekerjaan Idle</Card.Title>
                    <Card.Text style={{fontSize:'5rem'}}>1</Card.Text>
                  </Card.Body>
                </StyledCard>
              </Col>
              <Col md={4}>
                <StyledCard className='my-3 shadow' style={{height:'30vh'}}>
                  <Card.Body>
                    <Card.Title>Pekerjaan Berjalan</Card.Title>
                    <Card.Text style={{fontSize:'5rem'}}>2</Card.Text>
                  </Card.Body>
                </StyledCard>
              </Col>
              <Col md={4}>
                <StyledCard className='my-3 shadow' style={{height:'30vh'}}>
                  <Card.Body>
                    <Card.Title>Pekerjaan Selesai</Card.Title>
                    <Card.Text style={{fontSize:'5rem'}}>3</Card.Text>
                  </Card.Body>
                </StyledCard>
              </Col>
              
            </Row>
           </Container>
          
      </Container>
    </div>
  );
}

export default DashboardUser;
