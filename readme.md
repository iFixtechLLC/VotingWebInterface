# Voting Web Interface

## Overview

The respository contains the web application that authenticates voters, presents the ballot,
collects selections, and submits encrypted votes.

## Usage

### Setup

If you're using `npm.e1c.net` and you haven't already, add these lines to your `.npmrc`:

```
@angular:registry=https://registry.npmjs.org/
@types:registry=https://registry.npmjs.org/
@ngtools:registry=https://registry.npmjs.org/
@ng-bootstrap:registry=https://registry.npmjs.org/
```

If you don't, there's a good chance your `npm install` will fail because Sinopia doesn't support
`@scope` names. Then you'll want to log into `https://registry.npmjs.org/` like so:

```bash
npm login --scope=@angular
```

Make sure to use credentials that *aren't* the ones you use for LDAP, and you should be all set.

You'll want to globally install `@angular/cli` to get all the `ng` commands. Do this if you haven't installed it yet:

```bash
npm install -g @angular/cli
```

If you've globally installed an old version of the Angular CLI, you'll have to upgrade to the latest version:

```bash
npm uninstall -g angular-cli
npm cache clean
npm install -g @angular/cli
```

And you'll probably need to clean out and regenerate some of the directories, too:

```bash
rm -rf node_modules dist
npm install
```

Otherwise you're gonna have a bad time. If you run into errors post-upgrade, use `ng -v` inside and
outside of your project directory to ensure that Angular CLI is installed globally and in your
project with matching versions.

### HTTPS setup

You'll want to add this project's certificate to your machine's trusted ones so that your browser doesn't throw up security alerts when you try to load the livereload server. To do that, first open `ssl/localhost.crt`
```
open ssl/localhost.crt
```
On OS X, this will open the keychain manager and add this localhost cert to it. Double-click this new cert (the one called 'localhost'), and it'll bring up a second window. In that window, expand the 'Trust' section, and select 'Always Trust' from the first dropdown. Close the window, enter your password, and that's all you should need to do.

Note: This project shares its key/cert with the proxy box project, so you'll only have to do this once to have it working for both.

### Building

Building the image can be done with `bin/build.sh`. The included `Dockerfile` builds nginx from
source using only the required modules used by the server for maximum performance and security,
and minimum image size. A name for the image must be supplied in an `IMAGE_BRANCH` variable.

Building the JS bundles alone simply requires `npm run build` (or `npm run build-dev` if you don't want AOT/minification/other production stuff).

### Running

First the Angular CLI and local dependencies should be installed per the setup section above.
Then from inside the project directory, you can start a local webserver with livereload
listening on port 4200 with the following:

```bash
npm run serve
```

You can change the webserver port by providing the port after `--`. For example:

```bash
npm run serve -- 8080
```

The application, when in production mode, loads all of its configuration from `src/config/prod.json`. When it's not in
production, though (e.g. when it's running through `ng serve`), the application will first look for `dev.json` in that
`config` folder before falling back to `prod.json`.

So if you want to override any of the production configuration, create your own `dev.json` in that folder (it's ignored
by Git), copy the contents of `prod.json` into your new `dev.json`, and change whatever keys you want in `dev.json`.

### Testing

Unit tests can be executed by running `npm test`. Linting can be executed by running `npm run lint`. Run them all together
by running `bin/test.sh`.

### Continuous Integration

Jobs defined in the Gitlab CI configuration file can be tested locally by installing the [Gitlab
runner](https://docs.gitlab.com/runner/install/) and then running `bin/ci.sh JOB_NAME`, where
`JOB_NAME` is the name of a job defined in `.gitlab-ci.yml`.

## Project Structure

*   `bin`: Convenience scripts for building and testing the image
*   `src`: Angular 2 application source code
*   `types`: Typescript declaration files for third-party libraries

## APIs Consumed

*   TODO

## Audit Events

*   TODO

## Implementation

### Application State Persistence

We use `Window.sessionStorage` for storage of a user's voting session state (i.e. ballot progress). This allows the user's voting progress to be persisted through browser refreshes. And unlike `Window.localStorage`, the contents of `sessionStorage` are cleared when the browser window/tab is closed. On logout (vote submission or manual logout), we clear the voting progress record from `sessionStorage`.

In the future, we could potentially store more information in `sessionStorage`. Accessibility settings would be the obvious next choice to ensure a smooth user experience through page reloads.

### Application Config

Our `ConfigService` is initialized when the application bootstraps, and it reads config data present in either `src/config/prod.json` or `src/config/dev.json` depending on what mode the application is running in. In dev mode, `dev.json` will be looked up first; if it isn't present, the app will fall back to `prod.json`. In order to make your own `dev.json`, make an exact copy of `prod.json`, then change whichever properties you wish to override.

### Vote Envelope Encryption

`CryptoService` has two implementations: one using the WebCrypto API found in modern, standards-compliant browsers; and a pure JS implementation using `node-forge` to be used in browsers lacking the WebCrypto API. Their inputs/outputs should be identical such that they are interchangeable.
