const http = require('http')
const path = require('path')
const fs = require('fs')

const app = http.createServer((req, res) => {
  if (req.url === '/') {
    const htmlPath = path.join(__dirname, 'public', 'index.html')
    fs.readFile(htmlPath, (err, data) => {
      if (err) throw err
      res.writeHead(200, {'Content-Type': 'text/html'})
      res.end(data)
    })
  } else if (req.url.match('.css$')) {
    const cssPath = path.join(__dirname, 'public', req.url)
    fs.readFile(cssPath, (err, data) => {
      if (err) throw err
      res.writeHead(200, {'Content-Type': 'text/css'})
      res.end(data)
    })
  } else if (req.url.match('.js$')) {
    const jsPath = path.join(__dirname, 'public', req.url)
    fs.readFile(jsPath, (err, data) => {
      if (err) throw err
      res.writeHead(200, {'Content-Type': 'text/javascript'})
      res.end(data)
    })
  } else {
    res.writeHead(404)
    res.write('404 Not Found')
    res.end()
  }
})

app.listen(3000, () => {
  console.log('listening on localhost:3000')
})

console.log('starting')
