export const siteConfig = {
  // Site info
  name: 'Imobiliare Strășeni',
  domain: 'straseni.vercel.app',
  description: 'Ghid imobiliar local pentru Strășeni și raion. Proprietăți verificate, evaluare orientativă, consultanță transparentă.',

  // Consultant info
  consultantName: 'Viorel',
  role: 'Consultant Imobiliar Local',

  // Contact details (empty by default - fill in as needed)
  phone: '',
  whatsapp: '',
  email: '',

  // Address (optional)
  address: '',
  city: 'Strășeni',
  region: 'Raionul Strășeni',
  country: 'Moldova',

  // Hours (optional)
  hours: {
    weekdays: '09:00 - 18:00',
    saturday: '10:00 - 16:00',
    sunday: 'Închis',
  },

  // Social links (empty by default)
  social: {
    facebook: '',
    instagram: '',
    whatsapp: '',
  },
};

export function getContactLink(type: 'phone' | 'whatsapp' | 'email') {
  switch (type) {
    case 'phone':
      return siteConfig.phone ? `tel:${siteConfig.phone}` : '#';
    case 'whatsapp':
      return siteConfig.whatsapp ? `https://wa.me/${siteConfig.whatsapp}` : '#';
    case 'email':
      return siteConfig.email ? `mailto:${siteConfig.email}` : '#';
    default:
      return '#';
  }
}
