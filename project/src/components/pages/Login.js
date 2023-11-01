// import logo from '../logo.svg';
// import '../../App.css';
import './Login.css';
// import MyBurgerMenu from './MyBurgerMenu';

function Login() {
  return (
    <div className="App">
      {/* <MyBurgerMenu /> */}
      {/* <header className="App-header"> */}

        <div className='card'>
          <img src='/assets/images/PINS-Logo-IoT2.png' alt="logo" className='logo'/>
          <div className='p-0'>
            <p>Selamat datang di Aplikasi</p>
            <p>Distributed Electronic Assignment System (DESY)</p>
          </div>
          <br/>
          <p>Silahkan login untuk melanjutkan</p>
          
          <form action="#" className='form container p-0'>
              <input name="email" placeholder='Email Address'/>
              <input name="password" placeholder='Password LDAP' type='password'/>
              <button type="submit">LOGIN AS USER</button>
              <p>or</p>
              <button type="submit">LOGIN AS ADMIN</button>
          </form>

        {/* </header> */}
        </div>
      </div>
  );
}

export default Login;
