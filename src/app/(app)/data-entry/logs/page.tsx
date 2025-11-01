import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Stethoscope, Pill, Microscope, Check, X, AlertTriangle } from "lucide-react";
import { cn } from "@/lib/utils";

const doctorLogs = [
    { id: 1, patientId: "P789", date: "2023-10-26", action: "New Case", details: "Suspected MRSA, fever", risk: 95 },
    { id: 2, patientId: "P482", date: "2023-10-26", action: "Follow-up", details: "Condition stable", risk: 75 },
    { id: 3, patientId: "P789", date: "2023-10-25", action: "Prescription", details: "Vancomycin 1g", risk: 92 },
    { id: 4, patientId: "P312", date: "2023-10-24", action: "Declaration", details: "Cleared of infection", risk: 10 },
    { id: 5, patientId: "P00123", date: "2023-10-24", action: "New Case", details: "Fever, cough", risk: 45 },

];

const pharmaLogs = [
    { id: 1, type: "Prescription", medicine: "Vancomycin", prescribed: 150, sold: 200, prescriptionId: "RX12345" },
    { id: 2, type: "OTC", medicine: "Ibuprofen", prescribed: 0, sold: 1, prescriptionId: "N/A" },
    { id: 3, type: "Prescription", medicine: "Ciprofloxacin", prescribed: 28, sold: 28, prescriptionId: "RX12346" },
];

const evstLogs = [
    { id: 1, type: "Surface", location: "ICU - Bed 12A", sampleId: "SURF-ICU-001", result: "Critical" },
    { id: 2, type: "Air", location: "OR 3", sampleId: "AIR-OR-003", result: "Clear" },
    { id: 3, type: "Water", location: "Ward B Sink", sampleId: "WAT-WB-001", result: "Pending" },
];


export default function DataEntryLogsPage() {
  const getRiskBadge = (risk: number) => {
    if (risk > 70) return <Badge variant="destructive">High</Badge>;
    if (risk > 40) return <Badge className="bg-yellow-100 text-yellow-800 dark:bg-yellow-900/50 dark:text-yellow-300">Medium</Badge>;
    return <Badge className="bg-green-100 text-green-800 dark:bg-green-900/50 dark:text-green-300">Low</Badge>;
  };
  
  return (
    <div className="container mx-auto p-4 md:p-6 lg:p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight font-headline">
          Data Entry Logs
        </h1>
        <p className="text-muted-foreground">
          A comprehensive record of all data submitted by different teams with calculated outputs.
        </p>
      </div>

      <div className="space-y-8">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2"><Stethoscope /> Doctor Entry Logs</CardTitle>
            <CardDescription>
              Logs from new case reports, follow-ups, prescriptions, and declarations with calculated patient risk.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Patient ID</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Action</TableHead>
                  <TableHead>Details</TableHead>
                  <TableHead>Risk Level</TableHead>
                  <TableHead className="text-right">Calculated Risk %</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {doctorLogs.map((log) => (
                  <TableRow key={log.id}>
                    <TableCell className="font-medium">{log.patientId}</TableCell>
                    <TableCell>{log.date}</TableCell>
                    <TableCell>{log.action}</TableCell>
                    <TableCell>{log.details}</TableCell>
                    <TableCell>{getRiskBadge(log.risk)}</TableCell>
                    <TableCell className="text-right font-semibold">{log.risk}%</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2"><Pill /> Pharmacy Sales Logs</CardTitle>
            <CardDescription>
              Logs for prescription and OTC sales with calculated discrepancy and alert status.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Medicine</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Prescribed</TableHead>
                  <TableHead>Sold</TableHead>
                  <TableHead>Discrepancy</TableHead>
                  <TableHead>Alert Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {pharmaLogs.map((log) => {
                  const discrepancy = log.sold - log.prescribed;
                  const alert = discrepancy > 0 && log.type === 'Prescription';
                  return (
                    <TableRow key={log.id}>
                      <TableCell className="font-medium">{log.medicine}</TableCell>
                      <TableCell><Badge variant={log.type === 'Prescription' ? 'default' : 'secondary'}>{log.type}</Badge></TableCell>
                      <TableCell>{log.prescribed}</TableCell>
                      <TableCell>{log.sold}</TableCell>
                      <TableCell className={cn(discrepancy > 0 && 'font-bold text-destructive')}>{discrepancy > 0 ? `+${discrepancy}` : discrepancy}</TableCell>
                      <TableCell>
                        {alert ? <Badge variant="destructive" className="flex items-center gap-1.5"><AlertTriangle className="h-3 w-3"/> Alert</Badge> : <Badge variant="outline" className="text-green-600 border-green-600">OK</Badge>}
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2"><Microscope /> EVST Sample Logs</CardTitle>
            <CardDescription>
              Environmental surveillance sample data and results with automated alert status.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Type</TableHead>
                  <TableHead>Location</TableHead>
                  <TableHead>Sample ID</TableHead>
                  <TableHead>Result</TableHead>
                  <TableHead>Alert Triggered</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {evstLogs.map((log) => (
                  <TableRow key={log.id}>
                    <TableCell>{log.type}</TableCell>
                    <TableCell className="font-medium">{log.location}</TableCell>
                    <TableCell>{log.sampleId}</TableCell>
                    <TableCell>
                        <Badge variant={log.result === 'Critical' ? 'destructive' : (log.result === 'Clear' ? 'default' : 'secondary')}
                         className={log.result === 'Clear' ? 'bg-green-500' : ''}
                        >
                            {log.result}
                        </Badge>
                    </TableCell>
                    <TableCell>
                      {log.result === 'Critical' ? <Check className="h-5 w-5 text-destructive"/> : <X className="h-5 w-5 text-muted-foreground"/>}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
