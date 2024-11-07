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
                    img: '/assets/img/cursos/1.png',
                    modulos: [
                        {
                            nome: 'Módulo 1: Introdução ao React',
                            aulas: [
                                {
                                    nome_aula: 'O que é o React?',
                                    link_video: 'https://www.youtube.com/watch?v=xyz123',
                                }
                            ],
                            quiz: {
                                perguntas: [
                                    {
                                        pergunta: 'O que é o React?',
                                        alternativas: [
                                            'Uma linguagem de programação', // errada
                                            'Uma biblioteca JavaScript',  // certa
                                            'Um framework PHP',           // errada
                                            'Uma plataforma de desenvolvimento', // errada
                                            'Uma ferramenta de teste'   // errada
                                        ],
                                        resposta_certa: 'Uma biblioteca JavaScript',
                                    },
                                    {
                                        pergunta: 'Como instalar o React?',
                                        alternativas: [
                                            'npm install react',      // certa
                                            'npm install reactjs',    // errada
                                            'npm install node',       // errada
                                            'npm install react-native', // errada
                                            'npm install angular'     // errada
                                        ],
                                        resposta_certa: 'npm install react',
                                    },
                                    {
                                        pergunta: 'React é usado para desenvolvimento de:',
                                        alternativas: [
                                            'Aplicações móveis',       // errada
                                            'Aplicações de backend',   // errada
                                            'Interfaces de usuário',   // certa
                                            'Jogo em tempo real',      // errada
                                            'Ferramentas de análise'   // errada
                                        ],
                                        resposta_certa: 'Interfaces de usuário',
                                    }
                                ]
                            }
                        },
                        {
                            nome: 'Módulo 2: Componentes no React',
                            aulas: [
                                {
                                    nome_aula: 'Como criar componentes no React?',
                                    link_video: 'https://www.youtube.com/watch?v=xyz456',
                                }
                            ],
                            quiz: {
                                perguntas: [
                                    {
                                        pergunta: 'Como você cria um componente no React?',
                                        alternativas: [
                                            'Função',        // certa
                                            'Classe',        // certa
                                            'Ambas',         // certa
                                            'Objeto',        // errada
                                            'Método'         // errada
                                        ],
                                        resposta_certa: 'Ambas',
                                    },
                                    {
                                        pergunta: 'O que é JSX?',
                                        alternativas: [
                                            'JavaScript e HTML misturados',  // certa
                                            'Uma biblioteca JavaScript',     // errada
                                            'Uma linguagem de programação',  // errada
                                            'JavaScript e CSS misturados',   // errada
                                            'Um framework JS'                // errada
                                        ],
                                        resposta_certa: 'JavaScript e HTML misturados',
                                    },
                                    {
                                        pergunta: 'Qual o propósito dos props?',
                                        alternativas: [
                                            'Armazenar dados do componente', // errada
                                            'Passar dados entre componentes', // certa
                                            'Gerenciar o estado do componente', // errada
                                            'Criar novos componentes',  // errada
                                            'Alterar a renderização de componentes' // errada
                                        ],
                                        resposta_certa: 'Passar dados entre componentes',
                                    }
                                ]
                            }
                        }
                    ]
                },
                {
                    nome_curso: 'Curso de Node.js',
                    descricao: 'Aprenda a desenvolver servidores e APIs com Node.js.',
                    inscritos: [],
                    img: '/assets/img/cursos/2.png',
                    modulos: [
                        {
                            nome: 'Módulo 1: Introdução ao Node.js',
                            aulas: [
                                {
                                    nome_aula: 'O que é Node.js?',
                                    link_video: 'https://www.youtube.com/watch?v=abc123',
                                }
                            ],
                            quiz: {
                                perguntas: [
                                    {
                                        pergunta: 'O que é Node.js?',
                                        alternativas: [
                                            'Um framework', // errada
                                            'Uma linguagem de programação', // errada
                                            'Ambiente de execução JavaScript', // certa
                                            'Uma plataforma de back-end', // errada
                                            'Uma IDE' // errada
                                        ],
                                        resposta_certa: 'Ambiente de execução JavaScript',
                                    },
                                    {
                                        pergunta: 'Node.js é baseado em qual linguagem?',
                                        alternativas: [
                                            'Java',        // errada
                                            'JavaScript',  // certa
                                            'C++',         // errada
                                            'Python',      // errada
                                            'Ruby'         // errada
                                        ],
                                        resposta_certa: 'JavaScript',
                                    },
                                    {
                                        pergunta: 'Qual o comando para instalar o Node.js?',
                                        alternativas: [
                                            'npm install node',    // errada
                                            'npm install',         // certa
                                            'npm install nodejs',  // errada
                                            'npm install express', // errada
                                            'npm install npm'      // errada
                                        ],
                                        resposta_certa: 'npm install',
                                    }
                                ]
                            }
                        },
                        {
                            nome: 'Módulo 2: Criando APIs com Node.js',
                            aulas: [
                                {
                                    nome_aula: 'Como criar APIs RESTful com Node.js?',
                                    link_video: 'https://www.youtube.com/watch?v=abc456',
                                }
                            ],
                            quiz: {
                                perguntas: [
                                    {
                                        pergunta: 'O que é uma API RESTful?',
                                        alternativas: [
                                            'Um tipo de banco de dados',  // errada
                                            'Uma API baseada em REST',   // certa
                                            'Um framework JavaScript',   // errada
                                            'Uma biblioteca',            // errada
                                            'Uma ferramenta de frontend' // errada
                                        ],
                                        resposta_certa: 'Uma API baseada em REST',
                                    },
                                    {
                                        pergunta: 'Qual método HTTP é utilizado para criar dados?',
                                        alternativas: [
                                            'GET',  // errada
                                            'POST', // certa
                                            'PUT',  // errada
                                            'DELETE', // errada
                                            'PATCH' // errada
                                        ],
                                        resposta_certa: 'POST',
                                    },
                                    {
                                        pergunta: 'Qual pacote é comum para lidar com rotas no Node.js?',
                                        alternativas: [
                                            'Express', // certa
                                            'Axios',   // errada
                                            'Node-fetch', // errada
                                            'Superagent', // errada
                                            'Request'    // errada
                                        ],
                                        resposta_certa: 'Express',
                                    }
                                ]
                            }
                        }
                    ]
                },
                {
                    nome_curso: 'Curso de Desenvolvimento Web Completo',
                    descricao: 'Explore o desenvolvimento web do front-end ao back-end com HTML, CSS, JavaScript, React e Node.js.',
                    inscritos: [],
                    img: '/assets/img/cursos/3.png',
                    modulos: [
                        {
                            nome: 'Módulo 1: Fundamentos do Front-End',
                            aulas: [
                                {
                                    nome_aula: 'Introdução ao HTML e CSS',
                                    link_video: 'https://www.youtube.com/watch?v=ghi123',
                                }
                            ],
                            quiz: {
                                perguntas: [
                                    {
                                        pergunta: 'O que é HTML?',
                                        alternativas: [
                                            'Linguagem de programação',    // errada
                                            'Linguagem de marcação de texto', // certa
                                            'Framework',                   // errada
                                            'Estilo de página',            // errada
                                            'Banco de dados'               // errada
                                        ],
                                        resposta_certa: 'Linguagem de marcação de texto',
                                    },
                                    {
                                        pergunta: 'Qual a tag para criar uma lista ordenada?',
                                        alternativas: [
                                            '<ol>',   // certa
                                            '<ul>',   // errada
                                            '<li>',   // errada
                                            '<list>', // errada
                                            '<ordered>' // errada
                                        ],
                                        resposta_certa: '<ol>',
                                    },
                                    {
                                        pergunta: 'O que é CSS?',
                                        alternativas: [
                                            'Uma linguagem de marcação',  // errada
                                            'Uma linguagem de estilização de páginas web', // certa
                                            'Uma linguagem de programação', // errada
                                            'Uma biblioteca JavaScript',   // errada
                                            'Um framework CSS'             // errada
                                        ],
                                        resposta_certa: 'Uma linguagem de estilização de páginas web',
                                    }
                                ]
                            }
                        },
                        {
                            nome: 'Módulo 2: JavaScript para Web',
                            aulas: [
                                {
                                    nome_aula: 'Introdução ao JavaScript',
                                    link_video: 'https://www.youtube.com/watch?v=ghi456',
                                }
                            ],
                            quiz: {
                                perguntas: [
                                    {
                                        pergunta: 'O que é JavaScript?',
                                        alternativas: [
                                            'Uma linguagem de marcação',   // errada
                                            'Uma linguagem de programação', // certa
                                            'Uma biblioteca',              // errada
                                            'Uma framework',               // errada
                                            'Uma ferramenta de design'     // errada
                                        ],
                                        resposta_certa: 'Uma linguagem de programação',
                                    },
                                    {
                                        pergunta: 'Qual o comando para exibir uma mensagem no console?',
                                        alternativas: [
                                            'console.log()', // certa
                                            'alert()',       // errada
                                            'document.write()', // errada
                                            'print()',       // errada
                                            'log.console()'  // errada
                                        ],
                                        resposta_certa: 'console.log()',
                                    },
                                    {
                                        pergunta: 'Como você cria uma variável em JavaScript?',
                                        alternativas: [
                                            'var nome',  // certa
                                            'variable nome', // errada
                                            'let nome',      // errada
                                            'int nome',      // errada
                                            'name = nome'    // errada
                                        ],
                                        resposta_certa: 'var nome',
                                    }
                                ]
                            }
                        }
                    ]
                },
                {
                    nome_curso: 'Curso de Banco de Dados SQL',
                    descricao: 'Entenda os conceitos fundamentais de bancos de dados relacionais, como criar e gerenciar bancos de dados utilizando SQL.',
                    inscritos: [],
                    img: '/assets/img/cursos/4.png',
                    modulos: [
                        {
                            nome: 'Módulo 1: Introdução ao SQL',
                            aulas: [
                                {
                                    nome_aula: 'O que é SQL?',
                                    link_video: 'https://www.youtube.com/watch?v=ijk123',
                                }
                            ],
                            quiz: {
                                perguntas: [
                                    {
                                        pergunta: 'O que significa SQL?',
                                        alternativas: [
                                            'Structured Query Language', // certa
                                            'Standard Query Language',  // errada
                                            'Simple Query Language'     // errada
                                        ],
                                        resposta_certa: 'Structured Query Language',
                                    },
                                    {
                                        pergunta: 'Qual comando SQL é usado para selecionar dados?',
                                        alternativas: [
                                            'SELECT',   // certa
                                            'INSERT',   // errada
                                            'UPDATE'    // errada
                                        ],
                                        resposta_certa: 'SELECT',
                                    },
                                    {
                                        pergunta: 'Qual comando SQL é usado para excluir dados?',
                                        alternativas: [
                                            'DELETE',   // certa
                                            'REMOVE',   // errada
                                            'DROP'      // errada
                                        ],
                                        resposta_certa: 'DELETE',
                                    }
                                ]
                            }
                        },
                        {
                            nome: 'Módulo 2: Manipulação de Dados com SQL',
                            aulas: [
                                {
                                    nome_aula: 'Como inserir e atualizar dados no SQL?',
                                    link_video: 'https://www.youtube.com/watch?v=ijk456',
                                }
                            ],
                            quiz: {
                                perguntas: [
                                    {
                                        pergunta: 'Qual comando SQL é usado para adicionar dados?',
                                        alternativas: [
                                            'INSERT',   // certa
                                            'CREATE',   // errada
                                            'ADD'       // errada
                                        ],
                                        resposta_certa: 'INSERT',
                                    },
                                    {
                                        pergunta: 'Qual comando SQL é usado para alterar dados existentes?',
                                        alternativas: [
                                            'UPDATE',   // certa
                                            'ALTER',    // errada
                                            'MODIFY'    // errada
                                        ],
                                        resposta_certa: 'UPDATE',
                                    },
                                    {
                                        pergunta: 'Qual cláusula SQL é usada para filtrar resultados?',
                                        alternativas: [
                                            'WHERE',    // certa
                                            'HAVING',   // errada
                                            'ORDER BY'  // errada
                                        ],
                                        resposta_certa: 'WHERE',
                                    }
                                ]
                            }
                        }
                    ]
                },
                {
                    nome_curso: 'Curso de Python para Iniciantes',
                    descricao: 'Aprenda Python do zero, uma linguagem versátil e popular.',
                    inscritos: [],
                    img: '/assets/img/cursos/5.png',
                    modulos: [
                        {
                            nome: 'Módulo 1: Fundamentos do Python',
                            aulas: [
                                {
                                    nome_aula: 'O que é Python?',
                                    link_video: 'https://www.youtube.com/watch?v=lmn123',
                                }
                            ],
                            quiz: {
                                perguntas: [
                                    {
                                        pergunta: 'O que é Python?',
                                        alternativas: [
                                            'Uma linguagem de marcação',  // errada
                                            'Uma linguagem de programação', // certa
                                            'Uma biblioteca'              // errada
                                        ],
                                        resposta_certa: 'Uma linguagem de programação',
                                    },
                                    {
                                        pergunta: 'Qual comando é usado para imprimir algo em Python?',
                                        alternativas: [
                                            'print()',  // certa
                                            'echo()',   // errada
                                            'output()'  // errada
                                        ],
                                        resposta_certa: 'print()',
                                    },
                                    {
                                        pergunta: 'Como declarar uma variável em Python?',
                                        alternativas: [
                                            'var x',    // errada
                                            'x = 10',   // certa
                                            'int x'     // errada
                                        ],
                                        resposta_certa: 'x = 10',
                                    }
                                ]
                            }
                        },
                        {
                            nome: 'Módulo 2: Controle de Fluxo e Funções',
                            aulas: [
                                {
                                    nome_aula: 'Estruturas de Controle em Python',
                                    link_video: 'https://www.youtube.com/watch?v=lmn456',
                                }
                            ],
                            quiz: {
                                perguntas: [
                                    {
                                        pergunta: 'Qual comando é usado para criar uma função em Python?',
                                        alternativas: [
                                            'def nome()',   // certa
                                            'function nome()', // errada
                                            'func nome()'      // errada
                                        ],
                                        resposta_certa: 'def nome()',
                                    },
                                    {
                                        pergunta: 'Qual estrutura de controle verifica uma condição em Python?',
                                        alternativas: [
                                            'if',      // certa
                                            'while',   // errada
                                            'for'      // errada
                                        ],
                                        resposta_certa: 'if',
                                    },
                                    {
                                        pergunta: 'Qual comando é usado para criar um laço de repetição em Python?',
                                        alternativas: [
                                            'for',     // certa
                                            'loop',    // errada
                                            'repeat'   // errada
                                        ],
                                        resposta_certa: 'for',
                                    }
                                ]
                            }
                        }
                    ]
                },
                {
                    nome_curso: 'Curso de Machine Learning com Python',
                    descricao: 'Introdução ao aprendizado de máquina utilizando bibliotecas como Pandas, NumPy, e Scikit-learn.',
                    inscritos: [],
                    img: '/assets/img/cursos/6.png',
                    modulos: [
                        {
                            nome: 'Módulo 1: Introdução ao Machine Learning',
                            aulas: [
                                {
                                    nome_aula: 'O que é Machine Learning?',
                                    link_video: 'https://www.youtube.com/watch?v=xyz123',
                                }
                            ],
                            quiz: {
                                perguntas: [
                                    {
                                        pergunta: 'O que é Machine Learning?',
                                        alternativas: [
                                            'Programação tradicional',     // errada
                                            'Aprendizado de máquina',     // certa
                                            'Inteligência artificial'     // errada
                                        ],
                                        resposta_certa: 'Aprendizado de máquina',
                                    },
                                    {
                                        pergunta: 'Quais bibliotecas são comumente usadas em Machine Learning?',
                                        alternativas: [
                                            'NumPy, Pandas, Scikit-learn', // certa
                                            'React, Node.js, Express',     // errada
                                            'TensorFlow, Flask, Django'    // errada
                                        ],
                                        resposta_certa: 'NumPy, Pandas, Scikit-learn',
                                    },
                                    {
                                        pergunta: 'Qual a principal diferença entre aprendizado supervisionado e não supervisionado?',
                                        alternativas: [
                                            'A quantidade de dados',           // errada
                                            'A presença de rótulos nos dados', // certa
                                            'A complexidade do algoritmo'     // errada
                                        ],
                                        resposta_certa: 'A presença de rótulos nos dados',
                                    }
                                ]
                            }
                        },
                        {
                            nome: 'Módulo 2: Implementando Algoritmos de Machine Learning',
                            aulas: [
                                {
                                    nome_aula: 'Como implementar um modelo de Machine Learning?',
                                    link_video: 'https://www.youtube.com/watch?v=xyz456',
                                }
                            ],
                            quiz: {
                                perguntas: [
                                    {
                                        pergunta: 'Qual a função do Pandas no Machine Learning?',
                                        alternativas: [
                                            'Manipulação de dados',   // certa
                                            'Criação de modelos',     // errada
                                            'Visualização de dados'   // errada
                                        ],
                                        resposta_certa: 'Manipulação de dados',
                                    },
                                    {
                                        pergunta: 'Qual função do Scikit-learn é usada para dividir dados em treino e teste?',
                                        alternativas: [
                                            'train_test_split', // certa
                                            'split_data',       // errada
                                            'train_split'       // errada
                                        ],
                                        resposta_certa: 'train_test_split',
                                    },
                                    {
                                        pergunta: 'O que é um modelo supervisionado?',
                                        alternativas: [
                                            'Modelo sem rótulos',               // errada
                                            'Modelo com rótulos nos dados',     // certa
                                            'Modelo sem dados'                 // errada
                                        ],
                                        resposta_certa: 'Modelo com rótulos nos dados',
                                    }
                                ]
                            }
                        }
                    ]
                },
                {
                    "nome_curso": "Curso de Segurança de Redes",
                    "descricao": "Entenda os fundamentos da segurança em redes de computadores.",
                    "inscritos": [],
                    "img": "/assets/img/cursos/7.png",
                    "modulos": [
                        {
                            "nome": "Módulo 1: Introdução à Segurança de Redes",
                            "aulas": [
                                {
                                    "nome_aula": "O que é segurança de redes?",
                                    "link_video": "https://www.youtube.com/watch?v=abc123"
                                }
                            ],
                            "quiz": {
                                "perguntas": [
                                    {
                                        "pergunta": "O que é segurança de redes?",
                                        "alternativas": [
                                            "Proteção contra vírus",
                                            "Proteção de dados e informações em redes",
                                            "Proteção contra roubo de equipamentos"
                                        ],
                                        "resposta_certa": "Proteção de dados e informações em redes"
                                    },
                                    {
                                        "pergunta": "O que é um firewall?",
                                        "alternativas": [
                                            "Proteção física para servidores",
                                            "Sistema de controle de tráfego de rede",
                                            "Sistema de criptografia"
                                        ],
                                        "resposta_certa": "Sistema de controle de tráfego de rede"
                                    },
                                    {
                                        "pergunta": "Qual o principal objetivo da criptografia?",
                                        "alternativas": [
                                            "Acelerar o tráfego",
                                            "Proteger dados durante a transmissão",
                                            "Proteger o hardware"
                                        ],
                                        "resposta_certa": "Proteger dados durante a transmissão"
                                    }
                                ]
                            }
                        },
                        {
                            "nome": "Módulo 2: Proteção contra Ataques em Redes",
                            "aulas": [
                                {
                                    "nome_aula": "Como se proteger contra ataques de DDoS?",
                                    "link_video": "https://www.youtube.com/watch?v=abc456"
                                }
                            ],
                            "quiz": {
                                "perguntas": [
                                    {
                                        "pergunta": "O que significa DDoS?",
                                        "alternativas": [
                                            "Distributed Denial of Service",
                                            "Dynamic Data of Service",
                                            "Denial of Service"
                                        ],
                                        "resposta_certa": "Distributed Denial of Service"
                                    },
                                    {
                                        "pergunta": "Qual é a principal característica de um ataque DDoS?",
                                        "alternativas": [
                                            "Invasão de servidores",
                                            "Sobrecarga de servidores",
                                            "Roubo de dados"
                                        ],
                                        "resposta_certa": "Sobrecarga de servidores"
                                    },
                                    {
                                        "pergunta": "Quais são as melhores práticas para proteger sua rede?",
                                        "alternativas": [
                                            "Uso de firewall e criptografia",
                                            "Desabilitar a rede Wi-Fi",
                                            "Excluir todos os dados da rede"
                                        ],
                                        "resposta_certa": "Uso de firewall e criptografia"
                                    }
                                ]
                            }
                        }
                    ]
                },
                {
                    "nome_curso": "Curso de DevOps",
                    "descricao": "Aprenda as práticas de integração e entrega contínua (CI/CD) e gerenciamento de containers.",
                    "inscritos": [],
                    "img": "/assets/img/cursos/8.png",
                    "modulos": [
                        {
                            "nome": "Módulo 1: Introdução ao DevOps",
                            "aulas": [
                                {
                                    "nome_aula": "O que é DevOps?",
                                    "link_video": "https://www.youtube.com/watch?v=def123"
                                }
                            ],
                            "quiz": {
                                "perguntas": [
                                    {
                                        "pergunta": "O que é DevOps?",
                                        "alternativas": [
                                            "Conjunto de ferramentas",
                                            "Cultura e práticas para integrar desenvolvimento e operações",
                                            "Uma linguagem de programação"
                                        ],
                                        "resposta_certa": "Cultura e práticas para integrar desenvolvimento e operações"
                                    },
                                    {
                                        "pergunta": "Qual é o principal objetivo do DevOps?",
                                        "alternativas": [
                                            "Reduzir o tempo de desenvolvimento",
                                            "Aumentar a segurança",
                                            "Aumentar a quantidade de servidores"
                                        ],
                                        "resposta_certa": "Reduzir o tempo de desenvolvimento"
                                    },
                                    {
                                        "pergunta": "O que significa CI/CD?",
                                        "alternativas": [
                                            "Continuous Integration/Continuous Deployment",
                                            "Continuous Improvement/Continuous Deployment",
                                            "Continuous Integration/Continuous Delivery"
                                        ],
                                        "resposta_certa": "Continuous Integration/Continuous Deployment"
                                    }
                                ]
                            }
                        },
                        {
                            "nome": "Módulo 2: Ferramentas de DevOps",
                            "aulas": [
                                {
                                    "nome_aula": "Como usar Docker e Kubernetes?",
                                    "link_video": "https://www.youtube.com/watch?v=def456"
                                }
                            ],
                            "quiz": {
                                "perguntas": [
                                    {
                                        "pergunta": "O que é o Docker?",
                                        "alternativas": [
                                            "Ferramenta de automação",
                                            "Ferramenta de containers",
                                            "Ferramenta de backup"
                                        ],
                                        "resposta_certa": "Ferramenta de containers"
                                    },
                                    {
                                        "pergunta": "Qual a principal vantagem de usar Kubernetes?",
                                        "alternativas": [
                                            "Gerenciamento de containers",
                                            "Criação de novos containers",
                                            "Gerenciamento de banco de dados"
                                        ],
                                        "resposta_certa": "Gerenciamento de containers"
                                    },
                                    {
                                        "pergunta": "O que significa o conceito de 'infraestrutura como código'?",
                                        "alternativas": [
                                            "Automatizar a construção de servidores",
                                            "Automatizar a construção de aplicações",
                                            "Criar scripts para automatizar a infraestrutura"
                                        ],
                                        "resposta_certa": "Criar scripts para automatizar a infraestrutura"
                                    }
                                ]
                            }
                        }
                    ]
                },
                {
                    "nome_curso": "Curso de React Native",
                    "descricao": "Desenvolva aplicativos móveis para Android e iOS usando o React Native.",
                    "inscritos": [],
                    "img": "/assets/img/cursos/9.png",
                    "modulos": [
                        {
                            "nome": "Módulo 1: Introdução ao React Native",
                            "aulas": [
                                {
                                    "nome_aula": "O que é o React Native?",
                                    "link_video": "https://www.youtube.com/watch?v=ghi123"
                                }
                            ],
                            "quiz": {
                                "perguntas": [
                                    {
                                        "pergunta": "O que é React Native?",
                                        "alternativas": [
                                            "Framework para front-end",
                                            "Biblioteca para criar aplicativos móveis",
                                            "Biblioteca para back-end"
                                        ],
                                        "resposta_certa": "Biblioteca para criar aplicativos móveis"
                                    },
                                    {
                                        "pergunta": "Quais são os principais benefícios do React Native?",
                                        "alternativas": [
                                            "Desenvolvimento rápido para Android e iOS",
                                            "Necessita de múltiplos códigos para Android e iOS",
                                            "É mais fácil que o Flutter"
                                        ],
                                        "resposta_certa": "Desenvolvimento rápido para Android e iOS"
                                    },
                                    {
                                        "pergunta": "Como o React Native se comunica com componentes nativos?",
                                        "alternativas": [
                                            "Através de bridges",
                                            "Comando HTTP",
                                            "Usando JavaScript"
                                        ],
                                        "resposta_certa": "Através de bridges"
                                    }
                                ]
                            }
                        },
                        {
                            "nome": "Módulo 2: Criando seu primeiro App com React Native",
                            "aulas": [
                                {
                                    "nome_aula": "Criando um aplicativo simples no React Native",
                                    "link_video": "https://www.youtube.com/watch?v=ghi456"
                                }
                            ],
                            "quiz": {
                                "perguntas": [
                                    {
                                        "pergunta": "Qual comando é usado para iniciar um projeto React Native?",
                                        "alternativas": [
                                            "npx react-native init",
                                            "npm start",
                                            "yarn create"
                                        ],
                                        "resposta_certa": "npx react-native init"
                                    },
                                    {
                                        "pergunta": "Qual ferramenta é usada para depurar um app React Native?",
                                        "alternativas": [
                                            "Expo",
                                            "React DevTools",
                                            "Xcode"
                                        ],
                                        "resposta_certa": "Expo"
                                    },
                                    {
                                        "pergunta": "Qual componente é usado para exibir texto em React Native?",
                                        "alternativas": [
                                            "<Text />",
                                            "<Label />",
                                            "<Paragraph />"
                                        ],
                                        "resposta_certa": "<Text />"
                                    }
                                ]
                            }
                        }
                    ]
                },
                {
                    "nome_curso": "Curso de AWS - Amazon Web Services",
                    "descricao": "Conheça os principais serviços da AWS como EC2, S3, Lambda para escalar suas aplicações na nuvem.",
                    "inscritos": [],
                    "img": "/assets/img/cursos/10.png",
                    "modulos": [
                        {
                            "nome": "Módulo 1: Introdução ao AWS",
                            "aulas": [
                                {
                                    "nome_aula": "O que é AWS?",
                                    "link_video": "https://www.youtube.com/watch?v=jkl123"
                                }
                            ],
                            "quiz": {
                                "perguntas": [
                                    {
                                        "pergunta": "O que significa AWS?",
                                        "alternativas": ["Amazon Web Services", "Amazon Web Solution", "Amazon Web Support"],
                                        "resposta_certa": "Amazon Web Services"
                                    },
                                    {
                                        "pergunta": "Quais serviços são populares na AWS?",
                                        "alternativas": ["EC2, S3, Lambda", "EC2, S3, Firebase", "EC2, RDS, S3"],
                                        "resposta_certa": "EC2, S3, Lambda"
                                    },
                                    {
                                        "pergunta": "O que é o Amazon EC2?",
                                        "alternativas": ["Serviço de armazenamento", "Serviço de computação em nuvem", "Serviço de banco de dados"],
                                        "resposta_certa": "Serviço de computação em nuvem"
                                    }
                                ]
                            }
                        },
                        {
                            "nome": "Módulo 2: Serviços da AWS para Desenvolvedores",
                            "aulas": [
                                {
                                    "nome_aula": "Como usar o S3 para armazenamento?",
                                    "link_video": "https://www.youtube.com/watch?v=jkl456"
                                }
                            ],
                            "quiz": {
                                "perguntas": [
                                    {
                                        "pergunta": "O que é o S3?",
                                        "alternativas": ["Serviço de armazenamento de objetos", "Serviço de computação", "Serviço de banco de dados"],
                                        "resposta_certa": "Serviço de armazenamento de objetos"
                                    },
                                    {
                                        "pergunta": "Como o Lambda funciona?",
                                        "alternativas": ["Executa código sem servidor", "Cria novos servidores", "Armazena dados"],
                                        "resposta_certa": "Executa código sem servidor"
                                    },
                                    {
                                        "pergunta": "Qual serviço da AWS é usado para monitorar recursos?",
                                        "alternativas": ["CloudWatch", "Lambda", "S3"],
                                        "resposta_certa": "CloudWatch"
                                    }
                                ]
                            }
                        }
                    ]
                },
                {
                    "nome_curso": "Curso de Inteligência Artificial",
                    "descricao": "Estude as bases da inteligência artificial, algoritmos e redes neurais.",
                    "inscritos": [],
                    "img": "/assets/img/cursos/11.png",
                    "modulos": [
                        {
                            "nome": "Módulo 1: Fundamentos de IA",
                            "aulas": [
                                {
                                    "nome_aula": "O que é Inteligência Artificial?",
                                    "link_video": "https://www.youtube.com/watch?v=mno123"
                                }
                            ],
                            "quiz": {
                                "perguntas": [
                                    {
                                        "pergunta": "O que é Inteligência Artificial?",
                                        "alternativas": ["Capacidade de máquinas simularem inteligência humana", "Capacidade de máquinas executar tarefas simples", "Capacidade de humanos simularem máquinas"],
                                        "resposta_certa": "Capacidade de máquinas simularem inteligência humana"
                                    },
                                    {
                                        "pergunta": "Qual é o objetivo do aprendizado supervisionado?",
                                        "alternativas": ["Classificar e prever a partir de dados rotulados", "Criar redes neurais", "Executar algoritmos sem dados"],
                                        "resposta_certa": "Classificar e prever a partir de dados rotulados"
                                    },
                                    {
                                        "pergunta": "O que é uma rede neural?",
                                        "alternativas": ["Algoritmo que tenta simular o cérebro humano", "Estrutura de dados", "Sistema de classificação de dados"],
                                        "resposta_certa": "Algoritmo que tenta simular o cérebro humano"
                                    }
                                ]
                            }
                        },
                        {
                            "nome": "Módulo 2: Implementando Algoritmos de IA",
                            "aulas": [
                                {
                                    "nome_aula": "Como implementar um algoritmo de IA?",
                                    "link_video": "https://www.youtube.com/watch?v=mno456"
                                }
                            ],
                            "quiz": {
                                "perguntas": [
                                    {
                                        "pergunta": "O que é uma rede neural convolucional?",
                                        "alternativas": ["Tipo de rede neural", "Tipo de banco de dados", "Estrutura de dados"],
                                        "resposta_certa": "Tipo de rede neural"
                                    },
                                    {
                                        "pergunta": "Quais são as bibliotecas populares em IA?",
                                        "alternativas": ["TensorFlow, Keras, PyTorch", "NumPy, Pandas", "Jupyter, Spyder"],
                                        "resposta_certa": "TensorFlow, Keras, PyTorch"
                                    },
                                    {
                                        "pergunta": "O que é aprendizado por reforço?",
                                        "alternativas": ["Método de aprendizado com base em recompensas e punições", "Método de aprendizado com grandes volumes de dados", "Método de aprendizado supervisionado"],
                                        "resposta_certa": "Método de aprendizado com base em recompensas e punições"
                                    }
                                ]
                            }
                        }
                    ]
                },
                {
                    "nome_curso": "Curso de Firebase para Desenvolvedores",
                    "descricao": "Aprenda a usar o Firebase para adicionar funcionalidades como autenticação, banco de dados e mais em suas aplicações.",
                    "inscritos": [],
                    "img": "/assets/img/cursos/12.png",
                    "modulos": [
                        {
                            "nome": "Módulo 1: Introdução ao Firebase",
                            "aulas": [
                                {
                                    "nome_aula": "O que é Firebase?",
                                    "link_video": "https://www.youtube.com/watch?v=pqr123"
                                }
                            ],
                            "quiz": {
                                "perguntas": [
                                    {
                                        "pergunta": "O que é o Firebase?",
                                        "alternativas": ["Plataforma para desenvolvimento de apps", "Serviço de banco de dados local", "Ferramenta de design de aplicativos"],
                                        "resposta_certa": "Plataforma para desenvolvimento de apps"
                                    },
                                    {
                                        "pergunta": "Qual serviço o Firebase oferece?",
                                        "alternativas": ["Autenticação, banco de dados, mensagens", "Gestão de servidores", "Serviços de monitoramento"],
                                        "resposta_certa": "Autenticação, banco de dados, mensagens"
                                    },
                                    {
                                        "pergunta": "O que é Firestore?",
                                        "alternativas": ["Banco de dados NoSQL", "Sistema de autenticação", "Sistema de armazenamentos de imagens"],
                                        "resposta_certa": "Banco de dados NoSQL"
                                    }
                                ]
                            }
                        },
                        {
                            "nome": "Módulo 2: Autenticação e Firestore no Firebase",
                            "aulas": [
                                {
                                    "nome_aula": "Como usar a autenticação no Firebase?",
                                    "link_video": "https://www.youtube.com/watch?v=pqr456"
                                }
                            ],
                            "quiz": {
                                "perguntas": [
                                    {
                                        "pergunta": "Como autenticar um usuário no Firebase?",
                                        "alternativas": ["Firebase.auth().signInWithEmailAndPassword()", "firebase.auth().signIn()", "firebase.auth().login()"],
                                        "resposta_certa": "Firebase.auth().signInWithEmailAndPassword()"
                                    },
                                    {
                                        "pergunta": "Como salvar dados no Firestore?",
                                        "alternativas": ["Firestore.collection().add()", "Firestore.save()", "Firestore.insert()"],
                                        "resposta_certa": "Firestore.collection().add()"
                                    },
                                    {
                                        "pergunta": "O que é o Realtime Database?",
                                        "alternativas": ["Banco de dados em tempo real do Firebase", "Banco de dados SQL", "Banco de dados de objetos"],
                                        "resposta_certa": "Banco de dados em tempo real do Firebase"
                                    }
                                ]
                            }
                        }
                    ]
                }
            ];

            // Adiciona os cursos no Firestore
            for (const curso of cursos) {
                await addDoc(collection(db, 'Cursos'), curso);
            }

            console.log('Cursos adicionados com sucesso!');
        } catch (e) {
            console.error("Erro ao adicionar cursos: ", e);
        }
    };

    return (
        <button type="button" className="btn btn-primary" onClick={addCursos}>
            Adicionar Cursos
        </button>
    );
}
