# @oxfordabstracts/html-to-docx

`@oxfordabstracts/html-to-docx` is a TypeScript library
for converting HTML documents to DOCX format as supported by
Microsoft Word 2007+, LibreOffice Writer, Google Docs, WPS Writer, etc.


## Installation

### CLI

```bash
npm install --global @oxfordabstracts/html-to-docx
```


### Library

```bash
npm install --save @oxfordabstracts/html-to-docx
```


## Usage

```js
await HTMLtoDOCX(htmlStr, headerHTMLStr, documentOptions, footerHTMLStr)
```

Full fledged examples can be found in the [`example`](./example) directory.


### Parameters

- `htmlString` <[String]> clean html string equivalent of document content.
- `headerHTMLString` <[String]> clean html string equivalent of header.
  Defaults to `<p></p>` if header flag is `true`.
- `documentOptions` <?[Object]>
  - `orientation` <"portrait"|"landscape"> defines the general orientation of the document.
    Defaults to portrait.
  - `pageSize` <?[Object]> Defaults to U.S. letter portrait orientation.
    - `width` <[Number]> width of the page for all pages in this section in [TWIP].
      Defaults to 12240.
      Maximum 31680.
      Supports equivalent measurement in [pixel], [cm] or [inch].
    - `height` <[Number]> height of the page for all pages in this section in [TWIP].
      Defaults to 15840.
      Maximum 31680.
      Supports equivalent measurement in [pixel], [cm] or [inch].
  - `margins` <?[Object]>
    - `top` <[Number]> distance between the top of the text margins for the main document and the top of the page for all pages in this section in [TWIP].
      Defaults to 1440.
      Supports equivalent measurement in [pixel], [cm] or [inch].
    - `right` <[Number]> distance between the right edge of the page and the right edge of the text extents for this document in [TWIP].
      Defaults to 1800.
      Supports equivalent measurement in [pixel], [cm] or [inch].
    - `bottom` <[Number]> distance between the bottom of text margins for the document and the bottom of the page in [TWIP].
      Defaults to 1440.
      Supports equivalent measurement in [pixel], [cm] or [inch].
    - `left` <[Number]> distance between the left edge of the page and the left edge of the text extents for this document in [TWIP].
      Defaults to 1800.
      Supports equivalent measurement in [pixel], [cm] or [inch].
    - `header` <[Number]> distance from the top edge of the page to the top edge of the header in [TWIP].
      Defaults to 720.
      Supports equivalent measurement in [pixel], [cm] or [inch].
    - `footer` <[Number]> distance from the bottom edge of the page to the bottom edge of the footer in [TWIP].
      Defaults to 720.
      Supports equivalent measurement in [pixel], [cm] or [inch].
    - `gutter` <[Number]> amount of extra space added to the specified margin, above any existing margin values.
      This setting is typically used when a document is being created for binding in [TWIP].
      Defaults to 0.
      Supports equivalent measurement in [pixel], [cm] or [inch].
  - `title` <?[String]> title of the document.
  - `subject` <?[String]> subject of the document.
  - `creator` <?[String]> creator of the document.
    Defaults to `@oxfordabstracts/html-to-docx`
  - `keywords` <?[Array]<[String]>> keywords associated with the document.
    Defaults to ['@oxfordabstracts/html-to-docx'].
  - `description` <?[String]> description of the document.
  - `lastModifiedBy` <?[String]> last modifier of the document.
    Defaults to `@oxfordabstracts/html-to-docx`.
  - `revision` <?[Number]> revision of the document.
    Defaults to `1`.
  - `createdAt` <?[Date]> time of creation of the document.
    Defaults to current time.
  - `modifiedAt` <?[Date]> time of last modification of the document.
    Defaults to current time.
  - `headerType` <"default"|"first"|"even"> type of header.
    Defaults to `default`.
  - `header` <?[Boolean]> flag to enable header.
    Defaults to `false`.
  - `footerType` <"default"|"first"|"even"> type of footer.
    Defaults to `default`.
  - `footer` <?[Boolean]> flag to enable footer.
    Defaults to `false`.
  - `font` <?[String]> font name to be used.
    Defaults to `Times New Roman`.
  - `fontSize` <?[Number]> size of font in HIP(Half of point).
    Defaults to `22`.
    Supports equivalent measure in [pt].
  - `complexScriptFontSize` <?[Number]> size of complex script font in HIP(Half of point).
    Defaults to `22`.
    Supports equivalent measure in [pt].
  - `table` <?[Object]>
    - `row` <?[Object]>
      - `cantSplit` <?[Boolean]> flag to allow table row to split across pages.
        Defaults to `false`.
  - `pageNumber` <?[Boolean]> flag to enable page number in footer.
    Defaults to `false`.
    Page number works only if footer flag is set as `true`.
  - `skipFirstHeaderFooter` <?[Boolean]> flag to skip first page header and footer.
    Defaults to `false`.
  - `lineNumber` <?[Boolean]> flag to enable line numbering.
    Defaults to `false`.
  - `lineNumberOptions` <?[Object]>
    - `start` <[Number]> start of the numbering - 1.
      Defaults to `0`.
    - `countBy` <[Number]> skip numbering in how many lines in between + 1.
      Defaults to `1`.
    - `restart` <"continuous"|"newPage"|"newSection"> numbering restart strategy.
      Defaults to `continuous`.
  - `numbering` <?[Object]>
    - `defaultOrderedListStyleType` <?[String]> default ordered list style type.
      Defaults to `decimal`.
  - `decodeUnicode` <?[Boolean]> flag to enable unicode decoding of header, body and footer.
    Defaults to `false`.
  - `lang` <?[String]> language localization code for spell checker to work properly.
    Defaults to `en-US`.
