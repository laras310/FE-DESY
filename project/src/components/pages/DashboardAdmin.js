// import '../../App.css';
import MenuAdmin from '../includes/MenuAdmin';
import Container from 'react-bootstrap/Container';
import FilterBar from '../includes/FilterBar';
import { useState, useEffect } from 'react';
import axios from 'axios';

function DashboardAdmin() {
  const [profil, setProfil] = useState([]);
  useEffect(() => {
    axios({
      method: "GET",
      url: `${process.env.REACT_APP_API_HOST}auth/token/detail`,
      headers: {
        Authorization: 'Bearer ' + localStorage.getItem('access_token'),
      }
    })
      .then((response) => {
        const res = response.data.data;
        setProfil(res);
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
  }, []);

  return (
    <div >
      <MenuAdmin />
      <Container>
      <Container className='justify-content-center d-flex align-items-start flex-column p-3 pt-5'>
          <h1 className='m-0 light pt-5'>Selamat Pagi,</h1>
          <h1 >{profil.name}</h1>
          <FilterBar />
          
      </Container> 
      </Container>
    </div>
  );
}

export default DashboardAdmin;
