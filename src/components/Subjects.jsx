import React, { useContext, useState, useEffect } from 'react';
import { AuthEmailPasswordContext } from '../context/authEmailPassword';
import { getFirestore, collection, getDocs, doc, updateDoc, arrayUnion } from 'firebase/firestore';
import { app } from '../services/firebaseConfig';
import 'bootstrap/dist/css/bootstrap.min.css';  // Importa o estilo do Bootstrap

const Subjects = () => {
    const { user } = useContext(AuthEmailPasswordContext);
    const [cursos, setCursos] = useState([]);
    const [isLoading, setIsLoading] = useState(true); // Novo estado de carregamento
    const [showModal, setShowModal] = useState(false); // Estado para controlar a exibição do modal
    const [modalMessage, setModalMessage] = useState(''); // Mensagem para exibir no modal
    const [botaoDesabilitado, setBotaoDesabilitado] = useState({}); // Novo estado para gerenciar os botões
    const db = getFirestore(app);

    useEffect(() => {
        const fetchCursos = async () => {
            try {
                const querySnapshot = await getDocs(collection(db, "Cursos"));
                const cursosData = querySnapshot.docs.map((doc) => ({
                    id: doc.id,
                    ...doc.data(),
                }));
                setCursos(cursosData);
            } catch (e) {
                console.error("Erro ao buscar os cursos:", e);
            } finally {
                setIsLoading(false); // Define como falso após o carregamento
            }
        };

        fetchCursos();
    }, []);

    const handleInscrever = async (cursoId) => {
        if (user) {
            try {
                const cursoRef = doc(db, 'Cursos', cursoId);
                await updateDoc(cursoRef, {
                    inscritos: arrayUnion(user.uid),
                });

                // Atualiza o estado para desabilitar o botão imediatamente
                setBotaoDesabilitado((prev) => ({
                    ...prev,
                    [cursoId]: true,
                }));

                setModalMessage(`Parabéns! Você se inscreveu no curso com sucesso!`);
                setShowModal(true); // Exibe o modal com a mensagem de sucesso
            } catch (e) {
                console.error('Erro ao inscrever no curso:', e);
                setModalMessage('Erro ao se inscrever no curso. Tente novamente.');
                setShowModal(true); // Exibe o modal com a mensagem de erro
            }
        } else {
            console.log('Usuário não está logado');
        }
    };

    const verificarInscricao = (curso) => {
        return curso.inscritos && curso.inscritos.includes(user.uid);
    };

    return (
        <div className="mt-5">
            <div className="row">
                {isLoading ? (
                    <p>Carregando...</p>
                ) : cursos.length === 0 ? (
                    <div className="col-12">
                        <p>Estamos sem cursos no momento.</p>
                    </div>
                ) : (
                    cursos.map((curso) => (
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
                                        className={`btn ${verificarInscricao(curso) || botaoDesabilitado[curso.id] ? 'btn-secondary' : 'btn-primary'}`}
                                        style={{
                                            backgroundColor: verificarInscricao(curso) || botaoDesabilitado[curso.id] ? '#6f42c1' : '#007bff',
                                            borderColor: verificarInscricao(curso) || botaoDesabilitado[curso.id] ? '#6f42c1' : '#007bff',
                                        }}
                                        onClick={() => !verificarInscricao(curso) && handleInscrever(curso.id)}
                                        disabled={verificarInscricao(curso) || botaoDesabilitado[curso.id]}
                                    >
                                        {verificarInscricao(curso) || botaoDesabilitado[curso.id] ? 'Já está inscrito' : 'Inscrever-se'}
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))
                )}
            </div>

            {/* Modal de sucesso */}
            <div className={`modal fade ${showModal ? 'show' : ''}`} tabIndex="-1" aria-hidden="true" style={{ display: showModal ? 'block' : 'none' }}>
                <div className="modal-dialog">
                    <div className="modal-content" style={{ backgroundColor: '#343a40', color: 'white' }}>
                        <div className="modal-header">
                            <h5 className="modal-title">Inscrição Concluída</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" onClick={() => setShowModal(false)}></button>
                        </div>
                        <div className="modal-body">
                            <p>{modalMessage}</p>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" onClick={() => setShowModal(false)}>Fechar</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Subjects;
