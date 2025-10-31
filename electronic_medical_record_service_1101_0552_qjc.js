// 代码生成时间: 2025-11-01 05:52:11
// electronic_medical_record_service.js

// 引入Fastify和必要的插件
const fastify = require('fastify')();

// 模拟数据库，用于存储病历信息
const medicalRecords = [];

// 添加病历记录
fastify.post('/records', async (request, reply) => {
  // 从请求体中获取病历数据
  const { patientId, diagnosis, treatment } = request.body;

  // 检查病历数据是否完整
  if (!patientId || !diagnosis || !treatment) {
    reply.status(400).send({
      error: 'Missing required fields'
    });
    return;
  }

  // 创建病历记录
  const record = {
    id: medicalRecords.length + 1,  // 简单的ID生成策略
    patientId,
    diagnosis,
    treatment,
    timestamp: new Date(),
  };

  // 将病历记录添加到数据库
  medicalRecords.push(record);

  // 返回添加成功的病历记录
  reply.status(201).send(record);
});

// 获取单个病历记录
fastify.get('/records/:id', async (request, reply) => {
  const { id } = request.params;

  // 查找病历记录
  const record = medicalRecords.find(record => record.id === parseInt(id));

  // 如果病历记录不存在，返回错误
  if (!record) {
    reply.status(404).send({
      error: 'Record not found'
    });
    return;
  }

  // 返回找到的病历记录
  reply.send(record);
});

// 获取所有病历记录
fastify.get('/records', async (request, reply) => {
  // 返回所有病历记录
  reply.send(medicalRecords);
});

// 更新病历记录
fastify.put('/records/:id', async (request, reply) => {
  const { id } = request.params;
  const { diagnosis, treatment } = request.body;

  // 查找病历记录
  const recordIndex = medicalRecords.findIndex(record => record.id === parseInt(id));
  if (recordIndex === -1) {
    reply.status(404).send({
      error: 'Record not found'
    });
    return;
  }

  // 更新病历记录
  const updatedRecord = {
    ...medicalRecords[recordIndex],
    diagnosis,
    treatment,
    timestamp: new Date(),
  };

  // 替换旧的病历记录
  medicalRecords[recordIndex] = updatedRecord;

  // 返回更新后的病历记录
  reply.send(updatedRecord);
});

// 删除病历记录
fastify.delete('/records/:id', async (request, reply) => {
  const { id } = request.params;

  // 查找病历记录
  const recordIndex = medicalRecords.findIndex(record => record.id === parseInt(id));
  if (recordIndex === -1) {
    reply.status(404).send({
      error: 'Record not found'
    });
    return;
  }

  // 删除病历记录
  medicalRecords.splice(recordIndex, 1);

  // 返回删除成功的消息
  reply.status(204).send();
});

// 启动服务器
const start = async () => {
  try {
    await fastify.listen(3000);
    console.log('Server is running on http://localhost:3000');
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
};

// 调用启动函数
start();