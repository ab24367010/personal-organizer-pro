import { Info, Heart, Github, Mail } from 'lucide-react'

export default function About() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pt-20 px-4 pb-8">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white flex items-center gap-3">
            <Info className="text-indigo-600" />
            Тухай
          </h1>
        </div>

        <div className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-md space-y-6">
          <div className="text-center">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full mb-4">
              <span className="text-3xl font-bold text-white">PO</span>
            </div>
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
              Personal Organizer Pro
            </h2>
            <p className="text-gray-600 dark:text-gray-400 mt-2">
              Хувилбар 1.0.0
            </p>
          </div>

          <div className="border-t border-gray-200 dark:border-gray-700 pt-6">
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
              Тухай
            </h3>
            <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
              Personal Organizer Pro нь таны өдөр тутмын ажлуудыг зохион байгуулах, 
              дадал зуршлаа хянах, санхүүгээ удирдах боломжийг олгодог цогц аппликейшн юм.
            </p>
          </div>

          <div className="border-t border-gray-200 dark:border-gray-700 pt-6">
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
              Онцлог шинж чанарууд
            </h3>
            <ul className="space-y-2 text-gray-600 dark:text-gray-400">
              <li className="flex items-center gap-2">
                <span className="text-blue-600">✓</span> Хийх ажлуудын жагсаалт
              </li>
              <li className="flex items-center gap-2">
                <span className="text-green-600">✓</span> Дадал зуршил хянах
              </li>
              <li className="flex items-center gap-2">
                <span className="text-red-600">✓</span> Орлого зарлагын бүртгэл
              </li>
              <li className="flex items-center gap-2">
                <span className="text-purple-600">✓</span> Статистик харах
              </li>
              <li className="flex items-center gap-2">
                <span className="text-yellow-600">✓</span> Шагнал цуглуулах
              </li>
              <li className="flex items-center gap-2">
                <span className="text-gray-600">✓</span> Харанхуй горим
              </li>
            </ul>
          </div>

          <div className="border-t border-gray-200 dark:border-gray-700 pt-6">
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
              Технологи
            </h3>
            <div className="flex flex-wrap gap-2">
              {['React 19', 'Vite', 'Tailwind CSS', 'Zustand', 'React Router'].map(tech => (
                <span key={tech} className="px-3 py-1 bg-blue-100 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 rounded-full text-sm">
                  {tech}
                </span>
              ))}
            </div>
          </div>

          <div className="border-t border-gray-200 dark:border-gray-700 pt-6 text-center">
            <p className="text-gray-600 dark:text-gray-400 flex items-center justify-center gap-2">
              Хайраар хийгдсэн <Heart className="text-red-500 fill-current" size={18} />
            </p>
            <p className="text-gray-500 dark:text-gray-500 text-sm mt-2">
              © 2025 Personal Organizer Pro. Бүх эрх хуулиар хамгаалагдсан.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
