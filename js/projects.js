const filters = ['All', 'Featured', 'GenAI', 'NLP', 'Computer Vision', 'Research', 'Data', 'Systems'];

const projects = [
  {
    title: 'AcademicForge',
    category: 'Featured',
    icon: 'project',
    tags: ['GenAI', 'Hybrid retrieval', 'FastAPI', 'Streamlit', 'BGE', 'Gemma'],
    summary: 'Hackathon research-to-implementation assistant for live academic search, evidence selection, summaries, paper guidance, and structured research plans.',
    details: 'Uses arXiv and Semantic Scholar, BM25 lexical retrieval, BGE dense embeddings, Reciprocal Rank Fusion, BGE cross-encoder reranking, local Gemma, and Fireworks DeepSeek fallback.',
    github: 'https://github.com/shreyshrivastava/AcademicForge'
  },
  {
    title: 'AI Healthcare Intel Engine',
    category: 'Featured',
    icon: 'project',
    tags: ['Healthcare AI', 'Risk scoring', 'Drug interaction'],
    summary: 'Enterprise-grade healthcare engine featuring symptom-to-specialist matching, risk stratification, and drug interaction analysis.',
    details: 'Strong product-oriented AI systems project with a health decision-support framing.',
    github: 'https://github.com/shreyshrivastava/ai-healthcare-intel-engine'
  },
  {
    title: 'Agentic Honeypot System',
    category: 'Featured',
    icon: 'project',
    tags: ['Agents', 'Security', 'Prompt pipelines'],
    summary: 'AI-driven honeypot designed to simulate intelligent interactions to detect and analyze fraud and scam attempts.',
    details: 'Uses agent-based workflows, prompt-driven pipelines, modular architecture, and fallback handling for reliable real-time execution.',
    github: 'https://github.com/shreyshrivastava/agentic-honeypot'
  },
  {
    title: 'Academic Search Engine for Papers',
    category: 'NLP',
    icon: 'project',
    tags: ['BM25', 'Semantic reranking', 'arXiv', 'Pinecone', 'FAISS'],
    summary: 'Custom academic search engine for arXiv papers with BM25 ranking, semantic re-ranking, and filters.',
    details: 'Useful retrieval/Search signal; the older foundation that AcademicForge builds beyond.',
    github: 'https://github.com/shreyshrivastava/Academic-Search-Engine-for-Research-Papers'
  },
  {
    title: 'ATS Resume Checker',
    category: 'GenAI',
    icon: 'project',
    tags: ['Gemma3', 'Resume matching', 'Privacy'],
    summary: 'Privacy-focused tool to check resume compatibility with job descriptions using Gemma3.',
    details: 'Practical GenAI utility with clear job-search use case.',
    github: 'https://github.com/shreyshrivastava/ats_resume_checker_gemma3_hf'
  },
  {
    title: 'Local Lore Generator',
    category: 'GenAI',
    icon: 'project',
    tags: ['LLaMA', 'DALL-E', 'Story generation'],
    summary: 'Generates region-specific Indian fables and myths with LLaMA and DALL-E visuals.',
    details: 'Shows multimodal product thinking: text generation paired with visual output.',
    github: 'https://github.com/shreyshrivastava/local-lore-generator'
  },
  {
    title: 'Claim Detection on Russia-Ukraine Conflict',
    category: 'NLP',
    icon: 'project',
    tags: ['BERT', 'SVM', 'Fact checking'],
    summary: 'Automated fact-checking using BERT + SVM to detect claims in news articles.',
    details: 'Hybrid NLP pipeline combining transformer representations with classical classification.',
    github: 'https://github.com/shreyshrivastava/claim-detection-project-on-Russia-and-conflict'
  },
  {
    title: 'Sentiment Analysis on Tweets',
    category: 'NLP',
    icon: 'project',
    tags: ['LinearSVC', '27k tweets', 'Text preprocessing'],
    summary: 'Classifies sentiment on 27,000 tweets using NLP preprocessing and LinearSVC.',
    details: 'Repository description reports precision 85.69%, recall 85.86%, and F1 85.65%.',
    github: 'https://github.com/shreyshrivastava/SentimentAnalysisTweets'
  },
  {
    title: 'Pupil Anomaly Detection',
    category: 'Computer Vision',
    icon: 'project',
    tags: ['MediaPipe', 'Real-time CV', 'Anomaly detection'],
    summary: 'Real-time eye tracking with anomaly detection using MediaPipe and ML.',
    details: 'Applied CV project with real-time tracking constraints.',
    github: 'https://github.com/shreyshrivastava/pupil-anomaly-detection'
  },
  {
    title: 'Car Detection System',
    category: 'Computer Vision',
    icon: 'project',
    tags: ['YOLOv5', 'Object detection', 'Traffic'],
    summary: 'YOLOv5 model trained to detect vehicles for parking and traffic management.',
    details: 'Practical object detection use case.',
    github: 'https://github.com/shreyshrivastava/Car-Detection-System'
  },
  {
    title: 'CIFAR-10 Image Classification',
    category: 'Computer Vision',
    icon: 'project',
    tags: ['PyTorch', 'CNN', '76.92% accuracy'],
    summary: 'CNN for CIFAR-10 using PyTorch, data augmentation, and optimization.',
    details: 'Repository description reports 76.92% test accuracy.',
    github: 'https://github.com/shreyshrivastava/CIFAR10-Image-Classification_shrey'
  },
  {
    title: 'Gas Cylinder Detection System',
    category: 'Research',
    icon: 'book',
    tags: ['Publication', 'Forecasting', 'AI safety'],
    summary: 'Predicts and prevents illegal sale of LPG cylinders using AI and forecasting techniques.',
    details: 'Published research item linked through Springer.',
    publication: 'https://link.springer.com/chapter/10.1007/978-3-031-56586-1_75'
  },
  {
    title: 'Polygon Arbitrage Bot',
    category: 'Systems',
    icon: 'code',
    tags: ['Rust', 'ethers-rs', 'SQLite', 'Polygon'],
    summary: 'Rust-based arbitrage opportunity detector comparing token prices across QuickSwap and SushiSwap.',
    details: 'Queries Polygon RPC, calculates simulated arbitrage profits, and logs opportunities to SQLite.',
    github: 'https://github.com/shreyshrivastava/polygon-arbitrage-bot'
  },
  {
    title: 'Tube Network Route Finder',
    category: 'Systems',
    icon: 'code',
    tags: ['DFS', 'BFS', 'UCS', 'Graphs'],
    summary: 'Optimizes subway routes using graph algorithms: DFS, BFS, UCS.',
    details: 'Algorithmic fundamentals and search implementation.',
    github: 'https://github.com/shreyshrivastava/Ai_tube'
  },
  {
    title: 'COVID-19 Tracker',
    category: 'Data',
    icon: 'project',
    tags: ['Forecasting', 'Visualization', 'India data'],
    summary: 'Data analysis on Indian COVID-19 data, visualization, and forecasting.',
    details: 'Data-analysis and forecasting project.',
    github: 'https://github.com/shreyshrivastava/COVID-TRACKER-SYSTEM'
  },
  {
    title: 'Diabetes Regression Analysis',
    category: 'Data',
    icon: 'project',
    tags: ['Regression', 'Regularization', 'Coursework'],
    summary: 'Regression analysis using the diabetes dataset, including underfitting, overfitting, and regularization.',
    details: 'Coursework repo with practical regression analysis.',
    github: 'https://github.com/shreyshrivastava/Diabetes-Regression-Analysis'
  },
  {
    title: 'Friends Character Similarity',
    category: 'NLP',
    icon: 'project',
    tags: ['Vectors', 'Classification', 'NLP'],
    summary: 'NLP-based similarity classification of TV show characters using vector representations.',
    details: 'Supporting vector-representation project.',
    github: 'https://github.com/shreyshrivastava/friends-character-similarity'
  },
  {
    title: 'Llama2 Prompt Exploration',
    category: 'GenAI',
    icon: 'project',
    tags: ['LLaMA 2', 'Prompting', 'NLP'],
    summary: 'Exploration of LLaMA 2 prompts and fine-tuning for NLP tasks.',
    details: 'Learning-oriented prompt engineering repository.',
    github: 'https://github.com/shreyshrivastava/llama2-prompt-exploration'
  },
  {
    title: 'Neural Network Introduction',
    category: 'Data',
    icon: 'project',
    tags: ['Neural networks', 'Iris', 'Notebook'],
    summary: 'Introductory neural-network project using the Iris dataset, with visualizations and report material.',
    details: 'Foundational ML coursework.',
    github: 'https://github.com/shreyshrivastava/Neural-Network-Introduction'
  },
  {
    title: 'Logistic Regression Iris Classification',
    category: 'Data',
    icon: 'project',
    tags: ['PyTorch', 'Logistic regression', 'Iris'],
    summary: 'PyTorch notebook for understanding classification with logistic regression on the Iris dataset.',
    details: 'Foundational classification coursework.',
    github: 'https://github.com/shreyshrivastava/-Logistic_Regression_Iris_Classification'
  }
];

