import MyBurgerMenu from './MyBurgerMenu';
import Card from 'react-bootstrap/Card';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { useHistory } from 'react-router-dom';
import { Form } from 'react-bootstrap';
import { ArrowLeftShort} from 'react-bootstrap-icons';
import AdminMenu from './MenuAdmin';
import { useEffect, useState } from 'react';
import { useLocation } from "react-router-dom";
import { format, parseISO } from 'date-fns';
import TimelineOnly from './TimelineOnly';
import axios from 'axios';

export default function DetailTimeline(){
    const location = useLocation();
    const [userRole, setUserRole] = useState([]);
    const data = location.state.data
    const task_id= data.id
    const [detail, setDetail]= useState([]);

    const history = useHistory()
    useEffect(() => {
        
        setUserRole(localStorage.getItem('role')) ;
        },[])
    function handleClick() {
        history.goBack();
    }

    useEffect(() => {
        axios({
            method: "GET",
            url: "https://jobcard-api.pins.co.id/api/task?task_id="+task_id,
            // url: "https://jobcard-api.pins.co.id/api/task/by-user?user_id=" + profil.id,
            headers: {
              Authorization: 'Bearer ' + localStorage.getItem('access_token')
            },
          })
        .then((response)=>{
            const res= response.data.data
            setDetail(res)
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
    },[])

    return(
        <>
        {
            userRole === "admin" ? <AdminMenu/> : <MyBurgerMenu/>
        }
        
        <Container className='justify-content-center d-flex align-items-start flex-column p-3 pt-5'>
            <a onClick={()=>handleClick()} style={{ cursor: 'pointer' }}><ArrowLeftShort/> Back</a>
            <Container fluid>
                <Row>
                    <Col md={6} className='mb-3'>
                    <h1>Detail</h1>
                    <Card>
                        <Card.Body>
                            <Form>
                            <Form.Group>
                                <Form.Label>Nama Proyek</Form.Label>
                                <Form.Control value={detail.name} disabled></Form.Control>
                            </Form.Group>
                            {
                                detail.unit != null ? 
                                <Form.Group>
                                <Form.Label>Nama Unit</Form.Label>
                                <Form.Control value={detail.unit['name']}disabled></Form.Control>
                            </Form.Group>
                            :
                            null
                            }
                            {
                                detail.created_at != null ?
                                <Form.Group>
                                <Form.Label>Tanggal Mulai</Form.Label>
                                <Form.Control value={format(parseISO(detail.created_at), 'dd MMMM yyyy HH:mm:ss')
                                    } disabled></Form.Control>
                            </Form.Group>
                            :
                            null
                            }


                            {
                                detail.pic != null ?
                                // <p>tes</p>
                                <Form.Group>
                                    <Form.Label>Nama PIC</Form.Label>
                                    <Form.Control value={detail.pic.name} disabled></Form.Control>
                                </Form.Group>
                                :
                                null
                                // console.log(data)
                            }
                            
                            {
                                detail.users != null ?
                                <Form.Group>
                                <Form.Label>Users</Form.Label>
                                {
                                    detail.users.map((user)=>(
                                        // <p>user</p>
                                        <Form.Control value={user['name']} disabled></Form.Control>
                                    ))
                                }
                                </Form.Group>
                                :
                                null
                            }
                            <Form.Group>
                                <Form.Label>Status</Form.Label>
                                <Form.Control value={detail.status} disabled></Form.Control>
                            </Form.Group>
                            <Form.Group>
                                <Form.Label>Progress</Form.Label>
                                <Form.Control value={detail.progress + '%'} disabled></Form.Control>
                            </Form.Group>

                        </Form>
                        </Card.Body>
                    </Card>
                        
                    </Col>
                    <Col md={6} className='mb-3'>
                    <h1>Timeline</h1>
                    <TimelineOnly data={detail}/>
                    </Col>
                </Row>
            </Container>
        </Container>
        </>
    )
}