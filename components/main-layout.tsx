"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { ChevronDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { CosmicBackground } from "./cosmic-background"

const sidebarItems = [
  { name: "Rag-Easy", path: "/rag-easy" },
  { name: "Rag-UDM", path: "/rag-udm" },
  { name: "Rag-Comm", path: "/rag-comm" },
  { name: "关于我们", path: "/introduction" },
  { name: "用户反馈", path: "/feedback" },
]

const languages = [
  { name: "中文", code: "zh" },
  { name: "English", code: "en" },
]

export function MainLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const [language, setLanguage] = useState("中文")
  const [isLangOpen, setIsLangOpen] = useState(false)

  return (
    <div className="flex min-h-screen flex-col text-white">
      <CosmicBackground />

      {/* Decorative planets */}
      <div className="planet h-32 w-32 bg-purple-500 opacity-20 blur-xl fixed -top-10 -right-10 z-0"></div>
      <div className="planet h-24 w-24 bg-blue-500 opacity-10 blur-xl fixed bottom-20 -left-10 z-0"></div>

      <header className="sticky top-0 z-50 flex h-16 items-center justify-between cosmic-header px-4 md:px-6">
        <div className="flex items-center gap-2">
          <Link href="/" className="flex items-center gap-2 group">
            <div className="relative h-8 w-8 float">
              <div className="absolute h-8 w-8 rounded-full bg-gradient-to-br from-indigo-400 via-purple-400 to-pink-400 opacity-80 group-hover:opacity-100 transition-opacity"></div>
              <div className="absolute inset-1 rounded-full bg-gray-900"></div>
            </div>
            <span className="text-xl font-bold text-white group-hover:text-indigo-300 transition-colors">Ragtor</span>
          </Link>
        </div>
        <div className="flex items-center gap-4">
          <div className="relative">
            <button
              onClick={() => setIsLangOpen(!isLangOpen)}
              className="flex h-10 w-32 items-center justify-between rounded-md border border-gray-700 bg-gray-800 bg-opacity-50 px-4 py-2 hover:bg-gray-700 transition-colors"
            >
              <span>{language}</span>
              <ChevronDown className="h-4 w-4" />
            </button>

            {isLangOpen && (
              <div className="absolute right-0 mt-1 w-32 rounded border border-gray-700 bg-gray-800 shadow-lg z-50">
                {languages.map((lang) => (
                  <button
                    key={lang.code}
                    onClick={() => {
                      setLanguage(lang.name)
                      setIsLangOpen(false)
                    }}
                    className={cn(
                      "w-full px-4 py-2 text-left hover:bg-gray-700 transition-colors",
                      language === lang.name && "font-medium text-indigo-300",
                    )}
                  >
                    {lang.name}
                  </button>
                ))}
              </div>
            )}
          </div>
          <Button className="h-10 cosmic-button px-6">
            <Link href="/login" className="text-white">
              登录
            </Link>
          </Button>
        </div>
      </header>
      <div className="flex flex-1">
        <aside className="w-64 cosmic-sidebar">
          <nav className="flex flex-col py-4">
            {sidebarItems.map((item, index) => (
              <Link
                key={item.path}
                href={item.path}
                className={cn(
                  "cosmic-link px-6 py-3 text-gray-300 hover:text-white transition-colors",
                  pathname === item.path && "bg-gray-800 bg-opacity-50 font-medium text-indigo-300",
                  `float-delay-${(index % 3) + 1}`,
                )}
              >
                {item.name}
              </Link>
            ))}
          </nav>
        </aside>
        <main className="flex-1 p-6">{children}</main>
      </div>
      <footer className="cosmic-footer px-6 py-12 text-white">
        <div className="mx-auto max-w-7xl">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            <div>
              <h3 className="mb-4 text-lg font-medium text-indigo-300">关于 Ragtor</h3>
              <p className="text-gray-400">Ragtor 是一个综合性的信息分享和用户互动平台。</p>
            </div>
            <div>
              <h3 className="mb-4 text-lg font-medium text-indigo-300">快速链接</h3>
              <ul className="space-y-2">
                <li>
                  <Link href="/introduction" className="cosmic-link text-gray-400 hover:text-white">
                    关于我们
                  </Link>
                </li>
                <li>
                  <Link href="/feedback" className="cosmic-link text-gray-400 hover:text-white">
                    用户反馈
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="mb-4 text-lg font-medium text-indigo-300">联系我们</h3>
              <p className="text-gray-400">邮箱: contact@ragtor.com</p>
              <p className="text-gray-400">电话: (123) 456-7890</p>
            </div>
          </div>
          <div className="mt-12 border-t border-gray-800 pt-8 text-center text-sm text-gray-400">
            © 2024 Ragtor. 保留所有权利。
          </div>
        </div>
      </footer>
    </div>
  )
}
