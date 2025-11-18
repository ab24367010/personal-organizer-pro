import { Award, Trophy, Star, Target, Zap, Crown } from 'lucide-react'
import useStore from '../../store/useStore'

export default function Badges() {
  const { todos, habits, userPoints } = useStore()
  
  const completedTodos = todos.filter(t => t.completed).length

  const badges = [
    {
      icon: Star,
      name: 'Анхны алхам',
      description: 'Анхны ажлаа дуусгав',
      unlocked: completedTodos >= 1,
      color: 'text-yellow-600',
      bg: 'bg-yellow-100 dark:bg-yellow-900/20'
    },
    {
      icon: Target,
      name: 'Идэвхтэй',
      description: '10 ажил дуусгав',
      unlocked: completedTodos >= 10,
      color: 'text-blue-600',
      bg: 'bg-blue-100 dark:bg-blue-900/20'
    },
    {
      icon: Trophy,
      name: 'Мастер',
      description: '50 ажил дуусгав',
      unlocked: completedTodos >= 50,
      color: 'text-orange-600',
      bg: 'bg-orange-100 dark:bg-orange-900/20'
    },
    {
      icon: Zap,
      name: 'Эрч хүчтэй',
      description: '100+ оноо цуглуулав',
      unlocked: userPoints >= 100,
      color: 'text-purple-600',
      bg: 'bg-purple-100 dark:bg-purple-900/20'
    },
    {
      icon: Crown,
      name: 'Аварга',
      description: 'Түвшин 10-д хүрэв',
      unlocked: false,
      color: 'text-pink-600',
      bg: 'bg-pink-100 dark:bg-pink-900/20'
    },
    {
      icon: Award,
      name: 'Тууштай',
      description: '5 дадал үүсгэв',
      unlocked: habits.length >= 5,
      color: 'text-green-600',
      bg: 'bg-green-100 dark:bg-green-900/20'
    }
  ]

  const unlockedCount = badges.filter(b => b.unlocked).length

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pt-20 px-4 pb-8">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white flex items-center gap-3">
            <Award className="text-yellow-600" />
            Шагнал
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-2">
            {unlockedCount} / {badges.length} нээгдсэн
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {badges.map((badge, index) => (
            <div
              key={index}
              className={`p-6 rounded-lg shadow-md transition transform hover:scale-105 ${
                badge.unlocked
                  ? 'bg-white dark:bg-gray-800'
                  : 'bg-gray-100 dark:bg-gray-800 opacity-50'
              }`}
            >
              <div className={`inline-flex p-4 rounded-full ${badge.bg} mb-4`}>
                <badge.icon className={`w-8 h-8 ${badge.color}`} />
              </div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                {badge.name}
              </h3>
              <p className="text-gray-600 dark:text-gray-400 text-sm">
                {badge.description}
              </p>
              {badge.unlocked && (
                <div className="mt-4 inline-flex items-center gap-1 px-3 py-1 bg-green-100 dark:bg-green-900/20 text-green-600 dark:text-green-400 rounded-full text-sm font-medium">
                  ✓ Нээгдсэн
                </div>
              )}
              {!badge.unlocked && (
                <div className="mt-4 inline-flex items-center gap-1 px-3 py-1 bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-400 rounded-full text-sm">
                  🔒 Түгжээтэй
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
