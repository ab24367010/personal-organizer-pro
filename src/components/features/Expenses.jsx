import { useState } from 'react'
import { Plus, Trash2, DollarSign, TrendingDown, Edit2, Calendar, Filter } from 'lucide-react'
import useStore from '../../store/useStore'

export default function Expenses() {
  const [description, setDescription] = useState('')
  const [amount, setAmount] = useState('')
  const [category, setCategory] = useState('Хоол')
  const [editingId, setEditingId] = useState(null)
  const [filterCategory, setFilterCategory] = useState('all')
  const [dateFilter, setDateFilter] = useState('all')
  const { expenses, addExpense, deleteExpense, updateExpense } = useStore()

  const categories = ['Хоол', 'Тээвэр', 'Хувцас', 'Үзвэр', 'Сургалт', 'Эрүүл мэнд', 'Бусад']

  const handleAdd = (e) => {
    e.preventDefault()
    if (description.trim() && amount) {
      if (editingId) {
        updateExpense(editingId, {
          description,
          amount: parseFloat(amount),
          category
        })
        setEditingId(null)
      } else {
        addExpense({ description, amount: parseFloat(amount), category })
      }
      setDescription('')
      setAmount('')
      setCategory('Хоол')
    }
  }

  const handleEdit = (expense) => {
    setDescription(expense.description)
    setAmount(expense.amount.toString())
    setCategory(expense.category)
    setEditingId(expense.id)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const cancelEdit = () => {
    setEditingId(null)
    setDescription('')
    setAmount('')
    setCategory('Хоол')
  }

  // Filter expenses
  const filteredExpenses = expenses.filter(exp => {
    if (filterCategory !== 'all' && exp.category !== filterCategory) return false

    if (dateFilter === 'today') {
      const today = new Date().toDateString()
      return new Date(exp.date).toDateString() === today
    } else if (dateFilter === 'week') {
      const weekAgo = new Date()
      weekAgo.setDate(weekAgo.getDate() - 7)
      return new Date(exp.date) >= weekAgo
    } else if (dateFilter === 'month') {
      const monthAgo = new Date()
      monthAgo.setMonth(monthAgo.getMonth() - 1)
      return new Date(exp.date) >= monthAgo
    }

    return true
  })

  const total = filteredExpenses.reduce((sum, exp) => sum + exp.amount, 0)
  const categoryTotals = categories.reduce((acc, cat) => {
    acc[cat] = filteredExpenses
      .filter(exp => exp.category === cat)
      .reduce((sum, exp) => sum + exp.amount, 0)
    return acc
  }, {})

  const maxCategoryAmount = Math.max(...Object.values(categoryTotals), 1)

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-red-50 dark:from-gray-900 dark:to-gray-800 pt-20 px-4 pb-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-5xl font-bold text-gray-900 dark:text-white mb-4 bg-gradient-to-r from-red-600 to-pink-600 bg-clip-text text-transparent flex items-center gap-3">
            <TrendingDown className="text-red-600" size={48} />
            Зарлага
          </h1>
          <p className="text-4xl font-bold text-red-600 dark:text-red-400">
            -{total.toLocaleString()}₮
          </p>
        </div>

        {/* Add/Edit form */}
        <form onSubmit={handleAdd} className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-xl mb-6 border border-gray-100 dark:border-gray-700">
          {editingId && (
            <div className="mb-4 p-3 bg-blue-100 dark:bg-blue-900/20 rounded-lg flex items-center justify-between">
              <span className="text-blue-700 dark:text-blue-300 font-medium">
                ✏️ Засварлаж байна...
              </span>
              <button
                type="button"
                onClick={cancelEdit}
                className="text-blue-600 dark:text-blue-400 hover:underline text-sm"
              >
                Болих
              </button>
            </div>
          )}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
            <input
              type="text"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Тайлбар..."
              className="px-4 py-3 rounded-xl border-2 border-gray-200 dark:border-gray-600 dark:bg-gray-700 dark:text-white focus:ring-2 focus:ring-red-500 focus:border-transparent outline-none"
              required
            />
            <input
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="Дүн..."
              className="px-4 py-3 rounded-xl border-2 border-gray-200 dark:border-gray-600 dark:bg-gray-700 dark:text-white focus:ring-2 focus:ring-red-500 focus:border-transparent outline-none"
              required
            />
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="px-4 py-3 rounded-xl border-2 border-gray-200 dark:border-gray-600 dark:bg-gray-700 dark:text-white focus:ring-2 focus:ring-red-500 outline-none"
            >
              {categories.map(cat => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
            <button
              type="submit"
              className="bg-gradient-to-r from-red-600 to-pink-600 hover:from-red-700 hover:to-pink-700 text-white py-3 rounded-xl flex items-center justify-center gap-2 transition transform hover:scale-105 shadow-lg font-medium"
            >
              {editingId ? (
                <>
                  <Edit2 size={20} />
                  Шинэчлэх
                </>
              ) : (
                <>
                  <Plus size={20} />
                  Нэмэх
                </>
              )}
            </button>
          </div>
        </form>

        {/* Filters */}
        <div className="bg-white dark:bg-gray-800 p-4 rounded-2xl shadow-md mb-6 border border-gray-100 dark:border-gray-700">
          <div className="flex flex-wrap gap-4 items-center">
            <div className="flex items-center gap-2">
              <Filter size={20} className="text-gray-600 dark:text-gray-400" />
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Ангилал:</span>
              <select
                value={filterCategory}
                onChange={(e) => setFilterCategory(e.target.value)}
                className="px-3 py-1 rounded-lg bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 text-sm border-none outline-none"
              >
                <option value="all">Бүгд</option>
                {categories.map(cat => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
            </div>
            <div className="flex items-center gap-2">
              <Calendar size={20} className="text-gray-600 dark:text-gray-400" />
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Хугацаа:</span>
              <select
                value={dateFilter}
                onChange={(e) => setDateFilter(e.target.value)}
                className="px-3 py-1 rounded-lg bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 text-sm border-none outline-none"
              >
                <option value="all">Бүгд</option>
                <option value="today">Өнөөдөр</option>
                <option value="week">7 өдөр</option>
                <option value="month">1 сар</option>
              </select>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Category breakdown */}
          <div className="lg:col-span-1">
            <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-lg border border-gray-100 dark:border-gray-700 sticky top-24">
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                <DollarSign size={24} className="text-red-600" />
                Ангилалаар
              </h3>
              <div className="space-y-3">
                {categories.map(cat => {
                  const amount = categoryTotals[cat]
                  const percentage = total > 0 ? (amount / total) * 100 : 0
                  const barWidth = total > 0 ? (amount / maxCategoryAmount) * 100 : 0

                  if (amount === 0) return null

                  return (
                    <div key={cat}>
                      <div className="flex justify-between mb-1">
                        <span className="text-sm font-medium text-gray-700 dark:text-gray-300">{cat}</span>
                        <span className="text-sm font-bold text-gray-900 dark:text-white">
                          {amount.toLocaleString()}₮
                        </span>
                      </div>
                      <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                        <div
                          className="h-full bg-gradient-to-r from-red-500 to-pink-500 rounded-full transition-all duration-500"
                          style={{ width: `${barWidth}%` }}
                        />
                      </div>
                      <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                        {percentage.toFixed(1)}%
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
          </div>

          {/* Expenses list */}
          <div className="lg:col-span-2">
            <div className="space-y-3">
              {filteredExpenses.length === 0 ? (
                <div className="text-center py-16 bg-white dark:bg-gray-800 rounded-2xl shadow-md">
                  <DollarSign className="w-20 h-20 text-gray-300 dark:text-gray-600 mx-auto mb-4" />
                  <p className="text-gray-500 dark:text-gray-400 text-xl font-medium">
                    Зарлага олдсонгүй
                  </p>
                </div>
              ) : (
                filteredExpenses.map((expense) => (
                  <div
                    key={expense.id}
                    className="bg-white dark:bg-gray-800 p-5 rounded-2xl shadow-md hover:shadow-xl transition-all transform hover:scale-[1.01] border border-gray-100 dark:border-gray-700"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <span className="px-3 py-1 bg-red-100 dark:bg-red-900/20 text-red-600 dark:text-red-400 text-sm rounded-lg font-medium">
                            {expense.category}
                          </span>
                          <span className="text-sm text-gray-500 dark:text-gray-400">
                            {new Date(expense.date).toLocaleDateString('mn-MN', {
                              month: 'short',
                              day: 'numeric',
                              year: 'numeric'
                            })}
                          </span>
                        </div>
                        <p className="text-lg font-medium text-gray-900 dark:text-white">{expense.description}</p>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className="text-2xl font-bold text-red-600 dark:text-red-400">
                          -{expense.amount.toLocaleString()}₮
                        </span>
                        <button
                          onClick={() => handleEdit(expense)}
                          className="text-blue-500 hover:text-blue-700 p-2 rounded-lg hover:bg-blue-50 dark:hover:bg-blue-900/20 transition"
                        >
                          <Edit2 size={18} />
                        </button>
                        <button
                          onClick={() => deleteExpense(expense.id)}
                          className="text-red-500 hover:text-red-700 p-2 rounded-lg hover:bg-red-50 dark:hover:bg-red-900/20 transition"
                        >
                          <Trash2 size={18} />
                        </button>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}