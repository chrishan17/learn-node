const http = require('http')
const path = require('path')
const fs = require('fs')

const staticFile = (req, res) => {
  const suffix = path.normalize(req.url).replace(/^(\.\.[\/\\])+/, '')
  const staticPath = path.join(__dirname, 'public', suffix === '/' ? '/index.html' : suffix)

  fs.readFile(staticPath, (err, data) => {
    if (err) {
      res.writeHead(404)
      res.write('404 Not Found')
      res.end()
    }
    res.writeHead(200)
    res.write(data)
    res.end()
  }) 
}

const app = http.createServer(staticFile)

app.listen(3000, () => {
  console.log('listening on localhost:3000')
})
