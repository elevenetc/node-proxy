const http = require('http');
const httpProxy = require('http-proxy');

const hostname = '0.0.0.0';
const port = 3000;

var proxy = httpProxy.createProxyServer({});

const server = http.createServer((req, res) => {

    proxy.web(req, res, { target: 'https://chat-us-east-staging.stream-io-api.com' });

    var data = [];

    req.on('data', function(chunk) {
        data.push(chunk);
    }).on('end', function() {
        //at this point data is an array of Buffers
        //so Buffer.concat() can make us a new Buffer
        //of all of them together
        var buffer = Buffer.concat(data);
        console.log("body:")
        console.log(buffer.toString());
        console.log("headers:")
        console.log(req.headers)
    });
});

server.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
});