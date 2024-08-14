const http = require('http');
const fs = require('fs');
const path = require('path');

const port = 8080; // Port 8080 is commonly used as an alternative HTTP port for web servers. While the default port for HTTP traffic is 80, using port 8080 allows a server to run multiple web applications or services on the same machine.

const server = http.createServer((req, res) => {
    let filePath = '';

    switch (req.url) {
        case '/':
            filePath = 'index.html';
            break;
        case '/about':
            filePath = 'about.html';
            break;
        case '/contact':
            filePath = 'contact.html';
            break;
        default:
            filePath = '404.html';
            break;
    }

    const fullPath = path.join(__dirname, filePath); // environment variable that tells you the absolute path of the directory containing the currently executing file.

    fs.readFile(fullPath, (err, content) => {
        if (err) {
            res.writeHead(500, {'Content-Type': 'text/html'}); // 500 Internal Server Error
            res.end('<h1>500 Server Error</h1>', 'utf-8');
        } else {
            res.writeHead(200, {'Content-Type': 'text/html'}); // success
            res.end(content, 'utf-8');
        }
    });
});

server.listen(port, () => { // Basically the server is listening for when a connection happens
    console.log(`Server running at http://localhost:${port}/`);
});
