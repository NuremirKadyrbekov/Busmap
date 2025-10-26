
import { useNavigate } from 'react-router-dom'
import Orb from './Welcome'

export default function WelcomeContent() {
  const navigate = useNavigate()

  return (
    <div className="relative flex flex-col items-center justify-center min-h-screen overflow-hidden bg-[#0a0118] text-white">
      {/* Анимированный фон */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <Orb hue={240} hoverIntensity={0.3} rotateOnHover={true} />
      </div>

      {/* Навбар */}
      <header className="absolute top-5 left-1/2 -translate-x-1/2 flex justify-between items-center bg-white/5 backdrop-blur-lg rounded-full px-8 py-3 w-[90%] max-w-3xl border border-white/10 shadow-lg">
        <div className="flex items-center gap-2 font-semibold text-lg">
          BusMap
        </div>
        <nav className="flex gap-6 text-sm opacity-80">
          <button className="hover:text-purple-400 transition">Башкы</button>
          <button className="hover:text-purple-400 transition">Биз жөнүндө</button>
          <button className="hover:text-purple-400 transition">Колдоо</button>
        </nav>
      </header>

      {/* Контент */}
      <main className="z-10 text-center px-6">
        <div className="mb-3">
          <span className="text-sm font-medium bg-white/10 border border-white/10 rounded-full px-4 py-1 backdrop-blur-md">
            🚀 Кош келиңиз!
          </span>
        </div>

        <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
          Маршруттарды телефон<br />
          <span className="text-purple-400"> аркылуу көзөмөлдөө.</span>
        </h1>

        <p className="text-lg opacity-80 mb-8">
          Каракол шаарынын маршрутарын реалдуу убакта <br /> кайсыл жерде жүргөнүн көрө аласың
        </p>

        <div className="flex justify-center gap-4">
          <button
            onClick={() => navigate('/map')}
            className="px-8 py-3 rounded-full bg-white text-black font-semibold hover:bg-purple-200 transition"
          >
            Кеттик
          </button>
          <button className="px-8 py-3 rounded-full bg-white/10 border border-white/10 hover:bg-white/20 backdrop-blur-md transition">
            Толугураак
          </button>
        </div>
      </main>

      {/* Тумблер / демо */}
      
    </div>
  )
}
