/**
 * Created by lvly on 2016/2/19.
 */

var fs= require('fs');
var querystring = require("querystring");

var formidable = require("formidable");

//首次进来显示html 表单信息
function  start(request,response){

    console.info('start');

    fs.readFile('form.html','utf8',function(err,data){

        response.writeHead(200, {'Content-Type': 'text/html'});
        response.end(data);
    });




}
function  show(request,response){

    console.log("Request handler 'show' was called.");

    fs.readFile("./tmp/test.png", "binary", function(error, file) {

        if(error) {

            response.writeHead(500, {"Content-Type": "text/plain"});

            response.write(error + "\n");

            response.end();

        } else {

            response.writeHead(200, {"Content-Type": "image/png"});

            response.write(file, "binary");

            response.end();
        }

    });
}

function  submitText(request,response){

    var postData = "";
    request.setEncoding("utf8");
    request.addListener("data", function(postDataChunk) {

        postData += postDataChunk;

    });


    request.addListener("end",function(){
        response.writeHead(200, {'Content-Type': 'text/plain'});
        response.write("You've sent the text: "+ querystring.parse(postData).text);
        response.end();
    })

}

function  upload(request,response){
    var form = new formidable.IncomingForm();
    var  post = {},
        file = {};
    form.uploadDir = 'tmp';

    form.on('error', function(err) {
        console.log(err); //各种错误
    })
    //POST 普通数据 不包含文件 field 表单name value 表单value
    .on('field', function(field, value) {
            console.info("field=="+value);
            if (form.type == 'multipart') {  //有文件上传时 enctype="multipart/form-data"
                if (field in post) { //同名表单 checkbox 返回array 同get处理
                    if (util.isArray(post[field]) === false) {
                        post[field] = [post[field]];
                    }
                    post[field].push(value);
                    return;
                }
            }
            post[field] = value;
        })
    .on('file', function(field, file) { //上传文件
            file[field] = file;
        })
    .on('end', function() {

       console.info('end');

    });

    form.parse(request, function(error, fields, files) {
        // parse负责解析文件
        console.log("parsing done");
        console.info(files);
        fs.renameSync(files.upload.path, "./tmp/test.png");
        // fs模块的renameSync进行重命名
        response.writeHead(200, {"Content-Type": "text/html"});

        response.write(querystring.stringify(post));

        response.write("<img src='/show' />");
        // 使用img 标签来显示图片 ，因为show方法会返回一张图片
        response.end();
    });

}
exports.submitText=submitText;
exports.start=start;
exports.upload=upload;
exports.show=show;

