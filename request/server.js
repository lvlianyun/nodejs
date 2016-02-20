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
handle['/show']=requestHandlers.show;
handle['/submitText']=requestHandlers.submitText;

function start(){

    function onRequest(request, response) {


        var pathname=url.parse(request.url).pathname;

        route.route(pathname,handle,request,response);


    }
    http.createServer(onRequest).listen(8888);

    console.log("Server has started.");
}

exports.start = start;