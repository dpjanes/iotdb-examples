/*
 *  arduino_2.js
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

var common = require("./common")
var iot = common.make_iot()

iot.on_ready(function(iot) {
    var value = 0
    setInterval(function() {
        iot
            .things()
            .with_tag(common.TAG_LED)
            .set(':value', value++ % 2)
    }, 1000)
})
