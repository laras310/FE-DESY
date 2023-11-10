import Header from './Header';
import MyBurgerMenu from './MyBurgerMenu';
import Card from 'react-bootstrap/Card';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';
import { Form } from 'react-bootstrap';
import { ArrowLeftShort, Briefcase, StarFill } from 'react-bootstrap-icons';
import { Timeline } from 'rsuite';
import AdminMenu from './MenuAdmin';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useLocation } from "react-router-dom";
import { format, parseISO } from 'date-fns';

const StyledCard = styled(Card)`
  transition: transform 0.2s;

  &:hover {
    transform: scale(1.05);
  }
`;

export default function DetailTimeline(){
    const location = useLocation();
    const [userRole, setUserRole] = useState([]);
    const [data, setData] = useState([]);

    const history = useHistory()
    useEffect(() => {
        setData(location.state.data)
        setUserRole(localStorage.getItem('role')) ;
        },[])
    function handleClick() {
        if (userRole === 'admin') {
            console.log("admin")
            // window.location.replace("/user-dashboard");
            history.push('/all-task');
        } else {
            // console.log("user")
            history.push('/daftar-pekerjaan');
        }
    }

    return(
        <>
        {
            userRole === "admin" ? <AdminMenu/> : <MyBurgerMenu/>
        }
        
        <Container className='justify-content-center d-flex align-items-start flex-column p-3 pt-5'>
            <a onClick={handleClick} style={{ cursor: 'pointer' }}><ArrowLeftShort/> Back</a>
            <Container fluid>
                <Row>
                    <Col md={6} className='mb-3'>
                    <h1>Detail</h1>
                    <Card>
                        <Card.Body>
                            <Form>
                            <Form.Group>
                                <Form.Label>Nama Proyek</Form.Label>
                                <Form.Control value={data.name} disabled></Form.Control>
                            </Form.Group>
                            <Form.Group>
                                <Form.Label>Nama Unit</Form.Label>
                                <Form.Control value={data.unit['name']}disabled></Form.Control>
                            </Form.Group>
                            <Form.Group>
                                <Form.Label>Tanggal Mulai</Form.Label>
                                <Form.Control value={format(parseISO(data.created_at), 'dd MMMM yyyy HH:mm:ss')
                                    } disabled></Form.Control>
                            </Form.Group>
                            <Form.Group>
                                <Form.Label>Users</Form.Label>
                                {
                                    data.users.map((user)=>(
                                        <Form.Control value={user.name} disabled></Form.Control>
                                    ))
                                }
                                
                            </Form.Group>
                        </Form>
                        </Card.Body>
                    </Card>
                        
                    </Col>
                    <Col md={6} className='mb-3'>
                    <h1>Timeline</h1>
                    <Timeline align="left">
                        <Timeline.Item>
                        <p>2018-03-01</p>
                        <p>Your order starts processing</p>
                        </Timeline.Item>
                        <Timeline.Item>
                        <p>2018-03-02</p>
                        <p>Order out of stock</p>
                        </Timeline.Item>
                        <Timeline.Item>
                        <p>2018-03-10</p>
                        <p>Arrival</p>
                        </Timeline.Item>
                        <Timeline.Item>
                        <p>2018-03-12</p>
                        <p>Order out of the library</p>
                        </Timeline.Item>
                        <Timeline.Item>
                        <p>2018-03-15</p>
                        <p>Sending you a piece</p>
                        </Timeline.Item>
                    </Timeline>
                    </Col>
                </Row>
            </Container>
        </Container>
        </>
    )
}