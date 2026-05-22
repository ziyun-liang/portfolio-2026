# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: smoke.spec.ts >> portfolio smoke >> nyt-search case study has marginalia in three kinds
- Location: tests/smoke.spec.ts:28:3

# Error details

```
Error: expect(locator).toHaveCount(expected) failed

Locator:  locator('.margin--footnote')
Expected: 1
Received: 3
Timeout:  5000ms

Call log:
  - Expect "toHaveCount" with timeout 5000ms
  - waiting for locator('.margin--footnote')
    14 × locator resolved to 3 elements
       - unexpected value "3"

```

# Page snapshot

```yaml
- generic [active] [ref=e1]:
  - banner [ref=e2]:
    - generic [ref=e3]:
      - link "Lindsey Liang" [ref=e4] [cursor=pointer]:
        - /url: /
      - navigation [ref=e5]:
        - link "Work" [ref=e6] [cursor=pointer]:
          - /url: /
        - link "About" [ref=e7] [cursor=pointer]:
          - /url: /about
  - article [ref=e8]:
    - generic [ref=e9]:
      - heading "NYT AI-Powered Search" [level=1] [ref=e10]
      - paragraph [ref=e11]: Rebuilding search around what readers are actually trying to do.
      - paragraph [ref=e12]: Lead designer · 2026 · The New York Times
    - generic [ref=e13]:
      - navigation "Section navigation" [ref=e14]:
        - list [ref=e15]:
          - listitem [ref=e16]:
            - link "Context" [ref=e17] [cursor=pointer]:
              - /url: "#context"
          - listitem [ref=e18]:
            - link "Approach" [ref=e19] [cursor=pointer]:
              - /url: "#approach"
          - listitem [ref=e20]:
            - link "Exploration" [ref=e21] [cursor=pointer]:
              - /url: "#exploration"
          - listitem [ref=e22]:
            - link "Outcome" [ref=e23] [cursor=pointer]:
              - /url: "#outcome"
          - listitem [ref=e24]:
            - link "Reflection" [ref=e25] [cursor=pointer]:
              - /url: "#reflection"
      - generic [ref=e26]:
        - heading "Context" [level=2] [ref=e27]
        - paragraph [ref=e28]: In 2024 I was lead product designer on the Ad mission. I asked my manager if I could also work on Search — NYT search was so bad that most readers found NYT articles through Google rather than through NYT itself. He let me try. Search became my passion project for the next two years, alongside my Ad work.
        - paragraph [ref=e29]: "ChatGPT had been out for a while and reader behavior was shifting fast — people had stopped expecting keyword search to work and started expecting a synthesized answer. NYT’s search at the time was still lexical: type a word, hope an article matches it."
        - complementary [ref=e30]:
          - generic [ref=e31]: "1"
          - paragraph [ref=e33]: Lexical search ranks documents by literal word overlap. Semantic search matches by meaning using embeddings — a different retrieval architecture entirely.
        - paragraph [ref=e34]: "For two years the design side ran ahead in vision — AI summaries, timelines, multi-modal answers, related questions, interactive formats. The work was free labor on the side of our day jobs, but the prototypes were concrete. We shared them with newsroom partners and business leadership, and they did two things: built the conviction that NYT search could be something different, and articulated what a new architecture would need to support."
        - complementary [ref=e35]:
          - paragraph [ref=e37]: "Vision design as a forcing function: making the engineering investment legible by showing what becomes possible."
        - paragraph [ref=e38]:
          - text: In January 2026 NYT formalized the work as
          - strong [ref=e39]: NAPP
          - text: "— New AI Products and Platforms — and the engineering team began rebuilding the architecture from the ground up: semantic retrieval, a user-intent analyzer, an LLM orchestration layer capable of coordinating multiple model calls. I joined as lead product designer, currently the only full-time designer on the mission, working in close collaboration with the newsroom and the search engineering team. The bet: if NYT search could match what readers now expect from AI, and surface NYT’s journalism in the formats that match how people actually ask, search could become a starting point — where a reader either leaves with a good answer, or follows that answer deeper into NYT’s reporting."
        - complementary [ref=e40]:
          - list [ref=e42]:
            - listitem [ref=e43]:
              - strong [ref=e44]: Engineering
              - text: — NAPP search team
            - listitem [ref=e45]:
              - strong [ref=e46]: Design partner (early phase)
              - text: — Staff designer
            - listitem [ref=e47]:
              - strong [ref=e48]: Newsroom
              - text: — Editorial partners
        - heading "Approach" [level=2] [ref=e49]
        - paragraph [ref=e50]:
          - strong [ref=e51]: The thesis.
          - text: AI search engines like Google Gemini are useful — fast, informative, broadly capable. What NYT can add is a different
          - emphasis [ref=e52]: kind
          - text: "of answer. NYT has its own editorial standards: how summaries are written, how contested questions are framed, when to surface visual evidence instead of a flat yes/no. A line from user research stuck with me: someone said NYT’s AI summary felt like"
          - emphasis [ref=e53]: “show me the answer,”
          - text: while Gemini felt like
          - emphasis [ref=e54]: “tell me the answer.”
          - text: That distinction — show vs. tell — captures the opportunity. Built on NYT reporting, AI search can foreground evidence rather than flatten it.
        - paragraph [ref=e55]:
          - text: The longer-range bet is that search becomes an “ask” capability — an action you take wherever you are, not a destination. The hard part is figuring out
          - emphasis [ref=e56]: when and why
          - text: readers ask the Times specifically, and
          - emphasis [ref=e57]: what and how
          - text: the Times can answer at editorial standard.
        - paragraph [ref=e58]:
          - strong [ref=e59]: Intent-first.
          - text: "A central structural choice: NYT search is built around user intent, not keyword matching. Queries pass through an intent analyzer that parses possible intents and generates outputs matched to them. Working with engineers and PMs, I helped crystallize the six major intents we now design and build for. The long-term thesis is a multi-intent world; in the short term we ship one intent at a time, starting with"
          - strong [ref=e60]: Latest News
          - text: .
        - complementary [ref=e61]:
          - generic [ref=e62]: "2"
          - paragraph [ref=e64]: Each intent we ship refines the pipeline — prompt patterns, intent detection, output formats — and the learnings feed the next intent.
        - paragraph [ref=e65]:
          - strong [ref=e66]: How I worked.
          - text: "Through 2024 and most of 2025, my contribution was Figma — high-fidelity design and prototypes that engineers used as a spec for what to build. Starting in late 2025 I shifted to vibe coding: building real working prototypes directly, so each Friday’s demo was an actual interaction, not a flat mockup. Engineers handle the backend — prompt refinement, intent analysis, orchestration; the front-end surfaces start as live prototypes I push."
        - complementary [ref=e67]:
          - paragraph [ref=e69]: The team works in four-week cycles. Daily standups across eng, newsroom, design, and PM. Wednesday cross-team check-ins. Friday demos with working prototypes. The bar isn’t polish — it’s that something has to actually run.
        - paragraph [ref=e70]:
          - strong [ref=e71]: Principles.
          - text: "Two rules shape every AI output we ship:"
        - list [ref=e72]:
          - listitem [ref=e73]:
            - strong [ref=e74]: Sourced from NYT reporting.
            - text: Every output starts from NYT articles. Not the open web.
          - listitem [ref=e75]:
            - strong [ref=e76]: Delivered as content cards.
            - text: AI surfaces are multi-modal — text, video, audio, interactive — not text walls. Latest News started with text; other intents will pull in other modalities.
        - paragraph [ref=e77]: Alongside those rules, design produced a small visual vocabulary that signals when, how, and on what authority AI is acting. The same elements appear across NYT AI surfaces, not only in search.
        - figure "The AI design language. Each element has a distinct purpose and appears wherever AI assists." [ref=e78]:
          - 'img "Common AI elements: AI label, sparkle icon, disclaimer, link for more info, feedback affordance, chain of thought, detailed AI use info, haptics" [ref=e79]'
          - generic [ref=e81]: The AI design language. Each element has a distinct purpose and appears wherever AI assists.
        - heading "Exploration" [level=2] [ref=e82]
        - paragraph [ref=e83]:
          - strong [ref=e84]: Tools as clarity.
          - text: The question I keep coming back to isn’t “Figma or code?” — it’s “what brings the most clarity in this moment?” When the
          - emphasis [ref=e85]: system
          - text: "I’m trying to understand is unclear, I prototype: I need to see it move before I can think about it. When I have a"
          - emphasis [ref=e86]: specific
          - text: idea I want to interrogate, I start in Figma — sketches let me hold many parallel options without committing to any. For motion polish, I build directly in code; animation timing doesn’t survive a Figma round-trip.
        - paragraph [ref=e87]:
          - strong [ref=e88]: "Concepting: two moments, two tools."
        - paragraph [ref=e89]:
          - text: The first was the intent map. The system itself was vague — what does an “intent-driven” search experience even
          - emphasis [ref=e90]: do
          - text: "? I started with a rough sketch in FigJam, then built it into an interactive prototype I could push on. Watching it move was how I understood what I was making."
        - figure "The FigJam sketch. The system on a whiteboard." [ref=e91]:
          - img "FigJam intent map sketch" [ref=e92]
          - generic [ref=e94]: The FigJam sketch. The system on a whiteboard.
        - figure "The same system, made interactive. Where it started to make sense." [ref=e95]:
          - generic [ref=e97]: The same system, made interactive. Where it started to make sense.
        - paragraph [ref=e98]: The second was concept exploration. Once I had specific ideas — a timeline answer, a comparison card, a related-questions panel — I worked in Figma. About 10–20 sketches, each testing a different theory of what AI search at NYT could be. None shipped as designed. All shaped what we eventually built.
        - figure "A subset of the early concept work." [ref=e99]:
          - img "Grid of early concept explorations"
          - generic [ref=e101]: A subset of the early concept work.
        - paragraph [ref=e102]:
          - strong [ref=e103]: "Building: prototyping toward shippable."
          - text: When NAPP formed, the first intent we shipped for was
          - strong [ref=e104]: Latest News
          - text: — the most frequent reader query type, and a good place to learn the pipeline before generalizing. The answer card pulls a synthesized recap with editorial voice, an excerpt drawn directly from a current report, and a path to deeper coverage. The card sits at the top of results when intent detection has high confidence; results-first when it doesn’t.
        - complementary [ref=e105]:
          - generic [ref=e106]: "3"
          - paragraph [ref=e108]: Intent detection confidence thresholds were tuned over months. Placement above or below results is a query-by-query call.
        - figure "The shipping form of the Latest News answer card." [ref=e109]:
          - img "Latest News answer card"
          - generic [ref=e111]: The shipping form of the Latest News answer card.
        - paragraph [ref=e112]:
          - strong [ref=e113]: Motion belongs in code.
          - text: Loading states, the chain-of-thought reveal, the failure mode — moments where the gap between a thoughtful experience and a janky one is timing. I built motion directly in code; the final pixel pushing happened in real CSS against real content.
        - 'figure "Working prototype: query → loading → chain-of-thought reveal → answer card." [ref=e114]':
          - generic [ref=e116]: "Working prototype: query → loading → chain-of-thought reveal → answer card."
        - paragraph [ref=e117]:
          - strong [ref=e118]: "The last 10%: AI labeling."
          - text: "A smaller-feeling decision that ended up mattering most: how we labeled AI-generated content inside the answer card. Earlier versions used a subtle sparkle icon and italic"
          - emphasis [ref=e119]: “AI summary”
          - text: "caption — readable, but easy to miss. The label kept losing the visual hierarchy fight against the editorial copy itself. We refined: stronger typographic label, slightly more visual weight, an explicit disclaimer one tap away. Same intent, different trust signal."
        - complementary [ref=e120]:
          - paragraph [ref=e122]: The first 90% — where the AI summary sits, what it contains, how citations work — felt like the heavy lift. The last 10% — what the label looks like — shifted the experience from feeling LLM-generic to feeling NYT.
        - figure "Before. Readable but losing the hierarchy fight." [ref=e123]:
          - img "AI label, earlier version"
          - generic [ref=e125]: Before. Readable but losing the hierarchy fight.
        - figure "After. Same label, more weight, more trust." [ref=e126]:
          - img "AI label, refined version"
          - generic [ref=e128]: After. Same label, more weight, more trust.
        - paragraph [ref=e129]:
          - text: This change wasn’t only visual. Some of design’s input here shifted the
          - emphasis [ref=e130]: prompt
          - text: — the shorter, more digestible excerpt length we wanted UX-side got baked into what the prompt asks the model for. More on that in the Reflection.
        - heading "Outcome" [level=2] [ref=e131]
        - paragraph [ref=e132]:
          - strong [ref=e133]: Where things are.
          - text: "The Latest News answer card is preparing for live user testing. The path here has been deliberately cautious: six rounds of internal editorial evaluation and one round of qualitative user research with readers interacting with real prototypes. This will mark NYT’s first generated-text format tested with real readers in product — new ground for the institution, and a high bar to clear. Getting comfortable with the frame, the voice, and the boundaries of what AI should and shouldn’t say took most of the cycle."
        - complementary [ref=e134]:
          - paragraph [ref=e136]: "Six editorial rounds, one user research round. The slowness was the point: faster iteration would have meant shipping something the newsroom couldn’t stand behind."
        - paragraph [ref=e137]:
          - strong [ref=e138]: The signal we’re optimizing for.
          - text: The metric we care about most is whether readers
          - emphasis [ref=e139]: come back
          - text: to this feature — not clicks, not satisfaction on first use, but whether AI-powered search becomes a place readers return to. That’s a longer-arc measure, and it’s the right one. A summary that’s impressive once but never used again is failure dressed up as success.
        - paragraph [ref=e140]:
          - strong [ref=e141]: Spread beyond search.
          - text: Inside NYT, the user-intent framework has been picked up by other product teams. The Cooking and Wirecutter teams forked the intent-parsing repo because they recognized the same pattern in their own queries — readers don’t ask for keywords, they ask with shape. The intent layer turned out to generalize. That kind of internal adoption is, I think, the strongest validation a foundational design choice gets — when other teams use it without being asked.
        - heading "Reflection" [level=2] [ref=e142]
        - paragraph [ref=e143]:
          - strong [ref=e144]: Designing through prompts.
          - text: This work taught me that design’s surface area on AI features extends beyond pixels. The prompt is part of the artifact. The question of
          - emphasis [ref=e145]: what makes a good answer
          - text: — its length, its tone, what it includes, what it leaves out — is a design question that ends up encoded in the prompt as much as in the UI.
        - paragraph [ref=e146]:
          - text: One small example. An early version of the answer card asked the model to write a bridging line introducing the NYT excerpt that followed the summary. The intro kept growing — long, redundant, hedging. The fix wasn’t to refine the prompt’s wording. It was to take that work
          - emphasis [ref=e147]: "off"
          - text: the prompt entirely. We added a static UI label —
          - emphasis [ref=e148]: “From Times coverage”
          - text: — that did the bridging job better than any generated sentence could. The prompt got simpler. The output got cleaner. The reader got clarity.
        - complementary [ref=e149]:
          - paragraph [ref=e151]: Sometimes the best design move on an AI surface is removing a job from the model and giving it back to the UI.
        - paragraph [ref=e152]:
          - text: Design has a place in the
          - emphasis [ref=e153]: eval
          - text: stage, too. Editors and engineers need concrete rules to write good prompts and evaluate good outputs — and rules need a point of view about what “good” even means for
          - emphasis [ref=e154]: this
          - text: feature,
          - emphasis [ref=e155]: this
          - text: query type,
          - emphasis [ref=e156]: this
          - text: reader. The “From Times coverage” decision started as a design observation and ended up changing both the prompt and the UI. The artifact list keeps expanding.
        - paragraph [ref=e157]:
          - strong [ref=e158]: Strong partners.
          - text: "What this work has reinforced: AI doesn’t take the human work out of any of these roles — it sharpens what each of them is for. Editors hold the line on judgment and voice. Engineers write prompts that are real, careful writing in their own right. PMs keep the vision sharp and the work moving. Design’s job is what it has always been — pursuing clarity for the reader, again and again, in whatever medium serves. None of those parts is replaceable; the collaboration is what makes the whole thing better than any of us could make alone."
        - paragraph [ref=e159]:
          - text: "The personal piece, alongside all that: being able to"
          - emphasis [ref=e160]: build
          - text: what I can see. Vibe coding closed the gap between “I can imagine this clearly” and “I can put it in front of you on Friday.” Quietly transforming.
        - paragraph [ref=e161]:
          - strong [ref=e162]: What’s next.
          - text: "Two years ago I asked to work on Search because it was bad. The work has its own shape now, and the questions are bigger: what reader–editorial interaction becomes in an AI age, how far the newsroom can push without losing what makes it the newsroom, what"
          - emphasis [ref=e163]: valuable
          - text: even means when an AI is in the loop. More to figure out. More to build.
    - navigation [ref=e164]:
      - link "All work" [ref=e166] [cursor=pointer]:
        - /url: /
      - link "Summary at the Times →" [ref=e167] [cursor=pointer]:
        - /url: /work/summary
  - contentinfo [ref=e168]:
    - generic [ref=e169]:
      - generic [ref=e170]: © 2026 · Lindsey Liang
      - link "Back to top" [ref=e171] [cursor=pointer]:
        - /url: "#top"
  - generic [ref=e174]:
    - button "Menu" [ref=e175]:
      - img [ref=e177]
      - generic: Menu
    - button "Inspect" [ref=e181]:
      - img [ref=e183]
      - generic: Inspect
    - button "Audit" [ref=e185]:
      - generic [ref=e186]:
        - img [ref=e187]
        - img [ref=e190]
      - generic: Audit
    - button "Settings" [ref=e193]:
      - img [ref=e195]
      - generic: Settings
```

