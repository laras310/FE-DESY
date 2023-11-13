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
  const [selectedValue, setSelectedValue] = useState({
    name:'',
    pic:'',
    unit:'',
    assign:''
  });
  const [data, setData] = useState({
    name:'',
    pic:'',
    unit:'',
    assign:''
  });

  // const handleInputChange = (e) => {
  //   setSelectedValue(e.target.value);
  // };

  const handleInputChange = (e) =>{
    const {value, name} = e.target
    setData(prevNote=> ({
    ...prevNote, [name]:value
    }))
    setSelectedValue(prevNote=> ({
      ...prevNote, [name]:value
      }))
  }
    return(
        
      <>
      <AdminMenu></AdminMenu>
        <Container className='mt-5'>
        {/* <Container className="p-4"> */}
          
          <Card style={{  marginBottom:'4rem' }}> 
                <Card.Body>
                  <h2>Buat Task</h2>
                  
                    <Form>
                        <Form.Group>
                            <Form.Label>Nama Proyek</Form.Label>
                            <Form.Control></Form.Control>
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Nama pic</Form.Label>
                            <Form.Control id="pic" name="pic"
                            as="input"
                            list="picOptions"
                            placeholder="Type to search..."
                            value={selectedValue.pic}
                            onChange={handleInputChange}
                            />
                            <datalist id="picOptions">
                              <option value="pic 1" />
                              <option value="pic 2" />
                              <option value="pic 3" />
                              <option value="pic 1" />
                              <option value="pic 2" />
                              <option value="pic 3" />
                              <option value="pic 1" />
                              <option value="pic 2" />
                              <option value="pic 3" />
                              <option value="pic 1" />
                              <option value="pic 2" />
                              <option value="pic 3" />

                              {/* Add more options as needed */}
                            </datalist>
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Nama Unit</Form.Label>
                            <Form.Control id="unit" name="unit"
                            as="input"
                            list="unitOptions"
                            placeholder="Type to search..."
                            value={selectedValue.unit}
                            onChange={handleInputChange}
                            />
                            <datalist id="unitOptions">
                              <option value="Unit 1" />
                              <option value="Unit 2" />
                              <option value="Unit 3" />
                              <option value="Unit 1" />
                              <option value="Unit 2" />
                              <option value="Unit 3" />
                              <option value="Unit 1" />
                              <option value="Unit 2" />
                              <option value="Unit 3" />
                              <option value="Unit 1" />
                              <option value="Unit 2" />
                              <option value="Unit 3" />

                              {/* Add more options as needed */}
                            </datalist>
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Assign ke</Form.Label>
                            <Form.Control id="assign" name="assign"
                            as="input"
                            list="assignOptions"
                            placeholder="Type to search..."
                            value={selectedValue.assign}
                            onChange={handleInputChange}/>
                            <datalist id="assignOptions">
                              <option value="Unit 1" />
                              <option value="Unit 2" />
                              <option value="Unit 3" />
                              <option value="Unit 1" />
                              <option value="Unit 2" />
                              <option value="Unit 3" />
                              <option value="Unit 1" />
                              <option value="Unit 2" />
                              <option value="Unit 3" />
                              <option value="Unit 1" />
                              <option value="Unit 2" />
                              <option value="Unit 3" />

                              {/* Add more options as needed */}
                            </datalist>
                        </Form.Group>

                        <Button onClick={()=>history.goBack()} className="btn-danger" size="small">Back</Button>
                        <Button>Submit</Button>
                    </Form>
                </Card.Body>
            
           </Card>
        {/* </Container>  */}
    </Container>
    </>
    )
}