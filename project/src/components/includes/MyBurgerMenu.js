// import Button from 'react-bootstrap/Button';
// import Container from 'react-bootstrap/Container';
// import Form from 'react-bootstrap/Form';
// import Nav from 'react-bootstrap/Nav';
// import Navbar from 'react-bootstrap/Navbar';
// import NavDropdown from 'react-bootstrap/NavDropdown';
// import Offcanvas from 'react-bootstrap/Offcanvas';
// import { Image, NavItem } from 'react-bootstrap';
// import { Bell } from 'react-bootstrap-icons';

// export default function MyBurgerMenu(){
//   return(
//     <>
//     <Navbar key={'lg'} expand={'lg'} className="bg-body-tertiary mb-3">
//           <Container fluid>
//             <Navbar.Toggle aria-controls={`offcanvasNavbar-expand-md`} />
//             <Navbar.Brand href="#">
//               <Image src="/assets/images/PINS-Logo-IoT2.png"  
//                height="40"
//                className="d-inline-block align-top"
//                alt="Pins logo"
//               />
//             </Navbar.Brand>
            
//             <Navbar.Offcanvas
//               id={`offcanvasNavbar-expand-md`}
//               aria-labelledby={`offcanvasNavbarLabel-expand-md`}
//               placement="end"
//             >
//               <Offcanvas.Header closeButton>
//                 <Offcanvas.Title id={`offcanvasNavbarLabel-expand-md`}>
//                   Offcanvas
//                 </Offcanvas.Title>
//               </Offcanvas.Header>
//               <Offcanvas.Body>
//                 <Nav className="justify-content-end flex-grow-1 pe-3">
                  
//                   <Nav.Link href="/user">Home</Nav.Link>
//                   <Nav.Link href="/daftar-pekerjaan">Daftar Pekerjaan</Nav.Link>
//                   <NavDropdown
//                     title={<Bell height="40"/>}
//                     id={`offcanvasNavbarDropdown-expand-md`}
//                   >
//                     <NavDropdown.Item href="#action3">Action</NavDropdown.Item>
//                     <NavDropdown.Item href="#action4">
//                       Another action
//                     </NavDropdown.Item>
//                     <NavDropdown.Divider />
//                     <NavDropdown.Item href="#action5">
//                       Something else here
//                     </NavDropdown.Item>
//                   </NavDropdown>
//                   <NavDropdown
//                   title={<Image src="/assets/images/profil.jpg" alt="Profile" roundedCircle 
//                     height="40" className="d-inline-block align-top"
//                     />}>
//                     <NavDropdown.Item href="#action3">Action</NavDropdown.Item>
//                     <NavDropdown.Item href="#action4">
//                       Another action
//                     </NavDropdown.Item>
//                     <NavDropdown.Divider />
//                     <NavDropdown.Item href="#action5">
//                       Something else here
//                     </NavDropdown.Item>
//                   </NavDropdown>
//                 </Nav>
//               </Offcanvas.Body>
//             </Navbar.Offcanvas>
//           </Container>
//         </Navbar>
        
//         </>
//   )
// }

import React, { useState } from 'react';
import { Navbar, Image, Button } from 'react-bootstrap';
import { Bell } from 'react-bootstrap-icons';
import { Offcanvas, Nav, Container, Dropdown } from 'react-bootstrap';

function CustomProfilToggle({ onClick }) {
  return (
    <Image
      src="/assets/images/profil.jpg"
      roundedCircle
      height="40"
      className="d-inline-block align-top"
      alt="Toggle Dropdown"
      onClick={onClick}
      style={{ cursor: 'pointer' }}
    />
  );
}

function CustomNotifToggle({ onClick }) {
  return (
    <Container>
      <Bell
        width={24}
        height={24}
        onClick={onClick}
        style={{ cursor: 'pointer' }}
        className="d-inline-block align-top"
        alt="Toggle Dropdown"
      />
    </Container>
  );
}

function MyBurgerMenu() {
  const [showProfilDropdown, setShowProfilDropdown] = useState(false);
  const [showNotifDropdown, setShowNotifDropdown] = useState(false);

  const handleProfilDropdownToggle = () => {
    setShowProfilDropdown(!showProfilDropdown);
  };

  const handleNotifDropdownToggle = () => {
    setShowNotifDropdown(!showNotifDropdown);
  };

  return (
    <Navbar className="bg-body-tertiary" expand={'lg'}>
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
          placement="end"
        >
          <Offcanvas.Header closeButton>
            <Offcanvas.Title id={`offcanvasNavbarLabel-expand-lg`}>
              Menu
            </Offcanvas.Title>
          </Offcanvas.Header>
          <Offcanvas.Body>
            <Nav className="justify-content-end flex-grow-1 pe-3">
              <Nav.Link href="/user">Home</Nav.Link>
              <Nav.Link href="/daftar-pekerjaan">Daftar Pekerjaan</Nav.Link>
            </Nav>
          </Offcanvas.Body>
        </Navbar.Offcanvas>
        <div className='d-flex justify-content-end align-items-center flex-row'>
          <Dropdown show={showProfilDropdown} onToggle={handleProfilDropdownToggle} drop='start'>
            <Dropdown.Toggle as={CustomProfilToggle} id="dropdown-custom-toggle" />
            <Dropdown.Menu>
              <Dropdown.Item href="#action1">Action 1</Dropdown.Item>
              <Dropdown.Item href="#action2">Action 2</Dropdown.Item>
              <Dropdown.Item href="#action3">Action 3</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
          <Dropdown show={showNotifDropdown} onToggle={handleNotifDropdownToggle} drop='start'>
            <Dropdown.Toggle as={CustomNotifToggle} id="dropdown-custom-toggle" />
            <Dropdown.Menu>
              <Dropdown.Item href="#action1">Action 1</Dropdown.Item>
              <Dropdown.Item href="#action2">Action 2</Dropdown.Item>
              <Dropdown.Item href="#action3">Action 3</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </div>
      </Container>
    </Navbar>
  );
}

export default MyBurgerMenu;
