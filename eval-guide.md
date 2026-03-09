# The Complete Guide to Uniform Violations
### A Field Manual for Understanding AI Evals — Explained Through the Lens of a School Dress Code

> *A definitive handbook for understanding why perfectly compliant students still end up in the principal's office — and what that has to do with your AI evals.*

---

## The Cast

| School Role | Eval Equivalent |
|---|---|
| **Student** | The model's output (the response) |
| **Uniform** | The prompt / the response being evaluated |
| **Principal Eval** | The evaluator (automated or human judge) |
| **The Handbook** | The eval rubric |
| **Student's copy of the rules** | The model's system instructions / prompt |

---

## Chapter 1: The Basics

### ✅ A Passing Day
**Tag:** `BASELINE`

**The Setup:** The handbook says: wear a blue shirt. The student wears a blue shirt.

**What Happens:** Principal Eval checks the shirt. It's blue. Student passes. Everyone goes home.

**The Lesson:** This is the happy path. A well-specified rubric catches a compliant output. The system works exactly as intended.

**In Eval Terms:** Clear criteria + compliant model output = correct pass. Your rubric is doing its job.

---

### ❌ A Failing Day
**Tag:** `BASELINE`

**The Setup:** The handbook says: wear a blue shirt. The student wears a red shirt.

**What Happens:** Principal Eval checks the shirt. It's red. Student fails. Gets sent home to change.

**The Lesson:** Also the happy path — but for failures. The eval caught a real violation. This is exactly what you want.

**In Eval Terms:** Clear criteria + non-compliant output = correct fail. Signal is working.

---

## Chapter 2: Rubric Problems
*When the handbook is the problem*

### 📞 Sister Mary Calls
**Tag:** `UNDERSPECIFIED CRITERIA`

**The Setup:** The handbook says: wear a blue shirt. Hundreds of kids show up. Navy, powder blue, teal, cobalt, sky blue, slate.

**What Happens:** Principal Eval passes every single one. Technically correct. Sister Mary calls from across the street, furious — the school looks like a color swatch book.

**The Lesson:** The model isn't wrong. The rubric is. "Blue shirt" allowed every valid interpretation of blue. The criteria didn't capture what anyone actually wanted.

**In Eval Terms:** This is how bad responses reach users. The model satisfied the eval. The eval just wasn't asking the right thing.

---

### 🔍 The Shirt Inquisition
**Tag:** `OVERSPECIFIED CRITERIA`

**The Setup:** The handbook says: Royal Blue, Pantone 286 C, 100% cotton, no pockets, French collar.

**What Happens:** A student shows up in a perfectly professional, clearly school-appropriate blue shirt. It has a pocket. Principal Eval fails them. Parents are furious. The kid looks great.

**The Lesson:** Over-specification breaks things that actually work. The rubric is now optimizing for the letter of the law, not the spirit. You're generating false negatives.

**In Eval Terms:** An eval that's too strict creates noise and erodes trust. Engineers start ignoring the results — which is worse than having no eval at all.

---

### 🤷 What Does "Neat" Mean?
**Tag:** `AMBIGUOUS CRITERIA`

**The Setup:** The handbook says: students must maintain a neat and professional appearance.

**What Happens:** Principal Eval has to rule on "neat." Two principals on the same hallway are giving wildly different verdicts on the same students. Nobody knows what the rubric actually means.

**The Lesson:** Squishy criteria without anchoring examples aren't criteria — they're vibes. A rubric has to define the bar, not just name the dimension.

**In Eval Terms:** This is why eval rubrics need examples, not just labels. "4 out of 5 for helpfulness" means nothing without showing what a 4 looks like vs a 3.

---

### ⚔️ The Handbook Civil War
**Tag:** `CONTRADICTORY CRITERIA`

**The Setup:** Chapter 3: blue shirts required. Chapter 7: no solid colors during Spirit Week.

**What Happens:** It's Spirit Week. A student wears a solid blue shirt. Principal Eval has to pick a rule. Depending on which chapter they read first, the student passes or fails.

**The Lesson:** Conflicting rubric criteria create random, inconsistent verdicts. This gets worse when multiple teams contribute to the eval suite over time without coordination.

**In Eval Terms:** Your eval suite needs governance. As it grows, criteria will conflict — especially across teams or time. Someone has to own the handbook.

---

### 📜 The 1985 Handbook
**Tag:** `RUBRIC DRIFT`

**The Setup:** The handbook was written in 1985. A student shows up in something that didn't exist in 1985. The handbook has no guidance.

**What Happens:** Principal Eval has no precedent to check against. They make a judgment call based on nothing. It's arbitrary. It's inconsistent. It might be wrong.

**The Lesson:** Your rubric was calibrated on yesterday's outputs. As the model or user population changes, the rubric stops reflecting reality. This is distribution shift in disguise.

**In Eval Terms:** Rubrics need regular review. If your model has been updated, your user base has grown, or your product has changed — the rubric might be evaluating a world that no longer exists.

