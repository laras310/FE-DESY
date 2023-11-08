import { Container, Row,Col, Card } from "react-bootstrap";
import axios from "axios";
import { useState,useEffect } from "react";

export default function CardAdmin(){
    const [jobs, setJobs] = useState([]);
    const [person, setPerson] =useState([])
    useEffect(() => {
        axios({
          method: "GET",
          url: "https://jobcard-api.pins.co.id/api/task/all",
        //   headers: {
        //     Authorization: 'Bearer ' + localStorage.getItem('access_token')
        //   }
        })
          .then((response) => {
            const res = response.data.data;
            setJobs(res);
          })
          .catch((error) => {
            if (error.response) {
              console.log(error.response.data);
              console.log(error.response.status);
              console.log(error.response.headers);
            } else if (error.request) {
              console.log(error.request);
            } else {
              console.log(error.message);
            }
          });
      }, []);
      
      useEffect(() => {
        // Memantau perubahan nilai profil
        console.log(jobs);
      }, [jobs]);
    return(
        <Container fluid>
            <Row>
                {jobs.map((job)=>(
                <Col md={4}>
                    <Card className='my-3 shadow' style={{height:'30vh'}}>
                        <Card.Body>
                            <Card.Title>{job.name}</Card.Title>
                            <Card.Subtitle>{job.unit.name}</Card.Subtitle>
                            <hr></hr>
                            <Card.Text className='d-flex justify-content-center flex-row'>
                            <Container className='d-flex justify-content-center flex-column'>
                                <p>Idle</p>
                                <p>0</p>
                            </Container>
                            <Container className='d-flex justify-content-center flex-column'>
                                <p>Berjalan</p>
                                <p>0</p>
                            </Container>
                            <Container className='d-flex justify-content-center flex-column'>
                                <p>Selesai</p>
                                <p>0</p>
                            </Container>
                            </Card.Text>
                        </Card.Body>
                    </Card>
                </Col>
                ))}
              
                
              
              
            </Row>
           </Container>
    )
    
}