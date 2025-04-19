import { MainLayout } from "@/components/main-layout"
import { LoginFormZh } from "@/components/login-form-zh"

export default function LoginPage() {
  return (
    <MainLayout>
      <div className="mx-auto max-w-md">
        <LoginFormZh />
      </div>
    </MainLayout>
  )
}
