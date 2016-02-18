var http = require('http');
// node 执行命令：npm install phantom
var phantom = require('phantom');
var url = require('url');
var PORT = 9988;
 var PROXY_CONTEXT_PATH = 'http://localhost:9988';
// var PROXY_CONTEXT_PATH = 'http://www.darenloan.com';
//var PROXY_CONTEXT_PATH = 'http://daren8.vicp.cc:8112';
//var PROXY_CONTEXT_PATH = 'http://192.168.1.235';
console.info(33);
http.createServer(function(request, response) {

	var phantomjs_url = url.resolve(PROXY_CONTEXT_PATH, request.url);
	console.info(phantomjs_url);
	phantom.create(function(ph) {
		ph.createPage(function(page) {
			page.open(phantomjs_url, function (status) {
				if(status == 'success') {
					var delay, interflag = false, intersum=0, checker = (function() {
						intersum += 100;
						page.evaluate(function () {
							if(document.querySelector("div[data-status=ready]")) {
								return document.getElementsByTagName('html')[0].outerHTML;
							}
						}, function(result) {
							interflag = writeHtml(result, delay, ph);
						});

						if(intersum >= 1000 && !interflag) {
							page.evaluate(function() {

								var title = document.getElementsByTagName('title')[0];
								var keywords = document.getElementsByName('keywords')[0];
								var description = document.getElementsByName('description')[0];

								if(!keywords.getAttribute('content') || !title.innerHTML){
									title.innerHTML = '专注小微金融,成就理财达人_互联网金融_p2p小额信贷投资理财平台-达人贷';
									keywords.setAttribute('content', '互联网金融,p2p网贷平台,p2p投资理财平台,达人贷');
									description.setAttribute('content', '达人贷是首家资金全托管的互联网金融平台，提供安全可靠的投资理财服务。100元起投，10-15%年化收益,0费用，100%本息保障计划，随时可以赎回，轻松战胜CPI');
								}

								return document.getElementsByTagName('html')[0].outerHTML;
							}, function(result) {
                                 console.info(result);
								writeHtml((result||'<html></html>'), delay, ph);
							});
						}
					});
					delay = setInterval(checker, 100);
				}
			});
		});
	},{
		dnodeOpts: {weak: false}
	});

	function writeHtml(html, delay, ph) {
		if(!html) return;
		clearTimeout(delay);
		response.write(html);
		response.end();

		ph.exit();
		return true;
	}
}).listen(PORT);

process.on('uncaughtException', function (err) {
	 console.log(err);
});


