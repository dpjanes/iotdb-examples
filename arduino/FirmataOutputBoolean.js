/*
 *  FirmataOutputBoolean.js
 *
 *  David Janes
 *  IOTDB
 *  2014-05-01
 *
 *  - Connect LEDs to D3 
 *  - The LED will flash on and off
 *
 *  The difference between this
 *  and FirmataOutputOn is 'FirmataOutputBoolean'
 *  is controlled by 'value' rather than 'on'. We
 *  also explicitly set the pin
 */

"use strict";

var iotdb = require("iotdb")

iotdb
    .iot()
    .connect({
        model: "FirmataOutputBoolean",
        pin: 3
    })
    .on("thing", function(thing) {
        var value = 0
        setInterval(function() {
            thing.set(':value', value++ % 2)
        }, 1500)
    })
