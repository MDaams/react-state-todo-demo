# White Rabbit - Client app

## Getting started

- Make sure you have fulfilled the [prerequisites](#prerequisites).
- Run `yarn install` to set up Git hooks and install all JavaScript dependencies.

## Development workflow

- While developing, you can run a local server using `yarn start`.
  This will start a server on http://localhost:9090.
- To create a static HTML5 app build, run `yarn build`.
  The app will be built into the `dist/` directory.
- To run all unit tests once, run `yarn test:unit`.
- To run all unit tests continuously, run `yarn test:watch`.
- To run integration tests, run `yarn test:e2e`.
- To run all tests, run `yarn test`.
- To see how the dependencies affect bundle sizes, run `yarn analyze-bundle`.

## Linting

Code is linted with [ESLint](https://eslint.org/), [TSLint](https://palantir.github.io/tslint/), and [stylelint](https://stylelint.io/).
Running `yarn install` will install a Git commit hook that will lint your code before each commit.
You can run both linters manually using `yarn lint`.

## Prerequisites

### General

- Node.js >= 11 + Yarn, for the build system
- Chrome v59.x or higher to run the tests headless
- Java 8 (or higher) to run the end-to-end tests (it powers the selenium server)

## Continuous integration and delivery

This app uses a library with React components stored in a private repository.
To build the Docker images for continuous integration and delivery, you need to supply an SSH key that has access to this repository.
This SSH key should not have a passphrase.

For security reasons, this key should only have read rights.
Perhaps counterintuitively, the absence of a passphrase is also for security reasons.
Adding an SSH key with a passphrase during the build of the Docker image would require you to pass the passphrase as a build argument.
Doing this in such a way that the passphrase doesn't end up in the image or your command-line history is not straightforward and error prone.

Execute the following command in the root of this repository to build an image for continuous integration.
Ensure that you execute the command from a clean repository, like a CI server would.
Otherwise, the `node_modules` folder in the Docker image would be overwritten by your local `node_modules` folder.

```
docker build -t white-rabbit-client-app-ci --build-arg SSH_KEY="$(cat /path/to/ssh/key)" -f client-app/dockerfiles/ci/Dockerfile .
```

Afterwards, execute the following command to run all tests.

```
docker run --rm white-rabbit-client-app-ci yarn test
```

Execute the following command to build an image for deployment.

```
docker build -t white-rabbit-client-app-deploy --build-arg GIT_COMMIT="$(git rev-parse --short HEAD)" --build-arg SSH_KEY="$(cat deploy_key)" -f client-app/dockerfiles/deploy/Dockerfile .
```

Afterwards, execute the following command to make the client app accessible on port 8080.

```
docker run --rm -p 8080:80 white-rabbit-client-app-deploy
```
