import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Search, User, MapPin, Home, Compass } from 'lucide-react';
import L from 'leaflet';
import busIconPng from '../assets/numbus.png';

const busIcon = new L.Icon({
  iconUrl: busIconPng,
  iconSize: [48, 48],
  iconAnchor: [19, 38],
});

export default function BusMapDemo() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [buses, setBuses] = useState([
    { id: 1, position: [42.4907, 78.3936], route: 'A1' },
    { id: 2, position: [42.493, 78.406], route: 'B2' },
    { id: 3, position: [42.485, 78.39], route: 'C3' },
  ]);

  // Простейшая анимация движения автобусов
  useEffect(() => {
    const interval = setInterval(() => {
      setBuses((prev) =>
        prev.map((bus) => ({
          ...bus,
          position: [
            bus.position[0] + (Math.random() - 0.5) * 0.0003,
            bus.position[1] + (Math.random() - 0.5) * 0.0003,
          ],
        }))
      );
    }, 1500);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-[#120024] via-[#1b0033] to-[#3a006f] text-white relative">

      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-40 flex items-center justify-between px-6 py-4 bg-white/5 backdrop-blur-xl shadow-md border-b border-violet-500/30">
        <div className="flex items-center gap-3">
          <button
            onClick={() => setSidebarOpen(true)}
            className="w-11 h-11 rounded-xl bg-white/10 backdrop-blur-md shadow-lg flex items-center justify-center hover:scale-110 hover:bg-violet-600/40 transition"
          >
            <Menu size={20} />
          </button>
          <div className="text-lg font-semibold text-violet-300 tracking-wide">BusMap</div>
        </div>

        <div className="flex items-center gap-3">
          <button className="w-11 h-11 rounded-xl bg-white/10 hover:bg-violet-600/40 backdrop-blur-md shadow flex items-center justify-center hover:scale-110 transition">
            <Search size={18} />
          </button>
          <button className="w-11 h-11 rounded-xl bg-white/10 hover:bg-violet-600/40 backdrop-blur-md shadow flex items-center justify-center hover:scale-110 transition">
            <User size={18} />
          </button>
        </div>
      </header>

      {/* Sidebar */}
      <AnimatePresence>
        {sidebarOpen && (
          <motion.aside
            initial={{ x: -320, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: -320, opacity: 0 }}
            transition={{ type: 'spring', stiffness: 260, damping: 25 }}
            className="fixed inset-y-0 left-0 z-50 w-80 p-6"
          >
            <div className="h-full rounded-2xl bg-[#1a0030]/70 border border-violet-400/30 backdrop-blur-lg shadow-2xl p-4 flex flex-col gap-4">
              <div className="flex items-center justify-between">
                <h3 className="text-xl font-semibold text-violet-200">Меню</h3>
                <button
                  onClick={() => setSidebarOpen(false)}
                  className="p-2 rounded-md hover:bg-violet-600/30"
                >
                  <X />
                </button>
              </div>

              <nav className="flex flex-col gap-2 mt-2 text-violet-300">
                <a className="p-3 rounded-lg hover:bg-violet-700/40 transition flex items-center gap-3">
                  <Home size={18} />Главная
                </a>
                <a className="p-3 rounded-lg hover:bg-violet-700/40 transition flex items-center gap-3">
                  <Search size={18} />Поиск
                </a>
                <a className="p-3 rounded-lg hover:bg-violet-700/40 transition flex items-center gap-3">
                  <Compass size={18} />Рядом
                </a>
                <a className="p-3 rounded-lg hover:bg-violet-700/40 transition flex items-center gap-3">
                  <User size={18} />Профиль
                </a>
              </nav>

              <div className="mt-auto text-sm text-violet-400">BusMap Каракол — демо версия</div>
            </div>
          </motion.aside>
        )}
      </AnimatePresence>

      {/* Map */}
      <main className="flex-grow mt-[72px] relative z-10 mt-[150px]">
        <div className="w-full h-[70vh] rounded-3xl overflow-hidden shadow-[0_0_30px_rgba(168,85,247,0.4)] max-w-6xl mx-auto border border-violet-500/30">
          <MapContainer center={[42.4907, 78.3936]} zoom={14} scrollWheelZoom={true} className="w-full h-full">
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors'
              url="https://cartodb-basemaps-a.global.ssl.fastly.net/light_all/{z}/{x}/{y}.png"
            />
            {buses.map((bus) => (
              <Marker key={bus.id} position={bus.position} icon={busIcon}>
                <Popup>
                  <div className="text-violet-600 font-medium">Маршрут {bus.route}</div>
                  <div className="text-sm text-slate-600">Движется по городу</div>
                </Popup>
              </Marker>
            ))}
          </MapContainer>
        </div>
      </main>

      {/* Bottom Panel */}
      <footer className="sticky bottom-0 z-30 w-full bg-[#1b002e]/60 backdrop-blur-md border-t border-violet-400/30 shadow-inner">
        <div className="max-w-6xl mx-auto flex justify-around items-center py-3">
          {[
            { icon: <Home size={22} />, label: 'Главная' },
            { icon: <Search size={22} />, label: 'Поиск' },
            { icon: <Compass size={22} />, label: 'Рядом' },
            { icon: <User size={22} />, label: 'Профиль' },
          ].map((btn, i) => (
            <button
              key={i}
              className="flex flex-col items-center text-violet-300 hover:text-violet-100 transition"
            >
              {btn.icon}
              <span className="text-xs mt-1">{btn.label}</span>
            </button>
          ))}
        </div>
      </footer>
    </div>
  );
}
