# KeystoneJS Starter Template

This is my personal copy of the Keystone Starter project with a few modifications for rapid prototyping.
- I've added a Docker Compose file for spinning up both a MongoDB and PostgreSQL database locally. Whichever is needed for the project can be used, and the other simply removed from `./docker-compose.yml`. You'll want to update the file with a correct dabase name, and user credentials as well.
- The `index.js` file contains adapters for both db's. Same thing here, you'll want to remove the unused one and update the connection string.
- Added a helper to the `index.js` file for loading in files from the `./lists` directory. Keystone will automatically create a list using the config found in those files where the filename is the list name.

This project contains a simple list of users (soon tenants) and an admin application (`localhost:3000/admin`) with token based authentication.

## Running the Project.

To run this project first run `npm install`.

Make sure your db is running. `docker-compose up`.

`npm run create-tables` will populate your database with initial data.

`npm run dev` will start up the server along with the graphql api and admin interface.

Once running, the Keystone Admin UI is reachable via `localhost:3000/admin`.

The GraphQL API is availbe at localhost:3000/admin/graphiql