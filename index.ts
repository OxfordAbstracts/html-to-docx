import JSZip from "jszip"
import addFilesToContainer from "./src/html-to-docx.ts"
import { type DocumentOptions } from "./src/types.ts"

function minifyHTMLString(htmlString: string) {
  // First, protect content inside <pre> tags from minification
  const preContentMap = new Map<string, string>()
  let preIndex = 0

  // Find all <pre> tag content and replace with placeholders
  const protectedHTMLString = htmlString.replace(
    /<pre(\s[^>]*)?>([^]*?)<\/pre>/gi,
    (match, attributes, content) => {
      const placeholder = `__PRE_PLACEHOLDER_${preIndex++}__`
      preContentMap.set(placeholder, content)
      return `<pre${attributes || ""}>${placeholder}</pre>`
    },
  )

  let minifiedHTMLString = protectedHTMLString
    .replace(/\n/g, " ")
    .replace(/\r/g, " ")
    .replace(/\r\n/g, " ")
    .replace(/[\t]+</g, "<")
    .replace(/>[\t ]+$/g, ">")

  // Remove HTML comments
  minifiedHTMLString = minifiedHTMLString.replace(/<!--.*?-->/g, "")

  // Use placeholder to protect spaces between closing and opening tags
  minifiedHTMLString = minifiedHTMLString.replace(/>\s+</g, ">__SPACE__<")

  // Preserve spaces only between inline elements by restoring specific patterns
  const inlineElements = [
    "a",
    "abbr",
    "acronym",
    "b",
    "bdo",
    "big",
    "br",
    "button",
    "cite",
    "code",
    "dfn",
    "em",
    "i",
    "img",
    "input",
    "kbd",
    "label",
    "map",
    "object",
    "q",
    "samp",
    "script",
    "select",
    "small",
    "span",
    "strong",
    "sub",
    "sup",
    "textarea",
    "tt",
    "var",
    "u",
    "ins",
    "del",
    "s",
    "strike",
    "mark",
  ]

  // Combined pattern: preserve spaces between inline elements
  // (with or without attributes)
  const inlinePattern = new RegExp(
    `</(${inlineElements.join("|")})>__SPACE__<(${
      inlineElements.join("|")
    })(\\s[^>]*)?>`,
    "gi",
  )
  minifiedHTMLString = minifiedHTMLString.replace(inlinePattern, "</$1> <$2$3>")

  // Remove remaining placeholder spaces
  minifiedHTMLString = minifiedHTMLString.replace(/__SPACE__/g, "")

  // Restore original pre content
  preContentMap.forEach((originalContent, placeholder) => {
    minifiedHTMLString = minifiedHTMLString.replace(
      placeholder,
      originalContent,
    )
  })

  return minifiedHTMLString
}

export default async function generateContainer(
  htmlString: string | null,
  headerHTMLString: string | null,
  documentOptions: DocumentOptions,
  footerHTMLString: string | null,
) {
  const zip = new JSZip()

  await addFilesToContainer(
    zip,
    htmlString ? minifyHTMLString(htmlString) : "",
    documentOptions,
    headerHTMLString ? minifyHTMLString(headerHTMLString) : "",
    footerHTMLString ? minifyHTMLString(footerHTMLString) : "",
  )

  const buffer = await zip.generateAsync({ type: "arraybuffer" })
  if (Object.prototype.hasOwnProperty.call(global, "Buffer")) {
    return Buffer.from(new Uint8Array(buffer))
  }
  if (Object.prototype.hasOwnProperty.call(global, "Blob")) {
    return new Blob([buffer], {
      type: "application/" +
        "vnd.openxmlformats-officedocument.wordprocessingml.document",
    })
  }
  throw new Error(
    "Add blob support using a polyfill. " +
      "E.g. https://github.com/bjornstar/blob-polyfill",
  )
}
