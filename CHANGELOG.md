# Changelog

All notable changes to this project will be documented in this file.


## 2025-10-23 - [2.1.2](https://github.com/OxfordAbstracts/html-to-docx/compare/v2.1.1...v2.1.2)

- Add streaming dimension detection for external images
- Add missing HTML inline elements like `<u>`
- Add `embedImages` option to control image handling
- Fix XML character escaping in text content
- Make all file operations async
- Correctly handle `<object>`, `<iframe>`, and `<embed>` elements
- Fix image rendering in tables and figures


## 2025-09-18 - [2.1.1](https://github.com/OxfordAbstracts/html-to-docx/compare/v2.1.0...v2.1.1)

- Fix calculation of image height


## 2025-09-16 - [2.1.0](https://github.com/OxfordAbstracts/html-to-docx/compare/v1.8.0...v2.1.0)

- Correctly inherit font properties in paragraphs and lists
- Support styling of lists via their classes
- Improve spacing in output
  - Fix spacing between elements with classes
  - Remove unwanted spaces
  - Fix spacing around runs in paragraphs
  - Keep whitespace unchanged in `<pre>` tags
  - Collapse several spaces into one
- `<input>` elements must not create any content in Docx files
- Don't create empty properties
- Correctly handle paragraphs in blockquotes
- Apply parent styles also to inline elements
- Correctly convert CSS size value to a number
- Apply styles provided through classes to final DocX
  - Inherit CSS styling from parent
  - Styling inherits `body` and `*` CSS rules
- Don't create a new paragraph for spans
- Add support for `font-weight`, `font-style`, and `font-family` in CSS classes
- Add support for `text-decoration: underline`
- Add support for `font-style: italic`  and `<em>` tags
- Fix: correctly handle a percentage width for table cells
- Make `<sectPr>` the last element of body as required by spec
- Ensure `cx` and `cy` are always set for `<a:ext>` and `<wp:extent>`
- Handle images without an extension
  - Get mime type of images without extension from its content
- Correctly insert paragraphs into table cells
- Correctly set `margin` when `pageSize` is set
- Correctly load image URLs that have a query string after the pathname
- Include content hash in image IDs
- Set correct image widths for `em` and `rem` dimensions
- Wrap adjacent inline runs with one paragraph instead of one for each
- Support `<img>` nested in `<span>`
- Fix image dimension generation
- Fix generation of DocX run properties for styling


## 2023-03-26 - [1.8.0](https://github.com/OxfordAbstracts/html-to-docx/compare/v1.7.0...v1.8.0)

### Features

