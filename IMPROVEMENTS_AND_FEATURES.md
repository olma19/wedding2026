# Improvements & New Features - Wedding Website 2026

A living document for potential improvements, enhancements, and new features for the wedding landing page.

**Status Legend:**
- 💡 Idea - Initial concept
- 📋 Planned - Added to roadmap
- 🚧 In Progress - Currently being worked on
- ✅ Completed - Feature implemented
- ❌ Rejected - Decided against

**Priority:**
- 🔥 High - Important for core functionality
- 🟡 Medium - Nice to have, improves experience
- 🟢 Low - Polish or future consideration

---

## 🎨 Design & UX Improvements

### Visual Enhancements

#### 💡 Animated Transitions Between Sections 🟡
**Description:** Smooth scroll animations and fade-in effects as users scroll through sections
- [ ] Add intersection observer for scroll-triggered animations
- [ ] Implement fade-in animations for section content
- [ ] Add parallax effects for hero section (subtle)
- [ ] Smooth scroll behavior improvements

**Impact:** More polished, modern feel

---

#### 💡 Image Gallery Section 🟡
**Description:** Photo gallery showcasing couple photos, engagement photos, or venue photos
- [ ] Create `PhotoGallerySection.tsx` component
- [ ] Lightbox/modal for full-size images
- [ ] Grid layout with masonry or uniform grid
- [ ] Lazy loading for images
- [ ] Add to config: `gallery: { images: [...] }`

**Impact:** More engaging, personal touch

---

#### 💡 Interactive Timeline Section 🟡
**Description:** Visual timeline showing wedding day schedule
- [ ] Timeline component with events (ceremony, photos, dinner, etc.)
- [ ] Time-based layout
- [ ] Icons for different event types
- [ ] Mobile-friendly vertical timeline
- [ ] Add to config: `timeline: { events: [...] }`

**Impact:** Helps guests plan their day

---

#### 💡 Weather Widget 🟢
**Description:** Show weather forecast for wedding day
- [ ] Integrate weather API (OpenWeatherMap, etc.)
- [ ] Display forecast for wedding date
- [ ] Show at venue location
- [ ] Optional: clothing suggestions based on weather

**Impact:** Practical information for guests

---

## 📱 Functionality Enhancements

### RSVP Improvements

#### ✅ RSVP Confirmation Email ✅
**Description:** Send email confirmation when guest submits RSVP
- [x] Set up email service (Resend)
- [x] Create email template (HTML + text versions)
- [x] Send confirmation on successful RSVP submission
- [x] Include RSVP details in email (names, allergies, bus, songs)
- [x] Add email field to RSVP form
- [ ] Add unsubscribe option (future enhancement)

**Impact:** Better guest experience, reduces confusion

**Files Created:**
- `lib/email/resend.ts` - Email service with Resend integration
- `docs/EMAIL_SETUP.md` - Setup guide for Resend

**Files Modified:**
- `components/RSVPForm.tsx` - Added email input field
- `lib/validations/rsvp.ts` - Added email validation
- `app/api/rsvp/route.ts` - Integrated email sending
- `env.example` - Added Resend configuration
- `README.md` - Updated with Resend setup instructions

---

#### 💡 RSVP Edit/Update Feature 🟡
**Description:** Allow guests to update their RSVP after submission
- [ ] Add "Edit RSVP" link in confirmation email
- [ ] Unique token-based edit link
- [ ] Pre-fill form with existing data
- [ ] Update existing record instead of creating new one
- [ ] Show "Last updated" timestamp

**Impact:** Reduces duplicate RSVPs, better data quality

---

#### 💡 RSVP Reminder System 🟡
**Description:** Send reminder emails to guests who haven't RSVP'd
- [ ] Admin dashboard feature to send reminders
- [ ] Email template for reminders
- [ ] Track who has/hasn't responded
- [ ] Scheduled reminders (e.g., 2 weeks before deadline)

**Impact:** Higher response rate

---

#### 💡 Guest List Management 🔥
**Description:** Admin can manage guest list, mark who's invited
- [ ] Admin interface to add/edit guest list
- [ ] Track invitation status
- [ ] See who has/hasn't RSVP'd
- [ ] Export guest list to CSV
- [ ] Filter and search functionality

