/*
 *  HueLight_Random1.js
 *
 *  David Janes
 *  IOTDB
 *  2013-12-29
 *
 *  Test:
 *  - Philips Hue driver & model
 *  - sending random color
 *  - discovering only one driver
 */

"use strict"

var iotdb = require("iotdb")

var HueLight = require("../models/ots/HueLight").Model;

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
    console.log("+ discovered", thing.code, thing.device_id())

    var colors = iotdb.helpers.keys(iotdb.helpers.colord);

    setInterval(function() {
        thing
            .set(':on', true)
            .set(':color', iotdb.helpers.choose(colors))
        ;
    }, 1000);
});
iot.on_ready(function() {
    iot.discover("iot-driver:hue")
})
