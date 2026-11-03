import { HashRouter, Navigate, Route, Routes } from 'react-router'
import CafeFilosofico from './pages/CafeFilosofico'
import CafeCapitalismoEvent from './pages/CafeCapitalismoEvent'
import CafeMeritocraciaEvent from './pages/CafeMeritocraciaEvent'
import CafeMercadotecniaEvent from './pages/CafeMercadotecniaEvent'
import CafeMercadotecniaDefinitions from './pages/CafeMercadotecniaDefinitions'
import CafeMercadotecniaSystem2D from './pages/CafeMercadotecniaSystem2D'
import CafeAguaEvent from './pages/CafeAguaEvent'
import CafeAguaSystem2D from './pages/CafeAguaSystem2D'
import CafeRedesSocialesEvent from './pages/CafeRedesSocialesEvent'

export default function App() {
  return (
    <HashRouter>
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
        <Route path="*" element={<Navigate to="/cafe-filosofico" replace />} />
      </Routes>
    </HashRouter>
  )
}
