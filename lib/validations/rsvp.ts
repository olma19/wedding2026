import { z } from 'zod'

export const rsvpSchema = z.object({
  guest_name: z.string().min(1, 'Namn är obligatoriskt').max(100, 'Namnet är för långt'),
  email: z.string().email('Ogiltig e-postadress').optional().or(z.literal('')),
  attending: z.boolean(),
  number_of_attendees: z
    .number()
    .int('Måste vara ett heltal')
    .min(1, 'Minst 1 person krävs')
    .max(20, 'Max 20 personer tillåtna'),
  food_allergies: z.string().max(500, 'Beskrivningen är för lång').optional(),
  dietary_restrictions: z.string().max(500, 'Beskrivningen är för lång').optional(),
  special_requests: z.string().max(1000, 'Beskrivningen är för lång').optional(),
})

export type RSVPFormData = z.infer<typeof rsvpSchema>
