import type { Publication, Work } from '$lib/utils/interfaces'
import type { Track } from '@spotify/web-api-ts-sdk'

export let userState = $state<{
  playback_state: Track | undefined
  publications: Publication[]
  work_timeline: Work[]
}>({
  playback_state: undefined,
  publications: [
    {
      title: 'A Theory of Scientific Programming Efficacy',
      authors: [
        'Elizaveta Pertseva',
        'Melinda Chang',
        'Ulia Zaman',
        'Michael Coblenz',
      ],
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
      tags: ['human-computer interaction', 'software engineering'],
    },
  ],
  work_timeline: [
    {
      isFailure: true,
      date: '2025.05',
      title: 'Rejected from Weinberg Summer Research Grant',
      description:
        "I didn't have much hope for this particular grant, given that (a) they prioritize seniors and (b) you're supposed to apply for and be rejected from the Summer URG first. That I ended up in a position where I had to apply in the first place might be the bigger failure.",
      tags: ['research'],
    },
    {
      isFailure: false,
      date: '2025.05 - Now',
      title: 'Staff Writer @ Responsible AI Student Organization',
      description:
        'On current events in artificial intelligence ethics, tech policy, and computing culture.',
      tags: ['student org', 'ai ethics'],
    },
    {
      isFailure: true,
      date: '2025.05',
      title: 'Rejected from Block Museum Student Associate program',
      description: "Don't sleep through your interview timeslot...",
      tags: ['job'],
    },
    // {
    //   isFailure: false,
    //   date: '2025.04 - Now',
    //   title:
    //     'Founder, Editor-in-Chief @ Critical Culture Undergraduate Journal',
    //   description:
    //     "Northwestern's premier undergraduate venue for critical writing.",
    //   tags: ['student org', 'cultural studies'],
    // },
    {
      isFailure: false,
      date: '2025.04 - Now',
      title: 'Undergraduate Researcher @ UC Berkeley School of Information',
      description:
        'Advised by Prof. Tim Tangherlini (Dept. of Scandanavian Studies; Center for Cultural Analytics). Apprehending narrative in the Icelandic saga with literary-theoretical and computational methods.',
      tags: ['research', 'computational humanities'],
    },
    {
      isFailure: true,
      date: '2025.03',
      title: 'Rejected from every REU I applied for',
      description:
        'This was unfortunate, not the least because I thought I was a really good fit for my top choice. Still, a good reminder that the mechanics of getting research positions outside of these programs is the same as it ever was.',
      tags: ['research'],
    },
    {
      isFailure: false,
      date: '2024.10 - Now',
      title: 'Director of Technology @ WildHacks',
      description:
        'Leading software development at the largest intercollegiate hackathon in the Chicago area.',
      tags: ['student org'],
    },
    {
      isFailure: true,
      date: '2024.05',
      title: 'Worst grades of my life; almost rescinded from college',
      description:
        'Tell your teachers about your mental ailments and you will not end up in this situation!',
      tags: ['academics'],
    },
    {
      isFailure: false,
      date: '2023.06 - 2024.08',
      title: 'Student Researcher @ UCSD Programming Systems Group',
      description:
        'Advised by Prof. Michael Coblenz. Toward ergonomic programming languages and software processes for computational climate scientists.',
      tags: ['research', 'software engineering'],
    },
    {
      isFailure: false,
      date: '2023.01 - 12',
      title: 'Founder, Director @ Hack the Wave',
      description:
        "San Diego County's biggest-ever hackathon run for high schoolers, by high schoolers. Sponsored by Cloudflare, ClickUp, StackBlitz, Ulysses, others.",
      tags: ['independent', 'software engineering'],
    },
    {
      isFailure: false,
      date: '2022.08 - 2023.04',
      title: 'Built Albio.js, a compiler-powered reactivity library',
      description:
        'Lightweight JavaScript compiler to enable reactive web programming directly in your markdown.',
      tags: ['independent', 'software engineering'],
    },
    {
      isFailure: false,
      date: '2022.07 - 08',
      title: 'Software Engineer Intern @ Hack Club',
      description:
        'Building web tooling and interfaces for JavaScript-based game engine.',
      tags: ['internship', 'software engineering'],
    },
    {
      isFailure: false,
      date: '2022.06 - 09',
      title: 'Research Assistant @ UCSD Lab for Computational Astrophysics',
      description:
        'Advised by Prof. Michael Norman. Systems programming to support analysis of dark matter halos in early universe simulations.',
      tags: ['research', 'deep learning'],
    },
    // {
    //   isFailure: true,
    //   date: '2022.04',
    //   title: 'Rejected from the only summer camp I ever applied to',
    //   description:
    //     "Apparently the only time anyone is willing to tolerate your awful bildungsroman autofiction instead of your resume is when you're writing your Personal Statement for college applications.",
    //   tags: ['program'],
    // },
  ],
})
