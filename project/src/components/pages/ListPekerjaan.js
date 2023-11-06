import Header from "../includes/Header";
import MyBurgerMenu from "../includes/MyBurgerMenu";
import { ListGroup, Button, Card, Container, Table } from "react-bootstrap";
import { useState } from "react";
import { Star, StarFill, ChatDots, Paperclip } from "react-bootstrap-icons";
// import ZeroList from "../includes/ZeroList";
import styled from 'styled-components';
// import Table from "react-bootstrap/Table";

const StyledContainer = styled(Container)`
  // transition: transform 0.2s;

  // &:hover {
  //   transform: scale(1.05);
  // }
`
;


const initialItems = [
    { id: 1, projectName: 'Project 1',namaAM: 'Jane Doe', unit:'Bisnis', starred: false, update:'1 Mei 2023, 11:14:21' },
    { id: 2, projectName: 'Project 2',namaAM: 'Jane Doe', unit:'Bisnis', starred: true, update:'1 Mei 2023, 11:14:21'},
    { id: 3, projectName: 'Project 3',namaAM: 'Jane Doe', unit:'Bisnis', starred: false, update:'1 Mei 2023, 11:14:21'},
  ];

export default function ListPekerjaan(){
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
      
      <MyBurgerMenu/>
      <Header></Header>
      {/* <ZeroList/> */}
        
        <div className="p-4">
            {/* <DataTable
            columns={columns}
            data={data}
            /> */}


            {/* <Card >
            <ListGroup >
                {items.map((item) => (
                <ListGroup.Item key={item.id} >
                    <StyledContainer className="d-flex flex-row justify-content-center align-items-center">
                        <p onClick={() => toggleStar(item.id)}>{item.starred ? <Star className="align-middle"></Star> : <StarFill className="text-warning"></StarFill>}</p>
                        <Container className="d-flex flex-row">
                            <Container className="d-flex flex-column" action onClick={alertClicked}>
                                <p className="m-0">{item.projectName}</p>
                                <p className="m-0">{item.unit}</p>
                            </Container>
                            <Container className= "d-flex flex-column align-items-end">
                                <p className="small">Update Terakhir {item.update}</p>
                                <div className="d-flex flex-row">
                                    <h4 className="align-self-end mx-4"><Paperclip/> 1</h4>
                                    <h4><ChatDots/> 2</h4>
                                </div>
                            </Container>
                        </Container>    
                    </StyledContainer>
                </ListGroup.Item>
                ))}
            </ListGroup>
            </Card> */}
          <h1>Pekerjaan Berjalan</h1>
          <Container 
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
                    {/* <td></td> */}
                  </tr>
                ))}
              </tbody>
            </Table>
          </Container>
        </div>
    </div>
    )
}