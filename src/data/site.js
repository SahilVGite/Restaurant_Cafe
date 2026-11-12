// Central brand & business info — edit here to re-skin the template for another restaurant.
export const site = {
  name: 'Aangan',
  tagline: 'Kitchen & Café',
  description:
    'A modern Indian kitchen and café in the heart of Kala Ghoda — regional recipes, seasonal produce and slow-brewed coffee, served with the warmth of a family courtyard.',
  established: 2014,
  phone: '+91 98200 41414',
  phoneHref: 'tel:+919820041414',
  email: 'hello@aangankitchen.in',
  emailHref: 'mailto:hello@aangankitchen.in',
  eventsEmail: 'events@aangankitchen.in',
  address: {
    line1: '14, Rampart Row, Kala Ghoda',
    line2: 'Fort, Mumbai 400001',
    full: '14, Rampart Row, Kala Ghoda, Fort, Mumbai 400001',
  },
  mapEmbed:
    'https://maps.google.com/maps?q=Rampart%20Row%2C%20Kala%20Ghoda%2C%20Fort%2C%20Mumbai&t=&z=16&ie=UTF8&iwloc=&output=embed',
  mapLink: 'https://maps.google.com/?q=Rampart+Row,+Kala+Ghoda,+Fort,+Mumbai',
  rating: { score: 4.8, count: '2,400+' },
  socials: [
    { name: 'Instagram', href: 'https://www.instagram.com/' },
    { name: 'Facebook', href: 'https://www.facebook.com/' },
    { name: 'YouTube', href: 'https://www.youtube.com/' },
  ],
}

export const navLinks = [
  { label: 'Home', to: '/' },
  { label: 'About', to: '/about' },
  { label: 'Menu', to: '/menu' },
  { label: 'Gallery', to: '/gallery' },
  { label: 'Contact', to: '/contact' },
]

// day: 0 = Sunday … 6 = Saturday. Times are 24h "HH:MM".
export const openingHours = [
  { label: 'Monday – Thursday', days: [1, 2, 3, 4], open: '08:00', close: '23:00' },
  { label: 'Friday – Saturday', days: [5, 6], open: '08:00', close: '23:59' },
  { label: 'Sunday', days: [0], open: '09:00', close: '23:00' },
]

export const hoursDisplay = [
  { label: 'Mon – Thu', value: '8:00 am – 11:00 pm' },
  { label: 'Fri – Sat', value: '8:00 am – Midnight' },
  { label: 'Sunday', value: '9:00 am – 11:00 pm' },
]

// Reservation seatings (table service). Café walk-ins are welcome all day.
export const reservationSlots = {
  Lunch: ['12:00', '12:30', '13:00', '13:30', '14:00', '14:30', '15:00'],
  Dinner: ['19:00', '19:30', '20:00', '20:30', '21:00', '21:30', '22:00'],
}
