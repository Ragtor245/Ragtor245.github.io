import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"

export function IntroductionContent() {
  const teamMembers = [
    { name: "Alex Johnson", role: "Founder & CEO", avatar: "AJ" },
    { name: "Maria Garcia", role: "CTO", avatar: "MG" },
    { name: "David Kim", role: "Lead Developer", avatar: "DK" },
    { name: "Sophie Chen", role: "UX Designer", avatar: "SC" },
    { name: "James Wilson", role: "Data Scientist", avatar: "JW" },
    { name: "Olivia Martinez", role: "Product Manager", avatar: "OM" },
    { name: "Michael Lee", role: "AI Specialist", avatar: "ML" },
    { name: "Emma Davis", role: "Marketing Director", avatar: "ED" },
  ]

  return (
    <div className="space-y-8">
      <section className="space-y-4">
        <h1 className="text-3xl font-bold tracking-tight">About Ragtor</h1>
        <div className="prose max-w-none dark:prose-invert">
          <p>
            Ragtor is a comprehensive platform designed to revolutionize how users interact with information. Our
            mission is to provide a seamless experience for data submission, retrieval, and community interaction.
          </p>

          <h2>Our Mission</h2>
          <p>
            At Ragtor, we believe in the power of information accessibility. Our mission is to create a platform where
            users can easily submit data, receive accurate results, and connect with like-minded individuals in a
            collaborative environment.
          </p>

          <h2>Our Vision</h2>
          <p>
            We envision a world where information retrieval is effortless, accurate, and tailored to individual needs.
            Ragtor aims to be at the forefront of this revolution, providing cutting-edge tools and services that
            empower users to make informed decisions.
          </p>

          <h2>Core Values</h2>
          <ul>
            <li>
              <strong>Accuracy:</strong> We prioritize the accuracy of information above all else.
            </li>
            <li>
              <strong>Accessibility:</strong> We believe information should be accessible to everyone.
            </li>
            <li>
              <strong>Innovation:</strong> We continuously strive to innovate and improve our services.
            </li>
            <li>
              <strong>Community:</strong> We foster a collaborative community where knowledge is shared freely.
            </li>
            <li>
              <strong>Privacy:</strong> We respect user privacy and maintain the highest standards of data security.
            </li>
          </ul>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-bold">Meet Our Team</h2>
        <p className="text-muted-foreground">
          Ragtor is brought to you by a team of passionate individuals dedicated to making information retrieval easier
          and more efficient.
        </p>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {teamMembers.map((member, index) => (
            <Card key={index}>
              <CardContent className="flex flex-col items-center p-6 text-center">
                <Avatar className="h-20 w-20">
                  <AvatarFallback className="text-xl">{member.avatar}</AvatarFallback>
                </Avatar>
                <h3 className="mt-4 font-medium">{member.name}</h3>
                <p className="text-sm text-muted-foreground">{member.role}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>
    </div>
  )
}
