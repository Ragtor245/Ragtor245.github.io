import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import Script from "next/script"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Ragtor",
  description: "A comprehensive platform for information sharing, user registration, and more",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem disableTransitionOnChange>
          {children}
        </ThemeProvider>
        <Script
          src="https://lf-cdn.coze.cn/obj/unpkg/flow-platform/chat-app-sdk/1.2.0-beta.6/libs/cn/index.js"
          strategy="afterInteractive"
          onLoad={() => {
            // 只有在 SDK 加载完成后才初始化聊天客户端
            window.CozeWebSDK &&
              new window.CozeWebSDK.WebChatClient({
                config: {
                  bot_id: "7499028319397429248",
                },
                componentProps: {
                  title: "Coze",
                },
                auth: {
                  type: "token",
                  token: "pat_********",
                  onRefreshToken: () => "pat_********",
                },
              })
          }}
        />
      </body>
    </html>
  )
}
