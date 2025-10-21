// 代码生成时间: 2025-10-22 00:26:13
const fastify = require('fastify')({ logger: true });

// 特征工程功能集合
const featureEngineeringFunctions = {
  // 示例功能：计算数据集中特征的平均值
  calculateMean: (data) => {
    const sum = data.reduce((a, b) => a + b, 0);
    return sum / data.length;
  },

  // 示例功能：计算数据集中特征的标准差
  calculateStdDev: (data) => {
    const mean = featureEngineeringFunctions.calculateMean(data);
    const variance = data.reduce((a, b) => a + Math.pow(b - mean, 2), 0) / data.length;
    return Math.sqrt(variance);
  }
};

// 特征工程工具路由
fastify.post('/features/mean', async (request, reply) => {
  try {
    // 从请求体中提取数据
    const { data } = request.body;
    // 校验数据
    if (!Array.isArray(data) || data.some(isNaN)) {
      reply.status(400).send({ error: 'Invalid data format' });
      return;
    }
    // 计算平均值
    const mean = featureEngineeringFunctions.calculateMean(data);
    // 返回计算结果
    reply.send({ mean });
  } catch (error) {
    fastify.log.error(error);
    reply.status(500).send({ error: 'Internal Server Error' });
  }
});

fastify.post('/features/stddev', async (request, reply) => {
  try {
    // 从请求体中提取数据
    const { data } = request.body;
    // 校验数据
    if (!Array.isArray(data) || data.some(isNaN)) {
      reply.status(400).send({ error: 'Invalid data format' });
      return;
    }
    // 计算标准差
    const stdDev = featureEngineeringFunctions.calculateStdDev(data);
    // 返回计算结果
    reply.send({ stdDev });
  } catch (error) {
    fastify.log.error(error);
    reply.status(500).send({ error: 'Internal Server Error' });
  }
});

// 启动服务器
const start = async () => {
  try {
    await fastify.listen({ port: 3000 });
    fastify.log.info(`Feature Engineering Tool server listening on ${fastify.server.address().port}`);
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
};

start();