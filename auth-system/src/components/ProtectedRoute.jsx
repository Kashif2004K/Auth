import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
    const token = localStorage.getItem('token');

    // If there is no token, redirect to login
    if (!token) {
        return <Navigate to="/login" replace />;
    }

    // If there is a token, show the children (the Dashboard)
    return children;
};

export default ProtectedRoute;