import { Image } from "react-bootstrap";
export default function ProfilToggle({ onClick }) {
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
