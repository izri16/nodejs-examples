const {spawn} = require("child_process");

const child = spawn("wc");

// child will wait for input from console (main process stdin) + (Ctrl D)
// which finished that stream, and pass it as input to "wc" command
process.stdin.pipe(child.stdin);

child.stdout.on("data", data => {
  console.log(`child stdout:\n${data}`);
});