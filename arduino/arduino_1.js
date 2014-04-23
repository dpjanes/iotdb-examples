/*
 *  arduino_2.js
 *
 *  David Janes
 *  IOTDB
 *  2014-04-23
 *
 *  Flash LEDs on and off
 *
 *  Make sure to do the setup
 */

"use strict";

var assert = require("assert")
var iotdb = require("iotdb")
var _ = iotdb._
var common = require("./common")

var iot = new iotdb.IOT({
    "auto_load_drivers" : true,
    "auto_iotdb_device_get" : false,
    "auto_iotdb_device_create" : false
});

iot.on_register_things(common.register_things)

iot.on_thing_with_tag(common.TAG_LED, function(iot, thing) {
    var state = true;
    setInterval(function() {
        thing.set(':value', state)
        state = !state;
    }, 1000)
})
