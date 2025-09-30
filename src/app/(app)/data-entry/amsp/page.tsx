import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Shield, TrendingUp, CheckCircle2, List, Save, AlertOctagon } from "lucide-react";
import AlertGenerator from "./components/alert-generator";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"
import { Bar, BarChart, CartesianGrid, XAxis, YAxis, Line, LineChart, ResponsiveContainer } from "recharts"

const complianceData = [
  { month: "Jan", compliance: 88 },
  { month: "Feb", compliance: 92 },
  { month: "Mar", compliance: 91 },
  { month: "Apr", compliance: 95 },
  { month: "May", compliance: 94 },
  { month: "Jun", compliance: 97 },
];

const pathogenData = [
  { pathogen: 'MRSA', cases: 40 },
  { pathogen: 'VRE', cases: 30 },
  { pathogen: 'C.diff', cases: 20 },
  { pathogen: 'Acinetobacter', cases: 27 },
  { pathogen: 'C.auris', cases: 18 },
]

export default function AmspDashboardPage() {
  return (
    <div className="container mx-auto p-4 md:p-6 lg:p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight font-headline flex items-center gap-2">
          <Shield className="w-8 h-8"/> AMSP Team Dashboard
        </h1>
        <p className="text-muted-foreground">
          Analyze trends, manage guidelines, and generate critical alerts.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2"><TrendingUp /> AMR Pathogen Frequency</CardTitle>
          </CardHeader>
          <CardContent>
            <ChartContainer config={{}} className="h-[250px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={pathogenData} >
                    <CartesianGrid vertical={false} />
                    <XAxis dataKey="pathogen" tickLine={false} tickMargin={10} axisLine={false} />
                    <YAxis />
                    <ChartTooltip cursor={false} content={<ChartTooltipContent indicator="line" />} />
                    <Bar dataKey="cases" fill="hsl(var(--primary))" radius={4} />
                  </BarChart>
              </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2"><CheckCircle2 /> Compliance % Over Time</CardTitle>
          </CardHeader>
          <CardContent>
            <ChartContainer config={{}} className="h-[250px] w-full">
               <ResponsiveContainer width="100%" height="100%">
                <LineChart data={complianceData}>
                  <CartesianGrid vertical={false} />
                  <XAxis dataKey="month" tickLine={false} tickMargin={10} axisLine={false} />
                  <YAxis domain={[80, 100]} tickFormatter={(value) => `${value}%`} />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Line type="monotone" dataKey="compliance" stroke="hsl(var(--primary))" strokeWidth={3} dot={{r: 5, fill: 'hsl(var(--primary))'}} />
                </LineChart>
              </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-6">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center gap-2"><List /> Antibiogram Guidelines</CardTitle>
            <CardDescription>Editable institutional guidelines for antibiotic use.</CardDescription>
          </CardHeader>
          <CardContent>
            <Textarea
              className="min-h-[250px] font-mono text-sm"
              defaultValue={`Pathogen: MRSA\nPreferred: Vancomycin, Linezolid\nAlternative: Daptomycin\n\nPathogen: Pseudomonas aeruginosa\nPreferred: Piperacillin-tazobactam, Cefepime, Meropenem\nAlternative: Ciprofloxacin (if susceptible)\n...`}
            />
          </CardContent>
          <CardFooter className="flex justify-end gap-2">
            <Button variant="outline">Revert Changes</Button>
            <Button><Save className="mr-2 h-4 w-4" /> Save Guidelines</Button>
          </CardFooter>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2"><AlertOctagon /> Alert Generation</CardTitle>
            <CardDescription>
                Generate role-based alerts for high-risk patients or protocol breaches using AI.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <AlertGenerator />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
