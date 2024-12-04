# glitch-holesail-proxy
A template project for [Glitch](https://glitch.com) that runs a [Holesail](https://holesail.io) client and forwards all incoming connections.

## Instructions

1. Install Node.JS and run the [holesail cli](https://www.npmjs.com/package/holesail) in a new shell terminal: `npx holesail --live THE-LOCAL-PORT-YOU-WANT-TO-EXPOSE`

2. Copy the connection string and calculate its sha256 using a shell terminal:
```sh
echo -n 'YOUR-CONNECTION-STRING' | shasum -a 256
```
The result will be your `HOLESAIL_BUFF_SEED`

3. Click the following link to deploy the project on [glitch.com](https://glitch.com): https://glitch.new/github.com/oren-z0/glitch-holesail-proxy

4. Go to the `.env` file in your project and set `HOLESAIL_BUFF_SEED` to the value from before.

Your website is up! Click "Preview in a new window" to open it.
