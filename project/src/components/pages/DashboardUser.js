// import '../../App.css';
import MyBurgerMenu from './MyBurgerMenu';
import './DashboardUser.css';

function DashboardUser() {
  return (
    <div className="App">
      <MyBurgerMenu />
      <div>
        <h1>Beranda</h1>
      </div>
      <div className='flex'>
        <div className='card'>
          <div className='p-0'>
            <p>Selamat datang di Aplikasi</p>
            <p>Distributed Electronic Assignment System (DESY)</p>
          </div>
          <br/>
          <p>Silahkan login untuk melanjutkan</p>
          
          <form action="#" className='form container'>
              <input name="email" placeholder='Email Address'/>
              <input name="password" placeholder='Password LDAP' type='password'/>
              <button type="submit">LOGIN AS USER</button>
              <button type="submit">LOGIN AS ADMIN</button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default DashboardUser;
