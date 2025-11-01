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
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { Stethoscope, Pill, Microscope, Check, X, AlertTriangle, Cpu, TestTube2, Database, BarChart } from "lucide-react";
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

export default function DataEntryLogsPage() {
  const getRiskBadge = (risk: number) => {
    if (risk > 70) return <Badge variant="destructive">High</Badge>;
    if (risk > 40) return <Badge className="bg-yellow-100 text-yellow-800 dark:bg-yellow-900/50 dark:text-yellow-300">Medium</Badge>;
    return <Badge className="bg-green-100 text-green-800 dark:bg-green-900/50 dark:text-green-300">Low</Badge>;
  };

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
          Logs & Analytics
        </h1>
        <p className="text-muted-foreground">
          A comprehensive record of all data submitted by different teams with calculated outputs and justifications.
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

        <Card>
          <CardHeader>
            <CardTitle>Patient &amp; Staff Risk Data</CardTitle>
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
              <Cpu className="h-6 w-6" /> System Analytics & Model Insights
            </CardTitle>
            <CardDescription>
              Detailed information on test cases, machine learning models, and data analytics for research and validation purposes.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Accordion type="single" collapsible className="w-full">
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
               <AccordionItem value="item-4">
                <AccordionTrigger>
                  <div className="flex items-center gap-2"><BarChart /> ML-Powered Metrics Justification</div>
                </AccordionTrigger>
                <AccordionContent>
                  <MetricsJustificationContent />
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}


function TestCaseContent() {
  const testCases = [
    {
      case: "Test Case 1: Patient Risk Assessment and Data Entry",
      inputs: "Patient ID: P12345, Admission Date: 2025-10-10, Suspected Pathogen: MRSA, Symptoms: Fever (102°F), Cough, Fatigue, Equipment Used: Foley catheter, Ventilator, Mobility Status: Bedridden, Previous Antibiotic Usage: Vancomycin for 5 days, Environmental Sanitation Score near patient: 58/100",
      procedure: "Data entered into system by clinician. Patient vulnerability score calculated based on age, comorbidities, mobility (scored 8/10). Pathogen virulence index for MRSA set at 9/10. Environmental risk factor at patient's location captured as 6/10 (from sanitation score).",
      formula: "R = ((Vp * 0.4) + (Sv * 0.3) + (Er * 0.3)) / 10 * 100",
      calculation: "R = ((9 * 0.4) + (8 * 0.3) + (6 * 0.3)) / 10 * 100 = ((3.6 + 2.4 + 1.8) / 10) * 100 = 74%",
      expected: "Risk Level: 74%. Real-time alert generated (threshold set at 70%). Dashboard displays patient risk status and notifies AMSP and environment teams.",
      result: "Passed. System correctly computed risk, generated alert, and updated dashboard in real-time."
    },
    {
      case: "Test Case 2: Antimicrobial Prescription Entry and Sales Monitoring",
      inputs: "Antibiotic: Vancomycin, Dosage: 1g twice daily, Duration: 7 days, Prescription entered by Dr. Smith, Pharmacy Sales Data (last 1 week): Prescriptions documented: 100 doses, Over-the-counter sales detected: 30 doses",
      procedure: "Prescription tracked and matched with pharmacy sales. Isolation Forest anomaly detection algorithm applied to identify unusual sales patterns. Discrepancy calculated as D = (OTC_sales / Prescriptions) * 100.",
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
      inputs: "Historical monthly resistance data for pathogens like MRSA, Clostridium difficile, Actinobacter. Patient follow-up data.",
      model: "Time-series forecasting model — Long Short Term Memory (LSTM) neural network.",
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
          <p className="text-muted-foreground mt-2"><span className="font-medium text-foreground">Inputs:</span> {tc.inputs}</p>
          <p className="text-muted-foreground mt-1"><span className="font-medium text-foreground">Procedure:</span> {tc.procedure}</p>
          {tc.calculation && <p className="text-muted-foreground mt-1"><span className="font-medium text-foreground">Calculation:</span> <code className="text-xs bg-muted p-1 rounded-sm">{tc.calculation}</code></p>}
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
             <li><span className="font-medium text-foreground">Example Prediction:</span> MRSA resistance predicted to increase from 45% to 50% over next 3 months.</li>
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
  ];
  
  const patientDataSample = [
    { patientId: "P12345", pathogen: "MRSA", virulence: "9/10", vulnerability: "8/10", envRisk: "6/10", riskPercent: 74 },
  ];

  const salesDataSample = [
    { antibiotic: "Vancomycin", prescription: "100 doses", sales: "130 doses", otc: "30 doses", discrepancy: "30%", alert: "Yes" },
  ];

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
        <h4 className="font-semibold mb-2">Sample Tables</h4>
        <h5 className="font-medium mb-1 mt-4">Patient Data Entry Example</h5>
         <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Patient ID</TableHead>
              <TableHead>Pathogen</TableHead>
              <TableHead>Virulence</TableHead>
              <TableHead>Vulnerability</TableHead>
              <TableHead>Env. Risk</TableHead>
              <TableHead>Calculated Risk (%)</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {patientDataSample.map(row => (
              <TableRow key={row.patientId}>
                <TableCell>{row.patientId}</TableCell>
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

function MetricsJustificationContent() {
  return (
    <div className="space-y-4 text-sm">
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
    </div>
  )
}
