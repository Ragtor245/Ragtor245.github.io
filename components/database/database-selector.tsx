"use client"

import { useState } from "react"
import { Search, ChevronDown, ChevronRight, Database } from "lucide-react"
import { Input } from "@/components/ui/input"

type DatabaseCategory = {
  id: string
  name: string
  databases: {
    id: string
    name: string
    description: string
  }[]
}

const databaseCategories: DatabaseCategory[] = [
  {
    id: "general",
    name: "通用知识库",
    databases: [
      { id: "wiki", name: "维基百科", description: "包含广泛的百科全书知识" },
      { id: "news", name: "新闻数据库", description: "最近的新闻文章和事件" },
      { id: "literature", name: "文学作品", description: "经典文学作品集合" },
    ],
  },
  {
    id: "science",
    name: "科学数据库",
    databases: [
      { id: "physics", name: "物理学", description: "物理学理论和实验数据" },
      { id: "chemistry", name: "化学", description: "化学元素和反应数据" },
      { id: "biology", name: "生物学", description: "生物学研究和发现" },
    ],
  },
  {
    id: "tech",
    name: "技术文档",
    databases: [
      { id: "programming", name: "编程语言", description: "各种编程语言的文档" },
      { id: "ai", name: "人工智能", description: "AI研究和应用" },
      { id: "web", name: "Web开发", description: "Web开发技术和框架" },
    ],
  },
  {
    id: "business",
    name: "商业资料",
    databases: [
      { id: "finance", name: "金融数据", description: "金融市场和投资数据" },
      { id: "marketing", name: "市场营销", description: "市场营销策略和案例" },
      { id: "management", name: "管理学", description: "企业管理理论和实践" },
    ],
  },
]

type DatabaseSelectorProps = {
  onSelect: (databaseId: string) => void
  uploadedFiles?: File[]
}

export function DatabaseSelector({ onSelect, uploadedFiles = [] }: DatabaseSelectorProps) {
  const [expandedCategories, setExpandedCategories] = useState<string[]>([])
  const [searchQuery, setSearchQuery] = useState("")

  const toggleCategory = (categoryId: string) => {
    setExpandedCategories((prev) =>
      prev.includes(categoryId) ? prev.filter((id) => id !== categoryId) : [...prev, categoryId],
    )
  }

  const filteredCategories = databaseCategories
    .map((category) => ({
      ...category,
      databases: category.databases.filter(
        (db) =>
          db.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          db.description.toLowerCase().includes(searchQuery.toLowerCase()),
      ),
    }))
    .filter(
      (category) => category.databases.length > 0 || category.name.toLowerCase().includes(searchQuery.toLowerCase()),
    )

  return (
    <div className="space-y-4">
      <div className="relative">
        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-400" />
        <Input
          type="search"
          placeholder="搜索数据库..."
          className="pl-9 bg-gray-800 bg-opacity-50 border-gray-700 text-white placeholder:text-gray-400"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      {uploadedFiles.length > 0 && (
        <div className="space-y-1">
          <div className="flex w-full items-center justify-between rounded-md px-2 py-1.5 text-sm text-white">
            <div className="flex items-center">
              <ChevronDown className="mr-1 h-4 w-4" />
              已上传文档
            </div>
            <span className="text-xs text-gray-400">{uploadedFiles.length}</span>
          </div>
          <div className="ml-4 space-y-1">
            {uploadedFiles.map((file, index) => (
              <button
                key={index}
                onClick={() => onSelect(file.name)}
                className="flex w-full items-center rounded-md px-2 py-1.5 text-sm text-gray-300 hover:bg-gray-800 hover:text-white"
              >
                <Database className="mr-2 h-3.5 w-3.5 text-indigo-400" />
                <div className="flex flex-col items-start">
                  <span>{file.name}</span>
                  <span className="text-xs text-gray-500">{(file.size / 1024 / 1024).toFixed(2)} MB</span>
                </div>
              </button>
            ))}
          </div>
        </div>
      )}

      <div className="space-y-1 max-h-[300px] overflow-y-auto pr-2 cosmic-scrollbar">
        {filteredCategories.map((category) => (
          <div key={category.id} className="space-y-1">
            <button
              onClick={() => toggleCategory(category.id)}
              className="flex w-full items-center justify-between rounded-md px-2 py-1.5 text-sm text-white hover:bg-gray-800"
            >
              <div className="flex items-center">
                {expandedCategories.includes(category.id) ? (
                  <ChevronDown className="mr-1 h-4 w-4" />
                ) : (
                  <ChevronRight className="mr-1 h-4 w-4" />
                )}
                {category.name}
              </div>
              <span className="text-xs text-gray-400">{category.databases.length}</span>
            </button>

            {expandedCategories.includes(category.id) && (
              <div className="ml-4 space-y-1">
                {category.databases.map((database) => (
                  <button
                    key={database.id}
                    onClick={() => onSelect(database.id)}
                    className="flex w-full items-center rounded-md px-2 py-1.5 text-sm text-gray-300 hover:bg-gray-800 hover:text-white"
                  >
                    <Database className="mr-2 h-3.5 w-3.5 text-indigo-400" />
                    <div className="flex flex-col items-start">
                      <span>{database.name}</span>
                      <span className="text-xs text-gray-500">{database.description}</span>
                    </div>
                  </button>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}
