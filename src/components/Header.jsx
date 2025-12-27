import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import logo from '../assets/logo.jpg';
import './Header.css';

const Header = () => {
    const { user, logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/');
    };

    const getDashboardLink = () => {
        return user.role === 'admin' ? '/admin' : '/client';
    };

    return (
        <header className="header">
            <div className="container header-container">
                <div className="logo">
                    <Link to="/">
                        <img src={logo} alt="Bona Rent a Car" />
                    </Link>
                </div>
                <nav className="nav">
                    <ul>
                        <li><Link to="/" className='list-nav-link'>Início</Link></li>
                        <li><Link to="/fleet" className='list-nav-link'>Frota</Link></li>
                        <li><Link to="/about" className='list-nav-link'>Sobre</Link></li>
                        <li><Link to="/contact" className='list-nav-link'>Contato</Link></li>

                        {user ? (
                            <>
                                <li><Link to={getDashboardLink()} className="dashboard-link">Painel</Link></li>
                                <li><button onClick={handleLogout} className="btn btn-outline-light">Sair</button></li>
                            </>
                        ) : (
                            <li><Link to="/login" className="btn btn-primary">Login</Link></li>
                        )}
                    </ul>
                </nav>
            </div>
        </header>
    );
};

export default Header;
