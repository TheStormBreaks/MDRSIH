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
          <TabsTrigger value="floor1">Floor 1 (Live Animation)</TabsTrigger>
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

              {/* Animated Scenario */}
              <div id="animation-container" className="absolute inset-0">
                {/* Static Patients */}
                <div className="actor" style={{ top: '25%', left: '20%' }} title="Infected Patient">
                  <BedDouble className="w-6 h-6 text-destructive" />
                </div>
                 <div className="actor" style={{ top: '25%', left: '25%' }} title="Patient">
                  <BedDouble className="w-6 h-6 text-muted-foreground" />
                </div>
                 <div className="actor" style={{ top: '25%', left: '75%' }} title="Patient">
                  <BedDouble className="w-6 h-6 text-muted-foreground" />
                </div>
                 <div className="actor" style={{ top: '65%', left: '20%' }} title="Patient">
                  <BedDouble className="w-6 h-6 text-muted-foreground" />
                </div>
                <div className="actor patient-c-room" style={{ top: '65%', left: '75%' }}>
                   <BedDouble className="w-6 h-6 text-muted-foreground" title="Patient C"/>
                   <PersonStanding className="w-5 h-5 text-gray-500 absolute -top-4 left-6" title="Visitor"/>
                </div>

                {/* Animated Actors */}
                <div id="doctor" className="actor" title="Doctor">
                  <User className="w-6 h-6" />
                </div>
                <div id="nurse" className="actor" title="Nurse">
                  <User className="w-6 h-6" />
                </div>
              </div>

               <div className="absolute bottom-4 right-4">
                    <Badge>Animation is for illustrative purposes</Badge>
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
      <style jsx>{`
        .actor {
          position: absolute;
          transition: all 0.2s ease-in-out;
        }
        #doctor {
          color: hsl(var(--primary));
          animation: doctor-path 20s linear infinite;
        }
        #nurse {
          color: hsl(var(--chart-3));
          animation: nurse-path 20s linear infinite;
        }
        .patient-c-room .visitor-contact {
            animation: visitor-contact-glow 2s ease-in-out infinite alternate;
        }

        @keyframes doctor-path {
          0% { top: 50%; left: 5%; opacity: 0; } /* Start off-screen */
          5% { top: 50%; left: 10%; opacity: 1; } /* Enters */
          15% { top: 50%; left: 20%; } /* Moves to patient room */
          20% { top: 25%; left: 20%; } /* Enters room, contacts patient */
          35% { top: 25%; left: 20%; } /* Stays with patient */
          40% { top: 50%; left: 20%; } /* Leaves room, becomes carrier */
          41% { color: hsl(var(--accent)); } /* Changes color to carrier */
          50% { top: 50%; left: 48%; } /* Moves to center, crosses nurse */
          100% { top: 50%; left: 48%; }
        }

        @keyframes nurse-path {
          0%, 45% { top: 80%; left: 50%; opacity: 0; } /* Starts later, off-screen */
          50% { top: 50%; left: 50%; opacity: 1; } /* Crosses paths with doctor */
          51% { color: hsl(var(--accent)); } /* Becomes a carrier */
          65% { top: 50%; left: 75%; } /* Moves to Ward B */
          70% { top: 65%; left: 75%; } /* Enters Patient C's room */
          71% { transform: scale(1.1); } /* Brief interaction glow */
          72% { transform: scale(1); }
          85% { top: 65%; left: 75%; } /* Stays in room */
          90% { top: 50%; left: 75%; } /* Leaves room */
          100% { top: 50%; left: 95%; opacity: 0; } /* Exits */
        }
        
        #animation-container::after {
            content: 'Doctor comes in contact with infected patient, then crosses paths with a nurse who becomes a carrier and infects another patient and their visitor.';
            position: absolute;
            bottom: 1.5rem;
            left: 1.5rem;
            max-width: 250px;
            padding: 0.5rem;
            background: hsl(var(--card));
            border: 1px solid hsl(var(--border));
            border-radius: var(--radius);
            font-size: 0.75rem;
            line-height: 1rem;
            color: hsl(var(--muted-foreground));
            animation: show-scenario-text 20s linear infinite;
        }

        @keyframes show-scenario-text {
            0%, 5% { opacity: 0; }
            10%, 90% { opacity: 1; }
            95%, 100% { opacity: 0; }
        }
      `}</style>
    </div>
  );
}
