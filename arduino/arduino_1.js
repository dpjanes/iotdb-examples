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
var iot = common.make_iot()

iot.on_thing_with_tag(common.TAG_LED, function(iot, thing) {
    var state = true;
    setInterval(function() {
        thing.set(':value', state)
        state = !state;
    }, 1000)
})
