# Book library E2E testing with CI

## Prerrequisites

- JDK v11.
- NodeJS v16.

- Fork the repos that correspond to the Backend and the Frontend:
  - Backend: https://github.com/holgiosalos/books-back
  - Frontend: https://github.com/holgiosalos/books-ui
- Run both forked repos from two independent command line interfaces:
  2.1. For the Backend: - `./gradlew bootRun`
  2.2. For the Frontend: - If using bash: `export BASE_URL=http://localhost:8080` - `npm ci` - `npm run start:dev`

3.  Move to the tests repo and install cypress:
    - `npm i cypress`

## Run the tests

From within the tests repo, run:

    `npm run test:e2e:ui`

For a headless test, run:

    `npm run test:e2e:headless`
