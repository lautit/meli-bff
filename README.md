# MercadoLibre BFF NodeJS

## Get Started

Get started developing...

```shell
# install deps
yarn install

# run in development mode
yarn run dev

# run tests
yarn run test
```

## Run It

#### Run in _development_ mode:

Runs the application is development mode. Should not be used in production

```shell
yarn run dev
```

or debug it

```shell
yarn run dev:debug
```

#### Run in _production_ mode:

Compiles the application and starts it in production production mode.

```shell
yarn run compile
yarn start
```

## Test It

Run the Mocha unit tests

```shell
yarn test
```

or debug them

```shell
yarn run test:debug
```

## Try It

- Open you're browser to [http://localhost:8080](http://localhost:8080)
- Invoke the `/spec` endpoint
  ```shell
  curl http://localhost:8080/api/v1/spec
  ```

## Debug It

#### Debug the server:

```
yarn run dev:debug
```

#### Debug Tests

```
yarn run test:debug
```

#### Debug with VSCode

Add these [contents](https://github.com/cdimascio/generator-express-no-stress/blob/next/assets/.vscode/launch.json) to your `.vscode/launch.json` file

## Lint It

View airbnb linter output

```
yarn run lint
```

Fix all airbnb linter errors

```
yarn run lint
```

## Deploy It

Deploy to CloudFoundry

```shell
cf push meli-bff
```
