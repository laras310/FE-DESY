import MyBurgerMenu from './MyBurgerMenu';
import {Card,Container,Row,Col,Form, Button} from 'react-bootstrap';
import { ArrowLeftShort} from 'react-bootstrap-icons';
import AdminMenu from './MenuAdmin';
import { useEffect, useState } from 'react';
import { useLocation, useHistory } from "react-router-dom";
import { format, parseISO } from 'date-fns';
import TimelineOnly from './TimelineOnly';
import axios from 'axios';
import { useSelector } from 'react-redux';

export default function DetailTimeline(){
    const location = useLocation();
    const data = location.state.data
    const task_id= data.id
    const [detail, setDetail]= useState([]);
    const userRole = useSelector(state=>state.user.role)

    const history = useHistory()

    function handleClick() {
        history.goBack();
    }

    // useEffect(() => {
    //     axios({
    //         method: "GET",
    //         url: `${process.env.REACT_APP_API_JOBCARD}/task?task_id=`+task_id,
    //         headers: {
    //           Authorization: 'Bearer ' + sessionStorage.getItem('access_token')
    //         },
    //       })
    //     .then((response)=>{
    //         const res= response.data.data
    //         setDetail(res)
            
    // console.log(res)
    //     })
    //     .catch((error) => {
    //         if (error.response) {
    //           console.log(error.response.data);
    //           console.log(error.response.status);
    //           console.log(error.response.headers);
    //         } else if (error.request) {
    //           console.log(error.request);
    //         } else {
    //           console.log(error.message);
    //         }
    //       });
    // },[])

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
                            {userRole === "admin" ?
                            <Container className='d-flex justify-content-end'>
                            <Button className='btn-danger px-3' size="sm"
                            onClick={()=>history.push({pathname:"/edit-task", state:{detail:data}})}
                            >Edit</Button>
                            </Container>
                            :
                            null
                            }
                            <Form>
                            <Form.Group as={Row} className="m-2">
                                <Form.Label column>Nama Proyek</Form.Label>
                                
                                <Col xs={8}>
                                <Form.Control value={data?.name}
                                className='text-break' plaintext readOnly></Form.Control>
                                </Col>
                            </Form.Group>
                            {
                                data.unit != null ? 
                                <Form.Group as={Row} className="m-2">
                                <Form.Label column>Nama Unit</Form.Label>
                                
                                <Col xs={8}>
                                <Form.Control value={data?.unit['name']}
                                className='text-break' plaintext readOnly></Form.Control>
                                </Col>
                            </Form.Group>
                            :
                            null
                            }
                            {
                                data?.created_at != null ?
                                <Form.Group as={Row} className="m-2">
                                <Form.Label column>Tanggal Mulai</Form.Label>
                                
                                <Col xs={8}>
                                <Form.Control value={format(parseISO(data?.created_at), 'dd MMMM yyyy HH:mm:ss')
                                    }
                                    className='text-break' plaintext readOnly></Form.Control>
                                </Col>
                            </Form.Group>
                            :
                            null
                            }


                            {
                                data?.pic != null ?
                                // <p>tes</p>
                                <Form.Group as={Row} className="m-2">
                                    <Form.Label column>Nama PIC</Form.Label>
                                    
                                    <Col xs={8}>
                                    <Form.Control value={data?.pic.name}
                                    className='text-break' plaintext readOnly></Form.Control>
                                    </Col>
                                </Form.Group>
                                :
                                null
                                // console.log(data)
                            }
                            
                            <Form.Group as={Row} className="m-2">
                                <Form.Label column>Status</Form.Label>
                                
                                <Col xs={8}>
                                <Form.Control value={data?.status}
                                className='text-break' plaintext readOnly></Form.Control>
                                </Col>
                            </Form.Group>
                            <Form.Group as={Row} className="m-2">
                                <Form.Label column>Progress</Form.Label>
                                
                                <Col xs={8}>
                                <Form.Control value={data?.progress + '%'}
                                className='text-break' plaintext readOnly></Form.Control>
                                </Col>
                            </Form.Group>
                            {
                                data?.users != null ?
                                <Form.Group as={Row} className="m-2">
                                <Form.Label column>Users</Form.Label>
                                
                                <Col xs={8}>
                                {
                                    data?.users.map((user)=>(
                                        <Form.Control value={user['name']} key={user['id']}
                                        className='text-break' plaintext readOnly></Form.Control>
                                    ))
                                }</Col>
                                    
                                </Form.Group>
                                :
                                null
                            }

                        </Form>
                        </Card.Body>
                    </Card>
                    {
                        userRole === "admin" ?
                        <Card className='mt-3'>
                        <Card.Body>
                            <Card.Title>Update Task Frequency</Card.Title>
                            
                        </Card.Body>
                    </Card>
                        :
                        null
                    }
                    
                        
                    </Col>
                    <Col md={6} className='mb-3'>
                    <h1>Timeline</h1>
                    <TimelineOnly data={data}/>
                    </Col>
                </Row>
            </Container>
        </Container>
        </>
    )
}