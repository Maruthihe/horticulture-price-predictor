import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            isLoggedIn ? <Navigate to="/home" /> : <Login onLogin={() => setIsLoggedIn(true)} />
          }
        />
        <Route
          path="/home"
          element={
            isLoggedIn ? <Home /> : <Navigate to="/" />
          }
        />
      </Routes>
    </Router>
  );
}

function Login({ onLogin }) {
  const handleLogin = (e) => {
    e.preventDefault();
    // Normally you’d validate the login here
    onLogin(); // Set isLoggedIn to true
  };

  return (
    <div className="h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-6 rounded-xl shadow-md w-full max-w-sm">
        <h2 className="text-2xl font-bold mb-4 text-center">Login</h2>
        <form onSubmit={handleLogin} className="space-y-4">
          <input type="text" placeholder="Username" className="w-full px-4 py-2 border rounded" />
          <input type="password" placeholder="Password" className="w-full px-4 py-2 border rounded" />
          <button type="submit" className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600">
            Login
          </button>
        </form>
      </div>
    </div>
  );
}

function Home() {
  return (
    <div className="h-screen flex items-center justify-center bg-gradient-to-r from-blue-500 to-purple-600">
      <h1 className="text-4xl font-bold text-white">Welcome to Home Page</h1>
    </div>
  );
}

export default App;
