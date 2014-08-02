/*
 *  Playground_Discovery3.js
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

var iot = new iotdb.IOT({
    models_path: [
        "$IOTDB_PROJECT/../iotdb-models/abstract"
    ],
    load_models: true,
    load_drivers: true,
    iotdb_thing_get: false,
    iotdb_thing_create: false,
    discover: false
});

iot.on_register_things(function() {
    iot.discover({
        model: "abstract-light-simple",
        driver_identity: "iot-driver:json",
        initd: {
            api: "http://playground-home.iotdb.org/bedroom/light"
        }
    })
})
iot.on_thing_with_model("abstract-light-simple", function(iot, thing) {
    console.log("+ discovered", thing.code);

    setInterval(function() {
        thing.set(':on', !thing.get(':on'));
        console.log("+ sent", thing.get(':on'))
    }, 2000);
});
