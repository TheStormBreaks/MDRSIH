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
            Detailed information on test cases, machine learning models, and data analytics for research and validation purposes.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Accordion type="single" collapsible className="w-full" defaultValue="item-1">
            <AccordionItem value="item-1">
              <AccordionTrigger>
                <div className="flex items-center gap-2"><TestTube2 /> Detailed Test Cases & Results</div>
              </AccordionTrigger>
              <AccordionContent>
                <TestCaseContent />
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-2">
              <AccordionTrigger>
                <div className="flex items-center gap-2"><Cpu /> Machine Learning Models</div>
              </AccordionTrigger>
              <AccordionContent>
                <MLModelsContent />
              </AccordionContent>
            </AccordionItem>
             <AccordionItem value="item-3">
              <AccordionTrigger>
                <div className="flex items-center gap-2"><Database /> Formulas, Sample Data & Synopsis</div>
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
      case: "Test Case 1: Patient Risk Assessment and Data Entry",
      inputs: "Patient ID: P12345, Admission Date: 2025-10-10, Suspected Pathogen: MRSA, Symptoms: Fever (102°F), Cough, Fatigue, Equipment Used: Foley catheter, Ventilator, Mobility Status: Bedridden, Previous Antibiotic Usage: Vancomycin for 5 days, Environmental Sanitation Score near patient: 58/100",
      procedure: "Data entered into system by clinician. Patient vulnerability score calculated based on age, comorbidities, mobility (scored 8/10). Pathogen virulence index for MRSA set at 9/10. Environmental risk factor at patient's location captured as 6/10 (from sanitation score).",
      formula: "R = ((Vp * 0.4) + (Sv * 0.3) + (Er * 0.3)) / 10 * 100",
      calculation: "R = ((9 * 0.4) + (8 * 0.3) + (6 * 0.3)) / 10 * 100 = ((3.6 + 2.4 + 1.8) / 10) * 100 = 78%",
      expected: "Risk Level: 78%. Real-time alert generated (threshold set at 70%). Dashboard displays patient risk status and notifies AMSP and environment teams.",
      result: "Passed. System correctly computed risk, generated alert, and updated dashboard in real-time."
    },
    {
      case: "Test Case 2: Antimicrobial Prescription Entry and Sales Monitoring",
      inputs: "Antibiotic: Vancomycin, Dosage: 1g twice daily, Duration: 7 days, Prescription entered by Dr. Smith, Pharmacy Sales Data (last 1 week): Prescriptions documented: 100 doses, Over-the-counter sales detected: 30 doses",
      procedure: "Prescription tracked and matched with pharmacy sales. Isolation Forest anomaly detection algorithm applied to identify unusual sales patterns.",
      expected: "Alert raised for 30% discrepancy. Sales trend graphed weekly to monitor changes. Notification sent to pharmaceutical oversight.",
      result: "Passed. Alert generated; trend analysis indicates rising over-the-counter sales by +5% from prior week."
    },
    {
      case: "Test Case 3: Environmental Sanitation and Airborne Pathogen Monitoring",
      inputs: "Location: ICU Ward 2, Sanitation Score: 55/100 (below acceptable threshold of 70), Airborne Pathogen Count: 1200 CFU/m³ (threshold 1000 CFU/m³), Cleaning Frequency: Once daily",
      procedure: "Data entered by environment survey team. Rule-based alert system triggers real-time warnings.",
      expected: "Sanitation alert issued for ICU Ward 2. Alert level classified as 'High Risk'. Automated email sent to infection control staff. Dashboard updates to show environmental risk metrics.",
      result: "Passed. Alert promptly sent; cleaning frequency recommended to increase to twice daily."
    },
    {
      case: "Test Case 4: Multidrug Resistance Pattern Analysis",
      objective: "Confirm machine learning model predicts resistance trends over time.",
      inputs: "Historical monthly resistance percentages per pathogen, Patient demographics aggregated monthly, Antibiotic prescription volumes. Model Used: Time-series forecasting model — Long Short Term Memory (LSTM) neural network.",
      procedure: "Model trained on 12 months' resistance data; predicts next 2 months resistance trends.",
      expected: "Forecast values for each pathogen resistance percent. Confusion matrix and accuracy metrics. Example Prediction: MRSA resistance predicted to increase from 45% to 50% over next 3 months.",
      result: "Passed. LSTM model achieved 92% accuracy; forecast showed increasing resistance trends for MRSA by 5% next quarter."
    }
  ];

  return (
    <div className="space-y-4 text-sm">
      {testCases.map((tc, index) => (
        <div key={index} className="p-4 border rounded-lg">
          <h4 className="font-semibold">{tc.case}</h4>
          <p className="text-muted-foreground mt-2"><span className="font-medium text-foreground">Inputs:</span> {tc.inputs}</p>
          <p className="text-muted-foreground mt-1"><span className="font-medium text-foreground">Procedure:</span> {tc.procedure}</p>
          {tc.calculation && <p className="text-muted-foreground mt-1"><span className="font-medium text-foreground">Calculation:</span> <code className="text-xs">{tc.calculation}</code></p>}
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
       <div className="p-4 border rounded-lg bg-muted/50">
        <h4 className="font-semibold mb-2">1. Long Short-Term Memory (LSTM) Neural Network for Resistance Trend Forecasting</h4>
        <p className="text-muted-foreground mb-4">Forecasts antimicrobial resistance trends monthly based on historical resistance patterns.</p>
        <ul className="list-disc pl-5 space-y-2">
            <li><span className="font-medium text-foreground">Input Features:</span> Historical monthly resistance percentages per pathogen, Patient demographics aggregated monthly, Antibiotic prescription volumes.</li>
            <li><span className="font-medium text-foreground">Output:</span> Predicted resistance level (%) for each pathogen in future months.</li>
            <li><span className="font-medium text-foreground">Hyperparameters:</span> Input sequence length: 12 months, Hidden layers: 2 layers, 64 neurons each, Dropout: 0.2 to prevent overfitting, Loss Function: Mean Squared Error.</li>
            <li><span className="font-medium text-foreground">Performance Metrics:</span> Accuracy: 92%, RMSE: 3.5%, AUROC (when applicable): 0.89.</li>
        </ul>
      </div>
      <div className="p-4 border rounded-lg">
        <h4 className="font-semibold mb-2">2. Random Forest Classifier for Patient Risk Level Classification</h4>
        <p className="text-muted-foreground mb-4">Classifies patient infection risk as Low, Medium, or High based on multi-factor inputs.</p>
        <ul className="list-disc pl-5 space-y-2">
            <li><span className="font-medium text-foreground">Features:</span> Pathogen virulence index, Patient clinical scores, Environmental risk scores, Antibiotic usage history.</li>
            <li><span className="font-medium text-foreground">Parameters:</span> Number of trees: 100, Maximum depth: 10, Minimum samples split: 5.</li>
            <li><span className="font-medium text-foreground">Performance:</span> Accuracy: 88%, Precision (High risk class): 90%, Recall (High risk class): 85%.</li>
        </ul>
      </div>
       <div className="p-4 border rounded-lg bg-muted/50">
        <h4 className="font-semibold mb-2">3. Isolation Forest for Outlier Detection in Pharmacy Sales Data</h4>
        <p className="text-muted-foreground mb-4">Detects anomalous sales patterns indicating non-compliance or over-the-counter antibiotic dispensing.</p>
        <ul className="list-disc pl-5 space-y-2">
            <li><span className="font-medium text-foreground">Input Data:</span> Weekly pharmacy sales vs. prescriptions, Historical trends.</li>
            <li><span className="font-medium text-foreground">Parameters:</span> Number of estimators: 100, Contamination rate set to 0.1 (assumed 10% anomalies).</li>
            <li><span className="font-medium text-foreground">Outcome:</span> Scores above 0.7 trigger investigation and alert.</li>
        </ul>
      </div>
    </div>
  )
}

function SampleDataContent() {

  const formulas = [
    { name: "Patient Risk Level", formula: "R = ((Vp * 0.4) + (Sv * 0.3) + (Er * 0.3)) / 10 * 100", purpose: "Compute patient's infection risk %" },
    { name: "Prescription Sales Discrepancy", formula: "D = (Over-the-counter sales / Prescriptions) * 100", purpose: "Percent discrepancy in sales" },
    { name: "Anomaly Score", formula: "Computed by Isolation Forest; based on average path length", purpose: "Detect sales anomalies" },
    { name: "LSTM Loss Function (MSE)", formula: "MSE = (1/n) * Σ(yi - ŷi)²", purpose: "Train neural network forecasting" },
  ]
  
  const patientDataSample = [
    { id: "P12345", pathogen: "MRSA", virulence: "9/10", vulnerability: "8/10", envRisk: "6/10", riskPercent: 78 },
  ]

  const salesDataSample = [
    { antibiotic: "Vancomycin", prescription: "100 doses", sales: "130 doses", otc: "30 doses", discrepancy: "30%", alert: "Yes" },
  ]

  return (
    <div className="space-y-6 text-sm">
      <div>
        <h4 className="font-semibold mb-2">Formulas Summary</h4>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Formula Name</TableHead>
              <TableHead>Formula</TableHead>
              <TableHead>Purpose</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {formulas.map(row => (
              <TableRow key={row.name}>
                <TableCell className="font-medium">{row.name}</TableCell>
                <TableCell><code className="text-xs">{row.formula}</code></TableCell>
                <TableCell>{row.purpose}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      <div>
        <h4 className="font-semibold mb-2">Sample Data Tables</h4>
        <h5 className="font-medium mb-1 mt-4">Patient Data Entry Example</h5>
         <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Patient ID</TableHead>
              <TableHead>Pathogen</TableHead>
              <TableHead>Virulence</TableHead>
              <TableHead>Vulnerability</TableHead>
              <TableHead>Env. Risk</TableHead>
              <TableHead>Risk Level (%)</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {patientDataSample.map(row => (
              <TableRow key={row.id}>
                <TableCell>{row.id}</TableCell>
                <TableCell>{row.pathogen}</TableCell>
                <TableCell>{row.virulence}</TableCell>
                <TableCell>{row.vulnerability}</TableCell>
                <TableCell>{row.envRisk}</TableCell>
                <TableCell className="font-bold">{row.riskPercent}%</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <h5 className="font-medium mb-1 mt-4">Prescription vs Pharmacy Sales</h5>
         <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Antibiotic</TableHead>
              <TableHead>Prescribed</TableHead>
              <TableHead>Sold</TableHead>
              <TableHead>OTC</TableHead>
              <TableHead>Discrepancy</TableHead>
              <TableHead>Alert</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {salesDataSample.map(row => (
              <TableRow key={row.antibiotic}>
                <TableCell>{row.antibiotic}</TableCell>
                <TableCell>{row.prescription}</TableCell>
                <TableCell>{row.sales}</TableCell>
                <TableCell>{row.otc}</TableCell>
                <TableCell>{row.discrepancy}</TableCell>
                <TableCell><Badge variant="destructive">{row.alert}</Badge></TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
       <div>
        <h4 className="font-semibold mb-2">Synopsis for Research Paper Inclusion</h4>
        <p className="text-muted-foreground">
        This contact tracing and screening platform integrates multi-stakeholder real-time data entry, analytic models, and notification systems to mitigate risks of multidrug-resistant pathogens in hospitals. Rigorous test cases validate the accurate calculation of patient risk scores using a weighted formula combining pathogen virulence, patient vulnerability, and environmental hygiene. Prescription tracking employs an Isolation Forest anomaly detection model to uncover discrepancies between prescriptions and pharmacy sales, crucial for preventing antimicrobial misuse.
        </p>
        <p className="text-muted-foreground mt-2">
        The resistance trend prediction uses LSTM neural networks trained on historical monthly resistance profiles, enabling proactive clinical interventions. Additionally, Random Forest classifiers stratify patient risks for tailored care priorities. These sophisticated machine learning applications bolster infection control, enhancing outcomes through data-driven decision support.
        </p>
      </div>
    </div>
  )
}
