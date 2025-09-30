"use client"

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { CalendarIcon, User, Users, AlertTriangle, Syringe, Workflow, Bone } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import { cn } from "@/lib/utils";
import { useState } from "react";
import { format } from "date-fns";

export default function DoctorDataEntryPage() {
  const [date, setDate] = useState<Date | undefined>(new Date());
  
  return (
    <div className="container mx-auto p-4 md:p-6 lg:p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight font-headline flex items-center gap-2">
          <User className="w-8 h-8"/> Doctor's Workflow
        </h1>
        <p className="text-muted-foreground">
          Manage patient cases, prescriptions, and infection control declarations.
        </p>
      </div>

      <Tabs defaultValue="new-case" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="new-case"><Syringe className="mr-2 h-4 w-4"/>New Case</TabsTrigger>
          <TabsTrigger value="follow-up">Follow-up</TabsTrigger>
          <TabsTrigger value="prescription">Prescription Tracking</TabsTrigger>
          <TabsTrigger value="declaration">Infection Control Declaration</TabsTrigger>
        </TabsList>
        <TabsContent value="new-case">
          <Card>
            <CardHeader>
              <CardTitle>New Case Report</CardTitle>
              <CardDescription>Enter details for a new suspected or confirmed MDR case.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="patient-id">Patient ID</Label>
                  <Input id="patient-id" placeholder="e.g., P78901" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="case-date">Date of Admission</Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant={"outline"}
                        className={cn(
                          "w-full justify-start text-left font-normal",
                          !date && "text-muted-foreground"
                        )}
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {date ? format(date, "PPP") : <span>Pick a date</span>}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0">
                      <Calendar
                        mode="single"
                        selected={date}
                        onSelect={setDate}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="symptoms">Symptoms &amp; Observations</Label>
                <Textarea id="symptoms" placeholder="Describe patient's condition..."/>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="pathogen">Suspected Pathogen</Label>
                  <Select>
                    <SelectTrigger id="pathogen">
                      <SelectValue placeholder="Select pathogen" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="mrsa">MRSA</SelectItem>
                      <SelectItem value="vre">VRE</SelectItem>
                      <SelectItem value="c-diff">C. difficile</SelectItem>
                      <SelectItem value="c-auris">C. auris</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="risk-score">Calculated Risk Score</Label>
                  <Input id="risk-score" value="82 (High)" disabled />
                </div>
              </div>
               <div className="space-y-2">
                  <Label>Equipment Used</Label>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div className="flex items-center space-x-2">
                      <Checkbox id="ventilator" />
                      <Label htmlFor="ventilator">Ventilator</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="catheter" />
                      <Label htmlFor="catheter">Catheter</Label>
                    </div>
                     <div className="flex items-center space-x-2">
                      <Checkbox id="iv-line" />
                      <Label htmlFor="iv-line">Central IV Line</Label>
                    </div>
                     <div className="flex items-center space-x-2">
                      <Checkbox id="dialysis" />
                      <Label htmlFor="dialysis">Dialysis Machine</Label>
                    </div>
                  </div>
                </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Dialog>
                <DialogTrigger asChild>
                  <Button variant="outline"><Users className="mr-2 h-4 w-4" />Contact Trace View</Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[625px]">
                  <DialogHeader>
                    <DialogTitle>Patient Exposure Tree</DialogTitle>
                    <DialogDescription>
                      Visualization of patient's contact and exposure history.
                    </DialogDescription>
                  </DialogHeader>
                  <div className="py-4 text-center text-muted-foreground">
                    <Workflow className="mx-auto h-12 w-12 mb-4"/>
                    <p>Interactive contact tracing graph would be displayed here.</p>
                  </div>
                </DialogContent>
              </Dialog>
              <div className="space-x-2">
                <Button variant="destructive"><AlertTriangle className="mr-2 h-4 w-4" />Flag as High Risk</Button>
                <Button>Save Case</Button>
              </div>
            </CardFooter>
          </Card>
        </TabsContent>
        <TabsContent value="follow-up">
          <Card>
            <CardHeader>
              <CardTitle>Log Follow-up Visit</CardTitle>
              <CardDescription>Enter patient progress and status updates.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                 <div className="space-y-2">
                  <Label htmlFor="follow-up-patient-id">Patient ID</Label>
                  <Input id="follow-up-patient-id" placeholder="e.g., P78901" />
                </div>
                 <div className="space-y-2">
                  <Label htmlFor="follow-up-date">Date of Follow-up</Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant={"outline"}
                        className={cn(
                          "w-full justify-start text-left font-normal",
                          !date && "text-muted-foreground"
                        )}
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {date ? format(date, "PPP") : <span>Pick a date</span>}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0">
                      <Calendar
                        mode="single"
                        selected={date}
                        onSelect={setDate}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="progress-notes">Progress Notes</Label>
                <Textarea id="progress-notes" placeholder="Describe patient's progress, response to treatment, etc."/>
              </div>
               <div className="space-y-2">
                <Label htmlFor="follow-up-status">Current Status</Label>
                <Select>
                  <SelectTrigger id="follow-up-status">
                    <SelectValue placeholder="Select current status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="improving">Improving</SelectItem>
                    <SelectItem value="stable">Stable</SelectItem>
                    <SelectItem value="deteriorating">Deteriorating</SelectItem>
                    <SelectItem value="discharged">Discharged</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
            <CardFooter>
              <Button>Save Follow-up</Button>
            </CardFooter>
          </Card>
        </TabsContent>
        <TabsContent value="prescription">
            <Card>
                <CardHeader>
                    <CardTitle>Prescription Tracking</CardTitle>
                    <CardDescription>Log new prescriptions for the patient.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="medication">Medication</Label>
                    <Input id="medication" placeholder="e.g., Vancomycin" />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="dosage">Dosage</Label>
                      <Input id="dosage" placeholder="e.g., 500mg" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="frequency">Frequency</Label>
                      <Input id="frequency" placeholder="e.g., twice a day" />
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                    <Button>Save Prescription</Button>
                </CardFooter>
            </Card>
        </TabsContent>
         <TabsContent value="declaration">
            <Card>
                <CardHeader>
                    <CardTitle>Infection Control Declaration</CardTitle>
                    <CardDescription>Declare the patient's infection status.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="status">Patient Status</Label>
                    <Select>
                      <SelectTrigger id="status">
                        <SelectValue placeholder="Select status" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="cleared">Cleared of Infection</SelectItem>
                        <SelectItem value="isolated">Requires Isolation</SelectItem>
                        <SelectItem value="deceased">Deceased</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="declaration-notes">Notes</Label>
                    <Textarea id="declaration-notes" placeholder="Add any relevant notes..." />
                  </div>
                </CardContent>
                <CardFooter>
                    <Button>Submit Declaration</Button>
                </CardFooter>
            </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
