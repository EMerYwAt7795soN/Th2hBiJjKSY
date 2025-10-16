// 代码生成时间: 2025-10-16 21:57:46
const fastify = require('fastify')({ logger: true });

// 定义一个GET请求，用于测试API
fastify.get('/', async (request, reply) => {
  try {
    // 模拟API测试数据
    const apiTestData = {
      url: 'https://api.example.com/data',
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      },
      data: JSON.stringify({
        key: 'value'
      })
    };
    
    // 发送请求到模拟的API
    const response = await fastify.inject(apiTestData);

    // 返回API响应
    return {
      statusCode: response.statusCode,
      body: response.payload
    };
  } catch (error) {
    // 错误处理
    reply.status(500).send({
      error: 'Internal Server Error'
    });
  }
});

// 监听端口
const start = async () => {
  try {
    await fastify.listen(3000);
    fastify.log.info(`API testing tool listening on http://localhost:3000`);
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
};

// 启动服务器
start();
