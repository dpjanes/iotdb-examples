/*
 *  WeMoSwitch_Blink.js
 *
 *  David Janes
 *  IOTDB
 *  2013-12-25
 *
 *  This tests the UP&P driver and driver in/driver out functions
 */

"use strict"

var iotdb = require("iotdb")
var WeMoSwitch = require("../models/ots/WeMoSwitch").Model;

var iot = new iotdb.IOT({
    load_models: false
});
iot.on_register_models(function() {
    iot.register_model(WeMoSwitch);
})
iot.on_thing(function(iot, thing) {
    console.log("+ WeMoSwitch discovered");
    thing.on('on', function() {
        console.log("+ 'on' changed", thing.get('on'));
    });
    thing.on('on-value', function() {
        console.log("+ 'on-value' changed", thing.get('on-value'));
    });

    setInterval(function() {
        thing.set('on', !thing.get('on'));
    }, 4000);
});

iot.on_ready(function() {
    iot.discover("iot-driver:upnp")
})
