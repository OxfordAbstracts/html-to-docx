#!/usr/bin/env node

import fs from "node:fs/promises"
import path from "node:path"
import lib from "../dist/index-cjs.js"

const htmlToDocx = lib.default || lib

async function main () {
  const [src, dst] = process.argv.slice(2)

  if (!src) {
    console.error("Usage: html-to-docx <input.html> [output.docx]");
    process.exit(1);
  }

  const inPath = path.resolve(src);

  let outPath;
  if (dst) {
    outPath = path.resolve(dst);
  } else {
    // derive <input>.docx from the input path
    const { dir, name } = path.parse(inPath);
    outPath = path.join(dir, `${name}.docx`);
  }

  const html = await fs.readFile(inPath, "utf8")
  const docx = await htmlToDocx(html, null, {}, null)

  await fs.writeFile(outPath, Buffer.from(docx))
}

main()
