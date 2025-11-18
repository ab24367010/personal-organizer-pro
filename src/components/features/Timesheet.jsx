import { Clock } from 'lucide-react'

export default function Timesheet() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pt-20 px-4 pb-8">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white flex items-center gap-3">
            <Clock className="text-purple-600" />
            Цагийн бүртгэл
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-2">
            Ажлын цагаа бүртгэх
          </p>
        </div>

        <div className="text-center py-12 bg-white dark:bg-gray-800 rounded-lg">
          <Clock className="w-16 h-16 text-gray-300 dark:text-gray-600 mx-auto mb-4" />
          <p className="text-gray-500 dark:text-gray-400 text-lg">
            Удахгүй нэмэгдэнэ...
          </p>
        </div>
      </div>
    </div>
  )
}
