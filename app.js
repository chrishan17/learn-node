const http = require('http')
const url = require('url')
const path = require('path')
const fs = require('fs')

const router = (req, res) => {
  let pathname = url.parse(req.url).pathname
  switch (pathname) {
    case '/login':
      pathname = 'login.html'
      break
    case '/index':
    case '/':
      pathname = 'index.html'
      break
    default:
  }

  staticFile(pathname, res)
}

const staticFile = (pathname, res) => {
  const staticPath = path.join(__dirname, 'public', pathname)
  const stream = fs.createReadStream(staticPath)
  stream.on('error', (err) => {
    res.writeHead(404)
    res.write('404 Not Found')
    res.end()
  })
  res.statusCode = 200
  stream.pipe(res)
}

const app = http.createServer(router)

app.listen(3000, () => {
  console.log('listening on localhost:3000')
})
