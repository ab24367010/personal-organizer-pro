import { useState } from 'react'
<parameter name="plus, Trash2, Flame, Target, TrendingUp, CheckCircle2, Circle } from 'lucide-react'
import useStore from '../../store/useStore'

export default function Habits() {
  const [newHabit, setNewHabit] = useState('')
  const [frequency, setFrequency] = useState('daily')
  const { habits, addHabit, deleteHabit, incrementHabitStreak, addPoints } = useStore()

  const handleAdd = (e) => {
    e.preventDefault()
    if (newHabit.trim()) {
      addHabit({ name: newHabit, frequency })
      setNewHabit('')
      setFrequency('daily')
    }
  }

  const handleComplete = (habitId) => {
    incrementHabitStreak(habitId)
    addPoints(20)
  }

  const totalStreak = habits.reduce((sum, h) => sum + h.streak, 0)
  const completedToday = habits.filter(h => {
    const lastCompleted = h.lastCompleted ? new Date(h.lastCompleted) : null
    const today = new Date()
    return lastCompleted && 
           lastCompleted.getDate() === today.getDate() &&
           lastCompleted.getMonth() === today.getMonth() &&
           lastCompleted.getFullYear() === today.getFullYear()
  }).length

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-green-50 dark:from-gray-900 dark:to-gray-800 pt-20 px-4 pb-8">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-5xl font-bold text-gray-900 dark:text-white mb-4 bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent flex items-center gap-3">
            <TrendingUp className="text-green-600" size={48} />
            Дадал зуршил
          </h1>
          <div className="flex flex-wrap gap-4">
            <div className="bg-white dark:bg-gray-800 px-4 py-2 rounded-xl shadow-md">
              <span className="text-gray-600 dark:text-gray-400 text-sm">Нийт дадал:</span>
              <span className="ml-2 text-xl font-bold text-green-600">{habits.length}</span>
            </div>
            <div className="bg-white dark:bg-gray-800 px-4 py-2 rounded-xl shadow-md">
              <span className="text-gray-600 dark:text-gray-400 text-sm">Өнөөдөр:</span>
              <span className="ml-2 text-xl font-bold text-blue-600">{completedToday}/{habits.length}</span>
            </div>
            <div className="bg-gradient-to-r from-orange-500 to-red-500 px-4 py-2 rounded-xl shadow-md">
              <Flame className="inline mr-2 text-white" size={20} />
              <span className="text-white text-sm font-medium">Нийт streak:</span>
              <span className="ml-2 text-xl font-bold text-white">{totalStreak}</span>
            </div>
          </div>
        </div>

        {/* Add habit form */}
        <form onSubmit={handleAdd} className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-xl mb-6 border border-gray-100 dark:border-gray-700">
          <div className="space-y-4">
            <div>
              <input
                type="text"
                value={newHabit}
                onChange={(e) => setNewHabit(e.target.value)}
                placeholder="Шинэ дадал нэмэх... (жишээ: Өглөө 30 минут гүйх)"
                className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 dark:border-gray-600 dark:bg-gray-700 dark:text-white focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none transition"
              />
            </div>
            <div className="flex flex-wrap gap-3">
              <div className="flex-1">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Давтамж
                </label>
                <select
                  value={frequency}
                  onChange={(e) => setFrequency(e.target.value)}
                  className="w-full px-4 py-2 rounded-xl border-2 border-gray-200 dark:border-gray-600 dark:bg-gray-700 dark:text-white focus:ring-2 focus:ring-green-500 outline-none"
                >
                  <option value="daily">📅 Өдөр бүр</option>
                  <option value="weekly">📆 7 хоног тутам</option>
                  <option value="custom">⚙️ Тусгай</option>
                </select>
              </div>
              <div className="flex items-end">
                <button
                  type="submit"
                  className="px-8 py-2 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white rounded-xl flex items-center gap-2 transition transform hover:scale-105 shadow-lg font-medium"
                >
                  <Plus size={20} />
                  Нэмэх
                </button>
              </div>
            </div>
          </div>
        </form>

        {/* Habits grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {habits.length === 0 ? (
            <div className="col-span-full text-center py-16 bg-white dark:bg-gray-800 rounded-2xl shadow-md">
              <Target className="w-20 h-20 text-gray-300 dark:text-gray-600 mx-auto mb-4" />
              <p className="text-gray-500 dark:text-gray-400 text-xl font-medium">
                Дадал зуршил алга байна
              </p>
              <p className="text-gray-400 dark:text-gray-500 text-sm mt-2">
                Өдөр бүр хийх дадлаа нэмээрэй! 💪
              </p>
            </div>
          ) : (
            habits.map((habit) => {
              const lastCompleted = habit.lastCompleted ? new Date(habit.lastCompleted) : null
              const today = new Date()
              const isCompletedToday = lastCompleted && 
                                      lastCompleted.getDate() === today.getDate() &&
                                      lastCompleted.getMonth() === today.getMonth() &&
                                      lastCompleted.getFullYear() === today.getFullYear()

              return (
                <div
                  key={habit.id}
                  className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-md hover:shadow-xl transition-all transform hover:scale-105 border border-gray-100 dark:border-gray-700"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                        {habit.name}
                      </h3>
                      <span className="inline-block px-2 py-1 bg-blue-100 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 rounded-lg text-xs font-medium">
                        {habit.frequency === 'daily' ? '📅 Өдөр бүр' : '📆 7 хоног тутам'}
                      </span>
                    </div>
                    <button 
                      onClick={() => deleteHabit(habit.id)}
                      className="text-red-500 hover:text-red-700 p-2 rounded-lg hover:bg-red-50 dark:hover:bg-red-900/20 transition"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                  
                  {/* Streak display */}
                  <div className="bg-gradient-to-r from-orange-500 to-red-500 p-4 rounded-xl mb-4">
                    <div className="flex items-center justify-center gap-3">
                      <Flame size={32} className="text-white" />
                      <div className="text-center">
                        <div className="text-4xl font-bold text-white">{habit.streak}</div>
                        <div className="text-sm text-white/90">өдөр streak</div>
                      </div>
                    </div>
                  </div>

                  {/* Progress visualization */}
                  <div className="mb-4">
                    <div className="flex justify-between text-xs text-gray-600 dark:text-gray-400 mb-2">
                      <span>Сүүлийн 7 өдөр</span>
                      <span>{habit.history?.length || 0}/7</span>
                    </div>
                    <div className="flex gap-1">
                      {[...Array(7)].map((_, i) => {
                        const date = new Date()
                        date.setDate(date.getDate() - (6 - i))
                        const completed = habit.history?.some(h => {
                          const hDate = new Date(h)
                          return hDate.getDate() === date.getDate() &&
                                 hDate.getMonth() === date.getMonth() &&
                                 hDate.getFullYear() === date.getFullYear()
                        })
                        return (
                          <div
                            key={i}
                            className={`flex-1 h-8 rounded ${
                              completed 
                                ? 'bg-green-500' 
                                : 'bg-gray-200 dark:bg-gray-700'
                            }`}
                            title={date.toLocaleDateString('mn-MN')}
                          />
                        )
                      })}
                    </div>
                  </div>

                  {/* Complete button */}
                  {isCompletedToday ? (
                    <div className="flex items-center justify-center gap-2 py-3 bg-green-100 dark:bg-green-900/20 text-green-600 dark:text-green-400 rounded-xl font-medium">
                      <CheckCircle2 size={20} />
                      Өнөөдөр хийсэн
                    </div>
                  ) : (
                    <button 
                      onClick={() => handleComplete(habit.id)}
                      className="w-full bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white py-3 rounded-xl transition transform hover:scale-105 shadow-lg font-medium flex items-center justify-center gap-2"
                    >
                      <Circle size={20} />
                      Өнөөдөр хийх
                    </button>
                  )}

                  {/* Reward info */}
                  {!isCompletedToday && (
                    <div className="mt-3 text-center">
                      <span className="inline-flex items-center gap-1 px-3 py-1 bg-purple-100 dark:bg-purple-900/20 text-purple-600 dark:text-purple-400 rounded-full text-xs font-medium">
                        +20 оноо авах
                      </span>
                    </div>
                  )}
                </div>
              )
            })
          )}
        </div>

        {/* Motivation section */}
        {habits.length > 0 && (
          <div className="mt-8 bg-gradient-to-r from-blue-600 to-purple-600 p-6 rounded-2xl shadow-xl text-white">
            <h3 className="text-2xl font-bold mb-2">💪 Урамшуулал</h3>
            <p className="text-white/90">
              {completedToday === habits.length 
                ? "Гайхалтай! Бүх дадлаа хийж дуусгалаа! 🎉"
                : completedToday > 0
                ? `Сайн байна! ${habits.length - completedToday} дадал үлдсэн байна.`
                : "Өнөөдрийн дадлаа эхлүүлээрэй! Та чадна! 🚀"
              }
            </p>
          </div>
        )}
      </div>
    </div>
  )
}