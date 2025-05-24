import React, { useContext, useState } from 'react'
import { AuthEmailPasswordContext } from '../../context/authEmailPassword';
import { useNavigate } from 'react-router-dom';

function Sidebar() {
  const { handleSignOut } = useContext(AuthEmailPasswordContext);
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        className="sidebar-hamburger"
        onClick={() => setOpen(true)}
        style={{
          position: 'fixed',
          top: 20,
          left: 20,
          zIndex: 2000,
          background: 'none',
          border: 'none',
          fontSize: 32,
          color: '#fff',
          display: 'none'
        }}
        aria-label="Abrir menu"
      >
        <i className="bi bi-list"></i>
      </button>

      <div className={`sidebar d-flex flex-column align-items-center justify-content-between h-100 py-3${open ? ' sidebar-open' : ''}`}>
        <button
          className="sidebar-close"
          onClick={() => setOpen(false)}
          style={{
            position: 'absolute',
            top: 20,
            right: 20,
            background: 'none',
            border: 'none',
            fontSize: 28,
            color: '#fff',
            display: 'none'
          }}
          aria-label="Fechar menu"
        >
          <i className="bi bi-x"></i>
        </button>

        <div className="logo">
          <img src="/assets/img/logo.jpg" alt="logo" className="rounded-circle" width={60} height={60} />
        </div>

        <div className="pages d-flex flex-column align-items-center gap-3">
  <div onClick={() => navigate("/")} className="nav-link text-center text-white text-decoration-none fs-2" style={{ cursor: 'pointer' }}>
    <i className="bi bi-house"></i>
    <p className="mb-0" style={{ fontSize: '12px' }}>Início</p>
  </div>

  <div onClick={() => navigate("/mysubjects")} className="nav-link text-center text-white text-decoration-none fs-2" style={{ cursor: 'pointer' }}>
    <i className="bi bi-book"></i>
    <p className="mb-0" style={{ fontSize: '12px' }}>Meus Cursos</p>
  </div>

  <div onClick={() => navigate("/certificados")} className="nav-link text-center text-white text-decoration-none fs-2" style={{ cursor: 'pointer' }}>
    <i className="bi bi-award"></i>
    <p className="mb-0" style={{ fontSize: '12px' }}>Certificados</p>
  </div>

  <div onClick={() => navigate("/ranking")} className="nav-link text-center text-white text-decoration-none fs-2" style={{ cursor: 'pointer' }}>
    <i className="bi bi-trophy"></i>
    <p className="mb-0" style={{ fontSize: '12px' }}>Ranking</p>
  </div>

  <div onClick={() => navigate("/social")} className="nav-link text-center text-white text-decoration-none fs-2" style={{ cursor: 'pointer' }}>
    <i className="bi bi-people"></i>
    <p className="mb-0" style={{ fontSize: '12px' }}>Social</p>
  </div>
</div>

        <div className="info d-flex flex-column gap-2">
          <i className="bi bi-bell-fill" style={{ color: 'white', fontSize: '30px' }}></i>
          <i className="bi bi-gear" style={{ color: 'white', fontSize: '30px' }}></i>

          <div className="dropend">
            <i
              className="bi bi-person-circle"
              style={{ color: 'purple', fontSize: '30px', cursor: 'pointer' }}
              id="dropdownMenuButton"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            ></i>
            <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton">
              <li>
                <button onClick={handleSignOut} className="dropdown-item btn btn-danger">
                  Sair
                </button>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
}

export default Sidebar;

