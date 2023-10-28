## Requirements

- [Node.js](https://nodejs.org/en/) = v16.18.0
- [Yarn](https://yarnpkg.com/en/) = 1.22.19
- [Npm](https://www.npmjs.com/) = 8.19.2

## Installation

```bash
$ yarn
```

## Running the app

```bash
# development
$ yarn run start

# watch mode
$ yarn dev

# production mode
$ yarn run start:prod
```

# Run with docker

```bash
# build docker image
$ docker build -t <image-name> .

# run docker image
$ docker run -p 3000:3000 <image-name>

or

# run docker-compose
$ docker-compose up
```

## Generate

```bash
# generate module
$ nest generate module modules/<module-name>

# generate controller
$ nest generate controller modules/<module-name>

# generate service
$ nest generate service modules/<module-name>

# generate entity
$ nest generate entity modules/<module-name>
```

## Docs

- [Structure](https://medium.com/the-crowdlinker-chronicle/best-way-to-structure-your-directory-code-nestjs-a06c7a641401)
- [ErrorCode](docs/error-code.js)
- [Knowledge](docs/base-concept-of-nest.md)
