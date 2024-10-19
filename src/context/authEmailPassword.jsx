import { useState, createContext, useEffect } from 'react';
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut } from "firebase/auth";
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

    async function SignUpEmailPassword(event) {
        event.preventDefault();
        createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                const user = userCredential.user;
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                console.error(`Erro [${errorCode}]: ${errorMessage}`);
            });
    }

    function handleSignOut() {
        signOut(auth)
            .then(() => {
                setUser(null); // Remove o usuário do estado
                sessionStorage.removeItem("@AuthFirebase:user"); // Remove da sessionStorage
            })
            .catch((error) => {
                console.error("Erro ao deslogar:", error);
            });
    }
    return (
        <AuthEmailPasswordContext.Provider value={{
            email, setEmail, password, setPassword,
            SignInEmailPassword, SignUpEmailPassword, Signed: !!user, user, handleSignOut
        }}>
            {children}
        </AuthEmailPasswordContext.Provider>
    );
};
