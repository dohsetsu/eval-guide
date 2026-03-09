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
        setup: "The handbook says: students must maintain a neat and professional appearance.",
        what_happens: "Principal Eval has to rule on 'neat.' Two principals on the same hallway are giving wildly different verdicts on the same students. Nobody knows what the rubric actually means.",
        the_lesson: "Squishy criteria without anchoring examples aren't criteria — they're vibes. A rubric has to define the bar, not just name the dimension.",
        eval_translation: "This is why eval rubrics need examples, not just labels. '4 out of 5 for helpfulness' means nothing without showing what a 4 looks like vs a 3.",
      },
      {
        id: "contradictory",
        title: "The Handbook Civil War",
        icon: "⚔️",
        tag: "CONTRADICTORY CRITERIA",
        setup: "Chapter 3: blue shirts required. Chapter 7: no solid colors during Spirit Week.",
        what_happens: "It's Spirit Week. A student wears a solid blue shirt. Principal Eval has to pick a rule. Depending on which chapter they read first, the student passes or fails.",
        the_lesson: "Conflicting rubric criteria create random, inconsistent verdicts. This gets worse when multiple teams contribute to the eval suite over time without coordination.",
        eval_translation: "Your eval suite needs governance. As it grows, criteria will conflict — especially across teams or time. Someone has to own the handbook.",
      },
      {
        id: "outdated",
        title: "The 1985 Handbook",
        icon: "📜",
        tag: "RUBRIC DRIFT",
        setup: "The handbook was written in 1985. A student shows up in something that didn't exist in 1985. The handbook has no guidance.",
        what_happens: "Principal Eval has no precedent to check against. They make a judgment call based on nothing. It's arbitrary. It's inconsistent. It might be wrong.",
        the_lesson: "Your rubric was calibrated on yesterday's outputs. As the model or user population changes, the rubric stops reflecting reality. This is distribution shift in disguise.",
        eval_translation: "Rubrics need regular review. If your model has been updated, your user base has grown, or your product has changed — the rubric might be evaluating a world that no longer exists.",
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
        setup: "Principal Eval fails 40% of students daily. Many of them look completely fine. Parents are calling. Teachers are confused.",
        what_happens: "The team starts ignoring the eval results because they don't trust them. The eval becomes noise. Real violations slip through because nobody's watching anymore.",
        the_lesson: "An eval that cries wolf destroys trust in the entire system. False positives are not harmless — they cause people to discount real failures.",
        eval_translation: "Precision matters as much as recall. If your eval surfaces too many false positives, people will stop acting on it — including on the real ones.",
      },
      {
        id: "substitute",
        title: "The Substitute",
        icon: "👀",
        tag: "INTER-RATER RELIABILITY",
        setup: "Same students. Same handbook. Different principal. Wildly different results.",
        what_happens: "Monday's principal passes a certain look. Wednesday's substitute fails it. The students are the same. The rubric is the same. The verdicts are not.",
        the_lesson: "This is inter-rater reliability — and it's the core problem with LLM-as-judge evals. Two models reading the same rubric will not always agree. Neither will two humans.",
        eval_translation: "You need calibration before your eval goes live. Have multiple evaluators score the same outputs and compare. If they disagree too much, the rubric needs work.",
      },
      {
        id: "framing",
        title: "The Charming Student",
        icon: "😏",
        tag: "EVAL SENSITIVITY TO FRAMING",
        setup: "A student gets stopped. They argue confidently: 'This is technically blue.' The principal reconsiders. Changes their ruling.",
        what_happens: "Students learn that how you present yourself matters more than what you're wearing. The eval is now measuring persuasion, not compliance.",
        the_lesson: "Evals that can be talked out of their verdicts are measuring the wrong thing. This is especially dangerous in LLM-as-judge setups where the framing of the eval prompt changes the outcome.",
        eval_translation: "Your judge prompt is part of the rubric. If changing the wording of your eval prompt changes your results significantly, your eval is fragile.",
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
        the_lesson: "Your eval suite is only as good as what it measures. Tone, format, accuracy, safety, helpfulness — if you're not running separate evals for each, you have unmeasured dimensions.",
        eval_translation: "An eval suite needs coverage across every quality dimension that matters to your product. You can't infer one from another.",
      },
      {
        id: "back-hallway",
        title: "The Back Hallway",
        icon: "🚪",
        tag: "UNSEEN TRAFFIC",
        setup: "The principal inspects the main entrance. The back hallway has its own entrance that nobody's watching.",
        what_happens: "Students who know about the back hallway use it. They're never checked. They could be wearing anything.",
        the_lesson: "There are always edge cases, unusual inputs, or user populations that fall outside your eval coverage. If you've only tested one kind of input, you only know about one kind of output.",
        eval_translation: "Adversarial inputs, edge cases, and underrepresented user flows are your back hallway. You need deliberate testing of the paths you're not watching.",
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
        setup: "Student A has a missing button. Student B showed up in a swimsuit. The rubric marks both as 'uniform violation.'",
        what_happens: "The dashboard shows two violations. They look the same. They are not the same.",
        the_lesson: "Binary pass/fail evals flatten severity. You lose the signal that tells you which failures actually matter and which are noise.",
        eval_translation: "Your eval should capture severity, not just pass/fail. A factual error is not the same as a mildly awkward phrasing. Weight your failures accordingly.",
      },
      {
        id: "accumulation",
        title: "Death by Minor Violations",
        icon: "📋",
        tag: "AGGREGATE QUALITY",
        setup: "Student A: perfect except for one wrong shade of blue. Student B: shirt right, pants wrong, shoes wrong, belt wrong, bag wrong.",
        what_happens: "Student A has one violation. Student B has five. But your rubric treats them the same — one check per criterion.",
        the_lesson: "Aggregate quality matters. A response that's slightly off on five dimensions may be worse than one that fails hard on one dimension. Context determines which is the real problem.",
        eval_translation: "Composite scores need weighting logic. Think about what a failing combination looks like, not just whether any single criterion fails.",
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
        setup: "Students figure out the principal only checks three things: collar, cuffs, and front of shirt.",
        what_happens: "Students optimize exactly for those three things. The back of their shirts look like they slept in them. They always pass.",
        the_lesson: "When a measure becomes a target, it ceases to be a good measure. This is Goodhart's Law, and it's one of the most dangerous failure modes in eval design.",
        eval_translation: "If your model is trained or fine-tuned using eval scores as signal, it will eventually optimize for the eval — not the underlying quality. Your eval needs to evolve alongside the model.",
      },
      {
        id: "spirit-of-law",
        title: "Technically Compliant",
        icon: "🧑‍⚖️",
        tag: "LETTER VS. SPIRIT",
        setup: "A student reads the handbook carefully. Finds every loophole. Shows up in something that satisfies every written criterion — but clearly shouldn't.",
        what_happens: "Principal Eval passes them. Every criterion checked. Every box ticked. The student looks absurd. The system looks broken.",
        the_lesson: "Criteria capture what you wrote, not what you meant. If the spirit of the requirement isn't embedded in the rubric, a compliant-but-wrong output will always find its way through.",
        eval_translation: "This is why eval rubrics need intent documentation alongside criteria. What are you actually trying to measure? Write that down too.",
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
        id: "never-in-hallway",
        title: "Written from the Ivory Tower",
        icon: "🏛️",
        tag: "RUBRIC DESIGN FLAW",
        setup: "The handbook was written by administrators who have never actually stood in the hallway and watched students walk by.",
        what_happens: "The rubric sounds reasonable on paper. In practice, it catches the wrong things, misses the obvious things, and confuses the principals who have to enforce it.",
        the_lesson: "Rubrics written without grounding in real outputs are guesswork. Good rubric design requires looking at actual examples — good ones, bad ones, edge cases — before writing a single criterion.",
        eval_translation: "Before writing an eval rubric, collect examples of the kinds of outputs you're worried about. Let the rubric be informed by reality, not by theory.",
      },
      {
        id: "handbook-revision",
        title: "Nobody Read the Update",
        icon: "📬",
        tag: "VERSION DRIFT",
        setup: "The handbook was updated. The memo went out. Most principals are still running on last year's version.",
        what_happens: "Some principals are enforcing the old rules. Some are enforcing the new ones. Students are getting inconsistent verdicts. Nobody knows which version is authoritative.",
        the_lesson: "Eval infrastructure needs version control and deployment discipline. An updated rubric that isn't deployed is an update that doesn't exist.",
        eval_translation: "Treat your eval rubrics like code. Version them. Deploy them. Know which version is running in which environment.",
      },
      {
        id: "regression",
        title: "The Update That Broke Everything",
        icon: "💥",
        tag: "EVAL REGRESSION",
        setup: "A rubric update fixes a problem with blue hoodies. Suddenly 200 previously passing students are failing — for things that were never a problem.",
        what_happens: "The team scrambles to understand why pass rates dropped. Half the new failures are legitimate. Half are artifacts of the update.",
        the_lesson: "Rubric changes are deployments. They need regression testing. If you don't know what was passing before, you can't tell if a new failure is signal or breakage.",
        eval_translation: "Run your new rubric against historical data before deploying it. A change that improves one thing while tanking another isn't an improvement.",
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
  "EVAL TOO LENIENT": "#34d399",
  "EVAL TOO STRICT": "#f87171",
  "INTER-RATER RELIABILITY": "#818cf8",
  "EVAL SENSITIVITY TO FRAMING": "#c084fc",
  "SAMPLING GAPS": "#22d3ee",
  "COVERAGE GAPS": "#38bdf8",
  "UNSEEN TRAFFIC": "#67e8f9",
  "SEVERITY CALIBRATION": "#fbbf24",
  "AGGREGATE QUALITY": "#fb923c",
  "GOODHART'S LAW": "#c084fc",
  "LETTER VS. SPIRIT": "#a78bfa",
  "RUBRIC DESIGN FLAW": "#94a3b8",
  "VERSION DRIFT": "#64748b",
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
      background: "#0a0a0a",
      minHeight: "100vh",
      color: "#e8e0d0",
      padding: "0",
    }}>
      {/* Header */}
      <div style={{
        background: "linear-gradient(180deg, #1a1208 0%, #0a0a0a 100%)",
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
          HALLBROOK ACADEMY • OFFICIAL PUBLICATION
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
          fontSize: "16px", color: "#a89880", margin: "16px auto 0",
          maxWidth: "500px", fontStyle: "italic", lineHeight: 1.6,
        }}>
          A definitive handbook for understanding why perfectly compliant students<br />still end up in the principal's office — and what that has to do with your AI evals.
        </p>
        <div style={{
          marginTop: "24px", fontSize: "11px", letterSpacing: "2px",
          color: "#6b5d4f", fontFamily: "sans-serif", textTransform: "uppercase",
        }}>
          ✦ Select a chapter to begin ✦
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
                  : "rgba(255,255,255,0.03)",
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
                  <div style={{ fontSize: "13px", color: "#a89880", marginTop: "2px" }}>
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
                      background: "rgba(255,255,255,0.02)",
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
                      fontSize: "12px", color: "#a89880", marginTop: "8px", lineHeight: 1.5,
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
              background: "#111008",
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
                  fontSize: "15px", lineHeight: "1.7", color: "#d4cabb",
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
        Hallbrook Academy • Model UX Division • Principal Eval does not accept appeals
      </div>
    </div>
  );
}
