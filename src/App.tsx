import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { lazy, Suspense } from 'react';
import LangLayout from './components/LangLayout';

// Route-based code splitting for performance
const Home = lazy(() => import('./pages/Home'));
const Services = lazy(() => import('./pages/Services'));
const Destinations = lazy(() => import('./pages/Destinations'));
const Contact = lazy(() => import('./pages/Contact'));
const Legal = lazy(() => import('./pages/Legal'));
const FreightMaritime = lazy(() => import('./pages/FreightMaritime'));
const NotFound = lazy(() => import('./pages/NotFound'));

function App() {
  return (
    <Router basename={import.meta.env.BASE_URL}>
      <Routes>
        {/* Default language redirect */}
        <Route path="/" element={<Navigate to="/fr" replace />} />
        {/* Legacy redirect for old slug without language */}
        <Route path="/fret-maritime" element={<Navigate to="/fr/services/fret-maritime" replace />} />
        {/* Language-scoped routes */}
        <Route path="/:lng" element={<LangLayout />}>
          <Route
            index
            element={
              <Suspense fallback={null}>
                <Home />
              </Suspense>
            }
          />
          {/* FR canonical slugs */}
          <Route
            path="services"
            element={
              <Suspense fallback={null}>
                <Services />
              </Suspense>
            }
          />
          <Route
            path="destinations"
            element={
              <Suspense fallback={null}>
                <Destinations />
              </Suspense>
            }
          />
          <Route
            path="contact"
            element={
              <Suspense fallback={null}>
                <Contact />
              </Suspense>
            }
          />
          <Route
            path="mentions-legales"
            element={
              <Suspense fallback={null}>
                <Legal />
              </Suspense>
            }
          />
          <Route
            path="services/fret-maritime"
            element={
              <Suspense fallback={null}>
                <FreightMaritime />
              </Suspense>
            }
          />
          {/* Backward-compat legal slug */}
          <Route
            path="legal"
            element={
              <Suspense fallback={null}>
                <Legal />
              </Suspense>
            }
          />
          {/* EN localized slugs (aliases) */}
          <Route
            path="legal-notice"
            element={
              <Suspense fallback={null}>
                <Legal />
              </Suspense>
            }
          />
          <Route
            path="services/maritime-freight"
            element={
              <Suspense fallback={null}>
                <FreightMaritime />
              </Suspense>
            }
          />
          {/* PT localized slugs (aliases) */}
          <Route
            path="servicos"
            element={
              <Suspense fallback={null}>
                <Services />
              </Suspense>
            }
          />
          <Route
            path="destinos"
            element={
              <Suspense fallback={null}>
                <Destinations />
              </Suspense>
            }
          />
          <Route
            path="contacto"
            element={
              <Suspense fallback={null}>
                <Contact />
              </Suspense>
            }
          />
          <Route
            path="aviso-legal"
            element={
              <Suspense fallback={null}>
                <Legal />
              </Suspense>
            }
          />
          <Route
            path="servicos/frete-maritimo"
            element={
              <Suspense fallback={null}>
                <FreightMaritime />
              </Suspense>
            }
          />
          {/* ES localized slugs (aliases) */}
          <Route
            path="servicios"
            element={
              <Suspense fallback={null}>
                <Services />
              </Suspense>
            }
          />
          <Route
            path="contacto"
            element={
              <Suspense fallback={null}>
                <Contact />
              </Suspense>
            }
          />
          <Route
            path="aviso-legal"
            element={
              <Suspense fallback={null}>
                <Legal />
              </Suspense>
            }
          />
          <Route
            path="servicios/transporte-maritimo"
            element={
              <Suspense fallback={null}>
                <FreightMaritime />
              </Suspense>
            }
          />
          {/* TR localized slugs (aliases, ASCII) */}
          <Route
            path="hizmetler"
            element={
              <Suspense fallback={null}>
                <Services />
              </Suspense>
            }
          />
          <Route
            path="iletisim"
            element={
              <Suspense fallback={null}>
                <Contact />
              </Suspense>
            }
          />
          <Route
            path="yasal-uyari"
            element={
              <Suspense fallback={null}>
                <Legal />
              </Suspense>
            }
          />
          <Route
            path="hizmetler/deniz-tasimaciligi"
            element={
              <Suspense fallback={null}>
                <FreightMaritime />
              </Suspense>
            }
          />
          {/* IT localized slugs (aliases) */}
          <Route
            path="servizi"
            element={
              <Suspense fallback={null}>
                <Services />
              </Suspense>
            }
          />
          <Route
            path="destinazioni"
            element={
              <Suspense fallback={null}>
                <Destinations />
              </Suspense>
            }
          />
          <Route
            path="contatti"
            element={
              <Suspense fallback={null}>
                <Contact />
              </Suspense>
            }
          />
          <Route
            path="note-legali"
            element={
              <Suspense fallback={null}>
                <Legal />
              </Suspense>
            }
          />
          <Route
            path="servizi/trasporto-marittimo"
            element={
              <Suspense fallback={null}>
                <FreightMaritime />
              </Suspense>
            }
          />
          {/* DE localized slugs (aliases) */}
          <Route
            path="leistungen"
            element={
              <Suspense fallback={null}>
                <Services />
              </Suspense>
            }
          />
          <Route
            path="ziele"
            element={
              <Suspense fallback={null}>
                <Destinations />
              </Suspense>
            }
          />
          <Route
            path="kontakt"
            element={
              <Suspense fallback={null}>
                <Contact />
              </Suspense>
            }
          />
          <Route
            path="impressum"
            element={
              <Suspense fallback={null}>
                <Legal />
              </Suspense>
            }
          />
          <Route
            path="leistungen/seefracht"
            element={
              <Suspense fallback={null}>
                <FreightMaritime />
              </Suspense>
            }
          />
          {/* SW localized slugs (aliases) */}
          <Route
            path="huduma"
            element={
              <Suspense fallback={null}>
                <Services />
              </Suspense>
            }
          />
          <Route
            path="vituo"
            element={
              <Suspense fallback={null}>
                <Destinations />
              </Suspense>
            }
          />
          <Route
            path="mawasiliano"
            element={
              <Suspense fallback={null}>
                <Contact />
              </Suspense>
            }
          />
          <Route
            path="huduma/usafirishaji-wa-baharini"
            element={
              <Suspense fallback={null}>
                <FreightMaritime />
              </Suspense>
            }
          />
          {/* AR localized slugs (aliases) */}
          <Route
            path="خدمات"
            element={
              <Suspense fallback={null}>
                <Services />
              </Suspense>
            }
          />
          <Route
            path="وجهات"
            element={
              <Suspense fallback={null}>
                <Destinations />
              </Suspense>
            }
          />
          <Route
            path="اتصال"
            element={
              <Suspense fallback={null}>
                <Contact />
              </Suspense>
            }
          />
          <Route
            path="إشعار-قانوني"
            element={
              <Suspense fallback={null}>
                <Legal />
              </Suspense>
            }
          />
          <Route
            path="خدمات/الشحن-البحري"
            element={
              <Suspense fallback={null}>
                <FreightMaritime />
              </Suspense>
            }
          />
          {/* Redirect legacy path under language */}
          <Route path="fret-maritime" element={<Navigate to="services/fret-maritime" replace />} />
          {/* 404 for unknown routes within language */}
          <Route
            path="*"
            element={
              <Suspense fallback={null}>
                <NotFound />
              </Suspense>
            }
          />
        </Route>
        {/* Catch-all: show 404 for unknown root-level paths */}
        <Route
          path="*"
          element={
            <Suspense fallback={null}>
              <NotFound />
            </Suspense>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;