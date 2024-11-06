import React from 'react';
import { getFirestore, collection, addDoc } from 'firebase/firestore';



export default function Add() {

    const db = getFirestore();

    // Função para adicionar cursos no Firestore
    const addCursos = async () => {
        try {
            const cursos = [
                {
                    nome_curso: 'Curso de React.js',
                    descricao: 'Aprenda a criar aplicações interativas e modernas usando React.js.',
                    inscritos: [],
                    img: 'assets/img/cursos/1.png',
                },
                {
                    nome_curso: 'Curso de Node.js',
                    descricao: 'Aprenda a desenvolver servidores e APIs com Node.js.',
                    inscritos: [],
                    img: 'assets/img/cursos/2.png',
                },
                {
                    nome_curso: 'Curso de Desenvolvimento Web Completo',
                    descricao: 'Explore o desenvolvimento web do front-end ao back-end com HTML, CSS, JavaScript, React e Node.js.',
                    inscritos: [],
                    img: 'assets/img/cursos/3.png',
                },
                {
                    nome_curso: 'Curso de Banco de Dados SQL',
                    descricao: 'Entenda os conceitos fundamentais de bancos de dados relacionais, como criar e gerenciar bancos de dados utilizando SQL.',
                    inscritos: [],
                    img: 'assets/img/cursos/4.png',
                },
                {
                    nome_curso: 'Curso de Python para Iniciantes',
                    descricao: 'Aprenda Python do zero, uma linguagem versátil e popular.',
                    inscritos: [],
                    img: 'assets/img/cursos/5.png',
                },
                {
                    nome_curso: 'Curso de Machine Learning com Python',
                    descricao: 'Introdução ao aprendizado de máquina utilizando bibliotecas como Pandas, NumPy, e Scikit-learn.',
                    inscritos: [],
                    img: 'assets/img/cursos/6.png',
                },
                {
                    nome_curso: 'Curso de Segurança de Redes',
                    descricao: 'Entenda os fundamentos da segurança em redes de computadores.',
                    inscritos: [],
                    img: 'assets/img/cursos/7.png',
                },
                {
                    nome_curso: 'Curso de DevOps',
                    descricao: 'Aprenda as práticas de integração e entrega contínua (CI/CD) e gerenciamento de containers.',
                    inscritos: [],
                    img: 'assets/img/cursos/8.png',
                },
                {
                    nome_curso: 'Curso de React Native',
                    descricao: 'Desenvolva aplicativos móveis para Android e iOS usando o React Native.',
                    inscritos: [],
                    img: 'assets/img/cursos/9.png',
                },
                {
                    nome_curso: 'Curso de AWS - Amazon Web Services',
                    descricao: 'Conheça os principais serviços da AWS como EC2, S3, Lambda para escalar suas aplicações na nuvem.',
                    inscritos: [],
                    img: 'assets/img/cursos/10.png',
                },
                {
                    nome_curso: 'Curso de Inteligência Artificial',
                    descricao: 'Estude as bases da inteligência artificial, algoritmos e redes neurais.',
                    inscritos: [],
                    img: 'assets/img/cursos/11.png',
                },
                {
                    nome_curso: 'Curso de Firebase para Desenvolvedores',
                    descricao: 'Aprenda a usar o Firebase para adicionar funcionalidades como autenticação, banco de dados e mais em suas aplicações.',
                    inscritos: [],
                    img: 'assets/img/cursos/12.png',
                }
            ];

            // Adiciona cada curso ao Firestore
            for (const curso of cursos) {
                await addDoc(collection(db, 'Cursos'), curso);
            }

            console.log('Cursos adicionados com sucesso!');
        } catch (e) {
            console.error("Erro ao adicionar cursos: ", e);
        }
    };

    // Renderiza o botão para adicionar os cursos
    return (
        <button type="button" className="btn btn-primary" onClick={addCursos}>
            Adicionar Cursos
        </button>
    );
}
