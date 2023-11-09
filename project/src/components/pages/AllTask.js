import Header from "../includes/Header";
import AdminMenu from "../includes/MenuAdmin";
import { ListGroup, Button, Card, Container, Table } from "react-bootstrap";
import { useState } from "react";
import { useHistory } from "react-router-dom";
import { Star, StarFill, ChatDots, Paperclip } from "react-bootstrap-icons";
// import ZeroList from "../includes/ZeroList";
import styled from 'styled-components';
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


const initialItems = [
    { id: 1, projectName: 'Project 1',namaAM: 'Jane Doe', unit:'0%', starred: false, update:'1 Mei 2023, 11:14:21' },
    { id: 2, projectName: 'Project 2',namaAM: 'Jane Doe', unit:'0%', starred: true, update:'1 Mei 2023, 11:14:21'},
    { id: 3, projectName: 'Project 3',namaAM: 'Jane Doe', unit:'0%', starred: false, update:'1 Mei 2023, 11:14:21'},
  ];

export default function AllTask(){
  const history = useHistory()
    const alertClicked = () => {
        alert('You clicked the third ListGroupItem');
      };
    
      const [items, setItems] = useState(initialItems);

  const toggleStar = (id) => {
    const updatedItems = items.map((item) => {
      if (item.id === id) {
        return { ...item, starred: !item.starred };
      }
      return item;
    });

    setItems(updatedItems);
  };
    return(
        <div>
      
      <AdminMenu></AdminMenu>
      <Header></Header>
      {/* <ZeroList/> */}
        
        <div className="p-4">
          <h1>AllTask</h1>
          <Button
          onClick={()=>history.push("/buat-task")}
          >Buat Project</Button>
           <Container 
          className="border border-secondary rounded"
          >
            
            <Table hover className="rounded text-center" responsive="sm">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Project Name</th>
                  <th>Unit</th>
                  <th>Progress(%)</th>
                  <th>Last Update</th>
                  {/* <th>Tindakan</th> */}
                </tr>
              </thead>
              <tbody>
                {items.map((item) => (
                  <tr key={item.id} >
                    <td onClick={() => toggleStar(item.id)}>
                      {item.starred ? <StyledStar className="align-middle" /> : <StyledStarFill className="text-warning" />}
                    </td>
                    <td onClick={()=>history.push('/detail-pekerjaan')}>{item.projectName}</td>
                    <td onClick={()=>history.push('/detail-pekerjaan')}>{item.namaAM}</td>
                    <td onClick={()=>history.push('/detail-pekerjaan')}>{item.unit}</td>
                    <td onClick={()=>history.push('/detail-pekerjaan')}>{item.update}</td>
                    {/* <td className="d-flex flex-row justify-content-evenly"><h4><Paperclip/> 1</h4>
                    <h4><ChatDots/> 2</h4></td> */}
                  </tr>
                ))}
              </tbody>
            </Table>
          </Container>
        </div> 
    </div>
    )
}