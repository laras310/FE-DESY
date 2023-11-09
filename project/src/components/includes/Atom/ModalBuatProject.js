import { Card, Button, Form, FormGroup, FormControl, FormLabel } from 'react-bootstrap';
import Modal from 'react-bootstrap/Modal';
import {Row, Col} from 'react-bootstrap';

export default function ModalBuatPekerjaan(props) {
  const timestamp = Date.now();
  // const formatDate = (timestamp) => {
  //   const options = { day: "numeric",year: "numeric", month: "long",  hour: 'numeric', hour24:'true'}
  //   return new Date(timestamp).toLocaleDateString(undefined, options)
  // }
  const formatDate=new Intl.DateTimeFormat('en-US', {year: 'numeric', month: '2-digit',day: '2-digit', hour: '2-digit', minute: '2-digit', second: '2-digit'}).format(timestamp)
    return (
      <Modal
        {...props}
        // size="md"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header>
          <Modal.Title>Buat Project Baru</Modal.Title>
        </Modal.Header>
        <Form>
        <Modal.Body>
          <Form.Group as={Row} className="mb-3" controlId="formHorizontalEmail">
            <Form.Label column sm={3}>
              Tanggal
            </Form.Label>
            <Col sm={9}>
              <Form.Control plaintext readOnly defaultValue={formatDate}/>
            </Col>
          </Form.Group>
          
          <Form.Group as={Row} className="mb-3" controlId="formHorizontalEmail">
            <Form.Label column sm={3}>
              Nama Project
            </Form.Label>
            <Col sm={9}>
              <Form.Control type="text" placeholder="Project" />
            </Col>
          </Form.Group>

          <Form.Group as={Row} className="mb-3" controlId="formHorizontalPassword">
            <Form.Label column sm={3}>
              PIC
            </Form.Label>
            <Col sm={9}>
              <Form.Control type="text" placeholder="PIC" />
            </Col>
          </Form.Group>
          <Form.Group as={Row} className="mb-3" controlId="formHorizontalPassword">
            <Form.Label column sm={3}>
              Unit
            </Form.Label>
            <Col sm={9}>
              <Form.Control type="text" placeholder="Unit" />
            </Col>
          </Form.Group>
          <Form.Group as={Row} className="mb-3" controlId="formHorizontalPassword">
            <Form.Label column sm={3}>
              Assign ke
            </Form.Label>
            <Col sm={9}>
              <Form.Control type="text" placeholder="John Doe" />
            </Col>
          </Form.Group>
          <fieldset>
            <Form.Group as={Row} className="mb-3">
              <Form.Label as="legend" column sm={3}>
                Status
              </Form.Label>
              <Col sm={9}>
                <Form.Check
                  type="radio"
                  label="Project"
                  name="formHorizontalRadios"
                  id="formHorizontalRadios1"
                />
                <Form.Check
                  type="radio"
                  label="Non Project"
                  name="formHorizontalRadios"
                  id="formHorizontalRadios2"
                />
              </Col>
            </Form.Group>
          </fieldset>
    
        </Modal.Body>
        <Modal.Footer>
          <Button type="submit">submit</Button>
            <Button onClick={props.onHide} className='btn btn-danger'>Close</Button>
          </Modal.Footer>
        </Form>
        
      </Modal>
    );
  }