---

## Chapter 3: Principal Problems
*When the evaluator is the problem*

### 😊 Principal Yes-Man
**Tag:** `EVAL TOO LENIENT`

**The Setup:** Principal Eval passes basically everyone. Great kid. Good effort. Blue-ish. Sure, pass.

**What Happens:** The eval produces almost no failures. Leadership sees 98% pass rate. Declares victory. Meanwhile students are wearing whatever they want.

**The Lesson:** An eval that always passes is not a safety net — it's a blindfold. High pass rates feel good but they're only meaningful if the eval is actually discriminating.

**In Eval Terms:** If your eval never fails anything, it has no signal. Check your pass rate distribution — if it's too skewed, the eval isn't doing its job.

---

### 😤 Principal Nightmare
**Tag:** `EVAL TOO STRICT`

**The Setup:** Principal Eval fails 40% of students daily. Many of them look completely fine. Parents are calling. Teachers are confused.

**What Happens:** The team starts ignoring the eval results because they don't trust them. The eval becomes noise. Real violations slip through because nobody's watching anymore.

**The Lesson:** An eval that cries wolf destroys trust in the entire system. False positives are not harmless — they cause people to discount real failures.

**In Eval Terms:** Precision matters as much as recall. If your eval surfaces too many false positives, people will stop acting on it — including on the real ones.

---

### 👀 The Substitute
**Tag:** `INTER-RATER RELIABILITY`

**The Setup:** Same students. Same handbook. Different principal. Wildly different results.

**What Happens:** Monday's principal passes a certain look. Wednesday's substitute fails it. The students are the same. The rubric is the same. The verdicts are not.

**The Lesson:** This is inter-rater reliability — and it's the core problem with LLM-as-judge evals. Two models reading the same rubric will not always agree. Neither will two humans.

**In Eval Terms:** You need calibration before your eval goes live. Have multiple evaluators score the same outputs and compare. If they disagree too much, the rubric needs work.

---

### 😏 The Charming Student
**Tag:** `EVAL SENSITIVITY TO FRAMING`

**The Setup:** A student gets stopped. They argue confidently: "This is technically blue." The principal reconsiders. Changes their ruling.

**What Happens:** Students learn that how you present yourself matters more than what you're wearing. The eval is now measuring persuasion, not compliance.

**The Lesson:** Evals that can be talked out of their verdicts are measuring the wrong thing. This is especially dangerous in LLM-as-judge setups where the framing of the eval prompt changes the outcome.

**In Eval Terms:** Your judge prompt is part of the rubric. If changing the wording of your eval prompt changes your results significantly, your eval is fragile.

---

## Chapter 4: Coverage Problems
*What you don't check, you don't catch*

### 📅 The Monday Principal
**Tag:** `SAMPLING GAPS`

**The Setup:** Principal Eval shows up every Monday. Checks uniforms. Goes home.

**What Happens:** Students wear whatever they want Tuesday through Friday. The Monday eval is technically passing. The school is a mess the other four days.

**The Lesson:** Sampling matters. If you're only running evals on a slice of your outputs — especially a non-representative slice — you have blind spots you don't know about.

**In Eval Terms:** Check when and how often your evals run. A high pass rate on 5% of traffic doesn't tell you much about the other 95%.

---

### 👕 Shirts Only
**Tag:** `COVERAGE GAPS`

**The Setup:** Principal Eval checks shirts rigorously. Never looks down. Half the school is in pajama pants.

**What Happens:** Shirts: perfect. Pants: chaos. The eval passes everything because it only knows how to check one thing.

**The Lesson:** Your eval suite is only as good as what it measures. Tone, format, accuracy, safety, helpfulness — if you're not running separate evals for each, you have unmeasured dimensions.

**In Eval Terms:** An eval suite needs coverage across every quality dimension that matters to your product. You can't infer one from another.

---

### 🚪 The Back Hallway
**Tag:** `UNSEEN TRAFFIC`

**The Setup:** The principal inspects the main entrance. The back hallway has its own entrance that nobody's watching.

**What Happens:** Students who know about the back hallway use it. They're never checked. They could be wearing anything.

**The Lesson:** There are always edge cases, unusual inputs, or user populations that fall outside your eval coverage. If you've only tested one kind of input, you only know about one kind of output.

**In Eval Terms:** Adversarial inputs, edge cases, and underrepresented user flows are your back hallway. You need deliberate testing of the paths you're not watching.

---

## Chapter 5: Severity & Triage
*Not all violations are equal*

### 🩱 A Missing Button vs. a Swimsuit
**Tag:** `SEVERITY CALIBRATION`

**The Setup:** Student A has a missing button. Student B showed up in a swimsuit. The rubric marks both as "uniform violation."

**What Happens:** The dashboard shows two violations. They look the same. They are not the same.

**The Lesson:** Binary pass/fail evals flatten severity. You lose the signal that tells you which failures actually matter and which are noise.

