import { asset } from "../lib/asset";

/* ==========================================================================
   FULCRUM, single source of truth for site content.
   Edit this file to change copy anywhere on the site. No JSX required.

   Every figure in `stats` below is a fact that can be checked against
   Fulcrum's own records, partner count, program count, seminars delivered.
   If you add impact numbers (mentees supported, students reached), put the
   real figure here; don't estimate. Set `stats.show = false` to hide the
   band entirely.
   ========================================================================== */

export const org = {
  name: "Fulcrum",
  legalName: "Fulcrum",
  tagline: "A place to learn, a chance to grow.",
  hero: "We help individuals from under-resourced regions learn AI.",
  shortDescription:
    "Fulcrum supports individuals through global mentorship and free learning resources, bridging the gap between rural communities and artificial intelligence education.",
  founded: "2025",
  location: "Kathmandu, Nepal",
  type: "Volunteer-run non-profit",

  /* Canonical home of the site. Everything SEO-related, canonical tags,
     Open Graph URLs, sitemap.xml, JSON-LD, is derived from this one value,
     so changing it here is enough to move the whole site.
     If you later point a custom domain at GitHub Pages, set this to that
     domain and add a `public/CNAME` file containing the bare hostname. */
  url: "https://fulcrumgo.github.io",
  domain: "fulcrumgo.github.io",
};

/* --------------------------------------------------------------------------
   Contact.

   Deliberately no email address anywhere. Every mailbox Fulcrum had lived on
   a domain that is being given up, so the site routes contact through
   channels the organisation actually controls: Discord for applications and
   day-to-day conversation, LinkedIn for formal or institutional enquiries.
   If a mailbox exists again later, add it here and reintroduce it in one
   place rather than scattering mailto: links back through the pages.
   -------------------------------------------------------------------------- */
export const contact = {
  linkedin: "https://www.linkedin.com/company/gofulcrum/",
  instagram: "https://www.instagram.com/gofulcrum/",
  discord: "https://discord.gg/gbQCGkupdJ",
  discordQr: asset("/images/OurFooter/QR.png"),

  /* Human-readable labels, so pages describe the route consistently. */
  applyLabel: "Apply on Discord",
  enquiryLabel: "Message us on LinkedIn",
};

/* --------------------------------------------------------------------------
   Impact band (Aspire-style). Set `show: false` to hide the whole section.
   -------------------------------------------------------------------------- */
export const stats = {
  show: true,
  period: `${org.founded} to present`,
  items: [
    {
      value: "200+",
      label: "students reached across rural Nepal and the Indian subcontinent",
    },
    { value: "5", label: "programs, every one of them free" },
    { value: "9", label: "free guides and decks, published openly" },
    { value: "100%", label: "volunteer-run, non-profit, no tuition ever" },
  ],
};

/* --------------------------------------------------------------------------
   The three ideas behind the name. A fulcrum is the fixed point that lets a
   small force move a large weight, the leverage metaphor is the whole thesis.
   -------------------------------------------------------------------------- */
export const pillars = [
  {
    title: "Pivot for Change",
    body: "Fulcrum serves as the catalyst empowering transformation in under-resourced regions.",
  },
  {
    title: "Unlocking Potential",
    body: "We help individuals discover and develop their untapped abilities through guidance and opportunity.",
  },
  {
    title: "Tools & Mentorship",
    body: "Providing essential AI tools, education, and mentorship to shape the innovators of tomorrow.",
  },
];

/* --------------------------------------------------------------------------
   Programs, the five things Fulcrum actually does.
   -------------------------------------------------------------------------- */
