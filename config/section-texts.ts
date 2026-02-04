/**
 * Section Text Configuration
 * All text content for sections in a structured format
 * This makes it easy to update text without touching component code
 * 
 * To update texts, edit the sectionTexts object below
 */

export interface SectionTexts {
  hero: {
    mainHeading: string
    introText: string
  }
  countdown: {
    title: string
  }
  story: {
    title: string
  }
  'wedding-details': {
    title: string
    date: {
      label: string
    }
    time: {
      label: string
    }
    location: {
      label: string
    }
  }
  ceremony: {
    title: string
    date: {
      label: string
    }
    time: {
      label: string
    }
    location: {
      label: string
    }
  }
  address: {
    title: string
    openInMaps: string
  }
  'dinner-party': {
    title: string
  }
  'dress-code': {
    title: string
  }
  'good-to-know': {
    title: string
    items: {
      dressCode: { title: string; icon: string }
      children: { title: string; icon: string }
      hotels: { title: string; icon: string }
      transport: { title: string; icon: string }
      parking: { title: string; icon: string }
      gifts: { title: string; icon: string }
    }
  }
  toastmaster: {
    title: string
  }
  rsvp: {
    title: string
    description: string
    form: {
      ariaLabel: string
      participating: {
        label: string
        yesLabel: string
        noLabel: string
      }
      guestCount: {
        label: string
      }
      email: {
        label: string
        placeholder: string
        helpText: string
      }
      person: {
        label: string
        firstName: {
          label: string
          placeholder: string
        }
        lastName: {
          label: string
          placeholder: string
        }
        allergies: {
          label: string
          placeholder: string
        }
        bus: {
          label: string
        }
        songRequest: {
          label: string
          placeholder: string
        }
      }
      submit: {
        label: string
        loading: string
      }
      success: {
        message: string
      }
    }
  }
  footer: {
    withLove: string
    copyright: string
  }
  success: {
    heading: string
  }
  ui: {
    contactLink: {
      phone: string
      email: string
    }
    errorBoundary: {
      heading: string
      message: string
      reloadButton: string
      technicalInfo: string
    }
  }
}

export const sectionTexts: SectionTexts = {
  hero: {
    mainHeading: 'Vi gifter oss!',
    introText: 'Vi ser fram emot att dela denna speciella dag med dig',
  },
  countdown: {
    title: 'Countdown',
  },
  story: {
    title: 'Vår berättelse',
  },
  'wedding-details': {
    title: 'Bröllopsdetaljer',
    date: {
      label: 'Datum',
    },
    time: {
      label: 'Tid',
    },
    location: {
      label: 'Plats',
    },
  },
  ceremony: {
    title: 'Vigsel',
    date: {
      label: 'Datum',
    },
    time: {
      label: 'Tid',
    },
    location: {
      label: 'Plats',
    },
  },
  address: {
    title: 'Adress',
    openInMaps: 'Öppna i Google Maps',
  },
  'dinner-party': {
    title: 'Middag och fest',
  },
  'dress-code': {
    title: 'Klädkod',
  },
  'good-to-know': {
    title: 'Bra att veta',
    items: {
      dressCode: { title: 'Klädkod', icon: '👔' },
      children: { title: 'Barn', icon: '👶' },
      hotels: { title: 'Hotell', icon: '🏨' },
      transport: { title: 'Transport / buss', icon: '🚌' },
      parking: { title: 'Parkering Wallsjö Gård', icon: '🅿️' },
      gifts: { title: 'Gåvor', icon: '🎁' },
    },
  },
  toastmaster: {
    title: 'Toastmaster & Toastmadame',
  },
  success: {
    heading: 'Tack för ditt svar!',
  },
  rsvp: {
    title: 'RSVP',
    description: 'Vänligen bekräfta din närvaro {deadline}. Vi ser fram emot att höra från dig!',
    form: {
      ariaLabel: 'RSVP formulär',
      participating: {
        label: 'Kommer ni att delta?',
        yesLabel: 'Ja, jag kommer',
        noLabel: 'Nej, jag kan tyvärr inte',
      },
      guestCount: {
        label: 'Antal personer',
      },
      email: {
        label: 'E-postadress (för bekräftelse)',
        placeholder: 'din@epost.se',
        helpText: 'Vi skickar en bekräftelse till denna e-postadress när din RSVP är mottagen.',
      },
      person: {
        label: 'Person {number}',
        firstName: {
          label: 'Förnamn',
          placeholder: 'Förnamn',
        },
        lastName: {
          label: 'Efternamn',
          placeholder: 'Efternamn',
        },
        allergies: {
          label: 'Allergier',
          placeholder: 'T.ex. nötter, gluten...',
        },
        bus: {
          label: 'Jag vill åka med buss',
        },
        songRequest: {
          label: 'Om denna låt spelas på festen kan jag inte sitta stilla',
          placeholder: 'Artist - Låtnamn',
        },
      },
      submit: {
        label: 'Skicka RSVP',
        loading: 'Skickar...',
      },
      success: {
        message: 'Vi har mottagit din RSVP och ser fram emot att fira med dig!',
      },
    },
  },
  footer: {
    withLove: 'Med kärlek och glädje',
    copyright: '© {year} Bröllop. Alla rättigheter förbehållna.',
  },
  ui: {
    contactLink: {
      phone: 'Ring {value}',
      email: 'Skicka e-post till {value}',
    },
    errorBoundary: {
      heading: 'Något gick fel',
      message: 'Vi beklagar, men något oväntat hände. Vänligen ladda om sidan.',
      reloadButton: 'Ladda om sidan',
      technicalInfo: 'Teknisk information',
    },
  },
}

/**
 * Helper function to replace placeholders in text
 */
export function formatSectionText(text: string, replacements: Record<string, string>): string {
  let formatted = text
  for (const [key, value] of Object.entries(replacements)) {
    formatted = formatted.replace(`{${key}}`, value)
  }
  return formatted
}

/**
 * Get text for a specific section
 */
export function getSectionText(sectionId: keyof SectionTexts): SectionTexts[keyof SectionTexts] {
  return sectionTexts[sectionId]
}
