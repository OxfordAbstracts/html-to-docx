/**
 * Removes invalid XML characters from a string.
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
 * control characters that are not valid in XML.
 */
export function sanitizeXmlString(str: string): string {
  if (!str) return str

  // Remove invalid XML characters using a regex
  // This regex matches valid XML characters and replaces everything else
  return str.replace(
    /[^\x09\x0A\x0D\x20-\uD7FF\uE000-\uFFFD\u{10000}-\u{10FFFF}]/gu,
    "",
  )
}

/**
 * Removes invalid XML characters from HTML content before conversion to DOCX.
 * This prevents errors like "hexadecimal value 0x0B, is an invalid character"
 * when the DOCX file is opened.
 */
export function sanitizeHtml(html: string): string {
  return sanitizeXmlString(html)
}
