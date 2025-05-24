import { getFirestore, doc, updateDoc, increment } from "firebase/firestore";
import { app } from "../services/firebaseConfig";

export const incrementarCertificadosEmitidos = async (uid) => {
  try {
    const db = getFirestore(app);
    const userRef = doc(db, "users", uid);
    await updateDoc(userRef, {
      certificadosEmitidos: increment(1)
    });
    console.log("Certificado registrado no Firestore");
  } catch (error) {
    console.error("Erro ao atualizar certificadosEmitidos:", error);
  }
};
