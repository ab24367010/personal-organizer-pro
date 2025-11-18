import { useState } from 'react'
import { Plus, Trash2, Check, Circle, Star, Clock, Filter, Calendar } from 'lucide-react'
import useStore from '../../store/useStore'

export default function Todos() {
    const [newTodo, setNewTodo] = useState('')
    const [priority, setPriority] = useState('medium')
    const [dueDate, setDueDate] = useState('')
    const [filter, setFilter] = useState('all')
    const [sortBy, setSortBy] = useState('date')
    const { todos, addTodo, toggleTodo, deleteTodo, addPoints } = useStore()

    const handleAdd = (e) => {
        e.preventDefault()
        if (newTodo.trim()) {
            addTodo({
                text: newTodo,
                priority,
                dueDate: dueDate || null
            })
            setNewTodo('')
            setDueDate('')
            setPriority('medium')
        }
    }

    const handleToggle = (id) => {
        const todo = todos.find(t => t.id === id)
        if (!todo.completed) {
            const points = todo.priority === 'high' ? 15 : todo.priority === 'medium' ? 10 : 5
            addPoints(points)
        }
        toggleTodo(id)
    }

    const filteredTodos = todos.filter(todo => {
        if (filter === 'active') return !todo.completed
        if (filter === 'completed') return todo.completed
        if (filter === 'high') return todo.priority === 'high'
        return true
    })

    const sortedTodos = [...filteredTodos].sort((a, b) => {
        if (sortBy === 'priority') {
            const priorityOrder = { high: 0, medium: 1, low: 2 }
            return priorityOrder[a.priority] - priorityOrder[b.priority]
        }
        if (sortBy === 'dueDate') {
            if (!a.dueDate) return 1
            if (!b.dueDate) return -1
            return new Date(a.dueDate) - new Date(b.dueDate)
        }
        return new Date(b.createdAt) - new Date(a.createdAt)
    })

    const completedCount = todos.filter(t => t.completed).length
    const highPriorityCount = todos.filter(t => !t.completed && t.priority === 'high').length

    const priorityColors = {
        high: 'border-red-500 bg-red-50 dark:bg-red-900/20',
        medium: 'border-yellow-500 bg-yellow-50 dark:bg-yellow-900/20',
        low: 'border-green-500 bg-green-50 dark:bg-green-900/20'
    }

    const priorityLabels = {
        high: { text: 'Яаралтай', color: 'text-red-600 dark:text-red-400' },
        medium: { text: 'Дунд', color: 'text-yellow-600 dark:text-yellow-400' },
        low: { text: 'Бага', color: 'text-green-600 dark:text-green-400' }
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 dark:from-gray-900 dark:to-gray-800 pt-20 px-4 pb-8">
            <div className="max-w-5xl mx-auto">
                {/* Header with stats */}
                <div className="mb-8">
                    <h1 className="text-5xl font-bold text-gray-900 dark:text-white mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                        Хийх ажлууд
                    </h1>
                    <div className="flex flex-wrap gap-4">
                        <div className="bg-white dark:bg-gray-800 px-4 py-2 rounded-xl shadow-md">
                            <span className="text-gray-600 dark:text-gray-400 text-sm">Нийт:</span>
                            <span className="ml-2 text-xl font-bold text-blue-600">{todos.length}</span>
                        </div>
                        <div className="bg-white dark:bg-gray-800 px-4 py-2 rounded-xl shadow-md">
                            <span className="text-gray-600 dark:text-gray-400 text-sm">Дууссан:</span>
                            <span className="ml-2 text-xl font-bold text-green-600">{completedCount}</span>
                        </div>
                        <div className="bg-white dark:bg-gray-800 px-4 py-2 rounded-xl shadow-md">
                            <span className="text-gray-600 dark:text-gray-400 text-sm">Үлдсэн:</span>
                            <span className="ml-2 text-xl font-bold text-orange-600">{todos.length - completedCount}</span>
                        </div>
                        {highPriorityCount > 0 && (
                            <div className="bg-red-100 dark:bg-red-900/20 px-4 py-2 rounded-xl shadow-md border-2 border-red-500">
                                <span className="text-red-600 dark:text-red-400 text-sm font-medium">Яаралтай:</span>
                                <span className="ml-2 text-xl font-bold text-red-600 dark:text-red-400">{highPriorityCount}</span>
                            </div>
                        )}
                    </div>
                </div>

                {/* Add todo form */}
                <form onSubmit={handleAdd} className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-xl mb-6 border border-gray-100 dark:border-gray-700">
                    <div className="space-y-4">
                        <div>
                            <input
                                type="text"
                                value={newTodo}
                                onChange={(e) => setNewTodo(e.target.value)}
                                placeholder="Шинэ ажил нэмэх..."
                                className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 dark:border-gray-600 dark:bg-gray-700 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
                            />
                        </div>
                        <div className="flex flex-wrap gap-3">
                            <div className="flex-1 min-w-[200px]">
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                    Ач холбогдол
                                </label>
                                <select
                                    value={priority}
                                    onChange={(e) => setPriority(e.target.value)}
                                    className="w-full px-4 py-2 rounded-xl border-2 border-gray-200 dark:border-gray-600 dark:bg-gray-700 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none"
                                >
                                    <option value="low">🟢 Бага</option>
                                    <option value="medium">🟡 Дунд</option>
                                    <option value="high">🔴 Яаралтай</option>
                                </select>
                            </div>
                            <div className="flex-1 min-w-[200px]">
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                    Дуусах хугацаа
                                </label>
                                <input
                                    type="date"
                                    value={dueDate}
                                    onChange={(e) => setDueDate(e.target.value)}
                                    className="w-full px-4 py-2 rounded-xl border-2 border-gray-200 dark:border-gray-600 dark:bg-gray-700 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none"
                                />
                            </div>
                            <div className="flex items-end">
                                <button
                                    type="submit"
                                    className="px-8 py-2 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white rounded-xl flex items-center gap-2 transition transform hover:scale-105 shadow-lg font-medium"
                                >
                                    <Plus size={20} />
                                    Нэмэх
                                </button>
                            </div>
                        </div>
                    </div>
                </form>

                {/* Filters and sorting */}
                <div className="bg-white dark:bg-gray-800 p-4 rounded-2xl shadow-md mb-6 border border-gray-100 dark:border-gray-700">
                    <div className="flex flex-wrap gap-4 items-center">
                        <div className="flex items-center gap-2">
                            <Filter size={20} className="text-gray-600 dark:text-gray-400" />
                            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Шүүлт:</span>
                            <div className="flex gap-2">
                                {['all', 'active', 'completed', 'high'].map(f => (
                                    <button
                                        key={f}
                                        onClick={() => setFilter(f)}
                                        className={`px-3 py-1 rounded-lg text-sm font-medium transition ${filter === f
                                                ? 'bg-blue-600 text-white'
                                                : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                                            }`}
                                    >
                                        {f === 'all' ? 'Бүгд' : f === 'active' ? 'Идэвхтэй' : f === 'completed' ? 'Дууссан' : 'Яаралтай'}
                                    </button>
                                ))}
                            </div>
                        </div>
                        <div className="flex items-center gap-2 ml-auto">
                            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Эрэмбэлэх:</span>
                            <select
                                value={sortBy}
                                onChange={(e) => setSortBy(e.target.value)}
                                className="px-3 py-1 rounded-lg bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 text-sm font-medium border-none outline-none cursor-pointer"
                            >
                                <option value="date">Огноо</option>
                                <option value="priority">Ач холбогдол</option>
                                <option value="dueDate">Дуусах хугацаа</option>
                            </select>
                        </div>
                    </div>
                </div>

                {/* Todos list */}
                <div className="space-y-3">
                    {sortedTodos.length === 0 ? (
                        <div className="text-center py-16 bg-white dark:bg-gray-800 rounded-2xl shadow-md">
                            <Circle className="w-20 h-20 text-gray-300 dark:text-gray-600 mx-auto mb-4" />
                            <p className="text-gray-500 dark:text-gray-400 text-xl font-medium">
                                {filter === 'all' ? 'Ажил олдсонгүй' : 'Энэ төрлийн ажил олдсонгүй'}
                            </p>
                            <p className="text-gray-400 dark:text-gray-500 text-sm mt-2">
                                Эхний ажлаа нэмээд эхлээрэй! 🚀
                            </p>
                        </div>
                    ) : (
                        sortedTodos.map((todo) => {
                            const isOverdue = todo.dueDate && new Date(todo.dueDate) < new Date() && !todo.completed
                            return (
                                <div
                                    key={todo.id}
                                    className={`bg-white dark:bg-gray-800 p-5 rounded-2xl shadow-md hover:shadow-xl transition-all transform hover:scale-[1.01] border-l-4 ${priorityColors[todo.priority]
                                        } ${todo.completed ? 'opacity-60' : ''} ${isOverdue ? 'border-red-600' : ''}`}
                                >
                                    <div className="flex items-start gap-4">
                                        <button
                                            onClick={() => handleToggle(todo.id)}
                                            className={`mt-1 w-6 h-6 rounded-full border-2 flex items-center justify-center flex-shrink-0 transition-all ${todo.completed
                                                    ? 'bg-gradient-to-r from-green-500 to-emerald-500 border-green-500 shadow-lg'
                                                    : 'border-gray-300 dark:border-gray-600 hover:border-blue-500 hover:scale-110'
                                                }`}
                                        >
                                            {todo.completed && <Check size={16} className="text-white" />}
                                        </button>

                                        <div className="flex-1">
                                            <div className="flex items-start justify-between gap-3 mb-2">
                                                <h3 className={`text-lg font-medium text-gray-900 dark:text-white ${todo.completed ? 'line-through' : ''
                                                    }`}>
                                                    {todo.text}
                                                </h3>
                                                <button
                                                    onClick={() => deleteTodo(todo.id)}
                                                    className="text-red-500 hover:text-red-700 p-2 rounded-lg hover:bg-red-50 dark:hover:bg-red-900/20 transition flex-shrink-0"
                                                >
                                                    <Trash2 size={18} />
                                                </button>
                                            </div>

                                            <div className="flex flex-wrap gap-2 items-center">
                                                <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-lg text-xs font-medium ${priorityColors[todo.priority]
                                                    } ${priorityLabels[todo.priority].color}`}>
                                                    <Star size={12} />
                                                    {priorityLabels[todo.priority].text}
                                                </span>

                                                {todo.dueDate && (
                                                    <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-lg text-xs font-medium ${isOverdue
                                                            ? 'bg-red-100 dark:bg-red-900/20 text-red-600 dark:text-red-400'
                                                            : 'bg-blue-100 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400'
                                                        }`}>
                                                        <Calendar size={12} />
                                                        {new Date(todo.dueDate).toLocaleDateString('mn-MN')}
                                                        {isOverdue && ' (хугацаа хэтэрсэн)'}
                                                    </span>
                                                )}

                                                {!todo.completed && (
                                                    <span className="inline-flex items-center gap-1 px-2 py-1 rounded-lg text-xs font-medium bg-purple-100 dark:bg-purple-900/20 text-purple-600 dark:text-purple-400">
                                                        +{todo.priority === 'high' ? 15 : todo.priority === 'medium' ? 10 : 5} оноо
                                                    </span>
                                                )}

                                                <span className="inline-flex items-center gap-1 px-2 py-1 text-xs text-gray-500 dark:text-gray-400">
                                                    <Clock size={12} />
                                                    {new Date(todo.createdAt).toLocaleDateString('mn-MN')}
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )
                        })
                    )}
                </div>
            </div>
        </div>
    )
}