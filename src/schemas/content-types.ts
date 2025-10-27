/* eslint-disable max-len */
const contentTypesXML = `
<?xml version="1.0" encoding="UTF-8" standalone="yes"?>

<Types xmlns="http://schemas.openxmlformats.org/package/2006/content-types">
  <Default Extension="rels"
    ContentType="application/vnd.openxmlformats-package.relationships+xml" />
  <Default Extension="jpeg"
    ContentType="image/jpeg"/>
  <Default Extension="jpg"
    ContentType="image/jpeg"/>
  <Default Extension="png"
    ContentType="image/png"/>
  <Default Extension="gif"
    ContentType="image/gif"/>
  <Default Extension="bmp"
    ContentType="image/bmp"/>
  <Default Extension="tiff"
    ContentType="image/tiff"/>
  <Default Extension="tif"
    ContentType="image/tiff"/>
  <Default Extension="webp"
    ContentType="image/webp"/>
  <Default Extension="emf"
    ContentType="image/emf"/>
  <Default Extension="xml"
    ContentType="application/xml"/>
  <Override PartName="/_rels/.rels"
    ContentType="application/vnd.openxmlformats-package.relationships+xml"/>
  <Override PartName="/word/_rels/document.xml.rels"
    ContentType="application/vnd.openxmlformats-package.relationships+xml"/>
  <Override PartName="/word/document.xml"
    ContentType="application/vnd.openxmlformats-officedocument.wordprocessingml.document.main+xml"/>
  <Override PartName="/word/styles.xml"
    ContentType="application/vnd.openxmlformats-officedocument.wordprocessingml.styles+xml"/>
  <Override PartName="/word/numbering.xml"
    ContentType="application/vnd.openxmlformats-officedocument.wordprocessingml.numbering+xml"/>
  <Override PartName="/word/theme/theme1.xml"
    ContentType="application/vnd.openxmlformats-officedocument.theme+xml"/>
  <Override PartName="/word/fontTable.xml"
    ContentType="application/vnd.openxmlformats-officedocument.wordprocessingml.fontTable+xml"/>
  <Override PartName="/docProps/core.xml"
    ContentType="application/vnd.openxmlformats-package.core-properties+xml"/>
  <Override PartName="/word/settings.xml"
    ContentType="application/vnd.openxmlformats-officedocument.wordprocessingml.settings+xml"/>
  <Override PartName="/word/webSettings.xml"
    ContentType="application/vnd.openxmlformats-officedocument.wordprocessingml.webSettings+xml"/>
</Types>
`

export default contentTypesXML