# Test source

```ts
  1  | import { test, expect } from "@playwright/test";
  2  | 
  3  | test.describe("portfolio smoke", () => {
  4  |   test("index renders header, intro, and three case-study cards", async ({ page }) => {
  5  |     await page.goto("/");
  6  |     await expect(page.locator("header.site-header .brand")).toHaveText("Lindsey Liang");
  7  |     await expect(page.locator("main.index h1")).toHaveText("Lindsey Liang");
  8  |     await expect(page.locator(".work-list > li")).toHaveCount(3);
  9  |   });
  10 | 
  11 |   test("about page renders title and contact section", async ({ page }) => {
  12 |     await page.goto("/about");
  13 |     await expect(page.locator("main.about h1")).toHaveText("About");
  14 |     await expect(page.getByRole("heading", { name: "Contact" })).toBeVisible();
  15 |   });
  16 | 
  17 |   test("each case study renders title, dek, sections, and footer nav", async ({ page }) => {
  18 |     const slugs = ["nyt-search", "article-overview", "wellness-shop"];
  19 |     for (const slug of slugs) {
  20 |       await page.goto(`/work/${slug}`);
  21 |       await expect(page.locator("article.cs h1")).toBeVisible();
  22 |       await expect(page.locator("article.cs .dek")).toBeVisible();
  23 |       await expect(page.locator("article.cs h2")).toHaveCount(5);
  24 |       await expect(page.locator("nav.cs-foot")).toBeVisible();
  25 |     }
  26 |   });
  27 | 
  28 |   test("nyt-search case study has marginalia in three kinds", async ({ page }) => {
  29 |     await page.setViewportSize({ width: 1400, height: 900 });
  30 |     await page.goto("/work/nyt-search");
> 31 |     await expect(page.locator(".margin--footnote")).toHaveCount(1);
     |                                                     ^ Error: expect(locator).toHaveCount(expected) failed
  32 |     await expect(page.locator(".margin--note")).toHaveCount(1);
  33 |     await expect(page.locator(".margin--credit")).toHaveCount(1);
  34 |   });
  35 | });
  36 | 
```