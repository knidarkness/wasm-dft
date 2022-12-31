function cppCalculateDFT() {
    const calculateDFT = Module.cwrap("calculateDFT", "number", ["number", "number"]);
    const intArray = new Int32Array([1, -1, 1, -1]);
    const bytes_per_element = intArray.BYTES_PER_ELEMENT;
    var buf = Module._malloc(intArray.length * bytes_per_element);
    Module.HEAP32.set(intArray, buf >> 2);
    console.log(calculateDFT(intArray.length, buf));
    Module._free(buf);
}

function goCalculateDFT() {
    const go = new Go();
    WebAssembly.instantiateStreaming(fetch("/go/dist/main.wasm"), go.importObject).then((result) => {
        go.run(result.instance);
        const intArray = new Int32Array([1, -1, 1, -1]);
        const u8s_plainJS = new Uint8Array(intArray.buffer);
        _go_DFT_naive(u8s_plainJS);
    });
}

document.addEventListener("DOMContentLoaded", () => {
    document.getElementById('js-pure').addEventListener('click', () => {
        console.log(dft([1, -1, 1, -1]));
    });

    document.getElementById('cpp-wasm').addEventListener('click', () => {
        cppCalculateDFT();
    });

    document.getElementById('go-wasm').addEventListener('click', () => {
        goCalculateDFT();
    });
})
