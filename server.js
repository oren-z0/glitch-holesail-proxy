const HOLESAIL_CONNECTION_STRING = (process.env.HOLESAIL_CONNECTION_STRING || "").trim();

const isConnectionStringQuoted = ((HOLESAIL_CONNECTION_STRING[0] === '"' || HOLESAIL_CONNECTION_STRING[0] === '\'') && HOLESAIL_CONNECTION_STRING.slice(-1) === HOLESAIL_CONNECTION_STRING[0]);
const connectionString = isConnectionStringQuoted ? HOLESAIL_CONNECTION_STRING.slice(1, -1) : HOLESAIL_CONNECTION_STRING;
if (connectionString.length >= 32) {
  const { createHash } = require("node:crypto");
  const HolesailClient = require("holesail-client");
  const holesailClient = (
    (connectionString.length === 64)
    ? new HolesailClient(connectionString)
    : new HolesailClient(createHash('sha256').update(connectionString).digest('hex'), 'secure')
  );
  const port = Number(process.env.PORT);
  holesailClient.connect({ port, address: '0.0.0.0' }, () => {
    console.info(`Running holesail-client on port ${port}`);
  });
} else {
  const fastify = require("fastify")({ logger: false });

  fastify.get("*", (request, reply) => {
    reply.code(500).header('Content-Type', 'text/plain').send(
      connectionString
      ? "Invalid HOLESAIL_CONNECTION_STRING: connection strings should have a minimum length of 32 chars."
      : "Server is not configured: must set HOLESAIL_CONNECTION_STRING environment variable (see .env file)."
    );
  });
  fastify.listen(
    { port: Number(process.env.PORT), host: "0.0.0.0" },
    (err, address) => {
      if (err) {
        console.error(err);
        process.exit(1);
      }
      console.info(`Missing HOLESAIL_CONNECTION_STRING. Your app is listening on ${address}`);
    }
  );
}
