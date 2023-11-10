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

const StyledCard = styled(Card)`
  transition: transform 0.2s;

  &:hover {
    transform: scale(1.05);
  }
`;

export default function DetailTimeline(){

    const [userRole, setUserRole] = useState([]);
    
    
  const history = useHistory()
  useEffect(() => {
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
                                <Form.Control></Form.Control>
                            </Form.Group>
                            <Form.Group>
                                <Form.Label>Nama Unit</Form.Label>
                                <Form.Control></Form.Control>
                            </Form.Group>
                            <Form.Group>
                                <Form.Label>Tanggal Mulai</Form.Label>
                                <Form.Control></Form.Control>
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