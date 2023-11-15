import MyBurgerMenu from '../includes/MyBurgerMenu';
import Card from 'react-bootstrap/Card';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import styled from 'styled-components';
import { Button} from 'react-bootstrap';
import { useState } from 'react';
import ModalPekerjaan from '../includes/Atom/ModalPekerjaan';

const StyledCard = styled(Card)`
  transition: transform 0.2s;

  &:hover {
    transform: scale(1.03);
  }
`;

function DaftarPekerjaan() {
  const [modalShow, setModalShow] =useState(false)
  // const [modalDetailShow, setModalDetailShow]= useState(false)

  return (
    <div>
      
      <MyBurgerMenu/>
      <Container className='justify-content-center d-flex align-items-start flex-column p-3 pt-5' >
        <Container fluid>
        <Row className='mb-3'>
          <Col>
          <Card>
            <Card.Body>
              <h3>Project Berbintang</h3>
              <Row>
              <Col md={4}>
                <StyledCard className='my-3 '
                >
                  <Card.Body >
                    <Card.Title ><a href='/timeline'>nama proyek</a></Card.Title>
                    <Card.Text >deskripsi</Card.Text>
                    <Button onClick={() => setModalShow(true)}>Update Cepat</Button>
                    
                  </Card.Body>
                </StyledCard>
                
              </Col>
              <Col md={4}>
                <StyledCard className='my-3 ' >
                  <Card.Body>
                    <Card.Title ><a href='/timeline'>nama proyek</a></Card.Title>
                    <Card.Text >deskripsi</Card.Text>
                    <Button onClick={() => setModalShow(true)}>Update Cepat</Button>
                  </Card.Body>
                </StyledCard>
              </Col>
              <Col md={4}>
                <StyledCard className='my-3 ' >
                  <Card.Body>
                    <Card.Title ><a href='/timeline'>nama proyek</a></Card.Title>
                    <Card.Text >deskripsi</Card.Text>
                    <Button onClick={() => setModalShow(true)}>Update Cepat</Button>
                  </Card.Body>
                </StyledCard>
              </Col>
              </Row>
            </Card.Body>
          </Card>
          </Col>
        </Row>
        <Row>
          <Col>
            <Card>
              <Card.Body>
                <h3>Project Berjalan</h3>
                <StyledCard className="mt-3 p-2">
                        <Card.Title>Smart Branch Solution</Card.Title>
                        <Card.Subtitle>Abhiyoga - Enterpirise</Card.Subtitle>
                    </StyledCard>
              </Card.Body>
            </Card>
          </Col>
          <Col>
            <Card>
              <Card.Body>
                <h3>Project Berjalan</h3>
                <StyledCard className="mt-3 p-2">
                        <Card.Title>Smart Branch Solution</Card.Title>
                        <Card.Subtitle>Abhiyoga - Enterpirise</Card.Subtitle>
                    </StyledCard>
              </Card.Body>
            </Card>
          </Col>
        </Row>
        </Container>
           <ModalPekerjaan
           show={modalShow}
        onHide={() => setModalShow(false)}
           />
           
      </Container>
    </div>
  );
}

export default DaftarPekerjaan;
