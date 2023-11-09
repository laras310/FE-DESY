import React from 'react';
import { useState, useEffect } from 'react';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import ToggleButton from 'react-bootstrap/ToggleButton';
import { Container, Row,Col, Card } from "react-bootstrap";
import axios from 'axios';

function FilterBar() {
    const [radioValue, setRadioValue] = useState('person');
    
  
    const radios = [
      { name: 'Per Person', value: 'person' },
      { name: 'Per Unit', value: 'unit' }
    ];

    //perorang
    const [data, setData]=useState([])
    
    //perproject
    const [jobs, setJobs] = useState([]);

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
          // setJobs(res);
          const initialDataPerson = {};
          const initialDataProject = {};

          //jumlah job per orang
          res.forEach(item => {
            const nama = item.pic.name;
            const status = item.status;
            const unit = item.unit.name;
            const project = item.name;
            // console.log(project)

            if (!initialDataPerson[nama] 
              // & !initialDataProject[project]
              ) {
              initialDataPerson[nama] = {
                idle: 0,
                onProgress: 0,
                finished: 0,
                unit:unit
              };
              // initialDataProject[project] = {
              //   idle: 0,
              //   onProgress: 0,
              //   finished: 0,
              //   unit:unit
              // };
              // console.log( initialDataProject[project])
            }
            if (!initialDataProject[project]
              ) {
              initialDataProject[project] = {
                idle: 0,
                onProgress: 0,
                finished: 0,
                unit:unit
              };
              // console.log( initialDataProject[project])
            }
            if (status === "idle") {
              initialDataPerson[nama].idle++;
              initialDataProject[project].idle++;
            } else if (status === "On progress") {
              initialDataPerson[nama].onProgress++;
              initialDataProject[project].onProgress++;
            } else if (status === "finished") {
              initialDataPerson[nama].finished++;
              initialDataProject[project].finished++;
            }
          });
          const dataArray = Object.keys(initialDataPerson).map(nama => ({
            nama,
            unit: initialDataPerson[nama].unit,
            idle: initialDataPerson[nama].idle,
            onProgress: initialDataPerson[nama].onProgress,
            finished: initialDataPerson[nama].finished
          }));

          const dataArrayProject = Object.keys(initialDataProject).map(project => ({
            project,
            unit: initialDataProject[project].unit,
            idle: initialDataProject[project].idle,
            onProgress: initialDataProject[project].onProgress,
            finished: initialDataProject[project].finished
          }));
      
          setData(dataArray);
          setJobs(dataArrayProject);
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
  return (
    <>
      <ButtonGroup style={{padding: "0 12px"}} className='mt-3'>
        {radios.map((radio, idx) => (
          <ToggleButton
            key={idx}
            id={`radio-${idx}`}
            type="radio"
            variant={idx % 2 ? 'outline-success' : 'outline-danger'}
            name="radio"
            value={radio.value}
            checked={radioValue === radio.value}
            onChange={(e) => setRadioValue(e.currentTarget.value)}
          >
            {radio.name}
          </ToggleButton>
        ))}
      </ButtonGroup>
      <Container fluid>
            <Row>
              {radioValue ==="person" ?               
              <>
              {data.map((item)=>(
                <Col md={4}>
                    <Card className='my-3 shadow' style={{height:'30vh'}}>
                        <Card.Body className='text-center'>
                            <Card.Title>{item.nama}</Card.Title>
                            <Card.Subtitle>{item.unit}</Card.Subtitle>
                            <hr></hr>
                            <Card.Text className='d-flex justify-content-center flex-row'>
                            <Container className='d-flex justify-content-center flex-column'>
                                <h5>Idle</h5>
                                <p className='fs-1'>{item.idle}</p>
                            </Container>
                            <Container className='d-flex justify-content-center flex-column'>
                                <h5>Berjalan</h5>
                                <p className='fs-1'>{item.onProgress}</p>
                            </Container>
                            <Container className='d-flex justify-content-center flex-column'>
                                <h5>Selesai</h5>
                                <p className='fs-1'>{item.finished}</p>
                            </Container>
                            </Card.Text>
                        </Card.Body>
                    </Card>
                </Col>
                ))}
              </>
              : 
              <>
              {jobs.map((job)=>(
                <Col md={4}>
                    <Card className='my-3 shadow' style={{height:'30vh'}}>
                        <Card.Body className='text-center'>
                            <Card.Title>{job.project}</Card.Title>
                            <Card.Subtitle>{job.unit}</Card.Subtitle>
                            <hr></hr>
                            <Card.Text className='d-flex justify-content-center flex-row'>
                            <Container className='d-flex justify-content-center flex-column'>
                                <h5>Idle</h5>
                                <p className='fs-1'>{job.idle}</p>
                            </Container>
                            <Container className='d-flex justify-content-center flex-column'>
                                <h5>Berjalan</h5>
                                <p className='fs-1'>{job.onProgress}</p>
                            </Container>
                            <Container className='d-flex justify-content-center flex-column'>
                                <h5>Selesai</h5>
                                <p className='fs-1'>{job.finished}</p>
                            </Container>
                            </Card.Text>
                        </Card.Body>
                    </Card>
                </Col>
                ))}
                </>
              }

            </Row>
           </Container>
    </>
  );
}

export default FilterBar;