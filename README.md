# Nudge — Get Unstuck, Now

> An AI-powered career coach that gives you a hyper-specific action plan — not generic advice.

**Live:** [nudge-lake.vercel.app](https://nudge-lake.vercel.app)

---

## What is Nudge?

Most career tools answer *"what should I learn?"*

Nudge answers *"why am I stuck right now — and what do I do in the next 30 minutes?"*

It's a conversational AI coach built for product managers in career transition. You describe where you're stuck. Nudge asks 1–2 sharp diagnostic questions. Then it gives you a hyper-specific, checklist-driven action plan — backed by reasoning, not generic tips.

When you finish the plan, Nudge starts a new session and asks what's hard now.

---

## Why I Built This

I was learning PM skills, had a clear path, and still felt stuck every week — not because I lacked information, but because nobody was pushing me through the stuck moments in real time.

Every resource I found answered *"what to learn."* Nobody answered *"you're avoiding rejection, here's what to do today."*

So I built the coach I needed.

---

## How It Works

```
User types stuck moment
        ↓
Nudge asks 1–2 sharp diagnostic questions
        ↓
Generates hyper-specific action plan
        ↓
Interactive checklist — check off tasks silently
        ↓
All done → Nudge auto-starts new session
        ↓
"All done — what's feeling hard now?"
```

### Example interaction

**User:** I'm a PM, I have my portfolio ready but I don't know whether to keep applying or polish my resume first.

**Nudge:** You're asking if you should keep preparing or start doing. Classic paralysis. How many applications have you sent in the last 7 days?

**User:** 15, but no responses.

**Nudge:** 15 cold applications is a lottery, not a strategy. Here's your plan:

- [ ] Identify 10 B2B SaaS companies in fintech, 50–200 employees, Series A in last 6 months
- [ ] Find the Head of Product or CPO on LinkedIn — message them directly, not HR
- [ ] Send a 3-line message: what you noticed about their product, what you'd fix, ask for 15 min
- [ ] Apply through their careers page the same day — warm + cold together
- [ ] Track responses in a sheet: company, date, channel, response

---

## Tech Stack

| Layer | Technology |
|---|---|
| Frontend | HTML, CSS, Vanilla JavaScript |
| Backend | Node.js — Vercel Serverless Function |
| AI | Google Gemini 2.5 Flash API |
| Hosting | Vercel |
| Version Control | GitHub |

---

## Project Structure

```
nudge/
├── index.html        # Frontend — UI, chat, checklist logic
├── api/
│   └── chat.js       # Backend — Vercel serverless function
└── vercel.json       # Vercel deployment config
```

---

## How the API Works

Every message triggers this flow:

```
Browser → POST /api/chat
              ↓
        api/chat.js receives request
              ↓
        Reads GEMINI_API_KEY from Vercel environment
              ↓
        Calls Gemini API with full conversation history
              ↓
        Returns response to browser
              ↓
        Browser renders Nudge's reply
```

**The API key never touches the browser.** It lives exclusively in Vercel's server environment — users never see it, and it's never included in the client-side code.

---

## Usage Limits

To manage API costs while keeping Nudge free to use:

- **5 free messages** per browser session — powered by the app's Gemini key
- **After 5 messages** — users enter their own Gemini API key (free at [aistudio.google.com](https://aistudio.google.com))
- User keys are saved in `localStorage` — entered once, remembered permanently
- The 5-message counter resets if browser storage is cleared

---

## Running Locally

### Prerequisites
- Node.js installed
- A free Gemini API key from [aistudio.google.com](https://aistudio.google.com)
- A Vercel account (free) for deployment

### Local setup

```bash
# Clone the repo
git clone https://github.com/suryaveer-product-geek/nudge.git
cd nudge

# Install Vercel CLI
npm install -g vercel

# Add your API key as a local environment variable
echo "GEMINI_API_KEY=your_key_here" > .env.local

# Run locally
vercel dev
```

Open `http://localhost:3000` — Nudge is running locally.

---

## Deploying to Vercel

```bash
# Push to GitHub
git add .
git commit -m "your message"
git push

# Vercel auto-deploys on every push
# Make sure GEMINI_API_KEY is set in:
# Vercel Dashboard → Project → Settings → Environment Variables
```

Every `git push` to `main` triggers an automatic redeploy. No manual steps needed.

---

## The Coach's Personality

Nudge is opinionated. It has a point of view:

> *Volume beats paralysis. But smart, targeted volume beats spray and pray.*

**What Nudge never does:**
- Give 5 generic tips
- Say "great question!"
- Recommend polishing your resume instead of applying

**What Nudge always does:**
- Ask one sharp question before giving advice
- Call out avoidance behavior directly
- Give tasks specific enough that there's zero ambiguity about what to do next
- Back recommendations with reasoning — company stage logic, hiring patterns, market data

---

## Current Status

- Live and deployed at [nudge-lake.vercel.app](https://nudge-lake.vercel.app)
- Currently in testing phase — 10 active users
- Built and maintained by [Suryaveer Singh](https://linkedin.com)

---

## What's Next

- [ ] Save conversation history across sessions
- [ ] User accounts — so your plan persists across devices
- [ ] Weekly check-in — Nudge proactively asks how last week's plan went
- [ ] Specialised modes — job search, skill building, salary negotiation

---

## Built By

**Suryaveer Singh** — Product Manager, 0→1 Builder

This started as a personal tool. I was stuck in my own job search and built the coach I wished existed.



---

*If Nudge has helped you get unstuck, star the repo — it helps others find it.*
