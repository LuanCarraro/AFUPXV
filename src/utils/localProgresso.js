

export const getProgressoCursos = () => {
  const data = localStorage.getItem('progressoCursos');
  return data ? JSON.parse(data) : {};
};

export const saveProgressoCursos = (data) => {
  localStorage.setItem('progressoCursos', JSON.stringify(data));
};

export const registrarAulaAssistida = (cursoId, moduloIndex) => {
  const progresso = getProgressoCursos();
  progresso[cursoId] = progresso[cursoId] || { modulos: {} };
  progresso[cursoId].modulos[moduloIndex] = progresso[cursoId].modulos[moduloIndex] || {};
  progresso[cursoId].modulos[moduloIndex].aulaAssistida = true;
  saveProgressoCursos(progresso);
  verificarCertificadoLiberado(cursoId); // ✅ chama após assistir
};

export const registrarQuizRespondido = (cursoId, moduloIndex, nota) => {
  const progresso = getProgressoCursos();
  progresso[cursoId] = progresso[cursoId] || { modulos: {} };
  progresso[cursoId].modulos[moduloIndex] = progresso[cursoId].modulos[moduloIndex] || {};
  progresso[cursoId].modulos[moduloIndex].quizRespondido = true;
  progresso[cursoId].modulos[moduloIndex].nota = nota;
  saveProgressoCursos(progresso);
  verificarCertificadoLiberado(cursoId); // ✅ chama após quiz também
};

export const verificarCertificadoLiberado = (cursoId) => {
  const progresso = getProgressoCursos();
  const curso = progresso[cursoId];
  if (!curso || !curso.modulos) return;

  const modulos = Object.values(curso.modulos);
  if (modulos.length === 0) return;

  let todasAulasAssistidas = true;
  let todosQuizzesFeitos = true;
  let somaNotas = 0;

  for (const mod of modulos) {
    if (!mod.aulaAssistida) todasAulasAssistidas = false;
    if (!mod.quizRespondido) todosQuizzesFeitos = false;
    somaNotas += mod.nota || 0;
  }

  const media = Math.round(somaNotas / modulos.length);

  if (todasAulasAssistidas && todosQuizzesFeitos && media >= 50) {
    progresso[cursoId].certificadoLiberado = true;
    saveProgressoCursos(progresso);
  }
};

export const emitirCertificado = (cursoId) => {
  const progresso = getProgressoCursos();
  if (progresso[cursoId]?.certificadoLiberado) {
    progresso[cursoId].certificadoEmitido = true;
    saveProgressoCursos(progresso);
  }
};