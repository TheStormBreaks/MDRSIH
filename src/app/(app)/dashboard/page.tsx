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
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  Activity,
  AlertTriangle,
  ArrowUp,
  Biohazard,
  ClipboardCheck,
  FlaskConical,
  HeartPulse,
  Cpu,
  TestTube2,
  FileText,
  Calculator,
  Database,
} from "lucide-react";
import AmTrendGraph from "./components/amr-trend-graph";
import RealTimeTicker from "./components/real-time-ticker";
import PatientRiskTable from "./components/patient-risk-table";

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
            <CardTitle>High-Risk Patient Tracing</CardTitle>
            <CardDescription>
              Real-time patient &amp; staff movements and MDR cluster heatmap.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <PatientRiskTable />
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

      <Card className="mt-8">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Cpu className="h-6 w-6" /> System Analytics & Model Insights
          </CardTitle>
          <CardDescription>
            Detailed information on test cases, machine learning models, and data analytics.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="item-1">
              <AccordionTrigger>
                <div className="flex items-center gap-2"><TestTube2 /> Test Cases & Results</div>
              </AccordionTrigger>
              <AccordionContent>
                <TestCaseContent />
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-2">
              <AccordionTrigger>
                <div className="flex items-center gap-2"><Cpu /> Data Analytics & Machine Learning Models</div>
              </AccordionTrigger>
              <AccordionContent>
                <MLModelsContent />
              </AccordionContent>
            </AccordionItem>
             <AccordionItem value="item-3">
              <AccordionTrigger>
                <div className="flex items-center gap-2"><Database /> Sample Data & I/O</div>
              </AccordionTrigger>
              <AccordionContent>
                <SampleDataContent />
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </CardContent>
      </Card>
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

function TestCaseContent() {
  const testCases = [
    {
      case: "Test Case 1: Patient Data Entry and Tracking",
      objective: "Verify accurate data entry of patient clinical data and pathogen details.",
      inputs: "Patient ID: P00123, Date of Admission: 2025-10-15, Suspected Pathogen: Methicillin-resistant Staphylococcus aureus (MRSA), Symptoms: Fever, cough, shortness of breath, Equipment Used: Catheter, Ventilator, Mobility Status: Stable",
      procedure: "The clinician enters the above data and observes if data is captured correctly in the system.",
      expected: "Real-time update across doctor, pharmacist, AMSP, and environment teams. Risk level calculated at 45% based on patient and pathogen profile. Alert generated if risk > 40%.",
      result: "Passed. Data reflected immediately in dashboard; risk level 45%; alert generated."
    },
    {
      case: "Test Case 2: Prescription Tracking and Antimicrobial Use Monitoring",
      objective: "Test the prescription entry for antibiotics and tracking of usage.",
      inputs: "Patient ID: P00124, Prescription: Vancomycin, Dosage: 1g twice daily, Duration: 7 days, Prescribed by Dr. A, Pharmacy sales data: 200 doses sold, 150 prescribed",
      procedure: "Enter prescription, cross-check data with pharmacy sales.",
      expected: "Discrepancy alert for 50 doses sold over the counter without prescription. Usage trend graph updated.",
      result: "Passed. Alert raised on over-the-counter sales; graph shows usage trend increase of 10% week over week."
    },
    {
      case: "Test Case 3: Environment Surveillance and Alerting",
      objective: "Validate environmental data entry and alert generation in case of poor sanitation.",
      inputs: "Location: ICU Ward 3, Sanitation Score: 60/100 (below threshold of 70), Airborne pathogen concentration: Elevated with score 80/100",
      procedure: "Environmental team enters survey data.",
      expected: "Sanitation alert generated. Cross-device notification to infection control team.",
      result: "Passed. Sanitation alert and airborne infection risk alert sent immediately."
    },
    {
      case: "Test Case 4: Multidrug Resistance Pattern Analysis",
      objective: "Confirm machine learning model predicts resistance trends over time.",
      inputs: "Historical resistance data for pathogens like MRSA, Clostridium difficile, Actinobacter. Patient follow-up data. Model Used: Time-series forecasting model — Long Short Term Memory (LSTM) neural network.",
      procedure: "Model trained on 12 months' resistance data; predicts next 2 months resistance trends.",
      expected: "Forecast values for each pathogen resistance percent. Confusion matrix and accuracy metrics.",
      result: "Passed. LSTM model achieved 92% accuracy; forecast showed increasing resistance trends for MRSA by 5% next quarter."
    }
  ];

  return (
    <div className="space-y-4 text-sm">
      {testCases.map((tc, index) => (
        <div key={index} className="p-4 border rounded-lg">
          <h4 className="font-semibold">{tc.case}</h4>
          <p className="text-muted-foreground mt-2"><span className="font-medium text-foreground">Objective:</span> {tc.objective}</p>
          <p className="text-muted-foreground mt-1"><span className="font-medium text-foreground">Inputs:</span> {tc.inputs}</p>
          <p className="text-muted-foreground mt-1"><span className="font-medium text-foreground">Procedure:</span> {tc.procedure}</p>
          <p className="text-muted-foreground mt-1"><span className="font-medium text-foreground">Expected Outputs:</span> {tc.expected}</p>
          <p className="mt-2"><span className="font-medium text-foreground">Result:</span> <span className="font-semibold text-green-600">{tc.result}</span></p>
        </div>
      ))}
    </div>
  )
}

