import Header from "../includes/Header";
import AdminMenu from "../includes/MenuAdmin";
import { ListGroup, Button, Card, Container, } from "react-bootstrap";
import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { Star, StarFill, ChatDots, Paperclip } from "react-bootstrap-icons";
import ZeroList from "../includes/ZeroList";
import styled from 'styled-components';
import axios from "axios";
import TableAdmin from "../includes/TableAdmin";

// const StyledStar = styled(Star)`
//   transition: transform 0.2s;

//   &:hover {
//     transform: scale(1.5);
//   }
// `
// ;
// const StyledStarFill = styled(StarFill)`
//   transition: transform 0.2s;

//   &:hover {
//     transform: scale(1.5);
//   }
// `
// ;

export default function AllTask(){
  const history = useHistory()
  // const [items, setItems] = useState(initialItems);
  const [profil, setProfil] = useState([]);

  // const toggleStar = (id) => {
  //   const updatedItems = items.map((item) => {
  //     if (item.id === id) {
  //       return { ...item, starred: !item.starred };
  //     }
  //     return item;
  //   });

  //   setItems(updatedItems);
  //   };
  
    useEffect(() => {
      axios({
        method: "GET",
        url: "https://jobcard-api.pins.co.id/api/task/all",
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
      <Header></Header>
      <Container>
      {profil <1 ? <ZeroList/>
      : 
      <TableAdmin data={profil}/>
      }
      </Container>
    </div>
    )
}