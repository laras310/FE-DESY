import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import ModalBuatPekerjaan from '../pages/BuatProject';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Offcanvas from 'react-bootstrap/Offcanvas';
import { Image, NavItem } from 'react-bootstrap';
import { Bell } from 'react-bootstrap-icons';

import { useState } from 'react';

export default function AdminMenu(){
    const [showModal, setShowModal] = useState(false);

    const handleModalOpen = () => {
      setShowModal(true);
    }
  
    const handleModalClose = () => {
      setShowModal(false);
    }
  return(
    <Navbar key={'md'} expand={'md'} className="bg-body-tertiary mb-3" collapseOnSelect>
          <Container fluid>
            <Navbar.Brand href="#">
              <Image src="/assets/images/PINS-Logo-IoT2.png"  
              //  width="30"
               height="40"
               className="d-inline-block align-top"
               alt="Pins logo"
              />
              </Navbar.Brand>
            <Navbar.Toggle aria-controls={`offcanvasNavbar-expand-md`} />
            <Navbar.Offcanvas
              id={`offcanvasNavbar-expand-md`}
              aria-labelledby={`offcanvasNavbarLabel-expand-md`}
              placement="end"
            >
              <Offcanvas.Header closeButton>
                <Offcanvas.Title id={`offcanvasNavbarLabel-expand-md`}>
                  Offcanvas
                </Offcanvas.Title>
                </Offcanvas.Header>
                <Offcanvas.Body>
                    <Nav className="justify-content-end flex-grow-1 pe-3">
                    
                    <Nav.Link href="/user">Home</Nav.Link>
                    {/* <p onClick={() => setModalShow(true)}>Buat Pekerjaan</p> */}
                    {/* <Nav.Link >Buat Pekerjaan</Nav.Link> */}
                    <NavDropdown
                        title="Dropdown"
                        id={`offcanvasNavbarDropdown-expand-md`}
                    >
                        <NavDropdown.Item href="#action3">Action</NavDropdown.Item>
                        <NavDropdown.Item href="#action4">
                        Another action
                        </NavDropdown.Item>
                        <NavDropdown.Divider />
                        <NavDropdown.Item href="#action5">
                        Something else here
                        </NavDropdown.Item>
                    </NavDropdown>
                    </Nav>
                    <Button variant="primary" onClick={handleModalOpen}>
                        Buat Pekerjaan
                    </Button>
                </Offcanvas.Body>
            </Navbar.Offcanvas>
                   <ModalBuatPekerjaan show={showModal} onHide={handleModalClose}/>
          </Container>
        </Navbar>
  )
}

// import React, { useState } from 'react';
// import { Navbar, Nav, Button, Modal } from 'react-bootstrap';
// import ModalBuatPekerjaan from '../pages/BuatProject';

// function MenuAdmin() {
//   const [showModal, setShowModal] = useState(false);

//   const handleModalOpen = () => {
//     setShowModal(true);
//   }

//   const handleModalClose = () => {
//     setShowModal(false);
//   }

//   return (
//     <>
//       <Navbar collapseOnSelect expand="md" bg="dark" variant="dark">
//         <Navbar.Brand>Logo</Navbar.Brand>
//         <Navbar.Toggle aria-controls="responsive-navbar-nav" />
//         <Navbar.Collapse id="responsive-navbar-nav">
//           <Nav className="mr-auto">
//             <Nav.Link href="#home">Home</Nav.Link>
//             <Nav.Link href="#about">About</Nav.Link>
//             <Nav.Link href="#services">Services</Nav.Link>
//           </Nav>
//           <Button variant="primary" onClick={handleModalOpen}>
//             Open Modal
//           </Button>
//         </Navbar.Collapse>
//       </Navbar>

//       <ModalBuatPekerjaan show={showModal} onHide={handleModalClose}/>
//     </>
//   );
// }

// export default MenuAdmin;

