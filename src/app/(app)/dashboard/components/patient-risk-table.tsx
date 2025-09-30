"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";

const patientData = [
  {
    id: "P789",
    ward: "ICU",
    bed: "12A",
    risk: 95,
    status: "Active MDR",
  },
  {
    id: "P482",
    ward: "Ward B",
    bed: "03B",
    risk: 75,
    status: "Active MDR",
  },
  {
    id: "S102",
    ward: "ICU",
    bed: "N/A (Staff)",
    risk: 60,
    status: "Exposed",
  },
  {
    id: "P604",
    ward: "Ward C",
    bed: "07A",
    risk: 45,
    status: "Exposed",
  },
  {
    id: "P519",
    ward: "Surgical",
    bed: "Post-Op 2",
    risk: 88,
    status: "Active MDR",
  },
  {
    id: "P312",
    ward: "Ward A",
    bed: "01A",
    risk: 10,
    status: "Cleared",
  },
];

export default function PatientRiskTable() {
  const getStatusBadge = (status: string) => {
    switch (status) {
      case "Active MDR":
        return <Badge variant="destructive">{status}</Badge>;
      case "Exposed":
        return (
          <Badge className="bg-yellow-100 text-yellow-800 dark:bg-yellow-900/50 dark:text-yellow-300">
            {status}
          </Badge>
        );
      case "Cleared":
        return (
          <Badge className="bg-green-100 text-green-800 dark:bg-green-900/50 dark:text-green-300">
            {status}
          </Badge>
        );
      default:
        return <Badge variant="secondary">{status}</Badge>;
    }
  };

  const getRiskColor = (risk: number) => {
    if (risk > 90) return "bg-destructive";
    if (risk > 70) return "bg-yellow-500";
    return "bg-primary";
  };

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Patient/Staff ID</TableHead>
          <TableHead>Ward</TableHead>
          <TableHead>Bed</TableHead>
          <TableHead>Status</TableHead>
          <TableHead className="text-right">Risk Level</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {patientData
          .sort((a, b) => b.risk - a.risk)
          .map((patient) => (
            <TableRow key={patient.id}>
              <TableCell className="font-medium">{patient.id}</TableCell>
              <TableCell>{patient.ward}</TableCell>
              <TableCell>{patient.bed}</TableCell>
              <TableCell>{getStatusBadge(patient.status)}</TableCell>
              <TableCell className="text-right">
                <div className="flex items-center justify-end gap-2">
                  <span className="w-12 text-sm font-semibold">
                    {patient.risk}%
                  </span>
                  <Progress
                    value={patient.risk}
                    className="w-24 h-2"
                    indicatorClassName={getRiskColor(patient.risk)}
                  />
                </div>
              </TableCell>
            </TableRow>
          ))}
      </TableBody>
    </Table>
  );
}
