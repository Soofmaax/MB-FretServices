import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Home from './pages/Home';
import Services from './pages/Services';
import Destinations from './pages/Destinations';
import Contact from './pages/Contact';
import Legal from './pages/Legal';
import FreightMaritime from './pages/FreightMaritime';
import NotFound from './pages/NotFound';
import LangLayout from './components/LangLayout';

function App() {
  return (
    <Router>
      <Routes>
        {/* Default language redirect */}
        <Route path="/" element={<Navigate to="/fr" replace />} />
        {/* Legacy redirect for old slug without language */}
        <Route path="/fret-maritime" element={<Navigate to="/fr/services/fret-maritime" replace />} />
        {/* Language-scoped routes */}
        <Route path="/:lng" element={<LangLayout />}>
          <Route index element={<Home />} />
          {/* FR/EN canonical slugs */}
          <Route path="services" element={<Services />} />
          <Route path="destinations" element={<Destinations />} />
          <Route path="contact" element={<Contact />} />
          <Route path="legal" element={<Legal />} />
          <Route path="services/fret-maritime" element={<FreightMaritime />} />
          {/* EN localized slugs (aliases) */}
          <Route path="legal-notice" element={<Legal />} />
          <Route path="services/maritime-freight" element={<FreightMaritime />} />
          {/* PT localized slugs (aliases) */}
          <Route path="servicos" element={<Services />} />
          <Route path="destinos" element={<Destinations />} />
          <Route path="contacto" element={<Contact />} />
          <Route path="servicos/frete-maritimo" element={<FreightMaritime />} />
          {/* Redirect legacy path under language */}
          <Route path="fret-maritime" element={<Navigate to="services/fret-maritime" replace />} />
          {/* 404 for unknown routes within language */}
          <Route path="*" element={<NotFound />} />
        </Route>
        {/* Catch-all: redirect to default language */}
        <Route path="*" element={<Navigate to="/fr" replace />} />
      </Routes>
    </Router>
  );
}

export default App;