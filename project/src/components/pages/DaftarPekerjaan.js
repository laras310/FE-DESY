import MyBurgerMenu from '../includes/MyBurgerMenu';
import {Card,Container,Row,Col,Button} from 'react-bootstrap';
import styled from 'styled-components';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { useHistory, useLocation  } from 'react-router-dom';

const StyledCard = styled(Card)`
  transition: transform 0.2s;

  &:hover {
    transform: scale(1.03);
  }
`;

function DaftarPekerjaan() {
  const history = useHistory();
  const user_id = sessionStorage.getItem('user_id')
  const [dataAll, setDataAll] = useState([])

  // const [modalDetailShow, setModalDetailShow]= useState(false)
  
  useEffect(() => {

    axios({
      method: "GET",
      url: `${process.env.REACT_APP_API_JOBCARD}/task/by-user?user_id=`+ user_id,
      headers: {
        Authorization: 'Bearer ' + sessionStorage.getItem('access_token')
      },
    })
      .then((response) => {
        const res = response.data.data;
        setDataAll(res.tasks.progress)
        // console.log(res.tasks)
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
  
  let isAnyFavorite = 0
  // console.log(dataAll.length)
  if (dataAll.length > 0){
    isAnyFavorite = dataAll.progress.some(data => data.pivot.is_favorite === 1 && data.type==="1");
  }
  
  // const isAnyFavorite =1

  return (
    <div>
      
      <MyBurgerMenu/>
      <Container className='justify-content-center d-flex align-items-start flex-column p-3 pt-5' >
        <Container fluid>
        <Row className='mb-3'>
          <Col>
          <Card className='shadow'>
            <Card.Body>
              <h3>Project Berbintang</h3>
              <Row>
              {isAnyFavorite ? (
                dataAll.map((data) => (
                  data.pivot.is_favorite === 1 && data.type === "1"? (
                    <Col md={4} key={data.id}>
                      <StyledCard className='my-3'>
                        <Card.Body>
                          <Card.Title onClick={() => history.push({ pathname: '/timeline', state: { data: data } })}>
                            {data.name}
                          </Card.Title>
                          <Card.Text>{data.unit.name}</Card.Text>
                          <Button onClick={() => history.push({ pathname: '/update-task', state: { data: data } })} className='btn-danger'>
                            Update Cepat
                          </Button>
                        </Card.Body>
                      </StyledCard>
                    </Col>
                  ) : null
                )
                )
              ) : (
                <p>Tidak ada project berbintang</p>
              )}
              </Row>
            </Card.Body>
          </Card>
          </Col>
        </Row>
        <Row>
          <Col md={6} className='mb-3'>
            <Card className='shadow'>
              <Card.Body>
                <h3>Project Berjalan</h3>
                {
                  dataAll.slice(0,3).map((data)=>(
                    data.type === "1" && data.status==="On progress"?
                    <StyledCard className="my-3 p-2" key={data.id}>
                        <Card.Title
                        onClick={()=>history.push({pathname:'/timeline', state:{data:data}})}
                        >{data.name}</Card.Title>
                        <p>{data.unit.name}</p>
                    </StyledCard>
                    :
                    null
                  ))
                }
                <Button className='btn-danger'
                onClick={()=>history.push("/list-pekerjaan", {status:'On progress', user_id:user_id})}
                >Lihat Semua Project</Button>
                
              </Card.Body>
            </Card>
          </Col>
          <Col md={6} className='mb-3'>
            <Card className='shadow'>
              <Card.Body>
                <h3>Task Berjalan</h3>
                {
                  dataAll.slice(0,3).map((data)=>(
                    data.type === "0" && data.status==="On progress"?
                    <StyledCard className="my-3 p-2" key={data.id}>
                        <Card.Title
                        onClick={()=>history.push({pathname:'/timeline', state:{data:data}})}
                        >{data.name}</Card.Title>
                        <p>{data.unit.name}</p>
                    </StyledCard>
                    :
                    null
                  ))
                }
                <Button className='btn-danger'
                onClick={()=>history.push("/list-pekerjaan", {status:'On progress', user_id:user_id})}
                >Lihat Semua Project</Button>
                
              </Card.Body>
            </Card>
          </Col>
        </Row>
        </Container>
           
      </Container>
    </div>
  );
}

export default DaftarPekerjaan;
