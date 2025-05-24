import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getFirestore, doc, getDoc } from 'firebase/firestore';
import { app } from '../services/firebaseConfig';
import Sidebar from './layout/sidebar';
import { registrarAulaAssistida } from '../utils/localProgresso';

export const Course = () => {
  const [curso, setCurso] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [modulosExpandidos, setModulosExpandidos] = useState({});
  const db = getFirestore(app);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCurso = async () => {
      if (id) {
        try {
          const docRef = doc(db, 'Cursos', id);
          const docSnap = await getDoc(docRef);
          if (docSnap.exists()) {
            setCurso({ id: docSnap.id, ...docSnap.data() });
          } else {
            console.log('Curso não encontrado!');
          }
        } catch (e) {
          console.error('Erro ao buscar o curso:', e);
        } finally {
          setIsLoading(false);
        }
      }
    };

    fetchCurso();
  }, [id, db]);

  const handleToggleModulo = (index) => {
    setModulosExpandidos((prevState) => ({
      ...prevState,
      [index]: !prevState[index],
    }));
  };

  if (isLoading) return <p>Carregando...</p>;
  if (!curso) return <p>Curso não encontrado.</p>;

  return (
    <div className="d-flex" style={{ height: '100vh', width: '100vw' }}>
      <Sidebar />
      <div className="home-panel flex-grow-1 m-2 rounded-4 overflow-auto p-4" style={{ backgroundColor: '#1F2225' }}>
        <div className="course-detail">
          <div className="d-flex align-items-center mb-4">
            <img
              src={curso.img}
              alt={curso.nome_curso}
              style={{ width: '150px', height: 'auto', marginRight: '20px' }}
            />
            <h2 style={{ fontSize: '24px', color: 'white' }}>{curso.nome_curso}</h2>
          </div>
          <p style={{ color: 'white' }}>{curso.descricao}</p>
          <div>
            <h3 style={{ color: 'white' }}>Módulos:</h3>
            {curso.modulos.map((modulo, index) => (
              <div key={index} style={{ marginBottom: '20px' }}>
                <div
                  className="module-header"
                  onClick={() => handleToggleModulo(index)}
                  style={{
                    cursor: 'pointer',
                    fontSize: '18px',
                    fontWeight: 'bold',
                    padding: '10px',
                    backgroundColor: '#333',
                    color: 'white',
                    borderRadius: '5px'
                  }}
                >
                  {modulo.nome}
                  <span style={{ marginLeft: '10px' }}>
                    {modulosExpandidos[index] ? '▲' : '▼'}
                  </span>
                </div>

                {modulosExpandidos[index] && (
                  <div className="module-content" style={{ marginLeft: '20px', padding: '10px', backgroundColor: '#444', borderRadius: '5px' }}>
                    {modulo.aulas.map((aula, aulaIndex) => (
                      <div key={aulaIndex} style={{ marginBottom: '15px' }}>
                        <div className="lesson-row" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                          <div style={{ flex: 1 }}>
                            <strong style={{ color: 'white' }}>{aula.nome_aula}</strong>
                          </div>
                          <button
                            className="btn btn-primary"
                            style={{ marginLeft: '10px' }}
                            onClick={() => {
                              window.open(aula.link_video, '_blank');
                              registrarAulaAssistida(curso.id, index);
                            }}
                          >
                            Ver Vídeo
                          </button>
                        </div>

                        <div className="activities-row" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '10px' }}>
                          <div style={{ flex: 1 }}>
                            <span style={{ color: 'white' }}>Atividades sobre {modulo.nome}</span>
                          </div>
                          <button
                            className="btn btn-secondary"
                            onClick={() =>
                              navigate(`/mysubjects/course/${curso.id}/quiz/${index}/${aulaIndex}`)
                            }
                          >
                            Fazer Atividades
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
