"use client";

import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { HardDrive } from "lucide-react";

type WristbandStatus = {
  proximity: { status: 'NORMAL' | 'ALERT', level: 'Clear' | 'Close' };
  tempHumidity: { status: 'NORMAL' | 'HIGH RISK', temp: string, humidity: string };
  sweatTouch: { status: 'NORMAL' | 'HIGH RISK', contact: 'ACQUIRED' | 'LOST', capacitance: number };
  mdrRisk: { status: 'NORMAL' | 'ELEVATED', score: number };
};

const mockStatuses: WristbandStatus[] = [
  {
    proximity: { status: 'NORMAL', level: 'Clear' },
    tempHumidity: { status: 'HIGH RISK', temp: '449.0°C', humidity: '58%' },
    sweatTouch: { status: 'HIGH RISK', contact: 'LOST', capacitance: 1022 },
    mdrRisk: { status: 'NORMAL', score: 0.30 },
  },
  {
    proximity: { status: 'NORMAL', level: 'Clear' },
    tempHumidity: { status: 'NORMAL', temp: '36.8°C', humidity: '45%' },
    sweatTouch: { status: 'NORMAL', contact: 'ACQUIRED', capacitance: 450 },
    mdrRisk: { status: 'NORMAL', score: 0.15 },
  },
  {
    proximity: { status: 'ALERT', level: 'Close' },
    tempHumidity: { status: 'NORMAL', temp: '37.1°C', humidity: '48%' },
    sweatTouch: { status: 'NORMAL', contact: 'ACQUIRED', capacitance: 480 },
    mdrRisk: { status: 'ELEVATED', score: 0.65 },
  },
  {
    proximity: { status: 'NORMAL', level: 'Clear' },
    tempHumidity: { status: 'HIGH RISK', temp: '38.5°C', humidity: '62%' },
    sweatTouch: { status: 'HIGH RISK', contact: 'ACQUIRED', capacitance: 980 },
    mdrRisk: { status: 'ELEVATED', score: 0.85 },
  }
];

const trackedPersonnel = [
    { id: "P789", location: "ICU (Dashboard)" },
    { id: "P482", location: "Ward B (Dashboard)" },
    { id: "S102", location: "ICU Staff (Dashboard)" },
    { id: "P12345", location: "ICU (TC1)" },
    { id: "P12365", location: "Ward D (TC5)" },
    { id: "P12438", location: "ICU (TC6)" },
    { id: "S54827", location: "Lab Sample (TC7)" },
    { id: "P10101", location: "ICU (TC9)" },
    { id: "P10102", location: "Ward C (TC10)" },
    { id: "P10105", location: "Surgical (TC13)" },
    { id: "S51002", location: "Lab Sample (TC14)" },
    { id: "P10107", location: "ER (TC15)" },
    { id: "P10110", location: "Ward A (TC18)" },
    { id: "P10111", location: "Room 217 (TC19)" },
    { id: "P10113", location: "Ward X (TC21)" },
    { id: "P10114", location: "Ward Y (TC22)" },
    { id: "P10115", location: "Ward Z (TC23)" },
    { id: "P10120", location: "Isolation (TC28)" },
    { id: "P10122", location: "ER (TC30)" },
    { id: "P519", location: "Surgical (Dashboard)"},
    { id: "P312", location: "Ward A (Dashboard)"},
    { id: "P00123", location: "Ward C (Dashboard)"},
    { id: "P604", location: "Ward C (Dashboard)"},
    { id: "ICU-3", location: "ICU (TC12)"},
    { id: "Ward-5", location: "Ward (TC17)"},
    { id: "Pediatric-Ward", location: "Pediatrics (TC20)"},
    { id: "OR-Floor", location: "Operating Room (TC24)"},
    { id: "Ward-2", location: "Ward (TC26)"},
    { id: "ICU-Water", location: "ICU (TC27)"},
    { id: "Pharmacy-Colistin", location: "Pharmacy (TC29)"},
    { id: "Ward-7", location: "Ward (TC31)"},
];


const StatusDisplay = ({ status }: { status: WristbandStatus }) => {
  const getStatusColor = (s: 'NORMAL' | 'HIGH RISK' | 'ALERT' | 'ELEVATED') => {
    switch (s) {
      case 'NORMAL':
        return 'text-green-400';
      case 'HIGH RISK':
      case 'ALERT':
      case 'ELEVATED':
        return 'text-red-400';
      default:
        return 'text-white';
    }
  };

  return (
    <pre className="font-mono text-[10px] md:text-xs leading-relaxed p-3 bg-slate-900 text-white rounded-lg border border-slate-700 overflow-x-auto">
      {'== BIOSAFETY WRISTBAND STATUS ==\n'}
      {'[PROXIMITY] '}
      <span className={getStatusColor(status.proximity.status)}>
        {'<<'} {status.proximity.status.padEnd(9)} {'>>'}
      </span>
      {` (${status.proximity.level})\n`}
      {'[ENV]       '}
      <span className={getStatusColor(status.tempHumidity.status)}>
        {'<<'} {status.tempHumidity.status.padEnd(9)} {'>>'}
      </span>
      {` T:${status.tempHumidity.temp}, H:${status.tempHumidity.humidity}\n`}
      {'[CONTACT]   '}
      <span className={getStatusColor(status.sweatTouch.status)}>
        {'<<'} {status.sweatTouch.status.padEnd(9)} {'>>'}
      </span>
      {` C:${status.sweatTouch.capacitance}\n`}
      {'[MDR RISK]  '}
      <span className={getStatusColor(status.mdrRisk.status)}>
        {'<<'} {status.mdrRisk.status.padEnd(9)} {'>>'}
      </span>
      {` Score:${status.mdrRisk.score.toFixed(2)}\n`}
      {'==============================='}
    </pre>
  );
};

const LiveFeedCard = ({ personnelId, location, initialIndex }: { personnelId: string, location: string, initialIndex: number }) => {
  const [currentIndex, setCurrentIndex] = useState(initialIndex);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % mockStatuses.length);
    }, 3000 + Math.random() * 2000); // Stagger updates

    return () => clearInterval(interval);
  }, []);

  return (
     <Card>
        <CardHeader className="p-4">
          <CardTitle className="text-base">Feed: {personnelId}</CardTitle>
          <CardDescription className="text-xs">{location}</CardDescription>
        </CardHeader>
        <CardContent className="p-4 pt-0">
          <StatusDisplay status={mockStatuses[currentIndex]} />
        </CardContent>
      </Card>
  )
}

export default function HardwarePage() {
  return (
    <div className="container mx-auto p-4 md:p-6 lg:p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight font-headline flex items-center gap-2">
          <HardDrive className="w-8 h-8" /> Hardware Logs
        </h1>
        <p className="text-muted-foreground">
          Live feed from on-premise biosafety monitoring hardware for all tracked personnel.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {trackedPersonnel.map((person, index) => (
          <LiveFeedCard 
            key={person.id}
            personnelId={person.id}
            location={person.location}
            initialIndex={index % mockStatuses.length}
          />
        ))}
      </div>
    </div>
  );
}
