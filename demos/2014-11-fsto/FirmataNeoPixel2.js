/*
 *  FirmataNeoPixel2.js
 *
 *  David Janes
 *  IOTDB
 *  2014-11-15
 *
 *  Control the color of a NeoPixel using A0
 */

"use strict";

var iotdb = require("iotdb")
var iot = iotdb.iot()

var n = 16;
var leds = iot.connect({
    model: "FirmataNeoPixel",
    pin: 6,
    n: n
})
var input = iot.connect({
    model: "FirmataInputUnit",
    pin: 0
})
input = input.transmogrify(iot.transmogrifier('debounce', { timeout: 50 }));

var color = new iotdb.libs.Color()

input.on(":value", function(thing, attribute, value) {
    color.set_hsl(value, 1, 0.2)
    leds
        .set(":color", color.get_hex())
        ;
})
