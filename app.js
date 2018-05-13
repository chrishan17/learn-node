const http = require('http')
const path = require('path')
const fs = require('fs')

const staticFile = (req, res) => {
  const suffix = path.normalize(req.url).replace(/^(\.\.[\/\\])+/, '')
  const staticPath = path.join(__dirname, 'public', suffix === '/' ? '/index.html' : suffix)

  const stream = fs.createReadStream(staticPath)
  stream.on('error', (err) => {
    res.writeHead(404)
    res.write('404 Not Found')
    res.end()
  })
  res.statusCode = 200
  stream.pipe(res)
}

const app = http.createServer(staticFile)

app.listen(3000, () => {
  console.log('listening on localhost:3000')
})