export const programs = [
  {
    slug: "mentorship",
    title: "Mentorship Program",
    summary:
      "One-on-one and group mentorship with working researchers and industry professionals.",
    body: "Every mentee is paired with someone who has already walked the path they are on: a graduate researcher, an engineer, a professor. Mentorship runs in cycles, mixing private one-on-one sessions with small group cohorts so that mentees learn from each other as much as from us.",
    image: asset("/images/Support/Mentorship.png"),
    points: [
      "Matched one-on-one with a mentor in your area of interest",
      "Small-group cohort sessions alongside other mentees",
      "Goal-setting and honest, specific feedback",
      "Continues as long as it is useful, no fixed cut-off",
    ],
  },
  {
    slug: "research",
    title: "Research & Publication Support",
    summary:
      "Guidance in writing, submitting, and publishing academic papers in AI, plus real-world research projects.",
    body: "Publishing as an undergraduate from an under-resourced institution is difficult less because of ability than because of access: to supervision, to reviewers, to the unwritten rules. We supply that missing layer: framing a question, structuring a paper, choosing a venue, surviving peer review, and collaborating on live research.",
    image: asset("/images/Support/Research.png"),
    points: [
      "Shaping a research question that a journal will take seriously",
      "Structure, methodology, and academic writing review",
      "Choosing the right venue and preparing the submission",
      "Working through peer review and revisions",
      "Collaboration on live research projects",
    ],
  },
  {
    slug: "projects",
    title: "Project Building in AI",
    summary:
      "Hands-on support for impactful AI projects, from ideation through to deployment.",
    body: "Reading about machine learning and shipping something that works are different skills. We sit with mentees through the whole arc: scoping an idea that matters, choosing an approach, training and evaluating honestly, and getting it in front of real users.",
    image: asset("/images/Support/Project.png"),
    points: [
      "Scoping a project worth building",
      "Model development, training, and honest evaluation",
      "Code review from practising engineers",
      "Deployment, documentation, and portfolio presentation",
    ],
  },
  {
    slug: "workshops",
    title: "Tech Workshops",
    summary:
      "Introductory and intermediate live sessions on AI, machine learning, quantum computing, and more.",
    body: "Free live workshops, taught by people doing the work. Sessions are recorded and released openly, so a bad internet connection on a Tuesday never costs anyone the material.",
    image: asset("/images/Support/Tech.png"),
    points: [
      "Foundations of machine learning and deep learning",
      "Practical tooling: Python, PyTorch, experiment tracking",
      "Specialist topics including quantum computing and computer vision",
      "Recorded and released free, permanently",
    ],
  },
  {
    slug: "speakers",
    title: "Guest Speaker Series",
    summary:
      "Talks and Q&A sessions with leaders from academia and industry.",
    body: "We bring in researchers and practitioners from around the world for talks and unfiltered Q&A. The point is not only the content. It is proximity. Seeing that the people at the frontier are reachable changes what a student believes is possible.",
    image: asset("/images/Support/Guest.png"),
    points: [
      "Talks from researchers and practitioners worldwide",
      "Open Q&A, not a lecture broadcast",
      "Career and graduate-study guidance",
      "Free and open to the whole community",
    ],
  },
];

/* --------------------------------------------------------------------------
   Field work, seminars and workshops actually delivered.
   Every entry below is drawn from Fulcrum's own decks and event photos.
   Add new ones here and they appear on the home page and the About page.
   -------------------------------------------------------------------------- */
/* `dateISO` is what turns an entry into EducationEvent structured data.
   Entries without one still render on the site but are left out of the
   structured data rather than being given an invented date, add the real
   date and they join automatically. */
