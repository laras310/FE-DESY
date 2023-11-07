import Header from "../includes/Header";
import MyBurgerMenu from "../includes/MyBurgerMenu";
import { ListGroup, Button, Card, Container, Table, Form } from "react-bootstrap";
import { useState } from "react";
import { Star, StarFill, ChatDots, Paperclip } from "react-bootstrap-icons";
// import ZeroList from "../includes/ZeroList";
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';

const initialItems = [
    { id: 1, projectName: 'Project 1',namaAM: 'Jane Doe', unit:'Bisnis', starred: false, update:'1 Mei 2023, 11:14:21' },
    { id: 2, projectName: 'Project 2',namaAM: 'Jane Doe', unit:'Bisnis', starred: true, update:'1 Mei 2023, 11:14:21'},
    { id: 3, projectName: 'Project 3',namaAM: 'Jane Doe', unit:'Bisnis', starred: false, update:'1 Mei 2023, 11:14:21'},
  ];

export default function DetailPekerjaan(){
    const [key, setKey] = useState('detail');

//   const toggleStar = (id) => {
//     const updatedItems = items.map((item) => {
//       if (item.id === id) {
//         return { ...item, starred: !item.starred };
//       }
//       return item;
//     });

//     setItems(updatedItems);
//   };
    return(
        <div>
      
            <MyBurgerMenu/>
            <Header></Header>
      {/* <ZeroList/> */}
        
            <div className="p-4">
                <Tabs
                defaultActiveKey="detail"
                id="justify-tab-example"
                className="mb-3"
                justify
                >
                <Tab eventKey="detail" title="Detail">
                {/* <Card> */}
                    <Card.Title>Detail Proyek</Card.Title>
                    <Form>
                        <Form.Group>
                            <Form.Label>Nama Project</Form.Label>
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
                            <Form.Label>Nama Task OKR</Form.Label>
                            <Form.Control></Form.Control>
                        </Form.Group>
                        <Form.Group>
                            {/* <Form.Label>Nama Task OKR</Form.Label> */}
                            <Form.Check type="switch"
                            id="custom-switch"
                            label="Project"/>
                        </Form.Group>
                        <Form.Group>
                            {/* <Form.Label>Nama Task OKR</Form.Label> */}
                            <Form.Check type="switch"
                            id="custom-switch"
                            label="Star"/>
                        </Form.Group>
                    </Form>
                {/* </Card> */}
                </Tab>
                <Tab eventKey="log" title="Log">
                <Form>
                        <Form.Group>
                            <Form.Label>Nama Project</Form.Label>
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
                            <Form.Label>Nama Task OKR</Form.Label>
                            <Form.Control></Form.Control>
                        </Form.Group>
                    </Form>
                </Tab>
                </Tabs>
            {/* <h1>Pekerjaan Berjalan</h1> */}
            {/* <Container 
            className="border border-secondary rounded"
            >
                
                <Table hover className="rounded text-center" responsive="sm">
                <thead>
                    <tr>
                    <th>#</th>
                    <th>Project Name</th>
                    <th>Nama AM</th>
                    <th>Unit</th>
                    <th>Last Update</th>
                    <th>Tindakan</th>
                    </tr>
                </thead>
                <tbody>
                    {items.map((item) => (
                    <tr key={item.id}>
                        <td onClick={() => toggleStar(item.id)}>
                        {item.starred ? <Star className="align-middle" /> : <StarFill className="text-warning" />}
                        </td>
                        <td>{item.projectName}</td>
                        <td>{item.namaAM}</td>
                        <td>{item.unit}</td>
                        <td>{item.update}</td>
                        <td className="d-flex flex-row justify-content-evenly"><h4><Paperclip/> 1</h4>
                        <h4><ChatDots/> 2</h4></td>
                    </tr>
                    ))}
                </tbody>
                </Table>
            </Container> */}
            </div>
        </div>
    )
}