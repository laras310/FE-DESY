import MyBurgerMenu from '../includes/MyBurgerMenu';
import CardUser from '../includes/CardUser';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { Spinner, Container } from 'react-bootstrap';

function DashboardUser() {
  const [profil, setProfil] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const responseToken = await axios({
          method: "GET",
          url: `${process.env.REACT_APP_API_HOST}auth/token/detail`,
          headers: {
            Authorization: 'Bearer ' + sessionStorage.getItem('access_token')
          }
        });

        const userId = responseToken.data.data.id;
        await getProfil(userId);
        sessionStorage.setItem(
          'user_id',
          userId
        )

        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  async function getProfil(user_id) {
    try {
      const responseProfil = await axios({
        method: "GET",
        url: `${process.env.REACT_APP_API_JOBCARD}/task/by-user?user_id=` + user_id,
        headers: {
          Authorization: 'Bearer ' + sessionStorage.getItem('access_token')
        }
      });

      const resProfil = responseProfil.data.data;
      setProfil(resProfil);
    } catch (error) {
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
      <Container>
      <CardUser profil={profil} />
      </Container>
    </div>
  );
}

export default DashboardUser;
