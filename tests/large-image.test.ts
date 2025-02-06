import assert from "assert"
import { createCanvas } from "canvas"
import fs from "fs/promises"
import JSZip from "jszip"
import { test } from "node:test"

import htmlToDocx from "../index.ts"
import writeFile from "./write-file.ts"

const createdAt = new Date("2025-01-01")

function generateRandomImageDataURL(width = 100, height = 100) {
  const canvas = createCanvas(Math.round(width), Math.round(height))
  const ctx = canvas.getContext("2d")
  const imageData = ctx.createImageData(Math.round(width), Math.round(height))

  for (let idx = 0; idx < imageData.data.length; idx += 4) {
    imageData.data[idx] = Math.random() * 255 // Red
    imageData.data[idx + 1] = Math.random() * 255 // Green
    imageData.data[idx + 2] = Math.random() * 255 // Blue
    imageData.data[idx + 3] = 255 // Alpha (fully opaque)
  }
  ctx.putImageData(imageData, 0, 0)

  return canvas.toDataURL()
}

function generateHTMLWithImages(numberOfImages = 4, imgSizeInMb = 4) {
  const widthAndHeight = Math.sqrt((imgSizeInMb * 1024 * 1024) / 4)
  let html = `
    <html>
      <head>
        <title>Test Document</title>
      </head>
      <body>`
  for (let _idx = 0; _idx < numberOfImages; _idx++) {
    const src = generateRandomImageDataURL(widthAndHeight, widthAndHeight)
    html += `<img src="${src}" />`
  }
  html += `
      </body>
    </html>
  `
  return html.replaceAll(/>\s+</gm, "><")
}

test("handles HTML file with an image", async () => {
  const html = generateHTMLWithImages(1, 0.2)
  const docxContent = await htmlToDocx(html, null, {
    createdAt,
    modifiedAt: createdAt,
    footer: true,
  })
  writeFile(docxContent, "tests/_tmp_html-with-image.docx")

  const zip = new JSZip()
  const zipContent = await zip.loadAsync(docxContent)

  assert.ok("word/document.xml" in zipContent.files)

  const imgRegex = /"image-[^.]+\./g
  const docXml = (await zipContent.file("word/document.xml")
    ?.async("string") || "")
    .replaceAll(imgRegex, '"image.')
    .trim()
  const expectedDocXml = (await fs
    .readFile("tests/large-image-document.xml", "utf8"))
    .replaceAll(imgRegex, '"image.')
    .trim()
  assert.strictEqual(docXml, expectedDocXml)
})

test("handles large images in HTML file", async () => {
  const largeHTML = generateHTMLWithImages()
  const docxContent = await htmlToDocx(largeHTML, null, {
    createdAt,
    modifiedAt: createdAt,
  })
  writeFile(docxContent, "tests/_tmp_html-with-images.docx")

  const zip = new JSZip()
  const zipContent = await zip.loadAsync(docxContent)

  assert.ok("word/document.xml" in zipContent.files)

  const docXml = await zipContent.file("word/document.xml")
    ?.async("string") || ""
  assert.ok(docXml.includes('<pic:cNvPr id="2" name="image-'))
})
