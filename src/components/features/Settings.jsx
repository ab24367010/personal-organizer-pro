import { Settings as SettingsIcon, User, Bell, Shield, Trash2, Download, Upload, Moon, Sun } from 'lucide-react'
import useStore from '../../store/useStore'
import { useState } from 'react'

export default function Settings() {
  const { user, darkMode, toggleDarkMode, clearAllData, exportData, importData } = useStore()
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false)
  const [notifications, setNotifications] = useState({
    daily: true,
    habits: true,
    financial: false
  })

  const handleExport = () => {
    const data = exportData()
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `organizer-backup-${new Date().toISOString().split('T')[0]}.json`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }

  const handleImport = (event) => {
    const file = event.target.files[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (e) => {
        try {
          const data = JSON.parse(e.target.result)
          importData(data)
          alert('Амжилттай импортлогдлоо!')
        } catch (error) {
          alert('Алдаа гарлаа. Файлыг шалгана уу.')
        }
      }
      reader.readAsText(file)
    }
  }

  const handleClearData = () => {
    if (showDeleteConfirm) {
      clearAllData()
      setShowDeleteConfirm(false)
      alert('Бүх өгөгдөл устгагдлаа')
    } else {
      setShowDeleteConfirm(true)
      setTimeout(() => setShowDeleteConfirm(false), 5000)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 pt-20 px-4 pb-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-5xl font-bold text-gray-900 dark:text-white mb-2 bg-gradient-to-r from-gray-600 to-gray-800 bg-clip-text text-transparent flex items-center gap-3">
            <SettingsIcon className="text-gray-600" size={48} />
            Тохиргоо
          </h1>
          <p className="text-gray-600 dark:text-gray-400 text-lg">
            Өөрийн тохиргоогоо өөрчлөх
          </p>
        </div>

        <div className="space-y-6">
          {/* Profile section */}
          <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-lg border border-gray-100 dark:border-gray-700">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-3 bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl shadow-lg">
                <User className="w-6 h-6 text-white" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                Хэрэглэгчийн мэдээлэл
              </h2>
            </div>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-600 dark:text-gray-400 mb-2">
                  Нэр
                </label>
                <input
                  type="text"
                  value={user?.name || ''}
                  disabled
                  className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 dark:border-gray-600 dark:bg-gray-700 dark:text-white bg-gray-50 cursor-not-allowed"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-600 dark:text-gray-400 mb-2">
                  И-мэйл
                </label>
                <input
                  type="email"
                  value={user?.email || ''}
                  disabled
                  className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 dark:border-gray-600 dark:bg-gray-700 dark:text-white bg-gray-50 cursor-not-allowed"
                />
              </div>
            </div>
          </div>

          {/* Appearance */}
          <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-lg border border-gray-100 dark:border-gray-700">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-3 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-xl shadow-lg">
                {darkMode ? <Moon className="w-6 h-6 text-white" /> : <Sun className="w-6 h-6 text-white" />}
              </div>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                Харагдац
              </h2>
            </div>
            <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700/50 rounded-xl">
              <div>
                <p className="font-medium text-gray-900 dark:text-white">Харанхуй горим</p>
                <p className="text-sm text-gray-600 dark:text-gray-400">Нүдэнд ээлтэй харанхуй загвар</p>
              </div>
              <button
                onClick={toggleDarkMode}
                className={`relative w-14 h-7 rounded-full transition-colors ${darkMode ? 'bg-blue-600' : 'bg-gray-300'
                  }`}
              >
                <div className={`absolute w-5 h-5 bg-white rounded-full top-1 transition-transform ${darkMode ? 'right-1' : 'left-1'
                  }`} />
              </button>
            </div>
          </div>

          {/* Notifications */}
          <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-lg border border-gray-100 dark:border-gray-700">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-3 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl shadow-lg">
                <Bell className="w-6 h-6 text-white" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                Мэдэгдэл
              </h2>
            </div>
            <div className="space-y-3">
              <label className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700/50 rounded-xl cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700 transition">
                <div>
                  <p className="font-medium text-gray-900 dark:text-white">Өдөр тутмын сануулга</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Өглөө 9:00 цагт</p>
                </div>
                <input
                  type="checkbox"
                  checked={notifications.daily}
                  onChange={(e) => setNotifications({ ...notifications, daily: e.target.checked })}
                  className="w-5 h-5 rounded text-blue-600"
                />
              </label>
              <label className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700/50 rounded-xl cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700 transition">
                <div>
                  <p className="font-medium text-gray-900 dark:text-white">Дадал сануулга</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Дадлаа хийх цаг болсон үед</p>
                </div>
                <input
                  type="checkbox"
                  checked={notifications.habits}
                  onChange={(e) => setNotifications({ ...notifications, habits: e.target.checked })}
                  className="w-5 h-5 rounded text-blue-600"
                />
              </label>
              <label className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700/50 rounded-xl cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700 transition">
                <div>
                  <p className="font-medium text-gray-900 dark:text-white">Санхүүгийн мэдэгдэл</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Зарлага их болсон үед</p>
                </div>
                <input
                  type="checkbox"
                  checked={notifications.financial}
                  onChange={(e) => setNotifications({ ...notifications, financial: e.target.checked })}
                  className="w-5 h-5 rounded text-blue-600"
                />
              </label>
            </div>
          </div>

          {/* Data management */}
          <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-lg border border-gray-100 dark:border-gray-700">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-3 bg-gradient-to-r from-green-500 to-emerald-500 rounded-xl shadow-lg">
                <Shield className="w-6 h-6 text-white" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                Өгөгдлийн удирдлага
              </h2>
            </div>
            <div className="space-y-3">
              <button
                onClick={handleExport}
                className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white py-3 rounded-xl transition transform hover:scale-105 shadow-lg font-medium flex items-center justify-center gap-2"
              >
                <Download size={20} />
                Өгөгдөл экспортлох
              </button>
              <label className="block">
                <input
                  type="file"
                  accept=".json"
                  onChange={handleImport}
                  className="hidden"
                />
                <div className="w-full bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white py-3 rounded-xl transition transform hover:scale-105 shadow-lg font-medium flex items-center justify-center gap-2 cursor-pointer">
                  <Upload size={20} />
                  Өгөгдөл импортлох
                </div>
              </label>
            </div>
          </div>

          {/* Danger zone */}
          <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-lg border-2 border-red-200 dark:border-red-900">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-3 bg-gradient-to-r from-red-500 to-pink-500 rounded-xl shadow-lg">
                <Trash2 className="w-6 h-6 text-white" />
              </div>
              <h2 className="text-2xl font-bold text-red-600">
                Аюултай бүс
              </h2>
            </div>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              Бүх өгөгдлөө устгах (Энэ үйлдлийг буцаах боломжгүй)
            </p>
            {showDeleteConfirm && (
              <div className="mb-4 p-3 bg-red-100 dark:bg-red-900/20 rounded-lg text-red-700 dark:text-red-300 text-sm">
                ⚠️ Та итгэлтэй байна уу? Дахин дарж баталгаажуулна уу!
              </div>
            )}
            <button
              onClick={handleClearData}
              className={`w-full py-3 rounded-xl transition transform hover:scale-105 shadow-lg font-medium ${showDeleteConfirm
                  ? 'bg-gradient-to-r from-red-600 to-pink-600 hover:from-red-700 hover:to-pink-700 text-white'
                  : 'bg-red-600 hover:bg-red-700 text-white'
                }`}
            >
              {showDeleteConfirm ? '⚠️ Дахин дарж баталгаажуулах' : 'Бүх өгөгдөл устгах'}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}