/**
 * Single source of the About prose.
 *
 * Content only — no markup, class names or layout. Each surface (`/about/`,
 * the desk About window, the mobile About view) maps these blocks to its own
 * presentation, because the three are styled very differently.
 *
 * Characters are `/about/`'s exactly, including its mix of straight and
 * typographic apostrophes. Do not re-typeset.
 */
export type AboutBlock =
  | { kind: "paragraph"; text: string; emphasis?: "lead" | "small" }
  | { kind: "quote"; text: string }
  | { kind: "attribution"; text: string };

export const aboutBlocks: AboutBlock[] = [
  { kind: "paragraph", text: "Hi. I'm Tony.", emphasis: "lead" },
  {
    kind: "paragraph",
    text: "I’m naturally curious and a little skeptical about the world. Repetitive things or anything that lacks creativity lose my interest pretty quickly. I’m always drawn to ideas, technologies, or perspectives that feel fresh and a bit different. If you ever come across something genuinely interesting or new, feel free to share it with me.",
  },
  { kind: "quote", text: "And one more thing…" },
  {
    kind: "paragraph",
    text: "We're here to put a dent in the universe. Otherwise why else even be here?",
  },
  {
    kind: "paragraph",
    emphasis: "small",
    text: "Here's to the crazy ones. The misfits. The rebels. The troublemakers. The round pegs in the square holes. The ones who see things differently. They're not fond of rules. And they have no respect for the status quo. You can quote them, disagree with them, glorify or vilify them. About the only thing you can't do is ignore them. Because they change things. They push the human race forward. And while some may see them as the crazy ones, we see genius. Because the people who are crazy enough to think they can change the world, are the ones who do.",
  },
  { kind: "attribution", text: "— Steve Jobs" },
];
