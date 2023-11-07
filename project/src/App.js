import logo from './logo.svg';
import './App.css';
// import Login from './components/pages/Login';
import Login from './components/pages/Login';
import DashboardUser from './components/pages/DashboardUser';
import DashboardAdmin from './components/pages/DashboardAdmin';
import { Switch, Route } from 'react-router-dom';
import ListPekerjaan from './components/pages/ListPekerjaan';
import DaftarPekerjaan from './components/pages/DaftarPekerjaan';
import DetailPekerjaan from './components/pages/DetailPekerjaan';

function App() {
  return (
    <Switch>
      <Route exact path="/login">
        <Login></Login>
        {/* <Tes></Tes> */}
      </Route>
      <Route path="/user">
        <DashboardUser></DashboardUser>
      </Route>
      <Route path="/admin">
        <DashboardAdmin></DashboardAdmin>
      </Route>
      <Route path="/list-pekerjaan">
        <ListPekerjaan></ListPekerjaan>
      </Route>
      <Route path="/daftar-pekerjaan">
        <DaftarPekerjaan></DaftarPekerjaan>
      </Route>
      <Route path="/detail-pekerjaan">
        <DetailPekerjaan></DetailPekerjaan>
      </Route>
    </Switch>
    
  
  );
}

export default App;