let activeFilter = 'All';

const filterHost = document.getElementById('project-filters');
const grid = document.getElementById('project-grid');

mountPageScrollbar();

filterHost.innerHTML = filters.map(name => `<button class="filter-chip${name === activeFilter ? ' is-active' : ''}" data-filter="${name}">${icon(name === 'All' ? 'project' : filterIcon(name))}${name}</button>`).join('');
document.querySelectorAll('[data-icon]').forEach(node => {
  node.insertAdjacentHTML('afterbegin', icon(node.dataset.icon));
});
filterHost.addEventListener('click', event => {
  const button = event.target.closest('button[data-filter]');
  if (!button) return;
  activeFilter = button.dataset.filter;
  document.querySelectorAll('.filter-chip').forEach(chip => chip.classList.toggle('is-active', chip.dataset.filter === activeFilter));
  render();
});

function render() {
  const shown = activeFilter === 'All' ? projects : projects.filter(project => project.category === activeFilter || project.tags.includes(activeFilter));
  grid.innerHTML = shown.map(projectCard).join('');
  mountRevealMotion();
}

function projectCard(project) {
  const actions = [
    project.github && `<a href="${project.github}" target="_blank" rel="noopener noreferrer">${icon('github')}GitHub</a>`,
    project.demo && `<a href="${project.demo}" target="_blank" rel="noopener noreferrer">${icon('external')}Live Demo</a>`,
    project.publication && `<a href="${project.publication}" target="_blank" rel="noopener noreferrer">${icon('book')}Publication</a>`,
  ].filter(Boolean).join('');

  return `<article class="project-card project-card--scene project-card--${slug(project.category)} ${project.category === 'Featured' ? 'project-card--featured' : ''}">
    <div class="project-card__visual">
      <img src="assets/gallery/project-${slug(project.title)}.svg" alt="">
    </div>
    <div class="project-card__top">
      <span class="project-card__icon">${icon(project.icon || filterIcon(project.category))}</span>
      <span class="project-card__category">${project.category}</span>
    </div>
    <h2>${project.title}</h2>
    <p class="project-card__summary">${project.summary}</p>
    <p class="project-card__details">${project.details}</p>
    <ul class="project-card__tags">${project.tags.map(tag => `<li>${tag}</li>`).join('')}</ul>
    <div class="project-card__actions">${actions}</div>
  </article>`;
}

