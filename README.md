# The Complete Guide to Uniform Violations

### AI Evals, explained through a school dress code

An interactive reference guide for understanding how AI evaluation systems work, fail, and can be improved — built for non-technical stakeholders using the extended metaphor of a school uniform policy.

**Live site:** *https://eval-guide.vercel.app/*

---

## The Metaphor

| School               | Evals                              |
| -------------------- | ---------------------------------- |
| Student              | Model output                       |
| Uniform              | The response being evaluated       |
| Principal Eval       | The evaluator (automated or human) |
| The Handbook         | The eval rubric                    |
| Student's rules copy | Model system instructions          |

---

## What's Covered

- **Chapter 1 — The Basics:** What passing and failing should look like
- **Chapter 2 — Rubric Problems:** Under-specified, over-specified, ambiguous, contradictory, and outdated criteria
- **Chapter 3 — Principal Problems:** Lenient evals, strict evals, inter-rater reliability, eval sensitivity to framing
- **Chapter 4 — Coverage Problems:** Sampling gaps, dimension gaps, unseen traffic
- **Chapter 5 — Severity & Triage:** Binary evals, aggregate quality, weighting
- **Chapter 6 — Goodhart's Law:** Teaching to the test, letter vs. spirit
- **Chapter 7 — Meta Problems:** Theory-written rubrics, version drift, regression

---

## Running Locally

```bash
npm install
npm start
```

## Deploying to Vercel

1. Push this repo to GitHub
2. Go to [vercel.com](https://vercel.com) → New Project → Import your repo
3. Vercel will auto-detect Create React App — no configuration needed
4. Hit Deploy

---

## Contributing

Want to add a scenario? Each scenario follows this structure in `src/EvalGuide.jsx`:

```js
{
  id: "your-scenario-id",
  title: "Scenario Title",
  icon: "🎯",
  tag: "FAILURE MODE TAG",
  setup: "The situation being described.",
  what_happens: "What Principal Eval does.",
  the_lesson: "What this illustrates.",
  eval_translation: "How this maps to real eval problems.",
}
```

Add it to the appropriate chapter's `scenarios` array and add your tag to the `tagColors` object.

---

St. Sbice's Academy for Wayward Content Designers • Model UX Division • Principal Eval does not accept appeals\_
