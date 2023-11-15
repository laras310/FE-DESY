import AdminMenu from "../includes/MenuAdmin";
import { Form, Button, Card, Container,  } from "react-bootstrap";
import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { WithContext as ReactTags } from 'react-tag-input';
import axios from "axios";
import './BuatTask.css'

const KeyCodes = {
  comma: 188,
  enter: 13
};

const delimiters = [KeyCodes.comma, KeyCodes.enter];

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
  const [data, setData] = useState({
    name:'',
    pic:'',
    unit:''
  });
  console.log(selectedValue)
  const handleSwitchChange = () => {
    setIsProject(!isProject); // Toggle the state when the switch changes
  };
  const handleInputChange = (e) =>{
    const {value, name} = e.target
    setData(prevNote=> ({
    ...prevNote, [name]:value
    }))
    setSelectedValue(prevNote=> ({
      ...prevNote, [name]:value
      }))
      
  }

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

  const userSuggestions = namaUser.map(user => {
    return {
      id: user.id,
      text: user.name,
    };
  });

  const unitsuggestions = namaUnit.map(unit => {
    return {
      id: unit.id,
      name: unit.name
    };
  });

  const handleDeleteUser = i => {
    setUserTags(userTags.filter((tag, index) => index !== i));
  };

  const handleAdditionUser = tag => {
    setUserTags([...userTags, tag]);
    
  };


  const handleDragUser = (tag, currPos, newPos) => {
    const newTags = userTags.slice();

    newTags.splice(currPos, 1);
    newTags.splice(newPos, 0, tag);

    // re-render
    setUserTags(newTags);
  };

  const handleTagClick = index => {
    console.log('The tag at index ' + index + ' was clicked');
  };

  const sendForm = (e) =>{
    const idArrayAsNumbers = userTags.map(item => parseInt(item.id, 10));
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
        users:idArrayAsNumbers,
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
                            <Form.Label>Nama PIC</Form.Label>
                            <Form.Select aria-label="Default select example"
                            onChange= {handleInputChange}
                            name="pic">
                              <option hidden default>Pilih PIC</option>
                              {userSuggestions.map((user) => (
                              <option value={user.id} >{user.text}</option>
                            ))}
                            </Form.Select>
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
                            <Form.Label>Assign ke</Form.Label>
                            <div id="tags">
                            <ReactTags
                              tags={userTags}
                              suggestions={userSuggestions}
                              delimiters={delimiters}
                              handleDelete={handleDeleteUser}
                              handleAddition={handleAdditionUser}
                              handleDrag={handleDragUser}
                              handleTagClick={handleTagClick}
                              inputFieldPosition="bottom"
                              autocomplete
                              inline
                            /></div>
                        </Form.Group>
                        <Form.Group>
                          <Form.Switch
                          label="Project?"
                          checked={isProject} // Controlled component, using the state variable
                          onChange={handleSwitchChange} // Event handler for switch change
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