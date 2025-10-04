// 代码生成时间: 2025-10-05 02:12:20
const fastify = require('fastify')({ logger: true });
const helmet = require('fastify-helmet');
const sanitizeHtml = require('sanitize-html');

// 配置Helmet，为应用添加HTTP头部以提高安全性
fastify.register(helmet);

// 定义XSS防护中间件
function xssProtectionMiddleware(req, reply, next) {
  // 遍历所有的请求参数
  Object.keys(req.params).forEach(key => {
    req.params[key] = sanitizeHtml(req.params[key], {
      allowedTags: [], // 允许的标签，这里设置为空，表示不允许任何HTML标签
      allowedAttributes: {}, // 允许的属性，这里设置为空对象，表示不允许任何属性
    });
  });
  // 遍历所有的查询参数
  Object.keys(req.query).forEach(key => {
    req.query[key] = sanitizeHtml(req.query[key], {
      allowedTags: [],
      allowedAttributes: {},
    });
  });
  // 继续处理请求
  next();
}

// 注册XSS防护中间件
fastify.addHook('preHandler', xssProtectionMiddleware);

// 示例路由，展示XSS防护功能
fastify.get('/', (request, reply) => {
  return reply.send({
    hello: 'world',
    userInput: request.query.userInput, // 即使用户输入了恶意脚本，也被清理了
  });
});

// 错误处理中间件
fastify.setErrorHandler((error, request, reply) => {
  reply.status(error.statusCode || 500).send({
    code: error.code,
    msg: error.message,
  });
});

// 启动服务器
const start = async () => {
  try {
    await fastify.listen({
      port: 3000,
    });
    fastify.log.info(`server listening on ${fastify.server.address().port}`);
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
};

start();