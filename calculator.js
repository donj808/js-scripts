/***
 * A recursive method to calculate the mathematical expression of an array
 * 
 * i.e.
 * input: [1, '*', '(', 2, ')']
 * output: 2
 */

(function() {

    const operands = ['*', '/', '+', '-'];
    const brackets = ['(', ')'];

    var calculateEquation = function( equationArray, pos=0, currentVal = 0) {
        
        if ( pos >= equationArray.length ) {
            // exit
            return currentVal;
        }

        val = equationArray[pos];

        if ( operands.includes( val ) ) {
            if ( val == '*' ) {
                return ( currentVal * calculateEquation( equationArray, pos+1, currentVal ) );
            }
            else if ( val == '/' ) {
                return ( currentVal / calculateEquation( equationArray, pos+1 , currentVal) );
            }
            else if ( val == '-' ) {
                return ( currentVal - calculateEquation( equationArray, pos+1, currentVal) );
            }
            else {
                return ( currentVal + calculateEquation( equationArray, pos+1, currentVal) );
            }
        }

        if ( brackets.includes( val ) ) {

            if ( val == '(' ) {
                subEquationArray = equationArray.slice(pos+1, findEndingBracket(equationArray, pos) );
                return calculateEquation( equationArray, pos + subEquationArray.length + 2, calculateEquation( subEquationArray ) );
            }

        }

        if ( parseInt( val ) ){
            return calculateEquation( equationArray, pos+1, val );
        }

    };

    var findEndingBracket = (array, startingIdx) => {
        let openBracketStack = [];
    
        for (let i = startingIdx; i < array.length; i++) {
            if (array[i] === '(') {
                openBracketStack.push(array[i]);
            } else if (array[i] === ')') {
                openBracketStack.pop();
                if (openBracketStack.length === 0) return i;
            }
        }
    }

    // console.log(calculateEquation([1, '*', '(', 2, ')'])) // => 2
    // console.log(calculateEquation([1, '*', '(', 2, ')'])) // => 2
    // console.log(calculateEquation([1, '*', '(', 2, '+', 2, ')'])) // => 4
    // console.log(calculateEquation([1, '+', '(', 2, '+', 2, ')', '*', '(', 2, '+', 2, ')'])) // => 17
    // console.log(calculateEquation([1, '*', '(', 2, '+', 2, '*', '(', 2, '+', 2, ')', ')'])) // => 10
    // console.log(calculateEquation([1, '*', '(', 2, ')'])) // => 2
    // console.log(calculateEquation(['(', 4, '-', 2,')', '*' , '3.5'])) // => 7

})();


