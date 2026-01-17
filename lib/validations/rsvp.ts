import { z } from 'zod'

export const rsvpSchema = z.object({
  guest_name: z.string().min(1, 'Name is required').max(100, 'Name is too long'),
  email: z.string().email('Invalid email address').optional().or(z.literal('')),
  attending: z.boolean(),
  number_of_attendees: z
    .number()
    .int('Must be a whole number')
    .min(1, 'At least 1 attendee is required')
    .max(20, 'Maximum 20 attendees allowed'),
  food_allergies: z.string().max(500, 'Food allergies description is too long').optional(),
  dietary_restrictions: z.string().max(500, 'Dietary restrictions description is too long').optional(),
  special_requests: z.string().max(1000, 'Special requests description is too long').optional(),
})

export type RSVPFormData = z.infer<typeof rsvpSchema>
