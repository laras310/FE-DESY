import React from 'react';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Card from 'react-bootstrap/Card';
import { FloatingLabel } from 'react-bootstrap';
import axios from 'axios';
import { useEffect, useState} from 'react';
import Cookies from 'js-cookie';
import { useHistory } from 'react-router-dom';
import swal from 'sweetalert';
import { useDispatch } from 'react-redux';
import {userLogin} from '../redux/actions/user'

export default function Login() {
  // const [username, setUsername] = useState('')
  // const [password, setPassword] = useState('')
  // const [role, setRole] = useState('')
  const [didMount, setDidMount] = useState(false);
  const [isSubmit, setIsSubmit] = useState(false);
  const dispatch = useDispatch();
  const history = useHistory()
  const [validated, setValidated]= useState(false)
  const [form, setForm] = useState({
    username: '',
    password: '',
    role: ''
  });

  const handlerForm = (event) => {
    setForm({
      ...form,
      [event.target.name]: event.target.value,
    });
  };

  const handlerLogin = async (event) => {
    event.preventDefault();

    if (form.username.length > 1 && form.password.length > 1) {
      setIsSubmit(true);
      try {
        const result = await dispatch(userLogin(form));

        if (result.status === 200) {
          setIsSubmit(false);
          swal('Success!', 'Login Successfull!', 'success');
          // window.location.replace("/");
          history.push( '/');
        } else {
          setIsSubmit(false);

          swal('Something Happened!', result.message, 'error');
        }
      } catch (error) {
        setIsSubmit(false);
                if (error.response) {
          // The request was made, but the server responded with a non-2xx status code
          console.error("Error status:", error.response.status);
          console.error("Error data:", error.response.data);
        } else {
          // Something happened in setting up the request that triggered an error
          console.error("Error message:", error.message);
        }

        swal('Something Happened!', 'Login Gagal', 'error');
      }
    } else {
      swal(
        'Something Happened!',
        'Username dan Password tidak boleh kosong!',
        'error',
      );
    }
  };

  useEffect(() => {
    setDidMount(true);

    return () => {
      setDidMount(false);
    };
  }, [dispatch]);

  if (!didMount) {
    return null;
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
        
         <Form className='w-100' onSubmit={handlerLogin}>
            <FloatingLabel  controlId="username" label="Username" className='mb-3'
            >
              <Form.Control
              type="text" required
                placeholder='Username' name="username" onChange={handlerForm} value={form.username ?? ''}
            />
            </FloatingLabel>
            
           <FloatingLabel  controlId="password" label="Password" className='mb-3'>
            <Form.Control
              type="password" required
                placeholder='Password' name="password" onChange={handlerForm} value={form.password ?? ''}
            />
           </FloatingLabel>
           <FloatingLabel controlId="floatingSelect" label="Login as" className='mb-3'>
              <Form.Select aria-label="Floating label select example"
              value={form.role ?? ''}
              name="role"
              onChange={handlerForm}
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