/*
 *  FirmataOn.js
 *
 *  David Janes
 *  IOTDB
 *  2014-05-01
 *
 *  - Connect LEDs to D3 
 *  - The LED will flash on and off
 *
 *  This is to demostrate a simple device
 *  that can be turned on or off
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
        model: "FirmataOn",
        driver_iri: ":firmata",
        initd : {
            api: arduino_tty,
            pin: 3
        }
    })
})

iot.on_thing(function(iot, thing) {
    var value = 0
    setInterval(function() {
        thing.set('on', value++ % 2)
    }, 1500)
})
