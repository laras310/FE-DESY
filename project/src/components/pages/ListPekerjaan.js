import MyBurgerMenu from "../includes/MyBurgerMenu";
import { ListGroup, Button, Card, Container, Table} from "react-bootstrap";
import { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { Star, StarFill, ChatDots, Paperclip } from "react-bootstrap-icons";
// import { Table } from "rsuite";
import styled from 'styled-components';
import { useLocation } from "react-router-dom";
import axios from "axios";

const StyledStar = styled(Star)`
  transition: transform 0.2s;

  &:hover {
    transform: scale(1.5);
  }
`
;
const StyledStarFill = styled(StarFill)`
  transition: transform 0.2s;

  &:hover {
    transform: scale(1.5);
  }
`
;
export default function ListPekerjaan(){
  const history = useHistory()
  const location = useLocation();
  const statusNama = location.state.status;
  // const dataAll = location.state.data;
  const user_id = location.state.user_id;
  

  const toggleStar = (task_id, is_favorite) => {
    let favorite = "";
  
    if (is_favorite === 1) {
      favorite = 0;
    } else {
      favorite = 1;
    }
  
    axios({
      method: "PATCH",
      // url:"https://http://jobcard-api.pins.co.id/api/task/favorite?user_id="+ user_id+"&task_id="+task_id+"&is_favorite="+favorite,
      url: "https://jobcard-api.pins.co.id/api/task/favorite",
      headers: {
        Authorization: 'Bearer ' + localStorage.getItem('access_token')
      },
      data: {
        user_id: user_id,
        task_id: task_id,
        is_favorite: favorite
      }
    })
    .then((response) => {
      // const res = response.data.data;
      console.log(response);
      // window.location.reload()
    })
    .catch((error) => {
      console.error(error);
    });
  };
const [dataAll, setDataAll] = useState([])
useEffect(() => {
  axios({
    method: "GET",
    url: "https://jobcard-api.pins.co.id/api/task/by-user?user_id=450",
    // url: "https://jobcard-api.pins.co.id/api/task/by-user?user_id=" + profil.id,
    headers: {
      Authorization: 'Bearer ' + localStorage.getItem('access_token')
    },
  })
    .then((response) => {
      const res = response.data.data;
      setDataAll(res.tasks)
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
      
      <MyBurgerMenu/>
      {/* <ZeroList/> */}
        
        <Container className='justify-content-center d-flex align-items-start flex-column p-3 pt-5'>          
          <Card 
          className="w-100 p-3"
          >
            <h1>Pekerjaan {statusNama}</h1>
            
            <Table hover className="rounded text-center" responsive="sm">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Project Name</th>
                  <th>ID</th>
                  <th>Unit</th>
                  <th>Last Update</th>
                  <th>Tindakan</th>
                </tr>
              </thead>
              <tbody>
                
                {dataAll.map((item) => (
                  <tr key={item.id} >
                    <td onClick={() => toggleStar(item.id,item.pivot.is_favorite)}>
                      {item.pivot.is_favorite === 0 ? <StyledStar className="align-middle" /> : <StyledStarFill className="text-warning" />}
                    </td>
                    <td onClick={()=>history.push('/detail-pekerjaan')}>{item.name}</td>
                    <td onClick={()=>history.push('/detail-pekerjaan')}>{item.id}</td>
                    <td onClick={()=>history.push('/detail-pekerjaan')}>{item.unit}</td>
                    <td onClick={()=>history.push('/detail-pekerjaan')}>{item.update}</td>
                    <td className="d-flex flex-row justify-content-evenly"><h4><Paperclip/> 1</h4>
                    <h4><ChatDots/> 2</h4></td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </Card>
        </Container>
    </div>
    )
}