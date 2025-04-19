"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { ArrowRight, Search, ChevronRight, CheckCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Zap, Sparkles, Filter, Building2, User, MessageSquare } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

// 产品类型定义
type Product = {
  id: number
  title: string
  description: string
  features: string[]
  price: string
  popular: boolean
  mainCategory: "industry" | "personal"
  subCategory?: string
}

// 定制表单类型
type CustomizationForm = {
  productIdea: string
  priceExpectation: string
  type: string
  subType: string
  contactPhone: string
  contactEmail: string
  contactWeChat: string
  contactQQ: string
  lastName: string
  gender: string
  nickname: string
}

export function RagUdmContentZh() {
  const [searchQuery, setSearchQuery] = useState("")
  const [activeMainCategory, setActiveMainCategory] = useState<"all" | "industry" | "personal">("all")
  const [activeSubCategory, setActiveSubCategory] = useState<string | null>(null)
  const [formSubmitted, setFormSubmitted] = useState(false)
  const [activeTab, setActiveTab] = useState("showcase")

  // 定制表单状态
  const [customizationForm, setCustomizationForm] = useState<CustomizationForm>({
    productIdea: "",
    priceExpectation: "",
    type: "",
    subType: "",
    contactPhone: "",
    contactEmail: "",
    contactWeChat: "",
    contactQQ: "",
    lastName: "",
    gender: "",
    nickname: "",
  })

  // 行业子类别
  const industrySubCategories = [
    { id: "medical", name: "医疗" },
    { id: "environment", name: "环境" },
    { id: "finance", name: "金融" },
    { id: "education", name: "教育" },
    { id: "legal", name: "法律" },
    { id: "others", name: "其他" },
  ]

  // 产品数据
  const products: Product[] = [
    {
      id: 1,
      title: "Rag 医疗专业版",
      description: "专为医疗机构设计的高级RAG解决方案，支持医学知识检索和病例分析",
      features: ["医学知识库", "病例分析", "医疗隐私保护", "专业医疗支持"],
      price: "¥3,999/月",
      popular: true,
      mainCategory: "industry",
      subCategory: "medical",
    },
    {
      id: 2,
      title: "Rag 医疗标准版",
      description: "适合中小型医疗机构的RAG解决方案",
      features: ["基础医学知识库", "简易病例分析", "医疗数据安全", "在线支持"],
      price: "¥1,999/月",
      popular: false,
      mainCategory: "industry",
      subCategory: "medical",
    },
    {
      id: 3,
      title: "Rag 环境监测版",
      description: "环境数据分析和监测的专业RAG解决方案",
      features: ["环境数据库", "污染分析", "趋势预测", "报告生成"],
      price: "¥2,499/月",
      popular: true,
      mainCategory: "industry",
      subCategory: "environment",
    },
    {
      id: 4,
      title: "Rag 环境研究版",
      description: "为环境研究机构定制的RAG解决方案",
      features: ["全球环境数据", "研究文献整合", "数据可视化", "研究协作工具"],
      price: "¥3,299/月",
      popular: false,
      mainCategory: "industry",
      subCategory: "environment",
    },
    {
      id: 5,
      title: "Rag 金融分析版",
      description: "金融数据分析和市场预测的RAG解决方案",
      features: ["金融市场数据", "风险评估", "投资分析", "趋势预测"],
      price: "¥4,299/月",
      popular: true,
      mainCategory: "industry",
      subCategory: "finance",
    },
    {
      id: 6,
      title: "Rag 教育平台版",
      description: "为教育机构打造的学习和教学RAG平台",
      features: ["学术知识库", "教学辅助工具", "学生管理", "教育资源整合"],
      price: "¥1,899/月",
      popular: false,
      mainCategory: "industry",
      subCategory: "education",
    },
    {
      id: 7,
      title: "Rag 法律助手版",
      description: "法律文献检索和案例分析的RAG解决方案",
      features: ["法律文献库", "案例分析", "法规更新", "法律咨询支持"],
      price: "¥3,599/月",
      popular: false,
      mainCategory: "industry",
      subCategory: "legal",
    },
    {
      id: 8,
      title: "Rag 个人专业版",
      description: "为个人专业用户设计的高级RAG解决方案",
      features: ["多领域知识库", "高级AI模型", "个性化定制", "优先支持"],
      price: "¥299/月",
      popular: true,
      mainCategory: "personal",
    },
    {
      id: 9,
      title: "Rag 个人标准版",
      description: "满足个人日常需求的RAG解决方案",
      features: ["基础知识库", "标准AI模型", "文档处理", "社区支持"],
      price: "¥99/月",
      popular: false,
      mainCategory: "personal",
    },
    {
      id: 10,
      title: "Rag 个人学习版",
      description: "专为学生和自学者设计的RAG解决方案",
      features: ["学习资源库", "学习辅助工具", "笔记整合", "学习进度跟踪"],
      price: "¥69/月",
      popular: false,
      mainCategory: "personal",
    },
    {
      id: 11,
      title: "Rag 农业智能版",
      description: "为农业领域设计的智能RAG解决方案，支持农作物管理和生产优化",
      features: ["农业知识库", "气候数据分析", "作物生长监测", "农业生产规划"],
      price: "¥2,799/月",
      popular: false,
      mainCategory: "industry",
      subCategory: "others",
    },
    {
      id: 12,
      title: "Rag 制造业版",
      description: "面向制造业的RAG解决方案，优化生产流程和质量控制",
      features: ["制造工艺库", "质量控制分析", "供应链优化", "生产效率提升"],
      price: "¥3,499/月",
      popular: true,
      mainCategory: "industry",
      subCategory: "others",
    },
    {
      id: 13,
      title: "Rag 旅游服务版",
      description: "为旅游行业打造的RAG解决方案，提升客户体验和服务质量",
      features: ["旅游资源库", "客户偏好分析", "行程规划", "多语言支持"],
      price: "¥1,999/月",
      popular: false,
      mainCategory: "industry",
      subCategory: "others",
    },
  ]

  // 过滤产品
  const filteredProducts = products.filter((product) => {
    // 主类别过滤
    const mainCategoryMatch = activeMainCategory === "all" || product.mainCategory === activeMainCategory

    // 子类别过滤（仅当选择了行业类别且指定了子类别时应用）
    const subCategoryMatch =
      activeMainCategory !== "industry" || activeSubCategory === null || product.subCategory === activeSubCategory

    // 搜索过滤
    const searchMatch =
      searchQuery === "" ||
      product.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.features.some((feature) => feature.toLowerCase().includes(searchQuery.toLowerCase()))

    return mainCategoryMatch && subCategoryMatch && searchMatch
  })

  // 处理主类别切换
  const handleMainCategoryChange = (value: string) => {
    setActiveMainCategory(value as "all" | "industry" | "personal")
    setActiveSubCategory(null) // 重置子类别
  }

  // 处理子类别切换
  const handleSubCategoryChange = (subCategory: string) => {
    setActiveSubCategory(activeSubCategory === subCategory ? null : subCategory)
  }

  // 处理表单输入变化
  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setCustomizationForm((prev) => ({ ...prev, [name]: value }))
  }

  // 处理选择框变化
  const handleSelectChange = (name: string, value: string) => {
    setCustomizationForm((prev) => ({ ...prev, [name]: value }))
  }

  // 处理表单提交
  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("提交的定制需求:", customizationForm)
    setFormSubmitted(true)
    // 在实际应用中，这里会发送数据到后端
  }

  // 重置表单
  const resetForm = () => {
    setFormSubmitted(false)
    setCustomizationForm({
      productIdea: "",
      priceExpectation: "",
      type: "",
      subType: "",
      contactPhone: "",
      contactEmail: "",
      contactWeChat: "",
      contactQQ: "",
      lastName: "",
      gender: "",
      nickname: "",
    })
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="mb-4 text-3xl font-bold text-white">Rag-UDM</h1>
        <p className="text-lg text-gray-300">定制化 RAG 产品，集成 AI 私人客服支持。</p>
      </div>

      {/* 页面切换滑块 */}
      <div className="mb-8">
        <Tabs value={activeTab} className="w-full" onValueChange={setActiveTab}>
          <TabsList className="w-full grid grid-cols-2 bg-gray-800 bg-opacity-50 p-1 rounded-lg">
            <TabsTrigger
              value="showcase"
              className="py-3 data-[state=active]:bg-indigo-600 data-[state=active]:text-white rounded-md transition-all"
            >
              <Sparkles className="mr-2 h-5 w-5" />
              定制化 RAG 产品展示
            </TabsTrigger>
            <TabsTrigger
              value="customize"
              className="py-3 data-[state=active]:bg-indigo-600 data-[state=active]:text-white rounded-md transition-all"
            >
              <MessageSquare className="mr-2 h-5 w-5" />
              个性化定制 RAG 产品
            </TabsTrigger>
          </TabsList>

          {/* 产品展示页面 */}
          <TabsContent value="showcase" className="mt-6 space-y-6">
            {/* 产品搜索栏 */}
            <div className="relative mb-6">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
              <Input
                type="search"
                placeholder="搜索产品..."
                className="pl-10 bg-gray-800 bg-opacity-50 border-gray-700 text-white placeholder:text-gray-400"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>

            {/* 产品过滤器 */}
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold text-white flex items-center">
                <Sparkles className="mr-2 h-6 w-6 text-indigo-400" />
                产品列表
              </h2>
              <div className="flex items-center gap-2">
                <Filter className="h-4 w-4 text-gray-400" />
                <Tabs defaultValue="all" className="w-auto" onValueChange={handleMainCategoryChange}>
                  <TabsList className="bg-gray-800 bg-opacity-50">
                    <TabsTrigger value="all" className="text-sm">
                      全部
                    </TabsTrigger>
                    <TabsTrigger value="industry" className="text-sm flex items-center">
                      <Building2 className="mr-1 h-3.5 w-3.5" />
                      行业
                    </TabsTrigger>
                    <TabsTrigger value="personal" className="text-sm flex items-center">
                      <User className="mr-1 h-3.5 w-3.5" />
                      个人
                    </TabsTrigger>
                  </TabsList>
                </Tabs>
              </div>
            </div>

            {/* 行业子类别 */}
            {activeMainCategory === "industry" && (
              <div className="flex flex-wrap gap-2 mb-4">
                {industrySubCategories.map((category) => (
                  <Button
                    key={category.id}
                    variant="outline"
                    size="sm"
                    className={`bg-gray-800 bg-opacity-50 border-gray-700 text-gray-300 hover:text-white hover:bg-gray-700 ${
                      activeSubCategory === category.id ? "border-indigo-500 text-indigo-300" : ""
                    }`}
                    onClick={() => handleSubCategoryChange(category.id)}
                  >
                    {category.name}
                    {activeSubCategory === category.id && <ChevronRight className="ml-1 h-3 w-3 transform rotate-90" />}
                  </Button>
                ))}
              </div>
            )}

            {/* 产品列表 */}
            <Card className="cosmic-card overflow-hidden">
              <CardContent className="p-6">
                {filteredProducts.length > 0 ? (
                  <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                    {filteredProducts.map((product) => (
                      <div
                        key={product.id}
                        className={`rounded-lg border ${
                          product.popular ? "border-indigo-500" : "border-gray-700"
                        } p-6 relative overflow-hidden cosmic-glow`}
                      >
                        {product.popular && (
                          <div className="absolute top-0 right-0">
                            <Badge className="bg-indigo-600 text-white m-2">热门</Badge>
                          </div>
                        )}
                        <div className="mb-4 flex items-center justify-between">
                          <h3 className="text-xl font-bold text-white">{product.title}</h3>
                        </div>
                        <p className="mb-4 text-gray-300">{product.description}</p>
                        <div className="mb-4 text-2xl font-bold text-white">{product.price}</div>
                        <ul className="mb-6 space-y-2">
                          {product.features.map((feature, index) => (
                            <li key={index} className="flex items-center gap-2 text-gray-300">
                              <Zap className="h-4 w-4 text-indigo-400" />
                              <span>{feature}</span>
                            </li>
                          ))}
                        </ul>
                        <Button className="w-full cosmic-button">了解详情</Button>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="flex flex-col items-center justify-center py-12 text-center">
                    <div className="h-16 w-16 rounded-full bg-gray-800 flex items-center justify-center mb-4">
                      <Search className="h-8 w-8 text-gray-500" />
                    </div>
                    <h3 className="text-xl font-medium text-white mb-2">未找到匹配的产品</h3>
                    <p className="text-gray-400 max-w-md">
                      没有找到符合当前筛选条件的产品。请尝试调整搜索关键词或选择不同的类别。
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>

            <div className="flex justify-center mt-6">
              <Button
                onClick={() => {
                  setActiveTab("customize")
                  // 强制更新Tabs组件的值
                  const tabsElement = document.querySelector('[data-state="active"][data-orientation="horizontal"]')
                  if (tabsElement) {
                    const customizeTab = document.querySelector('[data-value="customize"]')
                    if (customizeTab) {
                      ;(customizeTab as HTMLElement).click()
                    }
                  }
                  // 滚动到页面顶部
                  window.scrollTo({ top: 0, behavior: "smooth" })
                }}
                className="cosmic-button px-6"
              >
                定制专属 RAG 产品
              </Button>
            </div>
          </TabsContent>

          {/* 个性化定制页面 */}
          <TabsContent value="customize" className="mt-6 space-y-6">
            <Card className="cosmic-card overflow-hidden">
              <CardContent className="p-6">
                {!formSubmitted ? (
                  <form onSubmit={handleFormSubmit} className="space-y-6">
                    <div className="space-y-4">
                      <div>
                        <Label htmlFor="productIdea" className="text-white">
                          您想定制的产品创意
                        </Label>
                        <Textarea
                          id="productIdea"
                          name="productIdea"
                          placeholder="请描述您想要定制的RAG产品功能、用途和特点..."
                          className="mt-1 min-h-[100px] bg-gray-800 bg-opacity-50 border-gray-700 text-white placeholder:text-gray-400"
                          value={customizationForm.productIdea}
                          onChange={handleFormChange}
                          required
                        />
                      </div>

                      <div>
                        <Label htmlFor="priceExpectation" className="text-white">
                          价格预期
                        </Label>
                        <Input
                          id="priceExpectation"
                          name="priceExpectation"
                          placeholder="您期望的价格范围，例如：¥1,000-2,000/月"
                          className="mt-1 bg-gray-800 bg-opacity-50 border-gray-700 text-white placeholder:text-gray-400"
                          value={customizationForm.priceExpectation}
                          onChange={handleFormChange}
                          required
                        />
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="type" className="text-white">
                            产品类型
                          </Label>
                          <Select onValueChange={(value) => handleSelectChange("type", value)} required>
                            <SelectTrigger
                              id="type"
                              className="mt-1 bg-gray-800 bg-opacity-50 border-gray-700 text-white"
                            >
                              <SelectValue placeholder="选择产品类型" />
                            </SelectTrigger>
                            <SelectContent className="bg-gray-800 border-gray-700 text-white">
                              <SelectItem value="personal">个人使用</SelectItem>
                              <SelectItem value="industry">行业应用</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>

                        {customizationForm.type === "industry" && (
                          <div>
                            <Label htmlFor="subType" className="text-white">
                              行业类型
                            </Label>
                            <Select onValueChange={(value) => handleSelectChange("subType", value)} required>
                              <SelectTrigger
                                id="subType"
                                className="mt-1 bg-gray-800 bg-opacity-50 border-gray-700 text-white"
                              >
                                <SelectValue placeholder="选择行业类型" />
                              </SelectTrigger>
                              <SelectContent className="bg-gray-800 border-gray-700 text-white">
                                <SelectItem value="medical">医疗</SelectItem>
                                <SelectItem value="environment">环境</SelectItem>
                                <SelectItem value="finance">金融</SelectItem>
                                <SelectItem value="education">教育</SelectItem>
                                <SelectItem value="legal">法律</SelectItem>
                                <SelectItem value="agriculture">农业</SelectItem>
                                <SelectItem value="manufacturing">制造业</SelectItem>
                                <SelectItem value="tourism">旅游</SelectItem>
                                <SelectItem value="others">其他</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                        )}
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="contactPhone" className="text-white">
                            联系电话
                          </Label>
                          <Input
                            id="contactPhone"
                            name="contactPhone"
                            placeholder="您的联系电话"
                            className="mt-1 bg-gray-800 bg-opacity-50 border-gray-700 text-white placeholder:text-gray-400"
                            value={customizationForm.contactPhone}
                            onChange={handleFormChange}
                          />
                        </div>

                        <div>
                          <Label htmlFor="contactEmail" className="text-white">
                            电子邮箱
                          </Label>
                          <Input
                            id="contactEmail"
                            name="contactEmail"
                            type="email"
                            placeholder="您的电子邮箱"
                            className="mt-1 bg-gray-800 bg-opacity-50 border-gray-700 text-white placeholder:text-gray-400"
                            value={customizationForm.contactEmail}
                            onChange={handleFormChange}
                            required
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="contactWeChat" className="text-white">
                            微信
                          </Label>
                          <Input
                            id="contactWeChat"
                            name="contactWeChat"
                            placeholder="您的微信号"
                            className="mt-1 bg-gray-800 bg-opacity-50 border-gray-700 text-white placeholder:text-gray-400"
                            value={customizationForm.contactWeChat}
                            onChange={handleFormChange}
                          />
                        </div>

                        <div>
                          <Label htmlFor="contactQQ" className="text-white">
                            QQ
                          </Label>
                          <Input
                            id="contactQQ"
                            name="contactQQ"
                            placeholder="您的QQ号"
                            className="mt-1 bg-gray-800 bg-opacity-50 border-gray-700 text-white placeholder:text-gray-400"
                            value={customizationForm.contactQQ}
                            onChange={handleFormChange}
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div>
                          <Label htmlFor="lastName" className="text-white">
                            姓氏
                          </Label>
                          <Input
                            id="lastName"
                            name="lastName"
                            placeholder="您的姓氏"
                            className="mt-1 bg-gray-800 bg-opacity-50 border-gray-700 text-white placeholder:text-gray-400"
                            value={customizationForm.lastName}
                            onChange={handleFormChange}
                            required
                          />
                        </div>

                        <div>
                          <Label htmlFor="gender" className="text-white">
                            性别
                          </Label>
                          <RadioGroup
                            onValueChange={(value) => handleSelectChange("gender", value)}
                            className="flex mt-2 space-x-4"
                          >
                            <div className="flex items-center space-x-2">
                              <RadioGroupItem value="male" id="male" className="border-gray-500" />
                              <Label htmlFor="male" className="text-gray-300">
                                先生
                              </Label>
                            </div>
                            <div className="flex items-center space-x-2">
                              <RadioGroupItem value="female" id="female" className="border-gray-500" />
                              <Label htmlFor="female" className="text-gray-300">
                                女士
                              </Label>
                            </div>
                          </RadioGroup>
                        </div>

                        <div>
                          <Label htmlFor="nickname" className="text-white">
                            昵称
                          </Label>
                          <Input
                            id="nickname"
                            name="nickname"
                            placeholder="您希望我们如何称呼您"
                            className="mt-1 bg-gray-800 bg-opacity-50 border-gray-700 text-white placeholder:text-gray-400"
                            value={customizationForm.nickname}
                            onChange={handleFormChange}
                          />
                        </div>
                      </div>
                    </div>

                    <Button type="submit" className="w-full cosmic-button">
                      提交定制需求
                    </Button>
                  </form>
                ) : (
                  <div className="flex flex-col items-center justify-center py-12 text-center">
                    <div className="h-16 w-16 rounded-full bg-indigo-500 bg-opacity-20 flex items-center justify-center mb-4">
                      <CheckCircle className="h-8 w-8 text-indigo-400" />
                    </div>
                    <h3 className="text-xl font-medium text-white mb-2">定制需求已提交</h3>
                    <p className="text-gray-300 max-w-md mb-6">
                      感谢您的信任！我们已收到您的定制需求，我们的产品专家将在1-2个工作日内与您联系，为您提供个性化的RAG产品解决方案。
                    </p>
                    <Button onClick={resetForm} className="cosmic-button">
                      提交新的需求
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>

            <div className="flex justify-center mt-6">
              <Button
                onClick={() => {
                  setActiveTab("showcase")
                  // 强制更新Tabs组件的值
                  const tabsElement = document.querySelector('[data-state="active"][data-orientation="horizontal"]')
                  if (tabsElement) {
                    const showcaseTab = document.querySelector('[data-value="showcase"]')
                    if (showcaseTab) {
                      ;(showcaseTab as HTMLElement).click()
                    }
                  }
                  // 滚动到页面顶部
                  window.scrollTo({ top: 0, behavior: "smooth" })
                }}
                className="cosmic-button px-6"
              >
                查看现有 RAG 产品
              </Button>
            </div>
          </TabsContent>
        </Tabs>
      </div>

      <div className="flex justify-end">
        <Link href="/rag-comm" className="inline-flex items-center text-indigo-300 hover:text-indigo-200 cosmic-link">
          了解 Rag-Comm <ArrowRight className="ml-1 h-4 w-4" />
        </Link>
      </div>
    </div>
  )
}
