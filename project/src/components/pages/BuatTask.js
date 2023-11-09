import Header from "../includes/Header";
import AdminMenu from "../includes/MenuAdmin";
import { Form, Button, Card, Container, Table } from "react-bootstrap";
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

export default function BuatTask(){
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
            <h1>Buat Task</h1>
          <Button>Back</Button>
           <Card>
            <Card.Title>
                <Card.Body>
                    <Form>
                        <Form.Group>
                            <Form.Label>Nama Proyek</Form.Label>
                            <Form.Control></Form.Control>
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Nama PIC</Form.Label>
                            <Form.Control></Form.Control>
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Nama Unit</Form.Label>
                            <Form.Control></Form.Control>
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Assign ke</Form.Label>
                            <Form.Control
                            aria-describedby="passwordHelpBlock"></Form.Control>
                            <Form.Text id="passwordHelpBlock" muted>
                                Bila penerima lebih dari satu, pisahkan dengan koma "," ex: "Martin, Juan"
                            </Form.Text>
                        </Form.Group>
                        
                        <Button>Submit</Button>
                    </Form>
                </Card.Body>
            </Card.Title>
           </Card>
        </div> 
    </div>
    )
}