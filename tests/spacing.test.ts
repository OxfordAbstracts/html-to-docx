import JSZip from "jszip"
import fs from "node:fs/promises"
import { assert, test } from "vitest"

import htmlToDocx from "../index.ts"
import writeFile from "./write-file.ts"

const createdAt = new Date("2025-01-01")

test("spacing", async ({ expect }) => {
  const largeHTML = await fs.readFile("tests/spacing.html", "utf8")
  const docxContent = await htmlToDocx(
    largeHTML,
    null,
    {
      createdAt,
      modifiedAt: createdAt,
    },
    null,
  )
  await writeFile(docxContent, "tests/spacing_tmp_.docx")

  const zip = new JSZip()
  const zipContent = await zip.loadAsync(docxContent)

  assert.ok("word/document.xml" in zipContent.files)

  const docXml = (await zipContent.file("word/document.xml")
    ?.async("string") || "")
    .trim()

  expect(docXml).toMatchFileSnapshot("./spacing.xml")
})
