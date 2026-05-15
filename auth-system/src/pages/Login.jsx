import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
const { login } = useContext(AuthContext);

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate(); // 2. Initialize it

const handleLogin = async (e) => {
    e.preventDefault();
    try {
        const response = await axios.post('http://localhost:5000/login', { email, password });
        
        // Use the context function! It saves to localStorage AND updates the UI
        login(response.data.token); 
        
        navigate('/dashboard');
    } catch (error) {
        alert("Invalid credentials");
    }
};

  return (
    <div style={{ padding: '20px' }}>
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <input 
          type="email" 
          placeholder="Email" 
          value={email}
          onChange={(e) => setEmail(e.target.value)} 
        />
        <br />
        <input 
          type="password" 
          placeholder="Password" 
          value={password}
          onChange={(e) => setPassword(e.target.value)} 
        />
        <br />
        <button type="submit">Log In</button>
      </form>
    </div>
  );
};

export default Login;