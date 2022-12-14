require('dotenv').config({path: __dirname + '/.env'})

const { MongoClient, ServerApiVersion } = require('mongodb');

const http = require('http');
var url = require('url')
var views = require('./views');

const hostname = '127.0.0.1';
const port = 3000;

/*const server = http.createServer((req, res) => {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/html');
  res.end('Hello <i>World</i>');
});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
  //main().catch(console.error);
});*/

const app = http.createServer(onRequest).listen(port);

function onRequest(request, response){
  var path = url.parse(request.url).pathname;
  views.loadView(response, path);
}

async function main(){
    const uri = "mongodb+srv://"+process.env['MONGODB_USER']+":"+process.env['MONGODB_PASS']+"@"+process.env['MONGODB_HOST']+"/?retryWrites=true&w=majority";
	const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

    try {
        await client.connect();

		/*client.connect(err => {
			const collection = client.db("r-analytics").collection("user");


		  client.close();
		});*/
		await  listDatabases(client);

    } catch (e) {
        console.error(e);
    } finally {
        await client.close();
    }
}


async function listDatabases(client){
    databasesList = await client.db().admin().listDatabases();

    console.log("Databases:");
    databasesList.databases.forEach(db => console.log(` - ${db.name}`));
};