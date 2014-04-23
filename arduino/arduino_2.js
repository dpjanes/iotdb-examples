/*
 *  arduino_4.js
 *
 *  David Janes
 *  IOTDB
 *  2014-04-23
 *
 *  Flash LEDs on and off. Another way of doing this
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

iot.on_ready(function(iot) {
    var value = 0
    setInterval(function() {
        iot
            .things()
            .with_tag(common.TAG_LED)
            .set(':value', value++ % 2)
    }, 1000)
})
