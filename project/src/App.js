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
import ProtectedRoute from './components/route/ProtectedRoute';
import { Redirect } from 'react-router-dom';
import AllTask from './components/pages/AllTask';

function App() {
  const isAuthorized = localStorage.getItem('access_token') !== null;
  const userRole = localStorage.getItem('role');
  console.log(isAuthorized,userRole)
  return (
    <Switch>
      <Route exact path="/login" component={Login}></Route>
      <ProtectedRoute
          exact path="/user-dashboard"
          component={DashboardUser}
          isAuthorized={isAuthorized && userRole === 'user'}
        />
      <ProtectedRoute
        exact path="/admin-dashboard"
        component={DashboardAdmin}
        isAuthorized={isAuthorized && userRole === 'admin'}
      />
      <ProtectedRoute
        exact path="/daftar-pekerjaan"
        component={DaftarPekerjaan}
        isAuthorized={isAuthorized && userRole === 'user'}
      />
      <ProtectedRoute
        exact path="/list-pekerjaan"
        component={ListPekerjaan}
        isAuthorized={isAuthorized && userRole === 'user'}
      />
      <ProtectedRoute
        exact path="/all-task"
        component={AllTask}
        isAuthorized={isAuthorized && userRole === 'admin'}
      />
      <Redirect to="/login" />
      {/* <Route exact path="/login">
        <Login></Login>
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
      </Route> */}
    </Switch>
    
  
  );
}

export default App;
