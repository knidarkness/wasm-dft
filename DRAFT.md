# It's 2023 and WebAssembly is still not ready. Or is it?
## A tale about how it was never about performance in the first place.

> The trial never ends
### Plan

* What is WASM
* Simple example
* Interop
* Languages are not fast, algorithms - are

It's almost 2023 and WebAssembly has been around for over 5 years after its initial release in 2017. And yet, is it ready to be used in production environments and deliver the performance of C into JavaScript world?

Let's see for our own. For starters, let's establish a benchmark. We want to measure the "performance in vacuum". This disqualifies a lot of UI interactions, because the transition between WebAssembly and JavaScript adds some overhead which we, for now, want to avoid. So, to give WebAssembly best chances, let's use Fourier transformations as it is a somewhat non-trivial, yet at the same time "pure" computational task.

First of all, we'll need a baseline with a pure JavaScript:

```js
const a:number = 12;
let b:number = 12;
console.log('aaa');
```

The code is not a focus of this article, but overall should be quite understandable. Now, let's see how it runs: 

That was not too bad. 

Now, let me introduce our contenders: 

* Rust, because it's fancy
* Go, because what can be wrong with a "new C"
* C itself, because it will never go away with the amount of legacy it has

Rust
Go
C

Although, there are some differences in performance, overall the results are quite similar. But what if we try a little trick here. You see, up until now we've been implementing and benchmarking the DFT (discrete Fourier transform). It is straightforward and easy to understand and code, but not the fastest algorithm with a time complexity of O(n²). Instead, let's try to implement an FFT (fast Fourier transform) with time complexity of "just" O(n log n). And to make it more interesting, we'll create two versions: JavaScript and Go.

I will not go into details about the algorithm itself, if you'd like to learn more about its history and applications, here is a great post {INSERT_FFT_INFO_LINK}.

In the meantime, here are our two new competitors: JavaScript and Go versions of FFT. The code is neither beautiful, nor most documented, but for now it should suffices.

We will use the same benchmark setup as we did for the DFT.

And here are the results. Yet again, the JavaScript and Go versions are quite similar in performance. 

But let's add our DFT implementations to the comparison: 

And now we see the real difference.

As for WebAssembly, the real marvel is not the 5–10–20% or even 100% of performance boost it can give us. Chances are, that if your application is "very slow" in JavaScript or TypeScript it will be just as slow if you add a bunch of Go/C/Rust code into your application.

To summarize all of this up, I'd like to say this:

Knowing one or more fairly mainstream languages is required to be a software engineer, but definitely not sufficient.

Spend your time learning not about "how" to something in a new fancy language, but instead think about "what" code needs to be written.