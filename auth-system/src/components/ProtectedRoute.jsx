import { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const ProtectedRoute = ({ children }) => {
    const { user, loading } = useContext(AuthContext);

    // If the Context is still checking localStorage, show nothing or a spinner
    // This prevents the "flicker" of the login page
    if (loading) return <div>Checking authentication...</div>;

    if (!user) {
        return <Navigate to="/login" replace />;
    }

    return children;
};