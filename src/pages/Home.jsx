import React, { useContext, useEffect, useState } from 'react';
import Sidebar from '../components/layout/sidebar';
import { AuthEmailPasswordContext } from '../context/authEmailPassword';
import Subjects from '../components/Subjects';
import { getFirestore, doc, getDoc } from "firebase/firestore";
import Add from '../help/Add';

function Home() {
    const { user } = useContext(AuthEmailPasswordContext);
    const [nomeCompleto, setNomeCompleto] = useState('');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (user) {
            // Crie uma referência para o documento do usuário na coleção "users"
            const db = getFirestore();
            const userRef = doc(db, "users", user.uid);  // Assume que o 'uid' está disponível no 'user'

            // Busque os dados do usuário na coleção "users"
            getDoc(userRef)
                .then((docSnap) => {
                    if (docSnap.exists()) {
                        const userData = docSnap.data();
                        const nomeCompleto = `${userData.firstName} ${userData.lastName}`;
                        setNomeCompleto(nomeCompleto);
                    } else {
                        console.log("Nenhum usuário encontrado!");
                    }
                    setLoading(false);
                })
                .catch((error) => {
                    console.error("Erro ao buscar dados do usuário:", error);
                    setLoading(false);
                });
        }
    }, [user]);

    return (
        <div className="d-flex" style={{ height: '100vh', width: '100vw' }}>
            <Sidebar />
            <div className="home-panel flex-grow-1 m-2 rounded-4 overflow-auto p-4" style={{ backgroundColor: '#1F2225' }}>
                <h1 className='mt-3 mb-5'>
                    {loading ? 'Carregando...' : `Bem Vindo, ${nomeCompleto}`}
                </h1>
                <h4 className='mt-3 mb-5 mx-3'>Se inscreva em nossos cursos:</h4>
                <Subjects />
            </div>
        </div>
    );
}

export default Home;
