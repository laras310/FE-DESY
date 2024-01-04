import AdminMenu from "../includes/MenuAdmin";
import { Form, Button, Card, Container, Row, Spinner} from "react-bootstrap";
import { useEffect, useState } from "react";
import { useHistory, useLocation } from "react-router-dom";
import axios from "axios";
import { ArrowLeftShort} from "react-bootstrap-icons";
import Select from 'react-select';
import swal from 'sweetalert';
import { useSelector } from "react-redux";

export default function EditTask(){
  const history = useHistory()  
  const location = useLocation()
  const task = location.state.detail
  const [loading, setLoading] = useState(true)
  const session = useSelector(state=>state.user.session)
  const [namaUser, setNamaUser] = useState([])
  const [namaUnit, setNamaUnit] = useState([])
  const [userTags, setUserTags] = useState([]);
  const [isProject, setIsProject] = useState(task.type);

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
          value: String(user.id),
          label: user.name
          }));
        const unitSuggestions = units.map(unit => ({
          value: String(unit.id),
          label: unit.name
          }));
        setNamaUser(usersSuggestions);
        setNamaUnit(unitSuggestions);

        setLoading(false);

      }
      catch(error){
        console.error('error fetching pic data: ', error);
      }
    };
    fetchPic()
    
  }, [task]);

const userSuggestions= namaUser.map(user=>{
  return{ label: user.label, value: user.value }
})

  const unitsuggestions = namaUnit.map(unit => {
    return {
      value: unit.value,
      label: unit.label
    };
  });

  let defaultValuePic = userSuggestions.find(user => user.value === String(task.pic.id))
  let defaultValueUnit = unitsuggestions.find(unit => unit.value === String(task.unit_id))
  // let defaultValueUser= "yes"
  let defaultValueUser = task.users.map(value => {
    const foundUser = userSuggestions.find(user => user.value === String(value.id));
    return foundUser || null; // Gunakan null atau nilai default lain jika tidak ditemukan
  });
  const [selectedValue, setSelectedValue] = useState({
    name:task.name,
    pic:defaultValuePic,
    unit:defaultValueUnit
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
      defaultValuePic=values;
  };

  const handleChangeUnit = (values) => {
    const name='unit'
    setSelectedValue(prevNote=> ({
      ...prevNote, [name]:values.value
      }))
    defaultValueUnit= values
  };
  

  const sendForm = (e) =>{
    console.log(selectedValue.unit)
    axios({
      method: 'PATCH',
      headers: {
        Authorization: 'Bearer ' + session
      },
      url: `${process.env.REACT_APP_API_JOBCARD}/task/`+task.id,
      data: {
        name:selectedValue.name,
        pic_id:selectedValue.pic,
        unit_id:selectedValue.unit,
        users:userTags,
        type:isProject
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

  if (loading) {
    return     <div >
      <AdminMenu></AdminMenu>
      <Container className='justify-content-center d-flex align-items-center flex-column p-3 pt-5'>
      <Spinner animation="border" role="status">
    <span className="visually-hidden">Loading...</span>
  </Spinner></Container>
  </div>
  }


    return(
        
      <>
      <AdminMenu></AdminMenu>
        <Container className='mt-5'>
          
          <Card style={{  marginBottom:'4rem' }}> 
                <Card.Body>
                <a onClick={()=>handleClick()} style={{ cursor: 'pointer' }}><ArrowLeftShort/> Back</a>
                  <h4>Edit {task.type === "1" ?
                  "Project" : "Task"} {task.name}</h4>
                    <Form onSubmit={sendForm}  autoComplete="off">
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
                            defaultValue={defaultValuePic}
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
                            defaultValue={defaultValueUnit}
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
                            defaultValue={defaultValueUser}
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