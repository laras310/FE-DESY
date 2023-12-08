import MyBurgerMenu from '../includes/MyBurgerMenu';
import CardUser from '../includes/CardUser';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { Spinner, Container } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';


function DashboardUser({id}) {
  const [profil, setProfil] = useState([]);
  const [loading, setLoading] = useState(false);
  const user = useSelector((state) => state.user.profile);
    const fetchData = async () => {
      try {

        await getProfil(id);

        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setLoading(false);
      }
    };
  // useEffect(() => {
  //   getProfil(user?.id)
  // }, []);

  async function getProfil(user_id) {
    try {
      const responseProfil = await axios({
        method: "GET",
        url: `${process.env.REACT_APP_API_JOBCARD}/task/by-user?user_id=` + user_id,
        // headers: {
        //   Authorization: 'Bearer ' + sessionStorage.getItem('access_token')
        // }
      });

      const resProfil = responseProfil.data.data;
      setLoading(false)
      setProfil(resProfil);
    } catch (error) {
      setLoading(false)
      console.error("Error fetching profil data:", error);
    }
  }

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
