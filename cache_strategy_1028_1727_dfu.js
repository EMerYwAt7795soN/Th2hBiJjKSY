// 代码生成时间: 2025-10-28 17:27:34
const fastify = require('fastify')({ logger: true });

// 缓存对象，用于存储缓存数据
const cache = {};

// 设置缓存的键值
function setCache(key, value, ttl) {
  // ttl为过期时间（单位：秒）
  const expires = Date.now() + ttl * 1000;
  cache[key] = { value, expires };
}

// 获取缓存的值
function getCache(key) {
  if (cache[key] && Date.now() < cache[key].expires) {
    return cache[key].value;
  }
  return null;
}

// 清除缓存
function clearCache(key) {
  delete cache[key];
}

// 装饰器函数，用于实现缓存策略
function cacheStrategy(keyGenFn, ttl) {
  return function (request, reply, done) {
    // 生成缓存键
    const key = keyGenFn(request);
    const cachedValue = getCache(key);
    if (cachedValue !== null) {
      // 缓存命中，直接返回缓存值
      reply.send(cachedValue);
    } else {
      // 缓存未命中，执行原请求处理函数
      done(null, request, reply);
      // 原请求处理完成后，设置缓存
      reply.sendDecorator('onSend', (request, reply, payload, done) => {
        if (typeof payload !== 'object' || payload === null) {
          done();
          return;
        }
        // 设置缓存
        setCache(key, payload, ttl);
        done(null, payload);
      });
    }
  };
}

// 定义一个路由，使用缓存策略
fastify.get('/api/data', cacheStrategy(request => {
  // 根据请求生成缓存键
  return `data_${request.query.id}`;
}, 60), async (request, reply) => {
  // 这里是实际的数据获取逻辑，比如数据库查询等
  // 模拟数据库查询
  const data = { id: request.query.id, message: 'Hello from cache!' };
  return data;
});

// 错误处理
fastify.setErrorHandler((error, request, reply) => {
  reply.status(500).send({
    error: 'Internal Server Error',
    message: error.message,
  });
});

// 启动服务器
async function start() {
  try {
    await fastify.listen({ port: 3000 });
    fastify.log.info(`server listening on ${fastify.server.address().port}`);
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
}

start();