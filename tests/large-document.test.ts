import JSZip from "jszip"
import fs from "node:fs/promises"
import { assert, test } from "vitest"

import htmlToDocx from "../index.ts"
import writeFile from "./write-file.ts"

const createdAt = new Date("2025-01-01")

function getSection(id = 0) {
  return `
    <section id="section-${id}">
      <h1>This is a test heading</h1>
      <p>This is a test paragraph with some content.</p>
      <p>A random number: ${Math.random()}</p>
      <ul>
        <li>Item 1</li>
        <li>Item 2</li>
        <li>Item 3</li>
      </ul>
      <table>
        <tr>
          <th>Header 1</th>
          <th>Header 2</th>
        </tr>
        <tr>
          <td>Cell 1</td>
          <td>Cell 2</td>
        </tr>
      </table>
    </section>
  `
}

function generateLargeHTML(sizeInMB = 2) {
  const bytesPerParagraph = getSection().length
  const targetBytes = sizeInMB * 1024 * 1024
  const paragraphCount = Math.ceil(targetBytes / bytesPerParagraph)
  const body = Array(paragraphCount)
    .fill("")
    .map((_val, idx) => getSection(idx))
    .join("")

  return `
    <html>
      <head>
        <title>Test Document</title>
      </head>
      <body>
        ${body}
      </body>
    </html>
  `
}

test("handles a large HTML file", async () => {
  const largeHTML = generateLargeHTML()
  const docxContent = await htmlToDocx(
    largeHTML,
    null,
    {
      createdAt,
      modifiedAt: createdAt,
    },
    null,
  )
  await writeFile(docxContent, "tests/large-html_tmp_.docx")

  const zip = new JSZip()
  const zipContent = await zip.loadAsync(docxContent)

  assert.ok("word/document.xml" in zipContent.files)

  const docXml = await zipContent.file("word/document.xml")
    ?.async("string") || ""

  assert.ok(
    docXml.includes('<w:t xml:space="preserve">This is a test paragraph'),
  )
})

// TODO: Fix this test
test.skip("handles an HTML file that embeds other content", async () => {
  const largeHTML = await fs.readFile("tests/html5-embed.html", "utf8")
  const docxContent = await htmlToDocx(
    largeHTML,
    null,
    {
      createdAt,
      modifiedAt: createdAt,
    },
    null,
  )
  await writeFile(docxContent, "tests/html5-embed_tmp_.docx")

  const zip = new JSZip()
  const zipContent = await zip.loadAsync(docxContent)

  assert.ok("word/document.xml" in zipContent.files)

  const docXml = await zipContent.file("word/document.xml")
    ?.async("string") || ""
  assert.ok(docXml.includes("<w:body>"))
  assert.ok(docXml.includes("</w:body>"))
})
