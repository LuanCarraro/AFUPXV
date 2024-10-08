import React from 'react'
import Social from '../components/Social';
import Calendar from '../components/Calendar';
import Header from '../components/layout/header';

function HomePanel() {
    return (
        <section className="home-panel flex-grow-1 m-2 rounded-4 overflow-auto p-4" style={{ backgroundColor: '#1F2225' }}>
            <Header />
            <h1 className='mt-3 mb-5'>Bem Vindo, Anderson Mama Bem</h1>
            <Social />
            <Calendar />
        </section>
    )
}

export default HomePanel;
