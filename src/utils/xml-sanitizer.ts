/**
 * Removes invalid XML characters from a string and escapes XML special characters.
 *
 * Valid XML characters according to the XML 1.0 specification:
 * - #x9 (tab)
 * - #xA (line feed)
 * - #xD (carriage return)
 * - #x20-#xD7FF
 * - #xE000-#xFFFD
 * - #x10000-#x10FFFF
 *
 * This function removes characters like #x0B (vertical tab) and other
 * control characters that are not valid in XML, and also escapes special
 * XML characters (&, <, >) that must be escaped in text content.
 *
 * Note: Quotes and apostrophes are not escaped here because they only need
 * to be escaped in XML attributes, not in text content.
 */
export function sanitizeXmlString(str: string): string {
  if (!str) return str

  // First, escape XML special characters that must be escaped in text content
  // Only &, <, and > need to be escaped in text content
  // Quotes and apostrophes only need escaping in attributes
  let escaped = str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")

  // Then remove invalid XML characters using a regex
  // This regex matches valid XML characters and replaces everything else
  return escaped.replace(
    /[^\x09\x0A\x0D\x20-\uD7FF\uE000-\uFFFD\u{10000}-\u{10FFFF}]/gu,
    "",
  )
}

/**
 * Removes invalid XML characters from HTML content before conversion to DOCX.
 * This prevents errors like "hexadecimal value 0x0B, is an invalid character"
 * when the DOCX file is opened.
 *
 * Note: This function only removes invalid characters but does NOT escape
 * XML special characters, as the input is raw HTML that will be parsed.
 */
export function sanitizeHtml(html: string): string {
  if (!html) return html

  // Only remove invalid XML characters, do not escape HTML tags
  return html.replace(
    /[^\x09\x0A\x0D\x20-\uD7FF\uE000-\uFFFD\u{10000}-\u{10FFFF}]/gu,
    "",
  )
}
