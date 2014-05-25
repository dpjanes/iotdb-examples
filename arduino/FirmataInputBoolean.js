/*
 *  FirmataInputBoolean.js
 *
 *  David Janes
 *  IOTDB
 *  2014-04-30
 *
 *  - Connect LEDs to D3 and D5
 *  - Connect a switch to D2 
 *  - LEDs will be controlled by the switch
 *
 *  Note that the model is the Dimmer light,
 *  but boolean values will be converted to 0 or 1
 *  which do the right thing anyway
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
        model: "FirmataInputBoolean",
        driver_iri: ":firmata",
        initd : {
            api: arduino_tty,
            pin: 2
        }
    })
})

iot.on_thing_with_model("FirmataInputBoolean", function(iot, thing) {
    thing.on("value", function(thing, attribute, value) {
        iot.things()
            .with_model("FirmataLightDimmer")
            .set("brightness", value)
    })
})
