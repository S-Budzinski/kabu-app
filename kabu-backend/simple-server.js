// simple-server.js
const http = require('http');
const port = process.env.PORT || 4242;
const host = '0.0.0.0';
const server = http.createServer((req,res)=>{
  if(req.url === '/api/health'){
    res.writeHead(200, {'Content-Type':'application/json'});
    return res.end(JSON.stringify({ ok: true, time: new Date().toISOString() }));
  }
  res.writeHead(200);
  res.end('simple server ok');
});
server.listen(port, host, ()=> console.log(`simple server listening ${host}:${port}`));
