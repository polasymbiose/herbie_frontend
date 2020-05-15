const express = require('express')
const React = require('react')
const next = require('next')

const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev })
const handle = app.getRequestHandler()

app.prepare()
.then(() => {
  const server = express()
  server.use((req, res) => handle(req, res));

  server.get('*', (req, res) => {
    return handle(req, res)
  })

  server.post('/api/sendmail', (req, res) => {
    return handle(req, res)
  })

  server.listen(41160, '::', (err) => {
    if (err) throw err
    console.log('> Ready on http://localhost:41160')
  })
})
.catch((ex) => {
  console.error(ex.stack)
  process.exit(1)
})


// const port = parseInt(process.env.PORT, 10) || 41160
// const dev = process.env.NODE_ENV !== 'production'
// const app = next({ dev })
// const handle = app.getRequestHandler()

// app.prepare().then(() => {
//   const server = express()

//   // server.get('/', (req, res) => {
//   //   return app.render(req, res, '/', req.query)
//   // })


//   server.all('*', (req, res) => {
//     return handle(req, res)
//   })

//   server.listen(port, err => {
//     if (err) throw err
//     console.log(`> Ready on http://localhost:${port}`)
//   })
// })