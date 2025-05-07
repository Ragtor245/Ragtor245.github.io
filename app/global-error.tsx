"use client"

import { RefreshCw } from "lucide-react"

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  return (
    <html>
      <body className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white p-4">
        <div className="space-y-6 text-center max-w-md">
          <h1 className="text-6xl font-bold text-red-500">出错了</h1>
          <h2 className="text-2xl font-semibold">发生了一些问题</h2>
          <p className="text-gray-400">抱歉，应用程序遇到了意外错误。我们已记录此问题，请尝试刷新页面。</p>
          <button
            onClick={() => reset()}
            className="inline-flex items-center justify-center rounded-md bg-red-600 px-4 py-2 text-sm font-medium text-white shadow transition-colors hover:bg-red-700 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-red-500 disabled:pointer-events-none disabled:opacity-50 cosmic-button mt-4"
          >
            <RefreshCw className="mr-2 h-4 w-4" />
            重试
          </button>
        </div>
      </body>
    </html>
  )
}
