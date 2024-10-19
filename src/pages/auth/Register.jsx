import { useContext } from 'react';
import { AuthEmailPasswordContext } from '../../context/authEmailPassword';
import { Navigate } from 'react-router-dom';

export default function Login() {

    const { user, setEmail, email, setPassword, password, SignUpEmailPassword } = useContext(AuthEmailPasswordContext);

    if (user) {
        return <Navigate to={"/home"} />
    }

    return (
        <div className="container mt-5">
            <div className="card bg-dark text-white p-4">
                <h2 className="text-center">Login</h2>
                <form onSubmit={SignUpEmailPassword}>
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
                    <button type="submit" className="btn btn-primary mt-4 w-100">Registrar</button>
                </form>
            </div>
        </div>
    )
}
