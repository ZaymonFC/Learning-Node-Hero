// Includes for all excercises
const fs = require('fs')


// ─── EXAMPLE 1 ──────────────────────────────────────────────────────────────────
//  This is a synchronous example of blocking file read
// ────────────────────────────────────────────────────────────────────────────────

// Init FileStream
let content
try {
    content = fs.readFileSync('file.md', 'utf-8')
} catch (exception) {
    console.log(exception)
}
console.log(content)

// ─── EXAMPLE 2 ──────────────────────────────────────────────────────────────────
// This is an error-first callback example
// - Error handling
// - No return value
// ────────────────────────────────────────────────────────────────────────────────
fs.readFile('file.md', 'utf-8', (err, content) => {
    if (err) {
        return console.log(err)
    }
    console.log(content)
})

//
// ─── EXAMPLE 3,4 ────────────────────────────────────────────────────────────────
// Same example one using Async.js and another using promises
// ────────────────────────────────────────────────────────────────────────────────
async.parallel(['file1', 'file2', 'file3'], fs.stat, (err, results) => {
    // results is now an array of stats for each file
})

function stats (file) {
    return new Promise((resolve, reject) => {
        fs.stat(file, (err, data) => {
            if (err) {
                return reject (err)
            }
            resolve(data)
        })
    })
}
// This waits until all of them promises have been resolved or rejected
Promise.all([
    'file1', 
    'file2', 
    'file3'
])
.then((data) => console.log(data))
.catch((err) => console.log(err))


    
