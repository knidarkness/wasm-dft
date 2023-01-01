#include <math.h>
#include <stdio.h>
#include <vector>
#include <emscripten.h>
    

extern "C" {
    int calculateDFT(int len, int *points);
    int main();
}

int calculateDFT(int len, int *points)
{
    float Xr[len];
    float Xi[len];
    int i, k, n = 0;

    for (k = 0; k < len; k++)
    {
        Xr[k] = 0;
        Xi[k] = 0;
        for (n = 0; n < len; n++)
        {
            Xr[k] = (Xr[k] + points[n] * cos(2 * M_PI * k * n / len));
            Xi[k] = (Xi[k] - points[n] * sin(2 * M_PI * k * n / len));
        }

        // printf("(%f) + j(%f)\n", Xr[k], Xi[k]);
    }
    printf("%f", Xr[2]);
    return 0;
}

// Driver Code
int main()
{
    return 0;
}
