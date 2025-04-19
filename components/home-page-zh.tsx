import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

export function HomePageZh() {
  return (
    <div className="space-y-12 relative">
      {/* Decorative elements */}
      <div
        className="absolute top-20 left-10 w-2 h-2 bg-white rounded-full star"
        style={{ animationDelay: "0s" }}
      ></div>
      <div
        className="absolute top-40 right-20 w-1 h-1 bg-white rounded-full star"
        style={{ animationDelay: "1s" }}
      ></div>
      <div
        className="absolute bottom-10 left-1/4 w-1.5 h-1.5 bg-white rounded-full star"
        style={{ animationDelay: "2s" }}
      ></div>
      <div
        className="absolute top-1/3 right-1/3 w-1 h-1 bg-white rounded-full star"
        style={{ animationDelay: "3s" }}
      ></div>

      <section className="text-center">
        <h1 className="mb-4 text-5xl font-bold text-white float">
          欢迎使用{" "}
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400">
            Ragtor
          </span>
        </h1>
        <p className="mx-auto max-w-2xl text-xl text-gray-300 float float-delay-1">您的综合信息与互动平台</p>

        {/* Orbit element */}
        <div className="relative h-40 w-40 mx-auto mt-8 hidden md:block">
          <div className="absolute inset-0 rounded-full border border-gray-700 opacity-30"></div>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-8 w-8 rounded-full bg-indigo-500 opacity-70 blur-sm"></div>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-4 w-4 rounded-full bg-white"></div>
          <div className="absolute top-1/2 left-1/2 -translate-x-3 -translate-y-3 h-6 w-6 rounded-full bg-purple-500 opacity-70 blur-sm orbit"></div>
          <div className="absolute top-1/2 left-1/2 -translate-x-2 -translate-y-2 h-4 w-4 rounded-full bg-blue-500 opacity-70 blur-sm orbit-reverse"></div>
        </div>
      </section>

      <section className="grid gap-6 md:grid-cols-3">
        <Card className="cosmic-card cosmic-glow overflow-hidden">
          <CardContent className="p-6">
            <h2 className="mb-4 text-2xl font-bold text-white">Rag-Easy</h2>
            <p className="mb-6 text-gray-300">通用化 RAG 产品，打造 AI 专属聊天角色。</p>
            <Link
              href="/rag-easy"
              className="inline-flex items-center text-indigo-300 hover:text-indigo-200 cosmic-link"
            >
              了解更多 <ArrowRight className="ml-1 h-4 w-4" />
            </Link>
          </CardContent>
        </Card>

        <Card className="cosmic-card cosmic-glow overflow-hidden float float-delay-1">
          <CardContent className="p-6">
            <h2 className="mb-4 text-2xl font-bold text-white">Rag-UDM</h2>
            <p className="mb-6 text-gray-300">定制化 RAG 产品，集成 AI 智能客服支持。</p>
            <Link
              href="/rag-udm"
              className="inline-flex items-center text-indigo-300 hover:text-indigo-200 cosmic-link"
            >
              了解更多 <ArrowRight className="ml-1 h-4 w-4" />
            </Link>
          </CardContent>
        </Card>

        <Card className="cosmic-card cosmic-glow overflow-hidden float float-delay-2">
          <CardContent className="p-6">
            <h2 className="mb-4 text-2xl font-bold text-white">Rag-Comm</h2>
            <p className="mb-6 text-gray-300">社区交流平台，促进知识分享。</p>
            <Link
              href="/rag-comm"
              className="inline-flex items-center text-indigo-300 hover:text-indigo-200 cosmic-link"
            >
              了解更多 <ArrowRight className="ml-1 h-4 w-4" />
            </Link>
          </CardContent>
        </Card>
      </section>

      <div className="flex justify-center">
        <Button asChild className="cosmic-button px-6 py-2">
          <Link href="/introduction">了解更多关于我们</Link>
        </Button>
      </div>
    </div>
  )
}
