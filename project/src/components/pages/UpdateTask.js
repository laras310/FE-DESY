import { Container, Button, Card, Form, Row, Col} from "react-bootstrap";
import MyBurgerMenu from "../includes/MyBurgerMenu";
import { useLocation, useHistory } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import {Slider, InputNumber, Uploader} from 'rsuite';
import { useRef } from "react";
import { ArrowLeftShort } from "react-bootstrap-icons";
import swal from "sweetalert";

export default function UpdateTask(){
    const location = useLocation()
    const history = useHistory()
    const [description, setDescription] = useState('')
    const data = location.state.data
    const [value, setValue] = useState(data.progress);
    const [fileList, setFileList] = useState([]);
    const uploader = useRef();
    const user_id=sessionStorage.getItem('user_id')

    function handleClick() {
      history.goBack();
  }

  const handleChange = (fileList) => {
    // Validasi jumlah file
    if (fileList.length > 3) {
      swal("Warning","Hanya dapat mengunggah maksimal 3 file.","warning");
      setFileList(fileList.slice(0,3))
      return;
    }

    // Validasi ukuran file
    const invalidFiles = fileList.filter((file) => file.blobFile.size > 2 * 1024 * 1024);
    if (invalidFiles.length > 0) {
      swal("Warning","Ukuran total file melebihi batas 2 MB.","warning")
      const validFiles = fileList.filter((file) => file.blobFile.size <= 2 * 1024 * 1024);
      setFileList(validFiles);
      return;
    }

    // Set file list jika validasi berhasil
    setFileList(fileList);
  };

  

    const handleUpload = async (event) => {
      event.preventDefault();
      if (data) {
      try {
        
        const formData = new FormData();
    
        // Append each file to FormData
        for (let i = 0; i < fileList.length; i++) {
          const file = fileList[i];
        
          if (file) {
            formData.append(`evidence[${i}]`, file.blobFile, file.name);
          } else {
            // Handle the case where fileList[i] is undefined
            console.error(`File at index ${i} is undefined`);
          }
        }
    
        // Append other form data to FormData
        formData.append('user_id', user_id);
        formData.append('task_id', data.id);
        formData.append('progress', value);
        formData.append('description', description);
    
        const response = await axios.post(`${process.env.REACT_APP_API_JOBCARD}/activity`, formData, {
          headers: {
            Authorization: 'Bearer ' + sessionStorage.getItem('access_token'),
            'Content-Type': 'multipart/form-data',
          },
        });
        swal('Berhasil', 'Update berhasil ditambahkan', "success");
        window.location.replace("/user-dashboard");
      } 
      catch (error) {
        console.error('Error uploading files:', error);
      }}
      else {
        // Handle the case where data is undefined or null
        console.error("Data is undefined or null");
      }
    };
    
    return(
        <>
        <MyBurgerMenu/>
      <Container className='justify-content-center d-flex align-items-start flex-column p-3 pt-5' >
        <Container>
            <Card>
                <Card.Body>
                <a onClick={()=>handleClick()} style={{ cursor: 'pointer' }}><ArrowLeftShort/> Back</a>
                <h1>Update Project</h1>

                {/* <Row>
                  <Col md={6}>
                    <p>Nama Project : {data.name}</p>
                    <p>Nama Unit : {data.unit.name}</p>
                  </Col>
                  <Col md={6}> */}
                  <Form 
                onSubmit={(e) => handleUpload(e)}
                autocomplete="off" 
                >
                    <Form.Group>
                        <Form.Label>Range Progress</Form.Label>
                        <Row>
                          <Col >
                            <Slider
                              progress
                              style={{ marginTop: 16 }}
                              value={value}
                              constraint={([start])=>start<=value}
                              onChange={value => {
                                setValue(value);
                              }}
                              tooltip
                            />
                          </Col>
                          <Col >
                            <InputNumber
                              min={0}
                              max={100}
                              value={value}
                              onChange={value => {
                                setValue(value);
                              }}
                            />
                          </Col>
                          <Col>
                          <p>%</p></Col>
                        </Row>
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Deskripsi</Form.Label>
                        <Form.Control
                        as="textarea" placeholder="add new progress"
                        value={description}
                        onChange={e => setDescription(e.target.value)}
                        ></Form.Control>
                    </Form.Group>
                    <Form.Group>
                      <Form.Label>Evidence (maks. 3)</Form.Label>
                    <Uploader
                      fileList={fileList}
                      accept="image/*,.pdf"
                      autoUpload={false}
                      onChange={handleChange}
                      ref={uploader}
                      draggable
                      multiple
                      onUpload={() => {
                        // Menggunakan ref untuk mendapatkan status unggahan
                        if (uploader.current) {
                          uploader.current.start();
                        }
                      }}
                    >
                            <div style={{ height: 200, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <span>Click or Drag files to this area to upload</span>
      </div>
                    </Uploader>
                    </Form.Group>
                    
                    <Button variant="danger" 
                    type="submit" name="submit"
                    // onClick={cekupload}
                    >Submit</Button>
                </Form>
                  {/* </Col>
                </Row> */}
                
                </Card.Body>
            </Card>
        </Container>
           
      </Container>
      </>
    )
}