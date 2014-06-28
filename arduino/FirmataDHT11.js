/*
 *  FirmataDHT11.js
 *
 *  David Janes
 *  IOTDB
 *  2014-04-30
 *
 *  - Have a DHT11 connected to pin D2
 */

"use strict";

var assert = require("assert")
var iotdb = require("iotdb")

var iot = new iotdb.IOT({
    load_models: true,
    load_drivers: true,
    iotdb_device_get: false,
    iotdb_device_create: false,
    discover: false,
    models_path: [
        "$IOTDB_PROJECT/../models/firmata"
    ]
});

iot.on_register_things(function() {
    var arduino_tty = iot.cfg_get("arduino_tty")
    assert.ok(arduino_tty && arduino_tty.length)

    iot.discover({
        model: "FirmataDHT11",
        driver_iri: ":firmata",
        initd : {
            pin: 2,
            api: arduino_tty
        },
    })
})

iot.on_thing_with_model("FirmataDHT11", function(iot, thing) {
    thing.on('temperature', function(thing, attribute, value) {
        console.log("+ temperature (C)", value)
    })
    thing.on('humidity', function(thing, attribute, value) {
        console.log("+ humidity", value)
    })
})
