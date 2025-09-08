 

 1. Difference between var, let, and const

a. var: function-scoped, hoisted (initialized as undefined), allows re-declaration, can leak out of blocks.

b. let: block-scoped, hoisted but in TDZ (can’t use before the declaration), no re-declaration in the same scope.

c. const: block-scoped + must be initialized once; binding can’t be reassigned, but the contents of objects/arrays can still be mutated.


2. Difference between map(), forEach(), and filter()

a. forEach(fn): iterates for side effects; always returns undefined.

b. map(fn): transforms each item and returns a new array of the same length.

c. filter(fn): returns a new array containing only items where the callback returned truthy.


3. What are arrow functions in ES6?

a. A shorter function syntax: const add = (a,b) => a + b;

b. Lexically bind this (no own this), no own arguments, can’t be used as constructors, concise for inline callbacks.


4. How does destructuring assignment work in ES6?

a. Unpacks values from arrays/objects into variables:

b. Arrays: const [first, , third] = arr;

c. Objects: const {name, price: cost, category = 'Tree'} = item;

d. Supports defaults, renaming, nested patterns, and works in function params.


5. Template literals vs. string concatenation

a. Template Literals (New in ES6)

1.Written with backticks ( ` ).

2.Use ${expression} to embed variables or expressions directly inside the string.

3.Support multi-line strings without needing \n.

4.Support tagged templates for advanced use cases.


b. String Concatenation (Old Method)

1.Uses the + operator to join strings.

2.Becomes harder to read when multiple variables are involved.

3.Requires \n to create multi-line strings.