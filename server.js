const HOLESAIL_BUFF_SEED = (process.env.HOLESAIL_BUFF_SEED || "").trim().toLowerCase();

const isBuffSeedQuoted = ((HOLESAIL_BUFF_SEED[0] === '"' || HOLESAIL_BUFF_SEED[0] === '\'') && HOLESAIL_BUFF_SEED.slice(-1) === HOLESAIL_BUFF_SEED[0]);
const buffSeed = isBuffSeedQuoted ? HOLESAIL_BUFF_SEED.slice(1, -1) : HOLESAIL_BUFF_SEED;
if (/^[0-9a-f]{64}$/.test(buffSeed)) {
  const HolesailClient = require("holesail-client");
  const holesailClient = new HolesailClient(buffSeed, 'secure');
  const port = Number(process.env.PORT);
  holesailClient.connect({ port, address: '0.0.0.0' }, () => {
    console.info(`Running holesail-client on port ${port}`);
  });
} else {
  const fastify = require("fastify")({ logger: false });

  fastify.get("*", (request, reply) => {
    reply.code(500).header('Content-Type', 'text/plain').send(
      buffSeed
      ? `Invalid HOLESAIL_BUFF_SEED: must be a hex string of 32 bytes.
If you are running holesail cli, calculate the sha256 of your connection-string by opening a shell terminal and calling:
echo -n 'YOUR-CONNECTION-STRING' | shasum -a 256`
      : "Server is not configured: must set HOLESAIL_BUFF_SEED environment variable (see .env file)."
    );
  });
  fastify.listen(
    { port: Number(process.env.PORT), host: "0.0.0.0" },
    (err, address) => {
      if (err) {
        console.error(err);
        process.exit(1);
      }
      console.info(`Missing HOLESAIL_BUFF_SEED. Your app is listening on ${address}`);
    }
  );
}
