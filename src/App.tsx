import React, { useState } from 'react'
import "./App.css"
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import HomePage from './pages/Home'
// import AddBook from './components/AddBook';
import MainPage from './pages/Register';
import AdminDashboard from './pages/AdminDashboard';
import RegistrationForm from './pages/RegisterPage';
// import Routes from './routes';
import ProtectedRoute from './routes/ProtectedRoute';
import AddBook from './components/AdminDashBoard/AddBook';
import AddAuthor from './components/AdminDashBoard/AddAuthor';
import RoutesComp from './routes';
function App() {
    // const [theme, colorMode] = useMode(); 
    return (
        <>
            <RoutesComp />

            {/* <Router>
                <Routes>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/register" element={<MainPage />} />
                    <Route path="/admin" element={<AdminDashboard/>} />
                </Routes>
            </Router > */}
        </>
    )
}

export default App




{/* <Router>
<Routes>
    <Route path="/" element={<HomePage />} />
    <Route path="/admin" element={<AdminDashboard />} />
    <Route path="/register" element={<MainPage />} />
</Routes>
</Router> */}
