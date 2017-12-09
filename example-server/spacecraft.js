/*
 Spacecraft.js simulates a small spacecraft generating telemetry.
*/

function Spacecraft() {
    this.state = {
        "comms.recd": 0,
        "comms.sent": 0,
        "prop.temp": 2,
        "prop.pressure": 10,
        "prop.alt": 100,
        "prop.hum": 50,
        "prop.uv": 20,
        "prop.ir": 30
    };
    this.history = {};
    this.listeners = [];

    Object.keys(this.state).forEach(function (k) {
        this.history[k] = [];
    }, this);

    setInterval(function () {
        this.updateState();
        this.generateTelemetry();
    }.bind(this), 1000);

    console.log("Example spacecraft launched!");
};

Spacecraft.prototype.updateState = function () {
    this.state["prop.temp"] = this.state["prop.temp"] * 0.985
        + Math.random() * 0.25 + Math.sin(Date.now());

    this.state["prop.pressure"] = this.state["prop.pressure"] * 0.585
        + Math.random() * 0.25 + Math.sin(Date.now());

    this.state["prop.alt"] = this.state["prop.alt"]
        + Math.random() * 0.25;

    this.state["prop.hum"] = this.state["prop.hum"] * 0.585
        + Math.random() * 0.25 + Math.sin(Date.now());

    this.state["prop.uv"] = this.state["prop.uv"] * 0.585
        + Math.random() * 0.25 + Math.sin(Date.now());

    this.state["prop.ir"] = this.state["prop.ir"] * 0.585
        + Math.random() * 0.25 + Math.sin(Date.now());
};

/**
 * Takes a measurement of spacecraft state, stores in history, and notifies 
 * listeners.
 */
Spacecraft.prototype.generateTelemetry = function () {
    var timestamp = Date.now(), sent = 0;

    Object.keys(this.state).forEach(function (id) {
        var state = { timestamp: timestamp, value: this.state[id], id: id};
        
        this.notify(state);
        this.history[id].push(state);
        
        this.state["comms.sent"] += JSON.stringify(state).length;
    }, this);
};

Spacecraft.prototype.notify = function (point) {
    this.listeners.forEach(function (l) {
        l(point);
    });
};

Spacecraft.prototype.listen = function (listener) {
    this.listeners.push(listener);
    return function () {
        this.listeners = this.listeners.filter(function (l) {
            return l !== listener;
        });
    }.bind(this);
};

module.exports = function () {
    return new Spacecraft()
};