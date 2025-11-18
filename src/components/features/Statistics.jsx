import { BarChart3, TrendingUp, TrendingDown, DollarSign } from 'lucide-react'
import useStore from '../../store/useStore'

export default function Statistics() {
  const { todos, habits, expenses, incomes } = useStore()

  const totalExpenses = expenses.reduce((sum, exp) => sum + exp.amount, 0)
  const totalIncomes = incomes.reduce((sum, inc) => sum + inc.amount, 0)
  const balance = totalIncomes - totalExpenses
  const completedTodos = todos.filter(t => t.completed).length

  const stats = [
    {
      icon: TrendingUp,
      label: 'Нийт орлого',
      value: `${totalIncomes.toLocaleString()}₮`,
      color: 'text-emerald-600',
      bg: 'bg-emerald-100 dark:bg-emerald-900/20'
    },
    {
      icon: TrendingDown,
      label: 'Нийт зарлага',
      value: `${totalExpenses.toLocaleString()}₮`,
      color: 'text-red-600',
      bg: 'bg-red-100 dark:bg-red-900/20'
    },
    {
      icon: DollarSign,
      label: 'Үлдэгдэл',
      value: `${balance.toLocaleString()}₮`,
      color: balance >= 0 ? 'text-blue-600' : 'text-red-600',
      bg: balance >= 0 ? 'bg-blue-100 dark:bg-blue-900/20' : 'bg-red-100 dark:bg-red-900/20'
    }
  ]

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pt-20 px-4 pb-8">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white flex items-center gap-3">
            <BarChart3 className="text-orange-600" />
            Статистик
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-2">
            Таны үр дүн
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {stats.map((stat, index) => (
            <div key={index} className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
              <div className={`inline-flex p-3 rounded-lg ${stat.bg} mb-4`}>
                <stat.icon className={`w-6 h-6 ${stat.color}`} />
              </div>
              <p className="text-gray-600 dark:text-gray-400 text-sm">{stat.label}</p>
              <p className={`text-2xl font-bold ${stat.color} mt-1`}>{stat.value}</p>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
              Хийх ажлууд
            </h3>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-gray-600 dark:text-gray-400">Нийт</span>
                <span className="text-2xl font-bold text-blue-600">{todos.length}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600 dark:text-gray-400">Дууссан</span>
                <span className="text-2xl font-bold text-green-600">{completedTodos}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600 dark:text-gray-400">Үлдсэн</span>
                <span className="text-2xl font-bold text-orange-600">{todos.length - completedTodos}</span>
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
              Дадал зуршил
            </h3>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-gray-600 dark:text-gray-400">Нийт дадал</span>
                <span className="text-2xl font-bold text-green-600">{habits.length}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600 dark:text-gray-400">Хамгийн урт streak</span>
                <span className="text-2xl font-bold text-orange-600">
                  {habits.length > 0 ? Math.max(...habits.map(h => h.streak)) : 0} өдөр
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
