import './App.css';
import Login from './components/pages/Login';
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
import Home from './components/pages/Home';
import NotFound from './components/pages/NotFound';
import Dokumen from './components/pages/Dokumen';

function App() {
  const isAuthorized = sessionStorage.getItem('access_token') !== null;
  const userRole = sessionStorage.getItem('role');
  return (
    <Switch>

    <ProtectedRoute
      exact path="/"
      component={Home}
      isAuthorized={isAuthorized }
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
      exact path="/dokumen"
      component={Dokumen}
      isAuthorized={isAuthorized}
    />

    <Route exact path="/login" 
    render={() => (isAuthorized ? <Redirect to="/" /> : <Login />)}></Route>

    <Route component={NotFound}/>
    </Switch>
    
  
  );
}

export default App;
