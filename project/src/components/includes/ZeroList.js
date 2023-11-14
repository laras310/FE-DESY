import React from 'react';
import Button from 'react-bootstrap/Button';
import { Container, Card, Row, Col, Form, InputGroup, FormControl } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';

export default function ZeroList() {
    const history=useHistory()
  return (
    <Container className='mt-5'>
      <Card style={{  marginBottom:'4rem' }}>
        <Card.Body>
          <h2>All Task</h2>
          <Button className='btn btn-danger mb-3 btn-sm'
          onClick={()=>history.push("/buat-task")}>Buat Task Baru</Button>
          <Row>
            <Col>
              <Form className='d-flex'>
                <InputGroup>
                  <InputGroup.Text className='bg-white'>
                    <svg xmlns='http://www.w3.org/2000/svg' width='16' height='16' fill='currentColor' class='bi bi-search' viewBox='0 0 16 16'>
                      <path d='M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z' />
                    </svg>
                  </InputGroup.Text>
                  <FormControl type='search' placeholder='Search' />
                </InputGroup>
              </Form>
            </Col>
          </Row>
        </Card.Body>
      </Card>
    </Container>
  );
}
