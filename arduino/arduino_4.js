/*
 *  arduino_4.js
 *
 *  David Janes
 *  IOTDB
 *  2014-04-23
 *
 *  Demonstrate talking to a Fermata device
 *  Analog input and output
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

var brightness = 0
var use_blue = true

function push() {
    iot.things().with_tag(common.TAG_LED_1).set(':value', use_blue ? brightness : 0)
    iot.things().with_tag(common.TAG_LED_2).set(':value', use_blue ? 0 : brightness)
}

iot.on_thing_with_tag(common.TAG_SWITCH, function(iot, thing) {
    thing.on(':value', function(thing, attribute, value) {
        if (value) {
            use_blue = !use_blue
        }
        push()
    })
})
iot.on_thing_with_tag(common.TAG_POTENTIOMETER, function(iot, thing) {
    thing.on(':value', function(thing, attribute, value) {
        brightness = value
        push()
    })
})
