var router = require('./routes');
let fs = require('fs');

function showPage(response, path){
	if(router.route[path]){
		response.writeHead(200, {'Content-Type': 'text/html'})
		fs.readFile(router.route[path], null, function (error, data) {
			if (error) {
				response.writeHead(404);
				response.write('Whoops! Source File not found!');
			} else {
				response.write(data);
			}
			response.end();
		});
	} else {
		response.writeHead(404, {'Content-Type': 'text/html'})
		response.write('<h1>404</h1> Router not found');
		response.end();
	}
}

exports.loadView = showPage;