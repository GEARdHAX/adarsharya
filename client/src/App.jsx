import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Components
import Navbar from './components/Navbar.jsx';
import Hero from './components/Hero.jsx';
import Projects from './components/Projects.jsx';
import Contact from './components/Contact.jsx';
import Footer from './components/Footer.jsx';
import Chatbot from './components/Chatbot.jsx';
import AdminPanel from './components/AdminPanel.jsx';
import AdminLogin from './components/AdminLogin.jsx';
import ProtectedRoute from './components/ProtectedRoute.jsx';

// Styles
import './styles/style.css';
import './styles/projects.css';
import './styles/contact.css';
import './styles/about.css';
import './styles/chatbot.css';

// 1. Create a layout for the public website so Navbar/Footer stay consistent
const PublicLayout = () => (
  <div className="App">
    <Navbar />
    <Hero />
    <Projects />
    <Contact />
    <Footer />
    <Chatbot />
  </div>
);

function App() {
  return (
    <Router>
      <Routes>
        {/* Public Website Route */}
        <Route path="/" element={<PublicLayout />} />

        {/* Login Route */}
        <Route path="/login" element={<AdminLogin />} />

        {/* Protected Admin Route */}
        <Route
          path="/admin"
          element={
            <ProtectedRoute>
              {/* You can add a Back to Home button inside AdminPanel if you want */}
              <AdminPanel />
            </ProtectedRoute>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;