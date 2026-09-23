// Approved September 2026 copy; see docs/design/website-copy.txt.

import { siteConfig } from './site'

export const heroCopy = {
  intro:
    'Text, email, voicemail, digital ads, mail, print, and video for Republican and conservative campaigns, bond issues, and recalls — statewide down to a single county, in Texas and all 50 states. Texas voter data is included.',
  messages: [
    {
      label: 'Sent to reliable primary voters',
      text: 'Election Day is Tuesday. Polls open 7 AM – 7 PM. Find your polling place and sample ballot: yourcandidate.com/vote  Reply STOP to end.',
    },
    {
      label: 'Sent to swing and low-turnout voters',
      text: "Hardeman County neighbors: your candidate for Agriculture Commissioner is holding a town hall Thursday at 6 PM at the community center. Hear his plan for water, property rights, and rural roads, and ask your questions in person. Can't make it? Watch his interview: yourcandidate.com/interview  Reply STOP to end.",
    },
  ],
} as const

export const services = [
  {
    title: 'Text messaging',
    icon: 'message',
    description:
      'Short reminders at 140 characters or the full case at 420. MMS for issues and bond elections; not recommended for candidates. No opt-in required; compliant opt-out on every send.',
    rate: 'From $0.0225 per message',
    featured: true,
  },
  {
    title: 'Email broadcasting',
    icon: 'mail',
    description:
      'Full-database sends to 8 million-plus Texas addresses, delivered through warmed IPs and dedicated sending domains.',
    rate: 'From $0.01 per email',
    featured: true,
  },
  {
    title: 'Ringless voicemail',
    icon: 'phone',
    description:
      'Your recorded message lands directly in voicemail without ringing the phone. No 10DLC registration needed.',
    rate: '$0.08 per voicemail under 30 seconds, plus a $150 setup fee',
    featured: false,
  },
  {
    title: 'Digital ads',
    icon: 'chart',
    description:
      'IP-targeted banner ads to matched voter households, plus social, Google Display, YouTube, and streaming TV.',
    rate: '$30 per 1,000 impressions',
    featured: false,
  },
  {
    title: 'Tele-town halls',
    icon: 'users',
    description:
      'Live interactive telephone events with Q&A, real-time polling, recording, and mobile invites — any size, from a county race to statewide.',
    rate: 'Contact for quote',
    featured: false,
  },
  {
    title: 'Voter data',
    icon: 'database',
    description:
      'Have your own texting platform or mail house? License the matched cells and emails for your universe alone.',
    rate: '$0.0175 per cell / $0.01 per email, one time',
    featured: false,
  },
] as const

export const textRates = [
  {
    label: '140 characters',
    rate: '$0.0225',
    use: 'Invitations, early-vote and Election Day reminders',
  },
  {
    label: '420 characters',
    rate: '$0.04',
    use: 'Making the case — events, interviews, the argument. Data included at any universe size.',
  },
  {
    label: 'MMS (image or video)',
    rate: '$0.07',
    use: 'Up to 1,800 characters plus an image or video. Good for bond issues and ballot measures; not recommended for candidates. Data included.',
  },
] as const

export const pricingCopy = {
  textNote:
    'Reliable voters get a couple of short reminders so they feel included. Swing voters get a sequence of longer messages inviting them to events and interviews.',
  mmsNote:
    "On MMS: it earns its keep when a single message has to carry a lot — a bond issue with dollar figures, a polling schedule, and a link all in one send. For a candidate, we don't recommend it. We don't believe in putting an ad on someone's phone; a plain text that reads like it came from a neighbor is why this works — we're effective because we do it differently.",
  emailNote:
    'Statewide sends include the data. Sending the whole database costs less than carving out a slice — non-voters ignore it, or occasionally register.',
  setup:
    "Email IPs, sending domains, and setup are included in your messaging price; allow 2 to 3 weeks to warm them. To text under the candidate's own name, allow 10 days for Campaign Verify and 10DLC registration and a compliance check of the campaign website — $150. Or, at no charge, we send through one of our own registered, compliant platforms.",
  data: "Statewide programs include the data, and the 420-character text and MMS include the data at any universe size. For 140-character texts to a county, district, recall, or bond-issue universe, there is a one-time data charge of $0.0175 per cell record, per campaign; for email to those universes, $0.01 per email record. Each covers unlimited sends to that record at the rates above. If you prefer to run it on your own platform, we'll deliver the matched file at the same rate, licensed to your campaign for this cycle. Outside Texas, the data charge applies at any size, statewide included, and state-specific compliance is quoted.",
} as const

