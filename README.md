# glitch-holesail-proxy
A template project for [Glitch](https://glitch.com) that runs a [Holesail](https://holesail.io) client and forwards all incoming connections.

Click the following link to deply: https://glitch.new/github.com/oren-z0/glitch-holesail-proxy

Then create a `.env` file and set the `HOLESAIL_BUFF_SEED` environment variable inside it.

If you are running [holesail cli](https://www.npmjs.com/package/holesail), your `HOLESAIL_BUFF_SEED` is the sha256 of your connection string.
To calculate it, open a shell terminal and run:

```sh
echo -n 'YOUR-CONNECTION-STRING' | shasum -a 256
```
