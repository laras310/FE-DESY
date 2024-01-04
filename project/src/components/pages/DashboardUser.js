import MyBurgerMenu from '../includes/MyBurgerMenu';
import CardUser from '../includes/CardUser';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { Spinner, Container } from 'react-bootstrap';
import { useSelector } from 'react-redux';


function DashboardUser({id}) {
  const [loading, setLoading] = useState(false);
  const user = useSelector((state) => state.user.profile);

  if (loading) {
    return     <div >
      <MyBurgerMenu />
      <Container className='justify-content-center d-flex align-items-center flex-column p-3 pt-5'>
      <Spinner animation="border" role="status">
    <span className="visually-hidden">Loading...</span>
  </Spinner></Container>
  </div>
  }

  return (
    <div>
      <MyBurgerMenu />
      <Container >
        {
          user ? 
          // <p>{user.id}</p>
          <CardUser user_id={user.id} />
          :
          null
        }
      </Container>
      
    </div>
  );
}

export default DashboardUser;
