const {spawn} = require("child_process");

// Count all files within current directory
// find . -type f | wc -l
// find . -type f (print file in current directory)
// wc -l (count number of lines)
const find = spawn("find", [".", "-type", "f"]);
const wc = spawn("wc", ["-l"]);

find.stdout.pipe(wc.stdin);

wc.stdout.on("data", data => {
  console.log(`Number of files ${data}`);
});
