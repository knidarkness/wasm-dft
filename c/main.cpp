#include <math.h>
#include <stdio.h>
#include <vector>
#include <emscripten.h>
    

extern "C" {
    int fib(int n);    
    int calculateDFT(int len, int *points);
    int main();
}

int fib(int n){
    if(n == 0 || n == 1)
        return 1;
    else
        return fib(n - 1) + fib(n - 2);
}

int calculateDFT(int len, int *points)
{
    printf("%d\n", len);
    printf("%d\n", points[0]);
    float Xr[len];
    float Xi[len];
    int i, k, n = 0;

    for (int i = 0; i < len; i++) {
        printf("%d\n", points[i]);
    }

    for (k = 0; k < len; k++)
    {
        Xr[k] = 0;
        Xi[k] = 0;
        for (n = 0; n < len; n++)
        {
            Xr[k] = (Xr[k] + points[n] * cos(2 * M_PI * k * n / len));
            Xi[k] = (Xi[k] - points[n] * sin(2 * M_PI * k * n / len));
        }

        printf("(%f) + j(%f)\n", Xr[k], Xi[k]);
    }

    return 100;
}

// Driver Code
int main()
{
    return 0;
}
