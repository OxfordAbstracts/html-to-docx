import namespaces from "../namespaces.ts"

export default function generateDocumentTemplate() {
  return `
    <?xml version="1.0" encoding="UTF-8" standalone="yes"?>

    <w:document
      xmlns:a="${namespaces.a}"
      xmlns:cdr="${namespaces.cdr}"
      xmlns:o="${namespaces.o}"
      xmlns:pic="${namespaces.pic}"
      xmlns:r="${namespaces.r}"
      xmlns:v="${namespaces.v}"
      xmlns:ve="${namespaces.ve}"
      xmlns:vt="${namespaces.vt}"
      xmlns:w="${namespaces.w}"
      xmlns:w10="${namespaces.w10}"
      xmlns:wp="${namespaces.wp}"
      xmlns:wne="${namespaces.wne}"
      >
      <w:body>
      </w:body>
    </w:document>
  `
}
