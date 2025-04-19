import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"

export function IntroductionContentZh() {
  const teamMembers = [
    { name: "张伟", role: "创始人兼CEO", avatar: "张" },
    { name: "李娜", role: "技术总监", avatar: "李" },
    { name: "王强", role: "首席开发者", avatar: "王" },
    { name: "陈明", role: "用户体验设计师", avatar: "陈" },
    { name: "刘洋", role: "数据科学家", avatar: "刘" },
    { name: "赵芳", role: "产品经理", avatar: "赵" },
    { name: "吴杰", role: "AI专家", avatar: "吴" },
    { name: "孙丽", role: "市场总监", avatar: "孙" },
  ]

  return (
    <div className="space-y-8 relative">
      {/* Decorative elements */}
      <div
        className="absolute top-10 left-20 w-2 h-2 bg-white rounded-full star"
        style={{ animationDelay: "0.5s" }}
      ></div>
      <div
        className="absolute top-60 right-40 w-1 h-1 bg-white rounded-full star"
        style={{ animationDelay: "1.5s" }}
      ></div>
      <div
        className="absolute bottom-20 left-1/3 w-1.5 h-1.5 bg-white rounded-full star"
        style={{ animationDelay: "2.5s" }}
      ></div>

      <div>
        <h1 className="mb-4 text-3xl font-bold text-white">关于我们</h1>
        <p className="text-lg text-gray-300">了解 Ragtor 团队和我们的使命</p>
      </div>

      <Card className="cosmic-card overflow-hidden">
        <CardContent className="p-6">
          <div className="prose max-w-none text-gray-300">
            <h2 className="text-indigo-300">我们的使命</h2>
            <p>
              在Ragtor，我们相信信息可访问性的力量。我们的使命是创建一个平台，
              用户可以轻松提交数据，获取准确结果，并在协作环境中与志同道合的人联系。
            </p>

            <h2 className="text-indigo-300">我们的愿景</h2>
            <p>
              我们设想一个信息检索毫不费力、准确且根据个人需求定制的世界。
              Ragtor旨在成为这一革命的前沿，提供尖端工具和服务，使用户能够做出明智的决策。
            </p>

            <h2 className="text-indigo-300">核心价值观</h2>
            <ul>
              <li>
                <strong className="text-indigo-300">准确性：</strong> 我们将信息的准确性置于首位。
              </li>
              <li>
                <strong className="text-indigo-300">可访问性：</strong> 我们相信信息应该对每个人都是可访问的。
              </li>
              <li>
                <strong className="text-indigo-300">创新：</strong> 我们不断努力创新和改进我们的服务。
              </li>
              <li>
                <strong className="text-indigo-300">社区：</strong> 我们培养一个知识自由共享的协作社区。
              </li>
              <li>
                <strong className="text-indigo-300">隐私：</strong> 我们尊重用户隐私并保持最高标准的数据安全。
              </li>
            </ul>
          </div>

          <div className="mt-12 relative">
            {/* Cosmic decoration */}
            <div className="absolute -top-10 left-1/2 -translate-x-1/2 w-40 h-1 bg-gradient-to-r from-transparent via-indigo-500 to-transparent opacity-50"></div>

            <h2 className="mb-6 text-2xl font-bold text-white text-center">我们的团队</h2>
            <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-4">
              {teamMembers.map((member, index) => (
                <div key={index} className={`text-center cosmic-glow float float-delay-${(index % 3) + 1}`}>
                  <Avatar className="mx-auto h-20 w-20 border-2 border-indigo-500 bg-gray-800">
                    <AvatarFallback className="text-xl bg-gradient-to-br from-indigo-500 to-purple-600 text-white">
                      {member.avatar}
                    </AvatarFallback>
                  </Avatar>
                  <h3 className="mt-4 font-medium text-white">{member.name}</h3>
                  <p className="text-sm text-indigo-300">{member.role}</p>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="flex justify-end">
        <Link href="/feedback" className="inline-flex items-center text-indigo-300 hover:text-indigo-200 cosmic-link">
          提供反馈 <ArrowRight className="ml-1 h-4 w-4" />
        </Link>
      </div>
    </div>
  )
}
