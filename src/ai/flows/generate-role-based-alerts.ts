// src/ai/flows/generate-role-based-alerts.ts
'use server';

/**
 * @fileOverview Generates role-based alerts with tailored recommendations for high-risk patients or protocol breaches.
 *
 * - generateRoleBasedAlert - A function that generates role-based alerts.
 * - GenerateRoleBasedAlertInput - The input type for the generateRoleBasedAlert function.
 * - GenerateRoleBasedAlertOutput - The return type for the generateRoleBasedAlert function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateRoleBasedAlertInputSchema = z.object({
  alertType: z
    .string()
    .describe('The type of alert, e.g., high-risk patient or protocol breach.'),
  userRole: z
    .string()
    .describe(
      'The role of the user receiving the alert (Doctor, AMSP, EVST, Lab).'
    ),
  patientDetails: z
    .string()
    .optional()
    .describe('Details about the patient, if applicable.'),
  protocolDetails: z
    .string()
    .optional()
    .describe('Details about the protocol breach, if applicable.'),
});
export type GenerateRoleBasedAlertInput = z.infer<
  typeof GenerateRoleBasedAlertInputSchema
>;

const GenerateRoleBasedAlertOutputSchema = z.object({
  alertMessage: z.string().describe('The generated alert message.'),
  recommendedActions: z
    .string()
    .describe('Recommended actions tailored to the user role.'),
});
export type GenerateRoleBasedAlertOutput = z.infer<
  typeof GenerateRoleBasedAlertOutputSchema
>;

export async function generateRoleBasedAlert(
  input: GenerateRoleBasedAlertInput
): Promise<GenerateRoleBasedAlertOutput> {
  return generateRoleBasedAlertFlow(input);
}

const generateRoleBasedAlertPrompt = ai.definePrompt({
  name: 'generateRoleBasedAlertPrompt',
  input: {schema: GenerateRoleBasedAlertInputSchema},
  output: {schema: GenerateRoleBasedAlertOutputSchema},
  prompt: `You are an alert generation system designed to provide real-time alerts and recommendations based on user roles.

  You will receive the alert type, user role, and any relevant details, and then generate an alert message and tailored recommended actions.

  Alert Type: {{{alertType}}}
  User Role: {{{userRole}}}
  Patient Details: {{{patientDetails}}}
  Protocol Details: {{{protocolDetails}}}

  Generate a concise alert message and a list of recommended actions specific to the user's role. If patientDetails or protocolDetails is undefined, do not mention them.

  Alert Message:
  Recommended Actions:`,
});

const generateRoleBasedAlertFlow = ai.defineFlow(
  {
    name: 'generateRoleBasedAlertFlow',
    inputSchema: GenerateRoleBasedAlertInputSchema,
    outputSchema: GenerateRoleBasedAlertOutputSchema,
  },
  async input => {
    const {output} = await generateRoleBasedAlertPrompt(input);
    return output!;
  }
);
