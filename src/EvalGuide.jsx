import { useState } from "react";

const scenarios = [
  {
    id: "foundation",
    chapter: "Chapter 1",
    title: "The Basics",
    subtitle: "What even is an eval?",
    color: "#1a472a",
    accent: "#4ade80",
    scenarios: [
      {
        id: "passing",
        title: "A Passing Day",
        icon: "✅",
        tag: "BASELINE",
        setup: "The handbook says: wear a blue shirt. The student wears a blue shirt.",
        what_happens: "Principal Eval checks the shirt. It's blue. Student passes. Everyone goes home.",
        the_lesson: "This is the happy path. A well-specified rubric catches a compliant output. The system works exactly as intended.",
        eval_translation: "Clear criteria + compliant model output = correct pass. Your rubric is doing its job.",
      },
      {
        id: "failing",
        title: "A Failing Day",
        icon: "❌",
        tag: "BASELINE",
        setup: "The handbook says: wear a blue shirt. The student wears a red shirt.",
        what_happens: "Principal Eval checks the shirt. It's red. Student fails. Gets sent home to change.",
        the_lesson: "Also the happy path — but for failures. The eval caught a real violation. This is exactly what you want.",
        eval_translation: "Clear criteria + non-compliant output = correct fail. Signal is working.",
      },
    ],
  },
  {
    id: "rubric",
    chapter: "Chapter 2",
    title: "Rubric Problems",
    subtitle: "When the handbook is the problem",
    color: "#7c2d12",
    accent: "#fb923c",
    scenarios: [
      {
        id: "underspecified",
        title: "Sister Mary Calls",
        icon: "📞",
        tag: "UNDERSPECIFIED CRITERIA",
        setup: "The handbook says: wear a blue shirt. Hundreds of kids show up. Navy, powder blue, teal, cobalt, sky blue, slate.",
        what_happens: "Principal Eval passes every single one. Technically correct. Sister Mary calls from across the street, furious — the school looks like a color swatch book.",
        the_lesson: "The model isn't wrong. The rubric is. 'Blue shirt' allowed every valid interpretation of blue. The criteria didn't capture what anyone actually wanted.",
        eval_translation: "This is how bad responses reach users. The model satisfied the eval. The eval just wasn't asking the right thing.",
      },
      {
        id: "overspecified",
        title: "The Shirt Inquisition",
        icon: "🔍",
        tag: "OVERSPECIFIED CRITERIA",
        setup: "The handbook says: Royal Blue, Pantone 286 C, 100% cotton, no pockets, French collar.",
        what_happens: "A student shows up in a perfectly professional, clearly school-appropriate blue shirt. It has a pocket. Principal Eval fails them. Parents are furious. The kid looks great.",
        the_lesson: "Over-specification breaks things that actually work. The rubric is now optimizing for the letter of the law, not the spirit. You're generating false negatives.",
        eval_translation: "An eval that's too strict creates noise and erodes trust. Engineers start ignoring the results — which is worse than having no eval at all.",
      },
      {
        id: "ambiguous",
        title: "What Does 'Neat' Mean?",
        icon: "🤷",
        tag: "AMBIGUOUS CRITERIA",
        setup: "The handbook says: students must present as 'neat, professional, and approachable.' That's it. Three adjectives. No examples, no anchors, no definition of where the bar is.",
        what_happens: "Principal Eval has to rule on 'neat' and 'approachable' for every student. Two principals on the same hallway are giving wildly different verdicts. Nobody knows what the rubric actually means because nobody wrote down what it means.",
        the_lesson: "Squishy criteria without anchoring examples aren't criteria — they're vibes. A rubric has to define the bar, not just name the dimension. Naming the dimension and defining it are two completely different things.",
        eval_translation: "This happens constantly with voice and tone rubrics. 'Conversational, empathetic, and empowering' sounds like a rubric. It isn't — it's three adjectives doing the work of a document nobody attached. Your eval will interpret those words based on general training data, not your brand standards. If the actual guidance lives in a doc that was never included in the pipeline, your eval is guessing.",
      },
      {
        id: "contradictory",
        title: "The Handbook Civil War",
        icon: "⚔️",
        tag: "CONTRADICTORY CRITERIA",
        setup: "Chapter 3: blue shirts required. Chapter 7: no solid colors during Spirit Week.",
        what_happens: "It's Spirit Week. A student wears a solid blue shirt. Principal Eval has to pick a rule. Depending on which chapter they read first, the student passes or fails. The verdict is arbitrary — determined by order, not by intent.",
        the_lesson: "Conflicting rubric criteria create random, inconsistent verdicts. This gets worse as your eval suite grows and different teams contribute criteria at different times without coordinating.",
        eval_translation: "Your eval suite needs governance. Criteria will conflict — especially across teams or over time. Someone has to own the handbook and read it end to end before it ships.",
      },
      {
        id: "outdated",
        title: "The 1985 Handbook",
        icon: "📜",
        tag: "RUBRIC DRIFT",
        setup: "The handbook was written in 1985. A student shows up in something that didn't exist in 1985 — a performance hoodie, smart casual sneakers, a gender-neutral blazer. The handbook has no guidance.",
        what_happens: "Principal Eval has no precedent to check against. They make a judgment call based on nothing. It's arbitrary, inconsistent, and might be wrong — not because they're bad at their job, but because the rubric was never built for this.",
        the_lesson: "Your rubric was calibrated on yesterday's outputs. As the model, the product, or the user population changes, the rubric stops reflecting reality. It keeps evaluating confidently against a world that no longer exists.",
        eval_translation: "Rubrics need regular review. If your model has been updated, your user base has grown, or your product has changed — check whether your criteria still map to what you actually care about.",
      },
      {
        id: "photograph",
        title: "The Photograph",
        icon: "📸",
        tag: "STALE GROUND TRUTH",
        setup: "On the first day of school, a student wore a perfect uniform. Someone took a photo. Now that photo is the reference — every student, every day, is evaluated against it. Including during Spirit Week. Including after the handbook was updated. Including on a day when the dress code was relaxed for a field trip.",
        what_happens: "The photo is accurate. The photo is high quality. The photo is from September. It is now March. Principal Eval checks every student against the September photo and produces confident, consistent, completely unreliable verdicts.",
        the_lesson: "A correct answer at one point in time is not a correct answer forever — especially when the underlying data is dynamic. The reference looked authoritative, so everyone trusted it. That's exactly what made it dangerous.",
        eval_translation: "Ground truth has to be generated at eval time, not borrowed from a previous run. If your data changes — financial figures, live metrics, anything dynamic — pasting a past response as ground truth means you're evaluating today's outputs against yesterday's world. The eval will pass things that are wrong and fail things that are right, with complete confidence, and no one will know.",
      },
    ],
  },
  {
    id: "principal",
    chapter: "Chapter 3",
    title: "Principal Problems",
    subtitle: "When the evaluator is the problem",
    color: "#1e1b4b",
    accent: "#818cf8",
    scenarios: [
      {
        id: "lenient",
        title: "Principal Yes-Man",
        icon: "😊",
        tag: "EVAL TOO LENIENT",
        setup: "Principal Eval passes basically everyone. Great kid. Good effort. Blue-ish. Sure, pass.",
        what_happens: "The eval produces almost no failures. Leadership sees 98% pass rate. Declares victory. Meanwhile students are wearing whatever they want.",
        the_lesson: "An eval that always passes is not a safety net — it's a blindfold. High pass rates feel good but they're only meaningful if the eval is actually discriminating.",
        eval_translation: "If your eval never fails anything, it has no signal. Check your pass rate distribution — if it's too skewed, the eval isn't doing its job.",
      },
      {
        id: "strict",
        title: "Principal Nightmare",
        icon: "😤",
        tag: "EVAL TOO STRICT",
        setup: "Principal Eval fails 40% of students daily. Many of them look completely fine. A pressed white shirt gets flagged because the collar has a slight spread. Black shoes fail because they have a subtle brogue pattern. Parents are calling. Teachers are baffled.",
        what_happens: "The team starts ignoring the eval results because they don't trust them. The eval becomes noise. Real violations slip through because nobody's watching anymore.",
        the_lesson: "An eval that cries wolf destroys trust in the entire system. False positives are not harmless — they cause people to discount real failures.",
        eval_translation: "Precision matters as much as recall. If your eval surfaces too many false positives, people will stop acting on it — including on the real ones.",
      },
      {
        id: "moody",
        title: "Moody Principal",
        icon: "🌦️",
        tag: "EVAL CONSISTENCY",
        setup: "A student wears the same outfit every single day: a navy zip-up over a white collared shirt. Monday: Principal Eval sees the collar, notes the clean presentation, passes them. Tuesday: same student, same outfit — Principal Eval sees the zip-up, calls it a hoodie, sends them home.",
        what_happens: "The student is baffled. Nothing changed. The handbook didn't change. The principal didn't change. The verdict did. Nobody can explain why.",
        the_lesson: "Without explicit anchors in the rubric — 'a zip-up worn over a collared shirt is compliant' — judgment calls produce variance even from the same evaluator. This is called intra-rater reliability (AKA eval consistency), a close cousin of inter-rater reliability, which is when two different evaluators disagree on the same output. Both problems have the same root cause: a rubric that leaves too much room for interpretation.",
        eval_translation: "LLM-as-judge evals are not deterministic. The same model, reading the same rubric, evaluating the same output, can return different verdicts on different runs. The fix is not a better judge — it's a rubric with tighter anchors that leaves less room for drift.",
      },
      {
        id: "overruled",
        title: "Overruled!",
        icon: "⚖️",
        tag: "EXTERNAL OVERRIDE",
        setup: "A student arrives wearing a small Star of David. The handbook says: no jewelry. Principal Eval checks the handbook. Jewelry: present. Fails the student.",
        what_happens: "The school's legal counsel calls. Federal law protects religious expression. The failure gets overturned. Principal Eval had no idea this constraint existed — it wasn't in the handbook, it wasn't in the rubric, it wasn't anywhere in the system.",
        the_lesson: "Some rules exist entirely outside the rubric. Principal Eval followed its instructions perfectly and still got it wrong — because the rubric wasn't built to know what it didn't know. No amount of rubric tightening fixes this. You need an escalation path for cases that fall outside what the rubric was designed to judge.",
        eval_translation: "Your eval will confidently fail outputs that fall into protected, exceptional, or context-dependent categories it was never designed to handle. Without a mechanism for 'this is outside my scope — escalate for human review,' those failures look like signal. They aren't.",
      },
      {
        id: "halo",
        title: "The Halo Effect",
        icon: "✨",
        tag: "HALO EFFECT",
        setup: "A student shows up in a cool steel-grey shirt. Every other student rolls their eyes — it's grey, dude. But it's pressed. Tucked. Shoes shined. Collar perfect. The overall presentation is immaculate.",
        what_happens: "Principal Eval runs down the checklist. The shirt criterion says blue. The shirt is grey. But everything else is so sharp that the overall impression overrides the specific violation. Pass.",
        the_lesson: "A strong overall impression can mask a specific failure. The eval didn't lie — the student did look great. But 'looks great' wasn't the rubric. 'Blue shirt' was the rubric, and that criterion quietly got overridden by the gestalt.",
        eval_translation: "A confident, well-structured, articulate response will pass even when it gets the facts wrong — if your rubric doesn't isolate criteria cleanly enough. The model aced the presentation. The content was off. Your eval missed it entirely because it was dazzled by the collar.",
      },
    ],
  },
  {
    id: "coverage",
    chapter: "Chapter 4",
    title: "Coverage Problems",
    subtitle: "What you don't check, you don't catch",
    color: "#164e63",
    accent: "#22d3ee",
    scenarios: [
      {
        id: "monday",
        title: "The Monday Principal",
        icon: "📅",
        tag: "SAMPLING GAPS",
        setup: "Principal Eval shows up every Monday. Checks uniforms. Goes home.",
        what_happens: "Students wear whatever they want Tuesday through Friday. The Monday eval is technically passing. The school is a mess the other four days.",
        the_lesson: "Sampling matters. If you're only running evals on a slice of your outputs — especially a non-representative slice — you have blind spots you don't know about.",
        eval_translation: "Check when and how often your evals run. A high pass rate on 5% of traffic doesn't tell you much about the other 95%.",
      },
      {
        id: "shirts-only",
        title: "Shirts Only",
        icon: "👕",
        tag: "COVERAGE GAPS",
        setup: "Principal Eval checks shirts rigorously. Never looks down. Half the school is in pajama pants.",
        what_happens: "Shirts: perfect. Pants: chaos. The eval passes everything because it only knows how to check one thing.",
        the_lesson: "Your eval suite is only as good as what it measures. Tone, format, accuracy, safety, helpfulness — if you're not running separate evals for each dimension, you have unmeasured blind spots.",
        eval_translation: "An eval suite needs coverage across every quality dimension that matters to your product. You can't infer one from another.",
      },
      {
        id: "jamie",
        title: "Why Did No One Catch This?",
        icon: "🤦",
        tag: "UNEXAMINED ASSUMPTION",
        setup: "Principal Eval runs at 8AM sharp at the front entrance. Airtight system. Meanwhile, Jamie strolls in forty minutes late wearing a band tee, ripped jeans, and slides. Teachers are furious. Principal Eval is livid — but not at Jamie. At the system. 'Why did no one check them?'",
        what_happens: "The front office shrugs. They assumed Principal Eval had it covered. Principal Eval assumed the front office checked late arrivals. Jamie assumed nobody was watching. Jamie has been doing this for weeks. Maybe months. The front entrance numbers look perfect. Late arrivals don't exist in any report.",
        the_lesson: "The most dangerous gaps aren't the ones nobody thought of. They're the ones everybody assumed were covered. Nobody explicitly decided not to check late arrivals. Nobody decided to check them either. It was just assumed — because the system was designed around students who arrived on time.",
        eval_translation: "Your eval was designed around assumptions about how users behave — not how they actually behave. Real users ask messy, half-formed, unexpected questions. If your test set was built from clean, ideal inputs, you've never met your actual user. And if a bad response gets through, the answer to 'why did no one catch this?' is usually: because no one wrote it down.",
      },
    ],
  },
  {
    id: "severity",
    chapter: "Chapter 5",
    title: "Severity & Triage",
    subtitle: "Not all violations are equal",
    color: "#422006",
    accent: "#fbbf24",
    scenarios: [
      {
        id: "swimsuit",
        title: "A Missing Button vs. a Swimsuit",
        icon: "🩱",
        tag: "SEVERITY CALIBRATION",
        setup: "Student A has a missing button on their cuff. Student B showed up in a swimsuit. The rubric marks both as 'uniform violation.'",
        what_happens: "The dashboard shows two violations. They look identical. They are not identical. One is a rounding error. One is a fire. The rubric cannot tell the difference — because it only knows pass or fail.",
        the_lesson: "Binary pass/fail evals flatten severity. A slightly un-empathetic word choice is not the same as a factually wrong account balance. But if your rubric only has two settings, they look the same on the dashboard. You lose the signal that tells you which failures actually matter.",
        eval_translation: "Binary works for correctness — did the model return the right number? But subjective dimensions like tone, empathy, and clarity are not yes/no questions. Forcing them into binary flattens everything. A rubric that can't express degree can't tell you how bad a failure actually is.",
      },
      {
        id: "accumulation",
        title: "Death by Minor Violations",
        icon: "📋",
        tag: "AGGREGATE QUALITY",
        setup: "Student A: perfect uniform except one slightly wrong shade of blue on their shirt. Student B: shirt technically correct, but pants wrong, shoes wrong, belt wrong, bag wrong — five separate violations.",
        what_happens: "Student A has one violation. Student B has five. The rubric treats them identically — one check per criterion, no weighting, no aggregation.",
        the_lesson: "Aggregate quality matters. A response that's slightly off on five dimensions may be a worse experience than one that fails hard on a single one. Context determines which is the real problem — and a flat rubric has no way to capture that.",
        eval_translation: "Composite scores need weighting logic. Think about what a failing combination looks like, not just whether any individual criterion fails.",
      },
      {
        id: "checklist",
        title: "The Checklist That Fights Itself",
        icon: "📑",
        tag: "CONFLICTING DIMENSIONS",
        setup: "Principal Eval has a checklist. Item 4: uniform must be complete — shirt, tie, blazer, trousers, belt, shoes, bag, all present. Item 7: uniform must not be excessive or cumbersome — students should move freely and comfortably. A student shows up in the full uniform. Every required item present. They look like they're about to chair a board meeting.",
        what_happens: "Item 4: ✅ Pass. Item 7: ❌ Fail. For the exact same outfit. For the exact same reason. Principal Eval marks it down faithfully. The student is told to fix it. There is nothing to fix.",
        the_lesson: "A checklist whose items contradict each other doesn't have a correct answer. No version of this outfit satisfies both criteria simultaneously — because nobody who wrote the checklist ever read items 4 and 7 in the same sitting.",
        eval_translation: "Completeness and relevance. Comprehensive and brief. Warm and professional. These pairs are in direct tension by design. If your rubric doesn't acknowledge that tension and define the acceptable middle ground, your judges will fight each other on every response — and every response will lose. This is especially common when multiple LLM judges run in isolation, each optimizing for their own dimension without awareness of the others.",
      },
    ],
  },
  {
    id: "gaming",
    chapter: "Chapter 6",
    title: "Goodhart's Law",
    subtitle: "When students learn to beat the principal",
    color: "#3b0764",
    accent: "#c084fc",
    scenarios: [
      {
        id: "gaming-eval",
        title: "Teaching to the Test",
        icon: "🎯",
        tag: "GOODHART'S LAW",
        setup: "Students figure out that Principal Eval only checks three things: collar, cuffs, and the front of the shirt. Always in that order. Always only those three.",
        what_happens: "Students optimize exactly for those three things. Collars: crisp. Cuffs: spotless. Front: perfect. The back of the shirt has an iron-shaped burn mark. There's a hole in the seat of the pants. They always pass. Any teacher walking behind them is horrified. Principal Eval never walks behind anyone.",
        the_lesson: "When a measure becomes a target, it ceases to be a good measure. This is Goodhart's Law — one of the most dangerous failure modes in eval design, because the scores keep going up while quality quietly deteriorates.",
        eval_translation: "If your model is fine-tuned using eval scores as signal, it will eventually learn to optimize for the eval — not for the underlying quality. Your eval needs to evolve alongside the model, or you end up measuring how well the model learned to game the test.",
      },
      {
        id: "inside-out",
        title: "Inside Out",
        icon: "👔",
        tag: "MINIMUM VIABLE ANSWER",
        setup: "A student shows up in a perfectly complete uniform. Shirt, tie, blazer, trousers, belt, shoes. Every item present. Every criterion technically met. The shirt is inside out. The blazer is inside out.",
        what_happens: "Principal Eval runs down the checklist. Shirt ✅ Tie ✅ Blazer ✅ Trousers ✅ Belt ✅ Shoes ✅. Pass. Every teacher in the hallway does a double take. The student looks bizarre. Principal Eval sees nothing wrong because nothing on the checklist covers which way round it goes.",
        the_lesson: "The rubric checked for presence, not orientation. It confirmed all the ingredients were there without asking whether they were assembled in a way that was actually useful to the person standing in front of you.",
        eval_translation: "'Your cash flow is negative because you spent more than came in this week' is inside out. All the right information is present. It's facing the wrong direction. Anyone could have told you that. The rubric never asked: does this actually help the person who asked? That's the question that needs to be in the rubric.",
      },
    ],
  },
  {
    id: "meta",
    chapter: "Chapter 7",
    title: "Meta Problems",
    subtitle: "The handbook itself has problems",
    color: "#0f172a",
    accent: "#94a3b8",
    scenarios: [
      {
        id: "boys-school",
        title: "The Boys' School Handbook",
        icon: "🏛️",
        tag: "UNREPRESENTED POPULATION",
        setup: "The handbook was written when St. Sbice's was an all-boys school. It's thorough, detailed, and comprehensive — for boys. Saddle shoes, trouser break, tie knot specifications, blazer button rules. All covered. The school went co-ed six years ago. The handbook was never updated.",
        what_happens: "Principal Eval does their best with the girls' uniforms. They can tell a proper blouse from a crop top. But there's no defined hem length, no guidance on acceptable necklines, no criteria for skirts vs dresses. They're improvising against a rubric that was never built for this population — and producing inconsistent, arbitrary verdicts for students who are doing everything right.",
        the_lesson: "The rubric isn't malicious — it's incomplete by design. It was built for one population and applied universally. The students it wasn't built for get evaluated on vibes.",
        eval_translation: "Your rubric was built on outputs that reflect a particular kind of user, query, or context. Everyone else gets evaluated on best guesses. If your product serves a broader or different population than the one your rubric was designed around, you have unmeasured gaps — and they're invisible until something goes wrong.",
      },
      {
        id: "which-handbook",
        title: "Which Handbook Are We On?",
        icon: "📚",
        tag: "VERSION DRIFT",
        setup: "There have been three versions of the handbook. v1.0: blue shirts, saddle shoes, no hoodies. v1.5: white shirts, saddle shoes, hoodies permitted in winter. v2.0: white shirts, trainers permitted, hoodies year-round. Nobody announced when each version went into effect. Nobody knows which principals are running which version.",
        what_happens: "Same student, same outfit, three completely different verdicts depending on which principal catches them in the hallway. Students are getting sent home for being compliant. Students are passing in outfits that violate the current rules. Nobody — not the students, not the teachers, not leadership — knows which version is authoritative.",
        the_lesson: "Without version control and a clear source of truth, your eval infrastructure degrades silently. Historical data becomes untrustworthy — you can't tell whether a past pass or fail reflects the current standard or a standard that was retired two iterations ago.",
        eval_translation: "Treat your eval rubrics like code. Version them. Document when they changed and why. Know which version is running in which environment. If you don't know which rubric generated a verdict, you can't trust any of your historical data.",
      },
      {
        id: "left-right",
        title: "The Left Hand and the Right Hand",
        icon: "🤝",
        tag: "MISALIGNED SOURCES",
        setup: "The school issues new pastoral guidance: students should look approachable and warm — untuck your shirt slightly, lose the tie, look human. The handbook still says: shirts tucked, ties required, formal presentation mandatory. Nobody checked whether the new guidance was compatible with the existing rules.",
        what_happens: "A student follows the new pastoral guidance perfectly. Principal Eval immediately fails them for being out of uniform. The student did everything right. Two documents, written by two different teams at two different times, are pulling in opposite directions — and nobody noticed because they were never read in the same room.",
        the_lesson: "Two authoritative sources that have never been reconciled will produce unwinnable situations. The problem isn't the student, and it isn't the principal. It's that no one asked: do these two documents agree?",
        eval_translation: "This happens when a prompt is updated to reflect new brand guidance — warmer, more empathetic, more human — and the eval rubric still flags that warmth as 'emotionally manipulative.' The prompt and the rubric were written by different people, at different times, with different ideas of what good looks like. Until someone puts them in the same room, they'll keep fighting.",
      },
      {
        id: "regression",
        title: "The Update That Broke Everything",
        icon: "💥",
        tag: "EVAL REGRESSION",
        setup: "The committee finally updates the handbook to address hem length — a real problem that needed fixing. The new rule: hems must fall no more than 2 inches below the knee. Sounds reasonable. Professional. Modest. Except 'no more than 2 inches below' means anything longer than 2 inches below the knee fails. Maxi skirts fail. Wide-leg trousers fail. Anything with a generous cut fails.",
        what_happens: "The rule was trying to set a minimum length and accidentally set a maximum. One word — 'below' instead of 'above' — and suddenly half the school is out of compliance for being too covered up. Nobody caught it because nobody tested the new rule against real students before it went live. Pass rates tank. The team scrambles. Half the new failures are real. Half are rubric artifacts. Nobody can tell which is which.",
        the_lesson: "Rubric changes are deployments. A precisely worded criterion can be precisely wrong. And if you don't know what was passing before, you can't tell whether a new failure is signal or breakage.",
        eval_translation: "Run your updated rubric against historical data before deploying it. A change that fixes one thing while breaking five others isn't an improvement — it's a regression. Regression testing isn't optional; it's how you find out whether your fix created a new problem in a place you weren't looking.",
      },
    ],
  },
];

