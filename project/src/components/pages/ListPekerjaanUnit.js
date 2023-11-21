import MyBurgerMenu from "../includes/MyBurgerMenu";
import { Card, Container, Table, Button} from "react-bootstrap";
import { useHistory } from "react-router-dom";
import { ArrowLeftShort} from "react-bootstrap-icons";
import { useLocation } from "react-router-dom";
import { format, parseISO } from 'date-fns';
import AdminMenu from "../includes/MenuAdmin";
import {Pagination} from "rsuite";
import { useState, useEffect } from "react";

export default function ListPekerjaanUnit(){
  const history = useHistory()
  const location = useLocation();
  const statusNama = location.state.status;
  const data = location.state.data;
  const userRole= localStorage.getItem('role')
  const [dataProject, setDataProject] = useState([])
  const [dataTask, setDataTask] = useState([])
  const [page, setPage] = useState(1);
  const [pageTask, setPageTask] = useState(1);

function handleClick() {
  history.goBack();
}
useEffect(()=>{
  setDataProject(data.filter(item => item.type === "1")) ;
  setDataTask(data.filter(item => item.type === "0"));
}, []);

const isAnyProject = dataProject.some(data => data.status === statusNama);
const isAnyTask = dataTask.some(data=>data.status === statusNama)
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
            <h4>Pekerjaan {statusNama}</h4>
            
            <Table hover className="rounded text-center" responsive="sm" >
              <thead>
                <tr>
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
                
                {isAnyProject? 
                (dataProjectPaginated.map((item) => (
                 item.status === statusNama ? (
                  <tr key={item.id} >
                    {/* <td onClick={() => toggleStar(item.id,item.pivot.is_favorite)}>
                      {item.pivot.is_favorite === 0 ? <StyledStar className="align-middle" /> : <StyledStarFill className="text-warning" />}
                    </td> */}
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
            <a onClick={()=>handleClick()} style={{ cursor: 'pointer' }}><ArrowLeftShort/> Back</a>
            <h4>Task {statusNama}</h4>
            
            <Table hover className="rounded text-center" responsive="sm" >
              <thead>
                <tr>
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
                
                {isAnyTask? 
                (data.map((item) => (
                 item.status === statusNama ? (
                  <tr key={item.id} >
                    {/* <td onClick={() => toggleStar(item.id,item.pivot.is_favorite)}>
                      {item.pivot.is_favorite === 0 ? <StyledStar className="align-middle" /> : <StyledStarFill className="text-warning" />}
                    </td> */}
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
            }                  <div style={{padding:20}}>
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