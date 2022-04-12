const grpc = require("grpc");
const protoLoader = require("@grpc/proto-loader");
const packageDef = protoLoader.loadSync("todo.proto", {});
const grpcObject = grpc.loadPackageDefinition(packageDef);
const todoPackage = grpcObject.todoPackage;

const server = new grpc.Server();
server.bind("0.0.0.0:40000", grpc.ServerCredentials.createInsecure());

server.addService(todoPackage.Todo.service, {
  createTodo: createTodo,
  readTodo: readTodo,
});

server.start();
const todos = [];
function createTodo(call, callback) {
  const newData = {
    id: todos.length + 1,
    text: call.request.text,
  };
  todos.push(newData);
  callback(null, newData);
}

function readTodo(call, callback) {
  callback(null, { items: todos });
}
