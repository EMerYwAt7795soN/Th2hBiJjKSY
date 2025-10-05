// 代码生成时间: 2025-10-05 19:22:43
const fastify = require('fastify')({ logger: true });

// 模拟数据库
const members = [];

// 添加会员
fastify.post('/member', async (request, reply) => {
  const { username, email } = request.body;
  if (!username || !email) {
    reply.code(400).send({ error: 'Username and email are required' });
    return;
  }
  const newMember = { username, email, id: members.length + 1 };
  members.push(newMember);
  reply.code(201).send(newMember);
});

// 获取所有会员
fastify.get('/members', async (request, reply) => {
  reply.send(members);
});

// 获取单个会员
fastify.get('/member/:id', async (request, reply) => {
  const { id } = request.params;
  const member = members.find(m => m.id === parseInt(id));
  if (!member) {
    reply.code(404).send({ error: 'Member not found' });
    return;
  }
  reply.send(member);
});

// 更新会员信息
fastify.put('/member/:id', async (request, reply) => {
  const { id } = request.params;
  const { username, email } = request.body;
  const memberIndex = members.findIndex(m => m.id === parseInt(id));
  if (memberIndex === -1) {
    reply.code(404).send({ error: 'Member not found' });
    return;
  }
  members[memberIndex] = { ...members[memberIndex], username, email };
  reply.send(members[memberIndex]);
});

// 删除会员
fastify.delete('/member/:id', async (request, reply) => {
  const { id } = request.params;
  const memberIndex = members.findIndex(m => m.id === parseInt(id));
  if (memberIndex === -1) {
    reply.code(404).send({ error: 'Member not found' });
    return;
  }
  members.splice(memberIndex, 1);
  reply.code(204).send({
    message: 'Member deleted successfully'
  });
});

// 启动服务器
const start = async () => {
  try {
    await fastify.listen(3000);
    fastify.log.info(`Server is running on ${fastify.server.address().port}`);
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
};

start();