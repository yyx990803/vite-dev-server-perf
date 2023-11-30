# Vite Dev Perf Test

Testing the unbundled dev server overhead with varying levels of module graph width / depth.

```sh
bun install
bun run test # run a list of default variations
bun run test 10 10 # run against a 10x10 module graph
```

## Results on M2 Pro Mac

```
1000 TS modules (50x20) loaded in: 533ms (runs: [585,496,501,538,533])
1000 TS modules (20x50) loaded in: 505ms (runs: [534,485,505,504,515])
2000 TS modules (100x20) loaded in: 1055ms (runs: [1070,1055,1052,1038,1133])
5000 TS modules (250x20) loaded in: 2527ms (runs: [2730,2527,2488,2456,2535])
10000 TS modules (400x25) loaded in: 5123ms (runs: [5123,5101,5107,5343,5257])
```
