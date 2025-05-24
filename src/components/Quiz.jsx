import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getFirestore, doc, getDoc } from 'firebase/firestore';
import { app } from '../services/firebaseConfig';
import {
  registrarQuizRespondido,
  verificarCertificadoLiberado
} from '../utils/localProgresso';
import './Quiz.css';

export const Quiz = () => {
  const { id: cursoId, moduloIndex, aulaIndex } = useParams();
  const [perguntas, setPerguntas] = useState([]);
  const [respostas, setRespostas] = useState({});
  const [resultado, setResultado] = useState(null);
  const navigate = useNavigate();
  const db = getFirestore(app);

  useEffect(() => {
    const fetchQuiz = async () => {
      const docRef = doc(db, 'Cursos', cursoId);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        const curso = docSnap.data();
        const modulo = curso.modulos?.[moduloIndex];
        if (modulo?.quiz?.perguntas) {
          setPerguntas(modulo.quiz.perguntas);
        }
      }
    };

    fetchQuiz();
  }, [cursoId, moduloIndex]);

  const handleChange = (index, resposta) => {
    setRespostas({ ...respostas, [index]: resposta });
  };

  const handleSubmit = () => {
    let acertos = 0;
    perguntas.forEach((p, idx) => {
      if (respostas[idx] === p.resposta_certa) acertos++;
    });

    const nota = Math.round((acertos / perguntas.length) * 100);

    // Salva o progresso local
    registrarQuizRespondido(cursoId, moduloIndex, nota);
    verificarCertificadoLiberado(cursoId);

    setResultado(`Você acertou ${acertos} de ${perguntas.length} perguntas. Nota: ${nota}%`);
  };

  return (
    <div className="quiz-container">
      <h1>Quiz</h1>

      {perguntas.map((p, idx) => (
        <div key={idx} className="pergunta">
          <h3>{p.pergunta}</h3>
          {p.alternativas.map((alt, i) => (
            <label key={i} className="alternativa">
              <input
                type="radio"
                name={`pergunta-${idx}`}
                value={alt}
                checked={respostas[idx] === alt}
                onChange={() => handleChange(idx, alt)}
              />
              {alt}
            </label>
          ))}
        </div>
      ))}

      <button className="botao-responder" onClick={handleSubmit}>
        Enviar Respostas
      </button>

      {resultado && (
        <>
          <div className="resultado">{resultado}</div>
          <button className="btn btn-success mt-3" onClick={() => navigate(-1)}>
            Concluído
          </button>
        </>
      )}

      <button className="btn btn-secondary mt-2" onClick={() => navigate(-1)}>
        Voltar
      </button>
    </div>
  );
};
