import { useState, createContext, useEffect } from 'react';
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut } from "firebase/auth";
import { app } from '../services/firebaseConfig';
import { getFirestore, doc, setDoc } from 'firebase/firestore';

export const AuthEmailPasswordContext = createContext({});

export const AuthEmailPasswordProvider = ({ children }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [user, setUser] = useState(null);
    const auth = getAuth(app);

    useEffect(() => {
        const loadStoreAuth = () => {
            const sessionUser = sessionStorage.getItem("@AuthFirebase:user");
            if (sessionUser) {
                setUser(JSON.parse(sessionUser));  // Parse do usuário armazenado
            }
        };
        loadStoreAuth();
    }, []);

    // Função de login
    async function SignInEmailPassword(event) {
        event.preventDefault();
        try {
            const userCredential = await signInWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;
            setUser(user);
            sessionStorage.setItem("@AuthFirebase:user", JSON.stringify(user)); // Armazena no sessionStorage
        } catch (error) {
            console.error("Erro ao fazer login:", error.code, error.message);
        }
    };

    // Função de registro
    async function SignUpEmailPassword(event) {
        event.preventDefault();
        try {
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;

            // Adiciona o nome, sobrenome e email ao Firestore
            const db = getFirestore(app);
            await setDoc(doc(db, 'users', user.uid), {
                firstName,
                lastName,
                email: user.email,
                uid: user.uid,
            });

            // Armazena o usuário no sessionStorage
            setUser(user);
            sessionStorage.setItem("@AuthFirebase:user", JSON.stringify(user));

            // Após o cadastro, faz login automaticamente
            SignInEmailPassword(event);  // Chama a função de login após o cadastro

        } catch (error) {
            console.error("Erro ao criar conta:", error.code, error.message);
        }
    }

    // Função de logout
    function handleSignOut() {
        signOut(auth)
            .then(() => {
                setUser(null);
                sessionStorage.removeItem("@AuthFirebase:user");
            })
            .catch((error) => {
                console.error("Erro ao deslogar:", error);
            });
    }

    return (
        <AuthEmailPasswordContext.Provider value={{
            email, setEmail, password, setPassword,
            firstName, setFirstName, lastName, setLastName,
            SignInEmailPassword, SignUpEmailPassword, Signed: !!user,
            user, handleSignOut
        }}>
            {children}
        </AuthEmailPasswordContext.Provider>
    );
};
