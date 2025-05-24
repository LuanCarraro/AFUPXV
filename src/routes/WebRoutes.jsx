import { BrowserRouter, Routes, Route, Outlet, Navigate } from "react-router-dom";
import React, { useContext } from 'react';
import { AuthEmailPasswordContext } from '../context/authEmailPassword';

import Login from "../pages/auth/Login";
import Home from "../pages/Home";
import { MySubjects } from "../components/MySubjects";
import { Course } from "../components/Course";
import { Quiz } from "../components/Quiz";
import Certificados from "../components/Certificados";
import CertificadoView from "../components/CertificadoView";
import { Ranking } from "../components/Ranking";
import { Social } from "../components/Social";

export default function WebRoutes() {
  const PrivateRoutes = () => {
    const { Signed } = useContext(AuthEmailPasswordContext);
    return Signed ? <Outlet /> : <Navigate to="/login" />;
  };

  return (
    <BrowserRouter>
      <Routes>
        {/* Rotas privadas (só acessa se logado) */}
        <Route path="/" element={<PrivateRoutes />}>
          <Route path="/" element={<Home />} />
          <Route path="/mysubjects" element={<MySubjects />} />
          <Route path="/mysubjects/course/:id" element={<Course />} />
          <Route path="/mysubjects/course/:id/quiz/:moduloIndex/:aulaIndex" element={<Quiz />} />
          <Route path="/certificados" element={<Certificados />} />
          <Route path="/certificado/:cursoId" element={<CertificadoView />} />
          <Route path="/ranking" element={<Ranking />} />
          <Route path="/social" element={<Social />} />
        </Route>

        {/* Rota pública */}
        <Route path="/login" element={<Login />} />
      </Routes>
    </BrowserRouter>
  );
}
