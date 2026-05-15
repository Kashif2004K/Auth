import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Dashboard from "./pages/Dashboard"
import Login from "./pages/Login"
import ProtectedRoute from "./components/ProtectedRoute"

const App = () => {
  return (
    <Router>
      <Routes>
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
  )
}

export default App
