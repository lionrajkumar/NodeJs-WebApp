var router = require('./routes');

function showPage(response, pathName){
	if(router.route[pathName]){
		response.writeHead(200, {'Content-Type': 'text/html'})
		response.write(router.route[pathName]);
		response.end();
	} else {
		response.writeHead(404, {'Content-Type': 'text/html'})
		response.write('404 Page not found');
		response.end();
	}
}

exports.loadView = showPage;