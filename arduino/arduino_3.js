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

var leds = common.iot
    .things()
    .with_tag(common.TAG_LED)
var pot = common.iot
    .things()
    .with_tag(common.TAG_POTENTIOMETER)

pot.on(':value', function(thing, attribute, value) {
    leds.set(':value', value)
})
