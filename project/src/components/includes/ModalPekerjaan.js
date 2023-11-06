import { Card, Button, Form } from 'react-bootstrap';
import Modal from 'react-bootstrap/Modal';
import ProgressBar from 'react-bootstrap/ProgressBar';

export default function ModalPekerjaan(props) {
    return (
      <Modal
        {...props}
        size="md"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Prototip Jobcard
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <h4>Nama AM</h4>
          <ProgressBar now={60} label={60}></ProgressBar>
          <Form>
            <Card className='mt-3'>
              <Form.Control
              as="textarea" placeholder="add new progress"></Form.Control>
              {/* <p>
              Telah dilakukan meeting terkait Job Card, dengan hasil:
  Prototip menggunakan Figma
  Development versi Web
          </p> */}
          </Card>
          </Form>
          
          
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={props.onHide}>Close</Button>
        </Modal.Footer>
      </Modal>
    );
  }