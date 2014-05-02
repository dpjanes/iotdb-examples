/*
 *  FirmataDimmerLight.js
 *
 *  David Janes
 *  IOTDB
 *  2014-04-30
 *
 *  - connect LEDs to pins D3 & D5
 *  - the lights will gradually get brighter
 */

"use strict";

var assert = require("assert")
var iotdb = require("iotdb")

var iot = new iotdb.IOT({
    "auto_load_models" : true,
    "auto_load_drivers" : true,
    "auto_iotdb_device_get" : false,
    "auto_iotdb_device_create" : false
});

iot.on_register_things(function() {
    var arduino_tty = iot.cfg_get("arduino_tty")
    assert.ok(arduino_tty && arduino_tty.length)

    iot.discover({
        model: "FirmataLightDimmer",
        driver_iri: ":firmata",
        initd : {
            api: arduino_tty,
            pin: 5
        }
    })
    iot.discover({
        model: "FirmataLightDimmer",
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
        thing.set('brightness', value)
        value += 0.02
        if (value > 1) {
            value = 0
        }
    }, 100)
})
