# [Ragtor智能知识平台](https://v0-ragtor-website-design.vercel.app/)
一个面向中小企业和个人用户的RAG智能知识平台，支持用户共建主题知识库并进行智能问答，为您提供一站式定制化RAG解决方案，具有多用户协作空间。\
[PRD Version-1.0](https://kdocs.cn/l/cesqaHanPxK4)
## 🚀 核心功能
为中小企业和个人提供**垂直领域知识服务**，实现精准知识获取与价值转化：
### 1.📚 Rag-Easy 知识库中心
​​- 多领域知识库​​：政策/法律/二次元/旅游等主题知识库\
​​- 用户共建机制​​：支持用户提交新知识库申请\
​​- 智能问答系统​​：支持选择知识库和上传PDF/Word等格式文档作为大语言模型上下文，生成高质量回答
### 2.🛠️ Rag-UDM 定制化服务
​​- RAG定制化产品展示​\
​- 个人轻量化RAG解决方案\
​- 企业级定制化RAG行业解决方案
### 3.💬 Rag-Comm 用户社区
​​- 用户交流社区\
​​- 知识分享论坛\
​​- 开发者协作空间
## 技术架构
### 前端技术栈
- **核心框架**
  - Next.js 15.2.4 - React 服务端渲染框架
  - React 19 - 用户界面库
  - TypeScript - 类型安全的 JavaScript 超集

- **UI 组件与样式**
  - Tailwind CSS - 实用优先的 CSS 框架
  - Radix UI - 无样式、可访问的组件库
  - shadcn/ui - 基于 Radix UI 的组件库
  - Lucide React - 现代化图标库

- **状态管理与表单**
  - React Hook Form - 高性能表单处理
  - Zod - 数据验证与类型推断
### 后端技术栈：Python，LlamaIndex，PostgreSQL+PGVector
## 项目结构
```
├── app/          # Next.js 应用主目录
├── components/   # 可复用组件
├── hooks/        # 自定义 React Hooks
├── lib/          # 工具函数和配置
├── public/       # 静态资源
└── styles/       # 全局样式
```
## 开发工具
- HTML&CSS
- V0 by vercel
- Cursor
- Coze
- Python
