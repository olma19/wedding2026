# Wedding Landing Page - Project Information

## Project Goals

Create an elegant, informative wedding landing page that allows guests to:
1. Learn about the wedding (date, location, schedule, etc.)
2. RSVP to confirm attendance
3. Provide food allergy and dietary restriction information

## Key Requirements

### Must-Have Features
- **Landing Page Sections**:
  - Hero section with couple names and wedding date
  - About/Story section
  - Event details (ceremony, reception, etc.)
  - Location and directions
  - RSVP form
  - Contact information

- **RSVP Functionality**:
  - Guest name(s)
  - Attendance confirmation (Yes/No)
  - Number of attendees
  - Food allergies and dietary restrictions
  - Optional: Special requests or messages

- **Data Collection**:
  - Store RSVP responses
  - Track attendance numbers
  - Maintain allergy/dietary information

### Nice-to-Have Features
- Photo gallery
- Registry information
- Accommodation suggestions
- Timeline/schedule
- Map integration
- Email confirmations
- Admin dashboard to view RSVPs

## Design Considerations

- **Tone**: Elegant, romantic, warm
- **Color Scheme**: To be determined (consider wedding theme colors)
- **Typography**: Clean, readable, elegant fonts
- **Imagery**: High-quality photos of the couple
- **Mobile-First**: Must work beautifully on all devices

## Technical Decisions

1. **Database & Backend**: ✅ **Supabase**
   - PostgreSQL database
   - Built-in authentication (if needed)
   - Row Level Security (RLS)
   - Real-time capabilities
   - Storage for images
   - Serverless functions (Edge Functions)

2. **Hosting**:
   - Vercel (recommended for Next.js)
   - Netlify
   - Self-hosted

3. **Email Notifications**:
   - Send confirmation emails to guests?
   - Notify couple of new RSVPs?

4. **Authentication**:
   - Admin access to view RSVPs?
   - Guest access (probably not needed)

## Content Needed

- Couple names
- Wedding date and time
- Ceremony location
- Reception location
- Wedding story/background
- Photos
- Contact information
- Registry links (if applicable)

## Timeline

- Phase 1: Project setup and basic structure
- Phase 2: Landing page design and content
- Phase 3: RSVP form implementation
- Phase 4: Backend/data storage
- Phase 5: Testing and refinement
- Phase 6: Deployment
