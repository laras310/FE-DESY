import MyBurgerMenu from '../includes/MyBurgerMenu';
import {Card,Container,Row,Col,Button} from 'react-bootstrap';
import styled from 'styled-components';
import { useState, useEffect } from 'react';
import ModalPekerjaan from '../includes/Atom/ModalPekerjaan';
import axios from 'axios';
import { useHistory, useLocation  } from 'react-router-dom';

const StyledCard = styled(Card)`
  transition: transform 0.2s;

  &:hover {
    transform: scale(1.03);
  }
`;

function DaftarPekerjaan() {
  const [modalShow, setModalShow] =useState(false)
  const history = useHistory();
  const user_id = localStorage.getItem('user_id')
  // const statusNama = location.state.status;
  // const user_id = location.state.user_id;
  const [dataAll, setDataAll] = useState([])
  // const [userRole, setUserRole] = useState([]);

  // const [modalDetailShow, setModalDetailShow]= useState(false)
  
  useEffect(() => {

    axios({
      method: "GET",
      url: "https://jobcard-api.pins.co.id/api/task/by-user?user_id="+ user_id,
      // url: "https://jobcard-api.pins.co.id/api/task/by-user?user_id=" ,
      headers: {
        Authorization: 'Bearer ' + localStorage.getItem('access_token')
      },
    })
      .then((response) => {
        const res = response.data.data;
        setDataAll(res.tasks)
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
                {dataAll.map((data)=>(
                  data.pivot.is_favorite === 1 ?(
                    <Col md={4}>
                    <StyledCard className='my-3 '
                    >
                      <Card.Body >
                        <Card.Title ><a href='/timeline'>{data.name}</a></Card.Title>
                        <Card.Text >{data.unit.name}</Card.Text>
                        <Button onClick={() => setModalShow(true)}>Update Cepat</Button>
                        
                      </Card.Body>
                    </StyledCard>
                    
                  </Col>
                  )
                  :
                  (<Col md={4}>
                    <StyledCard className='my-3 '
                    >
                      <Card.Body >
                        {/* <Card.Title ><a href='/timeline'>{data.name}</a></Card.Title>
                        <Card.Text >{data.unit.name}</Card.Text>
                        <Button onClick={() => setModalShow(true)}>Update Cepat</Button> */}
                        
                      </Card.Body>
                    </StyledCard>
                    
                  </Col>)
                ))}
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
                {
                  dataAll.map((data)=>(
                    // console.log(data.name)
                    <StyledCard className="mt-3 p-2">
                        <Card.Title>{data.name}</Card.Title>
                        <Card.Subtitle>{data.unit.name}</Card.Subtitle>
                    </StyledCard>
                  ))
                }
                
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
