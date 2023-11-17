import Card from 'react-bootstrap/Card';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';
import { useEffect, useState } from 'react';

const StyledCard = styled(Card)`
  cursor: pointer; 
  transition: transform 0.2s;

  &:hover {
    transform: scale(1.05);
  }
`;

const CardUser = ({profil}) =>{
  const history = useHistory();
  const [data, setData]=useState({
    idle:"",
    onProgress:"",
    finished:""
  })
  const [task, setTask]=useState([])

  function getTask(){
    let idleCount = 0;
    let onProgressCount = 0;
    let finishedCount = 0;

    if (profil){
      profil.tasks.forEach((task)=>{
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
      })
      setTask(
        {idle:idleCount,
        onProgress:onProgressCount,
        finished:finishedCount}
      )  
    }

  }

  

  useEffect(() => {
    getTask()
  },[])
    return(
        <Container className='justify-content-center d-flex align-items-start flex-column p-3 pt-5'>
          <h1 className='m-0 light pt-5'>Selamat Pagi,</h1>
          <h1 >{profil.name}</h1>
          <Container fluid>
            <Row >
              <Col md={4}>
                <StyledCard className='my-3 shadow  text-center' style={{height:'30vh'}} 
                onClick={()=>history.push("/list-pekerjaan", {status:'idle', user_id:profil.id})}>
                  <Card.Body>
                    <Card.Title>
                      Pekerjaan Idle
                        </Card.Title>
                    <Card.Text style={{fontSize:'5rem'}}>{task.idle}</Card.Text>
                  </Card.Body>
                </StyledCard>
              </Col>
              <Col md={4}>
                <StyledCard className='my-3 shadow  text-center' style={{height:'30vh'}}
                onClick={()=>history.push("/list-pekerjaan", {status:'On progress', user_id:profil.id})}>
                  <Card.Body>
                    <Card.Title>Pekerjaan Berjalan</Card.Title>
                    <Card.Text style={{fontSize:'5rem'}}>{task.onProgress}</Card.Text>
                  </Card.Body>
                </StyledCard>
              </Col>
              <Col md={4}>
                <StyledCard className='my-3 shadow text-center' style={{height:'30vh'}}
                onClick={()=>history.push("/list-pekerjaan", {status:'finished', user_id:profil.id})}>
                  <Card.Body>
                    <Card.Title>Pekerjaan Selesai</Card.Title>
                    <Card.Text style={{fontSize:'5rem'}}>{task.finished}</Card.Text>
                  </Card.Body>
                </StyledCard>
              </Col>
              
            </Row>
           </Container>
      </Container>
    )
}

export default CardUser;