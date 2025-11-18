import { useState } from 'react'
import { Plus, Trash2, Coins, TrendingUp, Edit2, Calendar, Filter } from 'lucide-react'
import useStore from '../../store/useStore'

export default function Incomes() {
  const [description, setDescription] = useState('')
  const [amount, setAmount] = useState('')
  const [source, setSource] = useState('Цалин')
  const [editingId, setEditingId] = useState(null)
  const [filterSource, setFilterSource] = useState('all')
  const [dateFilter, setDateFilter] = useState('all')
  const { incomes, addIncome, deleteIncome, updateIncome } = useStore()

  const sources = ['Цалин', 'Бизнес', 'Хөрөнгө оруулалт', 'Бэлэг', 'Бусад']

  const handleAdd = (e) => {
    e.preventDefault()
    if (description.trim() && amount) {
      if (editingId) {
        updateIncome(editingId, {
          description,
          amount: parseFloat(amount),
          source
        })
        setEditingId(null)
      } else {
        addIncome({ description, amount: parseFloat(amount), source })
      }
      setDescription('')
      setAmount('')
      setSource('Цалин')
    }
  }

  const handleEdit = (income) => {
    setDescription(income.description)
    setAmount(income.amount.toString())
    setSource(income.source)
    setEditingId(income.id)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const cancelEdit = () => {
    setEditingId(null)
    setDescription('')
    setAmount('')
    setSource('Цалин')
  }

  // Filter incomes
  const filteredIncomes = incomes.filter(inc => {
    if (filterSource !== 'all' && inc.source !== filterSource) return false

    if (dateFilter === 'today') {
      const today = new Date().toDateString()
      return new Date(inc.date).toDateString() === today
    } else if (dateFilter === 'week') {
      const weekAgo = new Date()
      weekAgo.setDate(weekAgo.getDate() - 7)
      return new Date(inc.date) >= weekAgo
    } else if (dateFilter === 'month') {
      const monthAgo = new Date()
      monthAgo.setMonth(monthAgo.getMonth() - 1)
      return new Date(inc.date) >= monthAgo
    }

    return true
  })

  const total = filteredIncomes.reduce((sum, inc) => sum + inc.amount, 0)
  const sourceTotals = sources.reduce((acc, src) => {
    acc[src] = filteredIncomes
      .filter(inc => inc.source === src)
      .reduce((sum, inc) => sum + inc.amount, 0)
    return acc
  }, {})

  const maxSourceAmount = Math.max(...Object.values(sourceTotals), 1)

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-emerald-50 dark:from-gray-900 dark:to-gray-800 pt-20 px-4 pb-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-5xl font-bold text-gray-900 dark:text-white mb-4 bg-gradient-to-r from-emerald-600 to-green-600 bg-clip-text text-transparent flex items-center gap-3">
            <TrendingUp className="text-emerald-600" size={48} />
            Орлого
          </h1>
          <p className="text-4xl font-bold text-emerald-600 dark:text-emerald-400">
            +{total.toLocaleString()}₮
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
              className="px-4 py-3 rounded-xl border-2 border-gray-200 dark:border-gray-600 dark:bg-gray-700 dark:text-white focus:ring-2 focus:ring-emerald-500 focus:border-transparent outline-none"
              required
            />
            <input
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="Дүн..."
              className="px-4 py-3 rounded-xl border-2 border-gray-200 dark:border-gray-600 dark:bg-gray-700 dark:text-white focus:ring-2 focus:ring-emerald-500 focus:border-transparent outline-none"
              required
            />
            <select
              value={source}
              onChange={(e) => setSource(e.target.value)}
              className="px-4 py-3 rounded-xl border-2 border-gray-200 dark:border-gray-600 dark:bg-gray-700 dark:text-white focus:ring-2 focus:ring-emerald-500 outline-none"
            >
              {sources.map(src => (
                <option key={src} value={src}>{src}</option>
              ))}
            </select>
            <button
              type="submit"
              className="bg-gradient-to-r from-emerald-600 to-green-600 hover:from-emerald-700 hover:to-green-700 text-white py-3 rounded-xl flex items-center justify-center gap-2 transition transform hover:scale-105 shadow-lg font-medium"
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
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Эх үүсвэр:</span>
              <select
                value={filterSource}
                onChange={(e) => setFilterSource(e.target.value)}
                className="px-3 py-1 rounded-lg bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 text-sm border-none outline-none"
              >
                <option value="all">Бүгд</option>
                {sources.map(src => (
                  <option key={src} value={src}>{src}</option>
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
          {/* Source breakdown */}
          <div className="lg:col-span-1">
            <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-lg border border-gray-100 dark:border-gray-700 sticky top-24">
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                <Coins size={24} className="text-emerald-600" />
                Эх үүсвэрээр
              </h3>
              <div className="space-y-3">
                {sources.map(src => {
                  const amount = sourceTotals[src]
                  const percentage = total > 0 ? (amount / total) * 100 : 0
                  const barWidth = total > 0 ? (amount / maxSourceAmount) * 100 : 0

                  if (amount === 0) return null

                  return (
                    <div key={src}>
                      <div className="flex justify-between mb-1">
                        <span className="text-sm font-medium text-gray-700 dark:text-gray-300">{src}</span>
                        <span className="text-sm font-bold text-gray-900 dark:text-white">
                          {amount.toLocaleString()}₮
                        </span>
                      </div>
                      <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                        <div
                          className="h-full bg-gradient-to-r from-emerald-500 to-green-500 rounded-full transition-all duration-500"
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

          {/* Incomes list */}
          <div className="lg:col-span-2">
            <div className="space-y-3">
              {filteredIncomes.length === 0 ? (
                <div className="text-center py-16 bg-white dark:bg-gray-800 rounded-2xl shadow-md">
                  <Coins className="w-20 h-20 text-gray-300 dark:text-gray-600 mx-auto mb-4" />
                  <p className="text-gray-500 dark:text-gray-400 text-xl font-medium">
                    Орлого олдсонгүй
                  </p>
                </div>
              ) : (
                filteredIncomes.map((income) => (
                  <div
                    key={income.id}
                    className="bg-white dark:bg-gray-800 p-5 rounded-2xl shadow-md hover:shadow-xl transition-all transform hover:scale-[1.01] border border-gray-100 dark:border-gray-700"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <span className="px-3 py-1 bg-emerald-100 dark:bg-emerald-900/20 text-emerald-600 dark:text-emerald-400 text-sm rounded-lg font-medium">
                            {income.source}
                          </span>
                          <span className="text-sm text-gray-500 dark:text-gray-400">
                            {new Date(income.date).toLocaleDateString('mn-MN', {
                              month: 'short',
                              day: 'numeric',
                              year: 'numeric'
                            })}
                          </span>
                        </div>
                        <p className="text-lg font-medium text-gray-900 dark:text-white">{income.description}</p>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className="text-2xl font-bold text-emerald-600 dark:text-emerald-400">
                          +{income.amount.toLocaleString()}₮
                        </span>
                        <button
                          onClick={() => handleEdit(income)}
                          className="text-blue-500 hover:text-blue-700 p-2 rounded-lg hover:bg-blue-50 dark:hover:bg-blue-900/20 transition"
                        >
                          <Edit2 size={18} />
                        </button>
                        <button
                          onClick={() => deleteIncome(income.id)}
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