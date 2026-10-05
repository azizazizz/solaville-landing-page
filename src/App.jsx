import { BrowserRouter, Route, Routes } from "react-router-dom"
import MainLayout from "./layouts/MainLayout"
import HomePage from "./pages/HomePage"
import TentangPage from "./pages/TentangPage"
import UnitPage from "./pages/UnitPage"
import GaleriPage from "./pages/GaleriPage"
import KontakPage from "./pages/KontakPage"
import SimulasiPage from "./pages/SimulasiPage"
import SprPage from "./pages/SprPage"
import SyaratKetentuanPage from "./pages/SyaratKetentuanPage"
import KebijakanPrivasiPage from "./pages/KebijakanPrivasiPage"
import NotFoundPage from "./pages/NotFoundPage"

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<MainLayout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/tentang" element={<TentangPage />} />
          <Route path="/unit" element={<UnitPage />} />
          <Route path="/galeri" element={<GaleriPage />} />
          <Route path="/kontak" element={<KontakPage />} />
          <Route path="/simulasi" element={<SimulasiPage />} />
          <Route path="/spr" element={<SprPage />} />
          <Route path="/syarat-dan-ketentuan" element={<SyaratKetentuanPage />} />
          <Route path="/kebijakan-privasi" element={<KebijakanPrivasiPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}
