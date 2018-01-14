const calc = require('./calc')


// Init readline
const readline = require('readline')
// Create the interface
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
})

let numbers = []
let count = 0

rl.setPrompt("Enter Number: ")
rl.prompt()

rl.on('line', (input) => {
    count += 1
    numbers.push(parseInt(input))
    if (count == 4) {
         rl.close() 
    } else {
        rl.prompt()
    }
}).on('close', () => {
    console.log(calc.sum(numbers));
})


// console.log(calc.sum(numbers))

