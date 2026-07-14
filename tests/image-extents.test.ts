import { createCanvas } from "canvas"
import JSZip from "jszip"
import { assert, test } from "vitest"

import htmlToDocx from "../index.ts"

const createdAt = new Date("2025-01-01")

function generateImageDataURL(width = 100, height = 100) {
  const canvas = createCanvas(Math.round(width), Math.round(height))
  const ctx = canvas.getContext("2d")
  const imageData = ctx.createImageData(Math.round(width), Math.round(height))

  for (let idx = 0; idx < imageData.data.length; idx += 4) {
    imageData.data[idx] = 255 // Red
    imageData.data[idx + 3] = 255 // Alpha (fully opaque)
  }
  ctx.putImageData(imageData, 0, 0)

  return canvas.toDataURL()
}

async function documentXmlFor(html: string): Promise<string> {
  const docxContent = await htmlToDocx(
    html,
    null,
    {
      createdAt,
      modifiedAt: createdAt,
      embedImages: true,
    },
    null,
  )
  const zip = new JSZip()
  const zipContent = await zip.loadAsync(docxContent)
  const documentXml = await zipContent.file("word/document.xml")
    ?.async("string")
  assert.ok(documentXml, "docx should contain word/document.xml")
  return documentXml as string
}

function extents(documentXml: string): { cx: string; cy: string }[] {
  return [
    ...documentXml.matchAll(/<wp:extent cx="([^"]*)" cy="([^"]*)"/g),
    ...documentXml.matchAll(/<a:ext cx="([^"]*)" cy="([^"]*)"/g),
  ].map(match => ({ cx: match[1], cy: match[2] }))
}

function assertFiniteExtents(documentXml: string) {
  const allExtents = extents(documentXml)
  assert.ok(allExtents.length > 0, "document should contain drawing extents")
  for (const { cx, cy } of allExtents) {
    assert.match(
      cx,
      /^\d+$/,
      `extent cx should be a non-negative integer, got "${cx}"`,
    )
    assert.match(
      cy,
      /^\d+$/,
      `extent cy should be a non-negative integer, got "${cy}"`,
    )
  }
}

// Word rejects the whole file when a drawing extent is NaN, which used to
// happen for any image width unit that isn't px/em/rem because the raw CSS
// string clobbered the computed dimensions on the run attributes.
const nonPixelWidthStyles = [
  "width:451.3pt;height:222.05pt",
  "width:451pt",
  "width:50%",
  "width:auto;height:100px",
  "width:50vw",
  "width:5cm;height:3cm",
  "width:2in",
]

for (const style of nonPixelWidthStyles) {
  test(`image with style "${style}" produces finite extents`, async () => {
    const imageDataUrl = generateImageDataURL(100, 50)
    const documentXml = await documentXmlFor(
      `<p>before</p><img src="${imageDataUrl}" style="${style}">`,
    )
    assertFiniteExtents(documentXml)
  })
}

test("image with non-px width inside a table produces finite extents", async () => {
  const imageDataUrl = generateImageDataURL(100, 50)
  const documentXml = await documentXmlFor(
    `<table><tr><td><img src="${imageDataUrl}" style="width:451pt"></td></tr></table>`,
  )
  assertFiniteExtents(documentXml)
})

test("pt-sized image is converted to the equivalent EMU width", async () => {
  const imageDataUrl = generateImageDataURL(100, 50)
  const documentXml = await documentXmlFor(
    `<img src="${imageDataUrl}" style="width:100pt;height:50pt">`,
  )
  const [extent] = extents(documentXml)
  // 100pt = 1270000 EMU, 50pt = 635000 EMU
  assert.strictEqual(extent.cx, "1270000")
  assert.strictEqual(extent.cy, "635000")
})

test("styled dimensions wider than the page are scaled down proportionally", async () => {
  const imageDataUrl = generateImageDataURL(100, 50)
  const documentXml = await documentXmlFor(
    `<img src="${imageDataUrl}" style="width:2000px;height:1000px">`,
  )
  const [extent] = extents(documentXml)
  const cx = Number(extent.cx)
  const cy = Number(extent.cy)
  // default page: 12240 - 1800 - 1800 = 8640 TWIP = 5486400 EMU
  assert.ok(cx <= 5486400, `cx ${cx} should be capped to the printable width`)
  assert.approximately(cx / cy, 2, 0.01, "aspect ratio should be preserved")
})

test("header and footer references come before pgSz in sectPr", async () => {
  const docxContent = await htmlToDocx(
    "<p>content</p>",
    null,
    {
      createdAt,
      modifiedAt: createdAt,
      footer: true,
      header: true,
    },
    null,
  )
  const zip = new JSZip()
  const zipContent = await zip.loadAsync(docxContent)
  const documentXml = await zipContent.file("word/document.xml")
    ?.async("string") as string

  const sectPr = documentXml.match(/<w:sectPr>.*<\/w:sectPr>/s)?.[0]
  assert.ok(sectPr, "document should contain a sectPr")

  const headerIndex = (sectPr as string).indexOf("<w:headerReference")
  const footerIndex = (sectPr as string).indexOf("<w:footerReference")
  const pgSzIndex = (sectPr as string).indexOf("<w:pgSz")
  assert.ok(headerIndex !== -1, "sectPr should contain a headerReference")
  assert.ok(footerIndex !== -1, "sectPr should contain a footerReference")
  assert.ok(
    headerIndex < pgSzIndex && footerIndex < pgSzIndex,
    "header/footer references must precede pgSz (CT_SectPr sequence)",
  )
})
