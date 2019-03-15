# farmOS.js Examples

This repo contains example code for how to use the [farmOS.js](https://github.com/farmOS/farmOS.js) library for connecting to a farmOS server. These also serve as tests for that library.

Currently, there is only a browser-based example, using [React](https://reactjs.org/), but in the near future we hope to add a [Node.js](https://nodejs.org/) example as well. That will first require migrating the farmOS.js library from using the [`fetch()` API](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch) to using [axios](https://github.com/axios/axios).

## React Example

This example assumes you are using a farmOS Docker image for your development server, with the Drupal [CORS module](https://www.drupal.org/project/cors) installed and configured as follows:

```
*|http://localhost:8080||Content-Type,Authorization,X-Requested-With|true
```

Another quirk of this example is that you must leave the URL blank, so that routes can be proxied as relative routes.

To run it, make sure you have Node installed, and then run:

```bash
git clone https://github.com/jgaehring/farmos-js-examples.git
cd farmos-js-examples/examples/farmos-react
npm i
npm start
```

## Node Example

Coming soon!
