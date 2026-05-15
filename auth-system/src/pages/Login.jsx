import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate(); // 2. Initialize it

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
        const response = await axios.post('http://localhost:5000/login', {
            email,
            password
        });
        
        const token = response.data.token;
        console.log("Received Token:", token);
        
        // Step 2: Store it!
        localStorage.setItem('token', token);
        navigate('/dashboard');        
    } catch (error) {
        console.error("Login Failed", error.response.data);
        alert("Invalid Credentials");
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