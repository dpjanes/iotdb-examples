/*
 *  FirmataThreeAxisCompass.js
 *
 *  David Janes
 *  IOTDB
 *  2014-05-01
 *
 *  Connect the Grove Three Axis Compass
 *  to the I2C connector
 *
 *  Declination computed for Toronto using
 *  http://magnetic-declination.com/
 *
 *  Make sure to update for your location
 */

"use strict";

var assert = require("assert")
var iotdb = require("iotdb")

var MAGNETIC_DECLINATION = -10.5

var iot = new iotdb.IOT({
    load_models: true,
    load_drivers: true,
    iotdb_device_get: false,
    iotdb_device_create: false,
    discover: false,
    models_path: [
        "$IOTDB_PROJECT/../iotdb-models/firmata"
    ]
});

iot.on_register_things(function() {
    var arduino_tty = iot.cfg_get("arduino_tty")
    assert.ok(arduino_tty && arduino_tty.length)

    iot.discover({
        model: "FirmataThreeAxisCompass",
        driver_iri: ":firmata",
        initd : {
            pin: 2,
            declination: MAGNETIC_DECLINATION,
            api: arduino_tty
        },
    })
})

iot.on_thing_with_model("FirmataThreeAxisCompass", function(iot, thing) {
    thing.on('heading', function(thing, attribute, value) {
        console.log("+ heading", value)
    })
})
