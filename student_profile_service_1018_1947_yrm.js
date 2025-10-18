// 代码生成时间: 2025-10-18 19:47:49
const fastify = require('fastify')({ logger: true });

// 学生数据模型
class Student {
  constructor(id, name, age, gender, grade) {
    this.id = id;
    this.name = name;
    this.age = age;
    this.gender = gender;
    this.grade = grade;
  }
}

// 学生画像管理系统
class StudentProfileService {
  constructor() {
    this.students = []; // 存储学生信息
  }

  // 添加学生画像
  addStudent(student) {
    if (!(student instanceof Student)) {
      throw new Error('Invalid student object');
    }
    this.students.push(student);
    return student;
  }

  // 获取所有学生画像
  getAllStudents() {
    return this.students;
  }

  // 根据ID获取学生画像
  getStudentById(id) {
    const student = this.students.find(s => s.id === id);
    if (!student) {
      throw new Error('Student not found');
    }
    return student;
  }
}

// 初始化学生画像服务
const studentService = new StudentProfileService();

// 学生数据
const studentData = [
  { id: 1, name: 'John Doe', age: 20, gender: 'Male', grade: 'A' },
  { id: 2, name: 'Jane Doe', age: 22, gender: 'Female', grade: 'B' },
];

studentData.forEach(data => {
  studentService.addStudent(new Student(data.id, data.name, data.age, data.gender, data.grade));
});

// 定义路由
fastify.post('/students', async (request, reply) => {
  try {
    const { id, name, age, gender, grade } = request.body;
    const student = new Student(id, name, age, gender, grade);
    const addedStudent = studentService.addStudent(student);
    reply.code(201).send(addedStudent);
  } catch (error) {
    reply.send(error.message);
  }
});

fastify.get('/students', async (request, reply) => {
  try {
    const students = studentService.getAllStudents();
    reply.send(students);
  } catch (error) {
    reply.send(error.message);
  }
});

fastify.get('/students/:id', async (request, reply) => {
  try {
    const student = studentService.getStudentById(request.params.id);
    reply.send(student);
  } catch (error) {
    reply.send(error.message);
  }
});

// 启动服务器
const start = async () => {
  try {
    await fastify.listen(3000);
    fastify.log.info(`server listening on ${fastify.server.address().port}`);
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
};

start();
