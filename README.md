# Escalation Intelligence Platform v2

**MCS4MW Windows Workload Pilot — 5 Month Program Intelligence**

A full-stack AI-powered escalation intelligence platform built by [Nishant Desae](https://linkedin.com/in/nishantdesae), Sr. CX Engineering Manager with 20+ years at Microsoft, Adobe, and Symantec.

## What This Is

This tool encodes the operational model of a real enterprise premium support program — the Mission Critical Services (MCS) escalation lifecycle used in Microsoft's Modern Work engineering organization:

**Customer Ticket → CSS Handoff → CXE Engineering → PIR → ADO Backlog + CXE Actions → Program Timeline → Customer Health**

It tracks a 5-month pilot program (Nov 2024 — Mar 2025) with 8 enterprise customers onboarded from the existing Office Engineering Direct (OED) program to evaluate Windows 10/11 client workload coverage.

## The Dataset

- **~230 synthetic tickets** across 7 Windows engineering queues
- **34 CRM verbatim entries** — bi-weekly CXE PM check-in notes per customer
- **5 distinct customer arcs**: renewal, cross-workload drift, churn, scope gap drop, incident-driven renewal
- **Pilot outcome**: 5 renewed, 1 shifted to MCS4Security, 1 churned (CFE delivery slip), 1 dropped (server scope gap)

## 7 Tabs

| Tab | Description |
|-----|-------------|
| **Tickets & PIR** | Full ticket list with drill-down to 5 Whys root cause, ADO items, CXE actions |
| **Executive Brief** | AI-generated VP narrative from live data via Claude API |
| **Program Trends** | Opened vs closed by month, severity distribution, aging trends |
| **Customer Health** | 5-signal scoring (Velocity, Severity, Disposition, CXE, Sentiment) per account |
| **CRM Verbatim** | CXE PM bi-weekly check-in notes — the relationship intelligence layer |
| **Intelligence** | Cross-queue root cause clustering, ADO delivery risk scoring |
| **Ask ✦** | Conversational NL query interface with full message history context |

## Tech Stack

- **Frontend**: React (CRA)
- **AI**: Claude API (claude-sonnet-4-20250514) via Vercel serverless proxy
- **Deployment**: Vercel
- **API Proxy**: `/api/claude.js` — keeps API key server-side

## Setup

```bash
# Clone the repo
git clone https://github.com/nidesae/escalation-platform-v2.git
cd escalation-platform-v2

# Install dependencies
npm install

# Add your Anthropic API key
cp .env.example .env.local
# Edit .env.local and add your ANTHROPIC_API_KEY

# Run locally
npm start
```

## Deploy to Vercel

1. Push to GitHub
2. Import in [Vercel Dashboard](https://vercel.com/new)
3. Add `ANTHROPIC_API_KEY` as an environment variable in Vercel project settings
4. Deploy

The Executive Brief, Customer Sentiment, and Ask tabs require the API key. All other tabs work with the client-side synthetic dataset.

## What Makes It Differentiated

This is not a generic "chat with your data" demo. The PIR structure, disposition taxonomy, CXE action model, case status hierarchy, CRM verbatim practice, and health scoring framework all reflect real operational knowledge from running Microsoft Mission Critical Services escalation pipelines. The customer arcs encode real program dynamics — executive continuity risk, cross-workload scope friction, CFE delivery dependency, and the server scope gap that was consistently surfaced by CXE PMs but not addressed before GA.

## Author

**Nishant Desae** — Sr. CX Engineering Manager  
20+ years across Microsoft R&D India, Adobe, Symantec  
[LinkedIn](https://linkedin.com/in/nishantdesae) · [GitHub](https://github.com/nidesae)
