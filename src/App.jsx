import { lazy, Suspense } from 'react'
import { HashRouter, Navigate, Route, Routes } from 'react-router'

const CafeFilosofico = lazy(() => import('./pages/CafeFilosofico'))
const CafeCapitalismoEvent = lazy(() => import('./pages/CafeCapitalismoEvent'))
const CafeMeritocraciaEvent = lazy(() => import('./pages/CafeMeritocraciaEvent'))
const CafeMercadotecniaEvent = lazy(() => import('./pages/CafeMercadotecniaEvent'))
const CafeMercadotecniaDefinitions = lazy(() => import('./pages/CafeMercadotecniaDefinitions'))
const CafeMercadotecniaSystem2D = lazy(() => import('./pages/CafeMercadotecniaSystem2D'))
const CafeAguaEvent = lazy(() => import('./pages/CafeAguaEvent'))
const CafeAguaSystem2D = lazy(() => import('./pages/CafeAguaSystem2D'))
const CafeRedesSocialesEvent = lazy(() => import('./pages/CafeRedesSocialesEvent'))
const CafeRedesSocialesSystem2D = lazy(() => import('./pages/CafeRedesSocialesSystem2D'))
const CafeInteligenciaArtificialEvent = lazy(() => import('./pages/CafeInteligenciaArtificialEvent'))

function RouteFallback() {
  return (
    <div className="app-route-loading" role="status" aria-live="polite">
      <span>Cargando archivo…</span>
    </div>
  )
}

export default function App() {
  return (
    <HashRouter>
      <Suspense fallback={<RouteFallback />}>
        <Routes>
          <Route path="/" element={<Navigate to="/cafe-filosofico" replace />} />
          <Route path="/cafe-filosofico" element={<CafeFilosofico />} />
          <Route path="/cafe-filosofico/2026/09/07/fin-del-mundo-fin-del-capitalismo" element={<CafeCapitalismoEvent />} />
          <Route path="/cafe-filosofico/2026/09/22/meritocracia" element={<CafeMeritocraciaEvent />} />
          <Route path="/cafe-filosofico/2026/10/05/mercadotecnia" element={<CafeMercadotecniaEvent />} />
          <Route path="/cafe-filosofico/2026/10/05/mercadotecnia/definiciones" element={<CafeMercadotecniaDefinitions />} />
          <Route path="/cafe-filosofico/2026/10/05/mercadotecnia/sistema-2d" element={<CafeMercadotecniaSystem2D />} />
          <Route path="/cafe-filosofico/2026/10/19/agua" element={<CafeAguaEvent />} />
          <Route path="/cafe-filosofico/2026/10/19/agua/sistema-2d" element={<CafeAguaSystem2D />} />
          <Route path="/cafe-filosofico/2026/11/03/redes-sociales" element={<CafeRedesSocialesEvent />} />
          <Route path="/cafe-filosofico/2026/11/03/redes-sociales/sistema-2d" element={<CafeRedesSocialesSystem2D />} />
          <Route path="/cafe-filosofico/2026/11/17/inteligencia-artificial" element={<CafeInteligenciaArtificialEvent />} />
          <Route path="*" element={<Navigate to="/cafe-filosofico" replace />} />
        </Routes>
      </Suspense>
    </HashRouter>
  )
}
