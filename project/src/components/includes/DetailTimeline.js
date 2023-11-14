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

export default function DetailTimeline(){
    const location = useLocation();
    const [userRole, setUserRole] = useState([]);
    const data = location.state.data
// setData()
    const history = useHistory()
    useEffect(() => {
        
        setUserRole(localStorage.getItem('role')) ;
        },[])
    function handleClick() {
        history.goBack();
    }

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
                                <Form.Control value={data.name} disabled></Form.Control>
                            </Form.Group>
                            {
                                data.unit != null ? 
                                <Form.Group>
                                <Form.Label>Nama Unit</Form.Label>
                                <Form.Control value={data.unit['name']}disabled></Form.Control>
                            </Form.Group>
                            :
                            null
                            }

                            <Form.Group>
                                <Form.Label>Tanggal Mulai</Form.Label>
                                <Form.Control value={format(parseISO(data.created_at), 'dd MMMM yyyy HH:mm:ss')
                                    } disabled></Form.Control>
                            </Form.Group>
                            {
                                data.users != null ?
                                <Form.Group>
                                <Form.Label>Users</Form.Label>
                                {
                                    data.users.map((user)=>(
                                        <Form.Control value={user['name']} disabled></Form.Control>
                                    ))
                                }
                                </Form.Group>
                                :
                                null
                            }

                        </Form>
                        </Card.Body>
                    </Card>
                        
                    </Col>
                    <Col md={6} className='mb-3'>
                    <h1>Timeline</h1>
                    <TimelineOnly task_id={data.id}/>
                    </Col>
                </Row>
            </Container>
        </Container>
        </>
    )
}