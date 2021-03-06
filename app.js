const http = require('http')
const url = require('url')
const resolve = require('path').resolve
const send = require('send')
const fs = require('fs')
const logger = require('morgan')

const myExpress = () => {
  const middlewares = []
  const express = (req, res) => {
    middlewares.slice(0, -1).reduceRight((prev, next) => {
      return next.bind(null, req, res, prev)
    }, middlewares.slice(-1)[0].bind(null, req, res))(req, res)
  }
  express.use = middleware => middlewares.push(middleware)
  return express
}

const staticFile = (path, options) => {
  const opts = Object.create(options || null)
  opts.root = resolve(path)

  return (req, res, next) => {
    let pathname = url.parse(req.url).pathname
    const stream = send(req, pathname, opts)
    stream.on('error', () => {
      res.root = opts.root
      next()
    })
    stream.on('file', () => {
      res.statusCode = 200
    })
    stream.pipe(res)
  }
}

const router = (req, res, next) => {
  const pathname = url.parse(req.url).pathname
  switch (pathname) {
    case '/login':
      send(req, resolve(res.root, 'login.html')).pipe(res)
      break
    case '/index':
      send(req, resolve(res.root, 'index.html')).pipe(res)
      break
    default:
      res.statusCode = 404
      res.write('404')
      res.end()
  }
}

const app = myExpress()

app.use(logger('dev'))
app.use(staticFile('public'))
app.use(router)

const server = http.createServer(app)

server.listen(3000, () => {
  console.log('listening on localhost:3000')
})
