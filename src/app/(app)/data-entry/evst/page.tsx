"use client"

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar";
import { Microscope, Building, Waves, Wind, CheckSquare } from "lucide-react";
import { useState } from "react";

export default function EvstDataEntryPage() {
  const [date, setDate] = useState<Date | undefined>(new Date());
  
  const surveillanceForms = [
    {
      title: "Construction Monitoring",
      icon: <Building className="w-6 h-6 text-primary" />,
      fields: [
        { id: "construction-location", label: "Location", placeholder: "e.g., New Wing, Floor 3" },
        { id: "construction-sample-id", label: "Sample ID", placeholder: "e.g., CONST-03-001" },
      ],
      status: "construction-status"
    },
    {
      title: "Water Surveillance",
      icon: <Waves className="w-6 h-6 text-primary" />,
      fields: [
        { id: "water-source", label: "Source", placeholder: "e.g., ICU Sink 2" },
        { id: "water-sample-id", label: "Sample ID", placeholder: "e.g., WAT-ICU-002" },
      ],
      status: "water-status"
    },
    {
      title: "Air Surveillance",
      icon: <Wind className="w-6 h-6 text-primary" />,
      fields: [
        { id: "air-location", label: "Location", placeholder: "e.g., Operating Room 4" },
        { id: "air-sample-id", label: "Sample ID", placeholder: "e.g., AIR-OR-004" },
      ],
      status: "air-status"
    },
    {
      title: "Surface Surveillance",
      icon: <CheckSquare className="w-6 h-6 text-primary" />,
      fields: [
        { id: "surface-location", label: "Item / Surface", placeholder: "e.g., Bed Rail, Patient #P789" },
        { id: "surface-sample-id", label: "Sample ID", placeholder: "e.g., SURF-P789-001" },
      ],
      status: "surface-status"
    },
  ];

  return (
    <div className="container mx-auto p-4 md:p-6 lg:p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight font-headline flex items-center gap-2">
          <Microscope className="w-8 h-8"/> Environment &amp; Lab Workflow
        </h1>
        <p className="text-muted-foreground">
          Log environmental surveillance data and manage lab results.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-6">
          {surveillanceForms.map(form => (
            <Card key={form.title}>
              <CardHeader>
                <CardTitle className="flex items-center gap-3">
                  {form.icon}
                  {form.title}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {form.fields.map(field => (
                  <div className="space-y-2" key={field.id}>
                    <Label htmlFor={field.id}>{field.label}</Label>
                    <Input id={field.id} placeholder={field.placeholder} />
                  </div>
                ))}
                <div className="space-y-2">
                  <Label htmlFor={form.status}>Result/Status</Label>
                  <Select>
                    <SelectTrigger id={form.status}>
                      <SelectValue placeholder="Select status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="pending">Pending</SelectItem>
                      <SelectItem value="critical">Critical</SelectItem>
                      <SelectItem value="clear">Clear</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
              <CardFooter>
                <Button className="w-full">Submit Sample Data</Button>
              </CardFooter>
            </Card>
          ))}
        </div>

        <div className="lg:col-span-1">
          <Card>
            <CardHeader>
              <CardTitle>Screening Schedule</CardTitle>
              <CardDescription>Scheduled screenings and auto-reminders.</CardDescription>
            </CardHeader>
            <CardContent className="flex justify-center">
              <Calendar
                mode="single"
                selected={date}
                onSelect={setDate}
                className="rounded-md border"
                // Example of highlighting specific days
                modifiers={{
                  scheduled: [new Date(), new Date(Date.now() + 3 * 24 * 60 * 60 * 1000)],
                }}
                modifiersClassNames={{
                  scheduled: 'bg-primary/20 text-primary rounded-md',
                }}
              />
            </CardContent>
            <CardFooter>
                 <Button className="w-full">Schedule New Screening</Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  );
}
