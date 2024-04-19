import React, { useState, useEffect } from 'react';
import axiosInstance from './axios';
import { useNavigate } from 'react-router-dom';
import Footer from './Footer';
import Logo from './Logo';
import UserControl from './UserControl';

const deleteUserByEmail = async (email, setUsers) => {

    try {
        const response = await axiosInstance.get(`/users/users/${email}/`);
        const userId = response.data.id;

        const token = localStorage.getItem('access_token');
        await axiosInstance.delete(`/users/users/${userId}/`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });

        setUsers(users => users.filter(user => user.email !== email));
    } catch (error) {
        console.error('Failed to delete user:', error);
    }
};


function ManageAccounts() {
    const [users, setUsers] = useState([]);
    const [userCount, setUserCount] = useState(0);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await axiosInstance.get('/users/users/');
                setUsers(response.data);
                setUserCount(response.data.length);
            } catch (error) {
                console.error('Failed to fetch user data:', error);
            }
        };

        fetchUsers();
    }, [setUsers]);

    const handleBack = () => {
        navigate("/");
    };

    return (
        <div className="detail-container">
            <header className="header-flex" >
                <Logo />
                <UserControl />
            </header>
            <div style={{ borderBottom: '0.5px solid #CCCCCC', marginTop: '3%', marginBottom: '3%' }}></div>
            <h2>User List</h2>
            <ul>
                {users.map(user => (
                    <li key={user.email}>
                        {user.user_name} ({user.email})
                        <button onClick={() => deleteUserByEmail(user.email, setUsers)}>Delete</button>
                    </li>
                ))}
            </ul>

            <h2>Stastic</h2>

            <p>Total Users: {userCount}</p>

            <Footer></Footer>
        </div>
    );
}

export default ManageAccounts;



