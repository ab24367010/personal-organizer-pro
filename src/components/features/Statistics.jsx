import { BarChart3, TrendingUp, TrendingDown, DollarSign, CheckCircle, Target, Award, Calendar } from 'lucide-react'
import useStore from '../../store/useStore'

export default function Statistics() {
  const { todos, habits, expenses, incomes } = useStore()

  const totalExpenses = expenses.reduce((sum, exp) => sum + exp.amount, 0)
  const totalIncomes = incomes.reduce((sum, inc) => sum + inc.amount, 0)
  const balance = totalIncomes - totalExpenses
  const completedTodos = todos.filter(t => t.completed).length
  const completionRate = todos.length > 0 ? Math.round((completedTodos / todos.length) * 100) : 0

  // Calculate savings rate
  const savingsRate = totalIncomes > 0 ? Math.round(((totalIncomes - totalExpenses) / totalIncomes) * 100) : 0

  // Category breakdown for expenses
  const expensesByCategory = expenses.reduce((acc, exp) => {
    acc[exp.category] = (acc[exp.category] || 0) + exp.amount
    return acc
  }, {})

  // Income sources breakdown
  const incomesBySource = incomes.reduce((acc, inc) => {
    acc[inc.source] = (acc[inc.source] || 0) + inc.amount
    return acc
  }, {})

  const stats = [
    {
      icon: TrendingUp,
      label: 'Нийт орлого',
      value: `${totalIncomes.toLocaleString()}₮`,
      change: '+12.5%',
      changeType: 'positive',
      color: 'text-emerald-600',
      bg: 'bg-emerald-100 dark:bg-emerald-900/20',
      gradient: 'from-emerald-500 to-green-500'
    },
    {
      icon: TrendingDown,
      label: 'Нийт зарлага',
      value: `${totalExpenses.toLocaleString()}₮`,
      change: '+8.3%',
      changeType: 'negative',
      color: 'text-red-600',
      bg: 'bg-red-100 dark:bg-red-900/20',
      gradient: 'from-red-500 to-pink-500'
    },
    {
      icon: DollarSign,
      label: 'Үлдэгдэл',
      value: `${balance.toLocaleString()}₮`,
      change: savingsRate > 0 ? `${savingsRate}% хадгаламж` : 'Зарлага их байна',
      changeType: balance >= 0 ? 'positive' : 'negative',
      color: balance >= 0 ? 'text-blue-600' : 'text-red-600',
      bg: balance >= 0 ? 'bg-blue-100 dark:bg-blue-900/20' : 'bg-red-100 dark:bg-red-900/20',
      gradient: balance >= 0 ? 'from-blue-500 to-cyan-500' : 'from-red-500 to-orange-500'
    },
    {
      icon: CheckCircle,
      label: 'Ажил дууссан хувь',
      value: `${completionRate}%`,
      change: `${completedTodos}/${todos.length} ажил`,
      changeType: 'positive',
      color: 'text-purple-600',
      bg: 'bg-purple-100 dark:bg-purple-900/20',
      gradient: 'from-purple-500 to-indigo-500'
    }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-orange-50 dark:from-gray-900 dark:to-gray-800 pt-20 px-4 pb-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-5xl font-bold text-gray-900 dark:text-white mb-2 bg-gradient-to-r from-orange-600 to-pink-600 bg-clip-text text-transparent flex items-center gap-3">
            <BarChart3 className="text-orange-600" size={48} />
            Статистик
          </h1>
          <p className="text-gray-600 dark:text-gray-400 text-lg">
            Таны үр дүн ба ахиц дэвшил
          </p>
        </div>

        {/* Main stats grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all transform hover:scale-105 border border-gray-100 dark:border-gray-700"
            >
              <div className={`inline-flex p-3 rounded-xl bg-gradient-to-r ${stat.gradient} mb-4 shadow-lg`}>
                <stat.icon className="w-6 h-6 text-white" />
              </div>
              <p className="text-gray-600 dark:text-gray-400 text-sm font-medium mb-1">{stat.label}</p>
              <p className={`text-3xl font-bold ${stat.color} mb-2`}>{stat.value}</p>
              <div className="flex items-center gap-1">
                <span className={`text-xs font-medium ${stat.changeType === 'positive' ? 'text-green-600 dark:text-green-400' : 'text-gray-600 dark:text-gray-400'
                  }`}>
                  {stat.change}
                </span>
              </div>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Todo statistics */}
          <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-lg border border-gray-100 dark:border-gray-700">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-3 bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl shadow-lg">
                <Target className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
                Хийх ажлууд
              </h3>
            </div>
            <div className="space-y-4">
              <div className="flex justify-between items-center p-4 bg-gray-50 dark:bg-gray-700/50 rounded-xl">
                <span className="text-gray-700 dark:text-gray-300 font-medium">Нийт</span>
                <span className="text-3xl font-bold text-blue-600">{todos.length}</span>
              </div>
              <div className="flex justify-between items-center p-4 bg-green-50 dark:bg-green-900/20 rounded-xl">
                <span className="text-gray-700 dark:text-gray-300 font-medium">Дууссан</span>
                <span className="text-3xl font-bold text-green-600">{completedTodos}</span>
              </div>
              <div className="flex justify-between items-center p-4 bg-orange-50 dark:bg-orange-900/20 rounded-xl">
                <span className="text-gray-700 dark:text-gray-300 font-medium">Үлдсэн</span>
                <span className="text-3xl font-bold text-orange-600">{todos.length - completedTodos}</span>
              </div>

              {/* Progress bar */}
              <div className="mt-6">
                <div className="flex justify-between mb-2">
                  <span className="text-sm text-gray-600 dark:text-gray-400">Явц</span>
                  <span className="text-sm font-bold text-blue-600">{completionRate}%</span>
                </div>
                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3 overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-blue-600 to-purple-600 rounded-full transition-all duration-500"
                    style={{ width: `${completionRate}%` }}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Habit statistics */}
          <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-lg border border-gray-100 dark:border-gray-700">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-3 bg-gradient-to-r from-green-500 to-emerald-500 rounded-xl shadow-lg">
                <Award className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
                Дадал зуршил
              </h3>
            </div>
            <div className="space-y-4">
              <div className="flex justify-between items-center p-4 bg-gray-50 dark:bg-gray-700/50 rounded-xl">
                <span className="text-gray-700 dark:text-gray-300 font-medium">Нийт дадал</span>
                <span className="text-3xl font-bold text-green-600">{habits.length}</span>
              </div>
              <div className="flex justify-between items-center p-4 bg-orange-50 dark:bg-orange-900/20 rounded-xl">
                <span className="text-gray-700 dark:text-gray-300 font-medium">Хамгийн урт streak</span>
                <span className="text-3xl font-bold text-orange-600">
                  {habits.length > 0 ? Math.max(...habits.map(h => h.streak)) : 0} өдөр
                </span>
              </div>
              <div className="flex justify-between items-center p-4 bg-blue-50 dark:bg-blue-900/20 rounded-xl">
                <span className="text-gray-700 dark:text-gray-300 font-medium">Дундаж streak</span>
                <span className="text-3xl font-bold text-blue-600">
                  {habits.length > 0 ? Math.round(habits.reduce((sum, h) => sum + h.streak, 0) / habits.length) : 0} өдөр
                </span>
              </div>

              {/* Top habit */}
              {habits.length > 0 && (
                <div className="mt-6 p-4 bg-gradient-to-r from-green-500 to-emerald-500 rounded-xl text-white">
                  <p className="text-sm opacity-90 mb-1">🏆 Шилдэг дадал</p>
                  <p className="text-lg font-bold">
                    {habits.reduce((prev, current) => (prev.streak > current.streak) ? prev : current).name}
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Financial breakdown */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Expenses by category */}
          <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-lg border border-gray-100 dark:border-gray-700">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-3 bg-gradient-to-r from-red-500 to-pink-500 rounded-xl shadow-lg">
                <TrendingDown className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
                Зарлагын ангилал
              </h3>
            </div>
            {Object.keys(expensesByCategory).length > 0 ? (
              <div className="space-y-3">
                {Object.entries(expensesByCategory)
                  .sort(([, a], [, b]) => b - a)
                  .map(([category, amount]) => {
                    const percentage = (amount / totalExpenses) * 100
                    return (
                      <div key={category}>
                        <div className="flex justify-between mb-2">
                          <span className="text-gray-700 dark:text-gray-300 font-medium">{category}</span>
                          <span className="text-gray-900 dark:text-white font-bold">
                            {amount.toLocaleString()}₮ ({percentage.toFixed(1)}%)
                          </span>
                        </div>
                        <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                          <div
                            className="h-full bg-gradient-to-r from-red-500 to-pink-500 rounded-full"
                            style={{ width: `${percentage}%` }}
                          />
                        </div>
                      </div>
                    )
                  })}
              </div>
            ) : (
              <p className="text-gray-500 dark:text-gray-400 text-center py-8">
                Зарлага байхгүй байна
              </p>
            )}
          </div>

          {/* Incomes by source */}
          <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-lg border border-gray-100 dark:border-gray-700">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-3 bg-gradient-to-r from-emerald-500 to-green-500 rounded-xl shadow-lg">
                <TrendingUp className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
                Орлогын эх үүсвэр
              </h3>
            </div>
            {Object.keys(incomesBySource).length > 0 ? (
              <div className="space-y-3">
                {Object.entries(incomesBySource)
                  .sort(([, a], [, b]) => b - a)
                  .map(([source, amount]) => {
                    const percentage = (amount / totalIncomes) * 100
                    return (
                      <div key={source}>
                        <div className="flex justify-between mb-2">
                          <span className="text-gray-700 dark:text-gray-300 font-medium">{source}</span>
                          <span className="text-gray-900 dark:text-white font-bold">
                            {amount.toLocaleString()}₮ ({percentage.toFixed(1)}%)
                          </span>
                        </div>
                        <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                          <div
                            className="h-full bg-gradient-to-r from-emerald-500 to-green-500 rounded-full"
                            style={{ width: `${percentage}%` }}
                          />
                        </div>
                      </div>
                    )
                  })}
              </div>
            ) : (
              <p className="text-gray-500 dark:text-gray-400 text-center py-8">
                Орлого байхгүй байна
              </p>
            )}
          </div>
        </div>

        {/* Summary card */}
        <div className="mt-8 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 p-8 rounded-2xl shadow-2xl text-white">
          <div className="flex items-center gap-3 mb-4">
            <Calendar className="w-8 h-8" />
            <h3 className="text-3xl font-bold">Сарын дүгнэлт</h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
            <div>
              <p className="text-white/80 text-sm mb-1">Хамгийн их зарласан</p>
              <p className="text-2xl font-bold">
                {Object.keys(expensesByCategory).length > 0
                  ? Object.entries(expensesByCategory).sort(([, a], [, b]) => b - a)[0][0]
                  : 'Байхгүй'}
              </p>
            </div>
            <div>
              <p className="text-white/80 text-sm mb-1">Хадгаламжийн хувь</p>
              <p className="text-2xl font-bold">{savingsRate}%</p>
            </div>
            <div>
              <p className="text-white/80 text-sm mb-1">Дууссан ажлын хувь</p>
              <p className="text-2xl font-bold">{completionRate}%</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}