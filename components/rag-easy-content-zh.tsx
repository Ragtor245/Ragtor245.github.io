"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { Send, Upload, Database } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ChatMessage } from "./chat/chat-message"
import { BotSettings } from "./chat/bot-settings"
import { DatabaseSelector } from "./database/database-selector"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { UserSettings } from "./chat/user-settings"

type Message = {
  id: string
  content: string
  isBot: boolean
}

type ChatSession = {
  id: string
  title: string
  timestamp: string
  preview: string
}

export function RagEasyContentZh() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome",
      content: "您好！我是您的AI助手，可以帮您查询知识库中的信息。请问有什么可以帮您？",
      isBot: true,
    },
  ])
  const [input, setInput] = useState("")
  const [isStreaming, setIsStreaming] = useState(false)
  const [streamingMessageId, setStreamingMessageId] = useState<string | null>(null)
  const [botName, setBotName] = useState("AI助手")
  const [botAvatar, setBotAvatar] = useState("")
  const [selectedDatabase, setSelectedDatabase] = useState<string | null>(null)
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([])
  const [activeKnowledgeBase, setActiveKnowledgeBase] = useState<{ type: "public" | "uploaded"; name: string } | null>(
    null,
  )
  const [uploadedFile, setUploadedFile] = useState<File | null>(null)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const [userName, setUserName] = useState("用户")
  const [userAvatar, setUserAvatar] = useState("")
  const [chatHistory, setChatHistory] = useState<ChatSession[]>([
    {
      id: "chat-1",
      title: "关于人工智能的讨论",
      timestamp: "2024-04-15 14:30",
      preview: "我们讨论了AI的发展趋势和应用场景...",
    },
    {
      id: "chat-2",
      title: "数据库知识查询",
      timestamp: "2024-04-14 10:15",
      preview: "关于向量数据库的优化问题...",
    },
    {
      id: "chat-3",
      title: "机器学习模型训练",
      timestamp: "2024-04-12 16:45",
      preview: "如何优化大语言模型的训练效率...",
    },
    {
      id: "chat-4",
      title: "RAG技术应用",
      timestamp: "2024-04-10 09:20",
      preview: "讨论了检索增强生成技术的最佳实践...",
    },
    {
      id: "chat-5",
      title: "知识库构建方法",
      timestamp: "2024-04-08 11:35",
      preview: "如何构建高质量的知识库以提升回答质量...",
    },
  ])
  const [selectedChat, setSelectedChat] = useState<string>("current")

  // Scroll to bottom when messages change
  useEffect(() => {
    if (messagesEndRef.current) {
      const chatContainer = messagesEndRef.current.parentElement
      if (chatContainer) {
        chatContainer.scrollTop = chatContainer.scrollHeight
      }
    }
  }, [messages])

  const handleSendMessage = () => {
    if (!input.trim()) return

    const userMessageId = `user-${Date.now()}`
    const botMessageId = `bot-${Date.now()}`

    // Add user message
    setMessages((prev) => [
      ...prev,
      {
        id: userMessageId,
        content: input,
        isBot: false,
      },
    ])

    // Clear input
    setInput("")

    // Simulate streaming response
    setIsStreaming(true)
    setStreamingMessageId(botMessageId)

    // Add empty bot message that will be streamed
    setMessages((prev) => [
      ...prev,
      {
        id: botMessageId,
        content: "",
        isBot: true,
      },
    ])

    // Simulate streaming text
    let response = ""
    const possibleResponses = [
      `根据${selectedDatabase ? `"${selectedDatabase}"` : ""}知识库的信息，您的问题"${input}"的答案是：\n\n这是一个模拟的回答，实际上会连接到您本地部署的大模型。这个回答会根据您选择的知识库和提问内容生成相关的回复。`,
      "我已经查询了相关资料，这个问题涉及到多个领域的知识。根据目前的信息，最佳的解释是这样的...\n\n在实际应用中，这里会显示基于RAG技术从知识库中检索的相关信息，并由大模型整合生成的回答。",
      "这是一个很好的问题！根据知识库中的资料，我可以提供以下信息：\n\n1. 首先，这个概念最早出现在...\n2. 其次，它的主要应用领域包括...\n3. 最后，最新的研究表明...",
    ]
    const fullResponse = possibleResponses[Math.floor(Math.random() * possibleResponses.length)]
    const words = fullResponse.split("")

    let i = 0
    const streamInterval = setInterval(() => {
      if (i < words.length) {
        response += words[i]
        i++
        // Update the streaming message
        setMessages((prev) => prev.map((msg) => (msg.id === botMessageId ? { ...msg, content: response } : msg)))
      } else {
        clearInterval(streamInterval)
        setIsStreaming(false)
        setStreamingMessageId(null)
      }
    }, 20)
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  const handleBotSettingsSave = (name: string, avatar: string) => {
    setBotName(name)
    setBotAvatar(avatar)
  }

  const handleDatabaseSelect = (databaseId: string) => {
    setSelectedDatabase(databaseId)
    setActiveKnowledgeBase({ type: "public", name: databaseId })
  }

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const newFile = e.target.files[0]
      setUploadedFiles((prev) => [...prev, newFile])
      setActiveKnowledgeBase({ type: "uploaded", name: newFile.name })
    }
  }

  const handleUserSettingsSave = (name: string, avatar: string) => {
    setUserName(name)
    setUserAvatar(avatar)
  }

  return (
    <div className="space-y-8 relative">
      {/* Decorative elements */}
      <div
        className="absolute top-20 right-10 w-2 h-2 bg-white rounded-full star"
        style={{ animationDelay: "0.3s" }}
      ></div>
      <div
        className="absolute bottom-40 left-30 w-1 h-1 bg-white rounded-full star"
        style={{ animationDelay: "1.7s" }}
      ></div>
      <div
        className="absolute top-1/2 right-1/4 w-1.5 h-1.5 bg-white rounded-full star"
        style={{ animationDelay: "2.2s" }}
      ></div>

      <div>
        <h1 className="mb-4 text-3xl font-bold text-white">Rag-Easy</h1>
        <p className="text-lg text-gray-300">通用化 RAG 产品，打造 AI 专属聊天角色。</p>
      </div>

      <Card className="cosmic-card overflow-hidden">
        <CardContent className="p-0">
          <Tabs defaultValue="chat" className="w-full">
            <TabsList className="w-full rounded-none bg-gray-900 p-0">
              <TabsTrigger
                value="chat"
                className="flex-1 rounded-none border-b-2 border-transparent data-[state=active]:border-indigo-500 data-[state=active]:bg-transparent"
              >
                聊天
              </TabsTrigger>
            </TabsList>

            <TabsContent value="chat" className="m-0">
              <div className="flex h-[600px] flex-col">
                <div className="flex items-center justify-between border-b border-gray-800 bg-gray-900 bg-opacity-50 p-3">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-medium text-white">
                      {activeKnowledgeBase
                        ? `已连接: ${activeKnowledgeBase.name} (${activeKnowledgeBase.type === "public" ? "公共数据库" : "上传文档"})`
                        : "未选择知识库"}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="text-gray-400 hover:text-white hover:bg-gray-800 group"
                        >
                          <Database className="h-4 w-4 mr-1" />
                          知识库
                          {selectedDatabase && (
                            <span className="ml-1.5 text-xs bg-indigo-500 bg-opacity-30 text-indigo-200 px-1.5 py-0.5 rounded-full group-hover:bg-opacity-50">
                              已选择
                            </span>
                          )}
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="cosmic-card border-gray-700 max-w-3xl">
                        <DialogHeader>
                          <DialogTitle className="text-white">知识库管理</DialogTitle>
                          <DialogDescription className="text-gray-400">管理您的知识库资源</DialogDescription>
                        </DialogHeader>

                        <Tabs defaultValue="public" className="w-full mt-4">
                          <TabsList className="w-full grid grid-cols-2">
                            <TabsTrigger value="public">公共数据库</TabsTrigger>
                            <TabsTrigger value="upload">上传文档</TabsTrigger>
                          </TabsList>

                          <TabsContent value="public" className="mt-4">
                            <div className="space-y-4">
                              <div className="text-sm text-gray-300 mb-2">浏览或搜索可用的公共知识库</div>
                              <DatabaseSelector
                                onSelect={handleDatabaseSelect}
                                uploadedFiles={uploadedFiles}
                                selectedDatabase={selectedDatabase}
                              />
                            </div>
                          </TabsContent>

                          <TabsContent value="upload" className="mt-4">
                            <div className="space-y-6">
                              <div className="text-sm text-gray-300 mb-2">
                                上传文档以创建您的个人知识库。支持PDF、DOCX、TXT和Markdown文件。
                              </div>

                              <div className="flex flex-col items-center justify-center rounded-lg border-2 border-dashed border-gray-700 p-8">
                                <Upload className="mb-4 h-8 w-8 text-gray-400" />
                                <div className="space-y-2 text-center">
                                  <p className="text-sm text-gray-400">
                                    拖放文件到此处，或者{" "}
                                    <label className="cursor-pointer text-indigo-400 hover:text-indigo-300">
                                      浏览
                                      <input
                                        type="file"
                                        className="hidden"
                                        accept=".pdf,.docx,.txt,.md"
                                        onChange={handleFileUpload}
                                      />
                                    </label>
                                  </p>
                                  <p className="text-xs text-gray-500">最大文件大小: 50MB</p>
                                </div>
                              </div>

                              {uploadedFiles.length > 0 && (
                                <div className="rounded-md bg-gray-800 bg-opacity-50 p-3">
                                  <div className="flex items-center justify-between">
                                    <div className="flex items-center space-x-2">
                                      <div className="h-10 w-10 flex items-center justify-center rounded-full bg-indigo-500 bg-opacity-20">
                                        <Database className="h-5 w-5 text-indigo-400" />
                                      </div>
                                      <div>
                                        <p className="text-sm font-medium text-white">
                                          {uploadedFiles[uploadedFiles.length - 1].name}
                                        </p>
                                        <p className="text-xs text-gray-400">
                                          {(uploadedFiles[uploadedFiles.length - 1].size / 1024 / 1024).toFixed(2)} MB
                                        </p>
                                      </div>
                                    </div>
                                    <Button className="cosmic-button">处理文档</Button>
                                  </div>
                                </div>
                              )}
                            </div>
                          </TabsContent>
                        </Tabs>
                      </DialogContent>
                    </Dialog>
                    <UserSettings userName={userName} userAvatar={userAvatar} onSave={handleUserSettingsSave} />
                    <BotSettings botName={botName} botAvatar={botAvatar} onSave={handleBotSettingsSave} />
                  </div>
                </div>

                <div className="flex flex-1">
                  {/* 历史聊天记录侧边栏 */}
                  <div className="w-64 border-r border-gray-800 bg-gray-900 bg-opacity-30 overflow-y-auto cosmic-scrollbar max-h-[calc(600px-3rem)]">
                    <div className="p-3 border-b border-gray-800 sticky top-0 bg-gray-900 bg-opacity-80 backdrop-blur-sm z-10">
                      <h3 className="text-sm font-medium text-white flex items-center justify-between">
                        历史聊天记录
                        <span className="text-xs text-gray-400">(滚动查看更多)</span>
                      </h3>
                    </div>
                    <div className="p-2">
                      <button
                        onClick={() => setSelectedChat("current")}
                        className={`w-full text-left p-2 rounded-md mb-1 transition-colors ${
                          selectedChat === "current"
                            ? "bg-indigo-600 bg-opacity-50 text-white"
                            : "hover:bg-gray-800 text-gray-300"
                        }`}
                      >
                        <div className="flex items-center gap-2">
                          <div className="h-2 w-2 rounded-full bg-indigo-400"></div>
                          <span className="font-medium">当前会话</span>
                        </div>
                        <p className="text-xs mt-1 truncate opacity-70">
                          {messages.length > 1
                            ? messages[messages.length - 2].content.slice(0, 30) + "..."
                            : "新的对话..."}
                        </p>
                        <p className="text-xs mt-1 text-gray-400">现在</p>
                      </button>

                      {chatHistory.map((chat) => (
                        <button
                          key={chat.id}
                          onClick={() => setSelectedChat(chat.id)}
                          className={`w-full text-left p-2 rounded-md mb-1 transition-colors ${
                            selectedChat === chat.id
                              ? "bg-indigo-600 bg-opacity-50 text-white"
                              : "hover:bg-gray-800 text-gray-300"
                          }`}
                        >
                          <div className="font-medium truncate">{chat.title}</div>
                          <p className="text-xs mt-1 truncate opacity-70">{chat.preview}</p>
                          <p className="text-xs mt-1 text-gray-400">{chat.timestamp}</p>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* 聊天内容区域 */}
                  <div className="flex-1 flex flex-col">
                    <div
                      className="h-[400px] overflow-y-auto p-4 space-y-4 cosmic-scrollbar"
                      id="chat-messages-container"
                    >
                      {messages.map((message) => (
                        <ChatMessage
                          key={message.id}
                          content={message.content}
                          isBot={message.isBot}
                          name={message.isBot ? botName : userName}
                          avatar={message.isBot ? botAvatar : userAvatar}
                          isStreaming={isStreaming && streamingMessageId === message.id}
                        />
                      ))}
                      <div ref={messagesEndRef} />
                    </div>

                    <div className="border-t border-gray-800 bg-gray-900 bg-opacity-50 p-3">
                      <div className="flex gap-2">
                        <Textarea
                          value={input}
                          onChange={(e) => setInput(e.target.value)}
                          onKeyDown={handleKeyDown}
                          placeholder="输入您的问题..."
                          className="min-h-[60px] resize-none bg-gray-800 bg-opacity-50 border-gray-700 text-white placeholder:text-gray-400"
                        />
                        <Button
                          onClick={handleSendMessage}
                          disabled={!input.trim() || isStreaming}
                          className="cosmic-button self-end"
                        >
                          <Send className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  )
}
