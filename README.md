# Pajat

Production in https://study.cs.helsinki.fi/pajat2

## Issues with Pajat

Send an issue if you find mistakes, problems or something to improve in Pajat.
Feel free to create a pull request.

## Environment configuration

Create a `.env` file inside the project's root directory. In that file, copy the contents of the `.env.template` file and add correct values for the variables based on the documentation.

## How users can get started with Pajat

Clone the repo, install docker to get started!

To start the project in development mode use this command. It will start everything in development mode:

```bash
$ npm run start
```

## Database migrations

Database migrations are ran automatically once the server starts. If you want to create a new migration, run `npm run migrate:make <name>`.

## Module missing?

Install the dependencies **inside** the container to have the application **inside** the container access them. You can use `npm run bash` to get inside the container to do so.

## Stuck?

If stuck reset everything and start from a clean slate:

```bash
$ npm run reset
```

## Mocking the user in the development environment

You can mock the user in the development environment by calling `window.__mockUser__.setUser` in the browser's developer tool's console. For example:

```javascript
window.__mockUser__.setUser({
  username: 'kalleilv',
  firstName: 'Kalle',
  lastName: 'Ilves',
  email: 'kalle.ilves@helsinki.fi',
});
```

The mock user will be stored into the local storage.

## Logging in as another user

You can login as any user by calling `window.__loginAs__.login` in the browser's developer tool's console. For example:

```javascript
window.__loginAs__.login('kalleilv');
```

This works both in developement and production environments. The logged in as user will be stored into the local storage. If you want to return to your user, call `window.__loginAs__.clear`. For example:

```javascript
window.__loginAs__.clear();
```

## Embedded calendars

There's an embedded view for multiple and single courses. Both views will automatically refresh themselves with a sensible interval.

Multiple courses view is at https://study.cs.helsinki.fi/pajat2/public/screen. You can choose the displayed courses by providing a `courseCodes` query parameter with the course codes separated by a comma. For example https://study.cs.helsinki.fi/pajat2/public/screen?courseCodes=tkt20002,tkt20006.

The single course view is at path `/pajat2/public/screen/:courseCode` where `:courseCode` is the course's course code. For example https://study.cs.helsinki.fi/pajat2/public/screen/tkt20002. If you want to display the course's name you can set the `showCourseName` query parameter as `true`. For example https://study.cs.helsinki.fi/pajat2/public/screen/tkt20002?showCourseName=true.

Both views accept a `dense` query parameter which, if set to `false` will add small padding for the view. For example https://study.cs.helsinki.fi/pajat2/public/screen?courseCodes=tkt20002&dense=false.

A calendar can be embedded into a website using a [<iframe>](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/iframe) tag. For example:

```html
<iframe
  src="https://study.cs.helsinki.fi/pajat2/public/screen/tkt20002"
  style="border: 0px; width: 100%; height: 600px;"
></iframe>
```

## Documentation

TODO

## Maintainers and Contribution

Toska of course.

University of Helsinki.
