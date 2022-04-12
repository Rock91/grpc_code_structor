const grpc = require("grpc");
const protoLoader = require("@grpc/proto-loader");
const packageDef = protoLoader.loadSync("todo.proto", {});
const grpcObject = grpc.loadPackageDefinition(packageDef);
const todoPackage = grpcObject.todoPackage;

const client = new todoPackage.Todo(
  "localhost:40000",
  grpc.credentials.createInsecure()
);

client.createTodo(
  {
    id: "1",
    text: "Itemd lal",
  },
  (err, response) => {
    console.log(" er------------------------", err);
    console.log("recived " + JSON.stringify(response));
  }
);

client.readTodo({}, (err, response) => {
  console.log(" er-------readTODO-----------------", err);
  console.log("recived " + JSON.stringify(response));
});
