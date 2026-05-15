import { useEffect, useState } from 'react';
import axios from 'axios';

const Dashboard = () => {
    const [message, setMessage] = useState('Loading secret data...');
    const [user, setUser] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const token = localStorage.getItem('token');
                // We send the token in the 'Authorization' header
                const response = await axios.get('http://localhost:5000/api/data', {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                setMessage(response.data.message);
                setUser(response.data.user);
            } catch (error) {
                setMessage("Failed to fetch secret data. Token might be invalid.");
                console.error(error);
            }
        };

        fetchData();
    }, []);

    const handleLogout = () => {
        localStorage.removeItem('token');
        window.location.href = '/login'; // Force a redirect
    };

    return (
        <div style={{ padding: '20px' }}>
            <h1>Dashboard</h1>
            <div style={{ border: '1px solid green', padding: '10px' }}>
                <h3>Server Response:</h3>
                <p>{message}</p>
                {user && <p>Logged in as: <strong>{user.email}</strong></p>}
            </div>
            <br />
            <button onClick={handleLogout}>Logout</button>
        </div>
    );
};

export default Dashboard;