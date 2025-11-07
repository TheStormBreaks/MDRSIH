
"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Footprints, User, BedDouble, PersonStanding } from "lucide-react";
import Image from "next/image";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { Badge } from "@/components/ui/badge";

export default function TrackingPage() {
  const hospitalMapImage = PlaceHolderImages.find(
    (img) => img.id === "hospital-map"
  );

  return (
    <div className="container mx-auto p-4 md:p-6 lg:p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight font-headline flex items-center gap-2">
          <Footprints className="w-8 h-8" /> Contact Tracing & Visualization
        </h1>
        <p className="text-muted-foreground">
          Real-time tracking of staff and patient movements to visualize potential transmission paths.
        </p>
      </div>

      <Tabs defaultValue="floor1" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="floor1">Floor 1 (Transmission Path)</TabsTrigger>
          <TabsTrigger value="floor2">Floor 2</TabsTrigger>
          <TabsTrigger value="floor3">Floor 3</TabsTrigger>
        </TabsList>
        <TabsContent value="floor1">
          <Card>
            <CardContent className="p-4 relative">
              {hospitalMapImage && (
                <Image
                  src={hospitalMapImage.imageUrl}
                  alt="Hospital Floor Plan 1"
                  width={1200}
                  height={800}
                  className="rounded-lg w-full h-auto opacity-40"
                  data-ai-hint={hospitalMapImage.imageHint}
                />
              )}
              {/* Floor Labels */}
              <div className="absolute top-[20%] left-[15%] text-lg font-bold text-foreground">ICU</div>
              <div className="absolute top-[20%] right-[15%] text-lg font-bold text-foreground">Surgical Ward</div>
              <div className="absolute bottom-[20%] left-[15%] text-lg font-bold text-foreground">General Ward A</div>
              <div className="absolute bottom-[20%] right-[15%] text-lg font-bold text-foreground">General Ward B</div>
              
              {/* Static SVG Overlay */}
              <div className="absolute inset-0">
                  <svg width="100%" height="100%" viewBox="0 0 1200 800">
                    {/* Definitions for markers */}
                    <defs>
                        <marker id="arrow-doctor" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="3" markerHeight="3" orient="auto-start-reverse">
                            <path d="M 0 0 L 10 5 L 0 10 z" fill="hsl(var(--primary))" />
                        </marker>
                         <marker id="arrow-doctor-carrier" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="3" markerHeight="3" orient="auto-start-reverse">
                            <path d="M 0 0 L 10 5 L 0 10 z" fill="hsl(var(--accent))" />
                        </marker>
                         <marker id="arrow-nurse-carrier" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="3" markerHeight="3" orient="auto-start-reverse">
                            <path d="M 0 0 L 10 5 L 0 10 z" fill="hsl(var(--chart-2))" />
                        </marker>
                    </defs>

                    {/* Patient Locations */}
                    <g transform="translate(240, 200)" title="Infected Patient">
                        <BedDouble className="w-6 h-6 text-destructive" />
                    </g>
                     <g transform="translate(300, 200)" title="Patient">
                        <BedDouble className="w-6 h-6 text-muted-foreground" />
                    </g>
                    <g transform="translate(900, 200)" title="Patient">
                        <BedDouble className="w-6 h-6 text-muted-foreground" />
                    </g>
                     <g transform="translate(240, 520)" title="Patient">
                        <BedDouble className="w-6 h-6 text-muted-foreground" />
                    </g>
                     <g transform="translate(900, 520)" title="Patient C">
                        <BedDouble className="w-6 h-6 text-muted-foreground" />
                    </g>
                     <g transform="translate(950, 490)" title="Visitor">
                        <PersonStanding className="w-5 h-5 text-gray-500" />
                    </g>

                    {/* Doctor's Path */}
                    <path d="M 120 400 L 250 400 L 250 240" stroke="hsl(var(--primary))" strokeWidth="2" fill="none" strokeDasharray="5,5" markerEnd="url(#arrow-doctor)"/>
                    <path d="M 250 240 L 250 400 L 580 400" stroke="hsl(var(--accent))" strokeWidth="2.5" fill="none" markerEnd="url(#arrow-doctor-carrier)"/>
                    <g transform="translate(242, 232)" title="Doctor Contacts Patient"><User className="w-6 h-6 text-accent" /></g>

                    {/* Nurse's Path */}
                     <path d="M 600 640 L 600 410" stroke="hsl(var(--chart-3))" strokeWidth="2" fill="none" strokeDasharray="5,5" />
                     <circle cx="600" cy="400" r="10" fill="hsl(var(--accent))" stroke="white" strokeWidth="2" title="Transmission Event" />
                     <path d="M 600 390 L 890 390 L 890 530" stroke="hsl(var(--chart-2))" strokeWidth="2.5" fill="none" markerEnd="url(#arrow-nurse-carrier)"/>
                     <g transform="translate(882, 522)" title="Nurse Contacts Patient C"><User className="w-6 h-6 text-destructive" /></g>
                  </svg>
              </div>

               <div className="absolute bottom-4 right-4 max-w-sm">
                    <Card className="bg-background/80">
                        <CardContent className="p-3 text-sm">
                             <p className="font-bold mb-2">Scenario Legend:</p>
                             <ul className="space-y-1.5 text-muted-foreground">
                                <li className="flex items-center gap-2"><div className="w-4 h-0.5 bg-primary border-primary border-dashed"/> Doctor's initial path.</li>
                                <li className="flex items-center gap-2"><div className="w-4 h-0.5 bg-accent"/> Carrier path (post-exposure).</li>
                                <li className="flex items-center gap-2"><BedDouble className="w-4 h-4 text-destructive"/> Infected Patient.</li>
                                <li className="flex items-center gap-2"><User className="w-4 h-4 text-accent"/> Point of Doctor's exposure.</li>
                                <li className="flex items-center gap-2"><circle cx="8" cy="8" r="4" fill="hsl(var(--accent))"/> Doctor-Nurse transmission event.</li>
                                <li className="flex items-center gap-2"><User className="w-4 h-4 text-destructive"/> Nurse infects Patient C.</li>
                             </ul>
                        </CardContent>
                    </Card>
                </div>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="floor2">
           <Card>
            <CardContent className="p-4 relative text-center">
                 {hospitalMapImage && (
                    <Image
                    src={hospitalMapImage.imageUrl}
                    alt="Hospital Floor Plan 2"
                    width={1200}
                    height={800}
                    className="rounded-lg w-full h-auto opacity-20"
                    data-ai-hint={hospitalMapImage.imageHint}
                    />
                )}
                <div className="absolute inset-0 flex items-center justify-center">
                    <p className="text-muted-foreground">Floor 2 layout would be displayed here.</p>
                </div>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="floor3">
           <Card>
            <CardContent className="p-4 relative text-center">
                 {hospitalMapImage && (
                    <Image
                    src={hospitalMapImage.imageUrl}
                    alt="Hospital Floor Plan 3"
                    width={1200}
                    height={800}
                    className="rounded-lg w-full h-auto opacity-20"
                    data-ai-hint={hospitalMapImage.imageHint}
                    />
                )}
                 <div className="absolute inset-0 flex items-center justify-center">
                    <p className="text-muted-foreground">Floor 3 layout would be displayed here.</p>
                </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}

    