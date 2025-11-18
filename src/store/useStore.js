import { create } from 'zustand'
import { persist } from 'zustand/middleware'

const useStore = create(
  persist(
    (set) => ({
      // Хэрэглэгчийн мэдээлэл
      user: null,
      isAuthenticated: false,
      darkMode: false,
      userPoints: 0,
      userLevel: 1,
      badges: [],

      // Todos
      todos: [],
      addTodo: (todo) => set((state) => ({ 
        todos: [...state.todos, { id: Date.now(), completed: false, createdAt: new Date().toISOString(), ...todo }] 
      })),
      toggleTodo: (id) => set((state) => ({
        todos: state.todos.map(todo => 
          todo.id === id ? { ...todo, completed: !todo.completed } : todo
        )
      })),
      deleteTodo: (id) => set((state) => ({
        todos: state.todos.filter(todo => todo.id !== id)
      })),

      // Habits
      habits: [],
      addHabit: (habit) => set((state) => ({
        habits: [...state.habits, { id: Date.now(), streak: 0, ...habit }]
      })),

      // Expenses
      expenses: [],
      addExpense: (expense) => set((state) => ({
        expenses: [...state.expenses, { id: Date.now(), date: new Date().toISOString(), ...expense }]
      })),

      // Incomes
      incomes: [],
      addIncome: (income) => set((state) => ({
        incomes: [...state.incomes, { id: Date.now(), date: new Date().toISOString(), ...income }]
      })),
      
      // Нэвтрэх
      login: (userData) => set({ 
        user: userData, 
        isAuthenticated: true 
      }),
      
      // Гарах
      logout: () => set({ 
        user: null, 
        isAuthenticated: false 
      }),
      
      // Dark Mode
      toggleDarkMode: () => set((state) => ({ 
        darkMode: !state.darkMode 
      })),

      // Оноо нэмэх
      addPoints: (points) => set((state) => {
        const newPoints = state.userPoints + points
        const newLevel = Math.floor(newPoints / 100) + 1
        return { userPoints: newPoints, userLevel: newLevel }
      }),
    }),
    {
      name: 'organizer-storage',
    }
  )
)

export default useStore
