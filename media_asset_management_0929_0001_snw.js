// 代码生成时间: 2025-09-29 00:01:52
const fastify = require('fastify')({ logger: true });

// Mock database for media assets
const mediaAssets = [];

// Helper function to generate unique ID
const generateId = () => '_' + Math.random().toString(36).substr(2, 9);

// Route to get all media assets
fastify.get('/media', async (request, reply) => {
  try {
    return { mediaAssets: mediaAssets };
  } catch (error) {
    reply.code(500).send({ error: 'Internal Server Error' });
  }
});

// Route to create a new media asset
fastify.post('/media', async (request, reply) => {
  try {
    const { title, description, type } = request.body;
    if (!title || !description || !type) {
      reply.code(400).send({ error: 'Missing required fields' });
      return;
    }

    const newAsset = {
      id: generateId(),
      title: title,
      description: description,
      type: type
    };
    mediaAssets.push(newAsset);
    return { newAsset: newAsset };
  } catch (error) {
    reply.code(500).send({ error: 'Internal Server Error' });
  }
});

// Route to get a single media asset by ID
fastify.get('/media/:id', async (request, reply) => {
  try {
    const asset = mediaAssets.find(asset => asset.id === request.params.id);
    if (!asset) {
      reply.code(404).send({ error: 'Media asset not found' });
      return;
    }
    return { mediaAsset: asset };
  } catch (error) {
    reply.code(500).send({ error: 'Internal Server Error' });
  }
});

// Route to update an existing media asset
fastify.put('/media/:id', async (request, reply) => {
  try {
    const { title, description, type } = request.body;
    const index = mediaAssets.findIndex(asset => asset.id === request.params.id);
    if (index === -1) {
      reply.code(404).send({ error: 'Media asset not found' });
      return;
    }

    mediaAssets[index] = {
      ...mediaAssets[index],
      title: title || mediaAssets[index].title,
      description: description || mediaAssets[index].description,
      type: type || mediaAssets[index].type
    };
    return { updatedAsset: mediaAssets[index] };
  } catch (error) {
    reply.code(500).send({ error: 'Internal Server Error' });
  }
});

// Route to delete a media asset
fastify.delete('/media/:id', async (request, reply) => {
  try {
    const index = mediaAssets.findIndex(asset => asset.id === request.params.id);
    if (index === -1) {
      reply.code(404).send({ error: 'Media asset not found' });
      return;
    }
    mediaAssets.splice(index, 1);
    return { message: 'Media asset deleted successfully' };
  } catch (error) {
    reply.code(500).send({ error: 'Internal Server Error' });
  }
});

// Start the server
const startServer = async () => {
  try {
    await fastify.listen({ port: 3000 });
    fastify.log.info(`Server is running on ${fastify.server.address().port}`);
  } catch (error) {
    fastify.log.error(error);
    process.exit(1);
  }
};

startServer();