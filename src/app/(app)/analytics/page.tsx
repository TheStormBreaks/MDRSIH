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

const patientData = [
  {
    id: "P789",
    ward: "ICU",
    bed: "12A",
    status: "Active MDR",
    morbidities: "Diabetes, CKD",
    risk: 95,
  },
  {
    id: "P519",
    ward: "Surgical",
    bed: "Post-Op 2",
    status: "Active MDR",
    morbidities: "Post-surgery",
    risk: 88,
  },
  {
    id: "P482",
    ward: "Ward B",
    bed: "03B",
    status: "Active MDR",
    morbidities: "COPD",
    risk: 75,
  },
  {
    id: "S102",
    ward: "ICU",
    bed: "N/A (Staff)",
    status: "Exposed",
    morbidities: "N/A",
    risk: 60,
  },
  {
    id: "P604",
    ward: "Ward C",
    bed: "07A",
    status: "Exposed",
    morbidities: "Hypertension",
    risk: 45,
  },
  {
    id: "P312",
    ward: "Ward A",
    bed: "01A",
    status: "Cleared",
    morbidities: "N/A",
    risk: 10,
  },
];

const summaryData = [
    { metric: "Active MDR Cases", value: "12", change: "+2 from last week", justification: "Represents the total number of patients with a confirmed, active multidrug-resistant infection. This is a direct count from patient data where status is 'Active MDR'." },
    { metric: "Exposed Contacts", value: "45", change: "-5 from last week", justification: "Includes patients and staff who have come into contact with an active MDR case but have not tested positive. This is derived from contact tracing data." },
    { metric: "Compliance Rate", value: "98%", change: "+1.2% from last week", justification: "Measures adherence to infection control protocols (e.g., hand hygiene, PPE usage) as logged by the AMSP and EVST teams. It is calculated as (Compliant Events / Total Events) * 100." },
    { metric: "Critical Alerts", value: "3", change: "N/A", justification: "A count of high-priority, unresolved alerts, such as new high-risk patient flags or significant protocol breaches, generated in the last 24 hours." },
];


export default function AnalyticsPage() {
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
  
  return (
    <div className="container mx-auto p-4 md:p-6 lg:p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight font-headline">
          Data Analytics & Justification
        </h1>
        <p className="text-muted-foreground">
          A detailed breakdown of the static data and metrics used throughout the application.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-8">
        <Card>
          <CardHeader>
            <CardTitle>Patient & Staff Risk Data</CardTitle>
            <CardDescription>
              This table contains the complete list of patients and staff being tracked. The risk level is a calculated score based on clinical data, pathogen virulence, and environmental factors. This data populates the "High-Risk Patient Tracing" table on the dashboard.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Patient/Staff ID</TableHead>
                  <TableHead>Ward</TableHead>
                  <TableHead>Bed</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Morbidities</TableHead>
                  <TableHead className="text-right">Risk Level</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {patientData.map((patient) => (
                  <TableRow key={patient.id}>
                    <TableCell className="font-medium">{patient.id}</TableCell>
                    <TableCell>{patient.ward}</TableCell>
                    <TableCell>{patient.bed}</TableCell>
                    <TableCell>{getStatusBadge(patient.status)}</TableCell>
                    <TableCell>{patient.morbidities}</TableCell>
                    <TableCell className="text-right font-semibold">{patient.risk}%</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Dashboard Summary Metrics</CardTitle>
            <CardDescription>
              This table explains the values presented in the summary cards on the main dashboard, providing justification for how each metric is derived from the underlying data.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>Metric</TableHead>
                        <TableHead>Value</TableHead>
                        <TableHead>Change</TableHead>
                        <TableHead>Justification</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {summaryData.map((item) => (
                        <TableRow key={item.metric}>
                            <TableCell className="font-medium">{item.metric}</TableCell>
                            <TableCell className="font-bold text-2xl">{item.value}</TableCell>
                            <TableCell>{item.change}</TableCell>
                            <TableCell className="text-muted-foreground">{item.justification}</TableCell>
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
