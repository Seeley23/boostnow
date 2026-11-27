#!/usr/bin/env node
/**
 * Plain-language and reader-experience lint for BoostNow articles (Polish).
 * Implements the measurable part of .claude/skills/artykul-ux/SKILL.md.
 *
 * Usage: node scripts/article-lint.mjs drafts/*.md
 * Exit code 1 when a file has errors (warnings never fail).
 */
import fs from "node:fs";

const RULES = {
  maxSentenceWords: 20,       // ASD-STE100 style limit for instructions; we apply it everywhere
  maxParagraphSentences: 3,   // 1–3 sentences per paragraph
  maxLongSentenceShare: 0.1,  // at most 10% of sentences may exceed the limit (lists excluded)
};

// Metadiscourse: talking about the text instead of the subject.
const METADISCOURSE = [
  /\bw (tym|niniejszym) (artykule|tekście|poradniku|wpisie)\b/i,
  /\bponiżej (znajdziesz|przedstawi|omówi)/i,
  /\bw (tej|kolejnej|następnej) (sekcji|części)\b/i,
  /\bjak (wspomniano|wspomnieliśmy|pisaliśmy) (wcześniej|powyżej)\b/i,
  /\b(omówimy|przeanalizujemy|przyjrzymy się|pokażemy, jak)\b/i,
  /\bwarto (zauważyć|podkreślić|wspomnieć)\b/i,
  /\bnależy (podkreślić|zauważyć)\b/i,
];

// Hedging: cushions that weaken a claim.
const HEDGING = [
  /\bstosunkowo\b/i, /\bdo pewnego stopnia\b/i, /\bmożna by\b/i, /\bwydaje się\b/i,
  /\bpotencjalnie\b/i, /\bw pewnym sensie\b/i, /\bzasadniczo\b/i, /\bponiekąd\b/i,
  /\bw pewnych kontekstach\b/i,
];

// Zombie verbs: a weak verb carrying a nominalisation ("dokonać weryfikacji").
const ZOMBIE = /\b(dokon\w*|przeprowadz\w*|realizow\w*|zapewni\w*|umożliwi\w*|doprowadz\w*) (do )?\w+(ania|enia|cji|acji)\b/i;

// Meta-concepts that hide a concrete thing (warning only).
const META_CONCEPTS = /\b(proces\w*|mechanizm\w*|podejści\w*|aspekt\w*|kwesti\w*|zagadnieni\w*)\b/gi;

// Phrases banned by the seo-geo-aeo-master protocol.
const BANNED = [/w dzisiejszym szybko zmieniającym się świecie/i, /to jest złożony temat/i, /ważne jest, aby/i];

