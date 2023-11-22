import AdminMenu from "../includes/MenuAdmin";
import { useEffect, useState } from "react";
import ZeroList from "../includes/ZeroList";
import axios from "axios";
import TableAdmin from "../includes/TableAdmin";

export default function AllTask(){
  const [profil, setProfil] = useState([]);
  
    useEffect(() => {
      axios({
        method: "GET",
        url: `${process.env.REACT_APP_API_JOBCARD}/task/all`,
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
    return(
        <div>
      
      <AdminMenu></AdminMenu>

      {profil <1 ? <ZeroList/>
      : 
      <TableAdmin data={profil}/>
      }
 
    </div>
    )
}