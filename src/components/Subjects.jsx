import React, { useContext, useState, useEffect } from 'react';
import { AuthEmailPasswordContext } from '../context/authEmailPassword';
import { getFirestore, collection, getDocs, doc, updateDoc, arrayUnion } from 'firebase/firestore'; // Adicionei as importações aqui
import { app } from '../services/firebaseConfig';

const Subjects = () => {
    const { user } = useContext(AuthEmailPasswordContext); // Obtém o usuário logado do contexto
    const userLogado = JSON.parse(user);
    const [cursos, setCursos] = useState([]);
    const db = getFirestore(app);

    useEffect(() => {
        // Função para buscar os cursos do Firestore
        const fetchCursos = async () => {
            try {
                const querySnapshot = await getDocs(collection(db, "Cursos"));
                const cursosData = querySnapshot.docs.map((doc) => ({
                    id: doc.id,  // Pegando o ID do documento gerado pelo Firestore
                    ...doc.data(), // Outros dados do curso
                }));
                setCursos(cursosData);
            } catch (e) {
                console.error("Erro ao buscar os cursos:", e);
            }
        };

        fetchCursos();
    }, []);

    const handleInscrever = async (cursoId) => {
        if (userLogado) {
            console.log('ID do curso:', cursoId);  // Adicionando log para verificar o valor de cursoId
            try {
                const cursoRef = doc(db, 'Cursos', cursoId);
                await updateDoc(cursoRef, {
                    inscritos: arrayUnion(userLogado.uid),
                });

                console.log(`Usuário ${userLogado.uid} se inscreveu no curso ${cursoId}`);
            } catch (e) {
                console.error('Erro ao inscrever no curso:', e);
            }
        } else {
            console.log('Usuário não está logado');
        }
    };

    return (
        <div className="mt-5">
            <div className="row">
                {cursos.length === 0 ? (
                    <div className="col-12">
                        <p>Estamos sem cursos no momento.</p>
                    </div>
                ) : (
                    cursos.map((curso) => (
                        <div key={curso.id} className="col-12 col-sm-6 col-md-4 col-lg-3 mb-4">
                            <div
                                className="card h-100"
                                style={{ backgroundColor: '#343a40', color: 'white' }} // Cor do card
                            >
                                <img
                                    src="path-to-image" // Substitua pela URL da imagem
                                    className="card-img-top"
                                    alt={curso.nome_curso}
                                    style={{ height: '150px', objectFit: 'cover' }} // Ajusta a imagem para caber no card
                                />
                                <div className="card-body d-flex flex-column">
                                    <h5 className="card-title">{curso.nome_curso}</h5>
                                    <p className="card-text" style={{ flexGrow: 1 }}>{curso.descricao}</p>
                                    <button
                                        className="btn"
                                        style={{ backgroundColor: '#6f42c1', borderColor: '#6f42c1' }} // Cor do botão
                                        onClick={() => handleInscrever(curso.id)} // Passando o id correto do curso
                                    >
                                        Inscrever-se
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};

export default Subjects;
