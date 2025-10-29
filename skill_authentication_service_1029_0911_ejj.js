// 代码生成时间: 2025-10-29 09:11:00
// Import necessary modules
const Fastify = require('fastify');
const {nanoid} = require('nanoid'); // For unique skill ID generation

// Create a new Fastify instance
const fastify = Fastify({
  logger: true // Enable logger for debugging
});

// Define an in-memory skills database
const skillsDatabase = {};

// Generate a unique skill ID
function generateSkillId() {
  return nanoid(10);
}

// Skill registration route
fastify.post('/register', async (request, reply) => {
  try {
    // Extract skill data from the request body
    const { name, description, evidence } = request.body;
    
    // Validate input data
    if (!name || !description || !evidence) {
      return reply.status(400).send({
        message: 'Invalid skill registration data.'
      });
    }

    // Generate a unique ID for the skill
    const skillId = generateSkillId();

    // Add the skill to the database
    skillsDatabase[skillId] = {
      name,
      description,
      evidence,
      authenticated: false
    };

    // Respond with the registered skill details
    return {
      skillId,
      name,
      description,
      evidence,
      authenticated: false
    };
  } catch (error) {
    // Error handling
    reply.status(500).send({
      message: 'An error occurred while registering the skill.'
    });
  }
});

// Skill authentication route
fastify.post('/auth', async (request, reply) => {
  try {
    // Extract skill ID and authentication data from the request body
    const { skillId, evidence } = request.body;

    // Validate input data
    if (!skillId || !evidence) {
      return reply.status(400).send({
        message: 'Invalid authentication data.'
      });
    }

    // Check if the skill exists in the database
    if (!skillsDatabase[skillId]) {
      return reply.status(404).send({
        message: 'Skill not found.'
      });
    }

    // Update the skill authentication status
    skillsDatabase[skillId].authenticated = true;

    // Respond with the authenticated skill details
    return skillsDatabase[skillId];
  } catch (error) {
    // Error handling
    reply.status(500).send({
      message: 'An error occurred while authenticating the skill.'
    });
  }
});

// Start the server
const start = async () => {
  try {
    await fastify.listen({ port: 3000 });
    fastify.log.info('Skill authentication service listening on port 3000');
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
};

start();