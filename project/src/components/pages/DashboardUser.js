import MyBurgerMenu from '../includes/MyBurgerMenu';
import CardUser from '../includes/CardUser';
import { useEffect, useState } from 'react';
import axios from 'axios';

function DashboardUser() {
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

  return (
    <div>
      
      <MyBurgerMenu/>
      <CardUser profil={profil}/>
    </div>
  );
}

export default DashboardUser;