**Impact:** Better event planning, easier tracking

---

#### 💡 Plus-One Management 🟡
**Description:** Control plus-one options per guest
- [ ] Admin can specify if guest can bring plus-one
- [ ] Show/hide plus-one option in RSVP form
- [ ] Track plus-one names separately
- [ ] Limit total plus-ones if needed

**Impact:** Better guest count control

---

### Admin Dashboard Enhancements

#### ✅ Enhanced Admin Dashboard ✅
**Description:** More comprehensive admin interface
- [x] Dashboard with statistics (total RSVPs, attending count, etc.)
- [x] Visual charts/graphs (attendance rate progress bar)
- [x] Enhanced statistics cards with icons and gradients
- [x] RSVP details modal/view
- [x] Export functionality (CSV)
- [x] Search and filter capabilities (name, allergies, songs, attending status, bus)
- [ ] Guest list management (separate feature)
- [ ] PDF export (future enhancement)
- [ ] Bulk actions (future enhancement)

**Impact:** Easier event management

**Files Modified:**
- `app/admin/page.tsx` - Enhanced with search, filters, tabs, modal, and improved UI

---

#### 💡 RSVP Analytics 🟡
**Description:** Insights and analytics about RSVPs
- [ ] Attendance rate tracking
- [ ] Dietary restrictions summary
- [ ] Bus transportation count
- [ ] Song request list
- [ ] Response time analytics
- [ ] Visual charts and graphs

**Impact:** Better planning insights

---

#### 💡 Admin Notifications 🟡
**Description:** Notify admins of new RSVPs
- [ ] Email notification on new RSVP
- [ ] Optional: SMS notifications
- [ ] Daily/weekly summary emails
- [ ] Configurable notification preferences

**Impact:** Stay updated without checking dashboard

---

## 🌐 Integration Features

### Map & Location

#### 💡 Enhanced Map Integration 🟡
**Description:** Better location and directions features
- [ ] Embedded Google Maps (not just link)
- [ ] Multiple locations (ceremony, reception, hotels)
- [ ] Custom map markers
- [ ] Directions from common locations
- [ ] Parking information
- [ ] Public transport options

**Impact:** Easier navigation for guests

---

#### 💡 Accommodation Recommendations 🟡
**Description:** Curated list of nearby hotels/accommodations
- [ ] List of recommended hotels
- [ ] Distance from venue
- [ ] Booking links
- [ ] Price ranges
- [ ] Special rates/discount codes
- [ ] Add to config: `accommodations: [...]`

**Impact:** Helps guests with travel planning

---

### Social & Sharing

#### 💡 Social Media Integration 🟢
**Description:** Share wedding website on social media
- [ ] Social sharing buttons
- [ ] Open Graph meta tags (already have, but can enhance)
- [ ] Twitter card optimization
- [ ] Shareable link with preview

**Impact:** Easier sharing, more visibility

---

#### 💡 Guest Book/Message Board 🟡
**Description:** Allow guests to leave messages for the couple
- [ ] Guest book section
- [ ] Form to submit messages
- [ ] Display messages (with moderation option)
- [ ] Admin can approve/delete messages
- [ ] Optional: Photo uploads with messages

**Impact:** More personal, interactive experience

---

#### 💡 Photo Upload by Guests 🟡
**Description:** Guests can upload photos from the wedding
- [ ] Photo upload form
- [ ] Integration with Supabase Storage
- [ ] Photo gallery showing guest photos
- [ ] Moderation system (admin approval)
- [ ] Optional: Photo tagging/names

**Impact:** Collect memories from guests

---

## 📧 Communication Features

### Email & Notifications

#### 💡 Save-the-Date Emails 🟡
**Description:** Send save-the-date emails to guests
- [ ] Email template for save-the-date
- [ ] Admin can send to guest list
- [ ] Include wedding date and link to website
- [ ] Beautiful HTML email design

**Impact:** Professional communication

---

#### 💡 Event Updates/Announcements 🟡
**Description:** Send updates to all guests (e.g., time changes, weather updates)
- [ ] Admin can create announcements
- [ ] Send to all RSVP'd guests
- [ ] Email template for announcements
- [ ] Archive of past announcements

**Impact:** Easy communication with guests

