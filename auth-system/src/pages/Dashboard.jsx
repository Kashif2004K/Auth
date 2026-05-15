const Dashboard = () => {
    const handleLogout = () => {
        localStorage.removeItem('token'); // Destroy the ID card
        window.location.reload(); // Refresh to trigger the redirect
    };

    return (
        <div>
            <h1>Welcome to the Secret Dashboard!</h1>
            <p>If you can see this, your JWT is working.</p>
            <button onClick={handleLogout}>Logout</button>
        </div>
    );
};

export default Dashboard;