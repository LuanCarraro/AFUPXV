import { useState, createContext, useEffect } from 'react';
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { app } from '../services/firebaseConfig';

export const AuthEmailPasswordContext = createContext({});

export const AuthEmailPasswordProvider = ({ children }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [user, setUser] = useState(null);
    const auth = getAuth(app);

    useEffect(() => {
        const loadStoreAuth = () => {
            const sessionUser = sessionStorage.getItem("@AuthFirebase:user");
            if (sessionUser) {
                setUser(sessionUser);
            }
        };
        loadStoreAuth();
    }, []);

    async function SignInEmailPassword(event) {
        event.preventDefault();
        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                const user = userCredential.user;
                setUser(user);
                sessionStorage.setItem("@AuthFirebase:user", JSON.stringify(user));
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                console.error("Erro ao fazer login:", errorCode, errorMessage);
            });
    };

    return (
        <AuthEmailPasswordContext.Provider value={{ email, setEmail, password, setPassword, SignInEmailPassword, Signed: !!user }}>
            {children}
        </AuthEmailPasswordContext.Provider>
    );
};
