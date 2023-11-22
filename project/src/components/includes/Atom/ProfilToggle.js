
import { Avatar } from "rsuite";
export default function ProfilToggle({ onClick }) {
    return (
      <Avatar
      src="/assets/images/profil.jpg"
      onClick={onClick}
      style={{ cursor: 'pointer' }}
      circle
      />
    );
  }
