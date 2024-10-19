import React, { useContext } from 'react'
import Social from '../components/Social';
import Calendar from '../components/Calendar';
import Sidebar from '../components/layout/sidebar';
import { AuthEmailPasswordContext } from '../context/authEmailPassword';

function Home() {

    const { user, handleSignOut } = useContext(AuthEmailPasswordContext);
    let userLogado = JSON.parse(user)

    return (
        <div className="d-flex" style={{ height: '100vh', width: '100vw' }}>
            <Sidebar />
            <div className="home-panel flex-grow-1 m-2 rounded-4 overflow-auto p-4" style={{ backgroundColor: '#1F2225' }}>
                <div className="header w-100 row d-flex ">
                    <div className="col">
                        <i class="bi bi-person-circle" style={{ color: 'purple' }}></i>
                    </div>
                    <div className="col gap-3 d-flex justify-content-end">
                        <i className="bi bi-fire" style={{ color: 'red' }}></i>
                        <i className="bi bi-bell-fill" style={{ color: 'white' }}></i>
                        <i className="bi bi-gear" style={{ color: 'white' }}></i>
                    </div>
                </div>
                <h1 className='mt-3 mb-5'>Bem Vindo, {userLogado.email}</h1>
                <button onClick={handleSignOut} className="btn btn-danger">
                    Logout
                </button>
                <Social />
                <Calendar />
            </div>
        </div>
    )
}

export default Home;
