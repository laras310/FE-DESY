import Card from 'react-bootstrap/Card';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';
import { useEffect, useState } from 'react';
import axios from 'axios';

const StyledCard = styled(Card)`
  cursor: pointer; 
  transition: transform 0.2s;

  &:hover {
    transform: scale(1.05);
  }
`;

const CardUser = ({user_id}) =>{
  const [profil, setProfil] = useState([]);
  // const [loading, setLoading] = useState(true);

  const getProfil = async () => {
    try {
      const responseProfil = await axios({
        method: "GET",
        url: `${process.env.REACT_APP_API_JOBCARD}/task/by-user?user_id=` + user_id,
        // headers: {
        //   Authorization: 'Bearer ' + sessionStorage.getItem('access_token')
        // }
      });
      const resProfil = responseProfil.data.data;
      // setLoading(false)
      setProfil(resProfil);
      
    } catch (error) {
      // setLoading(false)
      console.error("Error fetching profil data:", error);
    }
  }
  useEffect(() => {
    getProfil(user_id)
  }, []);
  const history = useHistory();
    return(
        <Container className='justify-content-center d-flex align-items-start flex-column p-3 pt-5'>
          <h1 className='m-0 light pt-5'>Selamat Pagi,</h1>
          <h1 >{profil.name}</h1>

          <Container fluid>
            <Row >
              <Col md={4}>
                <StyledCard className='my-3 shadow  text-center' style={{height:'30vh'}} 
                onClick={()=>history.push("/list-pekerjaan", {status:'idle', data:profil.tasks.idle})}>
                  <Card.Body>
                    <Card.Title>
                      Pekerjaan Idle
                        </Card.Title>
                    <Card.Text style={{fontSize:'5rem'}}>{profil?.tasks?.idle.length}</Card.Text>
                  </Card.Body>
                </StyledCard>
              </Col>
              <Col md={4}>
                <StyledCard className='my-3 shadow  text-center' style={{height:'30vh'}}
                onClick={()=>history.push("/list-pekerjaan", {status:'progress', data:profil.tasks.progress})}>
                  <Card.Body>
                    <Card.Title>Pekerjaan Berjalan</Card.Title>
                    <Card.Text style={{fontSize:'5rem'}}>{profil?.tasks?.progress.length}</Card.Text>
                  </Card.Body>
                </StyledCard>
              </Col>
              <Col md={4}>
                <StyledCard className='my-3 shadow text-center' style={{height:'30vh'}}
                onClick={()=>history.push("/list-pekerjaan", {status:'done', data:profil.tasks.done})}>
                  <Card.Body>
                    <Card.Title>Pekerjaan Selesai</Card.Title>
                    <Card.Text style={{fontSize:'5rem'}}>{profil?.tasks?.done.length}</Card.Text>
                  </Card.Body>
                </StyledCard>
              </Col>
              
            </Row>
           </Container>
      </Container>
    )
}

export default CardUser;