const tagColors = {
  BASELINE: "#4ade80",
  "UNDERSPECIFIED CRITERIA": "#fb923c",
  "OVERSPECIFIED CRITERIA": "#f87171",
  "AMBIGUOUS CRITERIA": "#fbbf24",
  "CONTRADICTORY CRITERIA": "#f43f5e",
  "RUBRIC DRIFT": "#a78bfa",
  "STALE GROUND TRUTH": "#f97316",
  "EVAL TOO LENIENT": "#34d399",
  "EVAL TOO STRICT": "#f87171",
  "EVAL CONSISTENCY": "#818cf8",
  "EXTERNAL OVERRIDE": "#e879f9",
  "HALO EFFECT": "#fde68a",
  "SAMPLING GAPS": "#22d3ee",
  "COVERAGE GAPS": "#38bdf8",
  "UNEXAMINED ASSUMPTION": "#67e8f9",
  "SEVERITY CALIBRATION": "#fbbf24",
  "AGGREGATE QUALITY": "#fb923c",
  "CONFLICTING DIMENSIONS": "#f43f5e",
  "GOODHART'S LAW": "#c084fc",
  "MINIMUM VIABLE ANSWER": "#a78bfa",
  "UNREPRESENTED POPULATION": "#94a3b8",
  "VERSION DRIFT": "#64748b",
  "MISALIGNED SOURCES": "#f87171",
  "EVAL REGRESSION": "#f43f5e",
};

