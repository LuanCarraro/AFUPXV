import React, { useContext, useState } from 'react';
import { AuthEmailPasswordContext } from '../../context/authEmailPassword';
import { Navigate } from 'react-router-dom';

export default function Login() {
    const { email, setEmail, password, setPassword, SignInEmailPassword, Signed } = useContext(AuthEmailPasswordContext);
    const [error, setError] = useState(null); // Para capturar erros de login

    const handleSubmit = (event) => {
        event.preventDefault();
        SignInEmailPassword()
            .then(() => {
            })
            .catch((err) => {
                setError("Erro ao fazer login. Verifique suas credenciais.");
            });
    };

    if (Signed) {
        return <Navigate to="/" />;
    }

    return (
        <div className="container mt-5">
            <div className="card bg-dark text-white p-4">
                <h2 className="text-center">Login</h2>
                {error && <div className="alert alert-danger">{error}</div>} { }
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="email">Email:</label>
                        <input
                            type="email"
                            className="form-control bg-secondary text-white"
                            id="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>
                    <div className="form-group mt-3">
                        <label htmlFor="password">Senha:</label>
                        <input
                            type="password"
                            className="form-control bg-secondary text-white"
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>
                    <button type="submit" className="btn btn-primary mt-4 w-100">Entrar</button>
                </form>
            </div>
        </div>
    );
}
