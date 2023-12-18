// components/StyledNavbar.js
import styled from 'styled-components';
import { Nav, Card, Tabs } from 'react-bootstrap';
import { StarFill, Star } from 'react-bootstrap-icons';

export const StyledCard = styled(Card)`
  transition: transform 0.2s;

  &:hover {
    transform: scale(1.03);
  }
`;

export const CustomTabs = styled(Tabs)`
  .nav-link.active {
    background-color: #DC3545;
    color: white;
  }

  .nav-link {
    background-color: #f0f0f0;
    color: grey;
    font-weight:bold;
  }
`;

export const StyledStar = styled(Star)`
  transition: transform 0.2s;

  &:hover {
    transform: scale(1.5);
  }
`
;
export const StyledStarFill = styled(StarFill)`
  transition: transform 0.2s;

  &:hover {
    transform: scale(1.5);
  }
`
;


export const StyledNavbar = styled(Nav.Link)`

&.active {
    border-bottom: 2px solid #DC3545 !important; /* Ganti dengan warna yang diinginkan */
    color: #DC3545 !important; /* Warna teks saat aktif */
    font-weight: bold; /* Teks menjadi tebal saat aktif */
  }

  &:hover {
    // color: #DC3545 !important;
    border-bottom: 2px solid #DC3545; /* Ganti dengan warna yang diinginkan */
  }
`;

export default StyledNavbar;