/*
 *  firmata_neopixel_cycle.js
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

var things = iot
    .connect()
    .connect({
        model: "FirmataNeoPixel",
        pin: 6,
        n: 16
    })

var colors = [ "red", "green", "blue", "white", "black" ];
var ci = 0;

setInterval(function() {
    things.set(":color", colors[ci++ % colors.length]);
}, 1000)
