"use client"

import { useState } from "react"
import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { MessageSquare, Users, Bookmark } from "lucide-react"

export function RagCommContentZh() {
  const [message, setMessage] = useState("")
  const [activeTab, setActiveTab] = useState("forum")

  const discussions = [
    {
      id: 1,
      title: "RAG实施的最佳实践",
      author: "张伟",
      avatar: "张",
      date: "2小时前",
      replies: 12,
      views: 89,
    },
    {
      id: 2,
      title: "如何优化RAG应用中的向量搜索？",
      author: "李娜",
      avatar: "李",
      date: "昨天",
      replies: 8,
      views: 56,
    },
    {
      id: 3,
      title: "将外部知识库与RAG集成",
      author: "王强",
      avatar: "王",
      date: "2天前",
      replies: 15,
      views: 124,
    },
  ]

  const messages = [
    {
      id: 1,
      author: "张伟",
      avatar: "张",
      content: "有人实现过多语言支持的RAG吗？我在寻找最佳实践。",
      time: "10:23 AM",
    },
    {
      id: 2,
      author: "李娜",
      avatar: "李",
      content: "是的，我们使用特定语言的嵌入和检测层来适当路由查询。",
      time: "10:45 AM",
    },
    {
      id: 3,
      author: "王强",
      avatar: "王",
      content: "我们发现使用带有语言标记的统一向量空间也很有效。如果你感兴趣，我很乐意分享更多细节。",
      time: "11:02 AM",
    },
  ]

  const resources = [
    {
      id: 1,
      title: "RAG实施指南",
      description: "关于实施RAG系统的综合指南",
    },
    {
      id: 2,
      title: "向量数据库比较",
      description: "针对RAG应用的不同向量数据库分析",
    },
    {
      id: 3,
      title: "RAG性能基准",
      description: "各种RAG配置的基准测试结果",
    },
  ]

  const handleTabChange = (value: string) => {
    setActiveTab(value)
    // 滚动到页面顶部
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="mb-4 text-3xl font-bold text-white">Rag-Comm</h1>
        <p className="text-lg text-gray-300">社区交流平台，促进知识分享。</p>
      </div>

      <Card className="cosmic-card overflow-hidden">
        <CardContent className="p-6">
          <Tabs value={activeTab} onValueChange={handleTabChange} className="w-full">
            <TabsList className="w-full grid grid-cols-3 bg-gray-800 bg-opacity-50 p-1 rounded-lg mb-6">
              <TabsTrigger
                value="forum"
                className="py-3 data-[state=active]:bg-indigo-600 data-[state=active]:text-white rounded-md transition-all"
              >
                <MessageSquare className="mr-2 h-5 w-5" />
                论坛
              </TabsTrigger>
              <TabsTrigger
                value="chat"
                className="py-3 data-[state=active]:bg-indigo-600 data-[state=active]:text-white rounded-md transition-all"
              >
                <Users className="mr-2 h-5 w-5" />
                聊天
              </TabsTrigger>
              <TabsTrigger
                value="resources"
                className="py-3 data-[state=active]:bg-indigo-600 data-[state=active]:text-white rounded-md transition-all"
              >
                <Bookmark className="mr-2 h-5 w-5" />
                资源
              </TabsTrigger>
            </TabsList>

            <TabsContent value="forum">
              <div className="space-y-6">
                {discussions.map((discussion) => (
                  <div
                    key={discussion.id}
                    className="flex items-start gap-4 rounded-lg border border-gray-700 p-4 hover:bg-gray-800 transition-colors"
                  >
                    <Avatar>
                      <AvatarFallback className="bg-gradient-to-br from-indigo-500 to-purple-600 text-white">
                        {discussion.avatar}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <h3 className="mb-1 font-medium text-white">{discussion.title}</h3>
                      <div className="flex flex-wrap gap-2 text-sm text-gray-400">
                        <span>作者：{discussion.author}</span>
                        <span>•</span>
                        <span>{discussion.date}</span>
                        <span>•</span>
                        <span>{discussion.replies}回复</span>
                        <span>•</span>
                        <span>{discussion.views}浏览</span>
                      </div>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-indigo-300 hover:text-indigo-200 hover:bg-gray-700"
                    >
                      查看
                    </Button>
                  </div>
                ))}
                <Button className="w-full cosmic-button">发起新讨论</Button>
              </div>
            </TabsContent>

            <TabsContent value="chat">
              <div className="space-y-6">
                <div className="h-[400px] space-y-4 overflow-y-auto rounded-md border border-gray-700 p-4 cosmic-scrollbar">
                  {messages.map((msg) => (
                    <div key={msg.id} className="flex gap-3">
                      <Avatar>
                        <AvatarFallback className="bg-gradient-to-br from-indigo-500 to-purple-600 text-white">
                          {msg.avatar}
                        </AvatarFallback>
                      </Avatar>
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <span className="font-medium text-white">{msg.author}</span>
                          <span className="text-xs text-gray-400">{msg.time}</span>
                        </div>
                        <p className="text-gray-300">{msg.content}</p>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="flex gap-2">
                  <input
                    type="text"
                    placeholder="输入消息..."
                    className="flex-1 rounded-md bg-gray-800 bg-opacity-50 border border-gray-700 px-3 py-2 text-white placeholder:text-gray-400"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                  />
                  <Button className="cosmic-button">发送</Button>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="resources">
              <div className="space-y-6">
                {resources.map((resource) => (
                  <div
                    key={resource.id}
                    className="rounded-lg border border-gray-700 p-4 hover:bg-gray-800 transition-colors"
                  >
                    <h3 className="font-medium text-white">{resource.title}</h3>
                    <p className="text-sm text-gray-400">{resource.description}</p>
                    <Button
                      variant="outline"
                      size="sm"
                      className="mt-2 border-gray-700 text-indigo-300 hover:text-indigo-200 hover:bg-gray-700"
                    >
                      下载
                    </Button>
                  </div>
                ))}
                <Button className="w-full cosmic-button">分享资源</Button>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      <div className="flex justify-end">
        <Link
          href="/introduction"
          className="inline-flex items-center text-indigo-300 hover:text-indigo-200 cosmic-link"
        >
          了解更多关于我们 <ArrowRight className="ml-1 h-4 w-4" />
        </Link>
      </div>
    </div>
  )
}
