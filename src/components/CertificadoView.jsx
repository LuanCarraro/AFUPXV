import React, { useEffect, useState, useContext } from 'react';
import { useParams } from 'react-router-dom';
import { getFirestore, doc, getDoc } from 'firebase/firestore';
import { app } from '../services/firebaseConfig';
import { getProgressoCursos } from '../utils/localProgresso';
import { AuthEmailPasswordContext } from '../context/authEmailPassword';
import { incrementarCertificadosEmitidos } from "../utils/firebaseHelpers";


const CertificadoView = () => {
  const { cursoId } = useParams();
  const [nomeCurso, setNomeCurso] = useState(null);
  const [aproveitamento, setAproveitamento] = useState(null);
  const { user } = useContext(AuthEmailPasswordContext);
  const [valido, setValido] = useState(false);

  useEffect(() => {
    const fetchDados = async () => {
      try {
        const docRef = doc(getFirestore(app), 'Cursos', cursoId);
        const cursoSnap = await getDoc(docRef);
        if (cursoSnap.exists()) {
          const dados = cursoSnap.data();
          setNomeCurso(dados.nome_curso || cursoId);
        } else {
          setNomeCurso(cursoId);
        }

        const progresso = getProgressoCursos()[cursoId];
        if (progresso?.modulos) {
          const notas = Object.values(progresso.modulos).map(m => m.nota || 0);
          const media = Math.round(notas.reduce((acc, n) => acc + n, 0) / notas.length);
          setAproveitamento(media);
          if (media >= 50) {
            setValido(true);
          }
        } else {
          setAproveitamento(0);
          setValido(false);
        }
      } catch (e) {
        console.error('Erro ao carregar certificado:', e);
        setNomeCurso('Curso');
        setAproveitamento(0);
        setValido(false);
      }
    };

    fetchDados();
  }, [cursoId]);

  if (!user || nomeCurso === null || aproveitamento === null) {
    return (
      <div style={{ color: 'white', textAlign: 'center', marginTop: '50px' }}>
        Carregando certificado...
      </div>
    );
  }

  if (!valido) {
    return (
      <div style={{ color: 'white', textAlign: 'center', marginTop: '50px' }}>
        Este certificado não pode ser exibido. Aproveitamento insuficiente ({aproveitamento}%).
      </div>
    );
  }

  return (
    <div style={{
      minHeight: '100vh',
      backgroundColor: '#1F2225',
      padding: '30px 15px',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      flexDirection: 'column',
      color: 'white'
    }}>
      <div style={{
        maxWidth: '600px',
        background: '#2C2F33',
        border: '1px solid #444',
        padding: '30px',
        borderRadius: '15px',
        textAlign: 'center',
        boxShadow: '0 0 20px rgba(0,0,0,0.4)'
      }}>
        <h1>Certificado de Conclusão</h1>
        <p style={{ fontSize: '18px', marginBottom: '10px' }}>
          Certificamos que o(a) aluno(a)
        </p>
        <h2>{user.firstName} {user.lastName}</h2>
        <p style={{ fontSize: '18px' }}>concluiu o curso</p>
        <h3>{nomeCurso}</h3>
        <p style={{ fontSize: '18px' }}>com aproveitamento de <strong>{aproveitamento}%</strong>.</p>
        <p style={{ fontSize: '14px', color: '#bbb', marginTop: '20px' }}>
          Emitido em: {new Date().toLocaleDateString()}
        </p>
        <button
          onClick={() => window.print()}
          className="btn btn-primary mt-3"
        >
          Imprimir
        </button>
      </div>
    </div>
  );
};

export default CertificadoView;