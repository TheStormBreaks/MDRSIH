"use client"

import Image from "next/image"
import { PlaceHolderImages } from "@/lib/placeholder-images"
import { Slider } from "@/components/ui/slider"
import { Card, CardContent } from "@/components/ui/card"
import { Label } from "@/components/ui/label"

export default function HospitalMap() {
  const mapImage = PlaceHolderImages.find(img => img.id === 'hospital-map')

  const patientDots = [
    { id: 1, x: '25%', y: '30%', status: 'mdr' },
    { id: 2, x: '28%', y: '33%', status: 'exposed' },
    { id: 3, x: '60%', y: '45%', status: 'mdr' },
    { id: 4, x: '62%', y: '48%', status: 'exposed' },
    { id: 5, x: '61%', y: '52%', status: 'exposed' },
    { id: 6, x: '80%', y: '70%', status: 'clear' },
    { id: 7, x: '83%', y: '68%', status: 'clear' },
  ]

  const getStatusClasses = (status: string) => {
    switch (status) {
      case 'mdr': return 'bg-purple-600 border-purple-300';
      case 'exposed': return 'bg-yellow-500 border-yellow-200';
      case 'clear': return 'bg-green-500 border-green-200';
      default: return 'bg-gray-500';
    }
  }

  return (
    <div className="space-y-4">
      <Card className="relative w-full aspect-[3/2] overflow-hidden rounded-lg">
        {mapImage && (
          <Image
            src={mapImage.imageUrl}
            alt={mapImage.description}
            fill
            className="object-cover"
            data-ai-hint={mapImage.imageHint}
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-primary/30 to-transparent mix-blend-multiply" />
        
        {/* Heatmap overlay placeholder */}
        <div className="absolute top-1/4 left-[15%] w-1/4 h-1/3 bg-purple-500/20 rounded-full blur-2xl animate-pulse"></div>
        <div className="absolute top-1/3 left-[50%] w-1/3 h-1/2 bg-purple-500/30 rounded-full blur-3xl animate-pulse animation-delay-300"></div>

        {patientDots.map(dot => (
          <div
            key={dot.id}
            className={`absolute w-3 h-3 rounded-full animate-pulse border-2 transform -translate-x-1/2 -translate-y-1/2 ${getStatusClasses(dot.status)}`}
            style={{ left: dot.x, top: dot.y, animationDelay: `${dot.id * 100}ms` }}
          >
             <span className="sr-only">{dot.status} case</span>
          </div>
        ))}
      </Card>
      <div className="p-4 rounded-lg bg-muted/50">
        <Label htmlFor="timeline-slider" className="mb-2 block text-sm font-medium">Timeline</Label>
        <div className="flex items-center gap-4">
            <span>-24h</span>
            <Slider
                id="timeline-slider"
                defaultValue={[50]}
                max={100}
                step={1}
                className="w-full"
            />
            <span>Now</span>
        </div>
      </div>
    </div>
  )
}
