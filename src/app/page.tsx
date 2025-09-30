import Link from "next/link";
import { ArrowRight, BarChart, FilePlus, HelpCircle, Hospital } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-[hsl(240,67%,94%)] to-[hsl(270,35%,30%)] dark:from-[hsl(270,10%,10%)] dark:to-[hsl(270,35%,15%)] text-white">
      <header className="sticky top-0 z-50 w-full border-b border-white/10 bg-white/5 backdrop-blur-sm">
        <div className="container mx-auto flex h-16 items-center px-4 md:px-6">
          <Link href="/" className="flex items-center gap-2 font-bold text-xl">
            <Hospital className="h-7 w-7 text-primary-foreground" />
            <span className="font-headline">PathoTrace</span>
          </Link>
        </div>
      </header>

      <main className="flex-1 flex items-center justify-center">
        <div className="container px-4 md:px-6 py-12">
          <div className="flex flex-col items-center text-center space-y-6">
            <h1 className="text-4xl md:text-6xl font-bold tracking-tighter font-headline">
              Vigilance in Infection Control
            </h1>
            <p className="max-w-2xl text-lg md:text-xl text-purple-200">
              A unified platform for real-time monitoring, data entry, and control of multidrug-resistant pathogens in hospitals.
            </p>
          </div>
          <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <FeatureCard
              href="/dashboard"
              icon={<BarChart className="w-12 h-12 mb-4 text-primary-foreground/80" />}
              title="Dashboard"
              description="Overview metrics, real-time status, and interactive visualizations of hospital-wide infection data."
            />
            <FeatureCard
              href="/data-entry"
              icon={<FilePlus className="w-12 h-12 mb-4 text-primary-foreground/80" />}
              title="Data Entry"
              description="Role-based workflows for Doctors, Pharmacists, EVST, and AMSP teams to input detailed case information."
            />
          </div>
        </div>
      </main>
      
      <footer className="w-full py-6 px-4 md:px-6 border-t border-white/10 bg-white/5 backdrop-blur-sm">
        <div className="container mx-auto flex items-center justify-between text-sm">
          <div className="flex items-center gap-2">
            <Hospital className="h-5 w-5" />
            <span className="font-semibold">PathoTrace © {new Date().getFullYear()}</span>
          </div>
          <Button variant="ghost" size="sm" asChild>
            <Link href="#">
              <HelpCircle className="h-4 w-4 mr-2" />
              Help & Support
            </Link>
          </Button>
        </div>
      </footer>
    </div>
  );
}

function FeatureCard({ href, icon, title, description }: { href: string; icon: React.ReactNode; title: string; description: string; }) {
  return (
    <Link href={href}>
      <Card className="h-full bg-white/10 backdrop-blur-md border border-white/20 text-primary-foreground hover:bg-white/20 transition-all duration-300 ease-in-out transform hover:-translate-y-2 group">
        <CardHeader className="items-center text-center">
          {icon}
          <CardTitle className="text-2xl font-headline">{title}</CardTitle>
        </CardHeader>
        <CardContent className="text-center">
          <p className="text-purple-200/90 mb-6">{description}</p>
          <Button variant="outline" className="bg-transparent group-hover:bg-primary-foreground group-hover:text-primary transition-colors">
            Go to {title} <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </CardContent>
      </Card>
    </Link>
  );
}
