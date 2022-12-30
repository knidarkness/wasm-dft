function cppCalculateDFT() {
    const calculateDFT = Module.cwrap("calculateDFT", "number", ["number", "number"]);
    const intArray = new Int32Array([1, 0, 1, 0]);
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
    });
}

document.addEventListener("DOMContentLoaded", () => {
    console.log('hello');

    document.getElementById('js-pure').addEventListener('click', () => {
        console.log(dft([1, 0, 1, 0]));
    });

    document.getElementById('cpp-wasm').addEventListener('click', () => {
        cppCalculateDFT();
    });

    document.getElementById('go-wasm').addEventListener('click', () => {
        goCalculateDFT();
    });

    setTimeout(() => {
        cppCalculateDFT();
    }, 100);
})
