/**
 * Step One: write the recursive function.
 * 
 * Here, we create a function that calculates
 * the factorial of a number, n. A factorial
 * is the product of all positive integers
 * less than or equal to the number, n.
 */
const factorial = (n) => {
    if (n === 0) return 1; // The base case, to stop recursion
    return n * factorial(n - 1); // The recursive call
  }
  
  /**
   * If we were to call the above with a number as
   * high as, say, 50,000, it would result in a stack
   * overflow.
   */
  
   /**
    * Step Two: modify the recursive function.
    * 
    * In order to trampoline the function, we must
    * return another function instead of calling
    * the recursive function itself. 
    * 
    * This prevents the function from being added 
    * directly to the call stack.
    */
   const facto = (n, a = 1) => {
     if (n === 0) return a;
     return () => facto(n - 1, n * a);
   }
  
   /**
    * Step Three: create a trampoline function.
    * 
    * This function takes another function and a list
    * of arguments, and uses a linear loop rather than
    * traditional recursion to handle the function calls.
    * 
    * This prevents the stack overflow, while still
    * maintaining the declarative approach provided by
    * recursive functions.
    */
   const trampoline = (f, ...args) => {
    let result = f(...args);
    while (typeof result === "function") {
      result = result();
    }
    return result;
  }
  
  /**
   * Now, we can call the factorial function with as high
   * a number as we would like (as long as we don't run into
   * other errors, like exceeding MAX_SAFE_INTEGER, or looping
   * too many times...).
   * 
   * Unfortunately, both of these are the case here, but
   * the principle of trampolining holds!
   */
  console.log(trampoline(facto(10000)))


  // ALAB308A.1.1:

  //Part I: Stack Overflow

  // Step 1: Declare a global counter variable
  let callStackSize = 0;

  // Step 2: Crate a simple recursive function
  function measureCallStackSize() {

    // Increment counter with each function call
    callStackSize++;

    // Recursively call the function
    // This will cintunue until hitting a => Stack Overflow
    measureCallStackSize();

  }

  // Step 3: Wrap the initial function call in a try/catch block
  try{
    // Attempting to call our recursive function
    measureCallStackSize();
  } catch (error) {
    // Step 4: Log the error and value of the counter variable
console.log("Stack Overflow Error: ${error.message}");
console.log("Maximum call stack size: ${callStackSize}");
  }

  // Step 5: Explanation of the results
/*
    What this code does:
    1. Start a counter at 0.
    2. Define a function that increments the counter and calls itself.
    3. Call this function inside a try/catch block. (ref: )
    4. The function calls itself repeatedly, adding to the call stack each time.
    5. Eventually, the call stack reaches its maximum size and throws an error.
    6. Catch this error and log the final count, which represents the maximum call stack size.

    This demonstrates:
    - How recursive functions can lead to stack overflow (via example)
    - The importance of ('base cases') in recursive functions to address/prevent stack overflow
    - How to measure the call stack size in a JavaScript environment
    - The use of try/catch for handling potential stack overflow errors for JS developers
*/

// Part II: Trampolines

// Step 1: Implement a trampoline function
function trampoline(fn) {
    return function(...args) {
        let result = fin(args);
        while (typeof result ==='function') {
            results = results();

        }
        return result;
    };
}

// Step 2: Ex. of trampolining a factorial function
// 2a: Original recursive factorial function (prone to stack overflow)
function factorial(n) {
    if (n <= 1) return n * factorial(n -1);
}

// 2b: Modified factorial function for trampolining
function trampolineFactorial(n, accumulator = 1) {
    if (n <= 1) return accumulator;
    return () => trampolineFactorial(n - 1, n * accumulator);

    // 2c: Create the trampoline version of the factorial function
    const safeFact = tampoline(trampolineFactorial);

    // console.log usage:
    console.log(safeFact(20000)); // will this work w/o stack overflow(?)

    // Step 3: Implement a recursive array flatterning function
    function flatterArray(arr) {
            return arr.reduce((flat, item) => {
                return flat.concat(Array.isArray(item) ? flattenArray(item) : item);
            }, []);
    }



    
}