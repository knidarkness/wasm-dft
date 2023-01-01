export async function dft(x: number[]): Promise<[number[], number[]]> {
    const Xr = [];
    const Xi = [];

    let i, k, n = 0;
    
    for(k = 0; k < x.length; k++) {
        Xr[k] = 0;
        Xi[k] = 0;
        
        for (n = 0; n < x.length; n++) {
            Xr[k] = (Xr[k] + x[n] * Math.cos(2 * Math.PI * k * n / x.length));
            Xi[k] = (Xi[k] - x[n] * Math.sin(2 * Math.PI * k * n / x.length));
        }

        if (Math.abs(Xr[k]) < 0.000000000001) {
            Xr[k] = 0;
        }

        if (Math.abs(Xi[k]) < 0.000000000001) {
            Xi[k] = 0;
        }
    }
    
    return [Xr, Xi];
}

//@ts-ignore
window.dft = dft;