- `footerHTMLString` <[String]> clean html string equivalent of footer.
  Defaults to `<p></p>` if footer flag is `true`.

[String]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#String_type "String"
[Object]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object "Object"
[Number]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Number_type "Number"
[TWIP]: https://en.wikipedia.org/wiki/Twip "TWIP"
[Array]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array "Array"
[Date]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date "Date"
[Boolean]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Boolean_type "Boolean"
[pixel]: https://en.wikipedia.org/wiki/Pixel#:~:text=Pixels%2C%20abbreviated%20as%20%22px%22,what%20screen%20resolution%20views%20it. "pixel"
[cm]: https://en.wikipedia.org/wiki/Centimetre "cm"
[inch]: https://en.wikipedia.org/wiki/Inch "inch"
[pt]: https://en.wikipedia.org/wiki/Point_(typography) "pt"


### Returns

```ts
<Promise<Buffer|Blob>>
```

- [Promise]
- [Buffer]
- [Blob]

[Promise]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise
[Buffer]: https://nodejs.org/api/buffer.html#buffer_buffer
[Blob]: https://developer.mozilla.org/en-US/docs/Web/API/Blob


## Notes

Currently page break can be implemented by having
a `div` with `class="page-break"` or `"page-break-after"`.
Contents inside the div element will be ignored.
E.g.: `<div class="page-break" style="page-break-after: always;"></div>`

`list-style-type` for `<ol>` elements is supported.
For example:

```html
<ol style="list-style-type: lower-alpha;">
  <li>List item</li>
  …
</ol>
```

List of supported `list-style-type`s:

- `upper-alpha`, will result in `A. List item`
- `lower-alpha`, will result in `a. List item`
- `upper-roman`, will result in `I. List item`
- `lower-roman`, will result in `i. List item`
- `lower-alpha-bracket-end`, will result in `a) List item`
- `decimal-bracket-end`, will result in `1) List item`
- `decimal-bracket`, will result in `(1) List item`
- `decimal`, **(the default)** will result in `1. List item`

You can also add `data-start="n"` to start the numbering from the n-th.
`<ol data-start="2">` will start the numbering from ( B. b. II. ii. 2. ).

`font-family` doesn't work consistently for all word processors.

- Word Desktop works as intended
- LibreOffice ignores the `fontTable.xml` file, and finds a font by itself
- Word Online ignores the `fontTable.xml` file,
  and finds closest font in their font library


## Contributing

Pull requests are welcome.
For major changes, please open an issue first
to discuss what you would like to change.

Don't forget to run `just build` after any changes to build
the final release targets in [`dist`](./dist).
