import * as math from 'mathjs';

export async function dft(x: number[]): Promise<math.Complex[]> {
    const X: math.Complex[] = [];
    const N = x.length;

    for(let f = 0; f < N; f++) {
        let signal: math.Complex = math.complex();

        for (let t = 0; t < N; t++) {
            const amplitude = x[t];

            const rotation = -1 * (2 * Math.PI) * f * (t / N);

            const point = math.complex(Math.cos(rotation), Math.sin(rotation));
            const contribution = math.multiply(point, amplitude) as math.Complex;

            signal = math.add(signal, contribution);
        }

        if (Math.abs(signal.re) < 0.000000000001) {
            signal.re = 0;
        }

        if (Math.abs(signal.im) < 0.000000000001) {
            signal.im = 0;
        }

        // signal = math.divide(signal, N) as math.Complex;
        X[f] = signal;
    }
    
    return X;
}

//@ts-ignore
window.dft = dft;