export const seminars = [
  {
    title: "Free AI training for grades 9 and 10",
    host: "Shree Pardi Secondary School",
    place: "Pokhara-17, Pardi, Kaski, Nepal",
    date: "27 May 2026",
    dateISO: "2026-05-27",
    summary:
      "A full session for school students on using AI as a study tool rather than a shortcut, covering Wolfram Alpha for maths and science, and the honest question the students themselves keep asking: “Why use AI to study? Doesn't it make us dumb?”",
    topics: [
      "Using AI to explain difficult topics in simple ways",
      "Wolfram Alpha for maths and science",
      "Where AI weakens independent and critical thinking",
      "The key balance: learn with AI, don't let AI learn for you",
    ],
  },
  {
    title: "AI Basics, a two-day workshop",
    host: "Leafclutch Technologies Pvt. Ltd.",
    place: "Nepal",
    date: "March 2026",
    dateISO: "2026-03-24",
    summary:
      "Two days from first principles to practice: why AI broke open in the 2020s, how models actually learn, and what a career and a research pipeline in the field really look like.",
    topics: [
      "Foundations: from the Turing test to generative AI",
      "Mechanics of learning: linear regression to neural networks",
      "The generative leap: attention, transformers, and LLMs",
      "How images become numbers: computer vision basics",
      "Automating everyday tasks with simple Python",
      "AI careers, role responsibilities, and how research gets done",
    ],
  },
  {
    title: "How to Publish Research as an Undergraduate",
    host: "Fulcrum open webinar",
    place: "Online",
    date: "", // TODO: exact date, the post reads "8 months ago" as of Aug 2026
    attendance: "55+ students, promoted by word of mouth alone",
    summary:
      "Our first open session, and the one that showed us how much unmet demand there was. Most participants rated their familiarity with academic publishing at 1 or 2 out of 5 beforehand; an hour later that had shifted sharply. Health professionals, including nurses, joined alongside engineering and science undergraduates.",
    topics: [
      "Finding a research question worth asking as an undergraduate",
      "Structuring a paper a journal will take seriously",
      "Choosing a venue and preparing a submission",
      "Surviving peer review and revisions",
      "Where AI genuinely helps in medicine and clinical research",
    ],
    /* Institutions named in Fulcrum's own post about the session. */
    institutions: [
      "ACU Australia",
      "Kaplan Business School Perth",
      "Pokhara University",
      "Tribhuvan University",
      "LaGrange International College",
      "IIT Indore",
      "Vellore Institute of Technology",
    ],
    link: {
      url: "https://www.linkedin.com/posts/gofulcrum_undergraduateresearch-academicpublishing-activity-7404780736089796608-3Ho4",
      label: "Read the post on LinkedIn",
    },
  },
  {
    title: "Publishing research during an engineering degree",
    host: "Engineering college session",
    place: "Nepal",
    date: "", // TODO: add the real date to include this in structured data
    attendance: "100+ students",
    summary:
      "A session for undergraduates who want a publication before they graduate: how to find a question worth asking, what reviewers actually look for, and how to get through submission without a supervisor holding your hand.",
    topics: [
      "Finding a research question as an undergraduate",
      "Structuring a paper a journal will take seriously",
      "Choosing a venue and preparing a submission",
      "Surviving peer review and revisions",
    ],
  },
];

/* --------------------------------------------------------------------------
   Photographs from the field.

   These are Fulcrum's own photos, taken at the sessions and already published
   on the organisation's LinkedIn. Optimised copies live in
   public/images/impact/.
   -------------------------------------------------------------------------- */
export const impactPhotos = [
  {
    src: asset("/images/impact/pardi-classroom.jpg"),
    alt: "Wide view of the classroom at Shree Pardi Secondary School during the AI session, students at desks facing a projected slide",
    caption: "Grades 9 and 10, Shree Pardi Secondary School.",
    span: "wide",
  },
  {
    src: asset("/images/impact/pardi-teaching-wolfram.jpg"),
    alt: "Teaching Wolfram Alpha for maths and science to students, with a projector showing the tool",
    caption:
      "Wolfram Alpha for maths and science, a tool that calculates rather than predicts.",
  },
  {
    src: asset("/images/impact/pardi-teaching-wide.jpg"),
    alt: "Students watching a projected slide explaining how Wolfram Alpha works",
    caption: "“How does this actually work?” is the question that runs the session.",
  },
  {
    src: asset("/images/impact/pardi-students.jpg"),
    alt: "Students outside the Shree Pardi Secondary School building after the session",
    caption: "Outside afterwards, Pokhara-17, Pardi, Kaski.",
    span: "wide",
  },
];

/* The school posted about the session themselves. Quoted with attribution,
   with a translation of the Nepali original. */
export const schoolPost = {
  image: asset("/images/impact/pardi-school-post.jpg"),
  source: "Shree Pardi Secondary School",
  platform: "Facebook",
  date: "27 May 2026",

  /* The school's page. Facebook does not expose post permalinks to
     unauthenticated visitors, so this links to the page rather than the
     individual post, paste the post's own permalink here if you have it and
     the screenshot will deep-link to it instead. */
  url: "https://www.facebook.com/padi.mabi/",
  translation:
    "Having studied computer engineering on a full scholarship at Vellore Institute of Technology in India, and now giving free AI training at school level in Nepal, he provided training to the students of grades 9 and 10 at our school. He is currently studying at master's level in Australia on a scholarship., Er. Utsav Poudel (AI Engineer)",
  note: "Posted by the school, in Nepali. Translation ours.",
};

