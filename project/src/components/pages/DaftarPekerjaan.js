import Header from '../includes/Header';
import MyBurgerMenu from '../includes/MyBurgerMenu';
import Card from 'react-bootstrap/Card';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';
import { Button} from 'react-bootstrap';
import { useState } from 'react';
import ModalPekerjaan from '../includes/ModalPekerjaan';

const StyledCard = styled(Card)`
  transition: transform 0.2s;

  &:hover {
    transform: scale(1.05);
  }
`;

function DaftarPekerjaan() {
  const history = useHistory()
  const [modalShow, setModalShow] =useState(false)

  return (
    <div>
      
      <MyBurgerMenu/>
      <Header></Header>
      <Container className='justify-content-center d-flex align-items-start flex-column p-3 pt-5'>

          <Container className='border shadow rounded' fluid>
            <h3>Project task Berbintang</h3>
            <Row >
              <Col md={4}>
                <StyledCard className='my-3 '  
                // onClick={handleClick}
                >
                  <Card.Body>
                    <Card.Title>Pekerjaan Idle</Card.Title>
                    <Card.Text >1</Card.Text>
                    <Button onClick={() => setModalShow(true)}>Update Cepat</Button>
                    
                  </Card.Body>
                </StyledCard>
                {/* </Container> */}
                
              </Col>
              <Col md={4}>
                <StyledCard className='my-3 ' >
                  <Card.Body>
                    <Card.Title>Pekerjaan Berjalan</Card.Title>
                    <Card.Text >2</Card.Text>
                    <Button onClick={() => setModalShow(true)}>Update Cepat</Button>
                  </Card.Body>
                </StyledCard>
              </Col>
              <Col md={4}>
                <StyledCard className='my-3 ' >
                  <Card.Body>
                    <Card.Title>Pekerjaan Selesai</Card.Title>
                    <Card.Text >3</Card.Text>
                    <Button onClick={() => setModalShow(true)}>Update Cepat</Button>
                  </Card.Body>
                </StyledCard>
              </Col>
              
            </Row>
           </Container>
           <ModalPekerjaan
           show={modalShow}
        onHide={() => setModalShow(false)}
           />
           
      </Container>
      <Container>
        {/* <h3>Project Berjalan</h3> */}
        <Row>
            <Col>
                <Card className="shadow p-4">
                    <h3>Project Berjalan</h3>
                    <StyledCard className="mt-3 p-2">
                        <Card.Title>Smart Branch Solution</Card.Title>
                        <Card.Subtitle>Abhiyoga - Enterpirise</Card.Subtitle>
                    </StyledCard>
                    <StyledCard className="mt-3 p-2">
                        <Card.Title>Smart Branch Solution</Card.Title>
                        <Card.Subtitle>Abhiyoga - Enterpirise</Card.Subtitle>
                    </StyledCard>
                    <StyledCard className="mt-3 p-2">
                        <Card.Title>Smart Branch Solution</Card.Title>
                        <Card.Subtitle>Abhiyoga - Enterpirise</Card.Subtitle>
                    </StyledCard>
                </Card>
            </Col>
            <Col>
            <Card className="shadow p-4">
                    <h3>Project Berjalan</h3>
                    <StyledCard className="mt-3 p-2">
                        <Card.Title>Smart Branch Solution</Card.Title>
                        <Card.Subtitle>Abhiyoga - Enterpirise</Card.Subtitle>
                    </StyledCard>
                    <StyledCard className="mt-3 p-2">
                        <Card.Title>Smart Branch Solution</Card.Title>
                        <Card.Subtitle>Abhiyoga - Enterpirise</Card.Subtitle>
                    </StyledCard>
                    <StyledCard className="mt-3 p-2">
                        <Card.Title>Smart Branch Solution</Card.Title>
                        <Card.Subtitle>Abhiyoga - Enterpirise</Card.Subtitle>
                    </StyledCard>
                </Card>
            </Col>
        </Row>
            
      </Container>
    </div>
  );
}

export default DaftarPekerjaan;
