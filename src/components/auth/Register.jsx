import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import useStore from '../../store/useStore'
import { UserPlus, Mail, Lock, User, Eye, EyeOff, CheckCircle2, AlertCircle, Sparkles, Check, X, Loader2 } from 'lucide-react'

export default function Register() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  })
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [errors, setErrors] = useState({})
  const [isLoading, setIsLoading] = useState(false)
  const [acceptTerms, setAcceptTerms] = useState(false)
  const login = useStore((state) => state.login)
  const navigate = useNavigate()

  const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)

  const getPasswordStrength = (password) => {
    let strength = 0
    if (password.length >= 6) strength++
    if (password.length >= 10) strength++
    if (/[a-z]/.test(password) && /[A-Z]/.test(password)) strength++
    if (/\d/.test(password)) strength++
    if (/[^a-zA-Z0-9]/.test(password)) strength++
    return strength
  }

  const passwordStrength = getPasswordStrength(formData.password)
  const strengthLabels = ['', 'Сул', 'Дунд', 'Сайн', 'Хүчтэй', 'Маш хүчтэй']
  const strengthColors = ['', 'bg-red-500', 'bg-orange-500', 'bg-yellow-500', 'bg-blue-500', 'bg-green-500']

  const passwordRequirements = [
    { label: 'Багадаа 6 тэмдэгт', met: formData.password.length >= 6 },
    { label: 'Том жижиг үсэг', met: /[a-z]/.test(formData.password) && /[A-Z]/.test(formData.password) },
    { label: 'Тоо агуулсан', met: /\d/.test(formData.password) },
    { label: 'Тусгай тэмдэгт', met: /[^a-zA-Z0-9]/.test(formData.password) }
  ]

  // Mock existing users - Жинхэнэ backend дээр энэ хэсэг байхгүй
  const existingUsers = [
    'demo@example.com',
    'admin@example.com',
    'test@test.com'
  ]

  const validateForm = () => {
    const newErrors = {}

    // Name validation
    if (!formData.name.trim()) {
      newErrors.name = 'Нэр шаардлагатай'
    } else if (formData.name.trim().length < 2) {
      newErrors.name = 'Нэр хамгийн багадаа 2 тэмдэгт байх ёстой'
    } else if (formData.name.trim().length > 50) {
      newErrors.name = 'Нэр хэт урт байна'
    } else if (!/^[a-zA-Zа-яА-ЯөӨүҮёЁ\s]+$/.test(formData.name)) {
      newErrors.name = 'Нэр зөвхөн үсэг агуулах ёстой'
    }

    // Email validation
    if (!formData.email) {
      newErrors.email = 'И-мэйл шаардлагатай'
    } else if (!validateEmail(formData.email)) {
      newErrors.email = 'И-мэйл буруу байна'
    } else if (existingUsers.includes(formData.email.toLowerCase())) {
      newErrors.email = 'Энэ и-мэйл бүртгэлтэй байна'
    }

    // Password validation
    if (!formData.password) {
      newErrors.password = 'Нууц үг шаардлагатай'
    } else if (formData.password.length < 6) {
      newErrors.password = 'Нууц үг хамгийн багадаа 6 тэмдэгт байх ёстой'
    } else if (formData.password.length > 50) {
      newErrors.password = 'Нууц үг хэт урт байна'
    } else if (passwordStrength < 2) {
      newErrors.password = 'Нууц үг хангалтгүй хүчтэй байна'
    }

    // Confirm password validation
    if (!formData.confirmPassword) {
      newErrors.confirmPassword = 'Нууц үг баталгаажуулах шаардлагатай'
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Нууц үг таарахгүй байна'
    }

    // Terms validation
    if (!acceptTerms) {
      newErrors.terms = 'Үйлчилгээний нөхцлийг зөвшөөрөх шаардлагатай'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!validateForm()) return

    setIsLoading(true)

    // Simulate API call
    setTimeout(() => {
      // Success - Auto login after registration
      login({
        email: formData.email,
        name: formData.name
      })

      navigate('/todos')
      setIsLoading(false)
    }, 1500)
  }

  const handleChange = (field, value) => {
    setFormData({ ...formData, [field]: value })
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors({ ...errors, [field]: '' })
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-500 via-pink-500 to-red-500 p-4 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-1/2 -left-1/2 w-full h-full bg-white/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-1/2 -right-1/2 w-full h-full bg-white/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
      </div>

      <div className="max-w-md w-full relative z-10">
        {/* Logo & Title */}
        <div className="text-center mb-8 animate-fade-in">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-white rounded-3xl mb-6 shadow-2xl transform hover:scale-110 transition-transform">
            <Sparkles className="w-10 h-10 text-pink-600" />
          </div>
          <h1 className="text-5xl font-bold text-white mb-2 drop-shadow-lg">
            Бүртгүүлэх
          </h1>
          <p className="text-white/90 text-lg">Өөрийн организер үүсгэх</p>
        </div>

        {/* Register Card */}
        <div className="bg-white/95 backdrop-blur-xl rounded-3xl shadow-2xl p-8 border border-white/20 max-h-[85vh] overflow-y-auto">
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Name Input */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Нэр *
              </label>
              <div className="relative">
                <User className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => handleChange('name', e.target.value)}
                  disabled={isLoading}
                  className={`w-full pl-12 pr-12 py-3 rounded-xl border-2 ${errors.name
                      ? 'border-red-500 focus:border-red-500 focus:ring-red-500'
                      : 'border-gray-200 focus:border-pink-500 focus:ring-pink-500'
                    } focus:ring-2 outline-none transition-all disabled:opacity-50`}
                  placeholder="Таны нэр"
                  autoComplete="name"
                />
                {errors.name ? (
                  <AlertCircle className="absolute right-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-red-500" />
                ) : formData.name && !errors.name && (
                  <CheckCircle2 className="absolute right-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-green-500" />
                )}
              </div>
              {errors.name && (
                <p className="mt-2 text-sm text-red-600 flex items-center gap-1 animate-shake">
                  <AlertCircle className="w-4 h-4" />
                  {errors.name}
                </p>
              )}
            </div>

            {/* Email Input */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                И-мэйл хаяг *
              </label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleChange('email', e.target.value.toLowerCase())}
                  disabled={isLoading}
                  className={`w-full pl-12 pr-12 py-3 rounded-xl border-2 ${errors.email
                      ? 'border-red-500 focus:border-red-500 focus:ring-red-500'
                      : 'border-gray-200 focus:border-pink-500 focus:ring-pink-500'
                    } focus:ring-2 outline-none transition-all disabled:opacity-50`}
                  placeholder="example@email.com"
                  autoComplete="email"
                />
                {errors.email ? (
                  <AlertCircle className="absolute right-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-red-500" />
                ) : formData.email && validateEmail(formData.email) && !existingUsers.includes(formData.email) && (
                  <CheckCircle2 className="absolute right-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-green-500" />
                )}
              </div>
              {errors.email && (
                <p className="mt-2 text-sm text-red-600 flex items-center gap-1 animate-shake">
                  <AlertCircle className="w-4 h-4" />
                  {errors.email}
                </p>
              )}
            </div>

            {/* Password Input */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Нууц үг *
              </label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={formData.password}
                  onChange={(e) => handleChange('password', e.target.value)}
                  disabled={isLoading}
                  className={`w-full pl-12 pr-12 py-3 rounded-xl border-2 ${errors.password
                      ? 'border-red-500 focus:border-red-500 focus:ring-red-500'
                      : 'border-gray-200 focus:border-pink-500 focus:ring-pink-500'
                    } focus:ring-2 outline-none transition-all disabled:opacity-50`}
                  placeholder="••••••••"
                  autoComplete="new-password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  disabled={isLoading}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>

              {/* Password Strength */}
              {formData.password && (
                <div className="mt-3">
                  <div className="flex gap-1 mb-2">
                    {[1, 2, 3, 4, 5].map((level) => (
                      <div
                        key={level}
                        className={`h-1 flex-1 rounded-full transition-all ${level <= passwordStrength ? strengthColors[passwordStrength] : 'bg-gray-200'
                          }`}
                      />
                    ))}
                  </div>
                  <p className="text-sm text-gray-600">
                    Хүч: <span className={`font-semibold ${passwordStrength >= 4 ? 'text-green-600' :
                        passwordStrength >= 3 ? 'text-blue-600' :
                          passwordStrength >= 2 ? 'text-yellow-600' : 'text-red-600'
                      }`}>{strengthLabels[passwordStrength]}</span>
                  </p>
                </div>
              )}

              {/* Password Requirements */}
              {formData.password && (
                <div className="mt-3 space-y-1">
                  {passwordRequirements.map((req, index) => (
                    <div key={index} className="flex items-center gap-2 text-sm">
                      {req.met ? (
                        <Check className="w-4 h-4 text-green-500" />
                      ) : (
                        <X className="w-4 h-4 text-gray-300" />
                      )}
                      <span className={req.met ? 'text-green-600' : 'text-gray-500'}>
                        {req.label}
                      </span>
                    </div>
                  ))}
                </div>
              )}

              {errors.password && (
                <p className="mt-2 text-sm text-red-600 flex items-center gap-1 animate-shake">
                  <AlertCircle className="w-4 h-4" />
                  {errors.password}
                </p>
              )}
            </div>

            {/* Confirm Password Input */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Нууц үг баталгаажуулах *
              </label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type={showConfirmPassword ? 'text' : 'password'}
                  value={formData.confirmPassword}
                  onChange={(e) => handleChange('confirmPassword', e.target.value)}
                  disabled={isLoading}
                  className={`w-full pl-12 pr-12 py-3 rounded-xl border-2 ${errors.confirmPassword
                      ? 'border-red-500 focus:border-red-500 focus:ring-red-500'
                      : 'border-gray-200 focus:border-pink-500 focus:ring-pink-500'
                    } focus:ring-2 outline-none transition-all disabled:opacity-50`}
                  placeholder="••••••••"
                  autoComplete="new-password"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  disabled={isLoading}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition"
                >
                  {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
              {formData.confirmPassword && formData.password === formData.confirmPassword && (
                <p className="mt-2 text-sm text-green-600 flex items-center gap-1">
                  <CheckCircle2 className="w-4 h-4" />
                  Нууц үг таарч байна
                </p>
              )}
              {errors.confirmPassword && (
                <p className="mt-2 text-sm text-red-600 flex items-center gap-1 animate-shake">
                  <AlertCircle className="w-4 h-4" />
                  {errors.confirmPassword}
                </p>
              )}
            </div>

            {/* Terms Checkbox */}
            <div>
              <label className="flex items-start cursor-pointer group">
                <input
                  type="checkbox"
                  checked={acceptTerms}
                  onChange={(e) => {
                    setAcceptTerms(e.target.checked)
                    setErrors({ ...errors, terms: '' })
                  }}
                  disabled={isLoading}
                  className="w-5 h-5 rounded text-pink-600 focus:ring-pink-500 focus:ring-2 cursor-pointer mt-0.5 disabled:opacity-50"
                />
                <span className="ml-3 text-sm text-gray-700 group-hover:text-pink-600 transition">
                  Би <button type="button" className="text-pink-600 hover:underline font-semibold">үйлчилгээний нөхцөл</button> болон <button type="button" className="text-pink-600 hover:underline font-semibold">нууцлалын бодлого</button>-тай танилцаж, зөвшөөрч байна
                </span>
              </label>
              {errors.terms && (
                <p className="mt-2 text-sm text-red-600 flex items-center gap-1 animate-shake">
                  <AlertCircle className="w-4 h-4" />
                  {errors.terms}
                </p>
              )}
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-gradient-to-r from-purple-600 via-pink-600 to-red-600 hover:from-purple-700 hover:via-pink-700 hover:to-red-700 text-white font-bold py-4 rounded-xl transition-all transform hover:scale-105 shadow-xl disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center gap-2"
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  Бүртгүүлж байна...
                </>
              ) : (
                <>
                  <UserPlus size={20} />
                  Бүртгүүлэх
                </>
              )}
            </button>
          </form>

          {/* Divider */}
          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-200"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-4 bg-white text-gray-500 font-medium">эсвэл</span>
            </div>
          </div>

          {/* Social Register */}
          <div className="grid grid-cols-2 gap-3">
            <button
              className="flex items-center justify-center gap-2 px-4 py-3 bg-white border-2 border-gray-200 hover:border-gray-300 rounded-xl transition-all transform hover:scale-105 font-medium text-gray-700 disabled:opacity-50"
              disabled={isLoading}
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
              </svg>
              Google
            </button>
            <button
              className="flex items-center justify-center gap-2 px-4 py-3 bg-white border-2 border-gray-200 hover:border-gray-300 rounded-xl transition-all transform hover:scale-105 font-medium text-gray-700 disabled:opacity-50"
              disabled={isLoading}
            >
              <svg className="w-5 h-5" fill="#1877F2" viewBox="0 0 24 24">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
              </svg>
              Facebook
            </button>
          </div>

          {/* Login Link */}
          <p className="mt-6 text-center text-gray-600">
            Бүртгэлтэй юу?{' '}
            <Link
              to="/login"
              className="text-pink-600 hover:text-pink-700 font-bold hover:underline transition"
            >
              Нэвтрэх
            </Link>
          </p>
        </div>

        {/* Footer */}
        <p className="text-center text-white/80 text-sm mt-6">
          © 2025 Personal Organizer Pro. Бүх эрх хуулиар хамгаалагдсан.
        </p>
      </div>

      <style>{`
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          25% { transform: translateX(-5px); }
          75% { transform: translateX(5px); }
        }
        .animate-shake {
          animation: shake 0.3s ease-in-out;
        }
      `}</style>
    </div>
  )
}