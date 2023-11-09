// import '../../App.css';
import MenuAdmin from '../includes/MenuAdmin';
import Header from '../includes/Header';
import Container from 'react-bootstrap/Container';
import Card from 'react-bootstrap/Card';
import FilterBar from '../includes/FilterBar';
import CardAdmin from '../includes/CardAdmin';
import SearchBar from '../includes/SearchBar';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { Row, Col } from 'react-bootstrap';

function DashboardAdmin() {
  // const [searchQuery, setSearchQuery] = useState('');

  // const handleSearch = (e) => {
  //   e.preventDefault();
  //   // Lakukan sesuatu dengan searchQuery, misalnya: melakukan pencarian
  //   console.log('Search Query:', searchQuery);
  // };

  const [profil, setProfil] = useState([]);
  useEffect(() => {
    axios({
      method: "GET",
      url: "https://api.pins.co.id/api/auth/token/detail",
      headers: {
        Authorization: 'Bearer ' + localStorage.getItem('access_token')
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
  
  // useEffect(() => {
  //   // Memantau perubahan nilai profil
  //   console.log(data);
  // }, [data]);
  return (
    <div >
      <MenuAdmin />
      <Header></Header>
      
      <Container className='justify-content-center d-flex align-items-start flex-column p-3 pt-5'>
          <h1 className='m-0 light pt-5'>Selamat Pagi,</h1>
          <h1 >{profil.name}</h1>
          
          <SearchBar/>

          <FilterBar />
          {/* <CardAdmin/> */}

          {/* <Container fluid>
            <Row>
              <Col md={4}>
                <Card className='my-3 shadow' style={{height:'30vh'}}>
                  <Card.Body>
                    <Card.Title>Unit Bisnis 1</Card.Title>
                    <Card.Subtitle>Telco & SME Business</Card.Subtitle>
                    <hr></hr>
                    <Card.Text className='d-flex justify-content-center flex-row'>
                      <Container className='d-flex justify-content-center flex-column'>
                        <p>Idle</p>
                        <p>0</p>
                      </Container>
                      <Container className='d-flex justify-content-center flex-column'>
                        <p>Berjalan</p>
                        <p>0</p>
                      </Container>
                      <Container className='d-flex justify-content-center flex-column'>
                        <p>Selesai</p>
                        <p>0</p>
                      </Container>
                    </Card.Text>
                  </Card.Body>
                </Card>
              </Col>
              <Col md={4}>
                <Card className='my-3' style={{height:'30vh'}}>
                  <Card.Body>
                    <Card.Title>Card 2</Card.Title>
                    <Card.Text>This is the content of Card 2.</Card.Text>
                  </Card.Body>
                </Card>
              </Col>
              <Col md={4}>
                <Card className='my-3' style={{height:'30vh'}}>
                  <Card.Body>
                    <Card.Title>Card 3</Card.Title>
                    <Card.Text>This is the content of Card 3.</Card.Text>
                  </Card.Body>
                </Card>
              </Col>
              <Col md={4}>
                <Card className='my-3' style={{height:'30vh'}}>
                  <Card.Body>
                    <Card.Title>Card 1</Card.Title>
                    <Card.Text>This is the content of Card 1.</Card.Text>
                  </Card.Body>
                </Card>
              </Col>
              <Col md={4}>
                <Card className='my-3' style={{height:'30vh'}}>
                  <Card.Body>
                    <Card.Title>Card 2</Card.Title>
                    <Card.Text>This is the content of Card 2.</Card.Text>
                  </Card.Body>
                </Card>
              </Col>
              <Col md={4}>
                <Card className='my-3' style={{height:'30vh'}}>
                  <Card.Body>
                    <Card.Title>Card 3</Card.Title>
                    <Card.Text>This is the content of Card 3.</Card.Text>
                  </Card.Body>
                </Card>
              </Col>
              <Col md={4}>
                <Card className='my-3' style={{height:'30vh'}}>
                  <Card.Body>
                    <Card.Title>Card 3</Card.Title>
                    <Card.Text>This is the content of Card 3.</Card.Text>
                  </Card.Body>
                </Card>
              </Col>
            </Row>
           </Container> */}
          
      </Container> 
    </div>
  );
}

export default DashboardAdmin;
