/*
 *  hue_4.js
 *
 *  David Janes
 *  IOTDB
 *  2014-07-21
 *  "American troops landed on Guam in 1944"
 *
 *  Set the Hue with the name "Hue Lamp 2"
 *
 *  Demonstrates:
 *  - IOT.connect
 *  - ThingArray.set to set values of Things that may not exist yet
 */

"use strict"

var iotdb = require("iotdb")

iotdb
    .iot()
    .connect("HueLight")
    .with_name("Hue Lamp 2")
    .on("meta", function(thing) {
        console.log("+ META changed", thing.meta().state())
    })
    .set(":color", process.argv.length == 3 ? process.argv[2] : "magenta")
