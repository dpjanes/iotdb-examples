/*
 *  FirmataDimmerUnit.js
 *
 *  David Janes
 *  IOTDB
 *  2014-04-30
 *
 *  - Connect LEDs to D3 and D5
 *  - Connect a Pot to A0
 *  - LED brightness will be controlled by the pot
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
    model_path: [
        "$IOTDB_PROJECT/../models/firmata"
    ]
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
    iot.discover({
        model: "FirmataInputUnit",
        driver_iri: ":firmata",
        initd : {
            api: arduino_tty,
            pin: 0
        }
    })
})

iot.on_thing_with_model("FirmataInputUnit", function(iot, thing) {
    thing.on("value", function(thing, attribute, value) {
        iot.things()
            .with_model("FirmataLightDimmer")
            .set("brightness", value)
    })
})
