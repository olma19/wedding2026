import { z } from 'zod'

const attendeeSchema = z.object({
  firstname: z.string().min(1, 'Förnamn krävs').max(100, 'Förnamnet är för långt'),
  lastname: z.string().min(1, 'Efternamn krävs').max(100, 'Efternamnet är för långt'),
  allergies: z.string().max(500, 'För långt').optional().or(z.literal('')),
  wants_bus: z.boolean(),
})

export const rsvpSchema = z
  .object({
    email: z.string().email('Ogiltig e-postadress').optional().or(z.literal('')),
    attending: z.boolean(),
    number_of_attendees: z
      .number()
      .int('Måste vara ett heltal')
      .min(0, 'Måste vara 0 eller mer')
      .max(20, 'Max 20 personer'),
    attendees: z.array(attendeeSchema).optional(),
  })
  .refine(
    (data) => {
      if (!data.attending) return true
      return (data.attendees?.length ?? 0) === data.number_of_attendees && data.number_of_attendees >= 1
    },
    { message: 'Fyll i uppgifter för alla gäster', path: ['attendees'] }
  )

export type AttendeeFormData = z.infer<typeof attendeeSchema>
export type RSVPFormData = z.infer<typeof rsvpSchema>
