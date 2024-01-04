import AdminMenu from "../includes/MenuAdmin";
import { useEffect, useState } from "react";
import ZeroList from "../includes/ZeroList";
import axios from "axios";
import TableAdmin from "../includes/TableAdmin";
import { StyledCard } from "../includes/Atom/StyledComponents";
import CardUser from "../includes/CardUser";
import { useSelector } from "react-redux";
import { Container, Form, Button } from "react-bootstrap";

export default function AllTask(){
  const [data, setData] = useState([]);
  const session = useSelector(state=>state.user.session)
  
    useEffect(() => {
      axios({
        method: "GET",
        url: `${process.env.REACT_APP_API_JOBCARD}/task/all`,
        headers: {
          Authorization: 'Bearer ' + session
        }
      })
        .then((response) => {
          const res = response.data.data;
          setData(res);
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

    const handleSearch = () => {
      axios({
        method: "GET",
        url: `${process.env.REACT_APP_API_JOBCARD}/task/all`,
        headers: {
          Authorization: 'Bearer ' + session
        }
      })
        .then((response) => {
          const res = response.data.data;
          setData(res);
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
    };

    const handlechange=()=>{

    }
    return(
        <div>
      
      <AdminMenu></AdminMenu>



      {data <1 ? <ZeroList/>
      : 
      <TableAdmin data={data}/>
      }
 
    </div>
    )
}