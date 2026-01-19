import RSVPForm from '@/components/RSVPForm'
import { weddingConfig } from '@/config/wedding'

export default function Home() {
  const { date, ceremony, location, rsvpDeadline } = weddingConfig
  return (
    <main className="min-h-screen bg-gradient-to-b from-pink-50 via-white to-pink-50">
      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center justify-center bg-gradient-to-br from-pink-100 via-rose-50 to-pink-100 overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-10 w-72 h-72 bg-pink-300 rounded-full mix-blend-multiply filter blur-xl animate-blob"></div>
          <div className="absolute top-40 right-10 w-72 h-72 bg-rose-300 rounded-full mix-blend-multiply filter blur-xl animate-blob animation-delay-2000"></div>
          <div className="absolute -bottom-8 left-1/2 w-72 h-72 bg-pink-200 rounded-full mix-blend-multiply filter blur-xl animate-blob animation-delay-4000"></div>
        </div>
        
        <div className="relative z-10 text-center px-4 py-20">
          <div className="mb-6">
            <h1 className="text-6xl md:text-8xl font-serif font-bold text-gray-800 mb-4 tracking-tight">
              Vi gifter oss!
            </h1>
            <div className="flex items-center justify-center gap-4 mb-6">
              <div className="h-px w-16 bg-pink-400"></div>
              <span className="text-2xl md:text-3xl font-light text-gray-700 italic">
                {date.year}
              </span>
              <div className="h-px w-16 bg-pink-400"></div>
            </div>
          </div>
          <p className="text-xl md:text-2xl text-gray-600 font-light max-w-2xl mx-auto">
            Vi ser fram emot att dela denna speciella dag med dig
          </p>
        </div>
      </section>

      {/* Wedding Details Section */}
      <section className="py-20 px-4 bg-white">
        <div className="container mx-auto max-w-4xl">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-serif font-bold text-gray-800 mb-4">
              Bröllopsdetaljer
            </h2>
            <div className="h-1 w-24 bg-pink-400 mx-auto"></div>
          </div>

          <div className="grid md:grid-cols-3 gap-12 text-center">
            {/* Date */}
            <div className="space-y-4">
              <div className="w-16 h-16 bg-pink-100 rounded-full flex items-center justify-center mx-auto">
                <svg className="w-8 h-8 text-pink-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-800">Datum</h3>
              <p className="text-gray-600">{date.day}</p>
              <p className="text-2xl font-bold text-pink-600">{date.fullDate}</p>
            </div>

            {/* Time */}
            <div className="space-y-4">
              <div className="w-16 h-16 bg-pink-100 rounded-full flex items-center justify-center mx-auto">
                <svg className="w-8 h-8 text-pink-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-800">Tid</h3>
              <p className="text-gray-600">{ceremony.description}</p>
              <p className="text-2xl font-bold text-pink-600">{ceremony.time}</p>
            </div>

            {/* Location */}
            <div className="space-y-4">
              <div className="w-16 h-16 bg-pink-100 rounded-full flex items-center justify-center mx-auto">
                <svg className="w-8 h-8 text-pink-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-800">Plats</h3>
              <p className="text-gray-600">{location.name}</p>
              <p className="text-lg font-medium text-pink-600">{location.address}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-20 px-4 bg-gradient-to-b from-white to-pink-50">
        <div className="container mx-auto max-w-4xl">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-serif font-bold text-gray-800 mb-4">
              Vår berättelse
            </h2>
            <div className="h-1 w-24 bg-pink-400 mx-auto mb-8"></div>
          </div>
          
          <div className="prose prose-lg max-w-none text-center">
            <p className="text-lg md:text-xl text-gray-700 leading-relaxed mb-6">
              Efter många år tillsammans är det äntligen dags att fira vår kärlek
              och ta nästa steg i vår resa. Vi ser fram emot att dela denna
              speciella dag med våra nära och kära.
            </p>
            <p className="text-lg md:text-xl text-gray-700 leading-relaxed">
              Ditt närvaro skulle göra vår dag ännu mer oförglömlig.
            </p>
          </div>
        </div>
      </section>

      {/* RSVP Section */}
      <section id="rsvp" className="py-20 px-4 bg-white">
        <div className="container mx-auto max-w-4xl">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-serif font-bold text-gray-800 mb-4">
              RSVP
            </h2>
            <div className="h-1 w-24 bg-pink-400 mx-auto mb-4"></div>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Vänligen bekräfta din närvaro {rsvpDeadline.toLowerCase()}. 
              Vi ser fram emot att höra från dig!
            </p>
          </div>
          
          <div className="mt-12">
            <RSVPForm />
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-12 px-4">
        <div className="container mx-auto max-w-4xl text-center">
          <p className="text-gray-400 mb-4">
            Med kärlek och glädje
          </p>
          <p className="text-sm text-gray-500">
            © {date.year} Bröllop. Alla rättigheter förbehållna.
          </p>
        </div>
      </footer>
    </main>
  );
}
