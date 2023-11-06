import { Card, Button, Form } from 'react-bootstrap';
import Modal from 'react-bootstrap/Modal';
import ProgressBar from 'react-bootstrap/ProgressBar';

export default function ModalBuatPekerjaan(props) {
    return (
      <Modal
        {...props}
        size="md"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Form>
          <Modal.Header closeButton>
            <Modal.Title id="contained-modal-title-vcenter">
              Prototip Jobcard
            </Modal.Title>
          </Modal.Header>

          <Modal.Body>
            <h5>Nama AM</h5>
            <span>Unit</span>
            <ProgressBar now={60} label={60}></ProgressBar>
            
              <Card className='mt-3'>
                <Form.Control
                as="textarea" placeholder="add new progress"></Form.Control>
                
            </Card>
            <Form.Control type="file" className='mt-3'></Form.Control>
          </Modal.Body>

          <Modal.Footer>
          <Button type="submit">submit</Button>
            <Button onClick={props.onHide} className='btn btn-danger'>Close</Button>
          </Modal.Footer>
        </Form>
      </Modal>
    );
  }