- Adds lang variable to the styles ([1102a5b](https://github.com/OxfordAbstracts/html-to-docx/commit/1102a5bd707bd7130ef047f33f94d0b665d6a82c))
- Font-family: use the first element as the font name ([d62ecdc](https://github.com/OxfordAbstracts/html-to-docx/commit/d62ecdcf3d887bc23aa7c8e3f916db7444a48d96))
- Font: register fonts in fontTable.xml ([013938e](https://github.com/OxfordAbstracts/html-to-docx/commit/013938ef0c46bcac5aa24c8b659763cdf916066b))

### Bug Fixes

- Skip head tag from processing ([a3eedbc](https://github.com/OxfordAbstracts/html-to-docx/commit/a3eedbc375af33891bb4b474c4b957c825e96b1a))


## 2023-03-19 - [1.7.0](https://github.com/OxfordAbstracts/html-to-docx/compare/v1.6.5...v1.7.0)

### Bug Fixes

- Add option to decode unicode in order to prevent crash ([95d3419](https://github.com/OxfordAbstracts/html-to-docx/commit/95d3419fa9d5590deb9541f28dda813843592562))
- Support plain text ([7b2ca06](https://github.com/OxfordAbstracts/html-to-docx/commit/7b2ca06c9ded9450d84cad5305a19c87d166daf3))
- Use image alt as description for images ([46d1fb8](https://github.com/OxfordAbstracts/html-to-docx/commit/46d1fb8bead9ebb6f47a131c20247c316d638e6d))
- Use image alt as description for images in paragraphs ([4d4da94](https://github.com/OxfordAbstracts/html-to-docx/commit/4d4da9457c74820bee0acd03f2dc1459bc2fa1e4))


## 2023-01-17 - [1.6.5](https://github.com/OxfordAbstracts/html-to-docx/compare/v1.6.4...v1.6.5)


## 2022-11-18 - [1.6.4](https://github.com/OxfordAbstracts/html-to-docx/compare/v1.6.3...v1.6.4)

### Bug Fixes

- Force point to specific versions of @oozcitak/util and @oozcitak/dom ([968d8e1](https://github.com/OxfordAbstracts/html-to-docx/commit/968d8e1ccd1c6e21868c9bd01a012f3010677281))


## 2022-11-17 - [1.6.3](https://github.com/OxfordAbstracts/html-to-docx/compare/v1.6.2...v1.6.3)

### Bug Fixes

- Add pre-install script to force resolutions ([8f2ab68](https://github.com/OxfordAbstracts/html-to-docx/commit/8f2ab68e2d358ca96209b7df1065d403e2259c8a))
- Add resolutions for xmlbuilder2 deps ([70e2ce1](https://github.com/OxfordAbstracts/html-to-docx/commit/70e2ce1cb3c6a4d8e814653a2746831bb3fb9e86))
- Upgrades the xmlbuilder2 dependency version (Closes [#92](https://github.com/OxfordAbstracts/html-to-docx/issues/92)) ([108e1e9](https://github.com/OxfordAbstracts/html-to-docx/commit/108e1e92cc1b5a1e2d2d3958fa8086ef573274ef))


## 2022-11-17 - [1.6.2](https://github.com/OxfordAbstracts/html-to-docx/compare/v1.6.1...v1.6.2)

### Bug Fixes

- Add support for different units for column width and row height ([6286870](https://github.com/OxfordAbstracts/html-to-docx/commit/62868700852a07adf4ff39db2206fa64ba7c0efe))


## 2022-11-16 - [1.6.1](https://github.com/OxfordAbstracts/html-to-docx/compare/v1.6.0...v1.6.1)


## 2022-11-16 - [1.6.0](https://github.com/OxfordAbstracts/html-to-docx/compare/v1.5.0...v1.6.0)

### Features

- Add pageSize as an optional additional document option ([ed9aeda](https://github.com/OxfordAbstracts/html-to-docx/commit/ed9aedaf1ad462bd0ce5d284fd915d24d280c428))
- Include pageSize as an optional additional document option ([5aa34d5](https://github.com/OxfordAbstracts/html-to-docx/commit/5aa34d5dd6851001c53551a602f8b46ab538564e))

### Bug Fixes

- Add null check for formatting that is not supported ([969e31b](https://github.com/OxfordAbstracts/html-to-docx/commit/969e31b044ed2d7764d4bf887b732e2a3afc7b57))
- Add options param in modifiedStyleAttributesBbilder to support paragraph-only attributes ([b113dfb](https://github.com/OxfordAbstracts/html-to-docx/commit/b113dfb43a4ef5a2e253627f5eda8dd19cf1655f))
- Change page size ternary order ([88938f3](https://github.com/OxfordAbstracts/html-to-docx/commit/88938f3efef46d8a9d310d9325cb6b476d1bec71))
- Corrected case for decimal return value ([680b239](https://github.com/OxfordAbstracts/html-to-docx/commit/680b239ad56af3498c5da7c0cf834105ee8a1842))
- Dont override maxwidth if already present ([678d6ad](https://github.com/OxfordAbstracts/html-to-docx/commit/678d6adfbb202a0604c2be805a36edeac0220530))
- Replace options to use tiernary conditional operator ([da2d38e](https://github.com/OxfordAbstracts/html-to-docx/commit/da2d38e1061fa59c9e54832f39611bbb831d8390))
- Update default height and width measurements ([5614566](https://github.com/OxfordAbstracts/html-to-docx/commit/5614566c2b067a14c5eb8d286b4fc8c3177cfd99))
- Update unordered list symbol unicode ([e80f785](https://github.com/OxfordAbstracts/html-to-docx/commit/e80f7851b6c1dce3cd6430382960686dcb0d9db7))
- Use symbol instead of wingdings font for bullet symbol ([8d62648](https://github.com/OxfordAbstracts/html-to-docx/commit/8d62648db4de82c56da4d772d6ed64ac23bb1e5d))


## 2022-10-25 - [1.5.0](https://github.com/OxfordAbstracts/html-to-docx/compare/v1.4.0...v1.5.0)

### Features

- Add support for nested images ([882014f](https://github.com/OxfordAbstracts/html-to-docx/commit/882014f4017359139dbbfd5f7c8c14cae48f55bf))
- Add support for urls in image src ([60c7e5b](https://github.com/OxfordAbstracts/html-to-docx/commit/60c7e5bcefaaee26068206087be0345d0c79b988))
- Add valid url regex and util method ([c5020ce](https://github.com/OxfordAbstracts/html-to-docx/commit/c5020ce220e324c7ba0d48976998604162b3a73f))

### Bug Fixes

- Address issues with nested base64 images ([78f7e58](https://github.com/OxfordAbstracts/html-to-docx/commit/78f7e580b4cfe659f72ec24d2317f75e3fb35d54))
- Address issues with nested images ([854b46e](https://github.com/OxfordAbstracts/html-to-docx/commit/854b46e3c337668005a0ecdb60d47b3723e98934))
- Move url regex into the util function ([e9b289b](https://github.com/OxfordAbstracts/html-to-docx/commit/e9b289b6f27f89ec9bc5219a57621987f9522fc5))


## 2022-06-01 - [1.4.0](https://github.com/OxfordAbstracts/html-to-docx/compare/v1.3.2...v1.4.0)

### Bug Fixes

- Add support for multi level nested formatting ([48a98bc](https://github.com/OxfordAbstracts/html-to-docx/commit/48a98bc9a0352800f22c0c518e9ee432cd7ee19e))
- Parent styles to children ([b0d004b](https://github.com/OxfordAbstracts/html-to-docx/commit/b0d004b64ee5ce47ca71137c581923e2e4ce4e77))
- Point regex ([fb82509](https://github.com/OxfordAbstracts/html-to-docx/commit/fb8250997a7c9fef6538fdadfc0c2c1d8430ea18))


## 2022-01-23 - [1.3.2](https://github.com/OxfordAbstracts/html-to-docx/compare/v1.3.1...v1.3.2)

### Features

- Add support for lists within table cells ([b7d5ce7](https://github.com/OxfordAbstracts/html-to-docx/commit/b7d5ce7c6381c8e5ea79e537ee78768c9fefdbb5))
- Allow different list style types ([5579be2](https://github.com/OxfordAbstracts/html-to-docx/commit/5579be26639286bd0abd75cd3957795b52f044d3))


## 2021-12-27 - [1.3.1](https://github.com/OxfordAbstracts/html-to-docx/compare/v1.3.0...v1.3.1)


## 2021-12-27 - [1.3.0](https://github.com/OxfordAbstracts/html-to-docx/compare/v1.2.4...v1.3.0)

### Features

- indentation: HTML margins to indentation [#106](https://github.com/OxfordAbstracts/html-to-docx/issues/106) ([0a8d6e6](https://github.com/OxfordAbstracts/html-to-docx/commit/0a8d6e6a8cfeffd9543e17e7d4bc729dfde88ed4))

### Bug Fixes

- Generate numbering for independent list types ([67151ce](https://github.com/OxfordAbstracts/html-to-docx/commit/67151ce957b01d4563b95def543f0bc004036153))
- Generating numbering xml based on type instead of type elements ([56c165e](https://github.com/OxfordAbstracts/html-to-docx/commit/56c165e6d5f9b3f26adc6508137022dbb69dae52))
- Nanoid api usage ([4aa4edc](https://github.com/OxfordAbstracts/html-to-docx/commit/4aa4edc088dcf4e031b850754a9f7b2d6740a6c3))
- Revert optional chaining on border check ([9ae5982](https://github.com/OxfordAbstracts/html-to-docx/commit/9ae59826b9885e867bfde26900e76fe34c1413b5))
- Update @rollup/plugin-node-resolve usage ([c359d92](https://github.com/OxfordAbstracts/html-to-docx/commit/c359d92afc7373fc5f236b61e8176c6bda3b7310))
- Update html-to-vdom import ([fbca2d3](https://github.com/OxfordAbstracts/html-to-docx/commit/fbca2d3b38edf6c14f883bf3f6f4eda1d8b55a8f))


## 2021-09-20 - [1.2.4](https://github.com/OxfordAbstracts/html-to-docx/compare/v1.2.3...v1.2.4)

### Bug Fixes

- Spacing issue in between tags and text on multiple lines ([98e1a8d](https://github.com/OxfordAbstracts/html-to-docx/commit/98e1a8d710a92e894513fdef120417849e932de6))


## 2021-09-15 - [1.2.3](https://github.com/OxfordAbstracts/html-to-docx/compare/v1.2.2...v1.2.3)

### Features

- Add support for code tag ([70a9485](https://github.com/OxfordAbstracts/html-to-docx/commit/70a948503d6b8c11b3f46141578047361c0bba87))
- Add support for pre tag ([c43ed9e](https://github.com/OxfordAbstracts/html-to-docx/commit/c43ed9e3bef91d1c95eddb8779df8e2d2e7f151b))

### Bug Fixes

- Add support for nested code and pre tags ([7a504e1](https://github.com/OxfordAbstracts/html-to-docx/commit/7a504e10af3819829a7cfc0d6fd2ef86e1dc289b))


## 2021-07-17 - [1.2.2](https://github.com/OxfordAbstracts/html-to-docx/compare/v1.2.1...v1.2.2)

### Features

- **schema:*- Add theme ([d5aef3b](https://github.com/OxfordAbstracts/html-to-docx/commit/d5aef3b65376e71b594d494ae8426cab5ad5178c))
- Added line numbers ([f87202c](https://github.com/OxfordAbstracts/html-to-docx/commit/f87202c4d4cd534e830d3a59d33b9cc27cf6d654))


## 2021-06-05 - [1.2.1](https://github.com/OxfordAbstracts/html-to-docx/compare/v1.2.0...v1.2.1)


## 2021-06-05 - [1.2.0](https://github.com/OxfordAbstracts/html-to-docx/compare/v1.1.34...v1.2.0)

### Features

- Headings should have headings style ([8a731bb](https://github.com/OxfordAbstracts/html-to-docx/commit/8a731bb430c64fd3608e5baac53d4f4074770664))

### Bug Fixes

- Added browser module building support ([343867a](https://github.com/OxfordAbstracts/html-to-docx/commit/343867ab000cb14e813344b3bcb535aa67e00808))
- Changed all imports to esm style ([d02320b](https://github.com/OxfordAbstracts/html-to-docx/commit/d02320bf22eefd3cf5fb90966b68e3d004ca9c1e))
- Changed default value to "Normal" ([b0e67d8](https://github.com/OxfordAbstracts/html-to-docx/commit/b0e67d8fdef6f339700133095bfd828993e48183))
- Moved to shortid for filename ([81ae184](https://github.com/OxfordAbstracts/html-to-docx/commit/81ae1848fa7359f4d7297b87b47fca96017d485d))
- Removed code made redundant with heading styles ([48da1dc](https://github.com/OxfordAbstracts/html-to-docx/commit/48da1dc1686a0b45ab56cfaa24db421772c5945e))
- Renamed method to more descriptive name ([b211f20](https://github.com/OxfordAbstracts/html-to-docx/commit/b211f205ddf03dab3c647bf0b91439677a33fb61))
- Renamed to paragraphStyle ([a1c4429](https://github.com/OxfordAbstracts/html-to-docx/commit/a1c442942de956533fdfda03d4ced748fde06cb1))
- Replaced html-minifier with regex replacement ([d6c9b38](https://github.com/OxfordAbstracts/html-to-docx/commit/d6c9b38ed485f73c14b759ad99bf4d3c91d9e07b))
- Updated example to use umd build ([078fa5d](https://github.com/OxfordAbstracts/html-to-docx/commit/078fa5dd6174be4fe314b469999f1b1010353c68))


## 2021-02-07 - [1.1.34](https://github.com/OxfordAbstracts/html-to-docx/compare/v1.1.33...v1.1.34)

### Bug Fixes

- Superscript ([2fd87fd](https://github.com/OxfordAbstracts/html-to-docx/commit/2fd87fd406a97732e24d7f191147638ee7053ced))


## 2021-01-20 - [1.1.33](https://github.com/OxfordAbstracts/html-to-docx/compare/v1.1.32...v1.1.33)

### Features

- Added indentation support ([9c1c3a4](https://github.com/OxfordAbstracts/html-to-docx/commit/9c1c3a4d539f4dfeda2ab6484d69236a91ec5ae1))
- Added row span support ([8f56a4a](https://github.com/OxfordAbstracts/html-to-docx/commit/8f56a4aae59b87d1e86e299bd88bb2bf0115d639))
- Added skip first header footer flag ([7710f28](https://github.com/OxfordAbstracts/html-to-docx/commit/7710f2803e64eb3645a7e7440a326664159e340a))
- Added table grid fragment from table row generator ([f8c4380](https://github.com/OxfordAbstracts/html-to-docx/commit/f8c4380ff5b7ff7b7df40c70f8a05938e4bacddf))

### Bug Fixes

- Add table cell borders to span cells ([09b65e3](https://github.com/OxfordAbstracts/html-to-docx/commit/09b65e316a868a6e2e5032ab1889e817007d2b47))
- Row span cell generation ([d93ad9c](https://github.com/OxfordAbstracts/html-to-docx/commit/d93ad9c41225e7b07d9eb0d8c3a55602e65ec30b))


## 2020-12-04 - 1.1.32

### Features

- packaging: Added jszip for packaging ([89619ec](https://github.com/OxfordAbstracts/html-to-docx/commit/89619ec702564fb9c5eccaee55e65d366fcbacad))
- packaging: Added method to create container ([9808cf2](https://github.com/OxfordAbstracts/html-to-docx/commit/9808cf211bbb50cf3d7cbe122d01c82d4272e888))
- Added font size support ([0f27c60](https://github.com/OxfordAbstracts/html-to-docx/commit/0f27c609baa5b9488bc195dff1c060bcc04bbf2d))
- template: Added base docx template ([abdb87b](https://github.com/OxfordAbstracts/html-to-docx/commit/abdb87bdfead91890f9d54e2cedd038e916b6dce))
- Abstracted conversion using docxDocument class ([c625a01](https://github.com/OxfordAbstracts/html-to-docx/commit/c625a0181a6c328c0319b579fa1173192dff1187))
- Added b tag support ([f867abd](https://github.com/OxfordAbstracts/html-to-docx/commit/f867abd41c6bc85bbba207a27c58d441f1a2b532))
- Added builder methods for images ([9e2720f](https://github.com/OxfordAbstracts/html-to-docx/commit/9e2720f261a46701c8a2581aadafa9b60e6cee6b))
- Added css border string parser ([15562e8](https://github.com/OxfordAbstracts/html-to-docx/commit/15562e817732d1d85b99fd33921694f2e3ad3ad7))
- Added css color string ([cb0db2f](https://github.com/OxfordAbstracts/html-to-docx/commit/cb0db2ff2d3f2f66df823dbafbc5603030241bc3))
- Added document file render helper ([6dd9c3a](https://github.com/OxfordAbstracts/html-to-docx/commit/6dd9c3a01f5fceab78404d8ebddb848fb91c933c))
- Added eip conversions ([9d6e317](https://github.com/OxfordAbstracts/html-to-docx/commit/9d6e3171c0b0f9d71f776762357d4a329778cedb))
- Added em tag support ([6a06265](https://github.com/OxfordAbstracts/html-to-docx/commit/6a06265f724a611b50144cb988e576bc4e40b4d4))
- Added escape-html ([1a231d5](https://github.com/OxfordAbstracts/html-to-docx/commit/1a231d5dde3e6f9b5a23f248e19063191c07e54f))
- Added font support in styles ([18b3281](https://github.com/OxfordAbstracts/html-to-docx/commit/18b3281ac3f91e5c1905efa0487354ff78badec2))
- Added font table ([0903d6b](https://github.com/OxfordAbstracts/html-to-docx/commit/0903d6b98fae6dc378cdeafdadd80a86501c9959))
- Added footer support ([24f60df](https://github.com/OxfordAbstracts/html-to-docx/commit/24f60df94d755689493b761340d16d090c8b1b16))
- Added generic rels xml string ([7d2ea84](https://github.com/OxfordAbstracts/html-to-docx/commit/7d2ea8404093fd99ce5e6bccaedaf3603830f574))
- Added header generation ([25fb44f](https://github.com/OxfordAbstracts/html-to-docx/commit/25fb44f945df3fdc5f37d619b3de3ebe68b84cd6))
- Added header relationship support ([cc08355](https://github.com/OxfordAbstracts/html-to-docx/commit/cc083553e28a3ed88da3cc27ef0de0cbb26350b3))
- Added heading sizes ([bb18e72](https://github.com/OxfordAbstracts/html-to-docx/commit/bb18e724c42b0c4581722b2899d5ff808c1495c4))
- Added headings support ([fd489ee](https://github.com/OxfordAbstracts/html-to-docx/commit/fd489eeebfeedc7d05991f9366aeae2adc49fd6f))
- Added highlight support ([6159925](https://github.com/OxfordAbstracts/html-to-docx/commit/6159925495b74ab254cd7dc5628526d531595a92))
- Added horizontal text alignment ([d29669f](https://github.com/OxfordAbstracts/html-to-docx/commit/d29669ffdb0d63b7bdbbe09c6bca990e4c28cfb8))
- Added hsl conversion support ([153fa43](https://github.com/OxfordAbstracts/html-to-docx/commit/153fa43f84c640085f45823bc2054b24c28023d0))
- Added hyperlink styling ([6c3f1bd](https://github.com/OxfordAbstracts/html-to-docx/commit/6c3f1bd92f5c7b4ddf74beb1fc3f4e2e6b4762f5))
- Added hyperlinks support ([3560ce9](https://github.com/OxfordAbstracts/html-to-docx/commit/3560ce9f23fa8f590aa340302bf0059c8dfb6d5f))
- Added ins tag support ([6d64908](https://github.com/OxfordAbstracts/html-to-docx/commit/6d64908858dac290aa34421c236bdaf2d8ef07a7))
- Added line height support ([3d0ea2f](https://github.com/OxfordAbstracts/html-to-docx/commit/3d0ea2fe56d13893e3c5cd0e4a35e7b26b7c1d0a))
- Added linebreak support ([57c054c](https://github.com/OxfordAbstracts/html-to-docx/commit/57c054cd65f49d7c4244272af0117f2c141a8bc7))
- Added method to archive images with other files ([b6da74b](https://github.com/OxfordAbstracts/html-to-docx/commit/b6da74be10be03d689ca044f3f95dd724a3a29b6))
- Added minimum width support to tables ([b10d820](https://github.com/OxfordAbstracts/html-to-docx/commit/b10d820061b10531aa027fde304fbe3ceac849d5))
- Added more unit converters ([8f78c52](https://github.com/OxfordAbstracts/html-to-docx/commit/8f78c5241cf33d471c8b08e3f941f401d6a50d7b))
- Added more xml builder methods ([ffc584b](https://github.com/OxfordAbstracts/html-to-docx/commit/ffc584bed7ab434431999517a3308483ba99489a))
- Added more xml statment builder methods ([337e530](https://github.com/OxfordAbstracts/html-to-docx/commit/337e5305aa8768b6507323bec2279d557a35b67b))
- Added other measure units for margins and fonts ([1ae584a](https://github.com/OxfordAbstracts/html-to-docx/commit/1ae584a1b0a5350943e10c0d129402b843d7b9a2))
- Added page break support ([085ed2a](https://github.com/OxfordAbstracts/html-to-docx/commit/085ed2a2cb439ee2a4189b3664deca047926672b))
- Added page number support ([84ea1c3](https://github.com/OxfordAbstracts/html-to-docx/commit/84ea1c31923b4c4be6e46c892fbecb44c9c7689c))
- Added strike through support ([b73e8c7](https://github.com/OxfordAbstracts/html-to-docx/commit/b73e8c76d0051bc6449ed57861b4ce1c7ad4b408))
- Added support for span font sizing ([98b4844](https://github.com/OxfordAbstracts/html-to-docx/commit/98b4844858f967bd5a3932262d0b535cd53d499d))
- Added support for subscript and superscript ([f1ee4ed](https://github.com/OxfordAbstracts/html-to-docx/commit/f1ee4edf183a45731b48bba2b91154da591c203f))
- Added table max width support ([49ab5d3](https://github.com/OxfordAbstracts/html-to-docx/commit/49ab5d3876cdd58c2efd1b492fc5bb41e9a857e7))
- template: Added styles schema ([d83d230](https://github.com/OxfordAbstracts/html-to-docx/commit/d83d230a66807f6ad08ebb4a6c0c5299c311aaf5))
- Added table row cant split option ([252178c](https://github.com/OxfordAbstracts/html-to-docx/commit/252178c922d9910b8a89e6c4e30fafd2994d92d7))
- Added table row height support ([031c3aa](https://github.com/OxfordAbstracts/html-to-docx/commit/031c3aa963e5a7b2ee985ae8ac6ff612c89ae974))
- Added text formatting to paragraph ([bacd888](https://github.com/OxfordAbstracts/html-to-docx/commit/bacd888253a35a18ac7ea4e9141d4a4fb60e3cf7))
- Added valign to table cell element ([20e94f1](https://github.com/OxfordAbstracts/html-to-docx/commit/20e94f18370e8a92034f6d35f5e744ceb57ed774))
- Added vdom to xml method ([8b5a618](https://github.com/OxfordAbstracts/html-to-docx/commit/8b5a6185e6e211b0e07b9f1c1b7e23fb4b13dc9c))
- Added virtual-dom and html-to-vdom ([feaa396](https://github.com/OxfordAbstracts/html-to-docx/commit/feaa396162465276d19b7d3d5c51a533987a1738))
- Added xbuilder ([f13b5cc](https://github.com/OxfordAbstracts/html-to-docx/commit/f13b5cc06d29ae53493f1f4b8fdef6e8986e64e6))
- Added xml builder methods for images ([f413ad8](https://github.com/OxfordAbstracts/html-to-docx/commit/f413ad89b263c63a8fb9890b44b1b219a7413c4b))
- Added xml statement builder helper ([5e23c16](https://github.com/OxfordAbstracts/html-to-docx/commit/5e23c1636eb3c64f52589f1ac71a48dec3df65c2))
- Changed list parsing to support nested lists ([4339f2f](https://github.com/OxfordAbstracts/html-to-docx/commit/4339f2f9d2bdc5ffd68def80449c9bce8c09c9a9))
- Enabling header on flag ([516463c](https://github.com/OxfordAbstracts/html-to-docx/commit/516463cd532e58895faa8dd465b7e725f0de59e3))
- Handle line breaks ([164c0f5](https://github.com/OxfordAbstracts/html-to-docx/commit/164c0f5e17f62e3f30da25be6e181d3414ca4dde))
- template: Added numbering schema ([d179d73](https://github.com/OxfordAbstracts/html-to-docx/commit/d179d736e6e63ed42104a231ca0489430faae00a))
- template: Added XML schemas ([42232da](https://github.com/OxfordAbstracts/html-to-docx/commit/42232da9d63ed404367703e56b1c65cdb8a23782))
- Make tables center aligned ([077049b](https://github.com/OxfordAbstracts/html-to-docx/commit/077049b40babc45ec527b53211d4b33ba4f2b6ab))
- Styling table color ([2b44bff](https://github.com/OxfordAbstracts/html-to-docx/commit/2b44bff7dee0dad0de75f3c3b2403278c19e3a4b))

### Bug Fixes

- 3 digit hex color code support ([255fe82](https://github.com/OxfordAbstracts/html-to-docx/commit/255fe82fc47e2a447c795c346ae7c6634ae442d1))
- Added attributes to anchor drawing ([62e4a29](https://github.com/OxfordAbstracts/html-to-docx/commit/62e4a29ef664257d8f0364d5d97f056a62f0fb61))
- Added black as default color ([bcfcba3](https://github.com/OxfordAbstracts/html-to-docx/commit/bcfcba36194925fdf08a4c297ceafcb5b08c124b))
- Added bold to headings ([abe968a](https://github.com/OxfordAbstracts/html-to-docx/commit/abe968a0f2cdac5d01abf44bf7e7019922b295dd))
- Added border for paragraph padding ([252ead6](https://github.com/OxfordAbstracts/html-to-docx/commit/252ead6dc9f09b84edc9f1b145bb76ad2cb4fc01))
- Added colspan support for table cells ([bdf92f8](https://github.com/OxfordAbstracts/html-to-docx/commit/bdf92f8dbb10b4b58188364f3bdc5ff91e9cc982))
- Added default options ([4590800](https://github.com/OxfordAbstracts/html-to-docx/commit/459080010f92ce7464f4815585088a46ce8e759d))
- Added effectextent and srcrect fragment ([5f5e975](https://github.com/OxfordAbstracts/html-to-docx/commit/5f5e975b135eb38c48e18a09da590b363166d74e))
- Added empty paragraph for spacing after table ([6bae787](https://github.com/OxfordAbstracts/html-to-docx/commit/6bae787cbf3f376b8ec34389f444d8c7c5f3b340))
- Added extent fragment ([7ce81f2](https://github.com/OxfordAbstracts/html-to-docx/commit/7ce81f27e4c493bb9bf7d368a415f34cb0678e4c))
- Added extra before spacing for heading elements ([dc50c8d](https://github.com/OxfordAbstracts/html-to-docx/commit/dc50c8dfe85a126be1780598974752cd939b6a9f))
- Added header override in content-types xml ([5de681b](https://github.com/OxfordAbstracts/html-to-docx/commit/5de681be9295754eff648cea504e07bf9a6f6d09))
- Added html string minifier ([8faa19c](https://github.com/OxfordAbstracts/html-to-docx/commit/8faa19c46ff85a31b16e89207cbc2120c6ed5805))
- Added image conversion handler ([f726e71](https://github.com/OxfordAbstracts/html-to-docx/commit/f726e71ee2504bc254794ad09eaf5d67a8901b9a))
- Added image in table cell support ([7d98a16](https://github.com/OxfordAbstracts/html-to-docx/commit/7d98a16b1509b57910e8294cfb3985a88b7154ae))
- Added inline attributes ([0a4d2ce](https://github.com/OxfordAbstracts/html-to-docx/commit/0a4d2ce4b4c64952c3866928e6355b7c891ac044))
- Added italics, underline and bold in runproperties ([34c2e18](https://github.com/OxfordAbstracts/html-to-docx/commit/34c2e18123c8a6a956209951afebc0dce2ab6cfc))
- Added missing argument in buildParagraph ([2307076](https://github.com/OxfordAbstracts/html-to-docx/commit/23070766fe51d689e130d09fb5adcbba37781586))
- Added more namespaces ([68636b4](https://github.com/OxfordAbstracts/html-to-docx/commit/68636b4c7cc73bf9e0de75b7bf97ac9afb4fb6f9))
- Added namespace aliases to header and numbering xmls ([d0b4101](https://github.com/OxfordAbstracts/html-to-docx/commit/d0b4101017a6dabd0fa18e23228bd4af338129eb))
- Added numbering and styles relationship ([c7e29af](https://github.com/OxfordAbstracts/html-to-docx/commit/c7e29af7414ce71515c46861942342d4f397222b))
- Added other namespaces to the xml root ([afbbca9](https://github.com/OxfordAbstracts/html-to-docx/commit/afbbca9dbf723afc857034ce7770bc8f0840c0e4))
- Added override for relationship ([30acddc](https://github.com/OxfordAbstracts/html-to-docx/commit/30acddc84d40dc6c66ed9539618b94adeeb2fc85))
- Added override for settings and websettings ([977af04](https://github.com/OxfordAbstracts/html-to-docx/commit/977af04f48c19f2b3162cf6e61782cf63e7162e8))
- Added overrides for relationships ([22b9cac](https://github.com/OxfordAbstracts/html-to-docx/commit/22b9cac2fa788b9654262e450774c588180a18de))
- Added padding between image and wrapping text ([e45fbf5](https://github.com/OxfordAbstracts/html-to-docx/commit/e45fbf553c19071023634b692e3c4b0fab04aedf))
- Added positioning fragments ([e6f7e1c](https://github.com/OxfordAbstracts/html-to-docx/commit/e6f7e1c3679aa813a2818725548dfb5ebb0d9bd7))
- Added required attributes to anchor fragment ([d01c9f9](https://github.com/OxfordAbstracts/html-to-docx/commit/d01c9f915a929de201218af127103da627aaa4a1))
- Added settings and websettings relation ([34aeedc](https://github.com/OxfordAbstracts/html-to-docx/commit/34aeedce6d0dd02822062762f9b077bb146b09b9))
- Added settings and websettings to ooxml package ([6c829b5](https://github.com/OxfordAbstracts/html-to-docx/commit/6c829b5ec4596ba0b5d41fae9ba2bfd68fdf7230))
- Added simple positioning to anchor ([5006cc4](https://github.com/OxfordAbstracts/html-to-docx/commit/5006cc47d112360e51d8051f1ebff570e9f12779))
- Added support for decimal inch ([6027d2f](https://github.com/OxfordAbstracts/html-to-docx/commit/6027d2f36bbc9bb97ff4cbcaa59372df33528a54))
- Added support for full width background color ([733a937](https://github.com/OxfordAbstracts/html-to-docx/commit/733a9373ba13ccb0b781f66fe87d91a3eed4aab9))
- Added table and cell border support ([985f6a1](https://github.com/OxfordAbstracts/html-to-docx/commit/985f6a1e7a2e52f3b0a609a00da8a11bf113ef16))
- Added table borders ([12864db](https://github.com/OxfordAbstracts/html-to-docx/commit/12864db468a08f4aca4d01cb8e8b6635aa09c57d))
- Added table cell border support ([852c091](https://github.com/OxfordAbstracts/html-to-docx/commit/852c091e15a3b2add7b622472be8fc021bb05c06))
- Added table header support ([592aa89](https://github.com/OxfordAbstracts/html-to-docx/commit/592aa893fa115a83bc1d056c98480dbe5cc872f9))
- Added table width support ([73b172b](https://github.com/OxfordAbstracts/html-to-docx/commit/73b172b584aaeb7137d58e0eb2d8b73c4bb92561))
- Added unit conversion utils ([d5b5a91](https://github.com/OxfordAbstracts/html-to-docx/commit/d5b5a915d215fb834cfe84996539ae663cc98914))
- Added unit conversions ([e6d546b](https://github.com/OxfordAbstracts/html-to-docx/commit/e6d546bca1a87182568d15bad99ac0af23ee55de))
- Added unit conversions ([5890b18](https://github.com/OxfordAbstracts/html-to-docx/commit/5890b18833cc11f10c8ffc1e57d1dd9ffd46395d))
- Added wrap elements ([c951688](https://github.com/OxfordAbstracts/html-to-docx/commit/c95168864c4929e2ab95c5a6a53d0919c76f8a83))
- Bold based on font-weight ([3f0376e](https://github.com/OxfordAbstracts/html-to-docx/commit/3f0376e0a1e267705117a2ec50c9f382286b2a60))
- Border color ([a322450](https://github.com/OxfordAbstracts/html-to-docx/commit/a322450ceda77dbabaee24d1e9619ced04d88cad))
- Changed attribute field for picture name ([aef241d](https://github.com/OxfordAbstracts/html-to-docx/commit/aef241dc3d3d9adb732c429df9f0c2771b319680))
- Changed attribute used for name ([3885233](https://github.com/OxfordAbstracts/html-to-docx/commit/3885233bf14f9b7b16d48a2844d3e997e476a8ee))
- Changed default namespace of relationship to solve render issue ([56a3554](https://github.com/OxfordAbstracts/html-to-docx/commit/56a3554e7b2e9d85cedeece8d20acfebf23666ad))
- Changed file extension if octet stream is encountered ([32c5bf1](https://github.com/OxfordAbstracts/html-to-docx/commit/32c5bf1b5f7c5f8dc83a51fed142e932c7b008fd))
- Changed line spacing rule to work with inline images ([489f1c6](https://github.com/OxfordAbstracts/html-to-docx/commit/489f1c62fc093b108bc16aee33d74baad4ced7d8))
- Changed namespaces to original ecma 376 spec ([51be86e](https://github.com/OxfordAbstracts/html-to-docx/commit/51be86ecf0f4a78457840bf2a31579d217568208))
- Changed paragraph after spacing ([025523b](https://github.com/OxfordAbstracts/html-to-docx/commit/025523b0f07433456e3f19f3774f441e46c7a89b))
- Changed width conditions to match suggestions ([48347ab](https://github.com/OxfordAbstracts/html-to-docx/commit/48347abe339aadc3b322d763d52bc607d1293680))
- Created seperate abstract numbering for each lists ([c723c74](https://github.com/OxfordAbstracts/html-to-docx/commit/c723c746a3feb2612e73dddac14f1c40864e9ad9))
- Fix table render issue due to grid width ([636d499](https://github.com/OxfordAbstracts/html-to-docx/commit/636d499bcee00195f7b5ca198c60bb3e0f7d2a69))
- Fixed abstract numbering id ([9814cb8](https://github.com/OxfordAbstracts/html-to-docx/commit/9814cb89582bc7e87cec638be37ee1cd326c6117))
- Fixed coloring and refactored other text formatting ([c288f80](https://github.com/OxfordAbstracts/html-to-docx/commit/c288f809ea6387c91356976a6dd81396cecafc46))
- Fixed document rels and numbering bug ([d6e3152](https://github.com/OxfordAbstracts/html-to-docx/commit/d6e3152081da7d2ab379a67bfda345964fa15c40))
- Fixed docx generation ([3d96acf](https://github.com/OxfordAbstracts/html-to-docx/commit/3d96acf511d82776510fac857af57d5cb9453f89))
- Fixed incorrect table row generation ([742dd18](https://github.com/OxfordAbstracts/html-to-docx/commit/742dd1882ce4c1a33ab51e10ee2a628b817eca31))
- Fixed internal mode and added extensions ([1266121](https://github.com/OxfordAbstracts/html-to-docx/commit/12661213e00c55f7068e93abb019ba80cd4f2d87))
- Fixed margin issues ([f841b76](https://github.com/OxfordAbstracts/html-to-docx/commit/f841b76caa944ea5eec206a3b3fce3e5a5eaf3e7))
- Fixed numbering and header issue due to wrong filename ([64a04bc](https://github.com/OxfordAbstracts/html-to-docx/commit/64a04bc192616162aa67c43f80734e7ebb9ff588))
- Fixed table and image rendering ([c153092](https://github.com/OxfordAbstracts/html-to-docx/commit/c1530924f93351ce63882bf0e6050b6315aa6017))
- Formatted list ([2e00e44](https://github.com/OxfordAbstracts/html-to-docx/commit/2e00e448b812111d09c50b9759b9dd46bd36c860))
- Handled empty formatting tag ([d97521f](https://github.com/OxfordAbstracts/html-to-docx/commit/d97521f8004d2e7af9f324cdbdcbbe4fcc299e4b))
- Handled figure wrapper for images and tables ([4182a95](https://github.com/OxfordAbstracts/html-to-docx/commit/4182a9543aeb71fd8b0d2c7a2e08978a782de3e6))
- Handled formatting within list element ([aeb3f00](https://github.com/OxfordAbstracts/html-to-docx/commit/aeb3f0041d352ea8442551d30770644d04698e7a))
- Handled horizontal alignment ([72478cb](https://github.com/OxfordAbstracts/html-to-docx/commit/72478cb2308ac029f9a8149c416012101d23c18c))
- Handled image inside table cell ([339c18a](https://github.com/OxfordAbstracts/html-to-docx/commit/339c18a3de7e7e86e4133a72e54cb6ed5ec386c2))
- Handled table width ([237ddfd](https://github.com/OxfordAbstracts/html-to-docx/commit/237ddfd6bff914e0379c6cbd940a7eac29d7aeaf))
- Handled vertical alignment ([b2b3bcc](https://github.com/OxfordAbstracts/html-to-docx/commit/b2b3bcc382dc645a3cdebe18d99558538bad6282))
- Handling anchor tag ([8d0fa4b](https://github.com/OxfordAbstracts/html-to-docx/commit/8d0fa4bc8413c0aa256535eb3679c224eb79bcc2))
- Handling multiple span children and multilevel formatting of text ([4c81f58](https://github.com/OxfordAbstracts/html-to-docx/commit/4c81f586400d1f227236a8b07d067331c0f02c5d))
- Handling nested formatting ([04f0d7e](https://github.com/OxfordAbstracts/html-to-docx/commit/04f0d7e822a57fc3ba98d3990e17b9153c54afc7))
- Handling non paragraph text elements ([b4cc062](https://github.com/OxfordAbstracts/html-to-docx/commit/b4cc06237862c07b900b7ce158cddf2b673f0e1c))
- Hyperlink within table cell issue ([3a02365](https://github.com/OxfordAbstracts/html-to-docx/commit/3a02365b3f7232da17791f062d971cace65c0371))
- Improved table border styling ([ba3aa67](https://github.com/OxfordAbstracts/html-to-docx/commit/ba3aa67fc484fa1a47b1f61f5dd7f69dff353f48))
- List element render ([2881455](https://github.com/OxfordAbstracts/html-to-docx/commit/2881455633e81127e192f8e0de7fe4711c320583))
- Modified abstractnumbering definition to support nested lists ([3dd6e3e](https://github.com/OxfordAbstracts/html-to-docx/commit/3dd6e3e6a8e02b1cd0892735c9053eb0ba518092))
- Modified example to use esm bundle ([491a83d](https://github.com/OxfordAbstracts/html-to-docx/commit/491a83d9b2c0deec13743817cdf32280d39bb9cd))
- Moved namespaces into separate file ([75cdf30](https://github.com/OxfordAbstracts/html-to-docx/commit/75cdf3033e69934b189a74d6c77eef08d50492aa))
- Namespace updated to 2016 standards ([6fc2ac2](https://github.com/OxfordAbstracts/html-to-docx/commit/6fc2ac2b6e904c4dd774b24e0ad119cccd873e0b))
- Package-lock conflicts ([e577239](https://github.com/OxfordAbstracts/html-to-docx/commit/e5772392c30cfa188cb11f0b93250e90a71b1600))
- Preserve spacing on text ([f2f12b1](https://github.com/OxfordAbstracts/html-to-docx/commit/f2f12b1f4903aa7caf6bae5cad3b88d9aed46d18))
- Removed html tidying ([0a43396](https://github.com/OxfordAbstracts/html-to-docx/commit/0a43396a9f8e022fe0f5069d513c7aa841e57d6c))
- Removed libtidy-updated ([aab3b19](https://github.com/OxfordAbstracts/html-to-docx/commit/aab3b19b725f53d3a34266f6bf49d8712190007e))
- Removed unwanted attribute ([f3caf44](https://github.com/OxfordAbstracts/html-to-docx/commit/f3caf44faf95ba8c6dee1f6f959300374e2b65ff))
- Renamed document rels schema file ([10c3fda](https://github.com/OxfordAbstracts/html-to-docx/commit/10c3fda9878847257b902d4c13c2d8dd36edd3f6))
- Renamed unit converters ([eee4487](https://github.com/OxfordAbstracts/html-to-docx/commit/eee44877cfee7228eb27b9efeb10b07a0e67ada9))
- Rewrote formatting loop to avoid memory leaks and text loss ([e5fe27c](https://github.com/OxfordAbstracts/html-to-docx/commit/e5fe27c232ba1394b93735dcc701354bbc5244b3))
- Scaled down images ([72d7c44](https://github.com/OxfordAbstracts/html-to-docx/commit/72d7c448730a46499a1a5cab50c443a525967a54))
- Set default values for table attributes and styles ([2a4fb23](https://github.com/OxfordAbstracts/html-to-docx/commit/2a4fb23747cc3830c1ed81fade8316a27f67efd7))
- Set header and footer HTML strings if corresponding option is true ([c4aecd0](https://github.com/OxfordAbstracts/html-to-docx/commit/c4aecd07f5fdceaf025a8ad260b0af2feeebd557))
- Table cell border style support ([2c5a205](https://github.com/OxfordAbstracts/html-to-docx/commit/2c5a2055d33ee02f55a07e9c8ba985e2e07f2871))
- Table cell vertical align issue ([424d2c1](https://github.com/OxfordAbstracts/html-to-docx/commit/424d2c1177e1d335dbfa2b016d59cd50817e679a))
- Table header bold ([aa62347](https://github.com/OxfordAbstracts/html-to-docx/commit/aa6234724f7b8f1ba91d724b9c6cd12ab2b725cb))
- Updated document abstraction to track generation ids ([c34810f](https://github.com/OxfordAbstracts/html-to-docx/commit/c34810f1373f934b0b3ecbe9da2838f41a68dcc9))
- Updated documentrels xml generation ([433e4b4](https://github.com/OxfordAbstracts/html-to-docx/commit/433e4b4eb9d71beede8feb1754363163ba5d1933))
- Updated example ([ec6323a](https://github.com/OxfordAbstracts/html-to-docx/commit/ec6323aa0124bcfe5f0c11ad181c0930d9d9a825))
- Updated high level option ([84a11bc](https://github.com/OxfordAbstracts/html-to-docx/commit/84a11bc364991910b0428567b95a662149ca71c5))
- Updated numbering xml generation ([81b7a82](https://github.com/OxfordAbstracts/html-to-docx/commit/81b7a8296d1e3afa095f47007a66698852d29f95))
- Updated row borders to use css borders ([76aeb85](https://github.com/OxfordAbstracts/html-to-docx/commit/76aeb85e8f75edb2c669f28674e5353599045866))
- Updated xml builder to use namespace and child nodes ([2e28b5e](https://github.com/OxfordAbstracts/html-to-docx/commit/2e28b5ec07241c10c4288412a6ced8023e8c03ce))
- Used image dimensions for extent fragment ([aa17f74](https://github.com/OxfordAbstracts/html-to-docx/commit/aa17f74d3a2fab51cfa730ce62c09c2862bad532))
- Using libtidy for cleaning up HTML string ([6b237a8](https://github.com/OxfordAbstracts/html-to-docx/commit/6b237a885008414c4625ca6b891bd7e48cee2111))
- Wrapped drawing inside paragraph tag ([d0476b4](https://github.com/OxfordAbstracts/html-to-docx/commit/d0476b4211fe13f5918091a6a06e5021015a5db8))
- template: Fixed document templating ([5f6a74f](https://github.com/OxfordAbstracts/html-to-docx/commit/5f6a74f9964348590fbb7f5baf88230c8c796766))
- template: Fixed numbering templating ([8b09691](https://github.com/OxfordAbstracts/html-to-docx/commit/8b096916284cbbe8452bb572d788caee23849084))
- template: Removed word xml schema ([ee0e1ed](https://github.com/OxfordAbstracts/html-to-docx/commit/ee0e1ed7b0b00cbaf3644ad887175abac0282dcc))


## 2020-10-06 - [1.1.31](https://github.com/OxfordAbstracts/html-to-docx/compare/v1.1.30...v1.1.31)

### Features

- Added page break support ([085ed2a](https://github.com/OxfordAbstracts/html-to-docx/commit/085ed2a2cb439ee2a4189b3664deca047926672b))
- Added table row cant split option ([252178c](https://github.com/OxfordAbstracts/html-to-docx/commit/252178c922d9910b8a89e6c4e30fafd2994d92d7))

### Bug Fixes

- Removed html tidying ([0a43396](https://github.com/OxfordAbstracts/html-to-docx/commit/0a43396a9f8e022fe0f5069d513c7aa841e57d6c))
- Removed libtidy-updated ([aab3b19](https://github.com/OxfordAbstracts/html-to-docx/commit/aab3b19b725f53d3a34266f6bf49d8712190007e))
- Updated example ([ec6323a](https://github.com/OxfordAbstracts/html-to-docx/commit/ec6323aa0124bcfe5f0c11ad181c0930d9d9a825))
- Updated high level option ([84a11bc](https://github.com/OxfordAbstracts/html-to-docx/commit/84a11bc364991910b0428567b95a662149ca71c5))


## 2020-09-21 - [1.1.30](https://github.com/OxfordAbstracts/html-to-docx/compare/v1.1.29...v1.1.30)

### Features

- Added generic rels xml string ([7d2ea84](https://github.com/OxfordAbstracts/html-to-docx/commit/7d2ea8404093fd99ce5e6bccaedaf3603830f574))
- Added header relationship support ([cc08355](https://github.com/OxfordAbstracts/html-to-docx/commit/cc083553e28a3ed88da3cc27ef0de0cbb26350b3))


## 2020-08-11 - [1.1.29](https://github.com/OxfordAbstracts/html-to-docx/compare/v1.1.28...v1.1.29)

### Bug Fixes

- Formatted list ([2e00e44](https://github.com/OxfordAbstracts/html-to-docx/commit/2e00e448b812111d09c50b9759b9dd46bd36c860))


## 2020-08-06 - [1.1.28](https://github.com/OxfordAbstracts/html-to-docx/compare/v1.1.27...v1.1.28)

### Features

- Added table max width support ([49ab5d3](https://github.com/OxfordAbstracts/html-to-docx/commit/49ab5d3876cdd58c2efd1b492fc5bb41e9a857e7))

### Bug Fixes

- Added extra before spacing for heading elements ([dc50c8d](https://github.com/OxfordAbstracts/html-to-docx/commit/dc50c8dfe85a126be1780598974752cd939b6a9f))
- Changed width conditions to match suggestions ([48347ab](https://github.com/OxfordAbstracts/html-to-docx/commit/48347abe339aadc3b322d763d52bc607d1293680))


## 2020-08-04 - [1.1.27](https://github.com/OxfordAbstracts/html-to-docx/compare/v1.1.26...v1.1.27)

### Bug Fixes

- List element render ([2881455](https://github.com/OxfordAbstracts/html-to-docx/commit/2881455633e81127e192f8e0de7fe4711c320583))


## 2020-08-04 - [1.1.26](https://github.com/OxfordAbstracts/html-to-docx/compare/v1.1.25...v1.1.26)

### Bug Fixes

- Handled formatting within list element ([aeb3f00](https://github.com/OxfordAbstracts/html-to-docx/commit/aeb3f0041d352ea8442551d30770644d04698e7a))


## 2020-07-24 - [1.1.25](https://github.com/OxfordAbstracts/html-to-docx/compare/v1.1.24...v1.1.25)

### Features

- Changed list parsing to support nested lists ([4339f2f](https://github.com/OxfordAbstracts/html-to-docx/commit/4339f2f9d2bdc5ffd68def80449c9bce8c09c9a9))

### Bug Fixes

- Modified abstractnumbering definition to support nested lists ([3dd6e3e](https://github.com/OxfordAbstracts/html-to-docx/commit/3dd6e3e6a8e02b1cd0892735c9053eb0ba518092))


## 2020-07-22 - [1.1.24](https://github.com/OxfordAbstracts/html-to-docx/compare/v1.1.23...v1.1.24)

### Bug Fixes

- Updated row borders to use css borders ([76aeb85](https://github.com/OxfordAbstracts/html-to-docx/commit/76aeb85e8f75edb2c669f28674e5353599045866))


## 2020-07-21 - [1.1.23](https://github.com/OxfordAbstracts/html-to-docx/compare/v1.1.22...v1.1.23)

### Features

- Added css border string parser ([15562e8](https://github.com/OxfordAbstracts/html-to-docx/commit/15562e817732d1d85b99fd33921694f2e3ad3ad7))
- Added eip conversions ([9d6e317](https://github.com/OxfordAbstracts/html-to-docx/commit/9d6e3171c0b0f9d71f776762357d4a329778cedb))
- Added minimum width support to tables ([b10d820](https://github.com/OxfordAbstracts/html-to-docx/commit/b10d820061b10531aa027fde304fbe3ceac849d5))
- Make tables center aligned ([077049b](https://github.com/OxfordAbstracts/html-to-docx/commit/077049b40babc45ec527b53211d4b33ba4f2b6ab))

### Bug Fixes

- Border color ([a322450](https://github.com/OxfordAbstracts/html-to-docx/commit/a322450ceda77dbabaee24d1e9619ced04d88cad))
- Improved table border styling ([ba3aa67](https://github.com/OxfordAbstracts/html-to-docx/commit/ba3aa67fc484fa1a47b1f61f5dd7f69dff353f48))
- Set default values for table attributes and styles ([2a4fb23](https://github.com/OxfordAbstracts/html-to-docx/commit/2a4fb23747cc3830c1ed81fade8316a27f67efd7))


## 2020-07-09 - 1.1.22

### Features

- packaging: Added jszip for packaging ([89619ec](https://github.com/OxfordAbstracts/html-to-docx/commit/89619ec702564fb9c5eccaee55e65d366fcbacad))
- packaging: Added method to create container ([9808cf2](https://github.com/OxfordAbstracts/html-to-docx/commit/9808cf211bbb50cf3d7cbe122d01c82d4272e888))
- Enabling header on flag ([516463c](https://github.com/OxfordAbstracts/html-to-docx/commit/516463cd532e58895faa8dd465b7e725f0de59e3))
- template: Added base docx template ([abdb87b](https://github.com/OxfordAbstracts/html-to-docx/commit/abdb87bdfead91890f9d54e2cedd038e916b6dce))
- Abstracted conversion using docxDocument class ([c625a01](https://github.com/OxfordAbstracts/html-to-docx/commit/c625a0181a6c328c0319b579fa1173192dff1187))
- Added b tag support ([f867abd](https://github.com/OxfordAbstracts/html-to-docx/commit/f867abd41c6bc85bbba207a27c58d441f1a2b532))
- Added builder methods for images ([9e2720f](https://github.com/OxfordAbstracts/html-to-docx/commit/9e2720f261a46701c8a2581aadafa9b60e6cee6b))
- Added css color string ([cb0db2f](https://github.com/OxfordAbstracts/html-to-docx/commit/cb0db2ff2d3f2f66df823dbafbc5603030241bc3))
- Added document file render helper ([6dd9c3a](https://github.com/OxfordAbstracts/html-to-docx/commit/6dd9c3a01f5fceab78404d8ebddb848fb91c933c))
- Added em tag support ([6a06265](https://github.com/OxfordAbstracts/html-to-docx/commit/6a06265f724a611b50144cb988e576bc4e40b4d4))
- Added escape-html ([1a231d5](https://github.com/OxfordAbstracts/html-to-docx/commit/1a231d5dde3e6f9b5a23f248e19063191c07e54f))
- Added font size support ([0f27c60](https://github.com/OxfordAbstracts/html-to-docx/commit/0f27c609baa5b9488bc195dff1c060bcc04bbf2d))
- Added font support in styles ([18b3281](https://github.com/OxfordAbstracts/html-to-docx/commit/18b3281ac3f91e5c1905efa0487354ff78badec2))
- Added font table ([0903d6b](https://github.com/OxfordAbstracts/html-to-docx/commit/0903d6b98fae6dc378cdeafdadd80a86501c9959))
- Added header generation ([25fb44f](https://github.com/OxfordAbstracts/html-to-docx/commit/25fb44f945df3fdc5f37d619b3de3ebe68b84cd6))
- Added heading sizes ([bb18e72](https://github.com/OxfordAbstracts/html-to-docx/commit/bb18e724c42b0c4581722b2899d5ff808c1495c4))
- Added headings support ([fd489ee](https://github.com/OxfordAbstracts/html-to-docx/commit/fd489eeebfeedc7d05991f9366aeae2adc49fd6f))
- Added highlight support ([6159925](https://github.com/OxfordAbstracts/html-to-docx/commit/6159925495b74ab254cd7dc5628526d531595a92))
- Added horizontal text alignment ([d29669f](https://github.com/OxfordAbstracts/html-to-docx/commit/d29669ffdb0d63b7bdbbe09c6bca990e4c28cfb8))
- Added hsl conversion support ([153fa43](https://github.com/OxfordAbstracts/html-to-docx/commit/153fa43f84c640085f45823bc2054b24c28023d0))
- Added hyperlinks support ([3560ce9](https://github.com/OxfordAbstracts/html-to-docx/commit/3560ce9f23fa8f590aa340302bf0059c8dfb6d5f))
- Added ins tag support ([6d64908](https://github.com/OxfordAbstracts/html-to-docx/commit/6d64908858dac290aa34421c236bdaf2d8ef07a7))
- Added line height support ([3d0ea2f](https://github.com/OxfordAbstracts/html-to-docx/commit/3d0ea2fe56d13893e3c5cd0e4a35e7b26b7c1d0a))
- Added linebreak support ([57c054c](https://github.com/OxfordAbstracts/html-to-docx/commit/57c054cd65f49d7c4244272af0117f2c141a8bc7))
- Added method to archive images with other files ([b6da74b](https://github.com/OxfordAbstracts/html-to-docx/commit/b6da74be10be03d689ca044f3f95dd724a3a29b6))
- Added more unit converters ([8f78c52](https://github.com/OxfordAbstracts/html-to-docx/commit/8f78c5241cf33d471c8b08e3f941f401d6a50d7b))
- Added more xml builder methods ([ffc584b](https://github.com/OxfordAbstracts/html-to-docx/commit/ffc584bed7ab434431999517a3308483ba99489a))
- Added more xml statment builder methods ([337e530](https://github.com/OxfordAbstracts/html-to-docx/commit/337e5305aa8768b6507323bec2279d557a35b67b))
- Added other measure units for margins and fonts ([1ae584a](https://github.com/OxfordAbstracts/html-to-docx/commit/1ae584a1b0a5350943e10c0d129402b843d7b9a2))
- Added strike through support ([b73e8c7](https://github.com/OxfordAbstracts/html-to-docx/commit/b73e8c76d0051bc6449ed57861b4ce1c7ad4b408))
- Added support for span font sizing ([98b4844](https://github.com/OxfordAbstracts/html-to-docx/commit/98b4844858f967bd5a3932262d0b535cd53d499d))
- Added support for subscript and superscript ([f1ee4ed](https://github.com/OxfordAbstracts/html-to-docx/commit/f1ee4edf183a45731b48bba2b91154da591c203f))
- Added table row height support ([031c3aa](https://github.com/OxfordAbstracts/html-to-docx/commit/031c3aa963e5a7b2ee985ae8ac6ff612c89ae974))
- Added text formatting to paragraph ([bacd888](https://github.com/OxfordAbstracts/html-to-docx/commit/bacd888253a35a18ac7ea4e9141d4a4fb60e3cf7))
- Added valign to table cell element ([20e94f1](https://github.com/OxfordAbstracts/html-to-docx/commit/20e94f18370e8a92034f6d35f5e744ceb57ed774))
- Added vdom to xml method ([8b5a618](https://github.com/OxfordAbstracts/html-to-docx/commit/8b5a6185e6e211b0e07b9f1c1b7e23fb4b13dc9c))
- Added virtual-dom and html-to-vdom ([feaa396](https://github.com/OxfordAbstracts/html-to-docx/commit/feaa396162465276d19b7d3d5c51a533987a1738))
- Added xbuilder ([f13b5cc](https://github.com/OxfordAbstracts/html-to-docx/commit/f13b5cc06d29ae53493f1f4b8fdef6e8986e64e6))
- Added xml builder methods for images ([f413ad8](https://github.com/OxfordAbstracts/html-to-docx/commit/f413ad89b263c63a8fb9890b44b1b219a7413c4b))
- Added xml statement builder helper ([5e23c16](https://github.com/OxfordAbstracts/html-to-docx/commit/5e23c1636eb3c64f52589f1ac71a48dec3df65c2))
- Handle line breaks ([164c0f5](https://github.com/OxfordAbstracts/html-to-docx/commit/164c0f5e17f62e3f30da25be6e181d3414ca4dde))
- Styling table color ([2b44bff](https://github.com/OxfordAbstracts/html-to-docx/commit/2b44bff7dee0dad0de75f3c3b2403278c19e3a4b))
- template: Added numbering schema ([d179d73](https://github.com/OxfordAbstracts/html-to-docx/commit/d179d736e6e63ed42104a231ca0489430faae00a))
- template: Added styles schema ([d83d230](https://github.com/OxfordAbstracts/html-to-docx/commit/d83d230a66807f6ad08ebb4a6c0c5299c311aaf5))
- template: Added XML schemas ([42232da](https://github.com/OxfordAbstracts/html-to-docx/commit/42232da9d63ed404367703e56b1c65cdb8a23782))

### Bug Fixes

- 3 digit hex color code support ([255fe82](https://github.com/OxfordAbstracts/html-to-docx/commit/255fe82fc47e2a447c795c346ae7c6634ae442d1))
- Added attributes to anchor drawing ([62e4a29](https://github.com/OxfordAbstracts/html-to-docx/commit/62e4a29ef664257d8f0364d5d97f056a62f0fb61))
- Added black as default color ([bcfcba3](https://github.com/OxfordAbstracts/html-to-docx/commit/bcfcba36194925fdf08a4c297ceafcb5b08c124b))
- Added bold to headings ([abe968a](https://github.com/OxfordAbstracts/html-to-docx/commit/abe968a0f2cdac5d01abf44bf7e7019922b295dd))
- Added border for paragraph padding ([252ead6](https://github.com/OxfordAbstracts/html-to-docx/commit/252ead6dc9f09b84edc9f1b145bb76ad2cb4fc01))
- Added colspan support for table cells ([bdf92f8](https://github.com/OxfordAbstracts/html-to-docx/commit/bdf92f8dbb10b4b58188364f3bdc5ff91e9cc982))
- Added default options ([4590800](https://github.com/OxfordAbstracts/html-to-docx/commit/459080010f92ce7464f4815585088a46ce8e759d))
- Added effectextent and srcrect fragment ([5f5e975](https://github.com/OxfordAbstracts/html-to-docx/commit/5f5e975b135eb38c48e18a09da590b363166d74e))
- Added empty paragraph for spacing after table ([6bae787](https://github.com/OxfordAbstracts/html-to-docx/commit/6bae787cbf3f376b8ec34389f444d8c7c5f3b340))
- Added extent fragment ([7ce81f2](https://github.com/OxfordAbstracts/html-to-docx/commit/7ce81f27e4c493bb9bf7d368a415f34cb0678e4c))
- Added header override in content-types xml ([5de681b](https://github.com/OxfordAbstracts/html-to-docx/commit/5de681be9295754eff648cea504e07bf9a6f6d09))
- Added html string minifier ([8faa19c](https://github.com/OxfordAbstracts/html-to-docx/commit/8faa19c46ff85a31b16e89207cbc2120c6ed5805))
- Added image conversion handler ([f726e71](https://github.com/OxfordAbstracts/html-to-docx/commit/f726e71ee2504bc254794ad09eaf5d67a8901b9a))
- Added image in table cell support ([7d98a16](https://github.com/OxfordAbstracts/html-to-docx/commit/7d98a16b1509b57910e8294cfb3985a88b7154ae))
- Added inline attributes ([0a4d2ce](https://github.com/OxfordAbstracts/html-to-docx/commit/0a4d2ce4b4c64952c3866928e6355b7c891ac044))
- Added italics, underline and bold in runproperties ([34c2e18](https://github.com/OxfordAbstracts/html-to-docx/commit/34c2e18123c8a6a956209951afebc0dce2ab6cfc))
- Added more namespaces ([68636b4](https://github.com/OxfordAbstracts/html-to-docx/commit/68636b4c7cc73bf9e0de75b7bf97ac9afb4fb6f9))
- Added namespace aliases to header and numbering xmls ([d0b4101](https://github.com/OxfordAbstracts/html-to-docx/commit/d0b4101017a6dabd0fa18e23228bd4af338129eb))
- Added numbering and styles relationship ([c7e29af](https://github.com/OxfordAbstracts/html-to-docx/commit/c7e29af7414ce71515c46861942342d4f397222b))
- Added other namespaces to the xml root ([afbbca9](https://github.com/OxfordAbstracts/html-to-docx/commit/afbbca9dbf723afc857034ce7770bc8f0840c0e4))
- Added override for relationship ([30acddc](https://github.com/OxfordAbstracts/html-to-docx/commit/30acddc84d40dc6c66ed9539618b94adeeb2fc85))
- Added override for settings and websettings ([977af04](https://github.com/OxfordAbstracts/html-to-docx/commit/977af04f48c19f2b3162cf6e61782cf63e7162e8))
- Added overrides for relationships ([22b9cac](https://github.com/OxfordAbstracts/html-to-docx/commit/22b9cac2fa788b9654262e450774c588180a18de))
- Added padding between image and wrapping text ([e45fbf5](https://github.com/OxfordAbstracts/html-to-docx/commit/e45fbf553c19071023634b692e3c4b0fab04aedf))
- Added positioning fragments ([e6f7e1c](https://github.com/OxfordAbstracts/html-to-docx/commit/e6f7e1c3679aa813a2818725548dfb5ebb0d9bd7))
- Added required attributes to anchor fragment ([d01c9f9](https://github.com/OxfordAbstracts/html-to-docx/commit/d01c9f915a929de201218af127103da627aaa4a1))
- Added settings and websettings relation ([34aeedc](https://github.com/OxfordAbstracts/html-to-docx/commit/34aeedce6d0dd02822062762f9b077bb146b09b9))
- Added settings and websettings to ooxml package ([6c829b5](https://github.com/OxfordAbstracts/html-to-docx/commit/6c829b5ec4596ba0b5d41fae9ba2bfd68fdf7230))
- Added simple positioning to anchor ([5006cc4](https://github.com/OxfordAbstracts/html-to-docx/commit/5006cc47d112360e51d8051f1ebff570e9f12779))
- Added support for decimal inch ([6027d2f](https://github.com/OxfordAbstracts/html-to-docx/commit/6027d2f36bbc9bb97ff4cbcaa59372df33528a54))
- Added support for full width background color ([733a937](https://github.com/OxfordAbstracts/html-to-docx/commit/733a9373ba13ccb0b781f66fe87d91a3eed4aab9))
- Added table and cell border support ([985f6a1](https://github.com/OxfordAbstracts/html-to-docx/commit/985f6a1e7a2e52f3b0a609a00da8a11bf113ef16))
- Added table borders ([12864db](https://github.com/OxfordAbstracts/html-to-docx/commit/12864db468a08f4aca4d01cb8e8b6635aa09c57d))
- Added table cell border support ([852c091](https://github.com/OxfordAbstracts/html-to-docx/commit/852c091e15a3b2add7b622472be8fc021bb05c06))
- Added table header support ([592aa89](https://github.com/OxfordAbstracts/html-to-docx/commit/592aa893fa115a83bc1d056c98480dbe5cc872f9))
- Added table width support ([73b172b](https://github.com/OxfordAbstracts/html-to-docx/commit/73b172b584aaeb7137d58e0eb2d8b73c4bb92561))
- Added unit conversion utils ([d5b5a91](https://github.com/OxfordAbstracts/html-to-docx/commit/d5b5a915d215fb834cfe84996539ae663cc98914))
- Added unit conversions ([e6d546b](https://github.com/OxfordAbstracts/html-to-docx/commit/e6d546bca1a87182568d15bad99ac0af23ee55de))
- Added unit conversions ([5890b18](https://github.com/OxfordAbstracts/html-to-docx/commit/5890b18833cc11f10c8ffc1e57d1dd9ffd46395d))
- Added wrap elements ([c951688](https://github.com/OxfordAbstracts/html-to-docx/commit/c95168864c4929e2ab95c5a6a53d0919c76f8a83))
- Bold based on font-weight ([3f0376e](https://github.com/OxfordAbstracts/html-to-docx/commit/3f0376e0a1e267705117a2ec50c9f382286b2a60))
- Changed attribute field for picture name ([aef241d](https://github.com/OxfordAbstracts/html-to-docx/commit/aef241dc3d3d9adb732c429df9f0c2771b319680))
- Changed attribute used for name ([3885233](https://github.com/OxfordAbstracts/html-to-docx/commit/3885233bf14f9b7b16d48a2844d3e997e476a8ee))
- Changed default namespace of relationship to solve render issue ([56a3554](https://github.com/OxfordAbstracts/html-to-docx/commit/56a3554e7b2e9d85cedeece8d20acfebf23666ad))
- Changed file extension if octet stream is encountered ([32c5bf1](https://github.com/OxfordAbstracts/html-to-docx/commit/32c5bf1b5f7c5f8dc83a51fed142e932c7b008fd))
- Changed line spacing rule to work with inline images ([489f1c6](https://github.com/OxfordAbstracts/html-to-docx/commit/489f1c62fc093b108bc16aee33d74baad4ced7d8))
- Changed namespaces to original ecma 376 spec ([51be86e](https://github.com/OxfordAbstracts/html-to-docx/commit/51be86ecf0f4a78457840bf2a31579d217568208))
- Changed paragraph after spacing ([025523b](https://github.com/OxfordAbstracts/html-to-docx/commit/025523b0f07433456e3f19f3774f441e46c7a89b))
- Created seperate abstract numbering for each lists ([c723c74](https://github.com/OxfordAbstracts/html-to-docx/commit/c723c746a3feb2612e73dddac14f1c40864e9ad9))
- Fix table render issue due to grid width ([636d499](https://github.com/OxfordAbstracts/html-to-docx/commit/636d499bcee00195f7b5ca198c60bb3e0f7d2a69))
- Fixed abstract numbering id ([9814cb8](https://github.com/OxfordAbstracts/html-to-docx/commit/9814cb89582bc7e87cec638be37ee1cd326c6117))
- Fixed coloring and refactored other text formatting ([c288f80](https://github.com/OxfordAbstracts/html-to-docx/commit/c288f809ea6387c91356976a6dd81396cecafc46))
- Fixed document rels and numbering bug ([d6e3152](https://github.com/OxfordAbstracts/html-to-docx/commit/d6e3152081da7d2ab379a67bfda345964fa15c40))
- Fixed docx generation ([3d96acf](https://github.com/OxfordAbstracts/html-to-docx/commit/3d96acf511d82776510fac857af57d5cb9453f89))
- Fixed incorrect table row generation ([742dd18](https://github.com/OxfordAbstracts/html-to-docx/commit/742dd1882ce4c1a33ab51e10ee2a628b817eca31))
- Fixed internal mode and added extensions ([1266121](https://github.com/OxfordAbstracts/html-to-docx/commit/12661213e00c55f7068e93abb019ba80cd4f2d87))
- Fixed margin issues ([f841b76](https://github.com/OxfordAbstracts/html-to-docx/commit/f841b76caa944ea5eec206a3b3fce3e5a5eaf3e7))
- Fixed numbering and header issue due to wrong filename ([64a04bc](https://github.com/OxfordAbstracts/html-to-docx/commit/64a04bc192616162aa67c43f80734e7ebb9ff588))
- Fixed table and image rendering ([c153092](https://github.com/OxfordAbstracts/html-to-docx/commit/c1530924f93351ce63882bf0e6050b6315aa6017))
- Handled empty formatting tag ([d97521f](https://github.com/OxfordAbstracts/html-to-docx/commit/d97521f8004d2e7af9f324cdbdcbbe4fcc299e4b))
- Handled figure wrapper for images and tables ([4182a95](https://github.com/OxfordAbstracts/html-to-docx/commit/4182a9543aeb71fd8b0d2c7a2e08978a782de3e6))
- Handled horizontal alignment ([72478cb](https://github.com/OxfordAbstracts/html-to-docx/commit/72478cb2308ac029f9a8149c416012101d23c18c))
- Handled image inside table cell ([339c18a](https://github.com/OxfordAbstracts/html-to-docx/commit/339c18a3de7e7e86e4133a72e54cb6ed5ec386c2))
- Handled table width ([237ddfd](https://github.com/OxfordAbstracts/html-to-docx/commit/237ddfd6bff914e0379c6cbd940a7eac29d7aeaf))
- Handled vertical alignment ([b2b3bcc](https://github.com/OxfordAbstracts/html-to-docx/commit/b2b3bcc382dc645a3cdebe18d99558538bad6282))
- Handling multiple span children and multilevel formatting of text ([4c81f58](https://github.com/OxfordAbstracts/html-to-docx/commit/4c81f586400d1f227236a8b07d067331c0f02c5d))
- Handling nested formatting ([04f0d7e](https://github.com/OxfordAbstracts/html-to-docx/commit/04f0d7e822a57fc3ba98d3990e17b9153c54afc7))
- Handling non paragraph text elements ([b4cc062](https://github.com/OxfordAbstracts/html-to-docx/commit/b4cc06237862c07b900b7ce158cddf2b673f0e1c))
- Modified example to use esm bundle ([491a83d](https://github.com/OxfordAbstracts/html-to-docx/commit/491a83d9b2c0deec13743817cdf32280d39bb9cd))
- Moved namespaces into separate file ([75cdf30](https://github.com/OxfordAbstracts/html-to-docx/commit/75cdf3033e69934b189a74d6c77eef08d50492aa))
- Namespace updated to 2016 standards ([6fc2ac2](https://github.com/OxfordAbstracts/html-to-docx/commit/6fc2ac2b6e904c4dd774b24e0ad119cccd873e0b))
- Preserve spacing on text ([f2f12b1](https://github.com/OxfordAbstracts/html-to-docx/commit/f2f12b1f4903aa7caf6bae5cad3b88d9aed46d18))
- Removed unwanted attribute ([f3caf44](https://github.com/OxfordAbstracts/html-to-docx/commit/f3caf44faf95ba8c6dee1f6f959300374e2b65ff))
- Renamed document rels schema file ([10c3fda](https://github.com/OxfordAbstracts/html-to-docx/commit/10c3fda9878847257b902d4c13c2d8dd36edd3f6))
- Renamed unit converters ([eee4487](https://github.com/OxfordAbstracts/html-to-docx/commit/eee44877cfee7228eb27b9efeb10b07a0e67ada9))
- Rewrote formatting loop to avoid memory leaks and text loss ([e5fe27c](https://github.com/OxfordAbstracts/html-to-docx/commit/e5fe27c232ba1394b93735dcc701354bbc5244b3))
- Scaled down images ([72d7c44](https://github.com/OxfordAbstracts/html-to-docx/commit/72d7c448730a46499a1a5cab50c443a525967a54))
- Table cell border style support ([2c5a205](https://github.com/OxfordAbstracts/html-to-docx/commit/2c5a2055d33ee02f55a07e9c8ba985e2e07f2871))
- template: Fixed document templating ([5f6a74f](https://github.com/OxfordAbstracts/html-to-docx/commit/5f6a74f9964348590fbb7f5baf88230c8c796766))
- Table cell vertical align issue ([424d2c1](https://github.com/OxfordAbstracts/html-to-docx/commit/424d2c1177e1d335dbfa2b016d59cd50817e679a))
- Table header bold ([aa62347](https://github.com/OxfordAbstracts/html-to-docx/commit/aa6234724f7b8f1ba91d724b9c6cd12ab2b725cb))
- Updated document abstraction to track generation ids ([c34810f](https://github.com/OxfordAbstracts/html-to-docx/commit/c34810f1373f934b0b3ecbe9da2838f41a68dcc9))
- template: Fixed numbering templating ([8b09691](https://github.com/OxfordAbstracts/html-to-docx/commit/8b096916284cbbe8452bb572d788caee23849084))
- Updated documentrels xml generation ([433e4b4](https://github.com/OxfordAbstracts/html-to-docx/commit/433e4b4eb9d71beede8feb1754363163ba5d1933))
- Updated numbering xml generation ([81b7a82](https://github.com/OxfordAbstracts/html-to-docx/commit/81b7a8296d1e3afa095f47007a66698852d29f95))
- Updated xml builder to use namespace and child nodes ([2e28b5e](https://github.com/OxfordAbstracts/html-to-docx/commit/2e28b5ec07241c10c4288412a6ced8023e8c03ce))
- template: Removed word xml schema ([ee0e1ed](https://github.com/OxfordAbstracts/html-to-docx/commit/ee0e1ed7b0b00cbaf3644ad887175abac0282dcc))
- Used image dimensions for extent fragment ([aa17f74](https://github.com/OxfordAbstracts/html-to-docx/commit/aa17f74d3a2fab51cfa730ce62c09c2862bad532))
- Using libtidy for cleaning up HTML string ([6b237a8](https://github.com/OxfordAbstracts/html-to-docx/commit/6b237a885008414c4625ca6b891bd7e48cee2111))
- Wrapped drawing inside paragraph tag ([d0476b4](https://github.com/OxfordAbstracts/html-to-docx/commit/d0476b4211fe13f5918091a6a06e5021015a5db8))


## 2020-07-02 - [1.1.21](https://github.com/OxfordAbstracts/html-to-docx/compare/v1.1.20...v1.1.21)

### Bug Fixes

- Changed paragraph after spacing ([025523b](https://github.com/OxfordAbstracts/html-to-docx/commit/025523b0f07433456e3f19f3774f441e46c7a89b))


## 2020-07-01 - [1.1.20](https://github.com/OxfordAbstracts/html-to-docx/compare/v1.1.19...v1.1.20)


## 2020-07-01 - [1.1.19](https://github.com/OxfordAbstracts/html-to-docx/compare/v1.1.18...v1.1.19)

### Bug Fixes

- Handled empty formatting tag ([d97521f](https://github.com/OxfordAbstracts/html-to-docx/commit/d97521f8004d2e7af9f324cdbdcbbe4fcc299e4b))


## 2020-06-23 - [1.1.18](https://github.com/OxfordAbstracts/html-to-docx/compare/v1.1.17...v1.1.18)

### Bug Fixes

- Added border for paragraph padding ([252ead6](https://github.com/OxfordAbstracts/html-to-docx/commit/252ead6dc9f09b84edc9f1b145bb76ad2cb4fc01))


## 2020-06-15 - [1.1.17](https://github.com/OxfordAbstracts/html-to-docx/compare/v1.1.16...v1.1.17)

### Bug Fixes

- Added support for decimal inch ([6027d2f](https://github.com/OxfordAbstracts/html-to-docx/commit/6027d2f36bbc9bb97ff4cbcaa59372df33528a54))
- Added support for full width background color ([733a937](https://github.com/OxfordAbstracts/html-to-docx/commit/733a9373ba13ccb0b781f66fe87d91a3eed4aab9))


## 2020-06-12 - [1.1.16](https://github.com/OxfordAbstracts/html-to-docx/compare/v1.1.15...v1.1.16)

### Bug Fixes

- Handled image inside table cell ([339c18a](https://github.com/OxfordAbstracts/html-to-docx/commit/339c18a3de7e7e86e4133a72e54cb6ed5ec386c2))


## 2020-06-12 - [1.1.15](https://github.com/OxfordAbstracts/html-to-docx/compare/v1.1.14...v1.1.15)


## 2020-06-12 - [1.1.14](https://github.com/OxfordAbstracts/html-to-docx/compare/v1.1.13...v1.1.14)

### Features

- packaging: Added jszip for packaging ([89619ec](https://github.com/OxfordAbstracts/html-to-docx/commit/89619ec702564fb9c5eccaee55e65d366fcbacad))
- packaging: Added method to create container ([9808cf2](https://github.com/OxfordAbstracts/html-to-docx/commit/9808cf211bbb50cf3d7cbe122d01c82d4272e888))
- Enabling header on flag ([516463c](https://github.com/OxfordAbstracts/html-to-docx/commit/516463cd532e58895faa8dd465b7e725f0de59e3))
- template: Added base docx template ([abdb87b](https://github.com/OxfordAbstracts/html-to-docx/commit/abdb87bdfead91890f9d54e2cedd038e916b6dce))
- Abstracted conversion using docxDocument class ([c625a01](https://github.com/OxfordAbstracts/html-to-docx/commit/c625a0181a6c328c0319b579fa1173192dff1187))
- Added b tag support ([f867abd](https://github.com/OxfordAbstracts/html-to-docx/commit/f867abd41c6bc85bbba207a27c58d441f1a2b532))
- Added builder methods for images ([9e2720f](https://github.com/OxfordAbstracts/html-to-docx/commit/9e2720f261a46701c8a2581aadafa9b60e6cee6b))
- Added css color string ([cb0db2f](https://github.com/OxfordAbstracts/html-to-docx/commit/cb0db2ff2d3f2f66df823dbafbc5603030241bc3))
- Added document file render helper ([6dd9c3a](https://github.com/OxfordAbstracts/html-to-docx/commit/6dd9c3a01f5fceab78404d8ebddb848fb91c933c))
- Added em tag support ([6a06265](https://github.com/OxfordAbstracts/html-to-docx/commit/6a06265f724a611b50144cb988e576bc4e40b4d4))
- Added escape-html ([1a231d5](https://github.com/OxfordAbstracts/html-to-docx/commit/1a231d5dde3e6f9b5a23f248e19063191c07e54f))
- Added font size support ([0f27c60](https://github.com/OxfordAbstracts/html-to-docx/commit/0f27c609baa5b9488bc195dff1c060bcc04bbf2d))
- Added font support in styles ([18b3281](https://github.com/OxfordAbstracts/html-to-docx/commit/18b3281ac3f91e5c1905efa0487354ff78badec2))
- Added font table ([0903d6b](https://github.com/OxfordAbstracts/html-to-docx/commit/0903d6b98fae6dc378cdeafdadd80a86501c9959))
- Added header generation ([25fb44f](https://github.com/OxfordAbstracts/html-to-docx/commit/25fb44f945df3fdc5f37d619b3de3ebe68b84cd6))
- Added heading sizes ([bb18e72](https://github.com/OxfordAbstracts/html-to-docx/commit/bb18e724c42b0c4581722b2899d5ff808c1495c4))
- Added headings support ([fd489ee](https://github.com/OxfordAbstracts/html-to-docx/commit/fd489eeebfeedc7d05991f9366aeae2adc49fd6f))
- Added highlight support ([6159925](https://github.com/OxfordAbstracts/html-to-docx/commit/6159925495b74ab254cd7dc5628526d531595a92))
- Added horizontal text alignment ([d29669f](https://github.com/OxfordAbstracts/html-to-docx/commit/d29669ffdb0d63b7bdbbe09c6bca990e4c28cfb8))
- Added hsl conversion support ([153fa43](https://github.com/OxfordAbstracts/html-to-docx/commit/153fa43f84c640085f45823bc2054b24c28023d0))
- Added hyperlinks support ([3560ce9](https://github.com/OxfordAbstracts/html-to-docx/commit/3560ce9f23fa8f590aa340302bf0059c8dfb6d5f))
- Added ins tag support ([6d64908](https://github.com/OxfordAbstracts/html-to-docx/commit/6d64908858dac290aa34421c236bdaf2d8ef07a7))
- Added line height support ([3d0ea2f](https://github.com/OxfordAbstracts/html-to-docx/commit/3d0ea2fe56d13893e3c5cd0e4a35e7b26b7c1d0a))
- Added linebreak support ([57c054c](https://github.com/OxfordAbstracts/html-to-docx/commit/57c054cd65f49d7c4244272af0117f2c141a8bc7))
- Added method to archive images with other files ([b6da74b](https://github.com/OxfordAbstracts/html-to-docx/commit/b6da74be10be03d689ca044f3f95dd724a3a29b6))
- Added more unit converters ([8f78c52](https://github.com/OxfordAbstracts/html-to-docx/commit/8f78c5241cf33d471c8b08e3f941f401d6a50d7b))
- Added more xml builder methods ([ffc584b](https://github.com/OxfordAbstracts/html-to-docx/commit/ffc584bed7ab434431999517a3308483ba99489a))
- Added more xml statment builder methods ([337e530](https://github.com/OxfordAbstracts/html-to-docx/commit/337e5305aa8768b6507323bec2279d557a35b67b))
- Added other measure units for margins and fonts ([1ae584a](https://github.com/OxfordAbstracts/html-to-docx/commit/1ae584a1b0a5350943e10c0d129402b843d7b9a2))
- Added strike through support ([b73e8c7](https://github.com/OxfordAbstracts/html-to-docx/commit/b73e8c76d0051bc6449ed57861b4ce1c7ad4b408))
- Added support for span font sizing ([98b4844](https://github.com/OxfordAbstracts/html-to-docx/commit/98b4844858f967bd5a3932262d0b535cd53d499d))
- Added support for subscript and superscript ([f1ee4ed](https://github.com/OxfordAbstracts/html-to-docx/commit/f1ee4edf183a45731b48bba2b91154da591c203f))
- Added table row height support ([031c3aa](https://github.com/OxfordAbstracts/html-to-docx/commit/031c3aa963e5a7b2ee985ae8ac6ff612c89ae974))
- Added text formatting to paragraph ([bacd888](https://github.com/OxfordAbstracts/html-to-docx/commit/bacd888253a35a18ac7ea4e9141d4a4fb60e3cf7))
- Added valign to table cell element ([20e94f1](https://github.com/OxfordAbstracts/html-to-docx/commit/20e94f18370e8a92034f6d35f5e744ceb57ed774))
- Added vdom to xml method ([8b5a618](https://github.com/OxfordAbstracts/html-to-docx/commit/8b5a6185e6e211b0e07b9f1c1b7e23fb4b13dc9c))
- Added virtual-dom and html-to-vdom ([feaa396](https://github.com/OxfordAbstracts/html-to-docx/commit/feaa396162465276d19b7d3d5c51a533987a1738))
- Added xbuilder ([f13b5cc](https://github.com/OxfordAbstracts/html-to-docx/commit/f13b5cc06d29ae53493f1f4b8fdef6e8986e64e6))
- Added xml builder methods for images ([f413ad8](https://github.com/OxfordAbstracts/html-to-docx/commit/f413ad89b263c63a8fb9890b44b1b219a7413c4b))
- Added xml statement builder helper ([5e23c16](https://github.com/OxfordAbstracts/html-to-docx/commit/5e23c1636eb3c64f52589f1ac71a48dec3df65c2))
- Handle line breaks ([164c0f5](https://github.com/OxfordAbstracts/html-to-docx/commit/164c0f5e17f62e3f30da25be6e181d3414ca4dde))
- Styling table color ([2b44bff](https://github.com/OxfordAbstracts/html-to-docx/commit/2b44bff7dee0dad0de75f3c3b2403278c19e3a4b))
- template: Added numbering schema ([d179d73](https://github.com/OxfordAbstracts/html-to-docx/commit/d179d736e6e63ed42104a231ca0489430faae00a))
- template: Added styles schema ([d83d230](https://github.com/OxfordAbstracts/html-to-docx/commit/d83d230a66807f6ad08ebb4a6c0c5299c311aaf5))
- template: Added XML schemas ([42232da](https://github.com/OxfordAbstracts/html-to-docx/commit/42232da9d63ed404367703e56b1c65cdb8a23782))

### Bug Fixes

- 3 digit hex color code support ([255fe82](https://github.com/OxfordAbstracts/html-to-docx/commit/255fe82fc47e2a447c795c346ae7c6634ae442d1))
- Added attributes to anchor drawing ([62e4a29](https://github.com/OxfordAbstracts/html-to-docx/commit/62e4a29ef664257d8f0364d5d97f056a62f0fb61))
- Added colspan support for table cells ([bdf92f8](https://github.com/OxfordAbstracts/html-to-docx/commit/bdf92f8dbb10b4b58188364f3bdc5ff91e9cc982))
- Added default options ([4590800](https://github.com/OxfordAbstracts/html-to-docx/commit/459080010f92ce7464f4815585088a46ce8e759d))
- Added effectextent and srcrect fragment ([5f5e975](https://github.com/OxfordAbstracts/html-to-docx/commit/5f5e975b135eb38c48e18a09da590b363166d74e))
- Added empty paragraph for spacing after table ([6bae787](https://github.com/OxfordAbstracts/html-to-docx/commit/6bae787cbf3f376b8ec34389f444d8c7c5f3b340))
- Added extent fragment ([7ce81f2](https://github.com/OxfordAbstracts/html-to-docx/commit/7ce81f27e4c493bb9bf7d368a415f34cb0678e4c))
- Added header override in content-types xml ([5de681b](https://github.com/OxfordAbstracts/html-to-docx/commit/5de681be9295754eff648cea504e07bf9a6f6d09))
- Added html string minifier ([8faa19c](https://github.com/OxfordAbstracts/html-to-docx/commit/8faa19c46ff85a31b16e89207cbc2120c6ed5805))
- Added image conversion handler ([f726e71](https://github.com/OxfordAbstracts/html-to-docx/commit/f726e71ee2504bc254794ad09eaf5d67a8901b9a))
- Added image in table cell support ([7d98a16](https://github.com/OxfordAbstracts/html-to-docx/commit/7d98a16b1509b57910e8294cfb3985a88b7154ae))
- Added inline attributes ([0a4d2ce](https://github.com/OxfordAbstracts/html-to-docx/commit/0a4d2ce4b4c64952c3866928e6355b7c891ac044))
- Added italics, underline and bold in runproperties ([34c2e18](https://github.com/OxfordAbstracts/html-to-docx/commit/34c2e18123c8a6a956209951afebc0dce2ab6cfc))
- Added more namespaces ([68636b4](https://github.com/OxfordAbstracts/html-to-docx/commit/68636b4c7cc73bf9e0de75b7bf97ac9afb4fb6f9))
- Added namespace aliases to header and numbering xmls ([d0b4101](https://github.com/OxfordAbstracts/html-to-docx/commit/d0b4101017a6dabd0fa18e23228bd4af338129eb))
- Added numbering and styles relationship ([c7e29af](https://github.com/OxfordAbstracts/html-to-docx/commit/c7e29af7414ce71515c46861942342d4f397222b))
- Added other namespaces to the xml root ([afbbca9](https://github.com/OxfordAbstracts/html-to-docx/commit/afbbca9dbf723afc857034ce7770bc8f0840c0e4))
- Added override for relationship ([30acddc](https://github.com/OxfordAbstracts/html-to-docx/commit/30acddc84d40dc6c66ed9539618b94adeeb2fc85))
- Added override for settings and websettings ([977af04](https://github.com/OxfordAbstracts/html-to-docx/commit/977af04f48c19f2b3162cf6e61782cf63e7162e8))
- Added overrides for relationships ([22b9cac](https://github.com/OxfordAbstracts/html-to-docx/commit/22b9cac2fa788b9654262e450774c588180a18de))
- Added padding between image and wrapping text ([e45fbf5](https://github.com/OxfordAbstracts/html-to-docx/commit/e45fbf553c19071023634b692e3c4b0fab04aedf))
- Added positioning fragments ([e6f7e1c](https://github.com/OxfordAbstracts/html-to-docx/commit/e6f7e1c3679aa813a2818725548dfb5ebb0d9bd7))
- Added required attributes to anchor fragment ([d01c9f9](https://github.com/OxfordAbstracts/html-to-docx/commit/d01c9f915a929de201218af127103da627aaa4a1))
- Added settings and websettings relation ([34aeedc](https://github.com/OxfordAbstracts/html-to-docx/commit/34aeedce6d0dd02822062762f9b077bb146b09b9))
- Added settings and websettings to ooxml package ([6c829b5](https://github.com/OxfordAbstracts/html-to-docx/commit/6c829b5ec4596ba0b5d41fae9ba2bfd68fdf7230))
- Added simple positioning to anchor ([5006cc4](https://github.com/OxfordAbstracts/html-to-docx/commit/5006cc47d112360e51d8051f1ebff570e9f12779))
- Added table and cell border support ([985f6a1](https://github.com/OxfordAbstracts/html-to-docx/commit/985f6a1e7a2e52f3b0a609a00da8a11bf113ef16))
- Added table borders ([12864db](https://github.com/OxfordAbstracts/html-to-docx/commit/12864db468a08f4aca4d01cb8e8b6635aa09c57d))
- Added table cell border support ([852c091](https://github.com/OxfordAbstracts/html-to-docx/commit/852c091e15a3b2add7b622472be8fc021bb05c06))
- Added table header support ([592aa89](https://github.com/OxfordAbstracts/html-to-docx/commit/592aa893fa115a83bc1d056c98480dbe5cc872f9))
- Added table width support ([73b172b](https://github.com/OxfordAbstracts/html-to-docx/commit/73b172b584aaeb7137d58e0eb2d8b73c4bb92561))
- Added unit conversion utils ([d5b5a91](https://github.com/OxfordAbstracts/html-to-docx/commit/d5b5a915d215fb834cfe84996539ae663cc98914))
- Added unit conversions ([5890b18](https://github.com/OxfordAbstracts/html-to-docx/commit/5890b18833cc11f10c8ffc1e57d1dd9ffd46395d))
- Added unit conversions ([e6d546b](https://github.com/OxfordAbstracts/html-to-docx/commit/e6d546bca1a87182568d15bad99ac0af23ee55de))
- Added wrap elements ([c951688](https://github.com/OxfordAbstracts/html-to-docx/commit/c95168864c4929e2ab95c5a6a53d0919c76f8a83))
- Bold based on font-weight ([3f0376e](https://github.com/OxfordAbstracts/html-to-docx/commit/3f0376e0a1e267705117a2ec50c9f382286b2a60))
- Changed attribute field for picture name ([aef241d](https://github.com/OxfordAbstracts/html-to-docx/commit/aef241dc3d3d9adb732c429df9f0c2771b319680))
- Changed attribute used for name ([3885233](https://github.com/OxfordAbstracts/html-to-docx/commit/3885233bf14f9b7b16d48a2844d3e997e476a8ee))
- Changed default namespace of relationship to solve render issue ([56a3554](https://github.com/OxfordAbstracts/html-to-docx/commit/56a3554e7b2e9d85cedeece8d20acfebf23666ad))
- Changed file extension if octet stream is encountered ([32c5bf1](https://github.com/OxfordAbstracts/html-to-docx/commit/32c5bf1b5f7c5f8dc83a51fed142e932c7b008fd))
- Changed line spacing rule to work with inline images ([489f1c6](https://github.com/OxfordAbstracts/html-to-docx/commit/489f1c62fc093b108bc16aee33d74baad4ced7d8))
- Changed namespaces to original ecma 376 spec ([51be86e](https://github.com/OxfordAbstracts/html-to-docx/commit/51be86ecf0f4a78457840bf2a31579d217568208))
- Created seperate abstract numbering for each lists ([c723c74](https://github.com/OxfordAbstracts/html-to-docx/commit/c723c746a3feb2612e73dddac14f1c40864e9ad9))
- Fix table render issue due to grid width ([636d499](https://github.com/OxfordAbstracts/html-to-docx/commit/636d499bcee00195f7b5ca198c60bb3e0f7d2a69))
- Fixed abstract numbering id ([9814cb8](https://github.com/OxfordAbstracts/html-to-docx/commit/9814cb89582bc7e87cec638be37ee1cd326c6117))
- Fixed coloring and refactored other text formatting ([c288f80](https://github.com/OxfordAbstracts/html-to-docx/commit/c288f809ea6387c91356976a6dd81396cecafc46))
- Fixed document rels and numbering bug ([d6e3152](https://github.com/OxfordAbstracts/html-to-docx/commit/d6e3152081da7d2ab379a67bfda345964fa15c40))
- Fixed docx generation ([3d96acf](https://github.com/OxfordAbstracts/html-to-docx/commit/3d96acf511d82776510fac857af57d5cb9453f89))
- Fixed incorrect table row generation ([742dd18](https://github.com/OxfordAbstracts/html-to-docx/commit/742dd1882ce4c1a33ab51e10ee2a628b817eca31))
- Fixed internal mode and added extensions ([1266121](https://github.com/OxfordAbstracts/html-to-docx/commit/12661213e00c55f7068e93abb019ba80cd4f2d87))
- Fixed margin issues ([f841b76](https://github.com/OxfordAbstracts/html-to-docx/commit/f841b76caa944ea5eec206a3b3fce3e5a5eaf3e7))
- Fixed numbering and header issue due to wrong filename ([64a04bc](https://github.com/OxfordAbstracts/html-to-docx/commit/64a04bc192616162aa67c43f80734e7ebb9ff588))
- Fixed table and image rendering ([c153092](https://github.com/OxfordAbstracts/html-to-docx/commit/c1530924f93351ce63882bf0e6050b6315aa6017))
- Handled figure wrapper for images and tables ([4182a95](https://github.com/OxfordAbstracts/html-to-docx/commit/4182a9543aeb71fd8b0d2c7a2e08978a782de3e6))
- Handled horizontal alignment ([72478cb](https://github.com/OxfordAbstracts/html-to-docx/commit/72478cb2308ac029f9a8149c416012101d23c18c))
- Handled table width ([237ddfd](https://github.com/OxfordAbstracts/html-to-docx/commit/237ddfd6bff914e0379c6cbd940a7eac29d7aeaf))
- Handled vertical alignment ([b2b3bcc](https://github.com/OxfordAbstracts/html-to-docx/commit/b2b3bcc382dc645a3cdebe18d99558538bad6282))
- Handling multiple span children and multilevel formatting of text ([4c81f58](https://github.com/OxfordAbstracts/html-to-docx/commit/4c81f586400d1f227236a8b07d067331c0f02c5d))
- Handling nested formatting ([04f0d7e](https://github.com/OxfordAbstracts/html-to-docx/commit/04f0d7e822a57fc3ba98d3990e17b9153c54afc7))
- Modified example to use esm bundle ([491a83d](https://github.com/OxfordAbstracts/html-to-docx/commit/491a83d9b2c0deec13743817cdf32280d39bb9cd))
- Moved namespaces into separate file ([75cdf30](https://github.com/OxfordAbstracts/html-to-docx/commit/75cdf3033e69934b189a74d6c77eef08d50492aa))
- Namespace updated to 2016 standards ([6fc2ac2](https://github.com/OxfordAbstracts/html-to-docx/commit/6fc2ac2b6e904c4dd774b24e0ad119cccd873e0b))
- Preserve spacing on text ([f2f12b1](https://github.com/OxfordAbstracts/html-to-docx/commit/f2f12b1f4903aa7caf6bae5cad3b88d9aed46d18))
- Removed unwanted attribute ([f3caf44](https://github.com/OxfordAbstracts/html-to-docx/commit/f3caf44faf95ba8c6dee1f6f959300374e2b65ff))
- Renamed document rels schema file ([10c3fda](https://github.com/OxfordAbstracts/html-to-docx/commit/10c3fda9878847257b902d4c13c2d8dd36edd3f6))
- Renamed unit converters ([eee4487](https://github.com/OxfordAbstracts/html-to-docx/commit/eee44877cfee7228eb27b9efeb10b07a0e67ada9))
- Scaled down images ([72d7c44](https://github.com/OxfordAbstracts/html-to-docx/commit/72d7c448730a46499a1a5cab50c443a525967a54))
- Table cell border style support ([2c5a205](https://github.com/OxfordAbstracts/html-to-docx/commit/2c5a2055d33ee02f55a07e9c8ba985e2e07f2871))
- Table cell vertical align issue ([424d2c1](https://github.com/OxfordAbstracts/html-to-docx/commit/424d2c1177e1d335dbfa2b016d59cd50817e679a))
- Updated document abstraction to track generation ids ([c34810f](https://github.com/OxfordAbstracts/html-to-docx/commit/c34810f1373f934b0b3ecbe9da2838f41a68dcc9))
- Updated documentrels xml generation ([433e4b4](https://github.com/OxfordAbstracts/html-to-docx/commit/433e4b4eb9d71beede8feb1754363163ba5d1933))
- Updated numbering xml generation ([81b7a82](https://github.com/OxfordAbstracts/html-to-docx/commit/81b7a8296d1e3afa095f47007a66698852d29f95))
- Updated xml builder to use namespace and child nodes ([2e28b5e](https://github.com/OxfordAbstracts/html-to-docx/commit/2e28b5ec07241c10c4288412a6ced8023e8c03ce))
- template: Fixed document templating ([5f6a74f](https://github.com/OxfordAbstracts/html-to-docx/commit/5f6a74f9964348590fbb7f5baf88230c8c796766))
- template: Fixed numbering templating ([8b09691](https://github.com/OxfordAbstracts/html-to-docx/commit/8b096916284cbbe8452bb572d788caee23849084))
- Used image dimensions for extent fragment ([aa17f74](https://github.com/OxfordAbstracts/html-to-docx/commit/aa17f74d3a2fab51cfa730ce62c09c2862bad532))
- template: Removed word xml schema ([ee0e1ed](https://github.com/OxfordAbstracts/html-to-docx/commit/ee0e1ed7b0b00cbaf3644ad887175abac0282dcc))
- Wrapped drawing inside paragraph tag ([d0476b4](https://github.com/OxfordAbstracts/html-to-docx/commit/d0476b4211fe13f5918091a6a06e5021015a5db8))


## 2020-06-12 - [1.1.13](https://github.com/OxfordAbstracts/html-to-docx/compare/v1.1.12...v1.1.13)


## 2020-06-12 - [1.1.12](https://github.com/OxfordAbstracts/html-to-docx/compare/v1.1.11...v1.1.12)

### Bug Fixes

- Handled horizontal alignment ([72478cb](https://github.com/OxfordAbstracts/html-to-docx/commit/72478cb2308ac029f9a8149c416012101d23c18c))
- Handled vertical alignment ([b2b3bcc](https://github.com/OxfordAbstracts/html-to-docx/commit/b2b3bcc382dc645a3cdebe18d99558538bad6282))


## 2020-06-10 - [1.1.11](https://github.com/OxfordAbstracts/html-to-docx/compare/v1.1.10...v1.1.11)

### Bug Fixes

- Added table width support ([73b172b](https://github.com/OxfordAbstracts/html-to-docx/commit/73b172b584aaeb7137d58e0eb2d8b73c4bb92561))


## 2020-06-10 - [1.1.10](https://github.com/OxfordAbstracts/html-to-docx/compare/v1.1.9...v1.1.10)

### Features

- Added b tag support ([f867abd](https://github.com/OxfordAbstracts/html-to-docx/commit/f867abd41c6bc85bbba207a27c58d441f1a2b532))
- Added em tag support ([6a06265](https://github.com/OxfordAbstracts/html-to-docx/commit/6a06265f724a611b50144cb988e576bc4e40b4d4))
- Added heading sizes ([bb18e72](https://github.com/OxfordAbstracts/html-to-docx/commit/bb18e724c42b0c4581722b2899d5ff808c1495c4))
- Added headings support ([fd489ee](https://github.com/OxfordAbstracts/html-to-docx/commit/fd489eeebfeedc7d05991f9366aeae2adc49fd6f))
- Added highlight support ([6159925](https://github.com/OxfordAbstracts/html-to-docx/commit/6159925495b74ab254cd7dc5628526d531595a92))
- Added ins tag support ([6d64908](https://github.com/OxfordAbstracts/html-to-docx/commit/6d64908858dac290aa34421c236bdaf2d8ef07a7))
- Added linebreak support ([57c054c](https://github.com/OxfordAbstracts/html-to-docx/commit/57c054cd65f49d7c4244272af0117f2c141a8bc7))
- Added strike through support ([b73e8c7](https://github.com/OxfordAbstracts/html-to-docx/commit/b73e8c76d0051bc6449ed57861b4ce1c7ad4b408))
- Added support for subscript and superscript ([f1ee4ed](https://github.com/OxfordAbstracts/html-to-docx/commit/f1ee4edf183a45731b48bba2b91154da591c203f))

### Bug Fixes

- Added empty paragraph for spacing after table ([6bae787](https://github.com/OxfordAbstracts/html-to-docx/commit/6bae787cbf3f376b8ec34389f444d8c7c5f3b340))
- Added html string minifier ([8faa19c](https://github.com/OxfordAbstracts/html-to-docx/commit/8faa19c46ff85a31b16e89207cbc2120c6ed5805))
- Added image in table cell support ([7d98a16](https://github.com/OxfordAbstracts/html-to-docx/commit/7d98a16b1509b57910e8294cfb3985a88b7154ae))
- Added table and cell border support ([985f6a1](https://github.com/OxfordAbstracts/html-to-docx/commit/985f6a1e7a2e52f3b0a609a00da8a11bf113ef16))
- Added table cell border support ([852c091](https://github.com/OxfordAbstracts/html-to-docx/commit/852c091e15a3b2add7b622472be8fc021bb05c06))
- Changed line spacing rule to work with inline images ([489f1c6](https://github.com/OxfordAbstracts/html-to-docx/commit/489f1c62fc093b108bc16aee33d74baad4ced7d8))
- Preserve spacing on text ([f2f12b1](https://github.com/OxfordAbstracts/html-to-docx/commit/f2f12b1f4903aa7caf6bae5cad3b88d9aed46d18))
- Table cell border style support ([2c5a205](https://github.com/OxfordAbstracts/html-to-docx/commit/2c5a2055d33ee02f55a07e9c8ba985e2e07f2871))
- Used image dimensions for extent fragment ([aa17f74](https://github.com/OxfordAbstracts/html-to-docx/commit/aa17f74d3a2fab51cfa730ce62c09c2862bad532))


## 2020-06-08 - [1.1.9](https://github.com/OxfordAbstracts/html-to-docx/compare/v1.1.8...v1.1.9)

### Features

- Added more unit converters ([8f78c52](https://github.com/OxfordAbstracts/html-to-docx/commit/8f78c5241cf33d471c8b08e3f941f401d6a50d7b))
- Added other measure units for margins and fonts ([1ae584a](https://github.com/OxfordAbstracts/html-to-docx/commit/1ae584a1b0a5350943e10c0d129402b843d7b9a2))

### Bug Fixes

- Added colspan support for table cells ([bdf92f8](https://github.com/OxfordAbstracts/html-to-docx/commit/bdf92f8dbb10b4b58188364f3bdc5ff91e9cc982))
- Created seperate abstract numbering for each lists ([c723c74](https://github.com/OxfordAbstracts/html-to-docx/commit/c723c746a3feb2612e73dddac14f1c40864e9ad9))
- Renamed unit converters ([eee4487](https://github.com/OxfordAbstracts/html-to-docx/commit/eee44877cfee7228eb27b9efeb10b07a0e67ada9))
- Table cell vertical align issue ([424d2c1](https://github.com/OxfordAbstracts/html-to-docx/commit/424d2c1177e1d335dbfa2b016d59cd50817e679a))


## 2020-06-05 - [1.1.8](https://github.com/OxfordAbstracts/html-to-docx/compare/v1.1.7...v1.1.8)

### Features

- Added font support in styles ([18b3281](https://github.com/OxfordAbstracts/html-to-docx/commit/18b3281ac3f91e5c1905efa0487354ff78badec2))
- Added font table ([0903d6b](https://github.com/OxfordAbstracts/html-to-docx/commit/0903d6b98fae6dc378cdeafdadd80a86501c9959))

### Bug Fixes

- 3 digit hex color code support ([255fe82](https://github.com/OxfordAbstracts/html-to-docx/commit/255fe82fc47e2a447c795c346ae7c6634ae442d1))


## 2020-06-04 - [1.1.7](https://github.com/OxfordAbstracts/html-to-docx/compare/v1.1.6...v1.1.7)

### Features

- Added table row height support ([031c3aa](https://github.com/OxfordAbstracts/html-to-docx/commit/031c3aa963e5a7b2ee985ae8ac6ff612c89ae974))

### Bug Fixes

- Added table header support ([592aa89](https://github.com/OxfordAbstracts/html-to-docx/commit/592aa893fa115a83bc1d056c98480dbe5cc872f9))


## 2020-06-04 - 1.1.6

### Features

- packaging: Added jszip for packaging ([89619ec](https://github.com/OxfordAbstracts/html-to-docx/commit/89619ec702564fb9c5eccaee55e65d366fcbacad))
- packaging: Added method to create container ([9808cf2](https://github.com/OxfordAbstracts/html-to-docx/commit/9808cf211bbb50cf3d7cbe122d01c82d4272e888))
- Added xml builder methods for images ([f413ad8](https://github.com/OxfordAbstracts/html-to-docx/commit/f413ad89b263c63a8fb9890b44b1b219a7413c4b))
- template: Added base docx template ([abdb87b](https://github.com/OxfordAbstracts/html-to-docx/commit/abdb87bdfead91890f9d54e2cedd038e916b6dce))
- Abstracted conversion using docxDocument class ([c625a01](https://github.com/OxfordAbstracts/html-to-docx/commit/c625a0181a6c328c0319b579fa1173192dff1187))
- Added builder methods for images ([9e2720f](https://github.com/OxfordAbstracts/html-to-docx/commit/9e2720f261a46701c8a2581aadafa9b60e6cee6b))
- Added css color string ([cb0db2f](https://github.com/OxfordAbstracts/html-to-docx/commit/cb0db2ff2d3f2f66df823dbafbc5603030241bc3))
- Added document file render helper ([6dd9c3a](https://github.com/OxfordAbstracts/html-to-docx/commit/6dd9c3a01f5fceab78404d8ebddb848fb91c933c))
- Added escape-html ([1a231d5](https://github.com/OxfordAbstracts/html-to-docx/commit/1a231d5dde3e6f9b5a23f248e19063191c07e54f))
- Added font size support ([0f27c60](https://github.com/OxfordAbstracts/html-to-docx/commit/0f27c609baa5b9488bc195dff1c060bcc04bbf2d))
- Added header generation ([25fb44f](https://github.com/OxfordAbstracts/html-to-docx/commit/25fb44f945df3fdc5f37d619b3de3ebe68b84cd6))
- Added horizontal text alignment ([d29669f](https://github.com/OxfordAbstracts/html-to-docx/commit/d29669ffdb0d63b7bdbbe09c6bca990e4c28cfb8))
- Added hsl conversion support ([153fa43](https://github.com/OxfordAbstracts/html-to-docx/commit/153fa43f84c640085f45823bc2054b24c28023d0))
- Added hyperlinks support ([3560ce9](https://github.com/OxfordAbstracts/html-to-docx/commit/3560ce9f23fa8f590aa340302bf0059c8dfb6d5f))
- Added line height support ([3d0ea2f](https://github.com/OxfordAbstracts/html-to-docx/commit/3d0ea2fe56d13893e3c5cd0e4a35e7b26b7c1d0a))
- Added method to archive images with other files ([b6da74b](https://github.com/OxfordAbstracts/html-to-docx/commit/b6da74be10be03d689ca044f3f95dd724a3a29b6))
- Added more xml builder methods ([ffc584b](https://github.com/OxfordAbstracts/html-to-docx/commit/ffc584bed7ab434431999517a3308483ba99489a))
- Added more xml statment builder methods ([337e530](https://github.com/OxfordAbstracts/html-to-docx/commit/337e5305aa8768b6507323bec2279d557a35b67b))
- Added support for span font sizing ([98b4844](https://github.com/OxfordAbstracts/html-to-docx/commit/98b4844858f967bd5a3932262d0b535cd53d499d))
- Added text formatting to paragraph ([bacd888](https://github.com/OxfordAbstracts/html-to-docx/commit/bacd888253a35a18ac7ea4e9141d4a4fb60e3cf7))
- Added valign to table cell element ([20e94f1](https://github.com/OxfordAbstracts/html-to-docx/commit/20e94f18370e8a92034f6d35f5e744ceb57ed774))
- Added vdom to xml method ([8b5a618](https://github.com/OxfordAbstracts/html-to-docx/commit/8b5a6185e6e211b0e07b9f1c1b7e23fb4b13dc9c))
- Added virtual-dom and html-to-vdom ([feaa396](https://github.com/OxfordAbstracts/html-to-docx/commit/feaa396162465276d19b7d3d5c51a533987a1738))
- Added xbuilder ([f13b5cc](https://github.com/OxfordAbstracts/html-to-docx/commit/f13b5cc06d29ae53493f1f4b8fdef6e8986e64e6))
- Added xml statement builder helper ([5e23c16](https://github.com/OxfordAbstracts/html-to-docx/commit/5e23c1636eb3c64f52589f1ac71a48dec3df65c2))
- Enabling header on flag ([516463c](https://github.com/OxfordAbstracts/html-to-docx/commit/516463cd532e58895faa8dd465b7e725f0de59e3))
- Handle line breaks ([164c0f5](https://github.com/OxfordAbstracts/html-to-docx/commit/164c0f5e17f62e3f30da25be6e181d3414ca4dde))
- Styling table color ([2b44bff](https://github.com/OxfordAbstracts/html-to-docx/commit/2b44bff7dee0dad0de75f3c3b2403278c19e3a4b))
- template: Added numbering schema ([d179d73](https://github.com/OxfordAbstracts/html-to-docx/commit/d179d736e6e63ed42104a231ca0489430faae00a))
- template: Added styles schema ([d83d230](https://github.com/OxfordAbstracts/html-to-docx/commit/d83d230a66807f6ad08ebb4a6c0c5299c311aaf5))
- template: Added XML schemas ([42232da](https://github.com/OxfordAbstracts/html-to-docx/commit/42232da9d63ed404367703e56b1c65cdb8a23782))

### Bug Fixes

- Added attributes to anchor drawing ([62e4a29](https://github.com/OxfordAbstracts/html-to-docx/commit/62e4a29ef664257d8f0364d5d97f056a62f0fb61))
- Added default options ([4590800](https://github.com/OxfordAbstracts/html-to-docx/commit/459080010f92ce7464f4815585088a46ce8e759d))
- Added effectextent and srcrect fragment ([5f5e975](https://github.com/OxfordAbstracts/html-to-docx/commit/5f5e975b135eb38c48e18a09da590b363166d74e))
- Added extent fragment ([7ce81f2](https://github.com/OxfordAbstracts/html-to-docx/commit/7ce81f27e4c493bb9bf7d368a415f34cb0678e4c))
- Added header override in content-types xml ([5de681b](https://github.com/OxfordAbstracts/html-to-docx/commit/5de681be9295754eff648cea504e07bf9a6f6d09))
- Added image conversion handler ([f726e71](https://github.com/OxfordAbstracts/html-to-docx/commit/f726e71ee2504bc254794ad09eaf5d67a8901b9a))
- Added inline attributes ([0a4d2ce](https://github.com/OxfordAbstracts/html-to-docx/commit/0a4d2ce4b4c64952c3866928e6355b7c891ac044))
- Added italics, underline and bold in runproperties ([34c2e18](https://github.com/OxfordAbstracts/html-to-docx/commit/34c2e18123c8a6a956209951afebc0dce2ab6cfc))
- Added more namespaces ([68636b4](https://github.com/OxfordAbstracts/html-to-docx/commit/68636b4c7cc73bf9e0de75b7bf97ac9afb4fb6f9))
- Added namespace aliases to header and numbering xmls ([d0b4101](https://github.com/OxfordAbstracts/html-to-docx/commit/d0b4101017a6dabd0fa18e23228bd4af338129eb))
- Added numbering and styles relationship ([c7e29af](https://github.com/OxfordAbstracts/html-to-docx/commit/c7e29af7414ce71515c46861942342d4f397222b))
- Added other namespaces to the xml root ([afbbca9](https://github.com/OxfordAbstracts/html-to-docx/commit/afbbca9dbf723afc857034ce7770bc8f0840c0e4))
- Added override for relationship ([30acddc](https://github.com/OxfordAbstracts/html-to-docx/commit/30acddc84d40dc6c66ed9539618b94adeeb2fc85))
- Added override for settings and websettings ([977af04](https://github.com/OxfordAbstracts/html-to-docx/commit/977af04f48c19f2b3162cf6e61782cf63e7162e8))
- Added overrides for relationships ([22b9cac](https://github.com/OxfordAbstracts/html-to-docx/commit/22b9cac2fa788b9654262e450774c588180a18de))
- Added padding between image and wrapping text ([e45fbf5](https://github.com/OxfordAbstracts/html-to-docx/commit/e45fbf553c19071023634b692e3c4b0fab04aedf))
- Added positioning fragments ([e6f7e1c](https://github.com/OxfordAbstracts/html-to-docx/commit/e6f7e1c3679aa813a2818725548dfb5ebb0d9bd7))
- Added required attributes to anchor fragment ([d01c9f9](https://github.com/OxfordAbstracts/html-to-docx/commit/d01c9f915a929de201218af127103da627aaa4a1))
- Added settings and websettings relation ([34aeedc](https://github.com/OxfordAbstracts/html-to-docx/commit/34aeedce6d0dd02822062762f9b077bb146b09b9))
- Added settings and websettings to ooxml package ([6c829b5](https://github.com/OxfordAbstracts/html-to-docx/commit/6c829b5ec4596ba0b5d41fae9ba2bfd68fdf7230))
- Added simple positioning to anchor ([5006cc4](https://github.com/OxfordAbstracts/html-to-docx/commit/5006cc47d112360e51d8051f1ebff570e9f12779))
- Added table borders ([12864db](https://github.com/OxfordAbstracts/html-to-docx/commit/12864db468a08f4aca4d01cb8e8b6635aa09c57d))
- Added unit conversion utils ([d5b5a91](https://github.com/OxfordAbstracts/html-to-docx/commit/d5b5a915d215fb834cfe84996539ae663cc98914))
- Added unit conversions ([5890b18](https://github.com/OxfordAbstracts/html-to-docx/commit/5890b18833cc11f10c8ffc1e57d1dd9ffd46395d))
- Added unit conversions ([e6d546b](https://github.com/OxfordAbstracts/html-to-docx/commit/e6d546bca1a87182568d15bad99ac0af23ee55de))
- Added wrap elements ([c951688](https://github.com/OxfordAbstracts/html-to-docx/commit/c95168864c4929e2ab95c5a6a53d0919c76f8a83))
- Bold based on font-weight ([3f0376e](https://github.com/OxfordAbstracts/html-to-docx/commit/3f0376e0a1e267705117a2ec50c9f382286b2a60))
- Changed attribute field for picture name ([aef241d](https://github.com/OxfordAbstracts/html-to-docx/commit/aef241dc3d3d9adb732c429df9f0c2771b319680))
- Changed attribute used for name ([3885233](https://github.com/OxfordAbstracts/html-to-docx/commit/3885233bf14f9b7b16d48a2844d3e997e476a8ee))
- Changed default namespace of relationship to solve render issue ([56a3554](https://github.com/OxfordAbstracts/html-to-docx/commit/56a3554e7b2e9d85cedeece8d20acfebf23666ad))
- Changed file extension if octet stream is encountered ([32c5bf1](https://github.com/OxfordAbstracts/html-to-docx/commit/32c5bf1b5f7c5f8dc83a51fed142e932c7b008fd))
- Changed namespaces to original ecma 376 spec ([51be86e](https://github.com/OxfordAbstracts/html-to-docx/commit/51be86ecf0f4a78457840bf2a31579d217568208))
- Fix table render issue due to grid width ([636d499](https://github.com/OxfordAbstracts/html-to-docx/commit/636d499bcee00195f7b5ca198c60bb3e0f7d2a69))
- Fixed abstract numbering id ([9814cb8](https://github.com/OxfordAbstracts/html-to-docx/commit/9814cb89582bc7e87cec638be37ee1cd326c6117))
- Fixed coloring and refactored other text formatting ([c288f80](https://github.com/OxfordAbstracts/html-to-docx/commit/c288f809ea6387c91356976a6dd81396cecafc46))
- Fixed document rels and numbering bug ([d6e3152](https://github.com/OxfordAbstracts/html-to-docx/commit/d6e3152081da7d2ab379a67bfda345964fa15c40))
- Fixed docx generation ([3d96acf](https://github.com/OxfordAbstracts/html-to-docx/commit/3d96acf511d82776510fac857af57d5cb9453f89))
- Fixed incorrect table row generation ([742dd18](https://github.com/OxfordAbstracts/html-to-docx/commit/742dd1882ce4c1a33ab51e10ee2a628b817eca31))
- Fixed internal mode and added extensions ([1266121](https://github.com/OxfordAbstracts/html-to-docx/commit/12661213e00c55f7068e93abb019ba80cd4f2d87))
- Fixed margin issues ([f841b76](https://github.com/OxfordAbstracts/html-to-docx/commit/f841b76caa944ea5eec206a3b3fce3e5a5eaf3e7))
- Fixed numbering and header issue due to wrong filename ([64a04bc](https://github.com/OxfordAbstracts/html-to-docx/commit/64a04bc192616162aa67c43f80734e7ebb9ff588))
- Fixed table and image rendering ([c153092](https://github.com/OxfordAbstracts/html-to-docx/commit/c1530924f93351ce63882bf0e6050b6315aa6017))
- Handled figure wrapper for images and tables ([4182a95](https://github.com/OxfordAbstracts/html-to-docx/commit/4182a9543aeb71fd8b0d2c7a2e08978a782de3e6))
- Handled table width ([237ddfd](https://github.com/OxfordAbstracts/html-to-docx/commit/237ddfd6bff914e0379c6cbd940a7eac29d7aeaf))
- Handling multiple span children and multilevel formatting of text ([4c81f58](https://github.com/OxfordAbstracts/html-to-docx/commit/4c81f586400d1f227236a8b07d067331c0f02c5d))
- Handling nested formatting ([04f0d7e](https://github.com/OxfordAbstracts/html-to-docx/commit/04f0d7e822a57fc3ba98d3990e17b9153c54afc7))
- Modified example to use esm bundle ([491a83d](https://github.com/OxfordAbstracts/html-to-docx/commit/491a83d9b2c0deec13743817cdf32280d39bb9cd))
- Moved namespaces into separate file ([75cdf30](https://github.com/OxfordAbstracts/html-to-docx/commit/75cdf3033e69934b189a74d6c77eef08d50492aa))
- Namespace updated to 2016 standards ([6fc2ac2](https://github.com/OxfordAbstracts/html-to-docx/commit/6fc2ac2b6e904c4dd774b24e0ad119cccd873e0b))
- Removed unwanted attribute ([f3caf44](https://github.com/OxfordAbstracts/html-to-docx/commit/f3caf44faf95ba8c6dee1f6f959300374e2b65ff))
- Renamed document rels schema file ([10c3fda](https://github.com/OxfordAbstracts/html-to-docx/commit/10c3fda9878847257b902d4c13c2d8dd36edd3f6))
- Scaled down images ([72d7c44](https://github.com/OxfordAbstracts/html-to-docx/commit/72d7c448730a46499a1a5cab50c443a525967a54))
- Updated document abstraction to track generation ids ([c34810f](https://github.com/OxfordAbstracts/html-to-docx/commit/c34810f1373f934b0b3ecbe9da2838f41a68dcc9))
- Updated documentrels xml generation ([433e4b4](https://github.com/OxfordAbstracts/html-to-docx/commit/433e4b4eb9d71beede8feb1754363163ba5d1933))
- Updated numbering xml generation ([81b7a82](https://github.com/OxfordAbstracts/html-to-docx/commit/81b7a8296d1e3afa095f47007a66698852d29f95))
- Updated xml builder to use namespace and child nodes ([2e28b5e](https://github.com/OxfordAbstracts/html-to-docx/commit/2e28b5ec07241c10c4288412a6ced8023e8c03ce))
- template: Fixed document templating ([5f6a74f](https://github.com/OxfordAbstracts/html-to-docx/commit/5f6a74f9964348590fbb7f5baf88230c8c796766))
- template: Fixed numbering templating ([8b09691](https://github.com/OxfordAbstracts/html-to-docx/commit/8b096916284cbbe8452bb572d788caee23849084))
- Wrapped drawing inside paragraph tag ([d0476b4](https://github.com/OxfordAbstracts/html-to-docx/commit/d0476b4211fe13f5918091a6a06e5021015a5db8))
- template: Removed word xml schema ([ee0e1ed](https://github.com/OxfordAbstracts/html-to-docx/commit/ee0e1ed7b0b00cbaf3644ad887175abac0282dcc))


## 2020-06-03 - [1.1.5](https://github.com/OxfordAbstracts/html-to-docx/compare/v1.1.4...v1.1.5)


## 2020-06-03 - [1.1.4](https://github.com/OxfordAbstracts/html-to-docx/compare/v1.1.3...v1.1.4)

### Features

- Added css color string ([cb0db2f](https://github.com/OxfordAbstracts/html-to-docx/commit/cb0db2ff2d3f2f66df823dbafbc5603030241bc3))
- Added horizontal text alignment ([d29669f](https://github.com/OxfordAbstracts/html-to-docx/commit/d29669ffdb0d63b7bdbbe09c6bca990e4c28cfb8))

### Bug Fixes

- Bold based on font-weight ([3f0376e](https://github.com/OxfordAbstracts/html-to-docx/commit/3f0376e0a1e267705117a2ec50c9f382286b2a60))
- Handling nested formatting ([04f0d7e](https://github.com/OxfordAbstracts/html-to-docx/commit/04f0d7e822a57fc3ba98d3990e17b9153c54afc7))


## 2020-06-03 - 1.1.3

### Features

- packaging: Added jszip for packaging ([89619ec](https://github.com/OxfordAbstracts/html-to-docx/commit/89619ec702564fb9c5eccaee55e65d366fcbacad))
- packaging: Added method to create container ([9808cf2](https://github.com/OxfordAbstracts/html-to-docx/commit/9808cf211bbb50cf3d7cbe122d01c82d4272e888))
- Added escape-html ([1a231d5](https://github.com/OxfordAbstracts/html-to-docx/commit/1a231d5dde3e6f9b5a23f248e19063191c07e54f))
- template: Added base docx template ([abdb87b](https://github.com/OxfordAbstracts/html-to-docx/commit/abdb87bdfead91890f9d54e2cedd038e916b6dce))
- Abstracted conversion using docxDocument class ([c625a01](https://github.com/OxfordAbstracts/html-to-docx/commit/c625a0181a6c328c0319b579fa1173192dff1187))
- Added builder methods for images ([9e2720f](https://github.com/OxfordAbstracts/html-to-docx/commit/9e2720f261a46701c8a2581aadafa9b60e6cee6b))
- Added document file render helper ([6dd9c3a](https://github.com/OxfordAbstracts/html-to-docx/commit/6dd9c3a01f5fceab78404d8ebddb848fb91c933c))
- Added header generation ([25fb44f](https://github.com/OxfordAbstracts/html-to-docx/commit/25fb44f945df3fdc5f37d619b3de3ebe68b84cd6))
- Added hsl conversion support ([153fa43](https://github.com/OxfordAbstracts/html-to-docx/commit/153fa43f84c640085f45823bc2054b24c28023d0))
- template: Added styles schema ([d83d230](https://github.com/OxfordAbstracts/html-to-docx/commit/d83d230a66807f6ad08ebb4a6c0c5299c311aaf5))
- Added hyperlinks support ([3560ce9](https://github.com/OxfordAbstracts/html-to-docx/commit/3560ce9f23fa8f590aa340302bf0059c8dfb6d5f))
- Added method to archive images with other files ([b6da74b](https://github.com/OxfordAbstracts/html-to-docx/commit/b6da74be10be03d689ca044f3f95dd724a3a29b6))
- Added more xml builder methods ([ffc584b](https://github.com/OxfordAbstracts/html-to-docx/commit/ffc584bed7ab434431999517a3308483ba99489a))
- Added more xml statment builder methods ([337e530](https://github.com/OxfordAbstracts/html-to-docx/commit/337e5305aa8768b6507323bec2279d557a35b67b))
- Added text formatting to paragraph ([bacd888](https://github.com/OxfordAbstracts/html-to-docx/commit/bacd888253a35a18ac7ea4e9141d4a4fb60e3cf7))
- Added valign to table cell element ([20e94f1](https://github.com/OxfordAbstracts/html-to-docx/commit/20e94f18370e8a92034f6d35f5e744ceb57ed774))
- Added vdom to xml method ([8b5a618](https://github.com/OxfordAbstracts/html-to-docx/commit/8b5a6185e6e211b0e07b9f1c1b7e23fb4b13dc9c))
- Added virtual-dom and html-to-vdom ([feaa396](https://github.com/OxfordAbstracts/html-to-docx/commit/feaa396162465276d19b7d3d5c51a533987a1738))
- Added xbuilder ([f13b5cc](https://github.com/OxfordAbstracts/html-to-docx/commit/f13b5cc06d29ae53493f1f4b8fdef6e8986e64e6))
- Added xml builder methods for images ([f413ad8](https://github.com/OxfordAbstracts/html-to-docx/commit/f413ad89b263c63a8fb9890b44b1b219a7413c4b))
- Added xml statement builder helper ([5e23c16](https://github.com/OxfordAbstracts/html-to-docx/commit/5e23c1636eb3c64f52589f1ac71a48dec3df65c2))
- Enabling header on flag ([516463c](https://github.com/OxfordAbstracts/html-to-docx/commit/516463cd532e58895faa8dd465b7e725f0de59e3))
- Handle line breaks ([164c0f5](https://github.com/OxfordAbstracts/html-to-docx/commit/164c0f5e17f62e3f30da25be6e181d3414ca4dde))
- Styling table color ([2b44bff](https://github.com/OxfordAbstracts/html-to-docx/commit/2b44bff7dee0dad0de75f3c3b2403278c19e3a4b))
- template: Added numbering schema ([d179d73](https://github.com/OxfordAbstracts/html-to-docx/commit/d179d736e6e63ed42104a231ca0489430faae00a))
- template: Added XML schemas ([42232da](https://github.com/OxfordAbstracts/html-to-docx/commit/42232da9d63ed404367703e56b1c65cdb8a23782))

### Bug Fixes

- Added attributes to anchor drawing ([62e4a29](https://github.com/OxfordAbstracts/html-to-docx/commit/62e4a29ef664257d8f0364d5d97f056a62f0fb61))
- Added default options ([4590800](https://github.com/OxfordAbstracts/html-to-docx/commit/459080010f92ce7464f4815585088a46ce8e759d))
- Added effectextent and srcrect fragment ([5f5e975](https://github.com/OxfordAbstracts/html-to-docx/commit/5f5e975b135eb38c48e18a09da590b363166d74e))
- Added extent fragment ([7ce81f2](https://github.com/OxfordAbstracts/html-to-docx/commit/7ce81f27e4c493bb9bf7d368a415f34cb0678e4c))
- Added header override in content-types xml ([5de681b](https://github.com/OxfordAbstracts/html-to-docx/commit/5de681be9295754eff648cea504e07bf9a6f6d09))
- Added image conversion handler ([f726e71](https://github.com/OxfordAbstracts/html-to-docx/commit/f726e71ee2504bc254794ad09eaf5d67a8901b9a))
- Added inline attributes ([0a4d2ce](https://github.com/OxfordAbstracts/html-to-docx/commit/0a4d2ce4b4c64952c3866928e6355b7c891ac044))
- Added italics, underline and bold in runproperties ([34c2e18](https://github.com/OxfordAbstracts/html-to-docx/commit/34c2e18123c8a6a956209951afebc0dce2ab6cfc))
- Added more namespaces ([68636b4](https://github.com/OxfordAbstracts/html-to-docx/commit/68636b4c7cc73bf9e0de75b7bf97ac9afb4fb6f9))
- Added namespace aliases to header and numbering xmls ([d0b4101](https://github.com/OxfordAbstracts/html-to-docx/commit/d0b4101017a6dabd0fa18e23228bd4af338129eb))
- Added numbering and styles relationship ([c7e29af](https://github.com/OxfordAbstracts/html-to-docx/commit/c7e29af7414ce71515c46861942342d4f397222b))
- Added other namespaces to the xml root ([afbbca9](https://github.com/OxfordAbstracts/html-to-docx/commit/afbbca9dbf723afc857034ce7770bc8f0840c0e4))
- Added override for relationship ([30acddc](https://github.com/OxfordAbstracts/html-to-docx/commit/30acddc84d40dc6c66ed9539618b94adeeb2fc85))
- Added override for settings and websettings ([977af04](https://github.com/OxfordAbstracts/html-to-docx/commit/977af04f48c19f2b3162cf6e61782cf63e7162e8))
- Added overrides for relationships ([22b9cac](https://github.com/OxfordAbstracts/html-to-docx/commit/22b9cac2fa788b9654262e450774c588180a18de))
- Added padding between image and wrapping text ([e45fbf5](https://github.com/OxfordAbstracts/html-to-docx/commit/e45fbf553c19071023634b692e3c4b0fab04aedf))
- Added positioning fragments ([e6f7e1c](https://github.com/OxfordAbstracts/html-to-docx/commit/e6f7e1c3679aa813a2818725548dfb5ebb0d9bd7))
- Added required attributes to anchor fragment ([d01c9f9](https://github.com/OxfordAbstracts/html-to-docx/commit/d01c9f915a929de201218af127103da627aaa4a1))
- Changed namespaces to original ecma 376 spec ([51be86e](https://github.com/OxfordAbstracts/html-to-docx/commit/51be86ecf0f4a78457840bf2a31579d217568208))
- template: Removed word xml schema ([ee0e1ed](https://github.com/OxfordAbstracts/html-to-docx/commit/ee0e1ed7b0b00cbaf3644ad887175abac0282dcc))
- Added settings and websettings relation ([34aeedc](https://github.com/OxfordAbstracts/html-to-docx/commit/34aeedce6d0dd02822062762f9b077bb146b09b9))
- Added settings and websettings to ooxml package ([6c829b5](https://github.com/OxfordAbstracts/html-to-docx/commit/6c829b5ec4596ba0b5d41fae9ba2bfd68fdf7230))
- Added simple positioning to anchor ([5006cc4](https://github.com/OxfordAbstracts/html-to-docx/commit/5006cc47d112360e51d8051f1ebff570e9f12779))
- Added table borders ([12864db](https://github.com/OxfordAbstracts/html-to-docx/commit/12864db468a08f4aca4d01cb8e8b6635aa09c57d))
- Added unit conversion utils ([d5b5a91](https://github.com/OxfordAbstracts/html-to-docx/commit/d5b5a915d215fb834cfe84996539ae663cc98914))
- Added wrap elements ([c951688](https://github.com/OxfordAbstracts/html-to-docx/commit/c95168864c4929e2ab95c5a6a53d0919c76f8a83))
- Changed attribute field for picture name ([aef241d](https://github.com/OxfordAbstracts/html-to-docx/commit/aef241dc3d3d9adb732c429df9f0c2771b319680))
- Changed attribute used for name ([3885233](https://github.com/OxfordAbstracts/html-to-docx/commit/3885233bf14f9b7b16d48a2844d3e997e476a8ee))
- Changed default namespace of relationship to solve render issue ([56a3554](https://github.com/OxfordAbstracts/html-to-docx/commit/56a3554e7b2e9d85cedeece8d20acfebf23666ad))
- Changed file extension if octet stream is encountered ([32c5bf1](https://github.com/OxfordAbstracts/html-to-docx/commit/32c5bf1b5f7c5f8dc83a51fed142e932c7b008fd))
- Fix table render issue due to grid width ([636d499](https://github.com/OxfordAbstracts/html-to-docx/commit/636d499bcee00195f7b5ca198c60bb3e0f7d2a69))
- Fixed abstract numbering id ([9814cb8](https://github.com/OxfordAbstracts/html-to-docx/commit/9814cb89582bc7e87cec638be37ee1cd326c6117))
- Fixed coloring and refactored other text formatting ([c288f80](https://github.com/OxfordAbstracts/html-to-docx/commit/c288f809ea6387c91356976a6dd81396cecafc46))
- Fixed document rels and numbering bug ([d6e3152](https://github.com/OxfordAbstracts/html-to-docx/commit/d6e3152081da7d2ab379a67bfda345964fa15c40))
- Fixed docx generation ([3d96acf](https://github.com/OxfordAbstracts/html-to-docx/commit/3d96acf511d82776510fac857af57d5cb9453f89))
- Fixed incorrect table row generation ([742dd18](https://github.com/OxfordAbstracts/html-to-docx/commit/742dd1882ce4c1a33ab51e10ee2a628b817eca31))
- Fixed internal mode and added extensions ([1266121](https://github.com/OxfordAbstracts/html-to-docx/commit/12661213e00c55f7068e93abb019ba80cd4f2d87))
- Fixed margin issues ([f841b76](https://github.com/OxfordAbstracts/html-to-docx/commit/f841b76caa944ea5eec206a3b3fce3e5a5eaf3e7))
- Fixed numbering and header issue due to wrong filename ([64a04bc](https://github.com/OxfordAbstracts/html-to-docx/commit/64a04bc192616162aa67c43f80734e7ebb9ff588))
- Fixed table and image rendering ([c153092](https://github.com/OxfordAbstracts/html-to-docx/commit/c1530924f93351ce63882bf0e6050b6315aa6017))
- Handled figure wrapper for images and tables ([4182a95](https://github.com/OxfordAbstracts/html-to-docx/commit/4182a9543aeb71fd8b0d2c7a2e08978a782de3e6))
- Handled table width ([237ddfd](https://github.com/OxfordAbstracts/html-to-docx/commit/237ddfd6bff914e0379c6cbd940a7eac29d7aeaf))
- Handling multiple span children and multilevel formatting of text ([4c81f58](https://github.com/OxfordAbstracts/html-to-docx/commit/4c81f586400d1f227236a8b07d067331c0f02c5d))
- Modified example to use esm bundle ([491a83d](https://github.com/OxfordAbstracts/html-to-docx/commit/491a83d9b2c0deec13743817cdf32280d39bb9cd))
- Moved namespaces into separate file ([75cdf30](https://github.com/OxfordAbstracts/html-to-docx/commit/75cdf3033e69934b189a74d6c77eef08d50492aa))
- Namespace updated to 2016 standards ([6fc2ac2](https://github.com/OxfordAbstracts/html-to-docx/commit/6fc2ac2b6e904c4dd774b24e0ad119cccd873e0b))
- Removed unwanted attribute ([f3caf44](https://github.com/OxfordAbstracts/html-to-docx/commit/f3caf44faf95ba8c6dee1f6f959300374e2b65ff))
- Renamed document rels schema file ([10c3fda](https://github.com/OxfordAbstracts/html-to-docx/commit/10c3fda9878847257b902d4c13c2d8dd36edd3f6))
- Scaled down images ([72d7c44](https://github.com/OxfordAbstracts/html-to-docx/commit/72d7c448730a46499a1a5cab50c443a525967a54))
- Updated document abstraction to track generation ids ([c34810f](https://github.com/OxfordAbstracts/html-to-docx/commit/c34810f1373f934b0b3ecbe9da2838f41a68dcc9))
- Updated documentrels xml generation ([433e4b4](https://github.com/OxfordAbstracts/html-to-docx/commit/433e4b4eb9d71beede8feb1754363163ba5d1933))
- Updated numbering xml generation ([81b7a82](https://github.com/OxfordAbstracts/html-to-docx/commit/81b7a8296d1e3afa095f47007a66698852d29f95))
- Updated xml builder to use namespace and child nodes ([2e28b5e](https://github.com/OxfordAbstracts/html-to-docx/commit/2e28b5ec07241c10c4288412a6ced8023e8c03ce))
- template: Fixed document templating ([5f6a74f](https://github.com/OxfordAbstracts/html-to-docx/commit/5f6a74f9964348590fbb7f5baf88230c8c796766))
- template: Fixed numbering templating ([8b09691](https://github.com/OxfordAbstracts/html-to-docx/commit/8b096916284cbbe8452bb572d788caee23849084))
- Wrapped drawing inside paragraph tag ([d0476b4](https://github.com/OxfordAbstracts/html-to-docx/commit/d0476b4211fe13f5918091a6a06e5021015a5db8))


## 2020-05-29 - 1.1.2

### Features

- packaging: Added jszip for packaging ([89619ec](https://github.com/OxfordAbstracts/html-to-docx/commit/89619ec702564fb9c5eccaee55e65d366fcbacad))
- packaging: Added method to create container ([9808cf2](https://github.com/OxfordAbstracts/html-to-docx/commit/9808cf211bbb50cf3d7cbe122d01c82d4272e888))
- Abstracted conversion using docxDocument class ([c625a01](https://github.com/OxfordAbstracts/html-to-docx/commit/c625a0181a6c328c0319b579fa1173192dff1187))
- template: Added base docx template ([abdb87b](https://github.com/OxfordAbstracts/html-to-docx/commit/abdb87bdfead91890f9d54e2cedd038e916b6dce))
- Added builder methods for images ([9e2720f](https://github.com/OxfordAbstracts/html-to-docx/commit/9e2720f261a46701c8a2581aadafa9b60e6cee6b))
- Added document file render helper ([6dd9c3a](https://github.com/OxfordAbstracts/html-to-docx/commit/6dd9c3a01f5fceab78404d8ebddb848fb91c933c))
- Added escape-html ([1a231d5](https://github.com/OxfordAbstracts/html-to-docx/commit/1a231d5dde3e6f9b5a23f248e19063191c07e54f))
- Added header generation ([25fb44f](https://github.com/OxfordAbstracts/html-to-docx/commit/25fb44f945df3fdc5f37d619b3de3ebe68b84cd6))
- Added hyperlinks support ([3560ce9](https://github.com/OxfordAbstracts/html-to-docx/commit/3560ce9f23fa8f590aa340302bf0059c8dfb6d5f))
- Added method to archive images with other files ([b6da74b](https://github.com/OxfordAbstracts/html-to-docx/commit/b6da74be10be03d689ca044f3f95dd724a3a29b6))
- Added more xml builder methods ([ffc584b](https://github.com/OxfordAbstracts/html-to-docx/commit/ffc584bed7ab434431999517a3308483ba99489a))
- Added more xml statment builder methods ([337e530](https://github.com/OxfordAbstracts/html-to-docx/commit/337e5305aa8768b6507323bec2279d557a35b67b))
- Added text formatting to paragraph ([bacd888](https://github.com/OxfordAbstracts/html-to-docx/commit/bacd888253a35a18ac7ea4e9141d4a4fb60e3cf7))
- Added vdom to xml method ([8b5a618](https://github.com/OxfordAbstracts/html-to-docx/commit/8b5a6185e6e211b0e07b9f1c1b7e23fb4b13dc9c))
- Added virtual-dom and html-to-vdom ([feaa396](https://github.com/OxfordAbstracts/html-to-docx/commit/feaa396162465276d19b7d3d5c51a533987a1738))
- Added xbuilder ([f13b5cc](https://github.com/OxfordAbstracts/html-to-docx/commit/f13b5cc06d29ae53493f1f4b8fdef6e8986e64e6))
- Added xml builder methods for images ([f413ad8](https://github.com/OxfordAbstracts/html-to-docx/commit/f413ad89b263c63a8fb9890b44b1b219a7413c4b))
- Added xml statement builder helper ([5e23c16](https://github.com/OxfordAbstracts/html-to-docx/commit/5e23c1636eb3c64f52589f1ac71a48dec3df65c2))
- Enabling header on flag ([516463c](https://github.com/OxfordAbstracts/html-to-docx/commit/516463cd532e58895faa8dd465b7e725f0de59e3))
- Handle line breaks ([164c0f5](https://github.com/OxfordAbstracts/html-to-docx/commit/164c0f5e17f62e3f30da25be6e181d3414ca4dde))
- template: Added numbering schema ([d179d73](https://github.com/OxfordAbstracts/html-to-docx/commit/d179d736e6e63ed42104a231ca0489430faae00a))
- template: Added styles schema ([d83d230](https://github.com/OxfordAbstracts/html-to-docx/commit/d83d230a66807f6ad08ebb4a6c0c5299c311aaf5))
- template: Added XML schemas ([42232da](https://github.com/OxfordAbstracts/html-to-docx/commit/42232da9d63ed404367703e56b1c65cdb8a23782))

### Bug Fixes

- Added attributes to anchor drawing ([62e4a29](https://github.com/OxfordAbstracts/html-to-docx/commit/62e4a29ef664257d8f0364d5d97f056a62f0fb61))
- Added default options ([4590800](https://github.com/OxfordAbstracts/html-to-docx/commit/459080010f92ce7464f4815585088a46ce8e759d))
- Added effectextent and srcrect fragment ([5f5e975](https://github.com/OxfordAbstracts/html-to-docx/commit/5f5e975b135eb38c48e18a09da590b363166d74e))
- Added extent fragment ([7ce81f2](https://github.com/OxfordAbstracts/html-to-docx/commit/7ce81f27e4c493bb9bf7d368a415f34cb0678e4c))
- Added header override in content-types xml ([5de681b](https://github.com/OxfordAbstracts/html-to-docx/commit/5de681be9295754eff648cea504e07bf9a6f6d09))
- Added image conversion handler ([f726e71](https://github.com/OxfordAbstracts/html-to-docx/commit/f726e71ee2504bc254794ad09eaf5d67a8901b9a))
- Added inline attributes ([0a4d2ce](https://github.com/OxfordAbstracts/html-to-docx/commit/0a4d2ce4b4c64952c3866928e6355b7c891ac044))
- Added italics, underline and bold in runproperties ([34c2e18](https://github.com/OxfordAbstracts/html-to-docx/commit/34c2e18123c8a6a956209951afebc0dce2ab6cfc))
- Added more namespaces ([68636b4](https://github.com/OxfordAbstracts/html-to-docx/commit/68636b4c7cc73bf9e0de75b7bf97ac9afb4fb6f9))
- Added namespace aliases to header and numbering xmls ([d0b4101](https://github.com/OxfordAbstracts/html-to-docx/commit/d0b4101017a6dabd0fa18e23228bd4af338129eb))
- Added numbering and styles relationship ([c7e29af](https://github.com/OxfordAbstracts/html-to-docx/commit/c7e29af7414ce71515c46861942342d4f397222b))
- Added other namespaces to the xml root ([afbbca9](https://github.com/OxfordAbstracts/html-to-docx/commit/afbbca9dbf723afc857034ce7770bc8f0840c0e4))
- Added override for relationship ([30acddc](https://github.com/OxfordAbstracts/html-to-docx/commit/30acddc84d40dc6c66ed9539618b94adeeb2fc85))
- Added override for settings and websettings ([977af04](https://github.com/OxfordAbstracts/html-to-docx/commit/977af04f48c19f2b3162cf6e61782cf63e7162e8))
- Added overrides for relationships ([22b9cac](https://github.com/OxfordAbstracts/html-to-docx/commit/22b9cac2fa788b9654262e450774c588180a18de))
- Added padding between image and wrapping text ([e45fbf5](https://github.com/OxfordAbstracts/html-to-docx/commit/e45fbf553c19071023634b692e3c4b0fab04aedf))
- Added positioning fragments ([e6f7e1c](https://github.com/OxfordAbstracts/html-to-docx/commit/e6f7e1c3679aa813a2818725548dfb5ebb0d9bd7))
- Added required attributes to anchor fragment ([d01c9f9](https://github.com/OxfordAbstracts/html-to-docx/commit/d01c9f915a929de201218af127103da627aaa4a1))
- Added settings and websettings relation ([34aeedc](https://github.com/OxfordAbstracts/html-to-docx/commit/34aeedce6d0dd02822062762f9b077bb146b09b9))
- Added settings and websettings to ooxml package ([6c829b5](https://github.com/OxfordAbstracts/html-to-docx/commit/6c829b5ec4596ba0b5d41fae9ba2bfd68fdf7230))
- Added simple positioning to anchor ([5006cc4](https://github.com/OxfordAbstracts/html-to-docx/commit/5006cc47d112360e51d8051f1ebff570e9f12779))
- Added table borders ([12864db](https://github.com/OxfordAbstracts/html-to-docx/commit/12864db468a08f4aca4d01cb8e8b6635aa09c57d))
- Added wrap elements ([c951688](https://github.com/OxfordAbstracts/html-to-docx/commit/c95168864c4929e2ab95c5a6a53d0919c76f8a83))
- Changed attribute field for picture name ([aef241d](https://github.com/OxfordAbstracts/html-to-docx/commit/aef241dc3d3d9adb732c429df9f0c2771b319680))
- Changed attribute used for name ([3885233](https://github.com/OxfordAbstracts/html-to-docx/commit/3885233bf14f9b7b16d48a2844d3e997e476a8ee))
- Changed default namespace of relationship to solve render issue ([56a3554](https://github.com/OxfordAbstracts/html-to-docx/commit/56a3554e7b2e9d85cedeece8d20acfebf23666ad))
- Changed file extension if octet stream is encountered ([32c5bf1](https://github.com/OxfordAbstracts/html-to-docx/commit/32c5bf1b5f7c5f8dc83a51fed142e932c7b008fd))
- Changed namespaces to original ecma 376 spec ([51be86e](https://github.com/OxfordAbstracts/html-to-docx/commit/51be86ecf0f4a78457840bf2a31579d217568208))
- Fix table render issue due to grid width ([636d499](https://github.com/OxfordAbstracts/html-to-docx/commit/636d499bcee00195f7b5ca198c60bb3e0f7d2a69))
- Fixed abstract numbering id ([9814cb8](https://github.com/OxfordAbstracts/html-to-docx/commit/9814cb89582bc7e87cec638be37ee1cd326c6117))
- Fixed coloring and refactored other text formatting ([c288f80](https://github.com/OxfordAbstracts/html-to-docx/commit/c288f809ea6387c91356976a6dd81396cecafc46))
- Fixed document rels and numbering bug ([d6e3152](https://github.com/OxfordAbstracts/html-to-docx/commit/d6e3152081da7d2ab379a67bfda345964fa15c40))
- Fixed docx generation ([3d96acf](https://github.com/OxfordAbstracts/html-to-docx/commit/3d96acf511d82776510fac857af57d5cb9453f89))
- Fixed incorrect table row generation ([742dd18](https://github.com/OxfordAbstracts/html-to-docx/commit/742dd1882ce4c1a33ab51e10ee2a628b817eca31))
- Fixed internal mode and added extensions ([1266121](https://github.com/OxfordAbstracts/html-to-docx/commit/12661213e00c55f7068e93abb019ba80cd4f2d87))
- Fixed margin issues ([f841b76](https://github.com/OxfordAbstracts/html-to-docx/commit/f841b76caa944ea5eec206a3b3fce3e5a5eaf3e7))
- Fixed numbering and header issue due to wrong filename ([64a04bc](https://github.com/OxfordAbstracts/html-to-docx/commit/64a04bc192616162aa67c43f80734e7ebb9ff588))
- Fixed table and image rendering ([c153092](https://github.com/OxfordAbstracts/html-to-docx/commit/c1530924f93351ce63882bf0e6050b6315aa6017))
- Handled figure wrapper for images and tables ([4182a95](https://github.com/OxfordAbstracts/html-to-docx/commit/4182a9543aeb71fd8b0d2c7a2e08978a782de3e6))
- Handled table width ([237ddfd](https://github.com/OxfordAbstracts/html-to-docx/commit/237ddfd6bff914e0379c6cbd940a7eac29d7aeaf))
- Handling multiple span children and multilevel formatting of text ([4c81f58](https://github.com/OxfordAbstracts/html-to-docx/commit/4c81f586400d1f227236a8b07d067331c0f02c5d))
- Modified example to use esm bundle ([491a83d](https://github.com/OxfordAbstracts/html-to-docx/commit/491a83d9b2c0deec13743817cdf32280d39bb9cd))
- Moved namespaces into separate file ([75cdf30](https://github.com/OxfordAbstracts/html-to-docx/commit/75cdf3033e69934b189a74d6c77eef08d50492aa))
- Namespace updated to 2016 standards ([6fc2ac2](https://github.com/OxfordAbstracts/html-to-docx/commit/6fc2ac2b6e904c4dd774b24e0ad119cccd873e0b))
- template: Fixed document templating ([5f6a74f](https://github.com/OxfordAbstracts/html-to-docx/commit/5f6a74f9964348590fbb7f5baf88230c8c796766))
- template: Fixed numbering templating ([8b09691](https://github.com/OxfordAbstracts/html-to-docx/commit/8b096916284cbbe8452bb572d788caee23849084))
- template: Removed word xml schema ([ee0e1ed](https://github.com/OxfordAbstracts/html-to-docx/commit/ee0e1ed7b0b00cbaf3644ad887175abac0282dcc))
- Removed unwanted attribute ([f3caf44](https://github.com/OxfordAbstracts/html-to-docx/commit/f3caf44faf95ba8c6dee1f6f959300374e2b65ff))
- Renamed document rels schema file ([10c3fda](https://github.com/OxfordAbstracts/html-to-docx/commit/10c3fda9878847257b902d4c13c2d8dd36edd3f6))
- Updated document abstraction to track generation ids ([c34810f](https://github.com/OxfordAbstracts/html-to-docx/commit/c34810f1373f934b0b3ecbe9da2838f41a68dcc9))
- Updated documentrels xml generation ([433e4b4](https://github.com/OxfordAbstracts/html-to-docx/commit/433e4b4eb9d71beede8feb1754363163ba5d1933))
- Updated numbering xml generation ([81b7a82](https://github.com/OxfordAbstracts/html-to-docx/commit/81b7a8296d1e3afa095f47007a66698852d29f95))
- Updated xml builder to use namespace and child nodes ([2e28b5e](https://github.com/OxfordAbstracts/html-to-docx/commit/2e28b5ec07241c10c4288412a6ced8023e8c03ce))
- Wrapped drawing inside paragraph tag ([d0476b4](https://github.com/OxfordAbstracts/html-to-docx/commit/d0476b4211fe13f5918091a6a06e5021015a5db8))


## 2020-05-28 - [1.1.1](https://github.com/OxfordAbstracts/html-to-docx/compare/v1.1.0...v1.1.1)

### Bug Fixes

- Modified example to use esm bundle ([dcd7f4b](https://github.com/OxfordAbstracts/html-to-docx/commit/dcd7f4b7705b806697dfe92f060641030ee42cfa))


## 2020-05-28 - 1.1.0

### Features

- packaging: Added jszip for packaging ([89619ec](https://github.com/OxfordAbstracts/html-to-docx/commit/89619ec702564fb9c5eccaee55e65d366fcbacad))
- packaging: Added method to create container ([9808cf2](https://github.com/OxfordAbstracts/html-to-docx/commit/9808cf211bbb50cf3d7cbe122d01c82d4272e888))
- template: Added base docx template ([abdb87b](https://github.com/OxfordAbstracts/html-to-docx/commit/abdb87bdfead91890f9d54e2cedd038e916b6dce))
- template: Added numbering schema ([d179d73](https://github.com/OxfordAbstracts/html-to-docx/commit/d179d736e6e63ed42104a231ca0489430faae00a))
- template: Added styles schema ([d83d230](https://github.com/OxfordAbstracts/html-to-docx/commit/d83d230a66807f6ad08ebb4a6c0c5299c311aaf5))
- Abstracted conversion using docxDocument class ([c625a01](https://github.com/OxfordAbstracts/html-to-docx/commit/c625a0181a6c328c0319b579fa1173192dff1187))
- Added builder methods for images ([9e2720f](https://github.com/OxfordAbstracts/html-to-docx/commit/9e2720f261a46701c8a2581aadafa9b60e6cee6b))
- Added document file render helper ([6dd9c3a](https://github.com/OxfordAbstracts/html-to-docx/commit/6dd9c3a01f5fceab78404d8ebddb848fb91c933c))
- Added escape-html ([1a231d5](https://github.com/OxfordAbstracts/html-to-docx/commit/1a231d5dde3e6f9b5a23f248e19063191c07e54f))
- Added header generation ([25fb44f](https://github.com/OxfordAbstracts/html-to-docx/commit/25fb44f945df3fdc5f37d619b3de3ebe68b84cd6))
- Added hyperlinks support ([3560ce9](https://github.com/OxfordAbstracts/html-to-docx/commit/3560ce9f23fa8f590aa340302bf0059c8dfb6d5f))
- Added method to archive images with other files ([b6da74b](https://github.com/OxfordAbstracts/html-to-docx/commit/b6da74be10be03d689ca044f3f95dd724a3a29b6))
- Added more xml builder methods ([ffc584b](https://github.com/OxfordAbstracts/html-to-docx/commit/ffc584bed7ab434431999517a3308483ba99489a))
- Added more xml statment builder methods ([337e530](https://github.com/OxfordAbstracts/html-to-docx/commit/337e5305aa8768b6507323bec2279d557a35b67b))
- Added text formatting to paragraph ([bacd888](https://github.com/OxfordAbstracts/html-to-docx/commit/bacd888253a35a18ac7ea4e9141d4a4fb60e3cf7))
- Added vdom to xml method ([8b5a618](https://github.com/OxfordAbstracts/html-to-docx/commit/8b5a6185e6e211b0e07b9f1c1b7e23fb4b13dc9c))
- Added virtual-dom and html-to-vdom ([feaa396](https://github.com/OxfordAbstracts/html-to-docx/commit/feaa396162465276d19b7d3d5c51a533987a1738))
- Added xbuilder ([f13b5cc](https://github.com/OxfordAbstracts/html-to-docx/commit/f13b5cc06d29ae53493f1f4b8fdef6e8986e64e6))
- Added xml builder methods for images ([f413ad8](https://github.com/OxfordAbstracts/html-to-docx/commit/f413ad89b263c63a8fb9890b44b1b219a7413c4b))
- Added xml statement builder helper ([5e23c16](https://github.com/OxfordAbstracts/html-to-docx/commit/5e23c1636eb3c64f52589f1ac71a48dec3df65c2))
- Handle line breaks ([164c0f5](https://github.com/OxfordAbstracts/html-to-docx/commit/164c0f5e17f62e3f30da25be6e181d3414ca4dde))
- template: Added XML schemas ([42232da](https://github.com/OxfordAbstracts/html-to-docx/commit/42232da9d63ed404367703e56b1c65cdb8a23782))

### Bug Fixes

- Added attributes to anchor drawing ([62e4a29](https://github.com/OxfordAbstracts/html-to-docx/commit/62e4a29ef664257d8f0364d5d97f056a62f0fb61))
- Added effectextent and srcrect fragment ([5f5e975](https://github.com/OxfordAbstracts/html-to-docx/commit/5f5e975b135eb38c48e18a09da590b363166d74e))
- Added extent fragment ([7ce81f2](https://github.com/OxfordAbstracts/html-to-docx/commit/7ce81f27e4c493bb9bf7d368a415f34cb0678e4c))
- Added header override in content-types xml ([5de681b](https://github.com/OxfordAbstracts/html-to-docx/commit/5de681be9295754eff648cea504e07bf9a6f6d09))
- Added image conversion handler ([f726e71](https://github.com/OxfordAbstracts/html-to-docx/commit/f726e71ee2504bc254794ad09eaf5d67a8901b9a))
- Added inline attributes ([0a4d2ce](https://github.com/OxfordAbstracts/html-to-docx/commit/0a4d2ce4b4c64952c3866928e6355b7c891ac044))
- Added italics, underline and bold in runproperties ([34c2e18](https://github.com/OxfordAbstracts/html-to-docx/commit/34c2e18123c8a6a956209951afebc0dce2ab6cfc))
- Added more namespaces ([68636b4](https://github.com/OxfordAbstracts/html-to-docx/commit/68636b4c7cc73bf9e0de75b7bf97ac9afb4fb6f9))
- Added namespace aliases to header and numbering xmls ([d0b4101](https://github.com/OxfordAbstracts/html-to-docx/commit/d0b4101017a6dabd0fa18e23228bd4af338129eb))
- Added numbering and styles relationship ([c7e29af](https://github.com/OxfordAbstracts/html-to-docx/commit/c7e29af7414ce71515c46861942342d4f397222b))
- Added other namespaces to the xml root ([afbbca9](https://github.com/OxfordAbstracts/html-to-docx/commit/afbbca9dbf723afc857034ce7770bc8f0840c0e4))
- Added override for relationship ([30acddc](https://github.com/OxfordAbstracts/html-to-docx/commit/30acddc84d40dc6c66ed9539618b94adeeb2fc85))
- Added override for settings and websettings ([977af04](https://github.com/OxfordAbstracts/html-to-docx/commit/977af04f48c19f2b3162cf6e61782cf63e7162e8))
- Added overrides for relationships ([22b9cac](https://github.com/OxfordAbstracts/html-to-docx/commit/22b9cac2fa788b9654262e450774c588180a18de))
- Added padding between image and wrapping text ([e45fbf5](https://github.com/OxfordAbstracts/html-to-docx/commit/e45fbf553c19071023634b692e3c4b0fab04aedf))
- Added positioning fragments ([e6f7e1c](https://github.com/OxfordAbstracts/html-to-docx/commit/e6f7e1c3679aa813a2818725548dfb5ebb0d9bd7))
- Added required attributes to anchor fragment ([d01c9f9](https://github.com/OxfordAbstracts/html-to-docx/commit/d01c9f915a929de201218af127103da627aaa4a1))
- Added settings and websettings relation ([34aeedc](https://github.com/OxfordAbstracts/html-to-docx/commit/34aeedce6d0dd02822062762f9b077bb146b09b9))
- Added settings and websettings to ooxml package ([6c829b5](https://github.com/OxfordAbstracts/html-to-docx/commit/6c829b5ec4596ba0b5d41fae9ba2bfd68fdf7230))
- Added simple positioning to anchor ([5006cc4](https://github.com/OxfordAbstracts/html-to-docx/commit/5006cc47d112360e51d8051f1ebff570e9f12779))
- Added table borders ([12864db](https://github.com/OxfordAbstracts/html-to-docx/commit/12864db468a08f4aca4d01cb8e8b6635aa09c57d))
- Added wrap elements ([c951688](https://github.com/OxfordAbstracts/html-to-docx/commit/c95168864c4929e2ab95c5a6a53d0919c76f8a83))
- Changed attribute field for picture name ([aef241d](https://github.com/OxfordAbstracts/html-to-docx/commit/aef241dc3d3d9adb732c429df9f0c2771b319680))
- Changed attribute used for name ([3885233](https://github.com/OxfordAbstracts/html-to-docx/commit/3885233bf14f9b7b16d48a2844d3e997e476a8ee))
- Changed default namespace of relationship to solve render issue ([56a3554](https://github.com/OxfordAbstracts/html-to-docx/commit/56a3554e7b2e9d85cedeece8d20acfebf23666ad))
- Changed file extension if octet stream is encountered ([32c5bf1](https://github.com/OxfordAbstracts/html-to-docx/commit/32c5bf1b5f7c5f8dc83a51fed142e932c7b008fd))
- Changed namespaces to original ecma 376 spec ([51be86e](https://github.com/OxfordAbstracts/html-to-docx/commit/51be86ecf0f4a78457840bf2a31579d217568208))
- Fix table render issue due to grid width ([636d499](https://github.com/OxfordAbstracts/html-to-docx/commit/636d499bcee00195f7b5ca198c60bb3e0f7d2a69))
- Fixed abstract numbering id ([9814cb8](https://github.com/OxfordAbstracts/html-to-docx/commit/9814cb89582bc7e87cec638be37ee1cd326c6117))
- Fixed coloring and refactored other text formatting ([c288f80](https://github.com/OxfordAbstracts/html-to-docx/commit/c288f809ea6387c91356976a6dd81396cecafc46))
- Fixed document rels and numbering bug ([d6e3152](https://github.com/OxfordAbstracts/html-to-docx/commit/d6e3152081da7d2ab379a67bfda345964fa15c40))
- Fixed docx generation ([3d96acf](https://github.com/OxfordAbstracts/html-to-docx/commit/3d96acf511d82776510fac857af57d5cb9453f89))
- Fixed incorrect table row generation ([742dd18](https://github.com/OxfordAbstracts/html-to-docx/commit/742dd1882ce4c1a33ab51e10ee2a628b817eca31))
- Fixed internal mode and added extensions ([1266121](https://github.com/OxfordAbstracts/html-to-docx/commit/12661213e00c55f7068e93abb019ba80cd4f2d87))
- Fixed margin issues ([f841b76](https://github.com/OxfordAbstracts/html-to-docx/commit/f841b76caa944ea5eec206a3b3fce3e5a5eaf3e7))
- Fixed numbering and header issue due to wrong filename ([64a04bc](https://github.com/OxfordAbstracts/html-to-docx/commit/64a04bc192616162aa67c43f80734e7ebb9ff588))
- Fixed table and image rendering ([c153092](https://github.com/OxfordAbstracts/html-to-docx/commit/c1530924f93351ce63882bf0e6050b6315aa6017))
- Handled figure wrapper for images and tables ([4182a95](https://github.com/OxfordAbstracts/html-to-docx/commit/4182a9543aeb71fd8b0d2c7a2e08978a782de3e6))
- Handled table width ([237ddfd](https://github.com/OxfordAbstracts/html-to-docx/commit/237ddfd6bff914e0379c6cbd940a7eac29d7aeaf))
- Handling multiple span children and multilevel formatting of text ([4c81f58](https://github.com/OxfordAbstracts/html-to-docx/commit/4c81f586400d1f227236a8b07d067331c0f02c5d))
- Moved namespaces into separate file ([75cdf30](https://github.com/OxfordAbstracts/html-to-docx/commit/75cdf3033e69934b189a74d6c77eef08d50492aa))
- Namespace updated to 2016 standards ([6fc2ac2](https://github.com/OxfordAbstracts/html-to-docx/commit/6fc2ac2b6e904c4dd774b24e0ad119cccd873e0b))
- Removed unwanted attribute ([f3caf44](https://github.com/OxfordAbstracts/html-to-docx/commit/f3caf44faf95ba8c6dee1f6f959300374e2b65ff))
- Renamed document rels schema file ([10c3fda](https://github.com/OxfordAbstracts/html-to-docx/commit/10c3fda9878847257b902d4c13c2d8dd36edd3f6))
- Updated document abstraction to track generation ids ([c34810f](https://github.com/OxfordAbstracts/html-to-docx/commit/c34810f1373f934b0b3ecbe9da2838f41a68dcc9))
- template: Fixed document templating ([5f6a74f](https://github.com/OxfordAbstracts/html-to-docx/commit/5f6a74f9964348590fbb7f5baf88230c8c796766))
- template: Fixed numbering templating ([8b09691](https://github.com/OxfordAbstracts/html-to-docx/commit/8b096916284cbbe8452bb572d788caee23849084))
- Updated documentrels xml generation ([433e4b4](https://github.com/OxfordAbstracts/html-to-docx/commit/433e4b4eb9d71beede8feb1754363163ba5d1933))
- Updated numbering xml generation ([81b7a82](https://github.com/OxfordAbstracts/html-to-docx/commit/81b7a8296d1e3afa095f47007a66698852d29f95))
- Updated xml builder to use namespace and child nodes ([2e28b5e](https://github.com/OxfordAbstracts/html-to-docx/commit/2e28b5ec07241c10c4288412a6ced8023e8c03ce))
- Wrapped drawing inside paragraph tag ([d0476b4](https://github.com/OxfordAbstracts/html-to-docx/commit/d0476b4211fe13f5918091a6a06e5021015a5db8))
- template: Removed word xml schema ([ee0e1ed](https://github.com/OxfordAbstracts/html-to-docx/commit/ee0e1ed7b0b00cbaf3644ad887175abac0282dcc))