function slug(value) {
  return String(value).toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
}

function mountPageScrollbar() {
  const fill = document.querySelector('.page-scrollbar span');
  const hint = document.querySelector('.page-scroll-hint');
  if (!fill) return;
  const minVisibleProgress = 0.045;
  const update = () => {
    const max = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
    const progress = Math.min(1, Math.max(0, window.scrollY / max));
    fill.style.transform = `scaleX(${Math.max(minVisibleProgress, progress)})`;
    if (hint) hint.classList.toggle('is-hidden', window.scrollY > 32);
  };
  update();
  window.addEventListener('scroll', update, { passive: true });
  window.addEventListener('resize', update);
}

let revealObserver;
function mountRevealMotion() {
  const cards = [...document.querySelectorAll('.project-card')];
  if (!cards.length) return;
  if (revealObserver) revealObserver.disconnect();
  if (!('IntersectionObserver' in window)) {
    cards.forEach(card => card.classList.add('is-visible'));
    return;
  }
  revealObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add('is-visible');
      revealObserver.unobserve(entry.target);
    });
  }, { rootMargin: '0px 0px -12% 0px', threshold: 0.18 });
  cards.forEach(card => revealObserver.observe(card));
}

function filterIcon(name) {
  return {
    Featured: 'project',
    GenAI: 'code',
    NLP: 'code',
    'Computer Vision': 'project',
    Research: 'book',
    Data: 'project',
    Systems: 'code',
  }[name] || 'project';
}

