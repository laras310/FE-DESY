import React from 'react';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Card from 'react-bootstrap/Card';
import { FloatingLabel } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import { useState, useRef, useEffect, useContext } from 'react';

export default function Login() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [role, setRole] = useState('')

  function LogMeIn(event){
    axios({
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': '*',
      },
      withCredentials: true,
      url: '/auth/token/request',
      data: {
        username: username,
        password: password
      },
    })
      .then(response => {
        // history.push(redirect || '/');
        localStorage.setItem(
          'session',
          JSON.stringify(response.data.data.access_token)
        )
        localStorage.setItem('role', role)
        if (role === 'user') {
          setTimeout(() => window.location.replace("/user"), 1000)
          
        } else {
          setTimeout(() => window.location.replace("/admin"), 1000)
        }
        // Handle any further logic or UI updates here
      })
      .catch(error => {
        if (error.response) {
          // The request was made, but the server responded with a non-2xx status code
          console.error("Error status:", error.response.status);
          console.error("Error data:", error.response.data);
        } else {
          // Something happened in setting up the request that triggered an error
          console.error("Error message:", error.message);
        }
      });
    
    event.preventDefault();    
  }

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
        
         <Form className='w-100' onSubmit={LogMeIn}>
            <FloatingLabel controlId="username" label="Username" className='mb-3'>
              <Form.Control
              type="text"
                placeholder='Username' name="username" onChange={e => setUsername(e.target.value)} value={username}
            />
            </FloatingLabel>
            
           <FloatingLabel controlId="password" label="Password" className='mb-3'>
            <Form.Control
              type="password"
                placeholder='Password' name="password" onChange={e => setPassword(e.target.value)} value={password}
            />
           </FloatingLabel>
           <FloatingLabel controlId="floatingSelect" label="Login as" className='mb-3'>
              <Form.Select aria-label="Floating label select example"
              value={role}
              onChange={e => setRole(e.target.value)}
              >
                <option  disabled value=""> -- select an option -- </option>
                <option value="user">User</option>
                <option value="admin">Admin</option>
              </Form.Select>
            </FloatingLabel>

            {/* <Form.Label>Login as</Form.Label>
            <Form.Check
            inline
            label="User"
            name="option"
            type="radio"
            value="user"
            checked={role === 'user'}
            onChange={e => setRole(e.target.value)}
          />
          
          <Form.Check
            inline
            label="Admin"
            name="option"
            type="radio"
            value="admin"
          /> */}
           <Button variant="danger" type="submit" name="asuser" className=' my-2 mt-3 w-100' 
           >LOGIN</Button>
           {/* <p className='text-center m-0'>or</p> */}
           {/* <Button variant="danger" type="submit" name="asadmin" className='my-2 mt-3 w-100' 
           >LOGIN AS ADMIN</Button> */}
         </Form>
      </Card>

    </Container>
  );
}