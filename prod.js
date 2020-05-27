const express = require('express')
const React = require('react')
const next = require('next')

const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev })
const handle = app.getRequestHandler()
const port = 3022
app.prepare()
.then(() => {
  const server = express()
  server.use((req, res) => handle(req, res));

  server.get('/', (req, res) => {
    return handle(req, res)
  })

  // server.post('/api/sendmail', (req, res) => {
  //   return handle(req, res)
  // })

  server.listen(port, (err) => {
    if (err) throw err
    console.log('> Ready on 0.0.0.0:' + port)
  })
})
.catch((ex) => {
  console.error(ex.stack)
  process.exit(1)
})

