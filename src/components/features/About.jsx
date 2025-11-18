import { Info, Heart, Github, Mail, Star, Award, Sparkles } from 'lucide-react'

export default function About() {
  const features = [
    { icon: '📝', title: 'Хийх ажлууд', desc: 'Priority, due date, filtering', color: 'from-blue-500 to-purple-500' },
    { icon: '💪', title: 'Дадал зуршил', desc: 'Streak tracking, history, motivation', color: 'from-green-500 to-emerald-500' },
    { icon: '💸', title: 'Зарлага', desc: 'Category breakdown, charts, export', color: 'from-red-500 to-pink-500' },
    { icon: '💰', title: 'Орлого', desc: 'Source tracking, analytics, reports', color: 'from-emerald-500 to-green-500' },
    { icon: '📊', title: 'Статистик', desc: 'Visual charts, insights, progress', color: 'from-orange-500 to-yellow-500' },
    { icon: '🏆', title: 'Шагнал', desc: 'Achievements, badges, gamification', color: 'from-yellow-500 to-orange-500' },
  ]

  const technologies = [
    { name: 'React 19', icon: '⚛️', color: 'text-blue-500' },
    { name: 'Vite', icon: '⚡', color: 'text-purple-500' },
    { name: 'Tailwind CSS', icon: '🎨', color: 'text-cyan-500' },
    { name: 'Zustand', icon: '🐻', color: 'text-green-500' },
    { name: 'React Router', icon: '🛣️', color: 'text-red-500' },
    { name: 'Lucide Icons', icon: '🎯', color: 'text-orange-500' },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 pt-20 px-4 pb-8">
      <div className="max-w-5xl mx-auto">
        {/* Hero section */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-24 h-24 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 rounded-3xl mb-6 shadow-2xl transform hover:scale-110 transition">
            <span className="text-5xl font-bold text-white">PO</span>
          </div>
          <h1 className="text-6xl font-bold text-gray-900 dark:text-white mb-3 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
            Personal Organizer Pro
          </h1>
          <div className="flex items-center justify-center gap-2 text-gray-600 dark:text-gray-400 mb-4">
            <Sparkles size={20} className="text-yellow-500" />
            <p className="text-xl">Хувилбар 2.0.0 - Professional Edition</p>
            <Sparkles size={20} className="text-yellow-500" />
          </div>
        </div>

        {/* Description */}
        <div className="bg-white dark:bg-gray-800 p-8 rounded-3xl shadow-xl mb-8 border border-gray-100 dark:border-gray-700">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-3 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-xl">
              <Info className="w-6 h-6 text-white" />
            </div>
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
              Тухай
            </h2>
          </div>
          <p className="text-gray-600 dark:text-gray-400 leading-relaxed text-lg">
            Personal Organizer Pro нь таны өдөр тутмын ажлуудыг зохион байгуулах,
            дадал зуршлаа хянах, санхүүгээ удирдах боломжийг олгодог мэргэжлийн түвшний
            бүрэн функцтэй аппликейшн юм. Орчин үеийн дизайн, хэрэглэхэд хялбар,
            олон төрлийн функцүүдтэй.
          </p>
        </div>

        {/* Features grid */}
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-3">
            <Award className="text-blue-600" />
            Онцлог шинж чанарууд
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, index) => (
              <div
                key={index}
                className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all transform hover:scale-105 border border-gray-100 dark:border-gray-700"
              >
                <div className={`inline-flex p-4 bg-gradient-to-r ${feature.color} rounded-2xl mb-4 text-4xl shadow-lg`}>
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                  {feature.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm">
                  {feature.desc}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Technologies */}
        <div className="bg-white dark:bg-gray-800 p-8 rounded-3xl shadow-xl mb-8 border border-gray-100 dark:border-gray-700">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-3">
            <Star className="text-yellow-500" />
            Технологи
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {technologies.map((tech, index) => (
              <div
                key={index}
                className="flex items-center gap-3 p-4 bg-gray-50 dark:bg-gray-700/50 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-700 transition"
              >
                <span className="text-3xl">{tech.icon}</span>
                <span className={`font-bold ${tech.color}`}>{tech.name}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-6 rounded-2xl shadow-xl text-white text-center">
            <p className="text-5xl font-bold mb-2">6+</p>
            <p className="text-white/90">Гол функц</p>
          </div>
          <div className="bg-gradient-to-r from-green-600 to-emerald-600 p-6 rounded-2xl shadow-xl text-white text-center">
            <p className="text-5xl font-bold mb-2">∞</p>
            <p className="text-white/90">Өгөгдөл хадгалах</p>
          </div>
          <div className="bg-gradient-to-r from-orange-600 to-red-600 p-6 rounded-2xl shadow-xl text-white text-center">
            <p className="text-5xl font-bold mb-2">100%</p>
            <p className="text-white/90">Үнэгүй</p>
          </div>
        </div>

        {/* Footer */}
        <div className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 p-8 rounded-3xl shadow-2xl text-white text-center">
          <div className="flex items-center justify-center gap-2 mb-4">
            <p className="text-xl">Хайраар хийгдсэн</p>
            <Heart className="text-red-300 fill-current animate-pulse" size={24} />
          </div>
          <p className="text-white/80 text-lg mb-6">
            Таны амжилтанд туслах хамгийн сайн утга
          </p>
          <div className="flex items-center justify-center gap-6">
            <button className="p-3 bg-white/20 hover:bg-white/30 rounded-xl transition">
              <Github className="w-6 h-6" />
            </button>
            <button className="p-3 bg-white/20 hover:bg-white/30 rounded-xl transition">
              <Mail className="w-6 h-6" />
            </button>
          </div>
          <p className="text-white/60 text-sm mt-6">
            © 2025 Personal Organizer Pro. Бүх эрх хуулиар хамгаалагдсан.
          </p>
        </div>
      </div>
    </div>
  )
}