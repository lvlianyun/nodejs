/**
 * Created by lvly on 2016/2/17.
 */
var http = require("http");
var url = require("url");
var  fs= require('fs');

http.createServer(function (request, response) {
    var params = url.parse(request.url, true).query;//获取url上面的参数
    response.writeHead(200, {'Content-Type': 'text/html'});
    fs.readFile('../test.html','utf8',function (err,data){
        console.log(data);
        response.end(data);
    });
   // response.end();

}).listen(2015);
console.log('Server running at http://127.0.0.1:2015?zzl=1234');