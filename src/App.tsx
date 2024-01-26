import './App.css';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import HomePage from './pages/Home';
import MainPage from './pages/Register';
import AdminDashboard from './pages/AdminDashboard';
import Login from './pages/Login';
import { useAuth } from './provider/authProvider';
import UserDashboard from './pages/UserDashboard';
import IssuerDashboard from './pages/IssuerDashboard';
import BookDetail from './pages/Book';
import { useEffect } from 'react';
import { getProfile } from './apis/userApi';
import RecommendationHome from './pages/RecommendationHome';
import BookRecommendation from './pages/Recommendation';

function App() {
    const { role, setProfile } = useAuth();
    useEffect(() => {
        getProfile().then(res => {
            console.log(res.data);

            setProfile(JSON.stringify(res.data))
        }
        ).catch(err => console.log(err))
    }, [])
    return (
        <>
            <Router>
                <Routes>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/register" element={<MainPage />} />
                    <Route path="/login" element={<Login />} />

                    <Route path="/dashboard" element={
                        role == "admin" ? <AdminDashboard />
                            : role == "issuer" ? <IssuerDashboard />
                                : role == "student" || role == "faculty" ? <UserDashboard />

                                    : <Navigate to="/login" />
                    } />
                    <Route path='/book/:id' element={<BookDetail />} />
                    <Route path="/book/recommendations" element={<RecommendationHome/>} />
                    <Route path="/book/recommendations/:name" element={<BookRecommendation/>} />
                </Routes>
            </Router>
            {/* <RoutesComp/> */}
        </>
    );
}

export default App;
