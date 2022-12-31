package main

import (
	"encoding/binary"
	"math"

	"syscall/js"
)

func chunkSlice(slice []byte, chunkSize int) [][]byte {
	var chunks [][]byte
	for {
		if len(slice) == 0 {
			break
		}

		// necessary check to avoid slicing beyond
		// slice capacity
		if len(slice) < chunkSize {
			chunkSize = len(slice)
		}

		chunks = append(chunks, slice[0:chunkSize])
		slice = slice[chunkSize:]
	}

	return chunks
}

func js_buffer_to_float64_slice(input []byte) []float64 {
	uint8_parts := chunkSlice(input, 4)

	dft_points := make([]float64, len(uint8_parts))

	for i := 0; i < len(uint8_parts); i++ {
		negative := uint8_parts[i][3]&1 == 1
		point := int64(binary.LittleEndian.Uint32(uint8_parts[i]))
		if negative {
			point -= 4294967296
		}
		dft_points[i] = float64(point)
	}

	return dft_points
}

func DFT_naive(this js.Value, args []js.Value) interface{} {
	input_array := make([]byte, args[0].Get("byteLength").Int())
	js.CopyBytesToGo(input_array, args[0])

	dft_points := js_buffer_to_float64_slice(input_array)

	real := make([]float64, len(dft_points))
	imag := make([]float64, len(dft_points))
	arg := -2.0 * math.Pi / float64(len(dft_points))
	for k := 0; k < len(dft_points); k++ {
		r, i := 0.0, 0.0
		for n := 0; n < len(dft_points); n++ {
			r += dft_points[n] * math.Cos(arg*float64(n)*float64(k))
			i += dft_points[n] * math.Sin(arg*float64(n)*float64(k))
		}

		if r < 0.00001 {
			r = 0
		}

		if i < 0.00001 {
			i = 0
		}
		println(r)
		real[k], imag[k] = r, i
	}
	return 0
}

func main() {
	c := make(chan struct{}, 0)

	js.Global().Set("_go_DFT_naive", js.FuncOf(DFT_naive))

	<-c
}
