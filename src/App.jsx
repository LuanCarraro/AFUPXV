import './App.css';
import Sidebar from './components/layout/Sidebar';
import HomePanel from './views/HomePanel';

function App() {
  return (
    <div className="d-flex" style={{ height: '100vh', width: '100vw' }}>
      <Sidebar />
      <HomePanel />
    </div >

  );
}

export default App;
