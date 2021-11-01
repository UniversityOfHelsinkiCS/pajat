# Pajat

- Production in TODO
- Staging in TODO

## Issues with Pajat

Send an issue if you find mistakes, problems or something to improve in Pajat.
Feel free to create a pull request.

## Environment configuration

Create a `.env` file inside the project's root directory. In that file, copy the contents of the `.env.template` file and add correct values for the variables based on the documentation.

## Database migrations

Database migrations are ran automatically once the server starts. If you want to create a new migration, run `npm run migrate:make <name>`.

## Module missing?

Install the dependencies **inside** the container to have the application **inside** the container access them. You can use `npm run bash` to get inside the container to do so.

## How users can get started with Pajat

Clone the repo, install docker to get started!

To start the project in development mode use this command. It will start everything in development mode:

```bash
$ npm run start
```

## Stuck?

If stuck reset everything and start from a clean slate:

```bash
$ npm run reset
```

## Documentation

TODO

## Maintainers and Contribution

Toska of course.

University of Helsinki.
