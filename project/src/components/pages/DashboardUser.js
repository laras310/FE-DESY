// import MyBurgerMenu from '../includes/MyBurgerMenu';
// import CardUser from '../includes/CardUser';
// import { useEffect, useState } from 'react';
// import axios from 'axios';

// function DashboardUser() {
//   const [profil, setProfil] = useState([]);

// useEffect(() => {
//   axios({
//     method: "GET",
//     url: "https://api.pins.co.id/api/auth/token/detail",
//     headers: {
//       Authorization: 'Bearer ' + localStorage.getItem('access_token')
//     }
//   })
//     .then((response) => {
//       const res = response.data.data;

//       getProfil(res.id)
//     })
//     .catch((error) => {
//       if (error.response) {
//         console.log(error.response.data);
//         console.log(error.response.status);
//         console.log(error.response.headers);
//       } else if (error.request) {
//         console.log(error.request);
//       } else {
//         console.log(error.message);
//       }
//     });
// }, []);

// function getProfil(user_id){
//   axios({
//     method: "GET",
//     url: "https://jobcard-api.pins.co.id/api/task/by-user?user_id="+user_id,
//     headers: {
//       Authorization: 'Bearer ' + localStorage.getItem('access_token')
//     }
//   })
//     .then((response) => {
//       const res = response.data.data;
//       setProfil(res)
//     })
//     .catch((error) => {
//       if (error.response) {
//         console.log(error.response.data);
//         console.log(error.response.status);
//         console.log(error.response.headers);
//       } else if (error.request) {
//         console.log(error.request);
//       } else {
//         console.log(error.message);
//       }
//     });
// }

//   return (
//     <div>
      
//       <MyBurgerMenu/>
//       <CardUser profil={profil}/>
//     </div>
//   );
// }

// export default DashboardUser;

import MyBurgerMenu from '../includes/MyBurgerMenu';
import CardUser from '../includes/CardUser';
import { useEffect, useState } from 'react';
import axios from 'axios';

function DashboardUser() {
  const [profil, setProfil] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const responseToken = await axios({
          method: "GET",
          url: "https://api.pins.co.id/api/auth/token/detail",
          headers: {
            Authorization: 'Bearer ' + localStorage.getItem('access_token')
          }
        });

        const userId = responseToken.data.data.id;
        await getProfil(userId);

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
        url: "https://jobcard-api.pins.co.id/api/task/by-user?user_id=" + user_id,
        headers: {
          Authorization: 'Bearer ' + localStorage.getItem('access_token')
        }
      });

      const resProfil = responseProfil.data.data;
      setProfil(resProfil);
    } catch (error) {
      console.error("Error fetching profil data:", error);
    }
  }

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <MyBurgerMenu />
      <CardUser profil={profil} />
    </div>
  );
}

export default DashboardUser;