/* Organisations we have delivered sessions with. */
export const collaborators = [
  {
    name: "Leafclutch Technologies Pvt. Ltd.",
    what: "Software services and AI solutions",
    place: "Bhairahawa and Butwal, Lumbini, Nepal",
    site: "https://www.leafclutchtech.com.np/",
    contribution:
      "Hosted and organised the two-day AI Basics workshop, and brought the room together. Their training and internship programmes cover AI, web development, cybersecurity, UI/UX and data science.",
  },
  {
    name: "Shree Pardi Secondary School",
    what: "Government secondary school",
    place: "Pokhara-17, Pardi, Kaski, Nepal",
    contribution:
      "Opened their classrooms to grades 9 and 10 for a free AI session, and posted about it publicly afterwards.",
  },
];

/* Guest speakers who have run sessions or Q&As for the community.
   Affiliations here are each speaker's own, not Fulcrum's. */
export const speakers = [
  {
    name: "Anuj Nepal",
    role: "Deakin Cyber Research & Innovation Centre",
    org: "Deakin University, Australia",
    // Wording supplied verbatim by the speaker.
    topics: "Cybersecurity Secure, Data Provenance, IOT, Quantum Cryptography",
    scholar: "https://scholar.google.com/citations?user=BQGqr0oAAAAJ&hl=en",
  },
  {
    name: "Subramaniyaswamy Vairavan",
    role: "Professor, School of Computer Science and Engineering",
    org: "Vellore Institute of Technology",
    topics: "Data science, large language models, artificial intelligence",
    scholar: "https://scholar.google.com/citations?user=bIUUDOYAAAAJ&hl=en",
  },
];


/* --------------------------------------------------------------------------
   Founder. Facts below are drawn from the public Google Scholar profile
   and personal site.
   -------------------------------------------------------------------------- */
export const founder = {
  name: "Utsav Poudel",
  role: "Founder",
  tagline: "Transferring ideas into programs.",
  affiliations: [
    "Visiting Researcher, Deakin University",
    "Research Affiliate, Monash University",
    "Peer reviewer, journals in medicine and health sciences",
    "B.Tech, VIT University",
  ],
  interests: [
    "Human-Centered AI",
    "Spatial Computing",
    "Quantum Machine Learning",
    "Computational Neuroscience",
  ],
  quote:
    "Computer intelligence is the only invention mankind will ever need to build. Shouldn't everyone get a fair chance to understand, use, and create it, including those from underserved regions?",
  bio: "Utsav Poudel founded Fulcrum after seeing the same pattern repeat: capable students from under-resourced institutions held back not by ability but by access to supervision, to reviewers, to the people already inside the field. His own research spans human-centered AI and spatial computing, with published work on AI in mental health, OCR systems, and post-quantum secure e-voting.",
  links: {
    website: "https://utsavpoudel.com.np/",
    scholar: "https://scholar.google.com/citations?user=BEfjz2gAAAAJ&hl=en",
  },
  publications: [
    {
      title:
        "AI in mental health: a review of technological advancements and ethical issues in psychiatry",
      venue: "Issues in Mental Health Nursing",
      year: "2025",
    },
    {
      title:
        "Applicability of OCR engines for text recognition in vehicle number plates, receipts and handwriting",
      venue: "Journal of Circuits, Systems and Computers",
      year: "2023",
    },
  ],

  /* Filed patent applications. Listed separately from publications because
     they are a different kind of output and are still applications, not
     granted patents. */
  patents: [
    {
      title:
        "System for Adaptive Graph Construction and Temporal Pattern Analysis in Interactive Health Monitoring",
      authors: "U Poudel, S Vairavan",
      number: "IN Patent App. 202,641,012,308",
      year: "2026",
    },
    {
      title:
        "A Secure Electronic Voting System and Method for Post-Quantum Biometric E-Voting",
      authors: "A Poudel, U Poudel, S Vairavan",
      number: "IN Patent App. 202,541,132,779",
      year: "2026",
    },
  ],
};

/* --------------------------------------------------------------------------
   What a mentorship application needs.
   -------------------------------------------------------------------------- */
