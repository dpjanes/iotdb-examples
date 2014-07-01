/*
 *  HueLight_Random2.js
 *
 *  David Janes
 *  IOTDB
 *  2013-12-29
 *
 *  Test:
 *  - Philips Hue driver & model
 *  - sending random color (from a small set)
 *  - discovering only one driver
 *  - using 'iot.things()' to send message to _all_ things at a time
 */

"use strict"

var iotdb = require("iotdb")

var HueLight = require("../iotdb-models/ots/HueLight").Model;

var iot = new iotdb.IOT({
    load_models: false,
    load_drivers: true,
    iotdb_device_get: false,
    iotdb_device_create: false,
    discover: false
});
iot.on_register_models(function() {
    iot.register_model(HueLight);
})
iot.on_thing(function(iot, thing) {
    console.log("+ discovered", thing.code, thing.thing_id())
});
iot.on_ready(function() {
    var colors = [ "white", "red", "blue", "green", ]
    setInterval(function() {
        var color = iotdb.helpers.choose(colors);
        console.log("+ set color", color)
        iot
            .things()
            .start()
            .set('on', true)
            .set('color', color)
            .end()
        ;
    }, 5000);

    iot.discover("iot-driver:hue")
})
