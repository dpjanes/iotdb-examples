/*
 *  hue2.js
 *
 *  David Janes
 *  IOTDB
 *  2014-07-20
 *  "The 45 Anniversary of Apollo 11 Moon Landing"
 *
 *  Randomly set Hue colors. Each light is independent of each other
 *
 *  Demonstrates:
 *  - IOT.connect_model
 *  - ThingArray.on_thing
 */

"use strict"

var iotdb = require("iotdb")
var _ = iotdb.helpers

var colors = [ "white", "red", "blue", "green", "black" ]

var iot = iotdb.iot()
var lights = iot.connect("HueLight")

lights.on_thing(function(thing) {
    console.log("+ new thing")
    setInterval(function() {
        var color = _.choose(colors);
        console.log("+ set color", color)
        thing.set(':color', color)
    }, 2000)
})
