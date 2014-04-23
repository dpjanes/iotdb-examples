/*
 *  arduino_3.js
 *
 *  David Janes
 *  IOTDB
 *  2014-04-23
 *
 *  This will set the LED brightness to that of
 *  the potentiometer
 *
 *  Make sure to do the setup
 */

"use strict";

var common = require("./common")
var iot = common.make_iot()

iot.on_thing_with_tag(common.TAG_POTENTIOMETER, function(iot, thing) {
    thing.on(':value', function(thing, attribute, value) {
        iot.things().with_tag(common.TAG_LED).set(':value', value)
    })
})
