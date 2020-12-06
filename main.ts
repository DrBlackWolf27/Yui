//Creation du site en subprocesses
var i = 0
while (i == 0) {
  var p = Deno.run({
    cmd: ["deno", "run", "--allow-read", "--allow-write", "--allow-net", "./website/main.ts"],
    stderr: "piped",
  });
  const { code } = await p.status();
  if (code === 0) {
    const rawOutput = await p.output();
    await Deno.stdout.write(rawOutput);
  } else {
    const rawError = await p.stderrOutput();
    const errorString = new TextDecoder().decode(rawError);
    console.log(errorString);
    p = Deno.run({
      cmd: ["deno", "run", "--allow-read", "--allow-write", "--allow-net", "./website/main.ts"],
      stdout: "piped",
      stderr: "piped",
    });
  }
}