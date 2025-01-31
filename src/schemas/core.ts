import { applicationName } from "../constants.ts"
import namespaces from "../namespaces.ts"

export default function generateCoreXML(
  title = "",
  subject = "",
  creator = applicationName,
  keywords = [applicationName],
  description = "",
  lastModifiedBy = applicationName,
  revision = 1,
  createdAt = new Date(),
  modifiedAt = new Date(),
) {
  const keyws = keywords && Array.isArray(keywords)
    ? `<cp:keywords>${keywords.join(", ")}</cp:keywords>`
    : ""
  const crAt = createdAt instanceof Date ? createdAt.toISOString() : new Date()
    .toISOString()
  const modAt = modifiedAt instanceof Date
    ? modifiedAt.toISOString()
    : new Date()
      .toISOString()

  return `
    <?xml version="1.0" encoding="UTF-8" standalone="yes"?>

    <cp:coreProperties
      xmlns:cp="${namespaces.coreProperties}"
      xmlns:dc="${namespaces.dc}"
      xmlns:dcterms="${namespaces.dcterms}"
      xmlns:dcmitype="${namespaces.dcmitype}"
      xmlns:xsi="${namespaces.xsi}"
    >
      <dc:title>${title}</dc:title>
      <dc:subject>${subject}</dc:subject>
      <dc:creator>${creator}</dc:creator>
      ${keyws}
      <dc:description>${description}</dc:description>
      <cp:lastModifiedBy>${lastModifiedBy}</cp:lastModifiedBy>
      <cp:revision>${revision}</cp:revision>
      <dcterms:created xsi:type="dcterms:W3CDTF">${crAt}</dcterms:created>
      <dcterms:modified xsi:type="dcterms:W3CDTF">${modAt}</dcterms:modified>
    </cp:coreProperties>
  `
}
