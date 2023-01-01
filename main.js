let _cppcCalculateDFT;
let _goWasm;
let _go;

async function getCppDft() {
    if (!_cppcCalculateDFT) {
        _cppcCalculateDFT = Module.cwrap("calculateDFT", "number", ["number", "number"]);
    }
    return _cppcCalculateDFT;
}

async function getGoDFT() {
    if (!_goWasm) {
        _go = new Go();
        _goWasm = await WebAssembly.instantiateStreaming(fetch("/go/dist/main.wasm"), _go.importObject)
        _go.run(_goWasm.instance);
    }

    return {
        _go,
        _goWasm,
    }
}

async function cppCalculateDFT(input) {
    const calculateDFT = await getCppDft();
    const intArray = new Int32Array(input);
    const bytes_per_element = intArray.BYTES_PER_ELEMENT;
    var buf = Module._malloc(intArray.length * bytes_per_element);
    Module.HEAP32.set(intArray, buf >> 2);
    calculateDFT(intArray.length, buf)
    Module._free(buf);
}

async function goCalculateDFT(input) {
    const { _go, _goWasm } = await getGoDFT();
    const intArray = new Int32Array(input);
    const u8s_plainJS = new Uint8Array(intArray.buffer);
    _go_DFT_naive(u8s_plainJS);

}

async function benchmarDFT(funcsMap, inputLength) {
    for (const [name, func] of Object.entries(funcsMap)) {
        console.log('will test ', name);
        let totalTime = 0;
        for (let i = 0; i < 20; i++) {
            const testArray = new Array(inputLength).fill(0).map(e => Math.random() * 20);
            if (i % 5 === 0) {
                console.log(name, 'run', i);
            }
            const start = Date.now();
            await func(testArray);
            const end = Date.now();
            totalTime += (end - start) / 20;
        }

        console.log(name, 'average time is', totalTime, 'for input array length of', inputLength);
    }
}

document.addEventListener("DOMContentLoaded", () => {
    document.getElementById('js-pure').addEventListener('click', () => {
        console.log(dft([1, -1, 1, -1]));
    });

    document.getElementById('cpp-wasm').addEventListener('click', () => {
        cppCalculateDFT([1, -1, 1, -1]);
    });

    document.getElementById('go-wasm').addEventListener('click', () => {
        goCalculateDFT([1, -1, 1, -1]);
    });

    document.getElementById('benchmark').addEventListener('click', async () => {
        await benchmarDFT({
            'go': goCalculateDFT,
            'cpp': cppCalculateDFT,
            'js': dft,
        }, 100);
        await benchmarDFT({
            'go': goCalculateDFT,
            'cpp': cppCalculateDFT,
            'js': dft,
        }, 500);
        await benchmarDFT({
            'go': goCalculateDFT,
            'cpp': cppCalculateDFT,
            'js': dft,
        }, 1500);
        // await benchmarDFT({
        //     'go': goCalculateDFT,
        //     'cpp': cppCalculateDFT,
        //     'js': dft,
        // }, 3000);
        // await benchmarDFT({
        //     'go': goCalculateDFT,
        //     'cpp': cppCalculateDFT,
        //     'js': dft,
        // }, 5000);
    });
})
