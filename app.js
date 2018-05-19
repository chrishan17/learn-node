const http = require('http')
const url = require('url')
const path = require('path')
const fs = require('fs')

const myExpress = () => {
  const middlewares = []
  const express = (req, res) => {
    middlewares.forEach(middleware => middleware(req, res))
  }
  express.use = middleware => middlewares.push(middleware)
  return express
}

const router = (req, res, next) => {
  req.pathname = url.parse(req.url).pathname
  switch (req.pathname) {
    case '/login':
      req.pathname = 'login.html'
      break
    case '/index':
    case '/':
      req.pathname = 'index.html'
      break
    default:
  }
}

const staticFile = (req, res) => {
  const staticPath = path.join(__dirname, 'public', req.pathname)
  const stream = fs.createReadStream(staticPath)
  stream.on('error', (err) => {
    res.writeHead(404)
    res.write('404 Not Found')
    res.end()
  })
  res.statusCode = 200
  stream.pipe(res)
}

const app = myExpress()

app.use(router)
app.use(staticFile)

const server = http.createServer(app)

server.listen(3000, () => {
  console.log('listening on localhost:3000')
})