---

#### 💡 Thank You Messages 🟢
**Description:** Automated thank you after RSVP
- [ ] Personalized thank you message
- [ ] Include guest name
- [ ] Next steps information
- [ ] Link back to website

**Impact:** Appreciation for guests

---

## 🎁 Gift & Registry

#### 💡 Gift Registry Integration 🟡
**Description:** Link to gift registries or cash fund
- [ ] Add registry links to config
- [ ] Display registry section
- [ ] Multiple registry support
- [ ] Cash fund option (e.g., honeymoon fund)
- [ ] Thank you tracking for gifts

**Impact:** Makes gift-giving easier

---

#### 💡 Gift Tracking 🟢
**Description:** Track received gifts (admin only)
- [ ] Admin can mark gifts as received
- [ ] Thank you note tracking
- [ ] Gift list management
- [ ] Avoid duplicate gifts

**Impact:** Better gift management

---

## 🎵 Music & Entertainment

#### ✅ Song Request Playlist ✅
**Description:** Display submitted song requests
- [x] Show all song requests in admin dashboard
- [x] Filter duplicates (case-insensitive)
- [x] Show count for duplicate requests
- [x] Display who requested each song
- [x] Export to text file for DJ
- [ ] Create Spotify/Apple Music playlist (future enhancement)
- [ ] Vote on songs (future enhancement)

**Impact:** Better party music, guest engagement

**Files Modified:**
- `app/admin/page.tsx` - Added song requests tab with duplicate filtering and export

---

#### 💡 Music Player Widget 🟢
**Description:** Play selected songs on the website
- [ ] Embed Spotify/Apple Music player
- [ ] Playlist of requested songs
- [ ] Background music option

**Impact:** More interactive experience

---

## 🍽️ Food & Dietary

#### 💡 Menu Preview Section 🟡
**Description:** Show wedding menu options
- [ ] Display menu items
- [ ] Dietary information per dish
- [ ] Allergen labels
- [ ] Add to config: `menu: { courses: [...] }`

**Impact:** Guests know what to expect

---

#### 💡 Dietary Restrictions Summary 🔥
**Description:** Better tracking and display of dietary needs
- [ ] Admin dashboard showing all dietary restrictions
- [ ] Grouped by restriction type
- [ ] Export for caterer
- [ ] Visual summary/chart

**Impact:** Easier catering planning

---

## 📅 Calendar Integration

#### 💡 Add to Calendar Links 🟡
**Description:** One-click add to calendar
- [ ] Generate .ics files for events
- [ ] Add to Google Calendar link
- [ ] Add to Apple Calendar link
- [ ] Add to Outlook link
- [ ] Include all event details

**Impact:** Convenience for guests

---

#### 💡 Countdown Widget Improvements 🟡
**Description:** Enhanced countdown features
- [ ] Multiple countdowns (days, hours, minutes)
- [ ] Animated numbers
- [ ] Share countdown
- [ ] Milestone celebrations (100 days, 1 month, etc.)

**Impact:** More engaging

---

## 🚗 Transportation

#### 💡 Transportation Management 🟡
**Description:** Better bus/transportation tracking
- [ ] Show bus capacity and availability
- [ ] Real-time bus status (if applicable)
- [ ] Multiple pickup locations
- [ ] Transportation timeline
- [ ] Contact information for transportation

**Impact:** Better logistics

---

#### 💡 Carpool Matching 🟢
**Description:** Help guests find carpool partners
- [ ] Guest can opt-in to carpool matching
- [ ] Show guests from same area
- [ ] Contact information sharing (with permission)
- [ ] Carpool groups

**Impact:** Eco-friendly, cost-saving

---

## 🎨 Personalization

#### 💡 Multi-language Support 🟡
**Description:** Support for multiple languages
- [ ] Swedish/English toggle
- [ ] Language switcher component
- [ ] Translate all content
- [ ] Store language preference
- [ ] Add to config: `languages: ['sv', 'en']`

**Impact:** Accessibility for international guests

---

#### 💡 Theme Customization 🟢
**Description:** More customization options
- [ ] Custom color picker (beyond preset schemes)
- [ ] Font selection
- [ ] Layout options
- [ ] Custom CSS injection (admin)

**Impact:** More personalized website

