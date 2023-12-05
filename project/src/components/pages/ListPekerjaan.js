import MyBurgerMenu from "../includes/MyBurgerMenu";
import { Card, Container, Table, Button} from "react-bootstrap";
import { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { Star, StarFill, ArrowLeftShort} from "react-bootstrap-icons";
import styled from 'styled-components';
import { useLocation } from "react-router-dom";
import { format, parseISO } from 'date-fns';
import axios from "axios";
import AdminMenu from "../includes/MenuAdmin";
import {Pagination} from "rsuite";

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
  const data = location.state.data;
  console.log(data)
  
  const [dataProject, setDataProject] = useState(
    data.filter(item => item.type === "1")
  );
  
  const [dataTask, setDataTask] = useState(
    data.filter(item => item.type === "0")
  );

  const [userRole, setUserRole] = useState([]);
  const [page, setPage] = useState(1);
  const [pageTask, setPageTask] = useState(1);
  const toggleStar = (task_id, is_favorite) => {
    let favorite = "";
  
    if (is_favorite === 1) {
      favorite = 0;
    } else {
      favorite = 1;
    }
  
    axios({
      method: "PATCH",
      url: `${process.env.REACT_APP_API_JOBCARD}/task/favorite`,
      headers: {
        Authorization: 'Bearer ' + sessionStorage.getItem('access_token')
      },
      data: {
        user_id: sessionStorage.getItem('user_id'),
        task_id: task_id,
        is_favorite: favorite
      }
    })
    .then((response) => {
      // const res = response.data.data;
      // console.log(response);
      window.location.reload()
    })
    .catch((error) => {
      console.error(error);
    });
  };

useEffect(() => {
  setUserRole(sessionStorage.getItem('role')) ;
}, []);

function handleClick() {
  history.goBack();
}
const isAnyProject = dataProject.some(data => 
  data.status === statusNama || 
  data.status === "selesai" || 
  data.status === "On progress");

const isAnyTask = dataTask.some(data=>
  data.status === statusNama || 
  data.status === "Selesai" ||
  data.status === "On progress");

const dataProjectPaginated = dataProject.slice((page - 1) * 5, page * 5);
const dataTaskPaginated = dataTask.slice((pageTask - 1) * 10, pageTask * 5);  
    return(
        <div>
      {
            userRole === "admin" ? <AdminMenu/> : <MyBurgerMenu/>
        }
        
        <Container className='justify-content-center d-flex align-items-start flex-column p-3 pt-5'>          
          <Card 
          className="w-100 p-3"
          >
            <a onClick={()=>handleClick()} style={{ cursor: 'pointer' }}><ArrowLeftShort/> Back</a>
            <h4>Project {statusNama}</h4>
            
            <Table hover className="rounded text-center" responsive="sm" >
              <thead>
                <tr>
                  {
                    sessionStorage.getItem('role') === 'user' ?
                    <th>#</th>:
                    null
                  }
                  
                  <th>Project Name</th>
                  <th>Tipe</th>
                  <th>Status</th>
                  <th>Progress (%)</th>
                  <th>Last Update</th>
                  <th>Dibuat tanggal</th>
                  {
                    userRole === "user" ? <th>Aktivitas</th> : null
                  }
                  
                </tr>
              </thead>
              <tbody style={{cursor:"pointer"}}>
                
                
                {isAnyProject ?
                (dataProjectPaginated.map((item) => (
                  
                 item.status === statusNama || item.status === "Selesai" || item.status === "On progress" ? (
                  <tr key={item.id} >
                    {console.log(item.status)}
                    {
                      sessionStorage.getItem('role') === 'user' ?
                      <td onClick={() => toggleStar(item.id,item.pivot.is_favorite)}>
                      {item.pivot.is_favorite === 0 ? <StyledStar className="align-middle" /> : <StyledStarFill className="text-warning" />}
                    </td>
                    : null
                    }
                    
                    <td 
                    onClick={() => history.push({pathname:'/timeline',
                        state:{data:item}})}
                        >{item.name}</td>
                  <td 
                    onClick={() => history.push({pathname:'/timeline',
                        state:{data:item}})}
                        >{item.type === "1" ? "Project":"Task "}</td>
                    <td 
                    onClick={() => history.push({pathname:'/timeline',
                        state:{data:item}})}
                        >{item.status}</td>
                    <td 
                    onClick={() => history.push({pathname:'/timeline',
                        state:{data:item}})}
                        >{item.progress}</td>
                    
                    <td 
                    onClick={() => history.push({pathname:'/timeline',
                        state:{data:item}})}
                        >{format(parseISO(item.updated_at), 'dd MMMM yyyy HH:mm:ss')}</td>
                    <td 
                    onClick={() => history.push({pathname:'/timeline',
                        state:{data:item}})}
                        >{format(parseISO(item.created_at), 'dd MMMM yyyy HH:mm:ss')}
                        </td>
                        {
                    userRole === "user" ? 
                    (item.progress !== "100" ? <td>
                    <Button
                    onClick={()=>history.push({pathname:'/update-task', state:{data:item}})}>
                      Update</Button>
                  </td>
                  :
                  null) : null
                  }
                  </tr>): null
                )))
                :
                null
              }
              </tbody>
            </Table>
            
            {
              isAnyProject? null:
              (
                <p>tidak ada project {statusNama}</p>
              )
            }
                  <div style={{padding:20}}>
                  <Pagination
                    prev
                    next
                    last
                    first
                    maxButtons={5}
                    size='xs'
                    layout={['total', '-', '|', 'pager']}
                    total={dataProject.length}
                    limit={5}
                    activePage={page}
                    onChangePage={setPage}
                  />

      </div>
          </Card>

          <Card 
          className="w-100 p-3 mt-3"
          >
            <h4>Task {statusNama}</h4>
            
            <Table hover className="rounded text-center" responsive="sm" >
              <thead>
                <tr>
                  {
                    sessionStorage.getItem('role') === 'user' ?
                    <th>#</th>:
                    null
                  }
                  
                  <th>Project Name</th>
                  <th>Tipe</th>
                  <th>Status</th>
                  <th>Progress (%)</th>
                  <th>Last Update</th>
                  <th>Dibuat tanggal</th>
                  {
                    userRole === "user" ? <th>Aktivitas</th> : null
                  }
                  
                </tr>
              </thead>
              <tbody style={{cursor:"pointer"}}>
                
                {isAnyTask ?
                (dataTaskPaginated.map((item) => (
                 item.status === statusNama || item.status === "Selesai" || item.status === "On progress"? (
                  <tr key={item.id} >
                    {
                      sessionStorage.getItem('role') === 'user' ?
                      <td onClick={() => toggleStar(item.id,item.pivot.is_favorite)}>
                      {item.pivot.is_favorite === 0 ? <StyledStar className="align-middle" /> : <StyledStarFill className="text-warning" />}
                    </td>
                    : null
                    }
                    
                    <td 
                    onClick={() => history.push({pathname:'/timeline',
                        state:{data:item}})}
                        >{item.name}</td>
                  <td 
                    onClick={() => history.push({pathname:'/timeline',
                        state:{data:item}})}
                        >{item.type === "1" ? "Project":"Task "}</td>
                    <td 
                    onClick={() => history.push({pathname:'/timeline',
                        state:{data:item}})}
                        >{item.status}</td>
                    <td 
                    onClick={() => history.push({pathname:'/timeline',
                        state:{data:item}})}
                        >{item.progress}</td>
                    
                    <td 
                    onClick={() => history.push({pathname:'/timeline',
                        state:{data:item}})}
                        >{format(parseISO(item.updated_at), 'dd MMMM yyyy HH:mm:ss')}</td>
                    <td 
                    onClick={() => history.push({pathname:'/timeline',
                        state:{data:item}})}
                        >{format(parseISO(item.created_at), 'dd MMMM yyyy HH:mm:ss')}
                        </td>
                        {
                    userRole === "user" ? <td>
                    <Button
                    onClick={()=>history.push({pathname:'/update-task', state:{data:item}})}>
                      Update</Button>
                  </td> : null
                  }
                  </tr>): null
                )))
                :
                null
              }
              </tbody>
            </Table>
            
            {
              isAnyTask? null:
              (
                <p>tidak ada task {statusNama}</p>
              )
            }
                  <div style={{padding:20}}>
                  <Pagination
                    prev
                    next
                    last
                    first
                    maxButtons={5}
                    size='xs'
                    layout={['total', '-', '|', 'pager']}
                    total={dataTask.length}
                    limit={5}
                    activePage={pageTask}
                    onChangePage={setPageTask}
                  />

      </div>
          </Card>
        </Container>
    </div>
    )
}