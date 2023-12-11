
import { Avatar } from "rsuite";
import { useSelector } from 'react-redux';



export default function ProfilToggle({ onClick }) {
  const USER = useSelector((state) => state.user);

    return (
      <Avatar
      src={USER.avatar}
      onClick={onClick}
      style={{ cursor: 'pointer' }}
      circle
      />
    );
  }
