import { writeFileSync, mkdirSync, rmSync } from "fs";

export function genCode(width = 30, depth = 30) {
  rmSync("src", { recursive: true, force: true });
  mkdirSync("./src");

  function write(path: string, data: string) {
    writeFileSync(path, `${data}\nwindow.count++`);
  }

  const generate = (
    dir: string,
    ext: string,
    nextImp: (i: number) => string,
  ) => {
    mkdirSync(`./src/${dir}`);
    for (let i = 1; i < depth; i++) {
      write(`src/${dir}/${i}.${ext}`, `import "${nextImp(i + 1)}"`);
    }
    write(`src/${dir}/${depth}.${ext}`, ``);
  };

  let rootImports = ``;
  for (let i = 0; i < width; i++) {
    generate(`dir${i}`, `ts`, (j) => `/src/dir${i}/${j}.ts`);
    rootImports += `import './dir${i}/1.ts'\n`;
  }

  writeFileSync(
    `src/entry.js`,
    `
${rootImports}
const app = document.createElement("div");
app.id = "app";
app.textContent = window.count + ' TypeScript modules (import graph width:${width} x depth:${depth}) loaded in ' + (performance.now() - window.start).toFixed(2) + 'ms';
document.body.appendChild(app);
`,
  );
}
