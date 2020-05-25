// Worker example using "child_process" module

// 'worker_threads' module is much better suited for CPU intensive computation
// than creating new process for each request, this is just example on usage
// and that it is possible

const http = require("http");
const {fork} = require("child_process");

const server = http.createServer();

server.on("request", (req, res) => {
  if (req.url === "/compute") {
    const worker = fork("forkWorker.js");
    worker.send("start");
    worker.on("message", sum => {
      res.end(`Sum is ${sum}`);
    });
  } else {
    res.end("Ok");
  }
});

server.listen(11000);
