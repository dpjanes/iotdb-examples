/*
 *  FirmataNeoPixel2.js
 *
 *  David Janes
 *  IOTDB
 *  2014-11-15
 *
 *  Randomly select a color from all the ones we know about
 */

"use strict";

var iotdb = require("iotdb")
var iot = iotdb.iot()
var _ = iotdb.helpers;

var led = iot.connect({
    model: "FirmataNeoPixel",
    pin: 6,
    n: 16
})

var colors = _.keys(_.colord);

setInterval(function() {
    led.set(":color", colors[Math.floor(Math.random() * colors.length)]);
}, 1000)
