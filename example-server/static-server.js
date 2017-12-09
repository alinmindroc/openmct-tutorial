var express = require('express');
var cors = require('cors')

function StaticServer(port) {
    var server = express();
    server.use(cors())
    
    server.use('/', express.static(__dirname + '/..'));
	server.use('/static', express.static(__dirname + '/../static'));
    
    console.log('Open MCT hosted at http://localhost:' + port);
    
    server.listen(port);
}

module.exports = StaticServer;