export const creativeServices = [
  {
    title: 'Candidate website',
    image: 'website',
    description:
      'Full WordPress build — bio, issues, endorsements, events, donate and volunteer pages, sample ballot and polling-place links, mobile-ready. Built Campaign Verify and 10DLC compliant from day one, so the carriers let your texts through — something most web designers have never had to do. Hosting and updates quoted separately.',
    rate: 'From $3,500',
  },
  {
    title: 'Television & digital commercial',
    image: 'camera',
    description:
      'Scripted, shot, and edited 30-second spot delivered in broadcast and social formats. Studio at 1000 S. Jefferson; location shoots quoted.',
    rate: 'From $3,500',
  },
  {
    title: 'Candidate interview',
    image: 'interview',
    description:
      'Recorded in our studio and delivered as a link for your 420-character texts and emails.',
    rate: 'Free with any messaging program',
  },
] as const

export const creativeCopy = {
  print:
    'Direct mail designed, printed, and mailed to the same voter universe as your texts and emails — one list, every channel. Push cards, door hangers, and event materials designed here and printed to your quantity. Yard signs and banners from our sign supplier. All quoted per project; allow 10 business days from approved artwork.',
  writing:
    "Every text and email is written by Patriot Messaging and sent in the candidate's name — an invitation from a neighbor, not an ad. That is why it gets read.",
  bundle:
    "Every messaging program includes the candidate interview, and rotation ads on TheCountyPost.com and PatriotsInAction.com run at half the published rate for the length of the program — in every county where you're on the ballot, and in every county for statewide candidates and issues. One vendor, one invoice: the message, the video it links to, and the sites where your voters already read local news.",
} as const

export const steps = [
  {
    title: 'Scope',
    text: 'Tell us the race, the universe, and the date it needs to land. You get a plan and an invoice.',
  },
  {
    title: 'Fund',
    text: "Funds come in before the build. Email needs 2 to 3 weeks of lead time to warm the IPs and domains; texting in the candidate's own name needs 10 days for carrier registration.",
  },
  {
    title: 'Build',
    text: 'Data is matched, sending domains and IPs are warmed, messages are written and approved.',
  },
  {
    title: 'Fire',
    text: 'Everything is staged and ready, so it goes out at exactly the right moment — not a day late.',
  },
] as const

/**
 * Closing paragraph of the about section, split so the sister operations and
 * the book can carry links. A segment with an empty or missing `href` renders
 * as plain text.
 */
const aboutClosing: readonly { text: string; href?: string }[] = [
  { text: 'Dan is a Texas Panhandle cattleman and the author of ' },
  { text: 'Operation Show-Up', href: siteConfig.links.operationShowUp },
  {
    text: '. Patriot Messaging works out of a restored historic building in downtown Amarillo that also houses ',
  },
  { text: 'GOPConnect', href: siteConfig.links.gopConnect },
  { text: ', ' },
  { text: 'Patriots in Action', href: siteConfig.links.patriotsInAction },
  { text: ', ' },
  { text: 'MyLocalGOP', href: siteConfig.links.myLocalGop },
  { text: ', ' },
  { text: 'The County Post', href: siteConfig.links.theCountyPost },
  { text: ', and ' },
  { text: 'The Ballot Box', href: siteConfig.links.theBallotBox },
  {
    text: '—so the people writing your messages talk to voters every day, from all over the country.',
  },
]

export const aboutCopy = {
  intro:
    "In 2018, Dan Rogers looked at the Cruz race and didn't like what he saw coming in West Texas. So he worked out how to talk to voters by text and email in a way that got them to show up — and his home county moved 44 points toward Republicans in a year when almost every other county in Texas moved the other way.",
  pullQuote: {
    text: 'Messaging is my sport.',
    attribution: 'Dan Rogers',
  },
  /** Each entry renders as "<year> — <race>. <text>" */
  record: [
    {
      year: '2020',
      race: 'Congressional runoff',
      text: "Ronny Jackson came out of the primary at 19 percent, twenty points behind the retiring incumbent's hand-picked successor, with no campaign on the ground. A text-and-email program with a recorded interview turned the runoff, and Jackson won going away.",
    },
    {
      year: '2020',
      race: 'Oklahoma City',
      text: 'Called in by the Oklahoma County GOP chair three days before the election, with the Republican down five in the congressional race. Pulled the data that night, built the program, and sent it county-wide. Republicans won up and down the ballot, and the congressional seat the consultants had written off flipped.',
    },
    {
      year: '2022',
      race: 'County commissioner',
      text: 'A Potter County commissioner precinct that had been solidly Democrat for years went red.',
    },
    {
      year: '2024',
      race: 'Statewide judicial primary',
      text: 'First full-database Texas email sent the week before the Court of Criminal Appeals vote, with a recorded interview with each challenger. All three unseated long-time incumbents.',
    },
    {
      year: '2026',
      race: 'County court runoff',
      text: 'Same program, plus ringless voicemail, for a Randall County Court at Law candidate who came out of the primary more than twenty points behind. He won handily.',
    },
  ],
  closing: aboutClosing,
} as const

export const quoteOptions = [
  'Text messaging',
  'Email',
  'Ringless voicemail',
  'Digital ads',
  'Tele-town hall',
  'Voter data',
  'Not sure — recommend a program',
] as const
