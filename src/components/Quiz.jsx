import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';  // Importando o hook useNavigate para navegação
import Sidebar from './layout/sidebar';  // Componente Sidebar

export const Quiz = () => {
    const navigate = useNavigate();  // Hook para navegar entre as páginas
    const [respostas, setRespostas] = useState({});  // Estado para armazenar as respostas do quiz
    const [resultado, setResultado] = useState(null);  // Estado para armazenar o resultado final

    // Definição das perguntas e alternativas do quiz
    const quiz = [
        {
            pergunta: "O que é Node.js?",
            alternativas: [
                "Uma linguagem de programação",
                "Um framework JavaScript",
                "Uma plataforma JavaScript para servidores",
                "Uma biblioteca para o front-end"
            ],
            resposta_certa: "Uma plataforma JavaScript para servidores"
        },
        {
            pergunta: "Qual é a principal vantagem do Node.js?",
            alternativas: [
                "Alta performance em cálculos matemáticos",
                "Execução de código em múltiplas threads",
                "Execução não bloqueante e assíncrona",
                "Suporte nativo para SQL"
            ],
            resposta_certa: "Execução não bloqueante e assíncrona"
        },
        {
            pergunta: "Qual é o gerenciador de pacotes mais utilizado no Node.js?",
            alternativas: [
                "Yarn",
                "npm",
                "Bower",
                "Pip"
            ],
            resposta_certa: "npm"
        }
    ];

    // Função para lidar com a mudança de resposta
    const handleChange = (perguntaIndex, resposta) => {
        setRespostas(prevState => ({
            ...prevState,
            [perguntaIndex]: resposta,  // Atualiza a resposta para a pergunta selecionada
        }));
    };

    // Função para calcular o resultado do quiz
    const handleSubmit = () => {
        let acertos = 0;
        quiz.forEach((pergunta, index) => {
            if (respostas[index] === pergunta.resposta_certa) {  // Compara a resposta com a correta
                acertos++;
            }
        });
        setResultado(`Você acertou ${acertos} de ${quiz.length} perguntas.`);  // Exibe o resultado final
    };

    // Função para navegar para a página anterior
    const handleVoltar = () => {
        navigate(-1);  // Volta para a página anterior na navegação
    };

    return (
        <div className="d-flex" style={{ height: '100vh', width: '100vw' }}>
            <Sidebar />  {/* Componente Sidebar */}
            <div className="home-panel flex-grow-1 m-2 rounded-4 overflow-auto p-4" style={{ backgroundColor: '#1F2225' }}>
                <h2 style={{ color: '#fff' }}>Quiz Estático - Curso de Node.js</h2>
                <form onSubmit={(e) => { e.preventDefault(); handleSubmit(); }}>
                    {quiz.map((pergunta, index) => (
                        <div key={index} style={{ marginBottom: '20px' }}>
                            <h3 style={{ color: '#fff' }}>{pergunta.pergunta}</h3>
                            {pergunta.alternativas.map((alternativa, idx) => (
                                <div key={idx} style={{ marginBottom: '10px' }}>
                                    <label style={{ color: '#fff' }}>
                                        <input
                                            type="radio"
                                            name={`pergunta${index}`}
                                            value={alternativa}
                                            onChange={() => handleChange(index, alternativa)}
                                            checked={respostas[index] === alternativa}
                                            style={{ marginRight: '10px' }}
                                        />
                                        {alternativa}
                                    </label>
                                </div>
                            ))}
                        </div>
                    ))}
                    <button
                        type="submit"
                        style={{
                            backgroundColor: '#007bff',
                            color: '#fff',
                            border: 'none',
                            padding: '10px 20px',
                            borderRadius: '4px',
                            cursor: 'pointer',
                            fontSize: '16px'
                        }}>
                        Enviar Respostas
                    </button>
                </form>
                {resultado && <p style={{ color: '#fff', marginTop: '20px' }}>{resultado}</p>}

                {/* Botão Voltar */}
                <button
                    onClick={handleVoltar}
                    style={{
                        backgroundColor: '#6c757d',
                        color: '#fff',
                        border: 'none',
                        padding: '10px 20px',
                        borderRadius: '4px',
                        cursor: 'pointer',
                        fontSize: '16px',
                        marginTop: '20px'
                    }}>
                    Voltar
                </button>
            </div>
        </div>
    );
};
