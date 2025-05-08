"use client"

import { DialogTrigger } from "@/components/ui/dialog"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { Upload, Plus, Search, Info, ExternalLink, X, Bot } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import OpenAI from "openai"

type Message = {
  id: string
  content: string
  isBot: boolean
}

type KnowledgeBase = {
  id: string
  name: string
  description: string
  category: string
  itemCount: number
  createdBy: string
  createdAt: string
  status: "approved" | "pending" | "rejected"
  tags: string[]
  previewItems?: KnowledgeItem[]
}

type KnowledgeItem = {
  id: string
  title: string
  content: string
  type: "text" | "image" | "document"
  source?: string
}

// OpenAI client configuration for Alibaba Cloud DashScope
const client = new OpenAI({
  apiKey: "sk-3ef418f395c54a94888a479894a62c83",
  baseURL: "https://dashscope.aliyuncs.com/compatible-mode/v1",
  dangerouslyAllowBrowser: true, // Enable usage in browser environment
})
const MODEL_NAME = "qwen-max"

export function RagEasyContentZh() {
  // 状态管理
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome",
      content: "您好！我是您的AI助手，可以帮您查询知识库中的信息。请选择一个知识库开始对话。",
      isBot: true,
    },
  ])
  const [input, setInput] = useState("")
  const [isStreaming, setIsStreaming] = useState(false)
  const [streamingMessageId, setStreamingMessageId] = useState<string | null>(null)
  const [botName, setBotName] = useState("AI助手")
  const [botAvatar, setBotAvatar] = useState("")
  const [userName, setUserName] = useState("用户")
  const [userAvatar, setUserAvatar] = useState("")
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)
  const [selectedKnowledgeBase, setSelectedKnowledgeBase] = useState<KnowledgeBase | null>(null)
  const [detailKnowledgeBase, setDetailKnowledgeBase] = useState<KnowledgeBase | null>(null)
  const [showKnowledgeBaseDetail, setShowKnowledgeBaseDetail] = useState(false)
  const [newKnowledgeBase, setNewKnowledgeBase] = useState({
    name: "",
    description: "",
    category: "",
    tags: "",
  })
  const [isSubmittingKnowledgeBase, setIsSubmittingKnowledgeBase] = useState(false)
  const [showSubmitSuccess, setShowSubmitSuccess] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  // 模拟数据
  const knowledgeBases: KnowledgeBase[] = [
    {
      id: "kb-1",
      name: "通用百科知识库",
      description: "包含广泛的百科全书知识，涵盖历史、科学、文化、地理等多个领域",
      category: "百科",
      itemCount: 15000,
      createdBy: "系统",
      createdAt: "2023-01-15",
      status: "approved",
      tags: ["百科", "通用", "教育"],
      previewItems: [
        {
          id: "item-1",
          title: "太阳系的构成",
          content:
            "太阳系由太阳及其周围的行星、卫星、小行星、彗星等天体组成。八大行星按照离太阳由近到远的顺序是：水星、金星、地球、火星、木星、土星、天王星和海王星。",
          type: "text",
        },
        {
          id: "item-2",
          title: "光合作用",
          content:
            "光合作用是绿色植物、藻类和某些细菌利用光能，将二氧化碳和水转化为有机物和氧气的过程。这一过程是地球上大多数生命形式能量的最初来源。",
          type: "text",
        },
      ],
    },
    {
      id: "kb-2",
      name: "医学健康知识库",
      description: "包含医学、健康、疾病预防和治疗相关的专业知识",
      category: "医学",
      itemCount: 8500,
      createdBy: "系统",
      createdAt: "2023-02-20",
      status: "approved",
      tags: ["医学", "健康", "疾病", "专业"],
      previewItems: [
        {
          id: "item-3",
          title: "高血压的预防",
          content:
            "高血压预防措施包括：减少盐的摄入、保持健康体重、定期锻炼、限制酒精摄入、戒烟、减轻压力、定期监测血压等。",
          type: "text",
        },
      ],
    },
    {
      id: "kb-3",
      name: "计算机科学知识库",
      description: "涵盖计算机科学、编程语言、算法、数据结构等技术知识",
      category: "技术",
      itemCount: 12000,
      createdBy: "系统",
      createdAt: "2023-03-10",
      status: "approved",
      tags: ["计算机", "编程", "技术", "算法"],
      previewItems: [
        {
          id: "item-4",
          title: "快速排序算法",
          content:
            "快速排序是一种分治算法，通过选择一个'基准'元素，将数组分为两个子数组，小于基准的元素和大于基准的元素，然后递归地对子数组进行排序。平均时间复杂度为O(n log n)。",
          type: "text",
        },
      ],
    },
    {
      id: "kb-4",
      name: "文学作品知识库",
      description: "包含世界各国文学作品、作家、文学流派等相关知识",
      category: "文学",
      itemCount: 7800,
      createdBy: "系统",
      createdAt: "2023-04-05",
      status: "approved",
      tags: ["文学", "小说", "诗歌", "文化"],
      previewItems: [
        {
          id: "item-5",
          title: "《红楼梦》简介",
          content:
            "《红楼梦》，中国古典四大名著之一，清代作家曹雪芹创作的章回体长篇小说，又名《石头记》。描写了贾、史、王、薛四大家族的兴衰，以贾宝玉和林黛玉的爱情悲剧为主线。",
          type: "text",
        },
      ],
    },
    {
      id: "kb-5",
      name: "历史事件知识库",
      description: "记录世界各国重要历史事件、人物和时间线",
      category: "历史",
      itemCount: 9200,
      createdBy: "系统",
      createdAt: "2023-05-12",
      status: "approved",
      tags: ["历史", "事件", "人物", "年代"],
      previewItems: [
        {
          id: "item-6",
          title: "第二次世界大战",
          content:
            "第二次世界大战是人类历史上规模最大的全球性战争，从1939年9月1日持续到1945年9月2日，主要参战国分为同盟国和轴心国两大阵营。",
          type: "text",
        },
      ],
    },
    {
      id: "kb-6",
      name: "物理学知识库",
      description: "包含物理学基本原理、定律、理论和实验等内容",
      category: "科学",
      itemCount: 6500,
      createdBy: "系统",
      createdAt: "2023-06-18",
      status: "approved",
      tags: ["物理", "科学", "理论", "实验"],
      previewItems: [
        {
          id: "item-7",
          title: "相对论基本原理",
          content:
            "爱因斯坦的相对论包括狭义相对论和广义相对论。狭义相对论基于两个基本假设：物理定律在所有惯性参考系中都相同；真空中的光速在所有惯性参考系中都是相同的常数。",
          type: "text",
        },
      ],
    },
    {
      id: "kb-7",
      name: "法律法规知识库",
      description: "收集整理各国法律法规、案例和法律解释",
      category: "法律",
      itemCount: 11000,
      createdBy: "系统",
      createdAt: "2023-07-22",
      status: "approved",
      tags: ["法律", "法规", "案例", "司法"],
      previewItems: [
        {
          id: "item-8",
          title: "中国《民法典》概述",
          content:
            "《中华人民共和国民法典》于2021年1月1日起施行，是新中国第一部以法典命名的法律，共7编、1260条，系统整合了民事法律规范，规范了民事活动。",
          type: "text",
        },
      ],
    },
    {
      id: "kb-8",
      name: "用户贡献知识库-金融",
      description: "由用户贡献的金融、投资、经济学相关知识",
      category: "金融",
      itemCount: 3200,
      createdBy: "用户A",
      createdAt: "2023-08-30",
      status: "approved",
      tags: ["金融", "投资", "经济", "用户贡献"],
      previewItems: [
        {
          id: "item-9",
          title: "股票投资基础",
          content:
            "股票投资是指投资者通过购买公司股票成为公司股东，分享公司利润和承担风险的一种投资方式。投资者可以通过股息收入和资本增值获得回报。",
          type: "text",
        },
      ],
    },
    {
      id: "kb-9",
      name: "用户贡献知识库-烹饪",
      description: "收集各国菜系、烹饪技巧、食材知识等内容",
      category: "生活",
      itemCount: 4500,
      createdBy: "用户B",
      createdAt: "2023-09-15",
      status: "approved",
      tags: ["烹饪", "美食", "菜谱", "用户贡献"],
      previewItems: [
        {
          id: "item-10",
          title: "中式炒菜技巧",
          content:
            "中式炒菜的关键技巧包括：使用热锅冷油、食材切块大小均匀、掌握火候、调味料的合理搭配、翻炒手法等。这些技巧能确保菜肴色香味俱全。",
          type: "text",
        },
      ],
    },
    {
      id: "kb-10",
      name: "用户贡献知识库-旅游",
      description: "世界各地旅游景点、文化习俗、旅行建议等信息",
      category: "旅游",
      itemCount: 5800,
      createdBy: "用户C",
      createdAt: "2023-10-08",
      status: "pending",
      tags: ["旅游", "景点", "文化", "用户贡献"],
      previewItems: [
        {
          id: "item-11",
          title: "日本旅游注意事项",
          content:
            "在日本旅游时，应注意遵守当地礼仪，如不在公共场所大声喧哗、乘坐电梯靠左站立、进入寺庙或民宅需脱鞋、正确分类垃圾等。这些细节能让您的旅行更加顺利。",
          type: "text",
        },
      ],
    },
  ]

  const categories = Array.from(
    new Set(knowledgeBases.map((kb) => (kb.status === "approved" ? kb.category : null)).filter(Boolean)),
  )

  // 过滤知识库
  const filteredKnowledgeBases = knowledgeBases.filter((kb) => {
    // 只显示已批准的知识库
    if (kb.status !== "approved") return false

    // 类别过滤
    if (selectedCategory && kb.category !== selectedCategory) return false

    // 搜索过滤
    if (searchQuery) {
      const query = searchQuery.toLowerCase()
      return (
        kb.name.toLowerCase().includes(query) ||
        kb.description.toLowerCase().includes(query) ||
        kb.tags.some((tag) => tag.toLowerCase().includes(query))
      )
    }

    return true
  })

  // 滚动到底部
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" })
    }
  }, [messages])

  // 处理消息发送
  const handleSendMessage = async () => {
    if (!input.trim()) return
    if (!selectedKnowledgeBase) {
      setMessages((prev) => [
        ...prev,
        {
          id: `system-${Date.now()}`,
          content:
            '请先选择一个知识库再开始对话。您也可以点击上方的"AI 助手"标签，使用更强大的Gradio界面与大模型交互。',
          isBot: true,
        },
      ])
      return
    }

    const userMessageId = `user-${Date.now()}`
    const botMessageId = `bot-${Date.now()}`

    // 添加用户消息
    setMessages((prev) => [
      ...prev,
      {
        id: userMessageId,
        content: input,
        isBot: false,
      },
    ])

    // 清空输入
    setInput("")

    // 开始流式响应
    setIsStreaming(true)
    setStreamingMessageId(botMessageId)

    // 添加空的机器人消息
    setMessages((prev) => [
      ...prev,
      {
        id: botMessageId,
        content: "",
        isBot: true,
      },
    ])

    try {
      // 准备历史消息格式
      const messageHistory = messages.map((m) => ({
        role: m.isBot ? "assistant" : "user",
        content: m.content,
      }))

      // 添加系统消息，告知模型使用的知识库
      const systemMessage = {
        role: "system",
        content: `你是一个有帮助的AI助手，使用"${selectedKnowledgeBase.name}"知识库来回答问题。请基于知识库内容提供准确、有用的回答。`,
      }

      // 添加用户当前的问题
      const userMessage = {
        role: "user",
        content: input,
      }

      // 调用API进行流式响应
      const stream = await client.chat.completions.create({
        model: MODEL_NAME,
        messages: [systemMessage, ...messageHistory, userMessage],
        stream: true,
      })

      let fullResponse = ""

      for await (const chunk of stream) {
        const content = chunk.choices[0]?.delta?.content || ""
        if (content) {
          fullResponse += content
          // 更新流式消息
          setMessages((prev) => prev.map((msg) => (msg.id === botMessageId ? { ...msg, content: fullResponse } : msg)))
        }
      }

      setIsStreaming(false)
      setStreamingMessageId(null)
    } catch (error) {
      console.error("API调用错误:", error)

      // 显示错误消息
      setMessages((prev) =>
        prev.map((msg) =>
          msg.id === botMessageId ? { ...msg, content: "抱歉，在处理您的请求时发生了错误。请稍后再试。" } : msg,
        ),
      )

      setIsStreaming(false)
      setStreamingMessageId(null)
    }
  }

  // 处理键盘事件
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  // 处理知识库选择
  const handleSelectKnowledgeBase = (kb: KnowledgeBase) => {
    setSelectedKnowledgeBase(kb)
    // 添加系统消息
    if (!messages.some((m) => m.content.includes(kb.name))) {
      setMessages((prev) => [
        ...prev,
        {
          id: `system-${Date.now()}`,
          content: `已选择知识库: "${kb.name}"。您现在可以开始提问了。`,
          isBot: true,
        },
      ])
    }
  }

  // 处理知识库详情查看
  const handleViewKnowledgeBaseDetail = (kb: KnowledgeBase) => {
    setDetailKnowledgeBase(kb)
    setShowKnowledgeBaseDetail(true)
  }

  // 处理新知识库提交
  const handleSubmitNewKnowledgeBase = () => {
    setIsSubmittingKnowledgeBase(true)

    // 模拟API调用
    setTimeout(() => {
      setIsSubmittingKnowledgeBase(false)
      setShowSubmitSuccess(true)
      setNewKnowledgeBase({
        name: "",
        description: "",
        category: "",
        tags: "",
      })

      // 3秒后关闭成功提示
      setTimeout(() => {
        setShowSubmitSuccess(false)
      }, 3000)
    }, 1500)
  }

  // 用户设置保存
  const handleUserSettingsSave = (name: string, avatar: string) => {
    setUserName(name)
    setUserAvatar(avatar)
  }

  // 机器人设置保存
  const handleBotSettingsSave = (name: string, avatar: string) => {
    setBotName(name)
    setBotAvatar(avatar)
  }

  return (
    <div className="space-y-8 relative">
      {/* 装饰元素 */}
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

      {/* 主要内容区域 */}
      <div className="space-y-6">
        <Card className="cosmic-card overflow-hidden">
          <CardHeader className="pb-3">
            <div className="flex justify-between items-center">
              <CardTitle className="text-white">公共知识库</CardTitle>
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  className="flex items-center gap-1 cosmic-button bg-indigo-600 text-white"
                  asChild
                >
                  <a href="#" target="_blank" rel="noopener noreferrer">
                    <Bot className="h-4 w-4" />
                    <span>AI助手</span>
                  </a>
                </Button>
                <Dialog>
                  <DialogTrigger asChild>
                    <Button
                      variant="outline"
                      size="sm"
                      className="flex items-center gap-1 cosmic-button bg-indigo-600 text-white"
                    >
                      <Plus className="h-4 w-4" />
                      <span>提供新知识库</span>
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="cosmic-card border-gray-700">
                    <DialogHeader>
                      <DialogTitle className="text-white">提供新知识库</DialogTitle>
                      <DialogDescription className="text-gray-400">
                        您提供的知识库将经过平台审核后上线。请填写以下信息。
                      </DialogDescription>
                    </DialogHeader>

                    {showSubmitSuccess ? (
                      <div className="flex flex-col items-center justify-center py-8 text-center">
                        <div className="h-16 w-16 rounded-full bg-green-500 bg-opacity-20 flex items-center justify-center mb-4">
                          <svg className="h-8 w-8 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                        </div>
                        <h3 className="text-xl font-medium text-white mb-2">提交成功</h3>
                        <p className="text-gray-300">您的知识库已提交成功，我们将尽快审核。感谢您的贡献！</p>
                      </div>
                    ) : (
                      <div className="space-y-4 py-2">
                        <div className="space-y-2">
                          <Label htmlFor="kb-name" className="text-white">
                            知识库名称
                          </Label>
                          <Input
                            id="kb-name"
                            placeholder="输入知识库名称"
                            className="bg-gray-800 bg-opacity-50 border-gray-700 text-white"
                            value={newKnowledgeBase.name}
                            onChange={(e) => setNewKnowledgeBase({ ...newKnowledgeBase, name: e.target.value })}
                          />
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="kb-description" className="text-white">
                            知识库描述
                          </Label>
                          <Textarea
                            id="kb-description"
                            placeholder="详细描述知识库内容和用途"
                            className="min-h-[100px] bg-gray-800 bg-opacity-50 border-gray-700 text-white"
                            value={newKnowledgeBase.description}
                            onChange={(e) => setNewKnowledgeBase({ ...newKnowledgeBase, description: e.target.value })}
                          />
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label htmlFor="kb-category" className="text-white">
                              分类
                            </Label>
                            <Input
                              id="kb-category"
                              placeholder="如：科学、历史、技术等"
                              className="bg-gray-800 bg-opacity-50 border-gray-700 text-white"
                              value={newKnowledgeBase.category}
                              onChange={(e) => setNewKnowledgeBase({ ...newKnowledgeBase, category: e.target.value })}
                            />
                          </div>

                          <div className="space-y-2">
                            <Label htmlFor="kb-tags" className="text-white">
                              标签
                            </Label>
                            <Input
                              id="kb-tags"
                              placeholder="多个标签用逗号分隔"
                              className="bg-gray-800 bg-opacity-50 border-gray-700 text-white"
                              value={newKnowledgeBase.tags}
                              onChange={(e) => setNewKnowledgeBase({ ...newKnowledgeBase, tags: e.target.value })}
                            />
                          </div>
                        </div>

                        <div className="space-y-2">
                          <Label className="text-white">上传知识库文件</Label>
                          <div className="flex flex-col items-center justify-center rounded-lg border-2 border-dashed border-gray-700 p-6">
                            <Upload className="mb-4 h-8 w-8 text-gray-400" />
                            <div className="space-y-2 text-center">
                              <p className="text-sm text-gray-400">
                                拖放文件到此处，或者{" "}
                                <label className="cursor-pointer text-indigo-400 hover:text-indigo-300">
                                  浏览
                                  <input type="file" className="hidden" accept=".pdf,.docx,.txt,.md,.csv,.json" />
                                </label>
                              </p>
                              <p className="text-xs text-gray-500">支持PDF、DOCX、TXT、MD、CSV、JSON等格式</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}

                    <DialogFooter>
                      {!showSubmitSuccess && (
                        <Button
                          onClick={handleSubmitNewKnowledgeBase}
                          className="cosmic-button w-full"
                          disabled={
                            isSubmittingKnowledgeBase || !newKnowledgeBase.name || !newKnowledgeBase.description
                          }
                        >
                          {isSubmittingKnowledgeBase ? "提交中..." : "提交知识库"}
                        </Button>
                      )}
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              </div>
            </div>
            <CardDescription className="text-gray-300">
              浏览平台上的公共知识库，选择一个开始与AI助手对话
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {/* 搜索和过滤 */}
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input
                    placeholder="搜索知识库..."
                    className="pl-9 bg-gray-800 bg-opacity-50 border-gray-700 text-white"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
                <div className="flex gap-2 overflow-x-auto pb-1 no-scrollbar">
                  <Button
                    variant="outline"
                    size="sm"
                    className={`whitespace-nowrap ${!selectedCategory ? "bg-indigo-600 bg-opacity-20 border-indigo-500" : "border-gray-700"}`}
                    onClick={() => setSelectedCategory(null)}
                  >
                    全部
                  </Button>
                  {categories.map((category) => (
                    <Button
                      key={category}
                      variant="outline"
                      size="sm"
                      className={`whitespace-nowrap ${selectedCategory === category ? "bg-indigo-600 bg-opacity-20 border-indigo-500" : "border-gray-700"}`}
                      onClick={() => setSelectedCategory(category === selectedCategory ? null : category)}
                    >
                      {category}
                    </Button>
                  ))}
                </div>
              </div>

              {/* 知识库列表 */}
              {filteredKnowledgeBases.length === 0 ? (
                <div className="text-center py-12">
                  <div className="h-16 w-16 mx-auto rounded-full bg-gray-800 flex items-center justify-center mb-4">
                    <Search className="h-8 w-8 text-gray-500" />
                  </div>
                  <h3 className="text-xl font-medium text-white mb-2">未找到匹配的知识库</h3>
                  <p className="text-gray-300 max-w-md mx-auto">
                    没有找到符合当前筛选条件的知识库。请尝试调整搜索关键词或选择不同的类别。
                  </p>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {filteredKnowledgeBases.map((kb) => (
                    <div
                      key={kb.id}
                      className={`p-4 rounded-lg border transition-all ${
                        selectedKnowledgeBase?.id === kb.id
                          ? "bg-indigo-600 bg-opacity-20 border-indigo-500"
                          : "bg-gray-800 bg-opacity-50 border-gray-700 hover:bg-gray-700"
                      }`}
                    >
                      <div className="flex justify-between items-start">
                        <div className="flex-1">
                          <h3 className="font-medium text-white mb-1">{kb.name}</h3>
                          <p className="text-sm text-gray-200 line-clamp-2 mb-2">{kb.description}</p>
                          <div className="flex flex-wrap gap-1 mb-3">
                            {kb.tags.map((tag) => (
                              <Badge
                                key={tag}
                                variant="outline"
                                className="bg-gray-800 bg-opacity-50 text-gray-200 text-xs"
                              >
                                {tag}
                              </Badge>
                            ))}
                          </div>
                          <div className="flex items-center text-xs text-gray-300 space-x-3">
                            <span>{kb.itemCount.toLocaleString()} 条目</span>
                            <span>•</span>
                            <span>创建者: {kb.createdBy}</span>
                          </div>
                        </div>
                      </div>
                      <div className="flex justify-between mt-4">
                        <Button
                          variant="ghost"
                          size="sm"
                          className="text-indigo-300 hover:text-white hover:bg-gray-700"
                          onClick={() => handleViewKnowledgeBaseDetail(kb)}
                        >
                          <Info className="h-4 w-4 mr-1" />
                          详情
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          className={`${
                            selectedKnowledgeBase?.id === kb.id
                              ? "bg-indigo-600 text-white"
                              : "bg-gray-800 bg-opacity-50 text-indigo-300 hover:text-indigo-200"
                          }`}
                          onClick={() => handleSelectKnowledgeBase(kb)}
                        >
                          {selectedKnowledgeBase?.id === kb.id ? "已选择" : "开始对话"}
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        {/* 知识库详情对话框 */}
        <Dialog open={showKnowledgeBaseDetail} onOpenChange={setShowKnowledgeBaseDetail}>
          <DialogContent className="cosmic-card border-gray-700 max-w-4xl">
            <DialogHeader>
              <DialogTitle className="text-white flex items-center justify-between">
                <span>{detailKnowledgeBase?.name}</span>
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-8 w-8 p-0"
                  onClick={() => setShowKnowledgeBaseDetail(false)}
                >
                  <X className="h-4 w-4" />
                </Button>
              </DialogTitle>
              <DialogDescription className="text-gray-300">{detailKnowledgeBase?.description}</DialogDescription>
            </DialogHeader>

            <div className="space-y-6">
              <div className="flex flex-wrap gap-2">
                {detailKnowledgeBase?.tags.map((tag) => (
                  <Badge key={tag} className="bg-indigo-600 bg-opacity-20">
                    {tag}
                  </Badge>
                ))}
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                <div className="bg-gray-800 bg-opacity-50 p-3 rounded-lg">
                  <div className="text-gray-300">条目数量</div>
                  <div className="text-white font-medium">{detailKnowledgeBase?.itemCount.toLocaleString()}</div>
                </div>
                <div className="bg-gray-800 bg-opacity-50 p-3 rounded-lg">
                  <div className="text-gray-300">分类</div>
                  <div className="text-white font-medium">{detailKnowledgeBase?.category}</div>
                </div>
                <div className="bg-gray-800 bg-opacity-50 p-3 rounded-lg">
                  <div className="text-gray-300">创建者</div>
                  <div className="text-white font-medium">{detailKnowledgeBase?.createdBy}</div>
                </div>
                <div className="bg-gray-800 bg-opacity-50 p-3 rounded-lg">
                  <div className="text-gray-300">创建日期</div>
                  <div className="text-white font-medium">{detailKnowledgeBase?.createdAt}</div>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-medium text-white mb-3">知识库预览</h3>
                <div className="space-y-3">
                  {detailKnowledgeBase?.previewItems?.map((item) => (
                    <div key={item.id} className="bg-gray-800 bg-opacity-50 p-4 rounded-lg">
                      <h4 className="font-medium text-white mb-2">{item.title}</h4>
                      <p className="text-gray-200 text-sm">{item.content}</p>
                      {item.source && (
                        <div className="mt-2 flex items-center text-xs text-indigo-300">
                          <ExternalLink className="h-3 w-3 mr-1" />
                          <span>{item.source}</span>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex justify-between">
                <Button
                  variant="outline"
                  className="border-gray-700 text-gray-300 hover:text-white"
                  onClick={() => setShowKnowledgeBaseDetail(false)}
                >
                  关闭
                </Button>
                <Button
                  className="cosmic-button"
                  onClick={() => {
                    if (detailKnowledgeBase) {
                      handleSelectKnowledgeBase(detailKnowledgeBase)
                      setShowKnowledgeBaseDetail(false)
                    }
                  }}
                >
                  选择此知识库
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  )
}
