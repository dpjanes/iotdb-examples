/*
 *  FirmataNeoPixel1.js
 *
 *  David Janes
 *  IOTDB
 *  2014-11-15
 *
 *  Cycle through a list of colors
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

var c = new iotdb.libs.Color()
var ci = 0;
var cf = 0;

setInterval(function() {
    c.set_hsl(cf, 1, 0.5)
    cf += 0.015;
    if (cf > 1) cf = 0;

    leds
        .with_number(ci++ % n)
        .set(":color", c.get_hex())
        ;

}, 50)
