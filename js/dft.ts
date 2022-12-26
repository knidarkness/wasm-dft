import * as math from 'mathjs';

export function dft(x: number[]): math.Complex[] {
    console.log(x);
    const X: math.Complex[] = [];

    for(let f = 0; f < x.length; f++) {
        let signal: math.Complex = math.complex();

        for (let t = 0; t < x.length; t++) {
            const amplitude = x[t];

            const rotation = -1 * (2 * Math.PI) * f * (t / x.length);

            const contribution = math.multiply(math.complex(Math.cos(rotation), Math.sin(rotation)), amplitude) as math.Complex;

            signal = math.add(signal, contribution);
        }

        if (Math.abs(signal.re) < 0.000001) {
            signal.re = 0;
        }

        if (Math.abs(signal.im) < 0.000001) {
            signal.im = 0;
        }

        signal = math.divide(signal, x.length) as math.Complex;
        X[f] = signal;
    }
    
    return X;
}

//@ts-ignore
window.dft = dft;