export default function EvalGuide() {
  const [activeScenario, setActiveScenario] = useState(null);
  const [expandedChapter, setExpandedChapter] = useState(null);

  const openScenario = (chapterId, scenarioId) => {
    setActiveScenario({ chapterId, scenarioId });
  };

  const closeScenario = () => setActiveScenario(null);

  const getActiveData = () => {
    if (!activeScenario) return null;
    const chapter = scenarios.find((c) => c.id === activeScenario.chapterId);
    const scenario = chapter?.scenarios.find((s) => s.id === activeScenario.scenarioId);
    return { chapter, scenario };
  };

  const active = getActiveData();

  return (
    <div style={{
      fontFamily: "'Georgia', 'Times New Roman', serif",
      background: "#1c1814",
      minHeight: "100vh",
      color: "#f0ebe2",
      padding: "0",
    }}>
      {/* Header */}
      <div style={{
        background: "linear-gradient(180deg, #2a1f0e 0%, #1c1814 100%)",
        borderBottom: "3px solid #8B7355",
        padding: "48px 32px 32px",
        textAlign: "center",
        position: "relative",
        overflow: "hidden",
      }}>
        <div style={{
          position: "absolute", top: 0, left: 0, right: 0, bottom: 0,
          backgroundImage: "repeating-linear-gradient(0deg, transparent, transparent 40px, rgba(139, 115, 85, 0.04) 40px, rgba(139, 115, 85, 0.04) 41px)",
          pointerEvents: "none",
        }} />
        <div style={{
          fontSize: "11px", letterSpacing: "4px", color: "#8B7355",
          textTransform: "uppercase", marginBottom: "12px", fontFamily: "sans-serif",
        }}>
          ST. SBICE'S ACADEMY FOR WAYWARD CONTENT DESIGNERS • OFFICIAL PUBLICATION
        </div>
        <h1 style={{
          fontSize: "clamp(28px, 5vw, 52px)", fontWeight: "900",
          color: "#f5f0e8", margin: "0 0 8px", lineHeight: 1.1,
          textShadow: "0 2px 20px rgba(139,115,85,0.3)",
          fontStyle: "italic",
        }}>
          The Complete Guide to<br />
          <span style={{ color: "#d4a853" }}>Uniform Violations</span>
        </h1>
        <p style={{
          fontSize: "16px", color: "#cfc4b0", margin: "16px auto 0",
          maxWidth: "720px", fontStyle: "italic", lineHeight: 1.6,
        }}>
          A definitive handbook for understanding why perfectly compliant students still end up in the principal's office — and what that has to do with your AI evals.
        </p>
        <div style={{
          marginTop: "24px", fontSize: "11px", letterSpacing: "2px",
          color: "#6b5d4f", fontFamily: "sans-serif", textTransform: "uppercase",
        }}>
          ✦ Start with the cast, then select a chapter ✦
        </div>
      </div>

      {/* Cast of Characters */}
      <div style={{
        maxWidth: "1100px",
        margin: "0 auto",
        padding: "32px 32px 0",
      }}>
        <div style={{
          background: "rgba(212, 168, 83, 0.06)",
          border: "1px solid rgba(212, 168, 83, 0.2)",
          borderLeft: "4px solid #d4a853",
          borderRadius: "4px",
          overflow: "hidden",
        }}>
          <button
            onClick={() => setExpandedChapter(expandedChapter === "cast" ? null : "cast")}
            style={{
              width: "100%",
              background: "none",
              border: "none",
              padding: "20px 24px",
              cursor: "pointer",
              textAlign: "left",
              color: "#f0ebe2",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <div>
              <div style={{
                fontSize: "10px", letterSpacing: "3px", color: "#d4a853",
                fontFamily: "sans-serif", textTransform: "uppercase", marginBottom: "4px",
              }}>
                Before You Start
              </div>
              <div style={{ fontSize: "20px", fontWeight: "bold", fontStyle: "italic" }}>
                The Cast of Characters
              </div>
              <div style={{ fontSize: "13px", color: "#c4b89a", marginTop: "2px" }}>
                These are different things. They live in different places. That matters.
              </div>
            </div>
            <div style={{
              fontSize: "12px", fontFamily: "sans-serif", color: "#6b5d4f",
              transition: "transform 0.2s",
              transform: expandedChapter === "cast" ? "rotate(90deg)" : "rotate(0deg)",
            }}>▶</div>
          </button>

          {expandedChapter === "cast" && (
            <div style={{ padding: "0 24px 28px" }}>
              <p style={{
                fontSize: "15px", lineHeight: "1.7", color: "#c4b89a",
                fontStyle: "italic", marginBottom: "24px", maxWidth: "680px",
              }}>
                Everything in this guide uses a school uniform as a stand-in for an AI pipeline. Before you read the scenarios, it helps to know who's who — and more importantly, that these are <em style={{ color: "#f0ebe2" }}>separate things</em> that live in separate places. When something goes wrong, it matters a great deal which one is broken.
              </p>

              <table style={{
                width: "100%", borderCollapse: "collapse",
                fontSize: "14px", fontFamily: "sans-serif",
              }}>
                <thead>
                  <tr>
                    <th style={{
                      textAlign: "left", padding: "10px 16px",
                      fontSize: "10px", letterSpacing: "3px", textTransform: "uppercase",
                      color: "#d4a853", borderBottom: "1px solid rgba(212,168,83,0.2)",
                      fontWeight: "normal",
                    }}>At St. Sbice's</th>
                    <th style={{
                      textAlign: "left", padding: "10px 16px",
                      fontSize: "10px", letterSpacing: "3px", textTransform: "uppercase",
                      color: "#d4a853", borderBottom: "1px solid rgba(212,168,83,0.2)",
                      fontWeight: "normal",
                    }}>In Your AI Pipeline</th>
                    <th style={{
                      textAlign: "left", padding: "10px 16px",
                      fontSize: "10px", letterSpacing: "3px", textTransform: "uppercase",
                      color: "#d4a853", borderBottom: "1px solid rgba(212,168,83,0.2)",
                      fontWeight: "normal",
                    }}>Why It Matters</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    {
                      school: "👤 The student",
                      ai: "The model's response",
                      why: "This is the output — what the model actually said. It's the thing being judged.",
                    },
                    {
                      school: "👔 The uniform",
                      ai: "The response being evaluated",
                      why: "The specific output under review. One student, one outfit, one response at a time.",
                    },
                    {
                      school: "🏫 Principal Eval",
                      ai: "The evaluator (LLM judge or human rater)",
                      why: "The entity doing the judging. Can be a model, a human, or both. Not infallible.",
                    },
                    {
                      school: "📖 The handbook",
                      ai: "The eval rubric",
                      why: "The written criteria Principal Eval uses to make decisions. Only as good as what's written in it.",
                    },
                    {
                      school: "📋 Student's copy of the rules",
                      ai: "The model's system prompt / instructions",
                      why: "What the model was told to do. Separate from how it's being evaluated. Both can be wrong independently.",
                    },
                    {
                      school: "📸 The reference photo",
                      ai: "Ground truth",
                      why: "What a correct answer looks like. If it's stale, everything measured against it is unreliable.",
                    },
                  ].map(({ school, ai, why }, i) => (
                    <tr key={i} style={{
                      borderBottom: "1px solid rgba(255,255,255,0.05)",
                      background: i % 2 === 0 ? "rgba(255,255,255,0.02)" : "transparent",
                    }}>
                      <td style={{ padding: "12px 16px", color: "#f0ebe2", fontStyle: "italic" }}>{school}</td>
                      <td style={{ padding: "12px 16px", color: "#d4a853" }}>{ai}</td>
                      <td style={{ padding: "12px 16px", color: "#c4b89a", lineHeight: 1.5 }}>{why}</td>
                    </tr>
                  ))}
                </tbody>
              </table>

              <div style={{
                marginTop: "20px",
                padding: "16px",
                background: "rgba(255,255,255,0.03)",
                borderLeft: "2px solid #d4a85333",
                borderRadius: "2px",
              }}>
                <p style={{ fontSize: "13px", color: "#c4b89a", lineHeight: 1.7, margin: 0 }}>
                  <span style={{ color: "#d4a853", fontWeight: "bold" }}>The most important thing to understand:</span> when a bad response reaches a user, the instinct is to blame the model. But the model, the rubric, the evaluator, the instructions, and the ground truth are all separate moving parts — and any one of them can be the actual problem. This guide is about learning to tell the difference.
                </p>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Chapter nav */}
      <div style={{
        padding: "32px",
        maxWidth: "1100px",
        margin: "0 auto",
      }}>
        {scenarios.map((chapter) => (
          <div key={chapter.id} style={{ marginBottom: "12px" }}>
            {/* Chapter header */}
            <button
              onClick={() => setExpandedChapter(expandedChapter === chapter.id ? null : chapter.id)}
              style={{
                width: "100%",
                background: expandedChapter === chapter.id
                  ? `linear-gradient(135deg, ${chapter.color} 0%, ${chapter.color}cc 100%)`
                  : "rgba(255,255,255,0.05)",
                border: `1px solid ${expandedChapter === chapter.id ? chapter.accent + "44" : "rgba(255,255,255,0.08)"}`,
                borderLeft: `4px solid ${chapter.accent}`,
                borderRadius: "4px",
                padding: "18px 24px",
                cursor: "pointer",
                textAlign: "left",
                transition: "all 0.2s ease",
                color: "#e8e0d0",
              }}
            >
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <div>
                  <div style={{
                    fontSize: "10px", letterSpacing: "3px", color: chapter.accent,
                    fontFamily: "sans-serif", textTransform: "uppercase", marginBottom: "4px",
                  }}>
                    {chapter.chapter}
                  </div>
                  <div style={{ fontSize: "20px", fontWeight: "bold", fontStyle: "italic" }}>
                    {chapter.title}
                  </div>
                  <div style={{ fontSize: "13px", color: "#c4b89a", marginTop: "2px" }}>
                    {chapter.subtitle}
                  </div>
                </div>
                <div style={{
                  fontSize: "12px", fontFamily: "sans-serif",
                  color: "#6b5d4f", transition: "transform 0.2s",
                  transform: expandedChapter === chapter.id ? "rotate(90deg)" : "rotate(0deg)",
                }}>
                  ▶
                </div>
              </div>
            </button>

            {/* Scenario cards */}
            {expandedChapter === chapter.id && (
              <div style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
                gap: "12px",
                padding: "16px 0 8px",
              }}>
                {chapter.scenarios.map((scenario) => (
                  <button
                    key={scenario.id}
                    onClick={() => openScenario(chapter.id, scenario.id)}
                    style={{
                      background: "rgba(255,255,255,0.05)",
                      border: "1px solid rgba(255,255,255,0.08)",
                      borderRadius: "4px",
                      padding: "20px",
                      cursor: "pointer",
                      textAlign: "left",
                      transition: "all 0.15s ease",
                      color: "#e8e0d0",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.background = `${chapter.color}55`;
                      e.currentTarget.style.borderColor = chapter.accent + "55";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.background = "rgba(255,255,255,0.02)";
                      e.currentTarget.style.borderColor = "rgba(255,255,255,0.08)";
                    }}
                  >
                    <div style={{ fontSize: "24px", marginBottom: "10px" }}>{scenario.icon}</div>
                    <div style={{
                      display: "inline-block",
                      fontSize: "9px", letterSpacing: "2px",
                      fontFamily: "sans-serif", textTransform: "uppercase",
                      color: "#0a0a0a",
                      background: tagColors[scenario.tag] || "#94a3b8",
                      padding: "2px 8px",
                      borderRadius: "2px",
                      marginBottom: "10px",
                      fontWeight: "bold",
                    }}>
                      {scenario.tag}
                    </div>
                    <div style={{ fontSize: "17px", fontWeight: "bold", fontStyle: "italic", lineHeight: 1.3 }}>
                      {scenario.title}
                    </div>
                    <div style={{
                      fontSize: "12px", color: "#c4b89a", marginTop: "8px", lineHeight: 1.5,
                    }}>
                      {scenario.setup.length > 100 ? scenario.setup.slice(0, 100) + "..." : scenario.setup}
                    </div>
                    <div style={{
                      marginTop: "14px", fontSize: "11px", letterSpacing: "1px",
                      fontFamily: "sans-serif", color: chapter.accent, textTransform: "uppercase",
                    }}>
                      Read scenario →
                    </div>
                  </button>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Scenario modal */}
      {active && (
        <div
          onClick={closeScenario}
          style={{
            position: "fixed", inset: 0,
            background: "rgba(0,0,0,0.85)",
            display: "flex", alignItems: "center", justifyContent: "center",
            zIndex: 100, padding: "24px",
            backdropFilter: "blur(4px)",
          }}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              background: "#221e18",
              border: `1px solid ${active.chapter.accent}33`,
              borderLeft: `4px solid ${active.chapter.accent}`,
              borderRadius: "6px",
              maxWidth: "640px",
              width: "100%",
              maxHeight: "85vh",
              overflowY: "auto",
              padding: "36px",
              position: "relative",
            }}
          >
            <button
              onClick={closeScenario}
              style={{
                position: "absolute", top: "16px", right: "16px",
                background: "none", border: "none",
                color: "#6b5d4f", cursor: "pointer", fontSize: "20px",
              }}
            >✕</button>

            <div style={{ fontSize: "32px", marginBottom: "12px" }}>{active.scenario.icon}</div>

            <div style={{
              display: "inline-block",
              fontSize: "9px", letterSpacing: "2px",
              fontFamily: "sans-serif", textTransform: "uppercase",
              color: "#0a0a0a",
              background: tagColors[active.scenario.tag] || "#94a3b8",
              padding: "2px 8px", borderRadius: "2px",
              marginBottom: "14px", fontWeight: "bold",
            }}>
              {active.scenario.tag}
            </div>

            <h2 style={{
              fontSize: "28px", fontStyle: "italic", fontWeight: "bold",
              color: "#f5f0e8", margin: "0 0 24px", lineHeight: 1.2,
            }}>
              {active.scenario.title}
            </h2>

            {[
              { label: "The Setup", content: active.scenario.setup, color: "#8B7355" },
              { label: "What Happens", content: active.scenario.what_happens, color: "#8B7355" },
              { label: "The Lesson", content: active.scenario.the_lesson, color: active.chapter.accent },
              { label: "In Eval Terms", content: active.scenario.eval_translation, color: active.chapter.accent },
            ].map(({ label, content, color }) => (
              <div key={label} style={{ marginBottom: "20px" }}>
                <div style={{
                  fontSize: "10px", letterSpacing: "3px", fontFamily: "sans-serif",
                  textTransform: "uppercase", color, marginBottom: "6px",
                }}>
                  {label}
                </div>
                <div style={{
                  fontSize: "15px", lineHeight: "1.7", color: "#e8e0d0",
                  borderLeft: `2px solid ${color}33`, paddingLeft: "16px",
                }}>
                  {content}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Footer */}
      <div style={{
        borderTop: "1px solid rgba(139,115,85,0.2)",
        padding: "24px 32px",
        textAlign: "center",
        fontSize: "11px", letterSpacing: "2px",
        color: "#4a3f32", fontFamily: "sans-serif", textTransform: "uppercase",
      }}>
        St. Sbice's Academy for Wayward Content Designers • Model UX Division • Principal Eval does not accept appeals
      </div>
    </div>
  );
}
