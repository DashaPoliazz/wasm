(async () => {
  const importObject = {
    console: {
      log: () => console.log("log"),
      error: () => console.error("error"),
    },
  };

  const wasmFile = await fetch("test.wasm");
  const buffer = await wasmFile.arrayBuffer();
  const wasm = await WebAssembly.instantiate(buffer, importObject);
  const { addTwo } = wasm.instance.exports;
  addTwo(2, 2);
})();
