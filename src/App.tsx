import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import HomePage from './pages/Home';
import MainPage from './pages/Register';
import AdminDashboard from './pages/AdminDashboard';
import ProtectedRoute from './routes/ProtectedRoute';
import Login from './pages/Login';
import { useAuth } from './provider/authProvider';
import { getProfile } from './apis/userApi';
import IssueBookPage from './pages/IssuePage';
import RoutesComp from './routes';

function App() {
    const [userRole, setUserRole] = useState<string>('user');
    const { token,role } = useAuth();

    useEffect(() => {
        if (token) {
            getProfile()
                .then((res) => {
                    console.log(res.data.role);

                    const role = res.data.role;
                    setUserRole(role);
                })
                .catch((err) => {
                    console.log(err);
                });
        }
    }, [token]);

    return (
        <>
            {/* <Router>
                <Routes>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/register" element={<MainPage />} />
                    <Route path="/login" element={<Login />} />
              
                    <Route path="/dashboard" element={
                        role == "admin" && <AdminDashboard/>
                    } />
                </Routes>
            </Router> */}
        <RoutesComp/>
        </>
    );
}

export default App;
