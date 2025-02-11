import JSZip from "jszip"
import addFilesToContainer from "./src/html-to-docx.ts"
import { type DocumentOptions } from "./src/types.ts"

function minifyHTMLString(htmlString: string) {
  const minifiedHTMLString = htmlString
    .replace(/\n/g, " ")
    .replace(/\r/g, " ")
    .replace(/\r\n/g, " ")
    .replace(/[\t]+</g, "<")
    .replace(/>[\t ]+</g, "><")
    .replace(/>[\t ]+$/g, ">")

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