**In Eval Terms:** Your eval should capture severity, not just pass/fail. A factual error is not the same as a mildly awkward phrasing. Weight your failures accordingly.

---

### 📋 Death by Minor Violations
**Tag:** `AGGREGATE QUALITY`

**The Setup:** Student A: perfect except for one wrong shade of blue. Student B: shirt right, pants wrong, shoes wrong, belt wrong, bag wrong.

**What Happens:** Student A has one violation. Student B has five. But your rubric treats them the same — one check per criterion.

**The Lesson:** Aggregate quality matters. A response that's slightly off on five dimensions may be worse than one that fails hard on one dimension. Context determines which is the real problem.

**In Eval Terms:** Composite scores need weighting logic. Think about what a failing combination looks like, not just whether any single criterion fails.

---

## Chapter 6: Goodhart's Law
*When students learn to beat the principal*

### 🎯 Teaching to the Test
**Tag:** `GOODHART'S LAW`

**The Setup:** Students figure out the principal only checks three things: collar, cuffs, and front of shirt.

**What Happens:** Students optimize exactly for those three things. The back of their shirts look like they slept in them. They always pass.

**The Lesson:** When a measure becomes a target, it ceases to be a good measure. This is Goodhart's Law, and it's one of the most dangerous failure modes in eval design.

**In Eval Terms:** If your model is trained or fine-tuned using eval scores as signal, it will eventually optimize for the eval — not the underlying quality. Your eval needs to evolve alongside the model.

---

### 🧑‍⚖️ Technically Compliant
**Tag:** `LETTER VS. SPIRIT`

**The Setup:** A student reads the handbook carefully. Finds every loophole. Shows up in something that satisfies every written criterion — but clearly shouldn't.

**What Happens:** Principal Eval passes them. Every criterion checked. Every box ticked. The student looks absurd. The system looks broken.

**The Lesson:** Criteria capture what you wrote, not what you meant. If the spirit of the requirement isn't embedded in the rubric, a compliant-but-wrong output will always find its way through.

**In Eval Terms:** This is why eval rubrics need intent documentation alongside criteria. What are you actually trying to measure? Write that down too.

---

## Chapter 7: Meta Problems
*The handbook itself has problems*

### 🏛️ Written from the Ivory Tower
**Tag:** `RUBRIC DESIGN FLAW`

**The Setup:** The handbook was written by administrators who have never actually stood in the hallway and watched students walk by.

**What Happens:** The rubric sounds reasonable on paper. In practice, it catches the wrong things, misses the obvious things, and confuses the principals who have to enforce it.

**The Lesson:** Rubrics written without grounding in real outputs are guesswork. Good rubric design requires looking at actual examples — good ones, bad ones, edge cases — before writing a single criterion.

**In Eval Terms:** Before writing an eval rubric, collect examples of the kinds of outputs you're worried about. Let the rubric be informed by reality, not by theory.

---

### 📬 Nobody Read the Update
**Tag:** `VERSION DRIFT`

**The Setup:** The handbook was updated. The memo went out. Most principals are still running on last year's version.

**What Happens:** Some principals are enforcing the old rules. Some are enforcing the new ones. Students are getting inconsistent verdicts. Nobody knows which version is authoritative.

**The Lesson:** Eval infrastructure needs version control and deployment discipline. An updated rubric that isn't deployed is an update that doesn't exist.

**In Eval Terms:** Treat your eval rubrics like code. Version them. Deploy them. Know which version is running in which environment.

---

### 💥 The Update That Broke Everything
**Tag:** `EVAL REGRESSION`

**The Setup:** A rubric update fixes a problem with blue hoodies. Suddenly 200 previously passing students are failing — for things that were never a problem.

**What Happens:** The team scrambles to understand why pass rates dropped. Half the new failures are legitimate. Half are artifacts of the update.

**The Lesson:** Rubric changes are deployments. They need regression testing. If you don't know what was passing before, you can't tell if a new failure is signal or breakage.

**In Eval Terms:** Run your new rubric against historical data before deploying it. A change that improves one thing while tanking another isn't an improvement.

---

## Quick Reference: Failure Mode Taxonomy

| Category | What Can Go Wrong | Consequence |
|---|---|---|
| **Rubric** | Under-spec, over-spec, ambiguity, contradictions, drift | Bad responses pass; good responses fail |
| **Evaluator** | Too lenient, too strict, inconsistent, gameable | Signal loss; trust erosion |
| **Coverage** | Sampling gaps, dimension gaps, unseen traffic | Unknown unknowns |
| **Severity** | Binary only, no weighting | Can't triage; noise drowns signal |
| **Optimization** | Goodhart effects, letter vs. spirit | Model learns to cheat the eval |
| **Meta / Infra** | Theory-written rubrics, version drift, regression | Systemic rot over time |

---

*Hallbrook Academy • Model UX Division • Principal Eval does not accept appeals*
