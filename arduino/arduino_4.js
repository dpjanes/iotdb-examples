/*
 *  arduino_4.js
 *
 *  David Janes
 *  IOTDB
 *  2014-04-23
 *
 *  Set the brightness of the light based on
 *  the potentiometer. When a button is pressed,
 *  change the LED
 *
 *  Make sure to do the setup
 */

"use strict";

var common = require("./common")
var iot = common.iot

var brightness = 0
var use_blue = true

function push() {
    console.log("+ brightness", brightness, "use_blue", use_blue)
    iot.things().with_tag(common.TAG_LED_1).set(':value', use_blue ? brightness : 0)
    iot.things().with_tag(common.TAG_LED_2).set(':value', use_blue ? 0 : brightness)
}

iot
    .things()
    .with_tag(common.TAG_SWITCH)
    .on(':value', function(thing, attribute, value) {
        if (value) {
            use_blue = !use_blue
        }
        push()
    })
iot
    .things()
    .with_tag(common.TAG_POTENTIOMETER)
    .on(':value', function(thing, attribute, value) {
        brightness = value
        push()
    })
