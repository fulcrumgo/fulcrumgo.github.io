/**
 * The seminar decks were exported from Google Slides and arrived with export
 * metadata ("Day 1_Leafclutch", creator "Google"). They are not built by the
 * deck pipeline, so their document properties are set here instead.
 *
 * Run with `npm run decks:seminars` after replacing either file.
 */
import { readFileSync, writeFileSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { PDFDocument } from "pdf-lib";

const dir = join(dirname(fileURLToPath(import.meta.url)), "..", "public", "materials");

const seminars = [
  {
    file: "fulcrum-ai-basics-day1.pdf",
    title: "AI Basics, Day 1",
    subject:
      "Foundations and the big picture: why AI broke open in the 2020s, how models learn, transformers, and how images become numbers. Delivered with Leafclutch Technologies Pvt. Ltd., March 2026.",
  },
  {
    file: "fulcrum-ai-basics-day2.pdf",
    title: "AI Basics, Day 2",
    subject:
      "Skills, applications, careers and research: automating tasks with Python, the branches of AI, where it is applied, and how research actually gets done. Delivered with Leafclutch Technologies Pvt. Ltd., March 2026.",
  },
];

for (const s of seminars) {
  const path = join(dir, s.file);
  const doc = await PDFDocument.load(readFileSync(path));
  doc.setTitle(s.title);
  doc.setAuthor("Utsav Poudel, Founder, Fulcrum");
  doc.setSubject(s.subject);
  doc.setKeywords([
    "Fulcrum",
    "AI Basics",
    "seminar slides",
    "Leafclutch Technologies",
    "artificial intelligence",
  ]);
  doc.setCreator("Fulcrum (fulcrumgo.github.io)");
  writeFileSync(path, await doc.save());
  console.log(`  tagged  ${s.file}`);
}
