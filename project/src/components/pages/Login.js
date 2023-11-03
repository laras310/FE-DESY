import React from 'react';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Card from 'react-bootstrap/Card';
// import './Login.css';

export default function Login() {
  return (
    <Container className='vh-100 justify-content-center d-flex align-items-center justify-content-center'>
      <Card style={{width:'60vh'}} className='justify-content-center d-flex align-items-center justify-content-center text-center p-5 shadow'>
           <Card.Img variant="top" src="/assets/images/PINS-Logo-IoT2.png" style={{ width: '50%' }}
         />
         <Card.Subtitle className='mt-5 fw-normal mb-2'>Selamat datang di Aplikasi</Card.Subtitle>
         <Card.Title className='fw-normal mb-2'>
          Distributed Electronic Assignment System (DESY)
         </Card.Title>
         <Card.Body>Silahkan login untuk melanjutkan</Card.Body>
        
         <Form className='w-100'>
           <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
             <Form.Control type="email" placeholder="name@example.com" name="email"/>
           </Form.Group>
           <Form.Control
             type="password"
             id="inputPassword5" placeholder='Password' name="password"
           />
           <Button variant="danger" type="submit" name="asuser" className=' my-2 mt-3 w-100' >LOGIN AS USER</Button>
           <p className='text-center m-0'>or</p>
           <Button variant="danger" type="submit" name="asadmin" className='my-2 mt-3 w-100' >LOGIN AS ADMIN</Button>
         </Form>
      </Card>

    </Container>
    // <Container className='vh-100 '>
      
    //   <Card style={{ width: '60vh' }} className='justify-content-center d-flex align-items-center justify-content-center text-center p-5'>
    //     <Card.Img variant="top" src="/assets/images/PINS-Logo-IoT2.png" style={{ width: '50%' }}
    //     />
    //     <Card.Subtitle className='mt-5 fw-normal mb-2'>Selamat datang di Aplikasi</Card.Subtitle>
    //     <Card.Title className='fw-normal mb-2'>
    //      Distributed Electronic Assignment System (DESY)
    //     </Card.Title>
    //     <Card.Body>Silahkan login untuk melanjutkan</Card.Body>
        
    //     <Form className='w-100'>
    //       <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
    //         <Form.Control type="email" placeholder="name@example.com" name="email"/>
    //       </Form.Group>
    //       <Form.Control
    //         type="password"
    //         id="inputPassword5" placeholder='Password' name="password"
    //       />
    //       <Button variant="danger" type="submit" name="asuser">LOGIN AS USER</Button>
    //       <p className='text-center'>or</p>
    //       <Button variant="danger" type="submit" name="asadmin">LOGIN AS ADMIN</Button>
    //     </Form>
    //   </Card>
    // </Container>
  );
}