import Link from "next/link"
import { Home } from "lucide-react"

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white p-4">
      <div className="space-y-6 text-center max-w-md">
        <h1 className="text-6xl font-bold text-indigo-500">404</h1>
        <h2 className="text-2xl font-semibold">页面未找到</h2>
        <p className="text-gray-400">抱歉，您请求的页面不存在或已被移动。请检查URL是否正确，或返回首页。</p>
        <Link
          href="/"
          className="inline-flex items-center justify-center rounded-md bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow transition-colors hover:bg-indigo-700 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-indigo-500 disabled:pointer-events-none disabled:opacity-50 cosmic-button mt-4"
        >
          <Home className="mr-2 h-4 w-4" />
          返回首页
        </Link>
      </div>
    </div>
  )
}
