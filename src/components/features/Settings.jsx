import { Settings as SettingsIcon, User, Bell, Shield, Trash2 } from 'lucide-react'
import useStore from '../../store/useStore'

export default function Settings() {
  const { user, darkMode, toggleDarkMode } = useStore()

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pt-20 px-4 pb-8">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white flex items-center gap-3">
            <SettingsIcon className="text-gray-600" />
            Тохиргоо
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-2">
            Өөрийн тохиргоогоо өөрчлөх
          </p>
        </div>

        <div className="space-y-6">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
            <div className="flex items-center gap-3 mb-4">
              <User className="text-blue-600" size={24} />
              <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                Хэрэглэгчийн мэдээлэл
              </h2>
            </div>
            <div className="space-y-3">
              <div>
                <label className="block text-sm text-gray-600 dark:text-gray-400 mb-1">
                  Нэр
                </label>
                <input
                  type="text"
                  value={user?.name || ''}
                  disabled
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                />
              </div>
              <div>
                <label className="block text-sm text-gray-600 dark:text-gray-400 mb-1">
                  И-мэйл
                </label>
                <input
                  type="email"
                  value={user?.email || ''}
                  disabled
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                />
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
            <div className="flex items-center gap-3 mb-4">
              <Bell className="text-purple-600" size={24} />
              <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                Мэдэгдэл
              </h2>
            </div>
            <div className="space-y-3">
              <label className="flex items-center justify-between cursor-pointer">
                <span className="text-gray-700 dark:text-gray-300">Өдөр тутмын сануулга</span>
                <input type="checkbox" className="w-5 h-5 rounded text-blue-600" />
              </label>
              <label className="flex items-center justify-between cursor-pointer">
                <span className="text-gray-700 dark:text-gray-300">Дадал сануулга</span>
                <input type="checkbox" className="w-5 h-5 rounded text-blue-600" />
              </label>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
            <div className="flex items-center gap-3 mb-4">
              <Shield className="text-green-600" size={24} />
              <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                Нууцлал
              </h2>
            </div>
            <button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg transition">
              Нууц үг солих
            </button>
          </div>

          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md border-2 border-red-200 dark:border-red-900">
            <div className="flex items-center gap-3 mb-4">
              <Trash2 className="text-red-600" size={24} />
              <h2 className="text-xl font-bold text-red-600">
                Аюултай бүс
              </h2>
            </div>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              Бүх өгөгдлөө устгах (Энэ үйлдлийг буцаах боломжгүй)
            </p>
            <button className="w-full bg-red-600 hover:bg-red-700 text-white py-3 rounded-lg transition">
              Бүх өгөгдөл устгах
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
