lint:
  npx eslint --fix .

prettier-check:
  npx prettier --check --write '**/*.js'

test-unit:
  node --test tests/**/*.js

test: lint prettier-check test-unit

release:
  npx standard-version
