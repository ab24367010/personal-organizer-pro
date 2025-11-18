import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import useStore from './store/useStore'
import Login from './components/auth/Login'
import Register from './components/auth/Register'
import BurgerMenu from './components/layout/BurgerMenu'
import Todos from './components/features/Todos'
import Habits from './components/features/Habits'
import Expenses from './components/features/Expenses'
import Incomes from './components/features/Incomes'
import Timesheet from './components/features/Timesheet'
import Statistics from './components/features/Statistics'
import Badges from './components/features/Badges'
import Settings from './components/features/Settings'
import About from './components/features/About'

function ProtectedRoute({ children }) {
  const isAuthenticated = useStore((state) => state.isAuthenticated)
  return isAuthenticated ? children : <Navigate to="/login" />
}

export default function App() {
  const darkMode = useStore((state) => state.darkMode)

  return (
    <div className={darkMode ? 'dark' : ''}>
      <BrowserRouter>
        <Routes>
          {/* Public routes */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          
          {/* Protected routes */}
          <Route
            path="/todos"
            element={
              <ProtectedRoute>
                <BurgerMenu />
                <Todos />
              </ProtectedRoute>
            }
          />
          
          <Route
            path="/habits"
            element={
              <ProtectedRoute>
                <BurgerMenu />
                <Habits />
              </ProtectedRoute>
            }
          />
          
          <Route
            path="/expenses"
            element={
              <ProtectedRoute>
                <BurgerMenu />
                <Expenses />
              </ProtectedRoute>
            }
          />
          
          <Route
            path="/incomes"
            element={
              <ProtectedRoute>
                <BurgerMenu />
                <Incomes />
              </ProtectedRoute>
            }
          />
          
          <Route
            path="/timesheet"
            element={
              <ProtectedRoute>
                <BurgerMenu />
                <Timesheet />
              </ProtectedRoute>
            }
          />
          
          <Route
            path="/statistics"
            element={
              <ProtectedRoute>
                <BurgerMenu />
                <Statistics />
              </ProtectedRoute>
            }
          />
          
          <Route
            path="/badges"
            element={
              <ProtectedRoute>
                <BurgerMenu />
                <Badges />
              </ProtectedRoute>
            }
          />
          
          <Route
            path="/settings"
            element={
              <ProtectedRoute>
                <BurgerMenu />
                <Settings />
              </ProtectedRoute>
            }
          />
          
          <Route
            path="/about"
            element={
              <ProtectedRoute>
                <BurgerMenu />
                <About />
              </ProtectedRoute>
            }
          />
          
          {/* Default redirect */}
          <Route path="/" element={<Navigate to="/login" />} />
          <Route path="*" element={<Navigate to="/login" />} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}
