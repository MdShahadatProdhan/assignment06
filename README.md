 

 1) Difference between var, let, and const

a. var: function-scoped, hoisted (initialized as undefined), allows re-declaration, can leak out of blocks.

b. let: block-scoped, hoisted but in TDZ (can’t use before the declaration), no re-declaration in the same scope.

c. const: block-scoped + must be initialized once; binding can’t be reassigned, but the contents of objects/arrays can still be mutated.


2) Difference between map(), forEach(), and filter()

a. forEach(fn): iterates for side effects; always returns undefined.

b. map(fn): transforms each item and returns a new array of the same length.

c. filter(fn): returns a new array containing only items where the callback returned truthy.


3) What are arrow functions in ES6?

a. A shorter function syntax: const add = (a,b) => a + b;

b. Lexically bind this (no own this), no own arguments, can’t be used as constructors, concise for inline callbacks.