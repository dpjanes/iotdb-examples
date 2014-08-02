/*
 *  Playground_Discovery2.js
 *
 *  David Janes
 *  IOTDB
 *  2014-01-02
 *
 *  Test talking to a JSON API on the internet.
 *  Showing variants in discovery
 *
 *  See for updates:
 *  https://iotdb.org/playground/home
 */

"use strict";

var iotdb = require("iotdb")
var AbstractLightSimple = require("../iotdb-models/abstract/light-simple").Model;

var iot = new iotdb.IOT({
    load_models: false,
    load_drivers: true,
    iotdb_thing_get: false,
    iotdb_thing_create: false,
    discover: false
});

iot.on_register_things(function() {
    iot.discover({
        model: AbstractLightSimple,
        driver_identity: "iot-driver:json",
        initd: {
            api: "http://playground-home.iotdb.org/bedroom/light"
        }
    })
})
iot.on_thing_with_model(AbstractLightSimple, function(iot, thing) {
    console.log("+ discovered", thing.code);

    setInterval(function() {
        thing.set(':on', !thing.get(':on'));
        console.log("+ sent", thing.get(':on'))
    }, 2000);
});
