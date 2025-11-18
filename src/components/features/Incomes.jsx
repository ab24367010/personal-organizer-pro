import { useState } from 'react'
import { Plus, Trash2, Coins, TrendingUp } from 'lucide-react'
import useStore from '../../store/useStore'

export default function Incomes() {
  const [description, setDescription] = useState('')
  const [amount, setAmount] = useState('')
  const [source, setSource] = useState('Цалин')
  const { incomes, addIncome } = useStore()

  const sources = ['Цалин', 'Бизнес', 'Хөрөнгө оруулалт', 'Бусад']

  const handleAdd = (e) => {
    e.preventDefault()
    if (description.trim() && amount) {
      addIncome({ description, amount: parseFloat(amount), source })
      setDescription('')
      setAmount('')
    }
  }

  const total = incomes.reduce((sum, inc) => sum + inc.amount, 0)

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pt-20 px-4 pb-8">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white flex items-center gap-3">
            <TrendingUp className="text-emerald-600" />
            Орлого
          </h1>
          <p className="text-3xl font-bold text-emerald-600 dark:text-emerald-400 mt-2">
            +{total.toLocaleString()}₮
          </p>
        </div>

        <form onSubmit={handleAdd} className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md mb-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
            <input
              type="text"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Тайлбар..."
              className="px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white focus:ring-2 focus:ring-emerald-500 outline-none"
              required
            />
            <input
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="Дүн..."
              className="px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white focus:ring-2 focus:ring-emerald-500 outline-none"
              required
            />
            <select
              value={source}
              onChange={(e) => setSource(e.target.value)}
              className="px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white focus:ring-2 focus:ring-emerald-500 outline-none"
            >
              {sources.map(src => (
                <option key={src} value={src}>{src}</option>
              ))}
            </select>
          </div>
          <button
            type="submit"
            className="w-full bg-emerald-600 hover:bg-emerald-700 text-white py-3 rounded-lg flex items-center justify-center gap-2 transition transform hover:scale-105 shadow-lg"
          >
            <Plus size={20} />
            Орлого нэмэх
          </button>
        </form>

        <div className="space-y-3">
          {incomes.length === 0 ? (
            <div className="text-center py-12 bg-white dark:bg-gray-800 rounded-lg">
              <Coins className="w-16 h-16 text-gray-300 dark:text-gray-600 mx-auto mb-4" />
              <p className="text-gray-500 dark:text-gray-400 text-lg">
                Орлого бүртгэгдээгүй байна
              </p>
            </div>
          ) : (
            incomes.map((income) => (
              <div
                key={income.id}
                className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md flex items-center justify-between hover:shadow-lg transition"
              >
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="px-2 py-1 bg-emerald-100 dark:bg-emerald-900/20 text-emerald-600 dark:text-emerald-400 text-xs rounded-full">
                      {income.source}
                    </span>
                  </div>
                  <p className="text-gray-900 dark:text-white font-medium">{income.description}</p>
                  <p className="text-gray-500 dark:text-gray-400 text-sm">
                    {new Date(income.date).toLocaleDateString('mn-MN')}
                  </p>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-xl font-bold text-emerald-600 dark:text-emerald-400">
                    +{income.amount.toLocaleString()}₮
                  </span>
                  <button className="text-red-500 hover:text-red-700 p-2 rounded-lg hover:bg-red-50 dark:hover:bg-red-900/20 transition">
                    <Trash2 size={20} />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  )
}
