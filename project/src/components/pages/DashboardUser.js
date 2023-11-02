// import '../../App.css';
import MyBurgerMenu from '../includes/MyBurgerMenu';
import './DashboardUser.css';

function DashboardUser() {
  return (
    <div >
      <MyBurgerMenu />
      <div className='header'>
          <h1 className='p-17 m-0'>Beranda</h1>
      </div>
      <div className=''>
        <div className='flex mt-5 App'>
          <h1 className='m-0 light'>Selamat Pagi,</h1>
          <h1 >John Doe</h1>

          <div className='card-container'>
            <div className='card'>
              <p>Pekerjaan Idle</p>
              <h2>0</h2>
            </div>
            <div className='card'>
              <p>Pekerjaan Berjalan</p>
              <h2>0</h2>
            </div>
            <div className='card'>
              <p>Pekerjaan Selesai</p>
              <h2>0</h2>
            </div>
          </div>
        </div>
      </div>
      
      {/* <div>
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
      </div> */}
    </div>
  );
}

export default DashboardUser;
