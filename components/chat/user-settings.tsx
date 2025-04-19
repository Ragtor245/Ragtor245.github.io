"use client"

import type React from "react"

import { useState } from "react"
import { User, UploadCloud } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

type UserSettingsProps = {
  userName: string
  userAvatar?: string
  onSave: (name: string, avatar: string) => void
}

export function UserSettings({ userName, userAvatar, onSave }: UserSettingsProps) {
  const [name, setName] = useState(userName)
  const [avatar, setAvatar] = useState(userAvatar || "")
  const [avatarFile, setAvatarFile] = useState<File | null>(null)
  const [open, setOpen] = useState(false)

  const handleAvatarUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0]
      setAvatarFile(file)

      // 创建预览URL
      const reader = new FileReader()
      reader.onload = (event) => {
        if (event.target?.result) {
          setAvatar(event.target.result as string)
        }
      }
      reader.readAsDataURL(file)
    }
  }

  const handleSave = () => {
    onSave(name, avatar)
    setOpen(false)
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="ghost" size="icon" className="text-gray-400 hover:text-white hover:bg-gray-800">
          <User className="h-5 w-5" />
          <span className="sr-only">用户设置</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="cosmic-card border-gray-700">
        <DialogHeader>
          <DialogTitle className="text-white">用户设置</DialogTitle>
          <DialogDescription className="text-gray-400">自定义您的名称和头像。</DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="flex flex-col items-center gap-4">
            <Avatar className="h-20 w-20">
              {avatar ? (
                <AvatarImage src={avatar || "/placeholder.svg"} alt={name} />
              ) : (
                <AvatarFallback className="bg-gradient-to-br from-blue-500 to-cyan-600 text-white text-xl">
                  {name.slice(0, 2)}
                </AvatarFallback>
              )}
            </Avatar>
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right text-white">
              名称
            </Label>
            <Input
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="col-span-3 bg-gray-800 bg-opacity-50 border-gray-700 text-white"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="avatar" className="text-right text-white">
              头像
            </Label>
            <div className="col-span-3">
              <label className="flex items-center justify-center w-full h-10 px-3 border border-gray-700 rounded-md bg-gray-800 bg-opacity-50 text-white cursor-pointer hover:bg-gray-700">
                <UploadCloud className="h-4 w-4 mr-2" />
                {avatarFile ? avatarFile.name : "选择图片"}
                <input type="file" id="avatar" accept="image/*" className="hidden" onChange={handleAvatarUpload} />
              </label>
            </div>
          </div>
        </div>
        <DialogFooter>
          <Button type="submit" className="cosmic-button" onClick={handleSave}>
            保存设置
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
