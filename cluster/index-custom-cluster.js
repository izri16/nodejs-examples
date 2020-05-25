// pm2 (npm install -g pm2)

// each "child process" in cluster will only have one thread available
process.env.UV_THREADPOOL_SIZE = 1 // just for experiment, default should be 4

// List node prcesses: ps -e | grep node
// When running two forks, this will list "three" node procesess,
// 1 for "master" and two forked children

// using apache-benchmark for benchmark node server (ab command)

// -n make a total 500 requests
// -c (concurrency of 50), try to make 50 requests at the same time
// -> read like make 500 requests, and make sure that are are always at least 50 pending
// ab -c 50 -n 500 localhost:3000/fast

// benchmark single request
// ab -c 1 -n 1 localhost:3000/

// benchark two request created in the same time
// ab -c 2 -n 2 localhost:3000/

const cluster = require('cluster')

if (cluster.isMaster) {
  // cause "index.js" to be executed again in "child mode"
  
  cluster.fork()
  cluster.fork()
} else {
  // child is goin to act like a server

  const crypto = require('crypto')

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
}
