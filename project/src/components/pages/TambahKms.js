import AdminMenu from "../includes/MenuAdmin";
import { Form, Button, Card, Container  } from "react-bootstrap";
import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";
import { useSelector } from "react-redux";
import { ArrowLeftShort} from "react-bootstrap-icons";
import { Uploader} from 'rsuite';
import swal from 'sweetalert';
import { useRef } from "react";

export default function TambahKms(){
  const history = useHistory()
  const session = useSelector(state=>state.user.session)

  const [fileList, setFileList] = useState([]);
  const [selectedValue, setSelectedValue] = useState({
    projectName:'',
    fileName:'',
    file:''
  });
  const uploader = useRef();

  const handleInputChange = (event) =>{
    setSelectedValue(prevNote=> ({
      ...prevNote, [event.target.name]:event.target.value
      }))
      
  }

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

  function handleClick() {
    history.goBack();
  }

  const sendForm = async (event) => {
    event.preventDefault();
    const formData = new FormData();

    for (let i = 0; i < fileList.length; i++) {
        const file = fileList[i];
      
        if (file) {
          formData.append('file', file.blobFile, file.name);
        } else {
          // Handle the case where fileList[i] is undefined
          console.error(`File at index ${i} is undefined`);
        }
      }
    formData.append('project_name', selectedValue.projectName);
    formData.append('file_name', selectedValue.fileName);

    const response = await axios.post(`${process.env.REACT_APP_API_JOBCARD}/kms`, formData, {
        headers: {
          Authorization: 'Bearer ' + session,
          'Content-Type': 'multipart/form-data',
        },
      });
    if (response.status === 200){
      swal('Berhasil', 'Dokumen berhasil ditambahkan', "success");
      history.goBack()
    }
    else{
      swal('Gagal', 'Dokumen gagal ditambahkan', "error");
      // history.goBack()
    }
      
  }
    return(
        
      <>
      <AdminMenu></AdminMenu>
        <Container className='mt-5'>
          
          <Card style={{  marginBottom:'4rem' }}> 
                <Card.Body>
                <a onClick={()=>handleClick()} style={{ cursor: 'pointer' }}><ArrowLeftShort/> Back</a>
                  <h4>Tambah Dokumen KMS</h4>
                    <Form onSubmit={sendForm}  autoComplete="off">
                        <Form.Group>
                            <Form.Label>Nama Proyek</Form.Label>
                            <Form.Control 
                            required
                            onChange= {handleInputChange}
                            name="projectName"
                            value={selectedValue.projectName}/>
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Nama File</Form.Label>
                            <Form.Control 
                            required
                            onChange= {handleInputChange}
                            name="fileName"
                            value={selectedValue.fileName}/>
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