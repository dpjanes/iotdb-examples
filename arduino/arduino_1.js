/*
 *  arduino_1.js
 *
 *  David Janes
 *  IOTDB
 *  2014-04-23
 *
 *  Flash LEDs on and off
 *
 *  Make sure to do the setup!
 */

"use strict";

var common = require("./common")

common.iot
    .things()
    .with_tag(common.TAG_LED)
    .on_thing(function(thing) {
        var state = true;
        setInterval(function() {
            thing.set(':value', state)
            state = !state;
        }, 1000)
    })
