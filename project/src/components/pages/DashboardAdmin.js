// import '../../App.css';
import MenuAdmin from '../includes/MenuAdmin';
import Container from 'react-bootstrap/Container';
import FilterBar from '../includes/FilterBar';
import { useSelector } from 'react-redux';

function DashboardAdmin() {
  const user = useSelector((state) => state.user.profile);

  return (
    <div >
      <MenuAdmin />
      <Container>
      <Container className='justify-content-center d-flex align-items-start flex-column p-3 pt-5'>
          <h1 className='m-0 light pt-5'>Selamat Pagi,</h1>
          {user ? <h1 >{user.name}</h1>: <></>}
          
          <FilterBar />
          
      </Container> 
      </Container>
    </div>
  );
}

export default DashboardAdmin;
