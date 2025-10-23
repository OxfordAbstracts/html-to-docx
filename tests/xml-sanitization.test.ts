import { expect, test } from "vitest"
import htmlToDocx from "../index"
import { sanitizeHtml, sanitizeXmlString } from "../src/utils/xml-sanitizer"

test("removes vertical tab (0x0B) character", () => {
  const input = "Hello\x0BWorld"
  const expected = "HelloWorld"
  expect(sanitizeXmlString(input))
    .toBe(expected)
})

test("removes other invalid control characters", () => {
  const input = "Test\x00\x01\x02\x03\x04\x05\x06\x07\x08String"
  const expected = "TestString"
  expect(sanitizeXmlString(input))
    .toBe(expected)
})

test(
  "preserves valid characters like tab, line feed, and carriage return",
  () => {
    const input = "Line1\tTabbed\nLine2\rLine3"
    expect(sanitizeXmlString(input))
      .toBe(input)
  },
)

test("preserves normal text and spaces", () => {
  const input = "Normal text with spaces and punctuation!"
  expect(sanitizeXmlString(input))
    .toBe(input)
})

test("escapes XML special characters in text content", () => {
  const input = "A&B<C>D"
  const expected = "A&amp;B&lt;C&gt;D"
  expect(sanitizeXmlString(input))
    .toBe(expected)
})

test("does not escape quotes and apostrophes in text content", () => {
  const input = "John's book \"Hello World\""
  const expected = "John's book \"Hello World\""
  expect(sanitizeXmlString(input))
    .toBe(expected)
})

test("escapes ampersands in text", () => {
  const input = "Ampersand: & and A&B"
  const expected = "Ampersand: &amp; and A&amp;B"
  expect(sanitizeXmlString(input))
    .toBe(expected)
})

test("preserves Unicode characters in valid range", () => {
  const input = "Hello 世界 🌍 Привет"
  expect(sanitizeXmlString(input))
    .toBe(input)
})

test("handles empty string", () => {
  expect(sanitizeXmlString(""))
    .toBe("")
})

test("handles null and undefined", () => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  expect(sanitizeXmlString(null as any))
    .toBe(null)
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  expect(sanitizeXmlString(undefined as any))
    .toBe(undefined)
})

test("sanitizeHtml removes invalid characters from HTML", () => {
  const html = "<p>Hello\x0BWorld</p><div>Test\x00Content</div>"
  const expected = "<p>HelloWorld</p><div>TestContent</div>"
  expect(sanitizeHtml(html))
    .toBe(expected)
})

test("removes multiple types of invalid characters in one string", () => {
  const input = "Start\x0B\x0C\x0E\x0F\x10\x11End"
  const expected = "StartEnd"
  expect(sanitizeXmlString(input))
    .toBe(expected)
})

test(
  "end-to-end: invalid characters are removed during DOCX conversion",
  async () => {
    // Test that invalid XML characters are removed in the conversion process
    const html = `
    <html>
      <body>
        <p>This text has a vertical tab\x0Bhere</p>
        <p>And null character\x00here</p>
        <p>Multiple\x0B\x0C\x0Einvalid\x0Fcharacters</p>
      </body>
    </html>
  `

    // This should not throw an error
    const docx = await htmlToDocx(html, null, {
      orientation: "portrait",
    }, null)

    // The conversion should succeed and return a buffer or Blob
    expect(docx)
      .toBeDefined()
    // Check if it's a Buffer (Node.js) or Uint8Array or Blob
    const isValidOutput = docx instanceof Buffer ||
      docx instanceof Uint8Array ||
      docx instanceof Blob
    expect(isValidOutput)
      .toBe(true)
  },
)
