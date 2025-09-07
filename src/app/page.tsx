import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { ClipboardCheck, Search, Users } from "lucide-react";
import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col">
      {/* Hero Section */}
      <section className="flex flex-col items-center justify-center text-center py-24 px-6">
        <h1 className="text-4xl md:text-6xl font-bold mb-6 tracking-tight">
          Find the Right Doctor with <span className="font-bold">MediMatch</span>
        </h1>
        <p className="max-w-2xl text-lg md:text-xl text-accent-foreground mb-8">
          Discover trusted doctors by speciality, reviews, availability, and more.
          Your health deserves simplicity and clarity.
        </p>
        <div className="flex items-center gap-2 w-full max-w-lg">
          <Input placeholder="Search doctors, specialities..." className="flex-1" />
          <Button size="icon" className="">
            <Search className="h-5 w-5" />
          </Button>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-6 bg-secondary">
        <div className="max-w-5xl mx-auto grid md:grid-cols-3 gap-8">
          {[
            {
              title: "Speciality Search",
              desc: "Filter doctors by their speciality and years of expertise.",
              icon: Search
            },
            {
              title: "Trusted Reviews",
              desc: "Make informed choices with real patient reviews.",
              icon: Users
            },
            {
              title: "Simple Booking",
              desc: "Check availability and schedule appointments hassle-free.",
              icon: ClipboardCheck
            },
          ].map((feature, i) => (
            <Card key={i} className="rounded-2xl shadow-sm border-1 border-accent hover:border-primary/70 transition-all duration-300">
              <CardContent className="p-6">
                <feature.icon className="h-16 w-16 mb-4" />
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="">{feature.desc}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 px-6 text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-6">
          Join MediMatch Today
        </h2>
        <p className="max-w-xl mx-auto text-lg text-accent-foreground mb-8">
          Whether you are a doctor looking to connect with patients or a user
          searching for trusted healthcare, MediMatch is here for you.
        </p>
        <div className="flex justify-center gap-4">
          <Link href="/login/google">
            <Button className="px-6 py-3 rounded-2xl text-lg">
              I&apos;m a Doctor
            </Button>
          </Link>
          <Link href="/login/google">
            <Button variant="outline" className="px-6 py-3 rounded-2xl text-lg">
              I&apos;m a Patient
            </Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-6 border-t text-center text-gray-500 text-sm">
        © {new Date().getFullYear()} MediMatch. All rights reserved.
      </footer>
    </main>
  );
}
