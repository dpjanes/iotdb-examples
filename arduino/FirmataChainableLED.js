/*
 *  FirmataChainableLED.js
 *
 *  David Janes
 *  IOTDB
 *  2014-04-30
 *
 *  - Have a DHT11 connected to pin D2
 *  - Have a Grove Chainable LED connected to pin 7
 *  - As the temperature changes, so will the LED color
 *
 *  Note the use of the Color library to use 'hue'. We'll
 *  likely be making changes soon to the ChainableLED 
 *  Model so we can address N leds rather than 1!
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
        model: "FirmataDHT11",
        driver_iri: ":firmata",
        initd : {
            pin: 2,
            api: arduino_tty
        },
    })
    iot.discover({
        model: "FirmataChainableLED",
        driver_iri: ":firmata",
        initd : {
            tag: "FirmataChainableLED",
            pin: 7,
            api: arduino_tty
        },
    })
})

var temperature2color = function(temperature)  {
    var normalized = Math.min(1, Math.max(0, ((25.0 - temperature) / 15.0)))

    var c = new iotdb.libs.Color()
    c.set_hsl(normalized, 1, 0.5)

    return c.get_hex();
}

iot.on_thing_with_model("FirmataDHT11", function(iot, thing) {
    thing.on('temperature', function(thing, attribute, value) {
        iot.things()
            .with_tag("FirmataChainableLED")
            .set("color", temperature2color(value))

        console.log("+ temperature", value)
    })
})
