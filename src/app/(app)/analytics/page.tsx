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
import { Cpu } from "lucide-react";

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
    id: "P00123",
    ward: "Ward C",
    bed: "15B",
    status: "Active MDR",
    morbidities: "Fever, cough",
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
    { metric: "Active MDR Cases", value: "12", change: "+2 from last week", justification: "A Random Forest classifier analyzes patient data (symptoms, lab results, location) to flag potential new cases. The count is the total number of patients with status 'Active MDR'. Change is calculated vs. the previous 7-day period." },
    { metric: "Exposed Contacts", value: "45", change: "-5 from last week", justification: "Derived from contact tracing algorithms that analyze location and time proximity data between an active case and other individuals. Includes both patients and staff." },
    { metric: "Compliance Rate", value: "98%", change: "+1.2% from last week", justification: "An Anomaly Detection model (Isolation Forest) monitors hand hygiene and PPE usage logs to flag deviations from protocol. The rate is calculated as `(Compliant Events / Total Events) * 100`." },
    { metric: "Critical Alerts", value: "3", change: "N/A", justification: "A direct count of unresolved, high-priority alerts generated in the last 24 hours. An alert is deemed critical if a patient's risk score (from the classification model) exceeds 80% or a significant protocol breach is detected." },
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
                {patientData.sort((a,b) => b.risk - a.risk).map((patient) => (
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
              This table explains the values presented in the summary cards on the main dashboard, providing justification for how each metric is derived from the underlying data and ML models.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>Metric</TableHead>
                        <TableHead>Value</TableHead>
                        <TableHead>Change</TableHead>
                        <TableHead>Justification &amp; Calculation</TableHead>
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
        
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Cpu className="h-6 w-6" /> ML-Powered Dashboard Metrics
            </CardTitle>
            <CardDescription>
              The summary metrics on the dashboard are powered by predictive models that analyze real-time and historical data to provide actionable insights.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4 text-sm">
            <div>
              <h4 className="font-semibold">Active MDR Cases & Exposed Contacts</h4>
              <p className="text-muted-foreground">A Random Forest classifier analyzes patient data (symptoms, lab results, location) to flag potential new cases and identify exposed individuals through contact tracing algorithms.</p>
              <code className="text-xs block mt-1 p-2 bg-muted rounded">Formula: New Cases = Count(ML_Flag = 'Active MDR' in last 24h)</code>
            </div>
             <div>
              <h4 className="font-semibold">Compliance Rate</h4>
              <p className="text-muted-foreground">Anomaly detection models (Isolation Forest) monitor hand hygiene and PPE usage logs to flag deviations from protocol, contributing to the overall compliance score.</p>
              <code className="text-xs block mt-1 p-2 bg-muted rounded">Formula: Compliance % = (Total Compliant Events / Total Events) * 100</code>
            </div>
             <div>
              <h4 className="font-semibold">Critical Alerts</h4>
              <p className="text-muted-foreground">Generated when the risk classification model predicts a patient's risk score exceeds a high threshold (e.g., > 80%) or when the anomaly detection model flags a significant protocol breach.</p>
               <code className="text-xs block mt-1 p-2 bg-muted rounded">Trigger: If(Risk_Score > 80 OR Anomaly_Score > 0.9) -&gt; Create Alert</code>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
