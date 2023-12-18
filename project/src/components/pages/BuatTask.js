import AdminMenu from "../includes/MenuAdmin";
import { Form, Button, Card, Container, Row  } from "react-bootstrap";
import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";
import { useSelector } from "react-redux";
import { ArrowLeftShort} from "react-bootstrap-icons";
import Select from 'react-select';
import swal from 'sweetalert';

export default function BuatTask(){
  const history = useHistory()  
  const [namaUser, setNamaUser] = useState([])
  const [namaUnit, setNamaUnit] = useState([])
  const session = useSelector(state=>state.user.session)
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
  const handleInputChange = (event) =>{
    setSelectedValue(prevNote=> ({
      ...prevNote, [event.target.name]:event.target.value
      }))
      
  }

  const handleChange = (values) => {
    const value = values.map(option => option.value);
    setUserTags(value);
  };
  

  const handleChangePic = (values) => {
    const name='pic'
    setSelectedValue(prevNote=> ({
      ...prevNote, [name]:values.value
      }))
  };

  const handleChangeUnit = (values) => {
    const name='unit'
    setSelectedValue(prevNote=> ({
      ...prevNote, [name]:values.value
      }))
  };

  useEffect(()=>{
    
    const fetchPic = async ()=>{
      try{
        const [request1, request2] = await Promise.all([
          axios.get(`${process.env.REACT_APP_API_HOST}cms/user/get`, {headers: {
            Authorization: 'Bearer ' + session
          }}),
          axios.get(`${process.env.REACT_APP_API_JOBCARD}/task/each-unit`, {headers: {
            Authorization: 'Bearer ' + session
          }}),
        ]);
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
      value: unit.id,
      label: unit.name
    };
  });

  const sendForm = (e) =>{
    axios({
      method: 'POST',
      headers: {
        Authorization: 'Bearer ' + sessionStorage.getItem('access_token')
      },
      url: `${process.env.REACT_APP_API_JOBCARD}/task`,
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
        swal("Berhasil", "Project ditambahkan", "success");
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

  function handleClick() {
    history.goBack();
  }
    return(
        
      <>
      <AdminMenu></AdminMenu>
        <Container className='mt-5'>
          
          <Card style={{  marginBottom:'4rem' }}> 
                <Card.Body>
                <a onClick={()=>handleClick()} style={{ cursor: 'pointer' }}><ArrowLeftShort/> Back</a>
                  <h4>Buat Task</h4>
                    <Form onSubmit={sendForm}  autocomplete="off">
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
                            <Select
                            className="basic-single"
                            classNamePrefix="select"
                            isSearchable="true"
                            options={userSuggestions}
                            name="pic"
                            onChange={handleChangePic}
                            />
                            </Row>
                        </Form.Group>
                        <Form.Group>
                          <Row>
                            <Form.Label>Nama Unit</Form.Label>
                            <Select
                            className="basic-single"
                            classNamePrefix="select"
                            isSearchable="true"
                            options={unitsuggestions}
                            onChange={handleChangeUnit}
                            name="unit"
                            />
                          </Row>
                            
                        </Form.Group>
                        <Form.Group>
                          <Row>
                            <Form.Label>Assign ke</Form.Label>
                            <Select
                            className="basic-single"
                            classNamePrefix="select"
                            isSearchable="true"
                            options={userSuggestions}
                            isMulti
                            onChange={handleChange}
                            />
                            {/* <CheckPicker
                            virtualized
                            placement="auto"
                            data={userSuggestions}
                            value={userTags}
                            onChange={handleChange}
                            /> */}
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
                                
                        <Button onClick={()=>history.goBack()} className="btn-danger" size="small">Batal</Button>
                        <Button type="submit" className="mx-4">Submit</Button>
                    </Form>
                </Card.Body>
            
           </Card>
        {/* </Container>  */}
    </Container>
    </>
    )
}