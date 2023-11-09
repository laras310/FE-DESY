import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Offcanvas from 'react-bootstrap/Offcanvas';
import { Image, Dropdown} from 'react-bootstrap';
import ProfilToggle from './Atom/ProfilToggle';
import NotifToggle from './Atom/NotifToggle';
// import ModalBuatProject from './Atom/ModalBuatProject';

import { useState } from 'react';

export default function AdminMenu(){
  const [showProfilDropdown, setShowProfilDropdown] = useState(false);
  const [showNotifDropdown, setShowNotifDropdown] = useState(false);

  const handleProfilDropdownToggle = () => {
    setShowProfilDropdown(!showProfilDropdown);
  };

  const handleNotifDropdownToggle = () => {
    setShowNotifDropdown(!showNotifDropdown);
  };

  function logout(event){
    localStorage.clear()
  }

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  return(
    <Navbar className="bg-body-tertiary shadow" expand={'lg'}>
      <Container fluid>
        <div className='justify-content-start'>
          <Navbar.Toggle />
          <Navbar.Brand href="/user">
            <Image
              src="/assets/images/PINS-Logo-IoT2.png"
              height="40"
              className="d-inline-block align-top"
              alt="Pins logo"
            />
          </Navbar.Brand>
        </div>

        <Navbar.Offcanvas
          id={`offcanvasNavbar-expand-lg`}
          aria-labelledby={`offcanvasNavbarLabel-expand-lg`}
          placement="start"
        >
          <Offcanvas.Header closeButton>
            <Offcanvas.Title id={`offcanvasNavbarLabel-expand-lg`}>
              Menu
            </Offcanvas.Title>
          </Offcanvas.Header>
          <Offcanvas.Body>
            <Nav className="justify-content-end flex-grow-1 pe-3">
              <Nav.Link 
              href="/admin-dashboard"
              >Home</Nav.Link>
              <Nav.Link href="/all-task">Proyek</Nav.Link>
            </Nav>
                
          </Offcanvas.Body>
        </Navbar.Offcanvas>
        <div className='d-flex justify-content-end align-items-center flex-row'>
          <Dropdown show={showProfilDropdown} onToggle={handleProfilDropdownToggle} align={'end'}>
            <Dropdown.Toggle as={ProfilToggle} id="dropdown-custom-toggle" />
            <Dropdown.Menu>
              <Dropdown.Item href="/login"><Button onClick={(logout)} className='btn-danger w-100'
              >Logout</Button></Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
          <Dropdown show={showNotifDropdown} onToggle={handleNotifDropdownToggle} align={'end'}>
            <Dropdown.Toggle as={NotifToggle} id="dropdown-custom-toggle" />
            <Dropdown.Menu>
              <Dropdown.Item href="#action1">Action 1</Dropdown.Item>
              <Dropdown.Item href="#action2">Action 2</Dropdown.Item>
              <Dropdown.Item href="#action3">Action 3</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </div>
        {/* <ModalBuatProject show={show} onHide={handleClose}/> */}
      </Container>
    </Navbar>
  )
}