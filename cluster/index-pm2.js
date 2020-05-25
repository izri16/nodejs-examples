// pm2 (npm install -g pm2)

// pm2 start index-pm2.js -i 0 (let pm2 decide how many instances to create)
// by default pm2 will create as many processes as total number of logical cors

// logical core = n. physical cores * (number of threads one core can proceed at once)

/*

pm2 start index-pm2.js -i 0
pm2 list
pm2 show index-pm2
pm2 monit
pm2 delete index-pm2

*/

// pm2 automatically restarts crashed children

// we usually use pm2 only with production environment
// does not make much sense to use it for development environment

function doWorkNaive(duration) {
  const start = Date.now()
  while(Date.now() - start < duration) {
    // do nothing, just consume CPU power for duration
  }
}

function doWorkReal(cb) {
  crypto.pbkdf2('a', 'b', 100000, 512, 'sha512', () => {
    cb()
  })
}

const express = require('express')
const app = express()

app.get('/', (req, res) => {
  doWorkReal(() => res.send('Hi there'))
})

app.get('/fast', (req, res) => {
  res.send('This was fast!')
})

app.listen(3000)
