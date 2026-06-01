const http = require('http');
const fs = require('fs');
const path = require('path');
const mime = {
  '.html':'text/html;charset=utf-8','.css':'text/css','.js':'text/javascript',
  '.jpg':'image/jpeg','.jpeg':'image/jpeg','.png':'image/png','.gif':'image/gif',
  '.svg':'image/svg+xml','.ico':'image/x-icon','.mp4':'video/mp4'
};
http.createServer((req,res)=>{
  let url = req.url === '/' ? '/index.html' : req.url;
  let fp = path.join(__dirname, url);
  let ext = path.extname(fp).toLowerCase();
  if (!fs.existsSync(fp)) {
    res.writeHead(404); res.end('Not Found');
    return;
  }
  let ct = mime[ext] || 'application/octet-stream';
  res.writeHead(200, {'Content-Type': ct});
  fs.createReadStream(fp).pipe(res);
}).listen(3000, ()=>console.log('Server running on http://localhost:3000'));
