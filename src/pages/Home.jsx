import React, { useContext } from 'react'
import Sidebar from '../components/layout/sidebar';
import { AuthEmailPasswordContext } from '../context/authEmailPassword';
import Subjects from '../components/Subjects';
import Add from '../help/Add';

function Home() {

    const { user } = useContext(AuthEmailPasswordContext);

    const userLogado = JSON.parse(user);

    return (
        <div className="d-flex" style={{ height: '100vh', width: '100vw' }}>
            <Sidebar />
            <div className="home-panel flex-grow-1 m-2 rounded-4 overflow-auto p-4" style={{ backgroundColor: '#1F2225' }}>
                <h1 className='mt-3 mb-5'>Bem Vindo, {userLogado.email}</h1>
                <Subjects />
            </div>
        </div>
    )
}

export default Home;
