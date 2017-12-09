var express = require('express');
var cors = require('cors')

function HistoryServer(spacecraft, port) {
    server = express();
    server.use(cors())

    server.get('/telemetry/:pointId', function (req, res) {
        var start = +req.query.start;
        var end = +req.query.end;
        var ids = req.params.pointId.split(',');
    
        var response = ids.reduce(function (resp, id) {
            return resp.concat(spacecraft.history[id].filter(function (p) {
                return p.timestamp > start && p.timestamp < end;
            }));
        }, []);
        res.status(200).json(response).end();
    });

    server.listen(port);
    console.log('History server now running at http://localhost:' + port);
}

module.exports = HistoryServer;
