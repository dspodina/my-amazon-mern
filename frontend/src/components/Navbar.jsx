import { useState, useEffect } from 'react';
import axios from 'axios';
import { NavLink } from 'react-router-dom';

import './Navbar.css';

import Loading from '../components/Loading';

const Navbar = () => {
    const [isLogedIn, setIsLogedIn] = useState(false);
    const [isAdmin, setIsAdmin] = useState(false);
    const [item, setItem] = useState(0);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const id = sessionStorage.getItem('id');

        const getUserItems = async () => {};
        const checkAdmin = async () => {};

        if (id) {
            setIsLogedIn(true);
            getUserItems();
            checkAdmin();
        }
    }, []);
    return <nav className='navbar'>
        <ul>
            <NavLink to="/">
            <li>Products</li>
            </NavLink>
            {isAdmin && (
                <li>
                    <NavLink to="/add-product">Add product</NavLink>
                </li>
            )}
            {!isLogedIn && (
                <li>
                    <NavLink to="/login">Login</NavLink>
                </li>
            )}
              {!isLogedIn && (
                <li>
                    <NavLink to="/register">Register</NavLink>
                </li>
            )}
        </ul>
    </nav>;
};

export default Navbar; 
