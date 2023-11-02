// import '../../App.css';
import MyBurgerMenu from '../includes/MyBurgerMenu';
import './DashboardAdmin.css';

function DashboardAdmin() {
  return (
    <div >
      <MyBurgerMenu />
      <div className='header'>
          <h1 className='p-17 m-0'>Beranda</h1>
      </div>
      
        <div className='flex mt-5 App'>
          <h1 className='m-0 light'>Selamat Pagi,</h1>
          <h1 >John Doe</h1>
        <div className='card-section'>
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
                <div className='card'>
                <p>Pekerjaan Selesai</p>
                <h2>0</h2>
                </div>
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
    </div>
  );
}

export default DashboardAdmin;