export const applicationRequirements = [
  {
    title: "CV or résumé",
    body: "Whatever you have. It does not need to be long or polished.",
  },
  {
    title: "Your regional background",
    body: "Tell us where you are from and what access to AI education looks like there.",
  },
  {
    title: "AI research interests",
    body: "What you want to work on, and why that question interests you.",
  },
  {
    title: "What you expect from mentorship",
    body: "Your goals, your experience so far, and the specific obstacles in your way.",
  },
];

/* Mentorship FAQ. Also emitted as FAQPage structured data, which is what
   makes these eligible to appear as expandable answers in Google results,
   so keep the answers self-contained and factual. */
export const faqs = [
  {
    q: "What does “under-resourced region” actually mean?",
    a: "We are not enforcing a list of approved countries. If your access to AI education, supervision, equipment, or research networks is materially limited by where you are or what you can afford, that is what we mean. Tell us your situation honestly and let us judge.",
  },
  {
    q: "Do I need to already know machine learning?",
    a: "No. We take people at the beginning and people well into a research project. What matters is that you are specific about where you actually are, so we can match you sensibly.",
  },
  {
    q: "Does it cost anything?",
    a: "No. Not now and not later. Fulcrum is a volunteer-run non-profit and every program is free.",
  },
  {
    q: "Do I need to be enrolled at a university?",
    a: "No. Most of our mentees are students, but that is not a requirement.",
  },
  {
    q: "How long does mentorship last?",
    a: "There is no fixed term. It continues as long as it is genuinely useful to you and sustainable for your mentor.",
  },
  {
    q: "What language do you work in?",
    a: "English, for now. That is what our mentor pool has in common.",
  },
];

export const mentorRequirements = [
  "Say you would like to join as a mentor or guest speaker",
  "A brief summary of your AI background",
  "Your availability and areas of interest",
  "A link to your professional profile (LinkedIn, website, or Scholar)",
];

/* --------------------------------------------------------------------------
   Ways to get involved (Aspire's "Get Involved" pattern).
   -------------------------------------------------------------------------- */
export const involvement = [
  {
    title: "Become a Mentor",
    body: "Share your AI expertise with the next generation. Whether you are a researcher, a practitioner, or an educator, your knowledge matters.",
    cta: "Message us on LinkedIn",
    href: contact.linkedin,
  },
  {
    title: "Give a Talk",
    body: "Run a workshop or a guest lecture for our community. One hour of your time reaches students who would otherwise never get in the room.",
    cta: "Propose a session",
    href: contact.discord,
  },
  {
    title: "Partner With Us",
    body: "Universities, labs, and organisations working on equity in technology. We would like to hear from you.",
    cta: "Start a conversation",
    href: contact.linkedin,
  },
];

/* --------------------------------------------------------------------------
   Downloadable learning materials.

   `courseDecks` is generated, run `npm run decks` after editing
   scripts/deck-content.mjs and it rewrites src/data/decks.json.
   `seminarDecks` are the slides from sessions we actually delivered.
   -------------------------------------------------------------------------- */
export const seminarDecks = [
  {
    slug: "ai-basics-day-1",
    title: "AI Basics, Day 1",
    subtitle:
      "Foundations and the big picture: why AI broke open in the 2020s, how models learn, transformers, and how images become numbers.",
    file: "materials/fulcrum-ai-basics-day1.pdf",
    context: "Delivered with Leafclutch Technologies Pvt. Ltd., March 2026",
  },
  {
    slug: "ai-basics-day-2",
    title: "AI Basics, Day 2",
    subtitle:
      "Skills, applications, careers and research: automating tasks with Python, the branches of AI, where it is applied, and how research actually gets done.",
    file: "materials/fulcrum-ai-basics-day2.pdf",
    context: "Delivered with Leafclutch Technologies Pvt. Ltd., March 2026",
  },
];

export const nav = [
  { label: "About", to: "/about" },
  { label: "Programs", to: "/programs" },
  { label: "Impact", to: "/impact" },
  { label: "Resources", to: "/resources" },
  { label: "Mentorship", to: "/mentorship" },
  { label: "Get Involved", to: "/get-involved" },
  { label: "Contact", to: "/contact" },
];