---

## 📊 Analytics & Insights

#### 💡 Website Analytics 🟡
**Description:** Track website usage
- [ ] Integrate Google Analytics or Plausible
- [ ] Track page views
- [ ] Track RSVP conversion rate
- [ ] See which sections are most viewed
- [ ] Mobile vs desktop usage

**Impact:** Understand guest behavior

---

#### 💡 A/B Testing 🟢
**Description:** Test different designs/content
- [ ] Test different hero images
- [ ] Test different CTAs
- [ ] Test form layouts
- [ ] Measure conversion rates

**Impact:** Optimize for best results

---

## 🔒 Security & Privacy

#### 💡 RSVP Password Protection 🟡
**Description:** Protect RSVP form with password
- [ ] Optional password for RSVP form
- [ ] Share password with invited guests
- [ ] Prevent spam RSVPs
- [ ] Add to config: `rsvpPassword: string | null`

**Impact:** Privacy and spam prevention

---

#### 💡 GDPR Compliance 🟡
**Description:** Ensure data privacy compliance
- [ ] Privacy policy page
- [ ] Cookie consent banner
- [ ] Data deletion request form
- [ ] Data export functionality
- [ ] Clear data retention policy

**Impact:** Legal compliance

---

## 🎬 Content Features

#### 💡 Video Section 🟡
**Description:** Embed videos (engagement video, venue tour, etc.)
- [ ] Video component
- [ ] YouTube/Vimeo integration
- [ ] Custom video uploads
- [ ] Video gallery
- [ ] Add to config: `videos: [...]`

**Impact:** More engaging content

---

#### 💡 Story Timeline 🟡
**Description:** Enhanced story section with timeline
- [ ] Visual timeline of relationship
- [ ] Key milestones
- [ ] Photos for each milestone
- [ ] Interactive timeline

**Impact:** More personal, engaging story

---

#### 💡 FAQ Section 🟡
**Description:** Frequently asked questions
- [ ] FAQ component
- [ ] Expandable Q&A format
- [ ] Search functionality
- [ ] Add to config: `faq: { questions: [...] }`

**Impact:** Reduces repeated questions

---

## 🛠️ Technical Improvements

#### 💡 Progressive Web App (PWA) 🟡
**Description:** Make website installable as app
- [ ] Service worker
- [ ] Web app manifest
- [ ] Offline support
- [ ] App icons
- [ ] Install prompt

**Impact:** Better mobile experience

---

#### 💡 Performance Optimization 🟡
**Description:** Further optimize performance
- [ ] Image optimization audit
- [ ] Code splitting improvements
- [ ] Font optimization
- [ ] Bundle size analysis
- [ ] Lighthouse score improvements

**Impact:** Faster loading, better UX

---

#### 💡 SEO Enhancements 🟡
**Description:** Improve search engine visibility
- [ ] Structured data (JSON-LD)
- [ ] Sitemap generation
- [ ] robots.txt optimization
- [ ] Meta descriptions for all pages
- [ ] Open Graph image optimization

**Impact:** Better discoverability

---

#### 💡 Error Monitoring 🟡
**Description:** Track errors in production
- [ ] Integrate Sentry or similar
- [ ] Error tracking
- [ ] Performance monitoring
- [ ] User feedback collection

**Impact:** Better reliability

---

## 🎯 Quick Wins (Easy to Implement)

#### ✅ Loading Skeletons ✅
**Description:** Better loading states
- [x] Skeleton loaders for sections
  - [x] Created base `Skeleton` component with variants (text, circular, rectangular, rounded)
  - [x] Created `SectionSkeleton` component for section placeholders
  - [x] Created `CardSkeleton` component for card placeholders
  - [x] Created `SectionSkeletonLoader` with section-specific skeletons
- [x] Replace spinners with skeletons
  - [x] Updated `SectionRegistry` to use skeletons instead of spinners
  - [x] Section-specific skeletons match actual content structure
- [x] Smooth loading transitions
  - [x] Pulse and wave animations
  - [x] Shimmer animation added to globals.css

**Impact:** Better perceived performance

