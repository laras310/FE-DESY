import AdminMenu from "../includes/MenuAdmin";
import { Form, Button, Card, Container, Row, Spinner} from "react-bootstrap";
import { useEffect, useState } from "react";
import { useHistory, useLocation } from "react-router-dom";
import axios from "axios";
import { ArrowLeftShort} from "react-bootstrap-icons";
import Select from 'react-select';
import swal from 'sweetalert';
import { useSelector } from "react-redux";
import { Uploader } from "rsuite";
import { useRef } from "react";

export default function EditKms(){
  const history = useHistory()  
  const location = useLocation()
  const [loading, setLoading] = useState(false)
  const session = useSelector(state=>state.user.session)
  const data = location.state;
  const uploader = useRef();
  const [fileList, setFileList] = useState([{
    name:data.file_name,
    url : data.path
  }]);
  
  const [selectedValue, setSelectedValue] = useState({
    project_name:data.project_name,
    file_name:data.file_name,
  });

  const handlePreview = (filelist) => {
    // Tampilkan pratinjau file dalam tampilan modul atau lakukan tindakan kustom lainnya
    window.open(`https://jobcard-api.pins.co.id/`+filelist.url, '_blank').focus()
  };


// handle change project name and file name
  const handleInputChange = (event) =>{
    setSelectedValue(prevNote=> ({
      ...prevNote, [event.target.name]:event.target.value
      }))
      
  }
  //handle change file
  const handleChange = (fileList) => {
    // Validasi jumlah file
    if (fileList.length > 1) {
      swal("Warning","Hanya dapat mengunggah maksimal 1 file.","warning");
      setFileList(fileList.slice(0,1))
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
  
  const patchForm = async (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append('project_name', selectedValue.project_name);
    formData.append('file_name', selectedValue.file_name);
    formData.append('_method', "PATCH");


    for (let i = 0; i < fileList.length; i++) {
        const file = fileList[i];
      
        if (file.type==='blob') {
          formData.append('file', file.blobFile, file.name);
        } 
      }
      axios({
        method: "POST",
        url: `${process.env.REACT_APP_API_JOBCARD}/kms/${data.id}`,
        headers: {
          Authorization: 'Bearer ' + session,
          'Content-Type': 'multipart/form-data',
        },
        data:formData
      })
      .then((response) => {
        swal('Berhasil', 'Dokumen berhasil ditambahkan', "success");
        history.goBack()
      })
      .catch((error) => {
        swal('Gagal', 'Dokumen gagal ditambahkan', "error");
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
                  <h4>Edit Dokumen KMS</h4>
                    <Form 
                    onSubmit={patchForm}  autoComplete="off"
                    >
                        <Form.Group>
                            <Form.Label>Nama Proyek</Form.Label>
                            
                            <Form.Control 
                            onChange= {handleInputChange}
                            name="project_name"
                            value={selectedValue.project_name}/>
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Nama File</Form.Label>
                            <Form.Control 
                            onChange= {handleInputChange}
                            name="file_name"
                            value={selectedValue.file_name}/>
                        </Form.Group>

                        <Form.Group>
                            <Form.Label>File</Form.Label>
                            <Uploader
                            required
                            fileList={fileList}
                            accept="image/*,.pdf"
                            autoUpload={false}
                            onChange={handleChange}
                            ref={uploader}
                            draggable
                            onPreview={handlePreview}
                            onUpload={() => {
                                // Menggunakan ref untuk mendapatkan status unggahan
                                if (uploader.current) {
                                uploader.current.start();
                                }
                            }}
                            >
                                <Button className="btn btn-warning" style={{backgroundColor:"#f0f0f0", color:"black"}}>Select file</Button>
                            </Uploader>
                        </Form.Group>
                        <Button onClick={()=>history.goBack()} className="btn-danger my-4" size="small">Batal</Button>
                        <Button type="submit" className="m-4">Submit</Button>
                    </Form>
                </Card.Body>
            
           </Card>
        {/* </Container>  */}
    </Container>
    </>
    )
}