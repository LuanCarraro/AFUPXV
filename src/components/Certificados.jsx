import React, { useEffect, useState, useContext } from 'react';
import Sidebar from './layout/Sidebar';
import { getProgressoCursos, emitirCertificado } from '../utils/localProgresso';
import { useNavigate } from 'react-router-dom';
import { getFirestore, doc, getDoc, updateDoc, increment } from 'firebase/firestore';
import { app } from '../services/firebaseConfig';
import { AuthEmailPasswordContext } from '../context/authEmailPassword';

const Certificados = () => {
  const [certificados, setCertificados] = useState([]);
  const navigate = useNavigate();
  const db = getFirestore(app);
  const { user } = useContext(AuthEmailPasswordContext);

  useEffect(() => {
    const fetchCertificados = async () => {
      const progresso = getProgressoCursos();
      const lista = [];

      for (const cursoId in progresso) {
        const dados = progresso[cursoId];
        if (dados.certificadoLiberado) {
          let nomeCurso = cursoId;
          try {
            const snap = await getDoc(doc(db, 'Cursos', cursoId));
            if (snap.exists()) {
              nomeCurso = snap.data().nome_curso || cursoId;
            }
          } catch (e) {
            console.error("Erro ao buscar nome do curso", e);
          }

          // calcular aproveitamento
          const notas = Object.values(dados.modulos || {}).map(m => m.nota || 0);
          const media = Math.round(notas.reduce((acc, n) => acc + n, 0) / notas.length);

          lista.push({
            cursoId,
            nomeCurso,
            certificadoEmitido: dados.certificadoEmitido || false,
            aproveitamento: media
          });
        }
      }

      setCertificados(lista);
    };

    fetchCertificados();
  }, [db]);

  return (
    <div className="d-flex" style={{ height: '100vh', width: '100vw' }}>
      <Sidebar />
      <div className="home-panel flex-grow-1 m-2 rounded-4 overflow-auto p-4" style={{ backgroundColor: '#1F2225' }}>
        <h2 style={{ color: 'white' }}>Meus Certificados</h2>

        {certificados.length === 0 ? (
          <div style={{
            backgroundColor: '#2C2F33',
            padding: '40px',
            borderRadius: '10px',
            marginTop: '40px',
            textAlign: 'center'
          }}>
            <p style={{ color: 'white', fontSize: '18px' }}>Nenhum certificado disponível ainda.</p>
            <p style={{ color: 'gray', fontSize: '14px' }}>
              Complete todos os módulos com pelo menos 50% de aproveitamento para emitir um certificado.
            </p>
          </div>
        ) : (
          <div className="row mt-4">
            {certificados.map((c, i) => (
              <div key={i} className="col-md-4 mb-4">
                <div className="card bg-dark text-white h-100 shadow">
                  <div className="card-body d-flex flex-column justify-content-between">
                    <h5 className="card-title">Curso: {c.nomeCurso}</h5>
                    <p className="card-text">Aproveitamento: {c.aproveitamento}%</p>

                    {c.certificadoEmitido ? (
                      <button
                        className="btn btn-success mt-3"
                        onClick={() => navigate(`/certificado/${c.cursoId}`)}
                      >
                        Ver Certificado
                      </button>
                    ) : c.aproveitamento >= 50 ? (
                      <button
                        className="btn btn-warning mt-3"
                        onClick={async () => {
                          try {
                            emitirCertificado(c.cursoId);
                            await updateDoc(doc(db, 'users', user.uid), {
                              certificadosEmitidos: increment(1),
                            });
                            navigate(`/certificado/${c.cursoId}`);
                          } catch (err) {
                            console.error("Erro ao emitir certificado:", err);
                          }
                        }}
                      >
                        Emitir Certificado
                      </button>
                    ) : (
                      <button
                        className="btn btn-secondary mt-3"
                        style={{ opacity: 0.5, cursor: 'not-allowed' }}
                        disabled
                      >
                        Emitir Certificado
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Certificados;

