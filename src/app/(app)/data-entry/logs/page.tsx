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
import { Stethoscope, Pill, Microscope, Check, X } from "lucide-react";

const doctorLogs = [
    { id: 1, patientId: "P789", date: "2023-10-26", action: "New Case", details: "Suspected MRSA, fever", risk: "High" },
    { id: 2, patientId: "P482", date: "2023-10-26", action: "Follow-up", details: "Condition stable", risk: "High" },
    { id: 3, patientId: "P789", date: "2023-10-25", action: "Prescription", details: "Vancomycin 1g", risk: "High" },
    { id: 4, patientId: "P312", date: "2023-10-24", action: "Declaration", details: "Cleared of infection", risk: "Low" },
];

const pharmaLogs = [
    { id: 1, type: "Prescription", medicine: "Vancomycin", quantity: 30, prescriptionId: "RX12345" },
    { id: 2, type: "OTC", medicine: "Ibuprofen", quantity: 1, prescriptionId: "N/A" },
    { id: 3, type: "Prescription", medicine: "Ciprofloxacin", quantity: 28, prescriptionId: "RX12346" },
];

const evstLogs = [
    { id: 1, type: "Surface", location: "ICU - Bed 12A", sampleId: "SURF-ICU-001", result: "Critical" },
    { id: 2, type: "Air", location: "OR 3", sampleId: "AIR-OR-003", result: "Clear" },
    { id: 3, type: "Water", location: "Ward B Sink", sampleId: "WAT-WB-001", result: "Pending" },
];


export default function DataEntryLogsPage() {
  const getStatusBadge = (status: string) => {
    switch (status) {
      case "High":
        return <Badge variant="destructive">{status}</Badge>;
      case "Medium":
        return (
          <Badge className="bg-yellow-100 text-yellow-800 dark:bg-yellow-900/50 dark:text-yellow-300">
            {status}
          </Badge>
        );
      case "Low":
        return (
          <Badge className="bg-green-100 text-green-800 dark:bg-green-900/50 dark:text-green-300">
            {status}
          </Badge>
        );
      default:
        return <Badge variant="secondary">{status}</Badge>;
    }
  };
  
  return (
    <div className="container mx-auto p-4 md:p-6 lg:p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight font-headline">
          Data Entry Logs
        </h1>
        <p className="text-muted-foreground">
          A comprehensive record of all data submitted by different teams.
        </p>
      </div>

      <div className="space-y-8">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2"><Stethoscope /> Doctor Entry Logs</CardTitle>
            <CardDescription>
              Logs from new case reports, follow-ups, prescriptions, and declarations.
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
                  <TableHead>Declared Risk</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {doctorLogs.map((log) => (
                  <TableRow key={log.id}>
                    <TableCell className="font-medium">{log.patientId}</TableCell>
                    <TableCell>{log.date}</TableCell>
                    <TableCell>{log.action}</TableCell>
                    <TableCell>{log.details}</TableCell>
                    <TableCell>{getStatusBadge(log.risk)}</TableCell>
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
              Logs for both prescription-based and over-the-counter sales.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Type</TableHead>
                  <TableHead>Medicine</TableHead>
                  <TableHead>Quantity</TableHead>
                  <TableHead>Prescription ID</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {pharmaLogs.map((log) => (
                  <TableRow key={log.id}>
                    <TableCell><Badge variant={log.type === 'Prescription' ? 'default' : 'secondary'}>{log.type}</Badge></TableCell>
                    <TableCell className="font-medium">{log.medicine}</TableCell>
                    <TableCell>{log.quantity}</TableCell>
                    <TableCell>{log.prescriptionId}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2"><Microscope /> EVST Sample Logs</CardTitle>
            <CardDescription>
              Environmental surveillance sample data and results.
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
