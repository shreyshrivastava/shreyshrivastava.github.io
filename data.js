window.PROJECTS = [
 {
  "title": "AcademicForge",
  "hackathon": "AMD hackathon project",
  "image": "academicforge.png",
  "imageAlt": "AcademicForge research search interface with paper results and research lens controls",
  "imageCaption": "Research search interface",
  "category": "Featured",
  "icon": "project",
  "tags": [
   "GenAI",
   "Hybrid retrieval",
   "FastAPI",
   "Streamlit",
   "BGE",
   "Gemma",
   "MLX",
   "ROCm"
  ],
  "problem": "Going from a research question to a plan means searching several paper sources, skimming dozens of abstracts and then writing the plan yourself.",
  "built": "A search over arXiv and Semantic Scholar that ranks papers by keywords and by meaning. You pick the papers you trust, and it summarises each one and builds a research plan from only those. A local Gemma model does the writing by default, so nothing has to leave your machine.",
  "result": "Built for the AMD hackathon and tested on Apple Silicon, NVIDIA and AMD ROCm. A lightweight demo mode runs with no API keys.",
  "github": "https://github.com/shreyshrivastava/AcademicForge",
  "demo": "https://academicforge-demo.streamlit.app/",
  "video": "assets/video/academicforge-demo.mp4",
  "poster": "assets/video/academicforge-demo-poster.jpg",
  "videoAlt": "AcademicForge demo: a research question, papers ranked from arXiv, a summary and a plan with findings cited back to the papers"
 },
 {
  "title": "agent-ops",
  "image": "agent-ops.png",
  "imageAlt": "agent-ops terminal session fixing a webhook signature check with a local model",
  "imageCaption": "Terminal session / Repository screenshot",
  "category": "Featured",
  "icon": "code",
  "tags": [
   "Python",
   "Ollama",
   "Local model",
   "CLI"
  ],
  "problem": "Coding agents edit your files and run commands, often through a cloud service, and it is hard to see or control what they do.",
  "built": "A terminal coding agent that runs on a local Ollama model. It shows a diff before every file write and the exact command before every run, and nothing happens until you type y. Each run is saved so you can replay it.",
  "result": "On 8 small payments tasks run twice each, bug fixes passed 9 of 10 with my system prompt against 7 of 10 for a plain prompt, and took 108 s against 200 s. Feature tasks tied at 3 of 6. The sample is small and the model is a 9B local one, so I treat the numbers as rough.",
  "github": "https://github.com/shreyshrivastava/agent-ops"
 },
 {
  "title": "FallGuard AI",
  "hackathon": "IBM hackathon project",
  "image": "fallguard-dashboard.png",
  "imageAlt": "FallGuard AI Android app dashboard showing on-device monitoring and emergency SOS controls",
  "imageCaption": "Android app dashboard / Repository screenshot",
  "category": "Featured",
  "icon": "code",
  "tags": [
   "Kotlin",
   "PyTorch Mobile",
   "Sensor fusion",
   "On-device ML",
   "Systems"
  ],
  "problem": "Someone who falls while alone, often an older person, may not be able to reach a phone to ask for help.",
  "built": "An Android app that reads the phone's motion sensors 50 times a second and runs a small PyTorch model on the phone every 400 ms. If it spots a fall, it starts a countdown the person can cancel, then alerts their contacts with the last known GPS location.",
  "result": "Detection runs on the phone itself, so it does not depend on a connection. It is a hackathon prototype, not a certified medical device.",
  "github": "https://github.com/kushagr-tech/fall_detection",
  "video": "assets/video/fallguard-demo.mp4",
  "poster": "assets/video/fallguard-demo-poster.jpg",
  "videoAlt": "FallGuard AI demo in the Android emulator: adding an emergency contact, choosing a sensitivity, turning on Guard and answering a simulated fall alert"
 },
 {
  "title": "AI Healthcare Intel Engine",
  "image": "healthcare-intel.png",
  "imageAlt": "Healthcare Intel Engine application showing drug interaction analysis",
  "imageCaption": "Drug interaction analysis interface",
  "category": "Featured",
  "icon": "project",
  "tags": [
   "Healthcare AI",
   "Risk scoring",
   "Drug interaction"
  ],
  "problem": "Healthcare AI demos often overclaim, and lean on an opaque model for every decision.",
  "built": "A demo with three tools: ranking likely specialists from symptoms, a second-opinion risk check, and a drug-interaction lookup. It runs on synthetic data with plain deterministic rules by default, and a sentence-embedding model is optional.",
  "result": "It is deployed as a live demo with tests running in CI. It is a portfolio project, not a medical device and not medical advice.",
  "github": "https://github.com/shreyshrivastava/ai-healthcare-intel-engine",
  "demo": "https://healthcare-intel-engine-shrey.streamlit.app/"
 },
 {
  "title": "Agentic Honeypot System",
  "image": "agentic-honeypot.png",
  "imageAlt": "Agentic Honeypot API returning scam detection and extracted intelligence for synthetic input",
  "imageCaption": "Local API run / Lightweight rules mode",
  "category": "Featured",
  "icon": "project",
  "tags": [
   "Agents",
   "Security",
   "Prompt pipelines"
  ],
  "problem": "Scam messages push victims to pay into UPI IDs and bank accounts, and the details are hard to collect and compare at scale.",
  "built": "A service that flags a likely scam message, writes a controlled reply to keep the scammer talking, and pulls out UPI IDs, bank accounts, IFSC codes and URLs with pattern matching. Simple rules do the first pass, and a local model can be switched on for scoring and replies.",
  "result": "It runs locally with no private data, and tests plus a benchmark run in CI. Evaluation so far uses synthetic messages only.",
  "github": "https://github.com/shreyshrivastava/agentic-honeypot"
 },
 {
  "title": "Bhopal Safety Intelligence",
  "image": "bhopal-safety.jpg",
  "imageAlt": "Bhopal Safety Intelligence dashboard with a map of locality pins and police facilities",
  "imageCaption": "Dashboard preview / Repository screenshot",
  "category": "Data",
  "icon": "project",
  "tags": [
   "Streamlit",
   "Leaflet",
   "Python",
   "Open data"
  ],
  "problem": "Bhopal Police publish crime and enforcement reports as separate press posts, so it is hard to see where they cluster. Dashboards that fill the gaps tend to invent data.",
  "built": "A map dashboard built from nine locatable police publications from April to October 2026, each checked by hand against the source text. Pins are approximate locality references, and each popup links to the official post. It also maps 48 police facilities and exports CSV with sources and missing values kept.",
  "result": "It shows what has been publicly reported and no more. There are no risk scores or density heatmaps, because the data cannot support them, and a category with no record reads as nothing loaded, not zero crime.",
  "github": "https://github.com/shreyshrivastava/bhopal-crime-safety-intelligence",
  "demo": "https://bhopalcrimesafety.streamlit.app/",
  "video": "assets/video/bhopal-demo.mp4",
  "poster": "assets/video/bhopal-demo-poster.jpg",
  "videoAlt": "Bhopal Safety Intelligence walkthrough: opening a pin's source, turning off a category, filtering by report type, and viewing analytics and records"
 },
 {
  "title": "Academic Search Engine for Papers",
  "image": "academic-search-repo.png",
  "imageAlt": "GitHub repository for Academic Search Engine for Research Papers",
  "imageCaption": "GitHub repository",
  "category": "NLP",
  "icon": "project",
  "tags": [
   "BM25",
   "Semantic reranking",
   "arXiv",
   "Pinecone",
   "FAISS"
  ],
  "problem": "Keyword search over a large paper archive misses papers that mean the same thing in different words.",
  "built": "A search engine over the arXiv dataset. BM25 ranks papers by keywords, then embeddings (FAISS or Pinecone) re-rank them by meaning. You can filter by citation count, date and journal impact factor, from a Streamlit app or the command line.",
  "result": "Scored with standard retrieval metrics (MAP, nDCG and Precision@K). It is the first version that AcademicForge later grew from.",
  "github": "https://github.com/shreyshrivastava/Academic-Search-Engine-for-Research-Papers"
 },
 {
  "title": "ATS Resume Checker",
  "image": "ats-resume-checker.png",
  "imageAlt": "ATS Resume Checker running locally with a synthetic resume and a computed match report",
  "imageCaption": "Local app run / Synthetic sample resume",
  "category": "GenAI",
  "icon": "project",
  "tags": [
   "Gemma3",
   "Resume matching",
   "Privacy"
  ],
  "problem": "Applicants rarely learn why a resume scored badly against a job post, or what to change.",
  "built": "Upload a PDF resume and a job description and get a score built from keyword overlap, job-title match, structure and depth, with the matched and missing terms listed. The score is plain arithmetic. An optional local Gemma model writes the explanation, and it cannot change the score.",
  "result": "Resumes stay on your machine, and scanned or image-only PDFs fail with a clear message instead of a wrong score.",
  "github": "https://github.com/shreyshrivastava/ats_resume_checker_gemma3_hf"
 },
 {
  "title": "Local Lore Generator",
  "image": "local-lore.png",
  "imageAlt": "Local Lore Generator running locally with context, tone, and audience controls before generation",
  "imageCaption": "Local application / Input interface",
  "category": "GenAI",
  "icon": "project",
  "tags": [
   "LLaMA",
   "DALL-E",
   "Story generation"
  ],
  "problem": "I wanted to see whether a model could write fables rooted in a specific part of India, not generic fantasy.",
  "built": "A Gradio app where you pick a region, a tone and an audience. Llama 4 (through Groq) writes the story and DALL·E draws an illustration. If image generation hits its limit, a local placeholder is shown instead.",
  "result": "It runs as a live Hugging Face Space, so you can try it without installing anything.",
  "demo": "https://huggingface.co/spaces/shrey2105/local-lore-generator",
  "github": "https://github.com/shreyshrivastava/local-lore-generator"
 },
 {
  "title": "Claim Detection on Russia-Ukraine Conflict",
  "image": "claim-detection.png",
  "imageAlt": "Confusion matrix saved by the BERT and SVM claim detection notebook",
  "imageCaption": "Original notebook output",
  "category": "NLP",
  "icon": "project",
  "tags": [
   "BERT",
   "SVM",
   "Fact checking"
  ],
  "problem": "News about the conflict is full of claims, and checking them by hand does not scale.",
  "built": "My MSc dissertation at Queen Mary. I turned an experimental BERT and SVM notebook into a FastAPI app that screens claims, retrieves evidence and gives a coarse stance. It falls back through four modes, down to simple rules, so it never crashes.",
  "result": "A live demo runs on Vercel. The cloud demo uses a hosted Llama model, because the original BERT model is too large for serverless. It is not a production fact-checker.",
  "github": "https://github.com/shreyshrivastava/claim-detection-project-on-Russia-and-conflict",
  "demo": "https://claim-detection-project.vercel.app"
 },
 {
  "title": "Sentiment Analysis on Tweets",
  "image": "sentiment-analysis-repo.png",
  "imageAlt": "GitHub repository for Sentiment Analysis on Tweets",
  "imageCaption": "GitHub repository",
  "category": "NLP",
  "icon": "project",
  "tags": [
   "LinearSVC",
   "27k tweets",
   "Text preprocessing"
  ],
  "problem": "Sorting tens of thousands of tweets by sentiment by hand is not realistic.",
  "built": "A university assignment. I cleaned the text (lowercasing, stop-word removal, lemmatising), turned it into single-word and two-word features, and trained a LinearSVC classifier on 27,000 tweets, 80% for training and 20% for testing.",
  "result": "Precision 85.69%, recall 85.86% and F1 85.65%.",
  "github": "https://github.com/shreyshrivastava/SentimentAnalysisTweets"
 },
 {
  "title": "Pupil Anomaly Detection",
  "image": "pupil-anomaly.png",
  "imageAlt": "Pupil Anomaly Detection Streamlit application interface",
  "imageCaption": "Pupil tracking application",
  "category": "Computer Vision",
  "icon": "project",
  "tags": [
   "MediaPipe",
   "Real-time CV",
   "Anomaly detection"
  ],
  "problem": "Comparing how the left and right pupils react is subjective when done by eye.",
  "built": "A tool that measures the pupil radius of each eye from video with MediaPipe, compares the two over time, flags sudden jumps, and produces a score and a PDF report.",
  "result": "A live demo runs on Render with synthetic samples. It is a screening demo, not a diagnosis.",
  "github": "https://github.com/shreyshrivastava/pupil-anomaly-detection",
  "demo": "https://pupil-response-analyzer.onrender.com"
 },
 {
  "title": "Car Detection System",
  "image": "car-detection-repo.png",
  "imageAlt": "GitHub repository for Car Detection System with its notebook and documentation",
  "imageCaption": "GitHub repository",
  "category": "Computer Vision",
  "icon": "project",
  "tags": [
   "YOLOv5",
   "Object detection",
   "Traffic"
  ],
  "problem": "Parking and traffic systems need to find and count cars automatically.",
  "built": "I trained a custom YOLOv5 model on a set of car images in a notebook, from setting up the environment through training to checking the detections on test images.",
  "result": "The notebook shows the detections on test images. It reports no accuracy figures.",
  "github": "https://github.com/shreyshrivastava/Car-Detection-System"
 },
 {
  "title": "CIFAR-10 Image Classification",
  "image": "cifar10.png",
  "imageAlt": "Training and evaluation curves saved by the CIFAR-10 classification notebook",
  "imageCaption": "Original training and evaluation plots",
  "category": "Computer Vision",
  "icon": "project",
  "tags": [
   "PyTorch",
   "CNN",
   "76.92% accuracy"
  ],
  "problem": "Teaching a small network to recognise ten kinds of everyday objects in tiny 32×32 pixel images.",
  "built": "A convolutional neural network in PyTorch, with data augmentation and tuned optimisation.",
  "result": "76.92% test accuracy. It is a learning project, well below what the best published models reach.",
  "github": "https://github.com/shreyshrivastava/CIFAR10-Image-Classification_shrey"
 },
 {
  "title": "Gas Cylinder Detection System",
  "image": "gas-cylinder-publication.png",
  "imageAlt": "Springer publication page for Deep Learning Based Object Detection on Gas Cylinders",
  "imageCaption": "Published research / Springer",
  "category": "Research",
  "icon": "book",
  "tags": [
   "Publication",
   "Forecasting",
   "AI safety"
  ],
  "problem": "LPG cylinders are sold illegally, and spotting and tracking them by hand is slow.",
  "built": "A deep-learning object detector for gas cylinders, combined with forecasting techniques to predict where illegal sales are likely.",
  "result": "Published as a chapter in a Springer book, linked on the card.",
  "publication": "https://link.springer.com/chapter/10.1007/978-3-031-56586-1_75"
 },
 {
  "title": "Polygon Arbitrage Bot",
  "image": "polygon-arbitrage-repo.png",
  "imageAlt": "GitHub repository for the Rust Polygon Arbitrage Opportunity Detector Bot",
  "imageCaption": "GitHub repository",
  "category": "Systems",
  "icon": "code",
  "tags": [
   "Rust",
   "ethers-rs",
   "SQLite",
   "Polygon"
  ],
  "problem": "The same token can trade at slightly different prices on different exchanges, and the gap is hard to spot by hand.",
  "built": "A Rust bot that reads prices from QuickSwap and SushiSwap on Polygon, works out the simulated profit from the gap, and logs the profitable cases to SQLite. It runs continuously at a set interval.",
  "result": "It only simulates profit and places no trades. Gas costs are not fully modelled, so treat the figures as estimates.",
  "github": "https://github.com/shreyshrivastava/polygon-arbitrage-bot"
 },
 {
  "title": "Tube Network Route Finder",
  "image": "tube-route-repo.png",
  "imageAlt": "GitHub repository for Tube Network Route Finder with graph search algorithms",
  "imageCaption": "GitHub repository",
  "category": "Systems",
  "icon": "code",
  "tags": [
   "DFS",
   "BFS",
   "UCS",
   "Graphs"
  ],
  "problem": "Finding a route across a subway network means choosing between the fewest stops and the lowest travel cost.",
  "built": "I built the network as a graph from a CSV of stations, links, travel costs and zones. Then I implemented depth-first, breadth-first and uniform-cost search to find routes through it.",
  "result": "You can compare what each algorithm returns for the same journey.",
  "github": "https://github.com/shreyshrivastava/Ai_tube"
 },
 {
  "title": "COVID-19 Tracker",
  "image": "covid-tracker.png",
  "imageAlt": "Confirmed COVID-19 case forecast saved by the tracker notebook",
  "imageCaption": "Original case forecast",
  "category": "Data",
  "icon": "project",
  "tags": [
   "Forecasting",
   "Visualization",
   "India data"
  ],
  "problem": "Case numbers were reported state by state, which made the spread across India hard to see.",
  "built": "I analysed India's COVID-19 dataset with Python and Pandas: confirmed, cured and death counts by state, charts of how the spread differed between regions, and a forecast of confirmed cases.",
  "result": "Charts and a case forecast in a notebook. It analyses a historical dataset and is not a live tracker.",
  "github": "https://github.com/shreyshrivastava/COVID-TRACKER-SYSTEM"
 },
 {
  "title": "Diabetes Regression Analysis",
  "image": "diabetes-regression.png",
  "imageAlt": "Cost curve and prediction scatter plot from the diabetes regression notebook",
  "imageCaption": "Original regression analysis output",
  "category": "Data",
  "icon": "project",
  "tags": [
   "Regression",
   "Regularization",
   "Coursework"
  ],
  "problem": "How much can a model learn from a small medical dataset before it starts memorising it?",
  "built": "Coursework on the diabetes dataset. I fitted regression models, compared underfitting with overfitting, and used regularisation to control it.",
  "result": "Notebooks with a cost curve and prediction plots, plus a written report.",
  "github": "https://github.com/shreyshrivastava/Diabetes-Regression-Analysis"
 },
 {
  "title": "Friends Character Similarity",
  "image": "friends-similarity.png",
  "imageAlt": "Character similarity heatmap from the Friends NLP notebook",
  "imageCaption": "Original character similarity heatmap",
  "category": "NLP",
  "icon": "project",
  "tags": [
   "Vectors",
   "Classification",
   "NLP"
  ],
  "problem": "Can a computer tell which character said a line, from the words alone?",
  "built": "An NLP assignment on the Friends script. I built vector representations of each character's lines, improved them with preprocessing, feature extraction and transformations, and scored them by how well similarity search matched lines to characters.",
  "result": "A similarity heatmap and the evaluation are in the notebook.",
  "github": "https://github.com/shreyshrivastava/friends-character-similarity"
 },
 {
  "title": "Llama2 Prompt Exploration",
  "image": "llama2-prompt-repo.png",
  "imageAlt": "GitHub repository containing the Llama2 Prompt Exploration notebook",
  "imageCaption": "GitHub repository",
  "category": "GenAI",
  "icon": "project",
  "tags": [
   "LLaMA 2",
   "Prompting",
   "NLP"
  ],
  "problem": "The same model gives very different answers depending on how you phrase the prompt.",
  "built": "A lab notebook where I wrote and compared prompts for different language tasks with Llama 2.",
  "result": "A learning exercise, with the prompts and outputs in the notebook.",
  "github": "https://github.com/shreyshrivastava/llama2-prompt-exploration"
 },
 {
  "title": "Neural Network Introduction",
  "image": "neural-network.png",
  "imageAlt": "Saved neural network notebook visualization",
  "imageCaption": "Original neural network notebook output",
  "category": "Data",
  "icon": "project",
  "tags": [
   "Neural networks",
   "Iris",
   "Notebook"
  ],
  "problem": "A first look at how a neural network learns, on a small dataset where the result is easy to check.",
  "built": "A simple neural network on the Iris flower dataset in a Jupyter notebook, with visualisations and a written report.",
  "result": "Foundational coursework. The notebook shows the training and the results.",
  "github": "https://github.com/shreyshrivastava/Neural-Network-Introduction"
 },
 {
  "title": "Logistic Regression Iris Classification",
  "image": "iris-classification.png",
  "imageAlt": "Iris classification scatter plot and learned decision boundary",
  "imageCaption": "Original classification decision boundary",
  "category": "Data",
  "icon": "project",
  "tags": [
   "PyTorch",
   "Logistic regression",
   "Iris"
  ],
  "problem": "Telling three iris species apart from four flower measurements.",
  "built": "Logistic regression written in PyTorch, step by step, on the Iris dataset.",
  "result": "The notebook plots the decision boundary the model learned.",
  "github": "https://github.com/shreyshrivastava/-Logistic_Regression_Iris_Classification"
 }
];
