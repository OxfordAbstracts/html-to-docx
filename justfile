# List all the available recipes
help:
  @just --list --unsorted --list-heading ''


# Format the code using dprint
fmt:
  npx dprint fmt


# Lint the code using ESLint
lint:
  # Dprint doesn't support all the rules that eslint does,
  # so we need to run eslint with the --fix flag to fix the rest.
  # - https://github.com/dprint/dprint-plugin-typescript/issues/696
  # - https://github.com/dprint/dprint-plugin-typescript/issues/432
  npx eslint --ignore-pattern=.gitignore --fix .


# Run the unit tests
test-unit:
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
release:
  npx standard-version
