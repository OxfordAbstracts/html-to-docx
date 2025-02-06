import JSZip from "jszip"
import addFilesToContainer from "./src/html-to-docx.ts"
import { type DocumentOptions } from "./src/types.ts"

function minifyHTMLString(htmlString) {
  try {
    if (typeof htmlString === "string" || htmlString instanceof String) {
      const minifiedHTMLString = htmlString
        .replace(/\n/g, " ")
        .replace(/\r/g, " ")
        .replace(/\r\n/g, " ")
        .replace(/[\t]+</g, "<")
        .replace(/>[\t ]+</g, "><")
        .replace(/>[\t ]+$/g, ">")

      return minifiedHTMLString
    }

    throw new Error("invalid html string")
  }
  catch (error) {
    console.error(error)
  }
}

export default async function generateContainer(
  htmlString: string,
  headerHTMLString: string,
  documentOptions: DocumentOptions,
  footerHTMLString?: string,
) {
  const zip = new JSZip()

  let contentHTML = htmlString
  let headerHTML = headerHTMLString
  let footerHTML = footerHTMLString
  if (htmlString) {
    contentHTML = minifyHTMLString(contentHTML)
  }
  if (headerHTMLString) {
    headerHTML = minifyHTMLString(headerHTML)
  }
  if (footerHTMLString) {
    footerHTML = minifyHTMLString(footerHTML)
  }

  await addFilesToContainer(
    zip,
    contentHTML,
    documentOptions,
    headerHTML,
    footerHTML,
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
