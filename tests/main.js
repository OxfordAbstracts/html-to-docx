import fs from 'fs/promises';
import it from 'node:test';
import assert from 'assert';
import JSZip from 'jszip';

import HTMLtoDOCX from '../index.js';

const createdAt = new Date('2025-01-01');

it('creates a valid DocX file', async () => {
  const htmlStr = `
    <html>
      <head>
        <title>Test</title>
      </head>
      <body>
        <p>Test</p>
      </body>
    </html>
  `;
  const docxContentActual = await HTMLtoDOCX(htmlStr, null, {
    createdAt,
    modifiedAt: createdAt,
  });
  const zip = new JSZip();

  const zipContent = await zip.loadAsync(docxContentActual);
  const filesObj = zipContent.files;

  assert.ok('[Content_Types].xml' in filesObj);
  assert.ok('_rels/' in filesObj);
  assert.ok('docProps/' in filesObj);
  assert.ok('docProps/core.xml' in filesObj);
  assert.ok('word/' in filesObj);
  assert.ok('word/_rels/' in filesObj);
  assert.ok('word/_rels/document.xml.rels' in filesObj);
  assert.ok('word/document.xml' in filesObj);
  assert.ok('word/fontTable.xml' in filesObj);
  assert.ok('word/numbering.xml' in filesObj);
  assert.ok('word/settings.xml' in filesObj);
  assert.ok('word/styles.xml' in filesObj);
  assert.ok('word/theme/' in filesObj);
  assert.ok('word/theme/theme1.xml' in filesObj);
  assert.ok('word/webSettings.xml' in filesObj);
});

it('converts HTML with table', async () => {
  const htmlStr = `
    <html>
      <body>
        <table>
          <tr>
            <td>one</td>
            <td>two</td>
          </tr>
        </table>
      </body>
    </html>
  `;
  const docxContentActual = await HTMLtoDOCX(htmlStr, null, {
    createdAt,
    modifiedAt: createdAt,
  });
  const zip = new JSZip();

  const zipContent = await zip.loadAsync(docxContentActual);
  const expectedContent = await fs.readFile('tests/expected-table.xml', 'utf8');
  const actualContent = await zipContent.file('word/document.xml').async('string');

  assert.strictEqual(actualContent.replaceAll(/\s/g, ''), expectedContent.replaceAll(/\s/g, ''));
});

it('converts HTML with percentage width table', async () => {
  const htmlStr = `
    <html>
      <body>
        <table>
          <tr>
            <td style="width: 100%;"></td>
          </tr>
        </table>
      </body>
    </html>
  `;
  const docxContentActual = await HTMLtoDOCX(htmlStr, null, {
    createdAt,
    modifiedAt: createdAt,
  });
  const zip = new JSZip();

  const zipContent = await zip.loadAsync(docxContentActual);
  const expectedContent = await fs.readFile('tests/expected-table-pct.xml', 'utf8');
  const actualContent = await zipContent.file('word/document.xml').async('string');

  assert.strictEqual(actualContent.replaceAll(/\s/g, ''), expectedContent.replaceAll(/\s/g, ''));
});

it('handles large HTML files without stack overflow', async () => {
  function generateLargeHTML(sizeInMB = 5) {
    const paragraphTemplate = '<p>This is a test paragraph with some content.</p>\n';
    const bytesPerParagraph = paragraphTemplate.length;
    const targetBytes = sizeInMB * 1024 * 1024;
    const paragraphCount = Math.ceil(targetBytes / bytesPerParagraph);

    let html = '<html><body>\n';
    for (let i = 0; i < paragraphCount; i += 1) {
      html += paragraphTemplate;
    }
    html += '</body></html>';

    return html;
  }

  const largeHTML = generateLargeHTML(5); // 5MB of HTML
  const docxContent = await HTMLtoDOCX(largeHTML, null, {
    createdAt,
    modifiedAt: createdAt,
  });

  const zip = new JSZip();
  const zipContent = await zip.loadAsync(docxContent);

  // Verify the document was created successfully
  assert.ok('word/document.xml' in zipContent.files);

  // Check that the document contains our content
  const docXml = await zipContent.file('word/document.xml').async('string');
  assert.ok(docXml.includes('<w:t xml:space="preserve">This is a test paragraph'));
});
