(async () => {
  // creating memory with JS:
  const memory = new WebAssembly.Memory({
    initial: 1,
  });

  const importObject = {
    js: {
      memory,
    },
    console: {
      log: () => console.log("log"),
      error: () => console.error("error"),
    },
  };

  const wasmFile = await fetch("js-to-wasm-memory.wasm");
  const buffer = await wasmFile.arrayBuffer();
  const wasm = await WebAssembly.instantiate(buffer, importObject);

  // 1 page -> 65Kb
  const { wasmMemory } = wasm.instance.exports;

  const uint8 = new Uint8Array(wasmMemory.buffer);
  const decoder = new TextDecoder();
  // reading first 2 bytes
  const chunkToDecode = uint8.slice(0, 2);
  const result = decoder.decode(chunkToDecode);
  // js-to-wasm-memory
  const foo = "foo";
  const u8Arr = new Uint8Array(memory.buffer);
  for (let i = 0; i < foo.length; i++) {
    const charCode = foo[i].charCodeAt();
    u8Arr[i] = charCode;
  }

  let decoded = "";
  for (let i = 0; i < foo.length; i++) {
    const ascii = u8Arr[i];
    const decodedChar = String.fromCharCode(ascii);
    decoded = decoded.concat(decodedChar);
  }
  console.log(decoded);
})();
