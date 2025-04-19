"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Input } from "@/components/ui/input"
import { MessageSquare, Users, Bookmark, Send } from "lucide-react"

export function RagCommContent() {
  const [message, setMessage] = useState("")

  const discussions = [
    {
      id: 1,
      title: "Best practices for RAG implementation",
      author: "Alex Johnson",
      avatar: "AJ",
      date: "2 hours ago",
      replies: 12,
      views: 89,
    },
    {
      id: 2,
      title: "How to optimize vector search in RAG applications?",
      author: "Maria Garcia",
      avatar: "MG",
      date: "Yesterday",
      replies: 8,
      views: 56,
    },
    {
      id: 3,
      title: "Integrating external knowledge bases with RAG",
      author: "David Kim",
      avatar: "DK",
      date: "2 days ago",
      replies: 15,
      views: 124,
    },
    {
      id: 4,
      title: "Handling multilingual content in RAG systems",
      author: "Sophie Chen",
      avatar: "SC",
      date: "3 days ago",
      replies: 6,
      views: 42,
    },
  ]

  const messages = [
    {
      id: 1,
      author: "Alex Johnson",
      avatar: "AJ",
      content: "Has anyone implemented RAG with multilingual support? I'm looking for best practices.",
      time: "10:23 AM",
    },
    {
      id: 2,
      author: "Maria Garcia",
      avatar: "MG",
      content:
        "Yes, we've done it using language-specific embeddings and a detection layer to route queries appropriately.",
      time: "10:45 AM",
    },
    {
      id: 3,
      author: "David Kim",
      avatar: "DK",
      content:
        "We found that using a unified vector space with language markers works well too. Happy to share more details if you're interested.",
      time: "11:02 AM",
    },
  ]

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">Rag-Comm</h1>
        <p className="text-muted-foreground">
          Connect with other users, share insights, and participate in discussions
        </p>
      </div>

      <Tabs defaultValue="forum">
        <TabsList className="grid w-full grid-cols-2 md:w-auto md:grid-cols-3">
          <TabsTrigger value="forum" className="flex items-center gap-2">
            <MessageSquare className="h-4 w-4" />
            <span className="hidden sm:inline">Forum</span>
          </TabsTrigger>
          <TabsTrigger value="chat" className="flex items-center gap-2">
            <Users className="h-4 w-4" />
            <span className="hidden sm:inline">Live Chat</span>
          </TabsTrigger>
          <TabsTrigger value="resources" className="flex items-center gap-2">
            <Bookmark className="h-4 w-4" />
            <span className="hidden sm:inline">Resources</span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="forum" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Discussion Forum</CardTitle>
              <CardDescription>Browse and participate in community discussions</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {discussions.map((discussion) => (
                  <div key={discussion.id} className="flex items-start gap-4 rounded-lg border p-4 hover:bg-accent">
                    <Avatar>
                      <AvatarFallback>{discussion.avatar}</AvatarFallback>
                    </Avatar>
                    <div className="flex-1 space-y-1">
                      <h3 className="font-medium">{discussion.title}</h3>
                      <div className="flex flex-wrap gap-2 text-sm text-muted-foreground">
                        <span>By {discussion.author}</span>
                        <span>•</span>
                        <span>{discussion.date}</span>
                        <span>•</span>
                        <span>{discussion.replies} replies</span>
                        <span>•</span>
                        <span>{discussion.views} views</span>
                      </div>
                    </div>
                    <Button variant="ghost" size="sm">
                      View
                    </Button>
                  </div>
                ))}
              </div>
            </CardContent>
            <CardFooter>
              <Button className="w-full">Start New Discussion</Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="chat" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Live Chat</CardTitle>
              <CardDescription>Chat with community members in real-time</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[400px] space-y-4 overflow-y-auto rounded-md border p-4">
                {messages.map((msg) => (
                  <div key={msg.id} className="flex gap-3">
                    <Avatar>
                      <AvatarFallback>{msg.avatar}</AvatarFallback>
                    </Avatar>
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="font-medium">{msg.author}</span>
                        <span className="text-xs text-muted-foreground">{msg.time}</span>
                      </div>
                      <p>{msg.content}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
            <CardFooter>
              <form
                className="flex w-full items-center gap-2"
                onSubmit={(e) => {
                  e.preventDefault()
                  setMessage("")
                }}
              >
                <Input
                  placeholder="Type your message..."
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                />
                <Button type="submit" size="icon">
                  <Send className="h-4 w-4" />
                </Button>
              </form>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="resources" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Community Resources</CardTitle>
              <CardDescription>Shared resources and knowledge base</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="rounded-lg border p-4">
                  <h3 className="font-medium">RAG Implementation Guide</h3>
                  <p className="text-sm text-muted-foreground">Comprehensive guide on implementing RAG systems</p>
                  <Button variant="outline" size="sm" className="mt-2">
                    Download
                  </Button>
                </div>
                <div className="rounded-lg border p-4">
                  <h3 className="font-medium">Vector Database Comparison</h3>
                  <p className="text-sm text-muted-foreground">
                    Analysis of different vector databases for RAG applications
                  </p>
                  <Button variant="outline" size="sm" className="mt-2">
                    View
                  </Button>
                </div>
                <div className="rounded-lg border p-4">
                  <h3 className="font-medium">RAG Performance Benchmarks</h3>
                  <p className="text-sm text-muted-foreground">Benchmark results for various RAG configurations</p>
                  <Button variant="outline" size="sm" className="mt-2">
                    View
                  </Button>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button className="w-full">Share a Resource</Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
