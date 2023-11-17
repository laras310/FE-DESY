
import { Avatar } from "rsuite";
export default function ProfilToggle({ onClick }) {
    return (
      <Avatar
      src="/assets/images/profil.jpg"
      onClick={onClick}
      style={{ cursor: 'pointer' }}
      circle
      />
      // <Image
      //   src="/assets/images/profil.jpg"
      //   roundedCircle
      //   height="40"
      //   className="d-inline-block align-top"
      //   alt="Toggle Dropdown"
      //   onClick={onClick}
      //   style={{ cursor: 'pointer' }}
      // />
    );
  }
