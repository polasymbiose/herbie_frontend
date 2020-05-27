const express = require('express')
const React = require('react')
const next = require('next')

const app = next({ dev: false })
const handle = app.getRequestHandler()

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

  server.listen(41161, (err) => {
    if (err) throw err
    console.log('> Ready on http://localhost:41161')
  })
})
.catch((ex) => {
  console.error(ex.stack)
  process.exit(1)
})