function strip(md) {
  return md
    .replace(/```[\s\S]*?```/g, "")
    .replace(/\{#[^}]+\}/g, "")
    .replace(/!\[[^\]]*\]\([^)]*\)/g, "")
    .replace(/\[([^\]]+)\]\([^)]*\)/g, "$1")
    .replace(/[*_`>]/g, "");
}

function isListOrMeta(line) {
  return (
    /^\s*([-*]|\d+\.)\s/.test(line) ||
    /^\s*#/.test(line) ||
    /^\s*---/.test(line) ||
    /^\s*\|/.test(line) ||
    /^\s*>/.test(line) || // answer box: checked separately
    /^\s*\*\*[^*]+\*\*\s*$/.test(line) // bold-only line = FAQ question or label
  );
}

function sentences(text) {
  return text
    .split(/(?<=[.!?…])\s+(?=[A-ZĄĆĘŁŃÓŚŹŻ„"0-9])/)
    .map((s) => s.trim())
    .filter((s) => s.split(/\s+/).length > 1);
}

function lint(file) {
  const raw = fs.readFileSync(file, "utf8");
  const body = raw.split(/\n## Źródła/)[0]; // sources are references, not prose
  const errors = [];
  const warnings = [];
  const paragraphs = body.split(/\n{2,}/);
  let all = 0;
  let long = 0;

  // Answer box ("Krótka odpowiedź"): self-contained, 40–70 words, max 5 sentences.
  const box = body.match(/^>.*(?:\n>.*)*/m);
  if (box) {
    const t = strip(box[0].replace(/^>\s?/gm, "").replace(/Krótka odpowiedź/, "").replace(/Aktualizacja:.*$/m, ""));
    const n = t.split(/\s+/).filter(Boolean).length;
    if (n < 40 || n > 70) warnings.push(`ramka odpowiedzi ma ${n} słów (40–70)`);
    if (sentences(t).length > 5) warnings.push(`ramka odpowiedzi ma ${sentences(t).length} zdań (max 5)`);
  }

  for (const p of paragraphs) {
    const lines = p.split("\n");
    const prose = lines.filter((l) => !isListOrMeta(l)).join(" ");
    const sents = sentences(strip(prose));
    if (sents.length > RULES.maxParagraphSentences) {
      warnings.push(`akapit ma ${sents.length} zdań (max ${RULES.maxParagraphSentences}): „${sents[0].slice(0, 70)}…”`);
    }
    for (const s of sents) {
      all++;
      const n = s.split(/\s+/).length;
      if (n > RULES.maxSentenceWords) {
        long++;
        warnings.push(`zdanie ${n} słów: „${s.slice(0, 90)}…”`);
      }
    }
    // List items are instructions: they always get the strict limit.
    for (const l of lines.filter((x) => /^\s*([-*]|\d+\.)\s/.test(x))) {
      for (const s of sentences(strip(l.replace(/^\s*([-*]|\d+\.)\s/, "")))) {
        const n = s.split(/\s+/).length;
        if (n > RULES.maxSentenceWords) errors.push(`instrukcja ${n} słów: „${s.slice(0, 90)}…”`);
      }
    }
  }

  const text = strip(body);
  for (const re of METADISCOURSE) {
    const m = text.match(re);
    if (m) errors.push(`metadyskurs: „${m[0]}”`);
  }
  for (const re of HEDGING) {
    const m = text.match(re);
    if (m) errors.push(`asekuracja: „${m[0]}”`);
  }
  for (const re of BANNED) {
    const m = text.match(re);
    if (m) errors.push(`zakazana fraza: „${m[0]}”`);
  }
  const z = text.match(ZOMBIE);
  if (z) warnings.push(`martwy czasownik (nominalizacja): „${z[0]}”`);
  const metas = text.match(META_CONCEPTS) || [];
  if (metas.length > 3) warnings.push(`metapojęcia (${metas.length}×): ${[...new Set(metas.map((m) => m.toLowerCase()))].join(", ")}`);
  if (all && long / all > RULES.maxLongSentenceShare) {
    errors.push(`za dużo długich zdań: ${long}/${all} (${Math.round((long / all) * 100)}%, max ${RULES.maxLongSentenceShare * 100}%)`);
  }

  // Hook: the first line must be short (max 15 words, protocol rule).
  const first = strip(raw.split("\n").find((l) => l.trim()) || "");
  const hookWords = first.split(/\s+/).filter(Boolean).length;
  if (hookWords > 15) errors.push(`hak ma ${hookWords} słów (max 15)`);

  return { file, errors, warnings, sentences: all, long };
}

const files = process.argv.slice(2);
if (!files.length) {
  console.error("Użycie: node scripts/article-lint.mjs plik.md [...]");
  process.exit(2);
}
let failed = false;
for (const f of files) {
  const r = lint(f);
  console.log(`\n${r.errors.length ? "✗" : "✓"} ${r.file}  (zdania: ${r.sentences}, długie: ${r.long})`);
  for (const e of r.errors) console.log(`  BŁĄD   ${e}`);
  for (const w of r.warnings) console.log(`  uwaga  ${w}`);
  if (r.errors.length) failed = true;
}
process.exit(failed ? 1 : 0);
