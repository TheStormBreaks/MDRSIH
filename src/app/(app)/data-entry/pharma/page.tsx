"use client"

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Pill, Syringe, TrendingUp } from "lucide-react";

import { Bar, BarChart, CartesianGrid, XAxis, YAxis, ResponsiveContainer } from "recharts"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";

const chartData = [
  { drug: "Vanc", resistance: 85 },
  { drug: "Line", resistance: 30 },
  { drug: "Dapt", resistance: 15 },
  { drug: "Ceft", resistance: 60 },
  { drug: "Mero", resistance: 45 },
]

const chartConfig = {
  resistance: {
    label: "Resistance",
    color: "hsl(var(--primary))",
  },
};

export default function PharmaDataEntryPage() {
  return (
    <div className="container mx-auto p-4 md:p-6 lg:p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight font-headline flex items-center gap-2">
          <Pill className="w-8 h-8"/> Pharmacy Workflow
        </h1>
        <p className="text-muted-foreground">
          Log drug sales and monitor antimicrobial resistance trends.
        </p>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <Tabs defaultValue="prescription" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="prescription"><Syringe className="mr-2 h-4 w-4" />Prescription Sales</TabsTrigger>
              <TabsTrigger value="otc">Over-the-Counter Sales</TabsTrigger>
            </TabsList>
            <TabsContent value="prescription">
              <Card>
                <CardHeader>
                  <CardTitle>Prescription Sale</CardTitle>
                  <CardDescription>Log a sale based on a verified prescription.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="prescription-id">Prescription ID</Label>
                    <Input id="prescription-id" placeholder="e.g., RX12345678" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="medicine-presc">Medicine (Autocomplete)</Label>
                    <Input id="medicine-presc" placeholder="Start typing medicine name..." />
                  </div>
                  <div className="grid grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="dosage-presc">Dosage</Label>
                      <Input id="dosage-presc" placeholder="e.g., 500mg" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="quantity-presc">Quantity</Label>
                      <Input id="quantity-presc" type="number" placeholder="e.g., 30" />
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-end gap-2">
                    <Button variant="outline">Reset</Button>
                    <Button>Submit</Button>
                </CardFooter>
              </Card>
            </TabsContent>
            <TabsContent value="otc">
              <Card>
                <CardHeader>
                  <CardTitle>Over-the-Counter Sale</CardTitle>
                  <CardDescription>Log a non-prescription drug sale.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                   <div className="space-y-2">
                    <Label htmlFor="medicine-otc">Medicine (Autocomplete)</Label>
                    <Input id="medicine-otc" placeholder="Start typing medicine name..." />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="quantity-otc">Quantity</Label>
                    <Input id="quantity-otc" type="number" placeholder="e.g., 1" />
                  </div>
                </CardContent>
                 <CardFooter className="flex justify-end gap-2">
                    <Button variant="outline">Reset</Button>
                    <Button>Submit</Button>
                </CardFooter>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
        <div className="lg:col-span-1">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5" /> Live Drug Resistance
              </CardTitle>
              <CardDescription>Resistance trends in ICU (last 24h).</CardDescription>
            </CardHeader>
            <CardContent>
              <ChartContainer config={chartConfig} className="w-full h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={chartData} layout="vertical" margin={{ left: 0, right: 10 }}>
                    <CartesianGrid strokeDasharray="3 3" horizontal={false}/>
                    <XAxis type="number" dataKey="resistance" tickFormatter={(value) => `${value}%`} />
                    <YAxis type="category" dataKey="drug" width={50} stroke="hsl(var(--foreground))" />
                    <ChartTooltip cursor={{fill: 'hsl(var(--muted))'}} content={<ChartTooltipContent />} />
                    <Bar dataKey="resistance" fill="hsl(var(--primary))" radius={[0, 4, 4, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </ChartContainer>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
