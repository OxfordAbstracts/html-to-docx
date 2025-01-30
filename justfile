lint:
  npx eslint --fix .

prettier-check:
  npx prettier --check --write '**/*.ts'

test-unit:
  node --test

test: lint prettier-check test-unit

release:
  npx standard-version
