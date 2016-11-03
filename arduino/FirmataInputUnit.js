/*
 *  FirmataDimmerUnit.js
 *
 *  David Janes
 *  IOTDB
 *  2014-04-30
 *
 *  - Connect LEDs to D3 and D5
 *  - Connect a Pot to A0
 *  - LED brightness will be controlled by the pot
 */

"use strict";

var iotdb = require("iotdb")

var iot = iotdb.iot()
iot.connect({
    model: "FirmataLightDimmer",
    pin: 5
})
iot.connect({
    model: "FirmataLightDimmer",
    pin: 3
})
var input = iot.connect({
    model: "FirmataInputUnit",
    pin: 0
})

input.on(":value", function(thing, attribute, value) {
    console.log("VALUE", value)
    iot
        .things()
        .with_code("FirmataLightDimmer")
        .set(":brightness", value)
})
