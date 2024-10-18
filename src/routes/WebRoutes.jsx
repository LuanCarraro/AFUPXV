import { BrowserRouter, Routes, Route, Outlet, Navigate } from "react-router-dom";
import React, { useContext } from 'react';
import { AuthEmailPasswordContext } from '../context/authEmailPassword';
import Login from "../pages/auth/Login";
import Register from "../pages/auth/Register";
import Home from "../pages/Home";


export default function WebRoutes() {

    const PrivateRoutes = () => {
        const { Signed } = useContext(AuthEmailPasswordContext);
        return Signed ? <Outlet /> : <Navigate to={"/login"} />;
    }

    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<PrivateRoutes />}>
                    <Route path="/" element={<Home />} />
                </Route>
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
            </Routes>
        </BrowserRouter>
    )

}
