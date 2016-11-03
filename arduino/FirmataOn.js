/*
 *  FirmataOn.js
 *
 *  David Janes
 *  IOTDB
 *  2014-05-01
 *
 *  - Connect LEDs to D3 
 *  - The LED will flash on and off
 *
 *  This is to demostrate a simple device
 *  that can be turned on or off
 *
 *  Setup:
 *  iotdb-control set firmata/firmata-on/pin 3 
 */

"use strict";

var iotdb = require("iotdb")

iotdb
    .iot()
    .connect("FirmataOn")
    .on("thing", function(thing) {
        var value = 0
        setInterval(function() {
            thing.set(':on', value++ % 2)
        }, 1500)
    })
