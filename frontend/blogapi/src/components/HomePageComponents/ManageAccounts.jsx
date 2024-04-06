import React, { useState, useEffect } from 'react';
import axiosInstance from './axios';

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

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await axiosInstance.get('/users/users/');
                setUsers(response.data);
            } catch (error) {
                console.error('Failed to fetch user data:', error);
            }
        };

        fetchUsers();
    }, [setUsers]);

    return (
        <div>
            <h2>User List</h2>
            <ul>
                {users.map(user => (
                    <li key={user.email}>
                        {user.user_name} ({user.email})
                        <button onClick={() => deleteUserByEmail(user.email, setUsers)}>Delete</button>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default ManageAccounts;



