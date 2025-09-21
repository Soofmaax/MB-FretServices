import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Services from './pages/Services';
import Destinations from './pages/Destinations';
import Contact from './pages/Contact';
import Legal from './pages/Legal';
import ScrollToTop from './components/ScrollToTop';
import NotFound from './pages/NotFound';
import SiteSEO from './components/SiteSEO';
import FreightMaritime from './pages/FreightMaritime';

function App() {
  return (
    <Router>
      <SiteSEO />
      <ScrollToTop />
      <div className="min-h-screen bg-white">
        <a href="#main" className="sr-only focus:not-sr-only focus:absolute focus:top-2 focus:left-2 focus:z-50 focus:bg-white focus:text-primary-900 focus:outline-none focus:ring-2 focus:ring-accent-500 px-4 py-2 rounded">
          Passer au contenu principal
        </a>
        <Navbar />
        <main id="main" tabIndex={-1}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/services" element={<Services />} />
            <Route path="/destinations" element={<Destinations />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/legal" element={<Legal />} />
            <Route path="/services/fret-maritime" element={<FreightMaritime />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;