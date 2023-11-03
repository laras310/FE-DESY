import Header from "../includes/Header";
import MyBurgerMenu from "../includes/MyBurgerMenu";
import DataTable from 'react-data-table-component';
import { ListGroup, Button, Card, Container } from "react-bootstrap";
import { useState } from "react";
import ZeroList from "../includes/ZeroList";
// import Button from "react-bootstrap/Button";

const data = [
    { id: 1, projectName: 'Pesan 1',namaAM: 'Jane Doe', unit:'Bisnis', starred: false, update:'1 Mei 2023, 11:14:21' },
    { id: 2, projectName: 'Pesan 2',namaAM: 'Jane Doe', unit:'Bisnis', starred: true, update:'1 Mei 2023, 11:14:21'},
    { id: 3, projectName: 'Pesan 3',namaAM: 'Jane Doe', unit:'Bisnis', starred: false, update:'1 Mei 2023, 11:14:21'},
  ];

const columns=[
    {
        name: '',
        selector: row=>row.starred,
    },
    {
        name: 'Project',
        selector: row=>row.projectName,
    },
    {
        name: 'Nama AM',
        selector: row=>row.namaAM,
    },
    {
        name: 'Unit Project',
        selector: row=>row.unit,
    },
    {
        name: 'Update',
        selector: row=>row.unit,
    },
]

export default function ListPekerjaan(){
    // const alertClicked = () => {
    //     alert('You clicked the third ListGroupItem');
    //   };
    
    //   const [items, setItems] = useState(initialItems);

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
            <DataTable
            columns={columns}
            data={data}
            />
            {/* <Card >
            <ListGroup >
                {items.map((item) => (
                <ListGroup.Item key={item.id} action onClick={alertClicked}>
                    <Container className="d-flex flex-row">
                    <Button
                    variant="light"
                    onClick={() => toggleStar(item.id)}
                    className="float-right"
                    >
                        <p>{item.starred ? '⭐' : '☆'}</p>
                    
                    </Button>
                    <Container className="d-flex flex-column">
                        <p>{item.projectName}</p>
                        <p>{item.unit}</p>
                        
                    </Container>
                    </Container>
                    
                    
                    
                    
                </ListGroup.Item>
                ))}
            </ListGroup>
            </Card> */}
        </div>
    </div>
    )
}