import { defineConfig } from "vite";

export default defineConfig({
  // server: {
  //   warmup: {
  //     clientFiles: ['./src/**/*.ts']
  //   }
  // },
  plugins: [
    {
      name: "artificial-slowdown",
      transform(code) {
        // syncDelay(1);
        // await asyncDelay(2)
        return code;
      },
    },
  ],
});

function syncDelay(ms: number) {
  let s = performance.now();
  let i = 0;
  while (performance.now() - s < ms) {
    i++;
  }
  return i;
}

function asyncDelay(ms: number) {
  return new Promise((r) => setTimeout(r, ms));
}
