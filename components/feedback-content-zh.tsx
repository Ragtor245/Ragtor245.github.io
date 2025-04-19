"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { ArrowRight, CheckCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export function FeedbackContentZh() {
  const [submitted, setSubmitted] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    feedbackType: "",
    subject: "",
    message: "",
    satisfaction: "",
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("反馈已提交:", formData)
    setSubmitted(true)
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  if (submitted) {
    return (
      <Card className="mx-auto max-w-md cosmic-card overflow-hidden">
        <CardContent className="p-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <CheckCircle className="h-12 w-12 text-green-500" />
            <h2 className="text-2xl font-bold">谢谢您！</h2>
            <p className="text-gray-600">您的反馈已成功提交。我们感谢您的意见，并将用它来改进我们的服务。</p>
            <Button onClick={() => setSubmitted(false)} className="cosmic-button">
              提交另一条反馈
            </Button>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="mb-4 text-3xl font-bold text-white">用户反馈</h1>
        <p className="text-lg text-gray-300">我们重视您的反馈。请分享您的想法、建议或报告您遇到的任何问题。</p>
      </div>

      <Card className="cosmic-card overflow-hidden">
        <CardContent className="p-6">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid gap-6 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="name" className="text-white">
                  姓名
                </Label>
                <Input
                  id="name"
                  name="name"
                  placeholder="您的姓名"
                  value={formData.name}
                  onChange={handleChange}
                  className="bg-gray-800 bg-opacity-50 border-gray-700 text-white placeholder:text-gray-400"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email" className="text-white">
                  邮箱
                </Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="您的邮箱"
                  value={formData.email}
                  onChange={handleChange}
                  className="bg-gray-800 bg-opacity-50 border-gray-700 text-white placeholder:text-gray-400"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="feedbackType" className="text-white">
                反馈类型
              </Label>
              <Select onValueChange={(value) => handleSelectChange("feedbackType", value)} required>
                <SelectTrigger
                  id="feedbackType"
                  className="bg-gray-800 bg-opacity-50 border-gray-700 text-white placeholder:text-gray-400"
                >
                  <SelectValue placeholder="选择反馈类型" />
                </SelectTrigger>
                <SelectContent className="bg-gray-800 text-white">
                  <SelectItem value="suggestion">建议</SelectItem>
                  <SelectItem value="issue">问题报告</SelectItem>
                  <SelectItem value="question">问题咨询</SelectItem>
                  <SelectItem value="praise">表扬</SelectItem>
                  <SelectItem value="other">其他</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="subject" className="text-white">
                主题
              </Label>
              <Input
                id="subject"
                name="subject"
                placeholder="简短描述"
                value={formData.subject}
                onChange={handleChange}
                className="bg-gray-800 bg-opacity-50 border-gray-700 text-white placeholder:text-gray-400"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="message" className="text-white">
                留言
              </Label>
              <Textarea
                id="message"
                name="message"
                placeholder="请提供有关您反馈的详细信息"
                className="min-h-[150px] bg-gray-800 bg-opacity-50 border-gray-700 text-white placeholder:text-gray-400"
                value={formData.message}
                onChange={handleChange}
                required
              />
            </div>

            <div className="space-y-2">
              <Label className="text-white">您对Ragtor的满意度如何？</Label>
              <RadioGroup
                onValueChange={(value) => handleSelectChange("satisfaction", value)}
                className="flex space-x-4"
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="very-satisfied" id="very-satisfied" />
                  <Label htmlFor="very-satisfied" className="text-gray-300">
                    非常满意
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="satisfied" id="satisfied" />
                  <Label htmlFor="satisfied" className="text-gray-300">
                    满意
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="neutral" id="neutral" />
                  <Label htmlFor="neutral" className="text-gray-300">
                    一般
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="unsatisfied" id="unsatisfied" />
                  <Label htmlFor="unsatisfied" className="text-gray-300">
                    不满意
                  </Label>
                </div>
              </RadioGroup>
            </div>

            <Button type="submit" className="w-full cosmic-button">
              提交反馈
            </Button>
          </form>
        </CardContent>
      </Card>

      <div className="flex justify-end">
        <Link href="/" className="inline-flex items-center text-indigo-300 hover:text-indigo-200 cosmic-link">
          返回首页 <ArrowRight className="ml-1 h-4 w-4" />
        </Link>
      </div>
    </div>
  )
}
