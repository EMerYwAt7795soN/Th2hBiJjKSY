// 代码生成时间: 2025-10-23 17:40:11
const fastify = require('fastify')({ logger: true });

// In-memory storage for version control
const versions = [];

// Utility function to create a new version
const createVersion = (data) => ({
  id: versions.length + 1,
  data,
  timestamp: new Date().toISOString()
});

// GET /versions - List all versions
fastify.get('/versions', async (request, reply) => {
  try {
    return { versions };
  } catch (error) {
    reply.send(error);
  }
});

// POST /versions - Create a new version
fastify.post('/versions', async (request, reply) => {
  try {
    const newVersion = createVersion(request.body);
    versions.push(newVersion);
    return { newVersion };
  } catch (error) {
    reply.send(error);
  }
});

// GET /versions/:id - Get a specific version
fastify.get('/versions/:id', async (request, reply) => {
  try {
    const { id } = request.params;
    const version = versions.find(v => v.id === parseInt(id));
    if (!version) {
      reply.status(404).send({ error: 'Version not found' });
    } else {
      return { version };
    }
  } catch (error) {
    reply.send(error);
  }
});

// Start the server
const start = async () => {
  try {
    await fastify.listen({ port: 3000 });
    fastify.log.info(`Server running at http://localhost:3000/`);
  } catch (error) {
    fastify.log.error(error);
    process.exit(1);
  }
};

start();