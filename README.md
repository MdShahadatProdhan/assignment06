 

 1) Difference between var, let, and const

var: function-scoped, hoisted (initialized as undefined), allows re-declaration, can leak out of blocks.

let: block-scoped, hoisted but in TDZ (can’t use before the declaration), no re-declaration in the same scope.

const: block-scoped + must be initialized once; binding can’t be reassigned, but the contents of objects/arrays can still be mutated.


