package main

import (
	"fmt"
	"math"
)

func DFT_naive(input []float64) ([]float64, []float64) {
	real := make([]float64, len(input))
	imag := make([]float64, len(input))
	arg := -2.0 * math.Pi / float64(len(input))
	for k := 0; k < len(input); k++ {
		r, i := 0.0, 0.0
		for n := 0; n < len(input); n++ {
			r += input[n] * math.Cos(arg*float64(n)*float64(k))
			i += input[n] * math.Sin(arg*float64(n)*float64(k))
		}
		real[k], imag[k] = r, i
	}
	return real, imag
}

func main() {
	// create input data

	x := []float64{1.0, 0, 1.0, 0}

	// DFT
	real, _ := DFT_naive(x)

	for key, value := range real {
		fmt.Println(key, value)
	}
}
