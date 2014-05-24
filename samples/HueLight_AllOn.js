/*
 *  HueLight_AllOn.js
 *
 *  David Janes
 *  IOTDB
 *  2014-04-10
 *
 *  Turn on all hue lights
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
    thing.set(':on', true).set(':color', 'white')
});
iot.on_ready(function(iot) {
    iot.discover("iot-driver:hue")
})
iot.on_things(function(iot, thing) {
    process.exit(0)
})
