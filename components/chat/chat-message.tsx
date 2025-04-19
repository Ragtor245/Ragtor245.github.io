import { cn } from "@/lib/utils"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

type ChatMessageProps = {
  content: string
  isBot: boolean
  avatar?: string
  name: string
  isStreaming?: boolean
}

export function ChatMessage({ content, isBot, avatar, name, isStreaming = false }: ChatMessageProps) {
  return (
    <div className={cn("flex w-full gap-3 mb-4", isBot ? "justify-start" : "justify-end")}>
      {isBot && (
        <Avatar className="h-8 w-8 mt-1">
          {avatar ? (
            <AvatarImage src={avatar || "/placeholder.svg"} alt={name} />
          ) : (
            <AvatarFallback className="bg-gradient-to-br from-indigo-500 to-purple-600 text-white">
              {name.slice(0, 2)}
            </AvatarFallback>
          )}
        </Avatar>
      )}
      <div
        className={cn(
          "max-w-[80%] rounded-2xl px-4 py-2",
          isBot
            ? "bg-gray-800 bg-opacity-70 text-white border border-gray-700"
            : "bg-indigo-600 bg-opacity-90 text-white",
        )}
      >
        <div className="text-xs mb-1 opacity-70">{name}</div>
        <div className={cn(isStreaming && isBot && "after:content-['▋'] after:animate-pulse after:ml-1")}>
          {content}
        </div>
      </div>
      {!isBot && (
        <Avatar className="h-8 w-8 mt-1">
          {avatar ? (
            <AvatarImage src={avatar || "/placeholder.svg"} alt={name} />
          ) : (
            <AvatarFallback className="bg-gradient-to-br from-blue-500 to-cyan-600 text-white">
              {name.slice(0, 2)}
            </AvatarFallback>
          )}
        </Avatar>
      )}
    </div>
  )
}
