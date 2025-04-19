import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Bot, Zap, Database, Shield } from "lucide-react"

export function RagUdmContent() {
  const products = [
    {
      id: 1,
      title: "Rag Enterprise",
      description: "Complete RAG solution for enterprise with advanced AI integration",
      features: ["Custom knowledge base", "Multi-language support", "Enterprise security", "24/7 support"],
      price: "$499/month",
      popular: true,
    },
    {
      id: 2,
      title: "Rag Professional",
      description: "Professional RAG solution for growing businesses",
      features: ["Customizable AI models", "API integration", "Analytics dashboard", "Priority support"],
      price: "$199/month",
      popular: false,
    },
    {
      id: 3,
      title: "Rag Starter",
      description: "Basic RAG solution for small teams and startups",
      features: ["Basic AI integration", "Document processing", "Simple analytics", "Email support"],
      price: "$49/month",
      popular: false,
    },
  ]

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">Rag-UDM</h1>
        <p className="text-muted-foreground">Explore our custom RAG products with integrated AI customer service</p>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {products.map((product) => (
          <Card key={product.id} className={product.popular ? "border-primary" : ""}>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>{product.title}</CardTitle>
                {product.popular && <Badge>Popular</Badge>}
              </div>
              <CardDescription>{product.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{product.price}</div>
              <ul className="mt-4 space-y-2">
                {product.features.map((feature, index) => (
                  <li key={index} className="flex items-center gap-2">
                    <Zap className="h-4 w-4 text-primary" />
                    {feature}
                  </li>
                ))}
              </ul>
            </CardContent>
            <CardFooter>
              <Button className="w-full">Get Started</Button>
            </CardFooter>
          </Card>
        ))}
      </div>

      <div className="mt-12 space-y-6">
        <h2 className="text-2xl font-bold">AI Customer Service</h2>
        <div className="grid gap-6 md:grid-cols-3">
          <Card>
            <CardHeader>
              <Bot className="h-8 w-8 text-primary" />
              <CardTitle className="mt-2">24/7 AI Support</CardTitle>
            </CardHeader>
            <CardContent>
              <p>Get instant answers to your questions with our AI-powered customer service available 24/7.</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <Database className="h-8 w-8 text-primary" />
              <CardTitle className="mt-2">Knowledge Integration</CardTitle>
            </CardHeader>
            <CardContent>
              <p>Our AI is trained on your specific data to provide accurate and relevant responses.</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <Shield className="h-8 w-8 text-primary" />
              <CardTitle className="mt-2">Secure Conversations</CardTitle>
            </CardHeader>
            <CardContent>
              <p>All conversations with our AI are encrypted and secure, protecting your sensitive information.</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
