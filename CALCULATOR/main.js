let a=12;
let b=4;

const add=require("./add");
const subtract=require("./subtract");
const multiply=require("./multiply");
const divide=require("./divide");

// calling addition function---------------------------------
var result=add(a,b);
console.log(result);

// calling subtract function---------------------------------
var sub=subtract(a,b)
console.log(sub);

// calling multiply function---------------------------------
var mul=multiply(a,b);
console.log(mul);

// calling divide function---------------------------------
var div=divide(a,b);
console.log(div)