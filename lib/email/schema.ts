import { z } from "zod";

export const sendEmailAPIPayloadSchema = z.object({
  from: z.string().email(),
  to: z.string().email(),
  subject: z.string().min(1),
  html: z.string().min(1),
});

export type SendEmailAPIPayload = z.infer<typeof sendEmailAPIPayloadSchema>;
