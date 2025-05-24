import React, { useContext, useState, useEffect } from 'react';
import { AuthEmailPasswordContext } from '../context/authEmailPassword';
import { getFirestore, collection, getDocs } from 'firebase/firestore';
import { app } from '../services/firebaseConfig';
import Sidebar from './layout/Sidebar';
import { useNavigate } from 'react-router-dom';

export const MySubjects = () => {
    const { user } = useContext(AuthEmailPasswordContext);
    const [meusCursos, setMeusCursos] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const db = getFirestore(app);
    const navigate = useNavigate(); // Hook de navegação

    useEffect(() => {
        const fetchMeusCursos = async () => {
            if (user && user.uid) {
                try {
                    const querySnapshot = await getDocs(collection(db, 'Cursos'));
                    const cursosInscritos = querySnapshot.docs
                        .map((doc) => ({ id: doc.id, ...doc.data() }))
                        .filter((curso) => curso.inscritos?.includes(user.uid));
                    setMeusCursos(cursosInscritos);
                } catch (e) {
                    console.error("Erro ao buscar os cursos:", e);
                } finally {
                    setIsLoading(false);
                }
            }
        };

        fetchMeusCursos();
    }, [user, db]);

    const handleEntrarCurso = (id) => {
        navigate(`/mysubjects/course/${id}`);
    };

    return (
        <div className="d-flex" style={{ height: '100vh', width: '100vw' }}>
            <Sidebar />
            <div className="home-panel flex-grow-1 m-2 rounded-4 overflow-auto p-4" style={{ backgroundColor: '#1F2225' }}>
                <div className="mt-5">
                    <h3 className='mb-5'>Meus Cursos</h3>
                    <div className="row">
                        {isLoading ? (
                            <p>Carregando...</p>
                        ) : meusCursos.length === 0 ? (
                            <p>Você não está inscrito em nenhum curso no momento.</p>
                        ) : (
                            meusCursos.map((curso) => (
                                <div key={curso.id} className="col-12 col-sm-6 col-md-4 col-lg-3 mb-4">
                                    <div className="card h-100" style={{ backgroundColor: '#343a40', color: 'white' }}>
                                        <img
                                            src={curso.img}
                                            className="card-img-top"
                                            alt={curso.nome_curso}
                                            style={{ height: '150px', objectFit: 'cover' }}
                                        />
                                        <div className="card-body d-flex flex-column">
                                            <h5 className="card-title">{curso.nome_curso}</h5>
                                            <p className="card-text" style={{ flexGrow: 1 }}>{curso.descricao}</p>
                                            <button
                                                className="btn btn-primary"
                                                onClick={() => handleEntrarCurso(curso.id)}
                                            >
                                                Entrar no Curso
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};
