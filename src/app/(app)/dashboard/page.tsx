import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Activity,
  AlertTriangle,
  ArrowUp,
  Biohazard,
  ClipboardCheck,
  FlaskConical,
  HeartPulse,
} from "lucide-react";
import AmTrendGraph from "./components/amr-trend-graph";
import HospitalMap from "./components/hospital-map";
import RealTimeTicker from "./components/real-time-ticker";

export default function DashboardPage() {
  return (
    <div className="container mx-auto p-4 md:p-6 lg:p-8">
      <RealTimeTicker />
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 mt-6">
        <SummaryCard
          title="Active MDR Cases"
          value="12"
          change="+2"
          icon={<Biohazard className="h-6 w-6 text-destructive" />}
          changeType="increase"
        />
        <SummaryCard
          title="Exposed Contacts"
          value="45"
          change="-5"
          icon={<Activity className="h-6 w-6 text-yellow-500" />}
          changeType="decrease"
        />
        <SummaryCard
          title="Compliance Rate"
          value="98%"
          change="+1.2%"
          icon={<ClipboardCheck className="h-6 w-6 text-green-500" />}
          changeType="increase"
        />
        <SummaryCard
          title="Critical Alerts"
          value="3"
          icon={<AlertTriangle className="h-6 w-6 text-destructive" />}
        />
      </div>

      <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Hospital Outbreak Map</CardTitle>
            <CardDescription>
              Real-time patient &amp; staff movements and MDR cluster heatmap.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <HospitalMap />
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Outbreak Alerts</CardTitle>
            <CardDescription>Actionable notifications and high-risk alerts.</CardDescription>
          </CardHeader>
          <CardContent>
            <AlertList />
          </CardContent>
        </Card>
      </div>

      <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-5">
        <Card className="lg:col-span-3">
          <CardHeader>
            <CardTitle>AMR Trend Analysis</CardTitle>
            <CardDescription>Ward-wise &amp; time-series resistance patterns.</CardDescription>
          </CardHeader>
          <CardContent>
            <AmTrendGraph />
          </CardContent>
        </Card>
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Environmental Results</CardTitle>
            <CardDescription>Latest surveillance sample outcomes.</CardDescription>
          </CardHeader>
          <CardContent>
            <EnvironmentResults />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

function SummaryCard({ title, value, change, icon, changeType }: { title: string, value: string, change?: string, icon: React.ReactNode, changeType?: 'increase' | 'decrease' }) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        {icon}
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        {change && <p className={`text-xs ${changeType === 'increase' ? 'text-destructive' : 'text-green-600'} flex items-center`}>
          <ArrowUp className={`h-4 w-4 ${changeType === 'decrease' ? 'rotate-180' : ''}`} />
          {change} from last week
        </p>}
      </CardContent>
    </Card>
  );
}

function AlertList() {
  const alerts = [
    { id: 1, type: "High-Risk", subject: "Patient #P789", location: "ICU", time: "5m ago", icon: <HeartPulse className="h-4 w-4 text-destructive" />, color: "destructive" as const },
    { id: 2, type: "Protocol", subject: "Hand Hygiene", location: "Ward B", time: "30m ago", icon: <AlertTriangle className="h-4 w-4 text-yellow-500" />, color: "yellow" as const },
    { id: 3, type: "Lab Result", subject: "C. auris", location: "Sample #L56", time: "1h ago", icon: <FlaskConical className="h-4 w-4 text-primary" />, color: "primary" as const },
  ];

  return (
    <div className="space-y-4">
      {alerts.map(alert => (
        <div key={alert.id} className="flex items-start gap-4">
          <div className={`mt-1`}>{alert.icon}</div>
          <div className="flex-1">
            <p className="font-medium text-sm">{alert.type}: <span className="font-bold">{alert.subject}</span></p>
            <p className="text-xs text-muted-foreground">{alert.location} - {alert.time}</p>
          </div>
        </div>
      ))}
    </div>
  );
}

function EnvironmentResults() {
  const results = [
    { area: "ICU - Surface", status: "Critical", pathogen: "MRSA" },
    { area: "Ward A - Air", status: "Clear", pathogen: "N/A" },
    { area: "OR 3 - Water", status: "Pending", pathogen: "-" },
    { area: "Construction Zone", status: "Clear", pathogen: "N/A" },
  ];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "Critical": return <Badge variant="destructive">Critical</Badge>;
      case "Clear": return <Badge className="bg-green-100 text-green-800 dark:bg-green-900/50 dark:text-green-300">Clear</Badge>;
      case "Pending": return <Badge variant="secondary">Pending</Badge>;
      default: return <Badge variant="outline">{status}</Badge>;
    }
  };

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Area</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Pathogen</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {results.map(result => (
          <TableRow key={result.area}>
            <TableCell className="font-medium">{result.area}</TableCell>
            <TableCell>{getStatusBadge(result.status)}</TableCell>
            <TableCell>{result.pathogen}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
