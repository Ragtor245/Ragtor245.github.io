"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { Upload, FileText } from "lucide-react"

export function RagEasyContent() {
  const [query, setQuery] = useState("")
  const [result, setResult] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!query.trim()) return

    setIsLoading(true)
    // Simulate API call
    setTimeout(() => {
      setResult(
        `Here is the processed result for your query: "${query}"\n\nThis is where the AI-generated response would appear based on the data you've submitted.`,
      )
      setIsLoading(false)
    }, 1500)
  }

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">Rag-easy</h1>
        <p className="text-muted-foreground">
          Submit your data and get quick, accurate results tailored to your needs.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Submit Your Query</CardTitle>
            <CardDescription>Enter your question or upload a document to get started</CardDescription>
          </CardHeader>
          <form onSubmit={handleSubmit}>
            <CardContent className="space-y-4">
              <Textarea
                placeholder="Enter your query here..."
                className="min-h-[150px]"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
              />
              <div className="flex items-center gap-4">
                <Button type="button" variant="outline" className="w-full">
                  <Upload className="mr-2 h-4 w-4" />
                  Upload File
                </Button>
                <Button type="button" variant="outline" className="w-full">
                  <FileText className="mr-2 h-4 w-4" />
                  Browse Documents
                </Button>
              </div>
            </CardContent>
            <CardFooter>
              <Button type="submit" className="w-full" disabled={isLoading || !query.trim()}>
                {isLoading ? "Processing..." : "Submit"}
              </Button>
            </CardFooter>
          </form>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Results</CardTitle>
            <CardDescription>View the processed results based on your query</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="min-h-[200px] rounded-md border p-4">
              {result ? (
                <div className="whitespace-pre-line">{result}</div>
              ) : (
                <div className="flex h-full items-center justify-center text-muted-foreground">
                  Submit a query to see results
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
