// import '../../App.css';
import MyBurgerMenu from '../includes/MyBurgerMenu';
import Header from '../includes/Header';
import Container from 'react-bootstrap/Container';
import Card from 'react-bootstrap/Card';
import FilterBar from '../includes/FilterBar';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import SearchBar from '../includes/SearchBar';

function DashboardAdmin() {
  // const [searchQuery, setSearchQuery] = useState('');

  // const handleSearch = (e) => {
  //   e.preventDefault();
  //   // Lakukan sesuatu dengan searchQuery, misalnya: melakukan pencarian
  //   console.log('Search Query:', searchQuery);
  // };
  return (
    <div >
      <MyBurgerMenu />
      <Header></Header>
      
      <Container className='justify-content-center d-flex align-items-start flex-column p-3 pt-5'>
          <h1 className='m-0 light pt-5'>Selamat Pagi,</h1>
          <h1 >John Doe</h1>
          
          <SearchBar/>

          <FilterBar />

          <Container fluid>
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
           </Container>
          
      </Container>
    </div>
  );
}

export default DashboardAdmin;
