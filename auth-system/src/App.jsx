import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Dashboard from "./pages/Dashboard"
import Login from "./pages/Login"
import ProtectedRoute from "./components/ProtectedRoute"
import Signup from './pages/Signup'; // Import it
import { AuthProvider } from "./context/AuthContext";

const App = () => {
  return (
    <AuthProvider>
      <Router>
        <Routes>
        <Route path="/signup" element={<Signup />} />
      <Route path="/login" element={<Login />} />
                
                  {/* This is the Locked Door */}
                  <Route 
                      path="/dashboard" 
                      element={
                          <ProtectedRoute>
                              <Dashboard />
                          </ProtectedRoute>
                      } 
                  />

                  {/* Default route */}
                  <Route path="*" element={<Login />} />
        </Routes>
    </Router>
    </AuthProvider>
  )
}

export default App
