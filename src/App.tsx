import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { lazy, Suspense } from 'react';
import LangLayout from './components/LangLayout';

// Route-based code splitting for performance
const Home = lazy(() => import('./pages/Home'));
const Services = lazy(() => import('./pages/Services'));
const Destinations = lazy(() => import('./pages/Destinations'));
const Contact = lazy(() => import('./pages/Contact'));
const Legal = lazy(() => import('./pages/Legal'));
const Privacy = lazy(() => import('./pages/Privacy'));
const FreightMaritime = lazy(() => import('./pages/FreightMaritime'));
const Customs = lazy(() => import('./pages/Customs'));
const Insurance = lazy(() => import('./pages/Insurance'));
const FreightRoute = lazy(() => import('./pages/FreightRoute'));
const PillarIncoterms = lazy(() => import('./pages/PillarIncoterms'));
const PillarFCLvsLCL = lazy(() => import('./pages/PillarFCLvsLCL'));
const PillarContainerPricing = lazy(() => import('./pages/PillarContainerPricing'));
const FreightRouteSubpage = lazy(() => import('./pages/FreightRouteSubpage'));
const NotFound = lazy(() => import('./pages/NotFound'));

function App() {
  return (
    <Router basename={import.meta.env.BASE_URL}>
      <Routes>
        {/* Redirige la racine vers la version FR */}
        <Route path="/" element={<Navigate to="/fr" replace />} />

        {/* Ancien slug sans langue */}
        <Route path="/fret-maritime" element={<Navigate to="/fr/services/fret-maritime" replace />} />

        {/* Espace FR uniquement */}
        <Route path="/fr" element={<LangLayout />}>
          <Route
            index
            element={
              <Suspense fallback={null}>
                <Home />
              </Suspense>
            }
          />

          {/* Slugs canoniques FR */}
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
            path="politique-confidentialite"
            element={
              <Suspense fallback={null}>
                <Privacy />
              </Suspense>
            }
          />

          {/* Services FR */}
          <Route
            path="services/fret-maritime"
            element={
              <Suspense fallback={null}>
                <FreightMaritime />
              </Suspense>
            }
          />
          <Route
            path="services/dedouanement"
            element={
              <Suspense fallback={null}>
                <Customs />
              </Suspense>
            }
          />
          <Route
            path="services/assurance-cargo"
            element={
              <Suspense fallback={null}>
                <Insurance />
              </Suspense>
            }
          />

          {/* Routes FR spécifiques (Congo / RDC / Angola) */}
          <Route
            path="services/fret-maritime/france-congo"
            element={
              <Suspense fallback={null}>
                <FreightRoute />
              </Suspense>
            }
          />
          <Route
            path="services/fret-maritime/france-rdc"
            element={
              <Suspense fallback={null}>
                <FreightRoute />
              </Suspense>
            }
          />
          <Route
            path="services/fret-maritime/france-angola"
            element={
              <Suspense fallback={null}>
                <FreightRoute />
              </Suspense>
            }
          />

          {/* Sous-pages FR (guides FCL/LCL, douane, checklist) */}
          <Route
            path="services/fret-maritime/france-congo/fcl-lcl"
            element={
              <Suspense fallback={null}>
                <FreightRouteSubpage />
              </Suspense>
            }
          />
          <Route
            path="services/fret-maritime/france-congo/douane"
            element={
              <Suspense fallback={null}>
                <FreightRouteSubpage />
              </Suspense>
            }
          />
          <Route
            path="services/fret-maritime/france-congo/checklist"
            element={
              <Suspense fallback={null}>
                <FreightRouteSubpage />
              </Suspense>
            }
          />
          <Route
            path="services/fret-maritime/france-rdc/fcl-lcl"
            element={
              <Suspense fallback={null}>
                <FreightRouteSubpage />
              </Suspense>
            }
          />
          <Route
            path="services/fret-maritime/france-rdc/douane"
            element={
              <Suspense fallback={null}>
                <FreightRouteSubpage />
              </Suspense>
            }
          />
          <Route
            path="services/fret-maritime/france-rdc/checklist"
            element={
              <Suspense fallback={null}>
                <FreightRouteSubpage />
              </Suspense>
            }
          />

          {/* Pages piliers FR */}
          <Route
            path="documentation/incoterms-2020"
            element={
              <Suspense fallback={null}>
                <PillarIncoterms />
              </Suspense>
            }
          />
          <Route
            path="guides/fcl-vs-lcl"
            element={
              <Suspense fallback={null}>
                <PillarFCLvsLCL />
              </Suspense>
            }
          />
          <Route
            path="guides/prix-conteneur-congo-angola"
            element={
              <Suspense fallback={null}>
                <PillarContainerPricing />
              </Suspense>
            }
          />

          {/* Slugs legacy FR pour compatibilité */}
          <Route
            path="legal"
            element={
              <Suspense fallback={null}>
                <Legal />
              </Suspense>
            }
          />
          <Route
            path="privacy"
            element={
              <Suspense fallback={null}>
                <Privacy />
              </Suspense>
            }
          />
          <Route
            path="fret-maritime"
            element={<Navigate to="services/fret-maritime" replace />}
          />

          {/* 404 interne FR */}
          <Route
            path="*"
            element={
              <Suspense fallback={null}>
                <NotFound />
              </Suspense>
            }
          />
        </Route>

        {/* Catch-all: 404 pour tout le reste */}
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