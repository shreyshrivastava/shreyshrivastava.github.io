const scenePath = 'assets/world/';
const worldRoot = document.getElementById('world');

mountScrollWorld(worldRoot, {
  brand: { name: 'Shrey Shrivastava', href: '#top' },
  hint: 'scroll to explore',
  nav: true,
  atmosphere: true,
  diveScroll: 1.45,
  connScroll: 0.78,
  crossfade: 0.1,
  sections: [
    {
      id: 'about',
      label: 'About',
      href: '#about',
      still: scenePath + 'signal-lab.svg',
      accent: '#17D7C8',
      scroll: 1.55,
      linger: 0.42,
      eyebrow: 'AI / ML Engineer',
      profile: {
        image: 'assets/profile/shrey-city-profile.jpg',
        alt: 'Shrey Shrivastava',
        caption: 'AI / ML Engineer'
      },
      title: 'Shrey Shrivastava.',
      body: 'AI Engineer and Software Engineer focused on end-to-end AI systems across machine learning, NLP, computer vision, data pipelines, and deployment.',
      items: [
        {
          title: 'Current Focus',
          icon: 'project',
          body: 'Building practical AI systems that connect model behavior with product needs: retrieval, classification, forecasting, detection, and deployable interfaces.',
          href: 'projects.html',
          linkLabel: 'See project evidence'
        },
        {
          title: 'shrey.shrivastava@yahoo.com',
          titleHref: 'mailto:shrey.shrivastava@yahoo.com',
          icon: 'mail',
          body: 'For roles, interviews, collaborations, or project follow-ups, reach me directly by email.',
          href: 'mailto:shrey.shrivastava@yahoo.com',
          linkLabel: 'Send email',
          secondaryHref: 'contact.html',
          secondaryLabel: 'Contact page'
        }
      ],
      tags: ['Machine learning', 'NLP', 'Computer vision', 'AI systems']
    },
    {
      id: 'projects',
      label: 'Projects',
      href: 'projects.html',
      still: scenePath + 'project-city.svg',
      accent: '#6FA8FF',
      scroll: 1.45,
      linger: 0.25,
      eyebrow: 'Projects',
      title: 'Open the project gallery.',
      body: 'Browse the strongest project evidence: implementation details, GitHub links, demos, publications, and applied AI systems.',
      items: [
        {
          title: 'Full Projects Page',
          icon: 'project',
          body: 'Browse AcademicForge, Healthcare Intel Engine, Agentic Honeypot, Academic Search, computer vision, NLP, research, systems, and data projects in a full-width layout.',
          href: 'projects.html',
          linkLabel: 'Open gallery'
        }
      ],
      tags: ['AcademicForge', 'Hybrid retrieval', 'GenAI', 'NLP', 'Computer vision'],
      cta: {
        primary: { label: 'View all projects', href: 'projects.html', icon: 'external' },
        secondary: { label: 'Experience', href: 'experience.html', icon: 'briefcase' }
      }
    },
    {
      id: 'experience',
      label: 'Experience',
      href: 'experience.html',
      still: scenePath + 'systems-floor.svg',
      accent: '#8BE36D',
      scroll: 1.35,
      linger: 0.34,
      eyebrow: 'Experience',
      title: 'Open the experience page.',
      body: 'This scene previews the work history. Open the full Experience page for current healthcare AI work, internship details, and the work areas connected to them.',
      items: [
        {
          title: 'Full Experience Page',
          icon: 'briefcase',
          body: 'AI Engineer at CRO Prime, plus Data Analysis and Machine Learning internships at Seekace and Innovians Tech, with work across healthcare ML pipelines, customer churn prediction, forecasting, NLP, and computer vision.',
          href: 'experience.html',
          linkLabel: 'Open experience'
        }
      ],
      tags: ['Healthcare ML', 'Pipelines', 'Customer churn', 'NLP', 'Computer vision'],
      cta: {
        primary: { label: 'View experience', href: 'experience.html', icon: 'external' },
        secondary: { label: 'Projects', href: 'projects.html', icon: 'project' }
      }
    },
    {
      id: 'education',
      label: 'Education',
      href: 'education.html',
      still: scenePath + 'research-observatory.svg',
      accent: '#FFB657',
      scroll: 1.35,
      linger: 0.34,
      eyebrow: 'Education',
      title: 'Open the education page.',
      body: 'This scene previews the academic path. Open the full Education page for the degree timeline and AI/CS credentials.',
      items: [
        {
          title: 'Full Education Page',
          icon: 'education',
          body: 'MSc Artificial Intelligence, BTech Computer Science, and Diploma Computer Science in one readable timeline.',
          href: 'education.html',
          linkLabel: 'Open education'
        }
      ],
      tags: ['Artificial Intelligence', 'Computer Science'],
      cta: {
        primary: { label: 'View education', href: 'education.html', icon: 'external' },
        secondary: { label: 'Experience', href: 'experience.html', icon: 'briefcase' }
      }
    },
    {
      id: 'contact',
      label: 'Contact',
      href: '#contact',
      still: scenePath + 'contact-terminal.svg',
      accent: '#F96FB3',
      scroll: 1.35,
      linger: 0.34,
      eyebrow: 'Contact',
      title: 'Let’s connect.',
      body: 'For AI/ML roles, collaborations, research conversations, or project follow-ups, these are the cleanest ways to reach me.',
      items: [
        {
          title: 'shrey.shrivastava@yahoo.com',
          titleHref: 'mailto:shrey.shrivastava@yahoo.com',
          icon: 'mail',
          body: 'Best for hiring, interviews, collaboration requests, and direct follow-ups.',
          href: 'mailto:shrey.shrivastava@yahoo.com',
          linkLabel: 'Send email'
        },
        {
          title: 'GitHub',
          icon: 'github',
          body: 'Repositories, implementation details, and project history.',
          href: 'https://github.com/shreyshrivastava',
          linkLabel: 'Open GitHub'
        },
        {
          title: 'LinkedIn',
          icon: 'linkedin',
          body: 'Professional context, recruiter messages, and role conversations.',
          href: 'https://www.linkedin.com/in/shrey-shrivastava1',
          linkLabel: 'Open LinkedIn'
        }
      ],
      tags: ['Email', 'GitHub', 'LinkedIn', 'ORCID'],
      cta: {
        primary: { label: 'Send email', href: 'mailto:shrey.shrivastava@yahoo.com', icon: 'mail' },
        secondary: { label: 'Contact page', href: 'contact.html', icon: 'external' }
      }
    }
  ],
  connectors: []
});