**Files Created:**
- `components/ui/Skeleton.tsx` - Base skeleton component
- `components/ui/SectionSkeleton.tsx` - Section skeleton component
- `components/ui/CardSkeleton.tsx` - Card skeleton component
- `components/sections/SectionSkeletonLoader.tsx` - Section-specific skeleton mappings
- `components/ui/Skeleton.test.tsx` - Test suite for skeleton components

**Files Modified:**
- `components/sections/SectionRegistry.tsx` - Uses skeletons instead of spinners
- `app/globals.css` - Added shimmer animation
- `components/ui/index.ts` - Added skeleton exports

---

#### 💡 Print Styles 🟢
**Description:** Print-friendly version
- [ ] Print CSS styles
- [ ] Hide decorative elements when printing
- [ ] Optimize for A4 paper
- [ ] Include essential information only

**Impact:** Guests can print details

---

#### 💡 Keyboard Shortcuts 🟢
**Description:** Keyboard navigation shortcuts
- [ ] Skip to main content (Alt+M)
- [ ] Skip to RSVP form (Alt+R)
- [ ] Navigation shortcuts
- [ ] Help modal showing shortcuts

**Impact:** Accessibility improvement

---

#### 💡 Dark Mode Support 🟡
**Description:** Dark mode theme option
- [ ] Dark mode toggle
- [ ] System preference detection
- [ ] Smooth theme transition
- [ ] Persist preference

**Impact:** Better for low-light viewing

---

## 📝 Content Management

#### 💡 Content Editor (Admin) 🟡
**Description:** Admin can edit content without code
- [ ] Rich text editor for sections
- [ ] Image upload interface
- [ ] Content preview
- [ ] Version history
- [ ] Draft/publish workflow

**Impact:** Easier content updates

---

#### 💡 Content Versioning 🟢
**Description:** Track content changes
- [ ] Version history for config
- [ ] Rollback capability
- [ ] Change log
- [ ] Who changed what and when

**Impact:** Better content management

---

## 🎁 Bonus Features

#### 💡 QR Code Generator 🟡
**Description:** Generate QR codes for easy access
- [ ] QR code for website URL
- [ ] QR code for RSVP form
- [ ] QR code for location
- [ ] Printable QR codes
- [ ] Add to invitations

**Impact:** Easy access from printed materials

---

#### 💡 Wedding Hashtag Integration 🟢
**Description:** Social media hashtag tracking
- [ ] Display wedding hashtag prominently
- [ ] Show Instagram posts with hashtag (if public)
- [ ] Social media feed integration
- [ ] Add to config: `hashtag: '#wedding2026'`

**Impact:** Collect social media content

---

#### 💡 Virtual Guest Book 🟡
**Description:** Digital guest book
- [ ] Messages from guests
- [ ] Photo uploads
- [ ] Well-wishes
- [ ] Display on website
- [ ] Export as keepsake

**Impact:** Collect memories

---

## 🚀 Future Considerations

#### 💡 Mobile App 🟢
**Description:** Native mobile app
- [ ] React Native app
- [ ] Push notifications
- [ ] Offline access
- [ ] App store distribution

**Impact:** Better mobile experience (long-term)

---

#### 💡 Live Updates 🟢
**Description:** Real-time updates during event
- [ ] Live schedule updates
- [ ] Real-time announcements
- [ ] Live photo feed
- [ ] WebSocket integration

**Impact:** Dynamic event experience

---

## 📊 Feature Priority Matrix

### High Priority (Core Functionality)
1. RSVP Confirmation Email
2. Guest List Management
3. Enhanced Admin Dashboard
4. Dietary Restrictions Summary

### Medium Priority (Better Experience)
1. RSVP Edit/Update Feature
2. Image Gallery Section
3. Interactive Timeline
4. Enhanced Map Integration
5. Song Request Playlist
6. Menu Preview Section

### Low Priority (Polish)
1. Weather Widget
2. Social Media Integration
3. Print Styles
4. Keyboard Shortcuts
5. QR Code Generator

---

## 💭 Notes

- **Start Small:** Implement high-impact, low-effort features first
- **User Feedback:** Gather feedback from early users/guests
- **Iterate:** Don't try to implement everything at once
- **Test:** Test new features thoroughly before wedding
- **Backup:** Always backup data before major changes

---

**Last Updated:** 2026-02-02
**Next Review:** After initial guest feedback
