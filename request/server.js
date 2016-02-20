/**
 * Created by lvly on 2016/2/19.
 */

var http = require('http');

var url=require('url');

var route=require('./route');

var requestHandlers = require('./requestHandlers');

var handle={};


handle['/']=requestHandlers.start;
handle['/start']=requestHandlers.start;
handle['/upload']=requestHandlers.upload;


function start(){

    function onRequest(request, response) {


        var pathname=url.parse(request.url).pathname;

        var content= route.route(pathname,handle);

        response.writeHead(200, {"Content-Type": "text/plain"});

        response.write(content);

        response.end();

    }
    http.createServer(onRequest).listen(8888);

    console.log("Server has started.");
}

exports.start = start;