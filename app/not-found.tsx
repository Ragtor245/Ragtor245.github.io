import Link from "next/link"
import { Home } from "lucide-react"

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white p-4">
      <div className="space-y-6 text-center max-w-md">
        <h1 className="text-4xl font-bold">404 - 页面未找到</h1>
        <p className="text-xl text-gray-300">抱歉，您请求的页面不存在或已被移动。</p>
        <div className="h-1 w-20 bg-indigo-600 mx-auto"></div>
        <p className="text-gray-400">请检查URL是否正确，或返回首页继续浏览。</p>
        <Link
          href="/"
          className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 transition-colors"
        >
          <Home className="mr-2 h-5 w-5" />
          返回首页
        </Link>
      </div>
    </div>
  )
}
