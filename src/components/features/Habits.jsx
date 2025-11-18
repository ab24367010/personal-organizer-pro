import { useState } from 'react'
import { Plus, Trash2, Flame, Target } from 'lucide-react'
import useStore from '../../store/useStore'

export default function Habits() {
  const [newHabit, setNewHabit] = useState('')
  const { habits, addHabit } = useStore()

  const handleAdd = (e) => {
    e.preventDefault()
    if (newHabit.trim()) {
      addHabit({ name: newHabit })
      setNewHabit('')
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pt-20 px-4 pb-8">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white flex items-center gap-3">
            <TrendingUp className="text-green-600" />
            Дадал зуршил
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-2">
            Өдөр бүр давтаж хийх зүйлс
          </p>
        </div>

        <form onSubmit={handleAdd} className="flex gap-2 mb-6">
          <input
            type="text"
            value={newHabit}
            onChange={(e) => setNewHabit(e.target.value)}
            placeholder="Шинэ дадал нэмэх..."
            className="flex-1 px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 dark:bg-gray-800 dark:text-white focus:ring-2 focus:ring-green-500 outline-none transition"
          />
          <button
            type="submit"
            className="px-6 py-3 bg-green-600 hover:bg-green-700 text-white rounded-lg flex items-center gap-2 transition transform hover:scale-105 shadow-lg"
          >
            <Plus size={20} />
            Нэмэх
          </button>
        </form>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {habits.length === 0 ? (
            <div className="col-span-2 text-center py-12">
              <Target className="w-16 h-16 text-gray-300 dark:text-gray-600 mx-auto mb-4" />
              <p className="text-gray-500 dark:text-gray-400 text-lg">
                Дадал зуршил алга байна
              </p>
              <p className="text-gray-400 dark:text-gray-500 text-sm mt-2">
                Өдөр бүр хийх дадлаа нэмээрэй! 💪
              </p>
            </div>
          ) : (
            habits.map((habit) => (
              <div
                key={habit.id}
                className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md hover:shadow-lg transition"
              >
                <div className="flex items-start justify-between mb-4">
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                    {habit.name}
                  </h3>
                  <button className="text-red-500 hover:text-red-700 p-2 rounded-lg hover:bg-red-50 dark:hover:bg-red-900/20 transition">
                    <Trash2 size={18} />
                  </button>
                </div>
                
                <div className="flex items-center gap-2 text-orange-600 dark:text-orange-400">
                  <Flame size={24} />
                  <span className="text-2xl font-bold">{habit.streak}</span>
                  <span className="text-gray-600 dark:text-gray-400">өдөр</span>
                </div>

                <button className="w-full mt-4 bg-green-600 hover:bg-green-700 text-white py-2 rounded-lg transition">
                  Өнөөдөр хийсэн
                </button>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  )
}
