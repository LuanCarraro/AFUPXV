import './App.css';
import Sidebar from './components/layout/Sidebar';
import HomePanel from './views/HomePanel';

function App() {
  return (
    <div className="d-flex" style={{ height: '100vh', width: '100vw' }}>

      <section className="sidebar d-flex flex-column align-items-center h-100 py-3" style={{ width: '105px', backgroundColor: '#1F2225' }}>
        <div className="logo">
          <img src="assets/img/logo.jpg" alt="logo" className="rounded-circle" width={60} height={60} />
        </div>
      </section>

      <section className="home-panel flex-grow-1 m-2 rounded-4 overflow-auto p-4" style={{ backgroundColor: '#1F2225' }}>
        <div className="header-box w-100">
          <div className="row d-flex ">
            <div className="col">
              <i class="bi bi-person-circle" style={{ color: 'purple' }}></i>
            </div>
            <div className="col gap-3 d-flex justify-content-end">
              <i className="bi bi-fire" style={{ color: 'red' }}></i>
              <i className="bi bi-bell-fill" style={{ color: 'white' }}></i>
              <i className="bi bi-gear" style={{ color: 'white' }}></i>
            </div>
          </div>
        </div>
        <h1 className='mt-3 mb-5'>Bem Vindo, Fabio Gostosão!</h1>
        <div>
          <h6 className="mb-3">O que iremos estudar hoje?</h6>
          <div className="d-flex overflow-auto gap-5 py-4" style={{ whiteSpace: 'nowrap' }}>

            <div className="d-flex flex-column align-items-center">
              <img src="assets/img/materia.png" className="rounded-circle" alt="materia" style={{ height: '200px', width: '200px' }} />
              <span className='pt-2'>Materia</span>
            </div>
            <div className="d-flex flex-column align-items-center">
              <img src="assets/img/materia.png" className="rounded-circle" alt="materia" style={{ height: '200px', width: '200px' }} />
              <span className='pt-2'>Materia</span>
            </div>
            <div className="d-flex flex-column align-items-center">
              <img src="assets/img/materia.png" className="rounded-circle" alt="materia" style={{ height: '200px', width: '200px' }} />
              <span className='pt-2'>Materia</span>
            </div>
            <div className="d-flex flex-column align-items-center">
              <img src="assets/img/materia.png" className="rounded-circle" alt="materia" style={{ height: '200px', width: '200px' }} />
              <span className='pt-2'>Materia</span>
            </div>
            <div className="d-flex flex-column align-items-center">
              <img src="assets/img/materia.png" className="rounded-circle" alt="materia" style={{ height: '200px', width: '200px' }} />
              <span className='pt-2'>Materia</span>
            </div>
          </div>
        </div>


      </section>

    </div>

  );
}

export default App;
