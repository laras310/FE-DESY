import React from 'react';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Card from 'react-bootstrap/Card';
import { FloatingLabel } from 'react-bootstrap';
import axios from 'axios';
import { useState} from 'react';
import Cookies from 'js-cookie';
import { useHistory } from 'react-router-dom';
import swal from 'sweetalert';


export default function Login() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [role, setRole] = useState('')
  const history = useHistory()
  const [validated, setValidated]= useState(false)

  function LogMeIn(event){
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }

    setValidated(true);
    axios({
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': '*',
        // 'Access-Control-Allow-Credentials':'true'
      },
      // withCredentials: true,
      url: `${process.env.REACT_APP_API_HOST}auth/token/request`,
      data: {
        username: username,
        password: password
      },
    })
      .then(response => {swal('Berhasil Login','', 'success')
        Cookies.set('access_token', response.data.data.access_token, {expires:0.5});
        localStorage.setItem(
          'access_token',
          response.data.data.access_token
        )
        localStorage.setItem(
          'token_type', response.data.data.token_type
        )
        localStorage.setItem('role', role)
        window.location.replace("/");
        
        // if (role === 'user') {
        //   // history.push({pathname: '/user-dashboard', state:{}})
        //   window.location.replace("/user-dashboard");
          
        // } 
        // else if (role === 'admin') {
        //   window.location.replace("/admin-dashboard");
        // }
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
      <Card style={{width:'65vh'}} className='justify-content-center d-flex align-items-center justify-content-center text-center p-5 shadow'>
           <Card.Img variant="top" src="/assets/images/PINS-Logo-IoT2.png" style={{ width: '30%' }}
         />
         <Card.Subtitle className='mt-3 fw-normal mb-2'>Selamat datang di Aplikasi</Card.Subtitle>
         <Card.Title className='fw-normal mb-2'>
          Distributed Electronic Assignment System (DESY)
         </Card.Title>
         <Card.Body>Silahkan login untuk melanjutkan</Card.Body>
        
         <Form className='w-100' onSubmit={LogMeIn}>
            <FloatingLabel  controlId="username" label="Username" className='mb-3'
            >
              <Form.Control
              type="text" required
                placeholder='Username' name="username" onChange={e => setUsername(e.target.value)} value={username}
            />
            </FloatingLabel>
            
           <FloatingLabel  controlId="password" label="Password" className='mb-3'>
            <Form.Control
              type="password" required
                placeholder='Password' name="password" onChange={e => setPassword(e.target.value)} value={password}
            />
           </FloatingLabel>
           <FloatingLabel controlId="floatingSelect" label="Login as" className='mb-3'>
              <Form.Select aria-label="Floating label select example"
              value={role}
              onChange={e => setRole(e.target.value)}
              required
              >
                <option  disabled value=""> -- select an option -- </option>
                <option value="user">User</option>
                <option value="admin">Admin</option>
              </Form.Select>
            </FloatingLabel>
           <Button variant="danger" type="submit" name="submit" className=' mt-3 w-100' size="sm" 
           >LOGIN</Button>
         </Form>
      </Card>

    </Container>
  );
}