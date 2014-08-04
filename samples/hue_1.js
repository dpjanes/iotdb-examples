/*
 *  hue_1.js
 *
 *  David Janes
 *  IOTDB
 *  2014-07-20
 *  "The 45 Anniversary of Apollo 11 Moon Landing"
 *
 *  Set all lights to Magenta
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
    .set(":color", process.argv.length == 3 ? process.argv[2] : "magenta")
