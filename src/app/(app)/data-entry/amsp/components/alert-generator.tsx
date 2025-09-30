"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { generateRoleBasedAlert, GenerateRoleBasedAlertOutput } from "@/ai/flows/generate-role-based-alerts";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Loader2, Sparkles, Send } from "lucide-react";
import { 
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";

const alertSchema = z.object({
  alertType: z.string().min(1, "Alert type is required."),
  userRole: z.string().min(1, "User role is required."),
  patientDetails: z.string().optional(),
  protocolDetails: z.string().optional(),
});

type AlertFormData = z.infer<typeof alertSchema>;

export default function AlertGenerator() {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<GenerateRoleBasedAlertOutput | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const form = useForm<AlertFormData>({
    resolver: zodResolver(alertSchema),
    defaultValues: {
      alertType: "high-risk-patient",
      userRole: "Doctor",
      patientDetails: "",
      protocolDetails: "",
    },
  });

  async function onSubmit(data: AlertFormData) {
    setLoading(true);
    setError(null);
    setResult(null);
    try {
      const response = await generateRoleBasedAlert(data);
      setResult(response);
      setIsDialogOpen(true);
    } catch (e) {
      setError("Failed to generate alert. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="alertType"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Alert Type</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select an alert type" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="high-risk patient">High-Risk Patient</SelectItem>
                    <SelectItem value="protocol breach">Protocol Breach</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="userRole"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Target User Role</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a user role" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="Doctor">Doctor</SelectItem>
                    <SelectItem value="AMSP">AMSP Team</SelectItem>
                    <SelectItem value="EVST">EVST/Lab</SelectItem>
                    <SelectItem value="Pharma">Pharmacist</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="patientDetails"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Patient Details (optional)</FormLabel>
                <FormControl>
                  <Textarea placeholder="e.g., Patient #P789, ICU, suspected MRSA" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button type="submit" disabled={loading} className="w-full">
            {loading ? (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            ) : (
              <Sparkles className="mr-2 h-4 w-4" />
            )}
            Generate &amp; Dispatch Alert
          </Button>

          {error && <p className="text-sm text-destructive mt-2">{error}</p>}
        </form>
      </Form>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2"><Send /> Alert Generated &amp; Dispatched</DialogTitle>
            <DialogDescription>
              The following alert and recommendations have been generated for the selected role.
            </DialogDescription>
          </DialogHeader>
          {result && (
            <div className="space-y-4 mt-4 text-sm">
                <div>
                    <h4 className="font-semibold mb-1 text-foreground">Alert Message:</h4>
                    <p className="p-3 bg-muted rounded-md">{result.alertMessage}</p>
                </div>
                <div>
                    <h4 className="font-semibold mb-1 text-foreground">Recommended Actions:</h4>
                    <div className="p-3 bg-muted rounded-md whitespace-pre-line">{result.recommendedActions}</div>
                </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}
