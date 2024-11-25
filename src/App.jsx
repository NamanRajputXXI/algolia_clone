import React, { useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";

function App() {
  const [user, setUser] = useState(localStorage.getItem("username") || null); // Persist user from localStorage

  return (
    <Router>
      <Routes>
        {/* Home/Dashboard Route */}
        <Route
          path="/"
          element={
            user ? <Dashboard username={user} /> : <Navigate to="/login" />
          }
        />
        {/* Login Route */}
        <Route path="/login" element={<Login setUser={setUser} />} />
        {/* Catch-all Route */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
}

export default App;
