var express = require('express');
var cors = require('cors');
var mysql = require('mysql');
var util = require('util');
var datetime = require('node-datetime');

function HistoryServer(spacecraft, port) {
    server = express();
    server.use(cors())

    hostname = "localhost"
    username = "root"
    password = ""
    tablename = "spacealliance.telemetry"

    var con = mysql.createConnection({
        host: hostname,
        user: username,
        password: password
    });

    con.connect(function(err) {
        if (err) throw err;
        console.log("Connected successfully to mysql");
    });

    server.get('/telemetry/:pointId', function (req, res) {
        var start = +req.query.start;
        var end = +req.query.end;
        var ids = req.params.pointId.split(',');
        
        sql = util.format("SELECT '%s' FROM %s where timestamp BETWEEN '%s' AND '%s'",
            req.params.pointId, 
            tablename, 
            datetime.create(start).format("Y-m-d H:M:S"),
            datetime.create(end).format("Y-m-d H:M:S"))

        console.log("History: " + sql);

        con.query(sql, function (err, result) {
            if (err) throw err;
            console.log("Result: " + JSON.stringify(result, null, 4));

            response = { 
                "timestamp": req.query.start,
                "value": 0, 
                "id": req.params.pointId 
            };                            

            if (result.length != 0) {
                response["value"] = result[0][req.params.pointId];
            }

            console.log("History response: " + JSON.stringify(response, null, 4));
            res.status(200).json(response).end();
        });

        /*        
        var response = ids.reduce(function (resp, id) {
            return resp.concat(spacecraft.history[id].filter(function (p) {
                return p.timestamp > start && p.timestamp < end;
            }));
        }, []);
        console.log("debug reponse: ", response)
        res.status(200).json(response).end();
        */
    });

    server.listen(port);
    console.log('History server now running at http://localhost:' + port);
}

module.exports = HistoryServer;
