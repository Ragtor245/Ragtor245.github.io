"use client"

import { useEffect } from "react"
import Link from "next/link"
import { Home, RefreshCw } from "lucide-react"

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    // 记录错误到错误报告服务
    console.error(error)
  }, [error])

  return (
    <html>
      <body>
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white p-4">
          <div className="space-y-6 text-center max-w-md">
            <h1 className="text-4xl font-bold">出错了</h1>
            <p className="text-xl text-gray-300">抱歉，应用程序遇到了意外错误。</p>
            <div className="h-1 w-20 bg-red-600 mx-auto"></div>
            <p className="text-gray-400">我们已记录此错误，并正在努力修复。请尝试刷新页面或返回首页。</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={() => reset()}
                className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 transition-colors"
              >
                <RefreshCw className="mr-2 h-5 w-5" />
                重试
              </button>
              <Link
                href="/"
                className="inline-flex items-center justify-center px-6 py-3 border border-gray-700 text-base font-medium rounded-md text-white bg-gray-800 hover:bg-gray-700 transition-colors"
              >
                <Home className="mr-2 h-5 w-5" />
                返回首页
              </Link>
            </div>
          </div>
        </div>
      </body>
    </html>
  )
}
