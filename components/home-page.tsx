import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import Link from "next/link"

export function HomePage() {
  return (
    <div className="space-y-8">
      <section className="py-12 text-center">
        <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">Welcome to Ragtor</h1>
        <p className="mx-auto mt-4 max-w-3xl text-muted-foreground">
          A comprehensive platform for information sharing, user registration, and more
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-4">
          <Button asChild size="lg">
            <Link href="/rag-easy">Get Started</Link>
          </Button>
          <Button asChild variant="outline" size="lg">
            <Link href="/introduction">Learn More</Link>
          </Button>
        </div>
      </section>

      <section className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle>Rag-easy</CardTitle>
            <CardDescription>Submit and retrieve data quickly and accurately</CardDescription>
          </CardHeader>
          <CardContent>
            <p>
              Provide your data through our intuitive interface and get instant, accurate results tailored to your
              needs.
            </p>
            <Button asChild className="mt-4" variant="outline">
              <Link href="/rag-easy">Try Rag-easy</Link>
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Rag-UDM</CardTitle>
            <CardDescription>Custom RAG products with AI customer service</CardDescription>
          </CardHeader>
          <CardContent>
            <p>Explore our customized RAG products with integrated AI customer service for intelligent consultation.</p>
            <Button asChild className="mt-4" variant="outline">
              <Link href="/rag-udm">Explore Rag-UDM</Link>
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Rag-Comm</CardTitle>
            <CardDescription>Community interaction and communication</CardDescription>
          </CardHeader>
          <CardContent>
            <p>
              Connect with other users, share insights, and participate in discussions within our vibrant community.
            </p>
            <Button asChild className="mt-4" variant="outline">
              <Link href="/rag-comm">Join Rag-Comm</Link>
            </Button>
          </CardContent>
        </Card>
      </section>
    </div>
  )
}
