"use client"

import type React from "react"
import { useState, useRef, useEffect } from "react"
import { X, Minus, Maximize2 } from "lucide-react"
import { cn } from "@/lib/utils"

interface DraggableWindowProps {
  title: string
  children: React.ReactNode
  defaultPosition?: { x: number; y: number }
  className?: string
  onClose?: () => void
}

export function DraggableWindow({
  title,
  children,
  defaultPosition = { x: 20, y: 20 },
  className,
  onClose,
}: DraggableWindowProps) {
  const [position, setPosition] = useState(defaultPosition)
  const [isDragging, setIsDragging] = useState(false)
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 })
  const [isMinimized, setIsMinimized] = useState(false)
  const windowRef = useRef<HTMLDivElement>(null)

  // 处理拖动开始
  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    if (windowRef.current) {
      const rect = windowRef.current.getBoundingClientRect()
      setDragOffset({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      })
      setIsDragging(true)
    }
  }

  // 处理拖动
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (isDragging) {
        setPosition({
          x: e.clientX - dragOffset.x,
          y: e.clientY - dragOffset.y,
        })
      }
    }

    const handleMouseUp = () => {
      setIsDragging(false)
    }

    if (isDragging) {
      document.addEventListener("mousemove", handleMouseMove)
      document.addEventListener("mouseup", handleMouseUp)
    }

    return () => {
      document.removeEventListener("mousemove", handleMouseMove)
      document.removeEventListener("mouseup", handleMouseUp)
    }
  }, [isDragging, dragOffset])

  // 切换最小化状态
  const toggleMinimize = () => {
    setIsMinimized(!isMinimized)
  }

  return (
    <div
      ref={windowRef}
      className={cn(
        "fixed z-50 flex flex-col rounded-lg shadow-lg transition-all",
        isMinimized ? "h-12 w-64" : "h-[500px] w-[350px]",
        isDragging ? "opacity-80" : "opacity-100",
        className,
      )}
      style={{
        left: `${position.x}px`,
        top: `${position.y}px`,
      }}
    >
      {/* 窗口标题栏 */}
      <div
        className="flex h-12 items-center justify-between rounded-t-lg bg-gray-900 px-4 cursor-move"
        onMouseDown={handleMouseDown}
      >
        <div className="font-medium text-white">{title}</div>
        <div className="flex items-center space-x-2">
          <button
            onClick={toggleMinimize}
            className="flex h-6 w-6 items-center justify-center rounded-full text-gray-400 hover:bg-gray-800 hover:text-white"
          >
            {isMinimized ? <Maximize2 className="h-3.5 w-3.5" /> : <Minus className="h-3.5 w-3.5" />}
          </button>
          {onClose && (
            <button
              onClick={onClose}
              className="flex h-6 w-6 items-center justify-center rounded-full text-gray-400 hover:bg-gray-800 hover:text-white"
            >
              <X className="h-3.5 w-3.5" />
            </button>
          )}
        </div>
      </div>

      {/* 窗口内容 */}
      <div
        className={cn("flex-1 overflow-hidden rounded-b-lg transition-all", isMinimized ? "invisible h-0" : "visible")}
      >
        {children}
      </div>
    </div>
  )
}
