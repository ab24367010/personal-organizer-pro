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
      notifications: [],

      // Todos
      todos: [],
      addTodo: (todo) => set((state) => ({
        todos: [...state.todos, {
          id: Date.now(),
          completed: false,
          createdAt: new Date().toISOString(),
          priority: 'medium',
          dueDate: null,
          ...todo
        }]
      })),
      toggleTodo: (id) => set((state) => ({
        todos: state.todos.map(todo =>
          todo.id === id ? { ...todo, completed: !todo.completed } : todo
        )
      })),
      deleteTodo: (id) => set((state) => ({
        todos: state.todos.filter(todo => todo.id !== id)
      })),
      updateTodo: (id, updates) => set((state) => ({
        todos: state.todos.map(todo =>
          todo.id === id ? { ...todo, ...updates } : todo
        )
      })),

      // Habits
      habits: [],
      addHabit: (habit) => set((state) => ({
        habits: [...state.habits, {
          id: Date.now(),
          streak: 0,
          lastCompleted: null,
          history: [],
          frequency: 'daily',
          ...habit
        }]
      })),
      deleteHabit: (id) => set((state) => ({
        habits: state.habits.filter(habit => habit.id !== id)
      })),
      incrementHabitStreak: (id) => set((state) => {
        const today = new Date().toISOString().split('T')[0]
        return {
          habits: state.habits.map(habit => {
            if (habit.id === id) {
              const history = habit.history || []
              // Check if already completed today
              if (history.includes(today)) {
                return habit
              }
              return {
                ...habit,
                streak: habit.streak + 1,
                lastCompleted: new Date().toISOString(),
                history: [...history, today]
              }
            }
            return habit
          })
        }
      }),

      // Expenses
      expenses: [],
      addExpense: (expense) => set((state) => ({
        expenses: [...state.expenses, {
          id: Date.now(),
          date: new Date().toISOString(),
          ...expense
        }]
      })),
      deleteExpense: (id) => set((state) => ({
        expenses: state.expenses.filter(exp => exp.id !== id)
      })),
      updateExpense: (id, updates) => set((state) => ({
        expenses: state.expenses.map(exp =>
          exp.id === id ? { ...exp, ...updates } : exp
        )
      })),

      // Incomes
      incomes: [],
      addIncome: (income) => set((state) => ({
        incomes: [...state.incomes, {
          id: Date.now(),
          date: new Date().toISOString(),
          ...income
        }]
      })),
      deleteIncome: (id) => set((state) => ({
        incomes: state.incomes.filter(inc => inc.id !== id)
      })),
      updateIncome: (id, updates) => set((state) => ({
        incomes: state.incomes.map(inc =>
          inc.id === id ? { ...inc, ...updates } : inc
        )
      })),

      // Authentication
      login: (userData) => set({
        user: userData,
        isAuthenticated: true
      }),

      logout: () => set({
        user: null,
        isAuthenticated: false
      }),

      updateProfile: (updates) => set((state) => ({
        user: { ...state.user, ...updates }
      })),

      // Dark Mode
      toggleDarkMode: () => set((state) => ({
        darkMode: !state.darkMode
      })),

      // Points and Levels
      addPoints: (points) => set((state) => {
        const newPoints = state.userPoints + points
        const newLevel = Math.floor(newPoints / 100) + 1

        // Check for level up
        const leveledUp = newLevel > state.userLevel

        if (leveledUp) {
          // Add notification for level up
          const notification = {
            id: Date.now(),
            type: 'success',
            message: `Баяр хүргэе! Түвшин ${newLevel}-д хүрлээ! 🎉`,
            timestamp: new Date().toISOString()
          }
          return {
            userPoints: newPoints,
            userLevel: newLevel,
            notifications: [...state.notifications, notification]
          }
        }

        return { userPoints: newPoints, userLevel: newLevel }
      }),

      // Notifications
      addNotification: (notification) => set((state) => ({
        notifications: [...state.notifications, {
          id: Date.now(),
          timestamp: new Date().toISOString(),
          ...notification
        }]
      })),

      removeNotification: (id) => set((state) => ({
        notifications: state.notifications.filter(n => n.id !== id)
      })),

      clearNotifications: () => set({ notifications: [] }),

      // Badges
      unlockBadge: (badge) => set((state) => {
        if (state.badges.find(b => b.id === badge.id)) {
          return state // Already unlocked
        }

        const notification = {
          id: Date.now(),
          type: 'badge',
          message: `Шинэ шагнал: ${badge.name}! 🏆`,
          timestamp: new Date().toISOString()
        }

        return {
          badges: [...state.badges, { ...badge, unlockedAt: new Date().toISOString() }],
          notifications: [...state.notifications, notification]
        }
      }),

      // Data management
      clearAllData: () => set({
        todos: [],
        habits: [],
        expenses: [],
        incomes: [],
        userPoints: 0,
        userLevel: 1,
        badges: [],
        notifications: []
      }),

      exportData: () => {
        const state = useStore.getState()
        return {
          todos: state.todos,
          habits: state.habits,
          expenses: state.expenses,
          incomes: state.incomes,
          userPoints: state.userPoints,
          userLevel: state.userLevel,
          badges: state.badges,
          exportedAt: new Date().toISOString()
        }
      },

      importData: (data) => set({
        todos: data.todos || [],
        habits: data.habits || [],
        expenses: data.expenses || [],
        incomes: data.incomes || [],
        userPoints: data.userPoints || 0,
        userLevel: data.userLevel || 1,
        badges: data.badges || []
      }),
    }),
    {
      name: 'organizer-storage',
      partialize: (state) => ({
        user: state.user,
        isAuthenticated: state.isAuthenticated,
        darkMode: state.darkMode,
        userPoints: state.userPoints,
        userLevel: state.userLevel,
        badges: state.badges,
        todos: state.todos,
        habits: state.habits,
        expenses: state.expenses,
        incomes: state.incomes,
      }),
    }
  )
)

export default useStore