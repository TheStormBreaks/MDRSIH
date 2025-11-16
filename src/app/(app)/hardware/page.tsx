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

const StatusDisplay = ({ status }: { status: WristbandStatus }) => {
  const getStatusColor = (s: 'NORMAL' | 'HIGH RISK' | 'ALERT' | 'ELEVATED') => {
    switch (s) {
      case 'NORMAL':
        return 'text-green-500';
      case 'HIGH RISK':
      case 'ALERT':
      case 'ELEVATED':
        return 'text-red-500';
      default:
        return 'text-foreground';
    }
  };

  return (
    <pre className="font-mono text-sm leading-loose p-6 bg-slate-900 text-white rounded-lg border border-slate-700">
      {'==============================================================\n'}
      {'                    BIOSAFETY WRISTBAND STATUS                    \n\n'}
      {'[ IR PROXIMITY ]     '}
      <span className={getStatusColor(status.proximity.status)}>
        {'<< '}{status.proximity.status.padEnd(9, ' ')}{' >>'}
      </span>
      {` (${status.proximity.level})\n\n`}
      {'[ TEMP / HUMIDITY ]  '}
      <span className={getStatusColor(status.tempHumidity.status)}>
        {'<< '}{status.tempHumidity.status.padEnd(9, ' ')}{' >>'}
      </span>
      {`\n   Temp: ${status.tempHumidity.temp}\n   Humidity: ${status.tempHumidity.humidity}\n\n`}
      {'[ SWEAT / TOUCH ]    '}
      <span className={getStatusColor(status.sweatTouch.status)}>
        {'<< '}{status.sweatTouch.status.padEnd(9, ' ')}{' >>'}
      </span>
      {`\n   Contact: ${status.sweatTouch.contact}\n   Capacitance: ${status.sweatTouch.capacitance}\n\n`}
      {'[ MDR VIRUS RISK ]   '}
      <span className={getStatusColor(status.mdrRisk.status)}>
        {'<< '}{status.mdrRisk.status.padEnd(9, ' ')}{' >>'}
      </span>
      {`\n   MDR Score: ${status.mdrRisk.score.toFixed(2)}\n`}
      {'=============================================================='}
    </pre>
  );
};


export default function HardwarePage() {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % mockStatuses.length);
    }, 3000); // Change status every 3 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="container mx-auto p-4 md:p-6 lg:p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight font-headline flex items-center gap-2">
          <HardDrive className="w-8 h-8" /> Hardware Logs
        </h1>
        <p className="text-muted-foreground">
          Live feed from on-premise biosafety monitoring hardware.
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Live Wristband Feed (Patient P789 - ICU)</CardTitle>
          <CardDescription>Displaying real-time sensor data from a high-risk patient's biosafety wristband.</CardDescription>
        </CardHeader>
        <CardContent>
          <StatusDisplay status={mockStatuses[currentIndex]} />
        </CardContent>
      </Card>
    </div>
  );
}
