import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowRight, Microscope, Pill, Shield, Stethoscope } from "lucide-react";

const roles = [
  {
    name: "Doctor",
    description: "Submit new cases, track follow-ups, manage prescriptions, and declare infection control status.",
    icon: <Stethoscope className="h-10 w-10 text-primary" />,
    href: "/data-entry/doctor",
  },
  {
    name: "Pharma",
    description: "Log over-the-counter and prescription sales, verify prescriptions, and monitor drug resistance trends.",
    icon: <Pill className="h-10 w-10 text-primary" />,
    href: "/data-entry/pharma",
  },
  {
    name: "Environment / Lab",
    description: "Record surveillance data for construction, water, air, and surfaces. Manage screening schedules.",
    icon: <Microscope className="h-10 w-10 text-primary" />,
    href: "/data-entry/evst",
  },
  {
    name: "AMSP Team",
    description: "Access the Antimicrobial Stewardship Program dashboard for analytics, guidelines, and high-level alerts.",
    icon: <Shield className="h-10 w-10 text-primary" />,
    href: "/data-entry/amsp",
  },
];

export default function DataEntryHomePage() {
  return (
    <div className="container mx-auto p-4 md:p-6 lg:p-8">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold tracking-tight font-headline">Data Entry</h1>
        <p className="mt-2 text-lg text-muted-foreground">
          Select your role to access tailored data input forms and workflows.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {roles.map((role) => (
          <Link href={role.href} key={role.name} className="group">
            <Card className="h-full flex flex-col hover:shadow-primary/20 hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
              <CardHeader className="items-center text-center">
                {role.icon}
                <CardTitle className="mt-4 text-2xl font-headline">{role.name}</CardTitle>
              </CardHeader>
              <CardContent className="flex-1 flex flex-col justify-between text-center">
                <p className="text-muted-foreground">{role.description}</p>
                <div className="mt-6 flex items-center justify-center text-primary font-semibold">
                  <span>Open Workflow</span>
                  <ArrowRight className="ml-2 h-4 w-4 transform group-hover:translate-x-1 transition-transform" />
                </div>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}
