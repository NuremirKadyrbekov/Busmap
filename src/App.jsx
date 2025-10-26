import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import './App.css'
import BusMapDemo from './components/Main'
import Welcome from './components/Welcome'
import WelcomeContent from './components/WelcomePage'

function App() {
  return (
    <Router>
      <Routes>
        {/* Приветственная страница */}
        <Route path="/" element={<WelcomeContent/>} />

        {/* Главная карта */}
        <Route path="/map" element={<BusMapDemo />} />
      </Routes>
    </Router>
  )
}

export default App
