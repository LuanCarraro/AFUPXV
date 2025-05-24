import React, { useEffect, useState, useContext } from "react";
import { getFirestore, collection, getDocs, updateDoc, doc } from "firebase/firestore";
import { app } from "../services/firebaseConfig";
import { AuthEmailPasswordContext } from "../context/authEmailPassword";
import Sidebar from "./layout/Sidebar";


export const Social = () => {
  try {
    const [usuarios, setUsuarios] = useState([]);
    const [seguindo, setSeguindo] = useState([]);
    const { user } = useContext(AuthEmailPasswordContext);
    const db = getFirestore(app);

    useEffect(() => {
      const fetchData = async () => {
        const lista = [];
        const snapshot = await getDocs(collection(db, "users"));
        snapshot.forEach((u) => {
          if (u.id !== user.uid) lista.push({ uid: u.id, ...u.data() });
          if (u.id === user.uid) setSeguindo(u.data().seguindo || []);
        });
        setUsuarios(lista);
      };
      fetchData();
    }, [user, db]);

    const toggleSeguir = async (uidAlvo) => {
      const novo = seguindo.includes(uidAlvo)
        ? seguindo.filter((id) => id !== uidAlvo)
        : [...seguindo, uidAlvo];
      await updateDoc(doc(db, "users", user.uid), { seguindo: novo });
      setSeguindo(novo);
    };

    return (
      <div className="d-flex" style={{ height: "100vh", width: "100vw" }}>
        <Sidebar />
        <div className="home-panel flex-grow-1 m-2 rounded-4 overflow-auto p-4" style={{ backgroundColor: "#1F2225", color: "white" }}>
          <h2>Rede Social</h2>
          {usuarios.map((u) => (
            <div key={u.uid} style={{ backgroundColor: '#2C2F33', padding: '10px', borderRadius: '10px', marginBottom: '10px' }}>
              <strong>{u.firstName} {u.lastName}</strong><br />
              <button
                className={`btn mt-2 ${seguindo.includes(u.uid) ? 'btn-danger' : 'btn-success'}`}
                onClick={() => toggleSeguir(u.uid)}
              >
                {seguindo.includes(u.uid) ? "Deixar de seguir" : "Seguir"}
              </button>
            </div>
          ))}
        </div>
      </div>
    );
  } catch (error) {
    return (
      <div style={{ color: 'white', backgroundColor: '#1F2225', padding: '30px' }}>
        <Sidebar />
        <h2 style={{ color: 'red' }}>Erro ao carregar Social:</h2>
        <pre>{error.message}</pre>
      </div>
    );
  }
};
