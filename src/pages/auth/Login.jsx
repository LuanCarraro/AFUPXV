import React, { useContext, useEffect } from 'react';
import { AuthEmailPasswordContext } from '../../context/authEmailPassword';
import { Navigate } from 'react-router-dom';
import '../../App.css';

export default function Login() {
    const { email, setEmail, password, setPassword, firstName, setFirstName, lastName, setLastName,
        SignInEmailPassword, SignUpEmailPassword, Signed } = useContext(AuthEmailPasswordContext);

    useEffect(() => {
        const container = document.getElementById('container');
        const registerBtn = document.getElementById('register');
        const loginBtn = document.getElementById('login');

        const handleRegisterClick = () => {
            if (container) container.classList.add("active");
        };

        const handleLoginClick = () => {
            if (container) container.classList.remove("active");
        };

        if (registerBtn) registerBtn.addEventListener('click', handleRegisterClick);
        if (loginBtn) loginBtn.addEventListener('click', handleLoginClick);

        return () => {
            if (registerBtn) registerBtn.removeEventListener('click', handleRegisterClick);
            if (loginBtn) loginBtn.removeEventListener('click', handleLoginClick);
        };
    }, []);

    // Se o usuário estiver logado, redireciona automaticamente para "/"
    if (Signed) {
        return <Navigate to="/" />;
    }

    return (
        <div className='d-flex align-items-center' style={{ height: '100vh' }}>
            <div className="container" id="container">
                <div className="form-container sign-up">
                    <form onSubmit={SignUpEmailPassword}>
                        <h1 style={{ color: '#512da8' }}>Criar Conta</h1>
                        <div className="social-icons">
                            <a href="#" className="icon"><i className="bi bi-google" style={{ color: '#512da8' }}></i></a>
                            <a href="#" className="icon"><i className="bi bi-facebook" style={{ color: '#512da8' }}></i></a>
                            <a href="#" className="icon"><i className="bi bi-github" style={{ color: '#512da8' }}></i></a>
                            <a href="#" className="icon"><i className="bi bi-linkedin" style={{ color: '#512da8' }}></i></a>
                        </div>
                        <span>ou use seu email para registrar</span>
                        <input
                            type="text"
                            placeholder="Nome"
                            value={firstName}
                            onChange={(e) => setFirstName(e.target.value)}
                            required
                        />
                        <input
                            type="text"
                            placeholder="Sobrenome"
                            value={lastName}
                            onChange={(e) => setLastName(e.target.value)}
                            required
                        />
                        <input
                            type="email"
                            placeholder="Email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                        <input
                            type="password"
                            placeholder="Senha"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                        <button type="submit">Registrar</button>
                    </form>
                </div>
                <div className="form-container sign-in">
                    <form onSubmit={SignInEmailPassword}>
                        <h1 style={{ color: '#512da8' }}>Entrar</h1>
                        <div className="social-icons">
                            <a href="#" className="icon"><i className="bi bi-google" style={{ color: '#512da8' }}></i></a>
                            <a href="#" className="icon"><i className="bi bi-facebook" style={{ color: '#512da8' }}></i></a>
                            <a href="#" className="icon"><i className="bi bi-github" style={{ color: '#512da8' }}></i></a>
                            <a href="#" className="icon"><i className="bi bi-linkedin" style={{ color: '#512da8' }}></i></a>
                        </div>
                        <span>ou use seu email e senha</span>
                        <input
                            type="email"
                            placeholder="Email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                        <input
                            type="password"
                            placeholder="Senha"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                        <a href="#">Esqueceu sua senha?</a>
                        <button type="submit">Entrar</button>
                    </form>
                </div>
                <div className="toggle-container">
                    <div className="toggle">
                        <div className="toggle-panel toggle-left">
                            <h1>Bem-vindo de volta!</h1>
                            <p>Entre com seus dados pessoais para usar todas as funcionalidades do site</p>
                            <button className="hidden" id="login">Entrar</button>
                        </div>
                        <div className="toggle-panel toggle-right">
                            <h1>Olá, Amigo!</h1>
                            <p>Registre-se com seus dados pessoais para usar todas as funcionalidades do site</p>
                            <button className="hidden" id="register">Cadastrar</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
