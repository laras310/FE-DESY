import { Container, Button, Card, Form} from "react-bootstrap";
import MyBurgerMenu from "../includes/MyBurgerMenu";
import { useLocation, useHistory } from "react-router-dom";
import { useState } from "react";
import axios from "axios";

export default function UpdateTask(){
    const location = useLocation()
    const [task, setTask] = useState([])
    const data = location.state.data
    const history = useHistory()

    const sendForm = (e) =>{
        // const idArrayAsNumbers = userTags.map(item => parseInt(item.id, 10));
        axios({
          method: 'POST',
          headers: {
            Authorization: 'Bearer ' + localStorage.getItem('access_token')
          },
          url: 'https://jobcard-api.pins.co.id/api/activity',
          data: {
            // user_id:,
            // task_id,
            // evidence,
            // progress:,
            // description:,

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
        <MyBurgerMenu/>
      <Container className='justify-content-center d-flex align-items-start flex-column p-3 pt-5' >
        <Container>
            <Card>
                <Card.Body>
                <h1>Update Task</h1>
                <h3>{data.name}</h3>
                <h5>{data.unit.name}</h5>
                <Form>
                    <Form.Group>
                        <Form.Label>Range</Form.Label>
                        <Form.Range value='20'/>
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Deskripsi</Form.Label>
                        <Form.Control
                        as="textarea" placeholder="add new progress"
                        ></Form.Control>
                    </Form.Group>
                    <Form.Group>
                    <Form.Label></Form.Label>
                    <Form.Control type="file" className='mt-3'></Form.Control>
                    </Form.Group>
                    <Button>add more file</Button>
                    <Button>Submit</Button>
                </Form>
                </Card.Body>
            </Card>
        </Container>
           
      </Container>
      </>
    )
}