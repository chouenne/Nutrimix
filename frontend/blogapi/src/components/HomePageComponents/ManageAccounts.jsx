import React, { useState, useEffect } from 'react';
import axiosInstance from './axios';

function ManageAccounts() {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await axiosInstance.get('/users/users/');
                console.log(response.data,"aa")
                setUsers(response.data); // 更新用户状态
            } catch (error) {
                console.error('Failed to fetch user data:', error);
            }
        };

        fetchUsers();
    }, []);

    const deleteUser = async (userId) => {
        try {
            await axiosInstance.delete(`/users/users/${userId}/`);
            setUsers(users.filter(user => user.id !== userId));
        } catch (error) {
            console.error('Failed to delete user:', error);
        }
    };

    return (
        <div>
            <h2>User List</h2>
            <ul>
                {users.map(user => (
                    <li key={user.id}>
                        {user.user_name}
                        <button onClick={() => deleteUser(user.id)}>Delete</button>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default ManageAccounts;
