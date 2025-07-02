import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Menu from './pages/Menu';
import Gallery from './pages/Gallery';
import Facilities from './pages/Facilities';
import Contact from './pages/Contact';
import Blog from './pages/Blog';
import BlogPost from './pages/BlogPost';
import Rooms from './pages/Rooms';
import Reviews from './pages/Reviews';
import AdminLogin from './pages/admin/AdminLogin';
import AdminDashboard from './pages/admin/AdminDashboard';
import WhatsAppFloat from './components/WhatsAppFloat';
import CampBuddyButton from './components/CampBuddyButton';
import SocialMediaIcons from './components/SocialMediaIcons';
import Footer from './components/Footer';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-amber-50">
        <Navbar />
        <AnimatePresence mode="wait">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/menu" element={<Menu />} />
            <Route path="/gallery" element={<Gallery />} />
            <Route path="/facilities" element={<Facilities />} />
            <Route path="/rooms" element={<Rooms />} />
            <Route path="/reviews" element={<Reviews />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/blog/:id" element={<BlogPost />} />
            <Route path="/admin/login" element={<AdminLogin />} />
            <Route path="/admin/dashboard" element={<AdminDashboard />} />
          </Routes>
        </AnimatePresence>
        <WhatsAppFloat />
        <CampBuddyButton />
        <SocialMediaIcons />
        <Footer />
      </div>
    </Router>
  );
}

export default App;