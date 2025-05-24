import React, { useState, useEffect, useContext } from "react";
import { getFirestore, collection, getDocs, doc, getDoc } from "firebase/firestore";
import { app } from "../services/firebaseConfig";
import { AuthEmailPasswordContext } from "../context/authEmailPassword";
import Sidebar from "./layout/sidebar";

export const Ranking = () => {
  try {
    const [ranking, setRanking] = useState([]);
    const { user } = useContext(AuthEmailPasswordContext);
    const db = getFirestore(app);

    useEffect(() => {
      const fetchRanking = async () => {
        const docRef = doc(db, "users", user.uid);
        const docSnap = await getDoc(docRef);
        const seguindo = docSnap.exists() ? docSnap.data().seguindo || [] : [];

        const snapshot = await getDocs(collection(db, "users"));
        const lista = [];

        snapshot.forEach((u) => {
          if (seguindo.includes(u.id) || u.id === user.uid) {
            const d = u.data();
            const nomeBase = `${d.firstName || ''} ${d.lastName || ''}`;
            const nomeFinal = u.id === user.uid ? `${nomeBase} (você)` : nomeBase;

            lista.push({
              nome: nomeFinal,
              certificados: d.certificadosEmitidos || 0,
            });
          }
        });

        lista.sort((a, b) => b.certificados - a.certificados);
        setRanking(lista);
      };

      fetchRanking();
    }, [user, db]);

    return (
      <div className="d-flex" style={{ height: "100vh", width: "100vw" }}>
        <Sidebar />
        <div className="home-panel flex-grow-1 m-2 rounded-4 overflow-auto p-4" style={{ backgroundColor: "#1F2225", color: "white" }}>
          <h2>Ranking - Você e quem você segue</h2>
          {ranking.map((u, i) => (
            <div key={i} style={{ background: "#2C2F33", padding: "15px", marginBottom: "10px", borderRadius: "10px" }}>
              <strong>{i + 1}º {u.nome}</strong><br />
              Certificados: {u.certificados}
            </div>
          ))}
        </div>
      </div>
    );
  } catch (error) {
    return (
      <div style={{ color: 'white', backgroundColor: '#1F2225', padding: '30px' }}>
        <Sidebar />
        <h2 style={{ color: 'red' }}>Erro ao carregar Ranking:</h2>
        <pre>{error.message}</pre>
      </div>
    );
  }
};
