import AdminMenu from "../includes/MenuAdmin";
import { Form, Button, Card, Container, Row  } from "react-bootstrap";
import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";
import {CheckPicker, SelectPicker } from 'rsuite';

export default function BuatTask(){
  const history = useHistory()  
  const [namaUser, setNamaUser] = useState([])
  const [namaUnit, setNamaUnit] = useState([])

  const [userTags, setUserTags] = useState([
  ]);
  const [isProject, setIsProject] = useState(0);
  const [selectedValue, setSelectedValue] = useState({
    name:'',
    pic:'',
    unit:''
  });

  const handleSwitchChange = () => {
    setIsProject(!isProject); // Toggle the state when the switch changes
  };
  const handleInputChange = (e) =>{
    const {value, name} = e.target
    // setData(prevNote=> ({
    // ...prevNote, [name]:value
    // }))
    setSelectedValue(prevNote=> ({
      ...prevNote, [name]:value
      }))
      
  }

  const handleChange = (values) => {
    setUserTags(values);
    console.log(userTags)
  };

  const handleChangePic = (values) => {
    const name='pic'
    setSelectedValue(prevNote=> ({
      ...prevNote, [name]:values
      }))
  };

  useEffect(()=>{
    
    const fetchPic = async ()=>{
      try{
        const [request1, request2] = await Promise.all([
          axios.get('https://api.pins.co.id/api/cms/user/get', {headers: {
            Authorization: 'Bearer ' + localStorage.getItem('access_token')
          }}),
          axios.get('https://jobcard-api.pins.co.id/api/task/each-unit', {headers: {
            Authorization: 'Bearer ' + localStorage.getItem('access_token')
          }}),
        ]);
        // const response= await axios.get('https://jobcard-api.pins.co.id/api/task/each-user');
        const users = request1.data.data;
        const units = request2.data.data
        const usersSuggestions = users.map(user => ({
          id: String(user.id),
          name: user.name
          }));
        const unitSuggestions = units.map(unit => ({
          id: String(unit.id),
          name: unit.name
          }));
        setNamaUser(usersSuggestions);
        setNamaUnit(unitSuggestions);
      }
      catch(error){
        console.error('error fetching pic data: ', error);
      }
    };
    fetchPic()
    
  }, []);

const userSuggestions= namaUser.map(user=>{
  return{ label: user.name, value: user.id }
})
  const unitsuggestions = namaUnit.map(unit => {
    return {
      id: unit.id,
      name: unit.name
    };
  });

  const sendForm = (e) =>{
    axios({
      method: 'POST',
      headers: {
        Authorization: 'Bearer ' + localStorage.getItem('access_token')
      },
      url: 'https://jobcard-api.pins.co.id/api/task',
      data: {
        name:selectedValue.name,
        pic_id:selectedValue.pic,
        unit_id:selectedValue.unit,
        users:userTags,
        type:isProject,
        status: "awal"
      },
    })
      .then(response => {
        alert('berhasil')
        history.goBack()
      })
      .catch(error => {
        if (error.response) {
          // The request was made, but the server responded with a non-2xx status code
          console.error("Error status:", error.response.status);
          console.error("Error data:", error.response.data);
        } else {
          // Something happened in setting up the request that triggered an error
          console.error("Error message:", error.message);
        }
      });
      e.preventDefault();
  }

    return(
        
      <>
      <AdminMenu></AdminMenu>
        <Container className='mt-5'>
          
          <Card style={{  marginBottom:'4rem' }}> 
                <Card.Body>
                  <h2>Buat Task</h2>
                    <Form onSubmit={sendForm}>
                        <Form.Group>
                            <Form.Label>Nama Proyek</Form.Label>
                            <Form.Control 
                            onChange= {handleInputChange}
                            name="name"
                            value={selectedValue.name}/>
                        </Form.Group>
                        <Form.Group>
                          <Row>
                            <Form.Label>Nama PIC</Form.Label>
                            <SelectPicker
                            data={userSuggestions}
                            onChange={handleChangePic}
                            value={selectedValue.pic}
                            name="pic"
                            />
                            </Row>
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Nama Unit</Form.Label>
                            <Form.Select aria-label="Default select example"
                            onChange= {handleInputChange}
                            name="unit">
                              <option hidden>Pilih Unit</option>
                              {unitsuggestions.map((unit) => (
                              <option value={unit.id} >{unit.name}</option>
                            ))}
                            </Form.Select>
                        </Form.Group>
                        <Form.Group>
                          <Row>
                            <Form.Label>Assign ke</Form.Label>
                            <CheckPicker
                            data={userSuggestions}
                            value={userTags}
                            onChange={handleChange}
                            />
                            </Row>
                        </Form.Group>
                        <Form.Group>
                          <Form.Switch
                          label="Project?"
                          checked={isProject} // Controlled component, using the state variable
                          onChange={handleSwitchChange} // Event handler for switch change
                          className="my-3"
                          />
                        </Form.Group>

                        <Button onClick={()=>history.goBack()} className="btn-danger" size="small">Back</Button>
                        <Button type="submit">Submit</Button>
                    </Form>
                </Card.Body>
            
           </Card>
        {/* </Container>  */}
    </Container>
    </>
    )
}