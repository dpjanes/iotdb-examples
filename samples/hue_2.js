/*
 *  hue2.js
 *
 *  David Janes
 *  IOTDB
 *  2014-07-20
 *  "The 45 Anniversary of Apollo 11 Moon Landing"
 *
 *  Randomly set Hue colors. Lights are all set at the same time
 *
 *  Demonstrates:
 *  - IOT.connect_model
 *  - ThingArray.set to set values of Things that may not exist yet
 */

"use strict"

var iotdb = require("iotdb")
var _ = iotdb.helpers

var colors = [ "white", "red", "blue", "green", "black" ]

var iot = iotdb.iot()
var lights = iot.connect("HueLight")

setInterval(function() {
    var color = _.choose(colors);
    console.log("+ set color", color)
    lights.set(':color', color)
}, 2000)