function icon(name) {
  const icons = {
    github: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 2a10 10 0 0 0-3.16 19.49c.5.09.68-.22.68-.48v-1.7c-2.78.6-3.37-1.18-3.37-1.18-.45-1.16-1.11-1.47-1.11-1.47-.91-.62.07-.61.07-.61 1 .07 1.53 1.03 1.53 1.03.9 1.52 2.35 1.08 2.92.83.09-.65.35-1.08.63-1.33-2.22-.25-4.55-1.11-4.55-4.94 0-1.09.39-1.98 1.03-2.68-.1-.25-.45-1.27.1-2.64 0 0 .84-.27 2.75 1.02A9.55 9.55 0 0 1 12 6.99c.85 0 1.7.11 2.5.34 1.9-1.29 2.74-1.02 2.74-1.02.55 1.37.2 2.39.1 2.64.64.7 1.03 1.59 1.03 2.68 0 3.84-2.34 4.69-4.57 4.94.36.31.68.92.68 1.86v2.76c0 .27.18.58.69.48A10 10 0 0 0 12 2Z"/></svg>',
    external: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M14 4h6v6h-2V7.41l-8.3 8.3-1.4-1.42 8.29-8.29H14V4ZM5 6h6v2H7v9h9v-4h2v6H5V6Z"/></svg>',
    book: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 4.5A2.5 2.5 0 0 1 7.5 2H20v17H7.5A2.5 2.5 0 0 0 5 21.5v-17Zm2.5-.5A.5.5 0 0 0 7 4.5v12.55c.17-.03.33-.05.5-.05H18V4H7.5ZM4 5h1v16h14v1H6.5A2.5 2.5 0 0 1 4 19.5V5Z"/></svg>',
    code: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="m8.7 16.3-1.4 1.4L1.6 12l5.7-5.7 1.4 1.4L4.4 12l4.3 4.3Zm6.6 0 4.3-4.3-4.3-4.3 1.4-1.4 5.7 5.7-5.7 5.7-1.4-1.4Zm-3.2 2.2-1.9-.6 3.7-12.4 1.9.6-3.7 12.4Z"/></svg>',
    project: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 4h7v7H4V4Zm9 0h7v7h-7V4ZM4 13h7v7H4v-7Zm9 0h7v7h-7v-7Z"/></svg>',
    briefcase: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M9 4h6a2 2 0 0 1 2 2v2h3a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2v-8a2 2 0 0 1 2-2h3V6a2 2 0 0 1 2-2Zm6 4V6H9v2h6Zm5 5h-6v2h-4v-2H4v5h16v-5Z"/></svg>',
    education: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="m12 3 10 5-10 5L2 8l10-5Zm-6 8.2 6 3 6-3V16c0 1.7-2.7 3.5-6 3.5S6 17.7 6 16v-4.8Z"/></svg>',
    mail: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M3 5h18a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1Zm9 8.1L5.4 7H4v.6l8 7.35 8-7.35V7h-1.4L12 13.1Z"/></svg>',
  };
  return `<span class="ui-icon">${icons[name] || icons.project}</span>`;
}

render();
