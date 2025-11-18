import { useState } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { 
  Menu, X, CheckSquare, TrendingUp, DollarSign, 
  Clock, Moon, Sun, Award, BarChart3, Settings, 
  LogOut, Info, Coins 
} from 'lucide-react'
import useStore from '../../store/useStore'

export default function BurgerMenu() {
  const [isOpen, setIsOpen] = useState(false)
  const { darkMode, toggleDarkMode, logout, userPoints, userLevel, user } = useStore()
  const navigate = useNavigate()
  const location = useLocation()

  const menuItems = [
    { icon: CheckSquare, label: 'Хийх ажлууд', path: '/todos', color: 'text-blue-600' },
    { icon: TrendingUp, label: 'Дадал зуршил', path: '/habits', color: 'text-green-600' },
    { icon: DollarSign, label: 'Зарлага', path: '/expenses', color: 'text-red-600' },
    { icon: Coins, label: 'Орлого', path: '/incomes', color: 'text-emerald-600' },
    { icon: Clock, label: 'Цагийн бүртгэл', path: '/timesheet', color: 'text-purple-600' },
    { icon: BarChart3, label: 'Статистик', path: '/statistics', color: 'text-orange-600' },
    { icon: Award, label: 'Шагнал', path: '/badges', color: 'text-yellow-600' },
    { icon: Settings, label: 'Тохиргоо', path: '/settings', color: 'text-gray-600' },
    { icon: Info, label: 'Тухай', path: '/about', color: 'text-indigo-600' },
  ]

  const handleLogout = () => {
    logout()
    navigate('/login')
    setIsOpen(false)
  }

  return (
    <>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed top-4 left-4 z-50 p-3 bg-blue-600 rounded-xl text-white shadow-lg hover:bg-blue-700 transition transform hover:scale-110"
      >
        {isOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      <div
        className={`fixed inset-0 bg-black bg-opacity-50 z-40 transition-opacity ${
          isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
        onClick={() => setIsOpen(false)}
      />

      <div
        className={`fixed top-0 left-0 h-full w-80 bg-white dark:bg-gray-800 z-50 transform transition-transform shadow-2xl ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="p-6 space-y-6 overflow-y-auto h-full">
          <div className="flex items-center justify-between pt-12">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
              Цэс
            </h2>
          </div>

          <div className="bg-gradient-to-r from-blue-500 to-purple-600 p-4 rounded-xl text-white">
            <p className="text-sm opacity-90">Сайн байна уу,</p>
            <p className="text-xl font-bold">{user?.name || 'Хэрэглэгч'}</p>
            <div className="mt-3 flex items-center justify-between">
              <div>
                <p className="text-xs opacity-90">Түвшин</p>
                <p className="text-2xl font-bold">{userLevel}</p>
              </div>
              <div>
                <p className="text-xs opacity-90">Оноо</p>
                <p className="text-2xl font-bold">{userPoints}</p>
              </div>
            </div>
          </div>

          <nav className="space-y-1">
            {menuItems.map((item) => {
              const isActive = location.pathname === item.path
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={() => setIsOpen(false)}
                  className={`flex items-center gap-3 p-3 rounded-lg transition ${
                    isActive 
                      ? 'bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400' 
                      : 'hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300'
                  }`}
                >
                  <item.icon size={20} className={isActive ? item.color : ''} />
                  <span className="font-medium">{item.label}</span>
                </Link>
              )
            })}
          </nav>

          <div className="border-t border-gray-200 dark:border-gray-700 pt-4 space-y-2">
            <button
              onClick={() => {
                toggleDarkMode()
              }}
              className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300 w-full transition"
            >
              {darkMode ? <Sun size={20} /> : <Moon size={20} />}
              <span className="font-medium">{darkMode ? 'Цайвар горим' : 'Харанхуй горим'}</span>
            </button>

            <button
              onClick={handleLogout}
              className="flex items-center gap-3 p-3 rounded-lg hover:bg-red-50 dark:hover:bg-red-900/20 text-red-600 dark:text-red-400 w-full transition"
            >
              <LogOut size={20} />
              <span className="font-medium">Гарах</span>
            </button>
          </div>
        </div>
      </div>
    </>
  )
}
