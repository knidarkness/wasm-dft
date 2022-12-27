#include <math.h>
#include <stdio.h>
#include <vector>
#include <emscripten.h>
    

extern "C" {
    int fib(int n);    
    void calculateDFT(std::vector<int> *points);
    int main();
}

int fib(int n){
    if(n == 0 || n == 1)
        return 1;
    else
        return fib(n - 1) + fib(n - 2);
}

void calculateDFT(std::vector<int> *points)
{
    float Xr[points->size()];
    float Xi[points->size()];
    int i, k, n = 0;

    for (k = 0; k < points->size(); k++)
    {
        Xr[k] = 0;
        Xi[k] = 0;
        for (n = 0; n < points->size(); n++)
        {
            Xr[k] = (Xr[k] + points->at(n) * cos(2 * 3.141592 * k * n / points->size()));
            Xi[k] = (Xi[k] - points->at(n) * sin(2 * 3.141592 * k * n / points->size()));
        }

        printf("(%f) + j(%f)\n", Xr[k], Xi[k]);
    }
}

// Driver Code
int main()
{
    std::vector<int> v = std::vector<int>();

    v.push_back(1);
    v.push_back(0);
    v.push_back(1);
    v.push_back(0);
    calculateDFT(&v);

    return 0;
}
