import './App.css';
import Login from './components/pages/Login';
import DashboardUser from './components/pages/DashboardUser';
import DashboardAdmin from './components/pages/DashboardAdmin';
import { Switch, Route } from 'react-router-dom';
import ListPekerjaan from './components/pages/ListPekerjaan';
import DaftarPekerjaan from './components/pages/DaftarPekerjaan';
import ProtectedRoute from './components/route/ProtectedRoute';
import { Redirect } from 'react-router-dom';
import AllTask from './components/pages/AllTask';
import DetailTimeline from './components/includes/DetailTimeline';
import BuatTask from './components/pages/BuatTask';
import UpdateTask from './components/pages/UpdateTask';
import ListPekerjaanUnit from './components/pages/ListPekerjaanUnit';
import EditTask from './components/pages/EditTask';

function App() {
  const isAuthorized = localStorage.getItem('access_token') !== null;
  const userRole = localStorage.getItem('role');
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
        isAuthorized={isAuthorized && userRole === 'user' | userRole==='admin'}
      />
      <ProtectedRoute
        exact path="/all-task"
        component={AllTask}
        isAuthorized={isAuthorized && userRole === 'admin'}
      />
      <ProtectedRoute
        exact path="/timeline"
        component={DetailTimeline}
        isAuthorized={isAuthorized && userRole === 'user' | userRole==='admin'}
      />
      <ProtectedRoute
        exact path="/buat-task"
        component={BuatTask}
        isAuthorized={isAuthorized && userRole === 'admin'}
      />
      <ProtectedRoute
        exact path="/update-task"
        component={UpdateTask}
        isAuthorized={isAuthorized && userRole === 'user'}
      />
      <ProtectedRoute
        exact path="/edit-task"
        component={EditTask}
        isAuthorized={isAuthorized && userRole === 'admin'}
      />
      <ProtectedRoute
        exact path="/listperunit"
        component={ListPekerjaanUnit}
        isAuthorized={isAuthorized && userRole === 'admin'}
      />
      <ProtectedRoute
        exact path="/"
        component={isAuthorized && userRole === 'admin' ?
      DashboardAdmin : DashboardUser}
        isAuthorized={isAuthorized && userRole === 'admin'}
      />
      <Route exact path="/" component={Login}></Route>
      <Redirect to="/" />

    </Switch>
    
  
  );
}

export default App;
