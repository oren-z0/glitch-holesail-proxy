# glitch-holesail-proxy
A template project for [Glitch](https://glitch.com) that runs a [Holesail](https://holesail.io) client and forwards all incoming connections.

## Instructions

1. Install Node.JS and run the [holesail cli](https://www.npmjs.com/package/holesail) in a new shell terminal:
```sh
npx holesail --live THE-LOCAL-PORT-YOU-WANT-TO-EXPOSE
```
for example:
```sh
npx holesail --live 8080
```

2. Copy the connection string.

3. Click the following link to deploy the project on *glitch.com*: https://glitch.new/github.com/oren-z0/glitch-holesail-proxy

4. Go to the `.env` file in your project and set `HOLESAIL_CONNECTION_STRING`.

Your website is up! Click "Preview in a new window" to open it.
