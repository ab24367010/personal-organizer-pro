import { useState } from 'react'
import { Plus, Trash2, Check, Circle } from 'lucide-react'
import useStore from '../../store/useStore'

export default function Todos() {
  const [newTodo, setNewTodo] = useState('')
  const { todos, addTodo, toggleTodo, deleteTodo, addPoints } = useStore()

  const handleAdd = (e) => {
    e.preventDefault()
    if (newTodo.trim()) {
      addTodo({ text: newTodo })
      setNewTodo('')
    }
  }

  const handleToggle = (id) => {
    const todo = todos.find(t => t.id === id)
    if (!todo.completed) {
      addPoints(10)
    }
    toggleTodo(id)
  }

  const completedCount = todos.filter(t => t.completed).length

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pt-20 px-4 pb-8">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white">
            Хийх ажлууд
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-2">
            {completedCount} / {todos.length} дууссан
          </p>
        </div>

        <form onSubmit={handleAdd} className="flex gap-2 mb-6">
          <input
            type="text"
            value={newTodo}
            onChange={(e) => setNewTodo(e.target.value)}
            placeholder="Шинэ ажил нэмэх..."
            className="flex-1 px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 dark:bg-gray-800 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none transition"
          />
          <button
            type="submit"
            className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg flex items-center gap-2 transition transform hover:scale-105 shadow-lg"
          >
            <Plus size={20} />
            Нэмэх
          </button>
        </form>

        <div className="space-y-3">
          {todos.length === 0 ? (
            <div className="text-center py-12">
              <Circle className="w-16 h-16 text-gray-300 dark:text-gray-600 mx-auto mb-4" />
              <p className="text-gray-500 dark:text-gray-400 text-lg">
                Одоогоор ажил алга байна
              </p>
              <p className="text-gray-400 dark:text-gray-500 text-sm mt-2">
                Эхний ажлаа нэмээд эхлээрэй! 🚀
              </p>
            </div>
          ) : (
            todos.map((todo) => (
              <div
                key={todo.id}
                className={`bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md hover:shadow-lg transition flex items-center justify-between ${
                  todo.completed ? 'opacity-60' : ''
                }`}
              >
                <div className="flex items-center gap-3 flex-1">
                  <button 
                    onClick={() => handleToggle(todo.id)}
                    className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition ${
                      todo.completed 
                        ? 'bg-green-500 border-green-500' 
                        : 'border-gray-300 dark:border-gray-600 hover:border-blue-500'
                    }`}
                  >
                    {todo.completed && <Check size={16} className="text-white" />}
                  </button>
                  <span className={`text-gray-900 dark:text-white ${todo.completed ? 'line-through' : ''}`}>
                    {todo.text}
                  </span>
                  {!todo.completed && (
                    <span className="text-xs bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-300 px-2 py-1 rounded-full">
                      +10 оноо
                    </span>
                  )}
                </div>
                <button 
                  onClick={() => deleteTodo(todo.id)}
                  className="text-red-500 hover:text-red-700 p-2 rounded-lg hover:bg-red-50 dark:hover:bg-red-900/20 transition"
                >
                  <Trash2 size={20} />
                </button>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  )
}
