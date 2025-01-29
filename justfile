lint:
  npx eslint --fix .

build:
  npx rollup -c

test-unit:
  node tests/main.js

test: lint build test-unit
  node example/example-node.js

release:
  standard-version

prettier-check:
  prettier --check '**/*.{js}'

validate:
  run-s lint prettier:check
