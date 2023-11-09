import { Container } from "react-bootstrap";  
import { Bell } from "react-bootstrap-icons";

export default function NotifToggle({ onClick }) {
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