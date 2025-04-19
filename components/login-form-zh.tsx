"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export function LoginFormZh() {
  const [isLoading, setIsLoading] = useState(false)

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setTimeout(() => {
      setIsLoading(false)
    }, 1500)
  }

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setTimeout(() => {
      setIsLoading(false)
    }, 1500)
  }

  return (
    <Card className="cosmic-card overflow-hidden">
      <Tabs defaultValue="login">
        <TabsList className="grid w-full grid-cols-2 bg-gray-800 bg-opacity-50">
          <TabsTrigger value="login" className="data-[state=active]:bg-indigo-600 data-[state=active]:text-white">
            登录
          </TabsTrigger>
          <TabsTrigger value="register" className="data-[state=active]:bg-indigo-600 data-[state=active]:text-white">
            注册
          </TabsTrigger>
        </TabsList>

        <TabsContent value="login">
          <CardContent className="p-6">
            <form onSubmit={handleLogin} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email" className="text-white">
                  邮箱
                </Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="m@example.com"
                  className="bg-gray-800 bg-opacity-50 border-gray-700 text-white placeholder:text-gray-400"
                  required
                />
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="password" className="text-white">
                    密码
                  </Label>
                  <Link href="/forgot-password" className="text-xs text-indigo-300 hover:text-indigo-200">
                    忘记密码？
                  </Link>
                </div>
                <Input
                  id="password"
                  type="password"
                  className="bg-gray-800 bg-opacity-50 border-gray-700 text-white"
                  required
                />
              </div>
              <Button type="submit" className="w-full cosmic-button" disabled={isLoading}>
                {isLoading ? "登录中..." : "登录"}
              </Button>
            </form>
          </CardContent>
        </TabsContent>

        <TabsContent value="register">
          <CardContent className="p-6">
            <form onSubmit={handleRegister} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="first-name" className="text-white">
                    名
                  </Label>
                  <Input id="first-name" className="bg-gray-800 bg-opacity-50 border-gray-700 text-white" required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="last-name" className="text-white">
                    姓
                  </Label>
                  <Input id="last-name" className="bg-gray-800 bg-opacity-50 border-gray-700 text-white" required />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="email" className="text-white">
                  邮箱
                </Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="m@example.com"
                  className="bg-gray-800 bg-opacity-50 border-gray-700 text-white placeholder:text-gray-400"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password" className="text-white">
                  密码
                </Label>
                <Input
                  id="password"
                  type="password"
                  className="bg-gray-800 bg-opacity-50 border-gray-700 text-white"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="confirm-password" className="text-white">
                  确认密码
                </Label>
                <Input
                  id="confirm-password"
                  type="password"
                  className="bg-gray-800 bg-opacity-50 border-gray-700 text-white"
                  required
                />
              </div>
              <Button type="submit" className="w-full cosmic-button" disabled={isLoading}>
                {isLoading ? "创建账户中..." : "创建账户"}
              </Button>
            </form>
          </CardContent>
        </TabsContent>
      </Tabs>
    </Card>
  )
}
