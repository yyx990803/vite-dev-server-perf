import { spawn } from "node:child_process";
import { launch } from "puppeteer";
import { genCode } from "./codegen.js";

const wait = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

const runTest = async (width: number, depth: number) => {
  const runs: number[] = [];
  for (let i = 0; i < 5; i++) {
    genCode(width, depth);
    const process = spawn("vite");
    const page = await browser.newPage();
    await wait(500);
    const start = performance.now();
    await page.goto(`http://localhost:5173`);
    await page.waitForSelector("#app", { timeout: 10_000 });
    runs.push(Math.round(performance.now() - start));
    await page.close();
    process.kill();
    await wait(500);
  }
  console.log(
    `${width * depth} TS modules (${width}x${depth}) loaded in: ${
      runs.slice().sort((a, z) => a - z)[2]
    }ms (runs: [${runs}])`,
  );
};

const browser = await launch();

if (process.argv.length === 4) {
  const [width, depth] = process.argv.slice(2);
  await runTest(Number(width), Number(depth));
} else {
  await runTest(50, 20);
  await runTest(20, 50);
  await runTest(100, 20);
  await runTest(250, 20);
  await runTest(400, 25);
}

await browser.close();
console.log("Finished, you can kill the process");
