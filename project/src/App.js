import logo from './logo.svg';
import './App.css';
// import Login from './components/pages/Login';
import Login from './components/pages/Login';
import DashboardUser from './components/pages/DashboardUser';
import DashboardAdmin from './components/pages/DashboardAdmin';
import { Switch, Route } from 'react-router-dom';
import ListPekerjaan from './components/pages/ListPekerjaan';

function App() {
  return (
    <Switch>
      <Route exact path="/">
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
    </Switch>
    
  
  );
}

export default App;
