import React, { useState } from 'react';
import { Navbar, Image, Button } from 'react-bootstrap';
// import { Bell } from 'react-bootstrap-icons';
import { Offcanvas, Nav, Container, Dropdown } from 'react-bootstrap';
import ProfilToggle from './Atom/ProfilToggle';
import NotifToggle from './Atom/NotifToggle';
import {  useLocation } from 'react-router-dom';
import axios from 'axios';
import Cookies from 'js-cookie';

function MyBurgerMenu() {
  const [showProfilDropdown, setShowProfilDropdown] = useState(false);
  const [showNotifDropdown, setShowNotifDropdown] = useState(false);
  const location = useLocation();

  const handleProfilDropdownToggle = () => {
    setShowProfilDropdown(!showProfilDropdown);
  };

  const handleNotifDropdownToggle = () => {
    setShowNotifDropdown(!showNotifDropdown);
  };

  function logout(event){
    Cookies.remove('access_token');
    axios.get(`${process.env.REACT_APP_API_HOST}auth/token/revoke`)
    localStorage.clear()
  }
  const menuItems = [
    { path: '/', label: 'Home' },
    { path: '/daftar-pekerjaan', label: 'Daftar Pekerjaan' },
    { path: '/dokumen', label: 'Dokumen' },
    // Tambahkan menu lain jika ada
  ];

  return (
    <Navbar className="shadow" expand={'lg'}>
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
          <Nav className="justify-content-end flex-grow-1 pe-3" variant="underline" activeKey={location.pathname}>
          {menuItems.map((item) => (
            <Nav.Link key={item.path} href={item.path} className={location.pathname === item.path ? 'active' : ''}>
              {item.label}
            </Nav.Link>
          ))}
          </Nav>
            {/* <Nav className="justify-content-end flex-grow-1 pe-3" variant="pills" activeKey={location.pathname === '/user-dashboard' ? '/user-dashboard' : '/daftar-pekerjaan'}>
                <Nav.Link href='/user-dashboard'>
                  Home
                  </Nav.Link>
              <Nav.Link href='/daftar-pekerjaan'>
                Daftar Pekerjaan
                </Nav.Link>
              
            </Nav> */}
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
      </Container>
    </Navbar>
  );
}

export default MyBurgerMenu;
