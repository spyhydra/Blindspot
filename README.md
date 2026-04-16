# 👁️ BlindSpot - Adaptive Gap Assessor

BlindSpot is an AI-powered technical skill assessor designed to eliminate the guesswork from developer learning. Instead of generic quizzes, BlindSpot dynamically calibrates context-aware, hyper-specific technical questions based on your actual role, stack, and experience.

## 🚀 Getting Started (Local Setup)
Follow these steps to run BlindSpot locally on your machine.

1. **Clone the repository:**
   ```bash
   git clone <your-github-repo-url>
   cd blindspot-app
   ```
2. **Install Dependencies:**
   ```bash
   npm install
   ```
3. **Configure Environment Variables:**
   Create a `.env` file in the root directory and add your keys:
   ```env
   # Google Cloud Vertex AI
   GEMINI_API_KEY="your-gemini-api-key"

   # Google Firebase Auth
   NEXT_PUBLIC_FIREBASE_API_KEY="your-firebase-key"
   NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN="your-domain"
   NEXT_PUBLIC_FIREBASE_PROJECT_ID="your-project-id"
   NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET="your-bucket"
   NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID="your-sender-id"
   NEXT_PUBLIC_FIREBASE_APP_ID="your-app-id"
   ```
4. **Start the Development Server:**
   ```bash
   npm run dev
   ```
5. **Open the App:** Navigate to [http://localhost:3000](http://localhost:3000) in your browser.

## ✨ 1. Chosen Vertical & Persona
- **Vertical**: Developer Productivity / Education (EdTech)
- **Persona**: Software Engineers, Technical Leads, and Developers preparing for interviews or looking to master their specific tech stack without wasting time on things they already know.

## 🧠 2. Approach and Logic
We wanted to solve a fundamental problem with existing quiz platforms: **Guessing.**
When a developer guesses an answer correctly, the system falsely assumes they "know" it. This leaves hidden weaknesses—or **blind spots**—in their foundational framework.

**Our Core Logic:**
1. **The 5th Option:** Every question strictly carries an "I don't know / I need to study this" fallback option. Choosing this categorizes the topic as a "Blind Spot."
2. **The Misconception Engine:** If a user chooses an actively *wrong* plausible distractor, the AI categorizes the topic as a "Misconception," prioritizing it higher than a Blind Spot (because holding wrong information is more dangerous than knowing you don't know).
3. **Adaptive Roadmapping:** Once the assessment finishes, the application routes the performance matrix through a secondary model to generate a prioritized, step-by-step learning roadmap tailored to correct those precise failures.

## 🛠️ 3. How the Solution Works
### Tech Stack
- Frontend: Next.js 15 (App Router), React 18, Tailwind CSS
- Authentication: Google Firebase Auth
- AI Integration: Google Cloud Vertex AI REST APIs (`gemini-2.5-pro` and `gemini-2.5-flash`)
- Infrastructure: Docker / Google Cloud Run Ready

### The Workflow
1. **Prompt Studio:** The user authenticates and enters their context (e.g., "Senior Frontend Engineer migrating a platform from Vue to React").
2. **Dynamic Generation:** Vertex AI (`gemini-2.5-pro`) parses the prompt and generates 10 complex, scenario-based multiple-choice questions matching that exact scenario.
3. **The Assessment:** The user takes the quiz without being able to skip forward, relying heavily on the 5th "I don't know" option if they hit a gap in their knowledge.
4. **Gap Analysis:** Vertex AI (`gemini-2.5-flash`) evaluates the payload of correct answers, wrong guesses (Misconceptions), and admitted gaps (Blind Spots) to synthesize a high-priority learning roadmap complete with suggested study resources.

## 📝 4. Assumptions Made
1. **Model Reliability:** We assume that `gemini-pro` maintains consistent JSON formatting. To protect against edge cases (like the model wrapping output in conversational text), robust Regex extractors map out the exact JSON blocks server-side before casting.
2. **Ephemeral Focus:** We assume users prioritize immediate gap identification over long-term database tracking. We omitted a hefty PostgreSQL/NoSQL database for test results in favor of ephemeral `sessionStorage` arrays to maximize speed and respect the 1 MB repository size limits.
3. **Security Constraints:** The architecture assumes Google Firebase handles user authentication reliably, thus we rely on the `useAuth` provider hook to guard our dynamic `"/studio"` and `"/assessment"` routes.

## 💡 5. Example Prompts
Not sure what to type into the Prompt Studio? BlindSpot dynamically adapts to whatever you write. Try pasting these into the studio directly to generate a highly targeted assessment:

- **AWS Cloud Architect**
  > *"I am preparing for the AWS Solutions Architect Associate exam. Test me heavily on networking (VPCs, Subnets), IAM security policies, and S3 storage tiering."*

- **Senior Frontend Engineer**
  > *"I am a mid-level React developer interviewing for a Senior role. Test my deep understanding of the React rendering lifecycle, Server Components (RSC), and useMemo/useCallback optimization."*

- **Backend / DevOps Transition**
  > *"Test my knowledge of Node.js performance bottlenecks, event loop architecture, and deploying Dockerized microservices."*

- **Cybersecurity Basics**
  > *"I am a junior developer wanting to check my blind spots regarding OWASP Top 10 web vulnerabilities like XSS, CSRF, and SQL Injection."*