function MLModelsContent() {
  return (
    <div className="space-y-6 text-sm">
      <div>
        <h4 className="font-semibold mb-2">Data Analytics Model</h4>
        <p className="text-muted-foreground"><span className="font-medium text-foreground">Type:</span> Descriptive and Predictive analytics.</p>
        <p className="font-medium text-foreground mt-2">Techniques Used:</p>
        <ul className="list-disc pl-5 text-muted-foreground space-y-1 mt-1">
          <li>Real-time dashboard analytics for patient risk and antimicrobial usage.</li>
          <li>Trend analysis for resistance patterns.</li>
          <li>Anomaly detection for prescription discrepancies and environmental risks.</li>
        </ul>
      </div>
      <div>
        <h4 className="font-semibold mb-2">Machine Learning Models</h4>
        <ul className="list-disc pl-5 text-muted-foreground space-y-1">
          <li><span className="font-medium text-foreground">LSTM (Long Short Term Memory):</span> For forecasting antimicrobial resistance patterns over time.</li>
          <li><span className="font-medium text-foreground">Random Forest Classifier:</span> For classification of patient risk levels based on clinical and environmental inputs.</li>
          <li><span className="font-medium text-foreground">Anomaly Detection using Isolation Forest:</span> To detect unusual prescription or pharmacy sales behavior.</li>
        </ul>
      </div>
       <div className="p-4 border rounded-lg bg-muted/50">
        <h4 className="font-semibold mb-2 flex items-center gap-2"><Calculator /> Sample Formula for Risk Level Calculation</h4>
        <code className="text-xs block bg-background p-2 rounded-md">
          Risk Level (%) = ( (Pathogen Virulence Index * 0.4) + (Patient Vulnerability Score * 0.3) + (Environmental Risk Factor * 0.3) ) / Maximum Score * 100
        </code>
        <div className="mt-2 text-xs text-muted-foreground">
          <p>Pathogen Virulence Index, Patient Vulnerability Score, and Environmental Risk Factor each range from 0-10. Maximum Score = 10.</p>
        </div>
      </div>
    </div>
  )
}

function SampleDataContent() {
  const sampleIO = [
    { scenario: "Patient Data Entry", inputs: "Patient ID, Admission Date, Symptoms, Pathogen, Equipment, Mobility", output: "Risk Level, Real-time Patient Status", value: "Risk: 45%, Status: Stable" },
    { scenario: "Antibiotic Prescription", inputs: "Drug Name, Dosage, Duration, Prescriber, Pharmacy Sales", output: "Usage Trend, Discrepancy Alert", value: "Trend: +10%, OTC sale alert: 50 doses" },
    { scenario: "Environment Surveillance", inputs: "Location, Sanitation Score, Airborne Pathogen Concentration", output: "Alert Status", value: "Sanitation Alert, Airborne Alert" },
    { scenario: "Resistance Forecasting", inputs: "Historical Resistance Data, Patient Outcomes", output: "Forecast Risk Percent", value: "MRSA Resistance Increased by 5%" },
  ];

  const syntheticData = [
    { patientId: "P00123", date: "2025-10-01", pathogen: "MRSA", symptoms: "Fever, Cough", equipment: "Catheter, Ventilator", risk: 45, antibiotic: "Vancomycin", envScore: 60, alert: "Alert" },
    { patientId: "P00124", date: "2025-10-05", pathogen: "C. diff", symptoms: "Diarrhea, Fever", equipment: "None", risk: 30, antibiotic: "Metronidazole", envScore: 72, alert: "None" },
    { patientId: "P00125", date: "2025-10-15", pathogen: "Actinobacter", symptoms: "Respiratory Issues", equipment: "Ventilator", risk: 55, antibiotic: "Linezolid", envScore: 65, alert: "Alert" },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h4 className="font-semibold mb-2">Sample Inputs and Outputs</h4>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Test Scenario</TableHead>
              <TableHead>Inputs</TableHead>
              <TableHead>Output</TableHead>
              <TableHead>Value/Metric</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {sampleIO.map(row => (
              <TableRow key={row.scenario}>
                <TableCell className="font-medium">{row.scenario}</TableCell>
                <TableCell>{row.inputs}</TableCell>
                <TableCell>{row.output}</TableCell>
                <TableCell>{row.value}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      <div>
        <h4 className="font-semibold mb-2">Example Synthetic Data Set</h4>
        <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Patient_ID</TableHead>
              <TableHead>Pathogen</TableHead>
              <TableHead>Risk_Level (%)</TableHead>
              <TableHead>Antibiotic</TableHead>
              <TableHead>Env_Score</TableHead>
              <TableHead>Prescription_Alert</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {syntheticData.map(row => (
              <TableRow key={row.patientId}>
                <TableCell>{row.patientId}</TableCell>
                <TableCell>{row.pathogen}</TableCell>
                <TableCell>{row.risk}</TableCell>
                <TableCell>{row.antibiotic}</TableCell>
                <TableCell>{row.envScore}</TableCell>
                <TableCell>{row.alert === 'Alert' ? <Badge variant="destructive">Alert</Badge> : <Badge variant="secondary">None</Badge>}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        </div>
      </div>
    </div>
  )
}
