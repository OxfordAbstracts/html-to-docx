# List all the available recipes
help:
  @just --list --unsorted --list-heading ''


# Test if node_modules directory exists
node_modules:
  test -d node_modules || npm install


# Check the types using TypeScript
check-types: node_modules
  npx tsc --noEmit


# Format the code using dprint
fmt: node_modules
  npx dprint fmt


# Lint the code using ESLint
lint: node_modules
  # Dprint doesn't support all the rules that eslint does,
  # so we need to run eslint with the --fix flag to fix the rest.
  # - https://github.com/dprint/dprint-plugin-typescript/issues/696
  # - https://github.com/dprint/dprint-plugin-typescript/issues/432
  npx eslint --ignore-pattern=.gitignore --fix .


# Run the unit tests
test-unit: node_modules
  grep -q 'xmlbuilder2": "2.1.2' package.json || \
    (echo "xmlbuilder2 must be version 2.1.2 due to " \
    "https://github.com/oozcitak/xmlbuilder2/issues/178" && exit 1)
  node --test --disable-warning=ExperimentalWarning


# Run all the tests
test: fmt lint test-unit


build-esm:
  bun build \
    --target node \
    --outfile dist/index-esm.js \
    index.js


build-cjs:
  bun build \
    --target node \
    --format cjs \
    --outfile dist/index-cjs.js \
    index.js


build: build-esm build-cjs


# Bump the version and create a new release
release: node_modules
  npx standard-version
