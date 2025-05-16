import type { Publication, Work } from '$lib/utils/interfaces'

export let publications = $state<Publication[]>([
  {
    title: 'A Theory of Scientific Programming Efficacy',
    authors: ['Elizaveta Pertseva', 'Melinda Chang', 'Ulia Zaman', 'Michael Coblenz'],
    venue: '2024 International Conference on Software Engineering',
    links: [
      {
        type: 'doi',
        href: 'https://doi.org/10.1145/3597503.3639139',
        external: true,
      },
      {
        type: 'download pdf',
        href: 'https://cseweb.ucsd.edu/~mcoblenz/assets/pdf/Scientific_Computing__ICSE_2024.pdf',
        external: true,
      },
    ],
    categories: ['human-computer interaction', 'software engineering'],
  },
])

export let work_timeline = $state<Work[]>([
  {
    isFailure: false,
    date: '2025.04 - Now',
    title: 'Founder, Editor-in-Chief @ Critical Culture Undergraduate Journal',
    description: "Northwestern's premier undergraduate venue for critical writing.",
    categories: ['student org', 'cultural studies'],
  },
  {
    isFailure: false,
    date: '2025.04 - Now',
    title: 'Undergraduate Researcher @ UC Berkeley School of Information',
    description:
      'Advised by Prof. Tim Tangherlini (Dept. of Scandanavian Studies; Center for Cultural Analytics). Apprehending narrative in the Icelandic saga with literary-theoretical and computational methods.',
    categories: ['research', 'computational humanities'],
  },
  {
    isFailure: true,
    date: '2025.03',
    title: 'Rejected from every REU I applied for',
    description:
      "This was unfortunate, not the least because I thought I was a really good fit for my top choice. Also a blessing in disguise&mdash;I'm participating in a much more compelling and technically involved project than I would have otherwise.",
  },
  {
    isFailure: false,
    date: '2024.10 - Now',
    title: 'Director of Technology @ WildHacks',
    description:
      'Leading software development the largest intercollegiate hackathon in the Chicago area.',
    categories: ['student org'],
  },
  {
    isFailure: true,
    date: '2024.05',
    title: 'Worst grades of my life; almost rescinded from college',
    description:
      'Tell your teachers about your mental ailments and you will not end up in this situation! I now genuinely believe Northwestern will only rescind your offer if you burn down Ryan Field.',
  },
  {
    isFailure: false,
    date: '2023.06 - 2024.08',
    title: 'Student Researcher @ UCSD Programming Systems Group',
    description:
      "Advised by Prof. Michael Coblenz. Toward ergonomic programming languages and software processes for computational climate scientists (ICSE '24).",
    categories: ['research', 'software engineering'],
  },
  {
    isFailure: false,
    date: '2023.01 - 12',
    title: 'Founder, Director @ Hack the Wave',
    description:
      "San Diego County's biggest-ever hackathon run for high schoolers, by high schoolers.",
    categories: ['independent'],
  },
  {
    isFailure: false,
    date: '2022.08 - 2023.04',
    title: 'Built Albio.js, a compiler-powered reactivity library',
    description:
      'Lightweight JavaScript compiler to enable reactive web programming directly in markdown. Outperforms Virtual DOM-based frameworks like React, Vite in key benchmarks',
    categories: ['independent'],
  },
  {
    isFailure: false,
    date: '2022.07 - 08',
    title: 'Software Engineer Intern @ Hack Club',
    description: 'Building web tooling and interfaces for JavaScript-based game engine.',
    categories: ['internship', 'software engineering'],
  },
  {
    isFailure: false,
    date: '2022.06 - 09',
    title: 'Research Assistant @ UCSD Lab for Computational Astrophysics',
    description:
      'Advised by Prof. Michael Norman. Systems programming to support analysis of dark matter halos in early universe simulations.',
    categories: ['research', 'deep learning'],
  },
  {
    isFailure: true,
    date: '2022.04',
    title: 'Rejected from the only summer camp I ever applied to',
    description:
      "The only time anyone wants to read your awful bildungsroman autofiction instead of your resume is when you're filling out college applications. Who knew?",
  },
])
