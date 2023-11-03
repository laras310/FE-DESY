// import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/esm/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Image from 'react-bootstrap/Image';
import { Bell } from 'react-bootstrap-icons';

export default function Header(){
    return(
    <Navbar bg="light" className='justify-content-end ' >
        <Bell size={25} />
        <Nav className="mx-4">
            <Image src="/assets/images/profil.jpg" alt="Profile" roundedCircle width={40} height={40} />
        </Nav>
    </Navbar>
    )
}